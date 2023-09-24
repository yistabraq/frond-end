const MyNetwork=require ('./network')
const mongoose = require('mongoose');
const resolvers={
    Query:{
        network:async (parent, {id}) => {
            const network=await MyNetwork.findOne(id);
            return network
        },
        networks: async (parent, {input}) => {
            const networks=await MyNetwork.find();
            return networks
        },
    },
    Mutation:{
        createNetwork: async (parent, {input}) => {
            const id=input.id
            delete input.id
            if(id=='') 
               var network = await MyNetwork.create(input)
            else{
                var now = Date()
                input.updateAt=now
                var network = await MyNetwork.findOneAndUpdate({_id:id},input);
            }
            console.log('input',input)
            return network
        },
        deleteNetwork: async (parent, {id}) => {
            const network=await MyNetwork.findByIdAndRemove({_id:id})
            return network
        },
    }
}
exports.resolvers=resolvers