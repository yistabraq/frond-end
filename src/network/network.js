const mongoose = require('mongoose');

const NetworkSchema = mongoose.Schema({
    ip: String,
    port: Number,
    spec:String,
    zpk: String,
    zmk: String,
}, {
    timestamps: true
});
NetworkSchema.virtual('id').get(function(){return this._id.toString()}).set(function(v){this._id=mongoose.SchemaType.ObjectId(v)})
module.exports = mongoose.model('Network', NetworkSchema);