const Spec = require ('./spec')

const resolvers={
    Query:{
        spec:async (parent, args) => {
            const spec=await Spec.findOne(args);
            return spec
        },
        specs: async (parent, args) => {
            const specs=await Spec.find();
            return specs
        },
    },
    Mutation:{
        createSpec: async (parent, {input}) => {
            let id=input.id
            delete input.id
            if (id=='')
                var spec=await  Spec.create(input);
            else{
                var now = Date()
                input.updateAt=now
                var spec=await  Spec.findByIdAndUpdate({_id:id},input);
            }
            return spec
        },
        deleteSpec: async (parent, {id}) => {
            const spec=await  Spec.findByIdAndRemove({_id:id})
            return spec
        },
    
    },
}

exports.resolvers = resolvers;
