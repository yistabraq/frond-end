const TransactionType = require ('./transactionType')

const resolvers={
    Query:{
        transactionType:async (parent, args) => {
            const transactionType=await TransactionType.findOne(args);
            return transactionType
        },
        transactionTypes: async (parent, args) => {
            const transactionTypes=await TransactionType.find(args);
            return transactionTypes
        },
    },
    Mutation:{
        createTransactionType: async (parent, {input}) => {
            let id=input.id
            delete input.id
            if (id=='')
                var transactionType=await  TransactionType.create(input);
            else{
                var now = Date()
                input.updateAt=now
                var transactionType=await  TransactionType.findByIdAndUpdate({_id:id},input);
            }
            return transactionType
        },
        deleteTransactionType: async (parent, {id}) => {
            const transactionType=await  TransactionType.findByIdAndRemove({_id:id})
            return transactionType
        },
    
    }
}

exports.resolvers = resolvers;
