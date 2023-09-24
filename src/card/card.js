const mongoose = require('mongoose');
const CardSchema = mongoose.Schema({
      
    track2:String,       
    padding:String,           
    cardholder: {
        type:String,
        default:'Joe Doe'
    },
    pin: String,
    type:{
        type: String,
        default:'magstrip'
    },
    emv:{
        type: String,
        default:''
    },
    status:{
        type: String,
        default:'Active'
    },
    accounts:[{ type: String }],
}, {
    timestamps: true
});
/*CardSchema.virtual('track2').
    get(function() { return  ';' + this.pan + '=' + this.expery_date +this.service_code + this.pvki + this.pvv + this.cvv +this.padding + '?' }).
    set(function(v) {
        this.pan = v.substr(1, v.indexOf('=')-1);
        this.expery_date = v.substr(v.indexOf('=') + 1,4);
        this.service_code = v.substr(v.indexOf('=')+ 5,3);
        this.pvki = v.substr(v.indexOf('=')+ 8,1);
        this.pvv = v.substr(v.indexOf('=')+ 9,4);
        this.cvv = v.substr(v.indexOf('=')+ 13,3);
        this.padding = v.substr(v.indexOf('=')+ 16,5);
  });*/
CardSchema.virtual('id').get(function(){return this._id.toString()}).set(function(v){this._id=mongoose.SchemaType.ObjectId(v)})
module.exports = mongoose.model('Card', CardSchema);