const Transaction = require ('./transaction')
const moment = require('moment');
const kafka = require('kafka-node')
const HsmPb = require('hsm-pin-block');
const Producer = kafka.Producer
const Consumer = kafka.Consumer
const KeyedMessage = kafka.KeyedMessage
const iso8583 = require('iso_8583');
function createIso(input,utrrno){
    let lines={}
    lines[0]=input.mti
    for (const line of input.fields) {
        let l={}
        if(line.action=="getValue"){
            lines[parseInt(line.field)]=line.value
        }
        else{
            if(line.category=="Card" && input.card != undefined){
                lines[parseInt(line.field)]=getDataCard(line,input.card)
            }
            if(line.category=="Terminal" && input.terminal != undefined){
                lines[parseInt(line.field)]=getDataTerminal(line,input.terminal)
            }
            if(line.category=="System"){
                lines[parseInt(line.field)]=getDataSystem(line,utrrno)
            }
        }
    }
    let pinField=input.spec.pinField
    
    return formatData(lines,pinField)
}
function padStart (max,str) {
    str = str.toString();
    return str.length < max ? padStart("0" + str, max) : str;
}
function formatData(lines,pinField){
    if('2' in lines && pinField in lines)
      lines[pinField] = HsmPb.encrypt('ADD3B5C7B576D3AE38B90B7C0EB67A7C', lines[pinField],lines['2']);
    if('4' in lines)
        lines['4']=padStart(12,lines['4'])
    if('5' in lines)
        lines['5']=padStart(12,lines['5'])
    if('6' in lines)
        lines['6']=padStart(12,lines['6'])
   // console.log('formatData', lines)
    return lines
}
function getDataCard(line,card) {
    if(line.action=='getTrack2'){
        return card.track2
    }
    if(line.action=='getPan'){
        return card.pan
    }
    if(line.action=='getPin'){
        return card.pin
    }
}
function getDataTerminal(line,terminal) {
    //console.log('terminal', terminal)
    if(line.action=='getTerminalID'){
        return terminal.terminalId
    }
    if(line.action=='getMerchantID'){
        return terminal.merchantId
    }
    if(line.action=='getCountry'){
        return terminal.country
    }
}
function getDataSystem(line,utrrno) {
    let time = moment(new Date());
    if(line.action=='getDate(MMDDhhmmss)'){
        return time.format('MMDDhhmmss');
    }
    if(line.action=='getDate(YYMMDDhhmmss)'){
        return time.format('YYMMDDhhmmss');
    }
    if(line.action=='getDate(YYMMDD)'){
        return time.format('YYMMDD');
    }
    if(line.action=='getDate(MMDD)'){
        return time.format('MMDD');
    }
    if(line.action=='getUtrno'){
        return utrrno;
    }
    
}

const resolvers={
    Query:{
        transaction:async (parent, args) => {
            const transaction=await Transaction.findOne(args);
            return transaction
        },
        transactions: async (parent, args) => {
            const transactions=await Transaction.find(args);
            return transactions
        },
    },
    Mutation:{
        createTransaction: async (parent, {input}) => {
            let utrrno= await Transaction.countDocuments({})
            utrrno++
            utrrno=utrrno.toString().padStart(6,'0')
            let data=createIso(input,utrrno)
            let isopack = new iso8583(data);
            if (isopack.validateMessage()){
                let transaction={
                    transaction: input.name,
                    pan:input.card.pan,
                    terminalId: input.terminal.terminalId,
                    date_time:moment().format('YYYY/MM/DD hh:mm:ss'),
                    spec:input.spec.name,
                    resp:'999 (Incomplet)',
                    utrnno:utrrno,
                    request:data,
                    response:{}
                }
                //console.log('transaction', transaction)
                let trans = await Transaction.create(transaction)
                km = new KeyedMessage(trans.id, JSON.stringify(data))
                const client = new kafka.KafkaClient()
                const producer = new Producer(client)
                let spec='specs_'+ input.spec.name
                payloads = [
                    { topic: spec, messages: km, partition: 0},
                ];
                producer.on('ready', function () {
                    producer.send(payloads, function (err, data) {
                        console.log(err || data);
                    });
                });
                producer.on('error', function (err) { console.log('ERROR', err)})
                return {message:utrrno}
            }
            else
                return {message:"Error"}
            //console.log('DESCRIPTION', iso8583.getFieldDescription(isopack.getBitMapFields()))
            
        },
        deleteTransaction: async (parent, {id}) => {
            const transaction=await  Transaction.findByIdAndRemove({_id:id})
            return transaction
        },
    
    }
}

exports.resolvers = resolvers;
