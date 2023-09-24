const MyCard=require ('./card')
const Account = require('../account/account')

const resolvers={
    Query:{
        card:async (parent, {id}) => {
            const card=await MyCard.findOne(id);
            return card
        },
        cards: async (parent, {input}) => {
            const cards=await MyCard.find();
            return cards
        },
    },
    Mutation:{
        createCard: async (parent, {input}) => {
            const id=input.id
            delete input.id
            if(id=='') 
               var card = await MyCard.create(input)
            else{
                var now = Date()
                input.updateAt=now
                var card = await MyCard.findOneAndUpdate({_id:id},input);
            }
            console.log('input',input)
            return card
        },
        deleteCard: async (parent, {id}) => {
            const card=await MyCard.findByIdAndRemove({_id:id})
            return card
        },
    },
    Card:{
        accounts:async(root)=>{
            const accounts=[]
            for (const element of root.accounts) {
                let account=await Account.findOne({account:element})
                if(account)
                    accounts.push(account)
            }
            return accounts
        }
    }

}
exports.resolvers=resolvers