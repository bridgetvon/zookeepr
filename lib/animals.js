const fs = require("fs");
const path = require("path");


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
        path.join(__dirname, '../data/animals.json'),
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


module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
  };
