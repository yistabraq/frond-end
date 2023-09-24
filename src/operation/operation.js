const mongoose = require('mongoose');

const OperationSchema = mongoose.Schema({
    operation: String,
    account: String,
    amount: String,
    date: String,
    type: String,
    old_balance: String,
    new_balance: String,
}, {
    timestamps: true
});
OperationSchema.virtual('id').get(function(){return this._id.toString()}).set(function(v){this._id=mongoose.SchemaType.ObjectId(v)})
module.exports = mongoose.model('Operation', OperationSchema);