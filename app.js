const express   = require('express');
const app       = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));
// parse application/json
app.use(express.json());

// connecting to DataBase
const mongoose  = require('mongoose');

//process password
require('dotenv').config();


const uri       = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@petdb.jayxx.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;


mongoose.connect(uri,
    {userNewUrlParser: true, useUnifiedTopology: true }
)

// mongoose.connect(uri, { 
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useCreateIndex: true 
//   })
.then(() => console.log('connected to mongodb'))
.catch(e => console.log('connection error', e)); 
        


app.set('view engine', 'ejs'); //register the template engine
app.set('views', __dirname + '/views');

// const http = require('http');
// const server = http.createServer((req, res) => {
//     res.end('Servidor funcionando');
// });

const port = process.env.PORT || 3000;
// server.listen(port, () => {
//     console.log(`Listen on port ${port}`);
// });

//middleware static
// __dirname tell us the directory where is located, and configures where is our public carpet,
//also is used to get bootstrap and css, en when whe call hrref our main address is public
app.use(express.static(__dirname + '/public')); 

//to get routes
//we can change the / for other name, and our route will change for the name that we assign, example localhost:3000/hola/services, or using "/" localhost:3000/
app.use('/',  require('./routes/routeWeb'));
app.use('/pets',  require('./routes/pets'));

//it catch whatever page that is not on this directory, we can deduce that "use" is used by a middleware
app.use((req, res, next) => {
    res.status(404).render("404", {404: "The url is incorrect"});
});

//Server
app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});