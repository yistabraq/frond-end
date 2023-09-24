const mongoose = require('mongoose');

const TransactionTypeSchema = mongoose.Schema({
    name:String,
    mti:String,
    category:String,
    code:String,
    type:String,
    spec:String,
    fields:[
        {
            field:String,
            value:String,
            description:String,
            action:String,
            category:String,
        }
    ]

}, {
    timestamps: true
});
TransactionTypeSchema.virtual('id').get(function(){return this._id.toString()}).set(function(v){this._id=mongoose.SchemaType.ObjectId(v)})
module.exports = mongoose.model('TransactionType', TransactionTypeSchema);