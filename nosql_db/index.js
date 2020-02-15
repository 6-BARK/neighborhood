const mongoose = require('mongoose');
const fakedata = require('./fakedata.js');
const crypto = require('crypto');
const data = fakedata.data;

//connnect to mongodb and create a db called 7-xillow
mongoose.connect('mongodb://localhost/7-xillow', {useMongoClient: true}); // CHANGE THIS YOU SILLY CHILD
mongoose.connection.dropDatabase();
let neighborhoodSchema = mongoose.Schema({
  name: String,
  valueShift: Number,
  predictedShift: Number,
  zestimate: Number,
  walkScore: Number,
  transitScore: Number,
  listings: [{
    userName: String,
    address: String,
    map: String,
    price: Number,
    sqft: Number,
    bedrooms: Number,
    bathrooms: Number
  }]
});

let Neighborhoods = mongoose.model('Neighborhoods', neighborhoodSchema);

let userSchema = mongoose.Schema({
  userName: String,
  hash: String,
  salt: String
});

let Users = mongoose.model('Users', userSchema);

// legacy CRUD
// let save = (listing)=> {
//   var newListing = Neighborhoods ({
//     neighborhood: listing.neighborhood,
//     mapImage: listing.mapImage,
//     walk_score: listing.walk_score,
//     transit_score: listing.transit_score,
//     price:listing.price,
//     sqft: listing.sqft,
//     bedNumber: listing.bedNumber,
//     bathNumner: listing.bathNumner,
//     address: listing.address,
//     nearbyImage: listing.nearbyImage    
//   });

//   newListing.save((err) => {
//       if(err) {
//           console.log(err);
//       } else {
//           console.log(`created listing at ${listing.address}!`);
//       }
//   });
// }

// //to fetech data from the db
// let fetch = (callback) => {
//     //get something from the database ...
//   Houses.find((err, documents) => {
//     if(err) {
//       callback (err)
//     } else {
//       callback( null, documents)
//     }
//   });
// }

/* WRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY */

/*
 * neighborhood: {
 *   name: String,
 *   valueShift: Number,
 *   predictedShift: Number,
 *   zestimate: Number,
 *   walkScore: Number,
 *   transitScore: Number
 * }
 */
let saveNeighborhood = (neighborhood, callback) => {
  var newNeighborhood = Neighborhoods ({
    name: neighborhood.name,
    valueShift: neighborhood.valueShift,
    predictedShift: neighborhood.predictedShift,
    zestimate: neighborhood.zestimate,
    walkScore: neighborhood.walkScore,
    transitScore: neighborhood.transitScore,
    listings: []
  });

  newNeighborhood.save((err) => {
    if(err) {
      callback(err);
      // console.log(err);
    } else {
      callback(null);
      // console.log(`added new neighborhood: ${neighborhood.name}`);
    }
  });
}

/*
 * neighborhoodName: String
 * listing: {
 *   address: String,
 *   price: Number,
 *   map: String,
 *   sqft: Number,
 *   bedrooms: Number,
 *   bathrooms: Number,
 * 
 *   username: String,
 *   password: String
 * }
 */
let saveListing = (neighborhoodName, listing, callback) => {



  Neighborhoods.findOne({name: neighborhoodName}, (err, neighborhood) => {
    if (err) {
      callback(err);
      // console.log(err);
    }
    var listings = neighborhood.listings.push(listing);
    Neighborhoods.updateOne({name: neighborhoodName}, {listings: listings}, (err) => {
      if (err) {
        callback(err);
        // console.log(err);
      }
      callback(null);
      // console.log(`listing at ${listing.address} added to ${neighborhood.name}`);
    });
  });
}

/*
 * callback: Function
 */
let fetchNeighborhoods = (callback) => {
  Neighborhoods.find((err, neighborhoods) => {
    if (err) {
      callback(err);
    }
    callback(null, neighborhoods);
  });
}

/*
 * neighborhoodName: String
 * callback: Function
 */
let fetchNeighborhood = (neighborhoodName, callback) => {
  Neighborhoods.find({name: neighborhoodName}, (err, neighborhood) => {
    if (err) {
      callback(err);
    }
    callback(null, neighborhood);
  });
}

/*
 * neighborhoodName: String
 * callback: Function
 */
let fetchListings = (neighborhoodName, callback) => {
  Neighborhoods.find({name: neighborhoodName}, (err, neighborhood) => {
    if (err) {
      callback(err);
    }
    callback(null, neighborhood.listings);
  });
}

/*
 * neighborhoodName: String
 * address: String
 * callback: Function
 */
let fetchListing = (neighborhoodName, address, callback) => {
  Neighborhoods.find({name: neighborhoodName}, (err, neighborhood) => {
    if (err) {
      callback(err);
    }

    for (var listing of neighborhood.listings)
    {
      if (listing.address === address) {
        callback(null, neighborhood);
      }
    }
  });
}

/*
 * neighborhoodName: String
 * info: Object
 * callback: Function
 */
let updateNeighborhood = (neighborhoodName, info, callback) => {
  Neighborhoods.updateOne({name: neighborhoodName}, info, (err) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
}

/*
 * neighborhoodName: String
 * info: Object
 * callback: Function
 */
let updateListing = (neighborhoodName, address, info, callback) => {
  Neighborhoods.findOne({name: neighborhoodName}, (err, neighborhood) => {
    if (err) {
      callback(err);
    }
    var updatedListing;
    var updatedList = neighborhood.listings;
    for (var [ind, listing] of neighborhood.listings.entries()) {
      if (listing.address === address) {
        updatedListing = listing;
        for (var entry in listing) {
          updatedListing[entry] = info[entry];
          updatedList[ind] = updatedListing;
        }
      }
    }

    Neighborhoods.updateOne({name: neighborhoodName}, {listings: updatedList}, (err) => {
      if (err) {
        callback(err);
      }
      callback(null);
    });
  });
}

/*
 * neighborhoodName: String
 * callback: Function
 */
let deleteNeighborhood = (neighborhoodName, callback) => {
  Neighborhoods.deleteOne({name: neighborhoodName}, (err) => {
    if (err) {
      callback(err);
    }
    callback(null);
  })
}

/*
 * neighborhoodName: String
 * callback: Function
 */
let deleteListing = (neighborhoodName, address, callback) => {
  Neighborhoods.findOne({name: neighborhoodName}, (err, neighborhood) => {
    if (err) {
      callback(err);
    }
    var updatedListings = neighborhood.listings.length;
    var spliceHere;
    for (var i = 0; i < updatedListings.length; i++) {
      if(updatedListings[i].address === address) {
        spliceHere = i;
      }
    }

    updatedListings.splice(spliceHere, 1);

    Neighborhoods.updateOne({name: neighborhoodName}, {listings: updatedListings}, (err) => {
      if (err) {
        callback(err);
      }
      callback(null);
    });
  })
}

/* WRYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY */

// AH'M NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOKLEAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
//seed mock data
// var neighborhoodInfo = data(100);
// neighborhoodInfo.forEach(listing => save(listing));

// let update = (listing) => {
//   Houses.replaceOne({address: listing.address}, listing, {upsert: true}, (err) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`listing at ${listing.address} updated!`);
//     }
//   });
// }

// let remove = (listing) => {
//   Houses.findOneAndDelete(listing, (err) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`listing at ${listing.address} deleted!`);
//     }
//   });
// }

// crud
// module.exports.save = save;
// module.exports.fetch = fetch;
// module.exports.update = update;
// module.exports.remove = remove;

// CRUD
module.exports.saveNeighborhood = saveNeighborhood;
module.exports.saveListing = saveListing;
module.exports.fetchNeighborhoods = fetchNeighborhoods;
module.exports.fetchNeighborhood = fetchNeighborhood;
module.exports.fetchListings = fetchListings;
module.exports.fetchListing = fetchListing;
module.exports.updateNeighborhood = updateNeighborhood;
module.exports.updateListing = updateListing;
module.exports.deleteNeighborhood = deleteNeighborhood;
module.exports.deleteListing = deleteListing;