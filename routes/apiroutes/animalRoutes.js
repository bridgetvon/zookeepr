//router allows you to declare routes in an file as long as you have the proper middleware 
//we cannot use app anymore because it is defined in server js and cant be accessed in this file 
const router = require('express').Router();


const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});



//get route fro animals
//param route must come after the get route 
router.get('/animals/:id', (req, res) => {
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
router.post('/animals', (req, res) => {
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

module.exports = router;