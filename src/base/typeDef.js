const Base = `
type Query {
    account(account: String!): Account
    accounts(input:FilterInput): [Account]
    card(id:ID!):Card
    cards:[Card]
    terminal(id:ID!):Terminal
    terminals:[Terminal]
    transactionType(id:ID!):TransactionType
    transactionTypes(category:String,spec:String):[TransactionType]
    transaction(id:ID!):Transaction
    transactions:[Transaction]
    spec(name:String!):Spec
    specs:[Spec]
    project(name:String!):Project
    projects:[Project]
    network(spec:String!):Network
    networks:[Network]
}
type Mutation {
    createAccount (input:AccountInput): Account
    deleteAccount(id: ID!): Account
    createCard (input:CardInput): Card
    deleteCard(id: ID!): Card
    createTerminal (input:TerminalInput): Terminal
    deleteTerminal(id: ID!): Terminal
    createTransactionType (input:TransactionTypeInput): TransactionType
    deleteTransactionType(id: ID!): TransactionType
    createTransaction (input:TransactionInput): Retour
    deleteTransaction(id: ID!): String
    createSpec (input:SpecInput): Spec
    deleteSpec(id: ID!): Spec
    createProject (input:ProjectInput): Project
    deleteProject(id: ID!): Project
    createNetwork (input:NetworkInput): Network
    deleteNetwork(id: ID!): Network
}

type Retour{
    message:String
}

type Card {
    id: String!
    track2: String
    cardholder: String
    type: String
    emv: String
    status: String
    pin: String
    accounts: [Account]
}
input CardInput{
    id:String
    track2: String
    cardholder: String
    type: String
    status: String
    pin: String
    pan: String
    emv:String
    accounts:[String]
}
type Account {
    id: String!
    account: String
    balance: String
    currency: String
    type: String
    status: String
    operation:[Operation]
}

input AccountInput{
    id:String
    account: String
    balance: String
    currency: String
    type: String
    status: String
}
type Terminal {
    id: String!
    terminalId: String
    merchantId: String
    formatPinBlock: String
    emv: String
    type: String
    tmk: String
    country: String
    tpk: String
    accounts: [Account]
}
input TerminalInput {
    id: String
    terminalId: String
    merchantId: String
    formatPinBlock: String
    emv: String
    type: String
    tmk: String
    country: String
    tpk: String
    accounts:[String]
}
type Field{
    field:String
    value:String
    description:String
    contentType:String
    lenType:String
    maxLen:String
    action:String
    category:String    
}
type TransactionType {
    id:ID!
    name:String
    mti:String
    category:String
    type:String
    code:String
    spec:String
    spec:String
    fields:[Field]
}
type Transaction {
    id:ID!
    transaction: String
    pan:String
    terminalId:String
    date_time:String
    spec:String
    resp:String
    utrnno:String
    req:String
    res:String
}
input FieldInput{
    field:String
    value:String
    description:String
    contentType:String
    lenType:String
    maxLen:String
    action:String
    category:String 
}
input TransactionTypeInput {
    id:ID!
    name:String
    mti:String
    category:String
    type:String
    code:String
    spec:String
    fields:[FieldInput]
}
input TransactionInput {
    id:ID
    name: String
    spec:SpecInput
    terminal:TerminalInput
    card:CardInput
    type:String
    mti:String
    fields:[FieldInput]
}
type Operation{
    id:ID!
    account:String
    operation:String
    amount:String
    date:String
    type:String
    old_balance:String
    new_balance:String
}
input FilterInput{
    limit: Int
    skip: Int 
    sort_field: String 
    sort_order: String
}
type Spec {
    id:ID!
    name:String
    pinField:String
    numberOfField:String
    version:String
    fields:[Field]
    codeResponse:[CodeResponse]
    messageType:[MessageType]
    processingCode:[Processing_codes]
}
type Processing_codes {
    code:String
    description:String
}
type CodeResponse {
    code:String
    message:String
}
type MessageType {
    value:String
    description:String
}
input SpecInput {
    id:String
    name:String
    pinField:String
    numberOfField:String
    version:String
    fields:[FieldInput]
    codeResponse:[CodeResponseInput]
    messageType:[MessageTypeInput]
    processingCode:[Processing_codesInput]
}
input Processing_codesInput {
    code:String
    description:String
}
input CodeResponseInput {
    code:String
    message:String
}
input MessageTypeInput {
    value:String
    description:String
}
type Project {
    id: String!
    name: String
    category: String
    spec: String
    status:String
    membres: [String]
    transactions: [TransactionTypeStatus]
}
input ProjectInput{
    id: String
    name: String
    category: String
    spec: String
    status:String
    membres: [String]
    transactions: [TransactionTypeStatusInput]
}
type TransactionTypeStatus{
    id:ID!
    name:String!
    mti:String!
    type:String!
    status:String!
}
input TransactionTypeStatusInput{
    id:ID!
    status:String!
}
type Network{
    id:ID!
    ip:String!
    port:String!
    spec:String!
    zpk:String
    zmk:String
}
input NetworkInput{
    id:ID!
    ip:String!
    port:String!
    spec:String!
    zpk:String
    zmk:String
}
`;
module.exports = Base
