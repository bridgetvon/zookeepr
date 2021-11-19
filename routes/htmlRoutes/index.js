const path = require('path');
const router = require('express').Router();


//add a route to the server.js
//this route responds with an HTML page to display to the browser 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



//this route will take us to animals 
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
});

router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});



//wildcard request this handles requests to routes that do not exist 
//they will receieve the homepage as a response 
//the *(wildcard) route should always come last!
router.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});


module.exports = router;