const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: String,
    category:String,
    spec:String,
    status:String,
    membres:[{ type: String }],
    transactions:[
        { 
            id: String,
            status:String
        }
    ],

}, {
    timestamps: true
});
ProjectSchema.virtual('id').get(function(){return this._id.toString()}).set(function(v){this._id=mongoose.SchemaType.ObjectId(v)})
module.exports = mongoose.model('Project', ProjectSchema);