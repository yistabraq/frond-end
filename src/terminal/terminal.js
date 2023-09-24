const mongoose = require('mongoose');

const TerminalSchema = mongoose.Schema({
    terminalId: String,
    merchantId: String,
    formatPinBlock: String,
    country:String,
    emv:String,
    type: String,
    accounts:[{ type: String }]
}, {
    timestamps: true
});
TerminalSchema.virtual('id').get(function(){return this._id.toString()}).set(function(v){this._id=mongoose.SchemaType.ObjectId(v)})
module.exports = mongoose.model('Terminal', TerminalSchema);