const express = require('express');

const app = express();

const {animals} = require('./data/animals');







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
};





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

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});