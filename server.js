const express = require('express');
const {animals} = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

const fs = require('fs');
const path = require('path');

const apiRoutes = require('./routes/apiroutes');
//if no file to read default to the index file 
const htmlRoutes = require('./routes/htmlRoutes');

//middleware
//parse incoming string or array data
//app.use() is a method executed by our express.js server that mounts a function to the server that our requests 
//will pass through before getting to the intended endpoint
//middleware functions allow us to keep our route endpoint callback function more readable while letting us use 
//functionality across routes to keep our code dry 
//express.urlencoded takes incoming post data and converts it to key/value pairings that can be accessed in the req.body object
//extended:true option set inside informs our server that there may be sub array data nested in it as well  
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
//express.json data parses into the req.body js object 

app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//make a route to css and js code this will make files readily available 
//express static provides a file path to a location in our application and instructs the server to 
//make these files static resources 
app.use(express.static('public'));

//define an endpoint for the server 
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })






//add the route 
//get request requires two arguments 1. a string that describes the route the client will fetch from 
//2. callback function that will execute







app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});