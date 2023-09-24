var tlv = require('ber-tlv');
var annotations = require('ber-tlv-annotations');
var TlvFactory = tlv.TlvFactory;
var AnnotationRegistry = annotations.AnnotationRegistry;

var registry = new AnnotationRegistry();
registry.registerPackagedProviders();


function parserObjet(params) {
    var output={}
    output.tag=params.tag
    output.value=params.rawValue
    output.name=params.name
    return output
}
module.exports = function (msg) { 
    var tlvs = TlvFactory.parse(msg);
    var lookups = registry.lookupAnnotations(tlvs);
    var tab=[]
    for (const iterator of lookups) {
        tab.push(parserObjet(iterator))
    }
    return tab
};