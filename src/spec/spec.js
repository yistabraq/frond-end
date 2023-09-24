const mongoose = require('mongoose');

const SpecSchema = mongoose.Schema({
    name: String,
    pinField: String,
    numberOfField: String,
    version: String,
    fields: [
        {
            field:Number,
            description:String,
            contentType:String,
            lenType:String,
            maxLen:Number,
            category:String,
        }
    ],
    codeResponse:[
        {
            code:String,
            message:String,
        }
    ],
    processingCode:[
        {
            code:String,
            description:String,
        }
    ],
    messageType:[
        {
            value:String,
            description:String,
        }
    ],
}, {
    timestamps: true
});
SpecSchema.virtual('id').get(function(){return this._id.toString()}).set(function(v){this._id=mongoose.SchemaType.ObjectId(v)})
module.exports = mongoose.model('Spec', SpecSchema);

