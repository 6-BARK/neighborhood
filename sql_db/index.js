const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getHouseInfo = (houseId, callback) => {
    // connection.query(`SELECT * FROM houses WHERE id=${houseId}`, (err, listingInfo) => {
    connection.query(`SELECT * FROM houses FORCE KEY (PRIMARY) WHERE id=${houseId}`, (err, listingInfo) => {
        if(err) {
            console.log('err');
            callback(err);
        } else {
            callback(null, listingInfo);
        }
    });
}

const getNeighborhoodInfo = (neighborhoodId, callback) => {
    connection.query(`SELECT * FROM neighborhoods WHERE id=${neighborhoodId}`, (err, neighborhoodInfo) => {
        if(err) {
            callback(err);
        } else {
            callback(null, neighborhoodInfo);
        }
    });
}

const createNewListing = (listingInfo, callback) => {
    connection.query(`INSERT INTO houses (user, neighborhood, map, price, sqft, beds, baths, street_address, street_name, city, state, zip_code) VALUES (${listingInfo.user}, ${listingInfo.neighborhood}, ${listingInfo.map}, ${listingInfo.price}, ${listingInfo.sqft}, ${listingInfo.beds}, ${listingInfo.baths}, ${listingInfo.street_address}, ${listingInfo.street_name}, ${listingInfo.city}, ${listingInfo.state}, ${listingInfo.zip_code})`, (err) => {
        if(err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

module.exports = {
    getHouseInfo,
    getNeighborhoodInfo,
    createNewListing
}