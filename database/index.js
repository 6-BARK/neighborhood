//reuire mongoose to write the schema
const mongoose = require('mongoose');
const fakedata = require ('./fakedata.js')
const data = fakedata.data;

//connnect to mongodb and create a db called 7-xillow
mongoose.connect('mongodb://localhost/7-xillow', {useMongoClient: true});
mongoose.connection.dropDatabase(); //drop if the db exists
let listingSchema = mongoose.Schema({ //create a Schema for the db

neighborhood: Number,
mapImage: String,
walk_score: Number,
transit_score: Number,
price:Number,
sqft: Number,
bedNumber: Number,
bathNumner: Number,
address: String,
nearbyImage:[{type: String}]

});

let Houses = mongoose.model('Houses', listingSchema)

let save = (listing)=> {


    var newListing = Houses ({

    neighborhood: listing.neighborhood,
    mapImage: listing.mapImage,
    walk_score: listing.walk_score,
    transit_score: listing.transit_score,
    price:listing.price,
    sqft: listing.sqft,
    bedNumber: listing.bedNumber,
    bathNumner: listing.bathNumner,
    address: listing.address,
    nearbyImage: listing.nearbyImage
    
    })
  

    newListing.save((err, newListing) => {
        if(err) {
            console.log(err)
        } else {
            console.log('this was success')
        }
    })
}

//seed mock data
var neighborhoodInfo = data(100)
neighborhoodInfo.forEach(listing => save(listing));

//to fetech data from the db
let fetch = (callback) => {
    //get something from the database ...
  Houses.find((err, documents) => {
      if(err) {
        callback (err)
      } else {
        callback( null, documents)
      }
    })

    }

module.exports.save = save;
module.exports.fetch = fetch;