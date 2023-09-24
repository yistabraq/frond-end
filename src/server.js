const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./base/schema');
const cors = require('cors')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs');
//require('dotenv').config();

const jsonfile = require('jsonfile')
const Spec = require ('../src/spec/spec')
//const Account=require('./card/account')
const PORT = 3000;

const app = express();
app.use(cors()); 
app.use(fileUpload());
mongoose.Promise = global.Promise;

//const url='mongodb://istabraq:Passer1234@ds019478.mlab.com:19478/simulator'
const url=process.env.MONGODB_URL

//const url='mongodb://localhost:27017/test'
// Connecting to the database

console.log(process.env);
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database ");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// Graphql
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// Graphiql
app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }));
app.get('/download', function(req, res){
    var file = __dirname + '/download/exemple_spec.json';
    res.download(file); // Set disposition and send it.
  });
app.post('/upload', function(req,res){
    let file=req.files.file
    let path=__dirname +'/upload/'+file.name
    file.mv(path,function (err) {
        console.error('Error move:', err)
    })
    jsonfile.readFile(path,async function (err, obj) {
        if (err) {
            console.error('Error reading',err)
            res.json(err)
        }    
        else {
            let id=await Spec.create(obj)
            console.log(id)
            res.send('ok');
        }
        
    })
    
})

app.listen(PORT, () => console.log(`GraphiQL is running on http://localhost:${PORT}/graphiql`));