const Terminal = require ('./terminal')
const Account = require('../account/account')
const emv =require('../emv')

const resolvers={
    Query:{
        terminal:async (parent, args) => {
            const terminal=await Terminal.findOne(args);
            return terminal
        },
        terminals: async (parent, args) => {
            //console.log(emv("820207009F1A020276"))
            const terminals=await Terminal.find();
            return terminals
        },
    },
    Mutation:{
        createTerminal: async (parent, {input}) => {
            let id=input.id
            delete input.id
            if (id=='')
                var terminal=await  Terminal.create(input);
            else{
                var now = Date()
                input.updateAt=now
                var terminal=await  Terminal.findByIdAndUpdate({_id:id},input);
            }
            return terminal
        },
        deleteTerminal: async (parent, {id}) => {
            const terminal=await  Terminal.findByIdAndRemove({_id:id})
            return terminal
        },
    
    },
    Terminal:{
        accounts:async(root)=>{
            const accounts=[]
            for (const element of root.accounts) {
                let account=await Account.findOne({account:element})
                if(account)
                    accounts.push(account)
            }
            return accounts
        }
    }
}

exports.resolvers = resolvers;
