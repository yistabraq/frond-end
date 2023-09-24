const Account = require ('./account')
const Operation=require ('../operation/operation')
const resolvers={
    Query:{
        account:async (parent, args) => {
            const account=await Account.findOne(args);
            return account
        },
        accounts: async (parent, args) => {
            const accounts=await Account.find();
            return accounts
        },
    },
    Mutation:{
        createAccount: async (parent, {input}) => {
            let id=input.id
            delete input.id
            if (id=='')
                var account=await  Account.create(input);
            else{
                var now = Date()
                input.updateAt=now
                var account=await  Account.findByIdAndUpdate({_id:id},input);
            }
            return account
        },
        deleteAccount: async (parent, {id}) => {
            const account=await  Account.findByIdAndRemove({_id:id})
            return account
        },
    
    },
    Account:{
        operation:async(root)=> {
            return Operation.find({account:root.account})
        }
    }
}

exports.resolvers = resolvers;
