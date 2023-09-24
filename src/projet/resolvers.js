const MyProject=require ('./project')
const Transaction = require('../typetransaction/transactionType')
const mongoose = require('mongoose');
const resolvers={
    Query:{
        project:async (parent, {id}) => {
            const project=await MyProject.findOne(id);
            return project
        },
        projects: async (parent, {input}) => {
            const projects=await MyProject.find();
            return projects
        },
    },
    Mutation:{
        createProject: async (parent, {input}) => {
            const id=input.id
            delete input.id
            if(id=='') 
               var project = await MyProject.create(input)
            else{
                var now = Date()
                input.updateAt=now
                var project = await MyProject.findOneAndUpdate({_id:id},input);
            }
            console.log('input',input)
            return project
        },
        deleteProject: async (parent, {id}) => {
            const project=await MyProject.findByIdAndRemove({_id:id})
            return project
        },
    },
    Project:{
        transactions:async(root)=>{
            const transactions=[]
            let trans={}
            for (const element of root.transactions) {
                let transaction=await Transaction.findById(mongoose.Types.ObjectId(element.id))
                if(transaction){
                    let trans={}
                    trans.id=transaction.id
                    trans.name=transaction.name
                    trans.status=element.status
                    transactions.push(trans)

                }
            }
            return transactions
        }
    }

}
exports.resolvers=resolvers