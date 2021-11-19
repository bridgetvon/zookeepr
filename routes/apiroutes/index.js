//add middleware so that our app knows about the routes in animalroutes.js 

const router = require('express').Router();
const animalRoutes = require('../apiroutes/animalRoutes');

router.use(animalRoutes);

module.exports = router;