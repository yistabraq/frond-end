const AccountResolvers = require ('../account/resolvers')
const CardResolvers = require ('../card/resolvers')
const TerminalResolvers = require ('../terminal/resolvers')
const TransactionTypeResolvers = require ('../typetransaction/resolvers')
const TransactionResolvers = require ('../transaction/resolvers')
const SpecResolvers= require ('../spec/resolvers')
const ProjectResolvers = require('../projet/resolvers')
const NetworkResolvers = require('../network/resolvers')
//const Date = require ('../scalar/Date')
const Card=CardResolvers.resolvers.Card
const Terminal=TerminalResolvers.resolvers.Terminal
const Account=AccountResolvers.resolvers.Account
const Project=ProjectResolvers.resolvers.Project
 const resolvers={
    Query:{
        ... CardResolvers.resolvers.Query,
        ... AccountResolvers.resolvers.Query,
        ... TerminalResolvers.resolvers.Query,
        ... TransactionTypeResolvers.resolvers.Query,
        ... TransactionResolvers.resolvers.Query,
        ... SpecResolvers.resolvers.Query,
        ... ProjectResolvers.resolvers.Query,
        ... NetworkResolvers.resolvers.Query,
    },
    Mutation:{
        ...AccountResolvers.resolvers.Mutation,
        ...CardResolvers.resolvers.Mutation,
        ...TerminalResolvers.resolvers.Mutation,
        ...TransactionTypeResolvers.resolvers.Mutation,
        ...TransactionResolvers.resolvers.Mutation,
        ...SpecResolvers.resolvers.Mutation,
        ...ProjectResolvers.resolvers.Mutation,
        ...NetworkResolvers.resolvers.Mutation,
    },
    Card,
    Account,
    Terminal,
    Project,

}
module.exports = resolvers