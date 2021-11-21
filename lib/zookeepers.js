const fs = require("fs");
const path = require("path");

function filterByQuery(query, zookeepers) {
    let filteredResults = zookeepers;
    if (query.age) {
        filteredResults = filteredResults.filter(
            //since our form data comes as strings and our json data is storing
            //age as a number we must convert the string to a number 
            //to preform a comparison 
            (zookeeper) => zookeeper.age === Number(query.age)
        );
    }
    if (query.favoriteAnimal) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.favoriteAnimal === query.favoriteAnimal
        );
    }
    if (query.name) {
        filteredResults = filteredResults.filter(
            (zookeeper) => zookeeper.name === query.name
        );
    }
    return filteredResults;
}

function findById(id, zookeepers) {
    const result = zookeepers.filter((zookeeper) => zookeeper.id === id)[0];
    return result;
}

function createNewZookeeper(body, zookeepers) {
    const zookeeper = body;
    zookeepers.push(zookeeper);
    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({zookeepers}, null, 2)
    );
    return zookeeper;
}

function validateZookeeper(zookeeper) {
    if (!zookeeper.name || typeof zookeeper.name !== "string") {
        return false;
    }
    if (
        !zookeeper.favoriteAnimal !== "string"
    ){
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
}