const express   = require('express');
const app       = express();


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



app.get('/', (req, res) => {
    res.render('index', {title : "my dynamic title"}); // render comes from ejs, to render html
    console.log(__dirname);
});

app.get('/services', (req, res) => {
    res.render('services', {services: 'this is a dynamic message of services'});
});


//it catch whatever page that is not on this directory
app.use((req, res, next) => {
    res.status(404).render("404", {404: "The url is incorrect"});
})

app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});