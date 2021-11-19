const express = require('express');
const {animals} = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

const fs = require('fs');
const path = require('path');

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

//make a route to css and js code this will make files readily available 
app.use(express.static('public'));

//define an endpoint for the server 
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })





function filterByQuery(query, animalsArray) {
    
    let personalityTraitsArray = [];
    //note that we save animals array in filtered results here:
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        //save personality traits as a dedicated array 
        //if personality traits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in personality traits array 
        personalityTraitsArray.forEach(trait => {
            //check the trait against each animal in the filtered results array 
            //remember, it is initially a copy of the animals array 
            //but we are updating it for each trait in the forEach loop 
            //for each trait being targeted by the filter the filteredresults
            //array will then contain only entries that contain the trait 
            //so at the end well have an array of animals that have every one 
            //of the traits when the for each loop is finsihed
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
             );
            });
    }
        
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults= filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;

}


function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    console.log(body);
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        //json.stringify converts, null means we dont want to edit existing data, 2 creat white space between our values 
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
}
//validate 
//in our post routes callback we create data andd add to catalog we will pass our data through this function 
//in this case we use the animal parameter will be the req.body and we run its properties
//through a series of validation checks 
function validateAnimal (animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}


//add the route 
//get request requires two arguments 1. a string that describes the route the client will fetch from 
//2. callback function that will execute
app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//get route fro animals
//param route must come after the get route 
app.get('api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
    res.json(result);
} else {
    res.send(404);
}
});
//another method of tha app object that allows us to create routes 
//post means we defined a route that listens for POST requests 
//post requests are different from get requests bc they represent the action of a client requesting the server to accept data
//rathr than vice versa 
app.post('/api/animals', (req, res) => {
    //req.body is where our incoming content will be 
    //set id based on what the index of the array will be 
    req.body.id = animals.length.toString();
    //if any data in req.body is incorrect send 400 error back 
    if (!validateAnimal(req.body)) {
        //res.status.send is a response method to relay a message to the client 
        res.status(400).send('The animal is not properly formatted.');
    } else{
    //add animal to json file and animals array in this function 
    const animal = createNewAnimal(req.body, animals);

    res.json(animal);
    }
});
//add a route to the server.js
//this route responds with an HTML page to display to the browser 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});