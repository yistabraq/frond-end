const { makeExecutableSchema } = require ('graphql-tools');
const resolvers = require ('./resolvers')
const Base = require ('./typeDef')
//console.log('Base type :',Base)
module.exports = makeExecutableSchema({
    typeDefs: Base,
    resolvers,
    logger: { log: e => console.log(e) },
});