const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    account: String,
    balance: String,
    currency: String,
    type: String,
    status: String,
}, {
    timestamps: true
});
AccountSchema.virtual('id').get(function(){return this._id.toString()}).set(function(v){this._id=mongoose.SchemaType.ObjectId(v)})
module.exports = mongoose.model('Account', AccountSchema);