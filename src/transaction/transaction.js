const mongoose = require('mongoose');

const TransactionSchema = mongoose.Schema({
    transaction: String,
    pan:String,
    terminalId:String,
    date_time:String,
    spec:String,
    resp:String,
    utrnno:String,
    request:{
        type:Map,
        of:String    
    },
    response:{
        type:Map,
        of:String    
    }

}, {
    timestamps: true
});
TransactionSchema.virtual('id').get(function(){return this._id.toString()}).set(function(v){this._id=mongoose.SchemaType.ObjectId(v)})
TransactionSchema.virtual('res').get(function(){return JSON.stringify(this.response)})
TransactionSchema.virtual('req').get(function(){return JSON.stringify(this.request)})
module.exports = mongoose.model('Transaction', TransactionSchema);