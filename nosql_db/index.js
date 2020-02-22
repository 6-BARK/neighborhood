const mongoose = require('mongoose');
const user = require('../lib/user.js');
const seedData = require('./seedData.js');
const createListings = seedData.createListings;

//connnect to mongodb and create a db called 7-xillow
mongoose.connect('mongodb://localhost/neighborhoods'); // CHANGE THIS YOU SILLY CHILD
mongoose.connection.dropDatabase();

let neighborhoodSchema = mongoose.Schema({
  name: String,
  valueShift: Number,
  predictedShift: Number,
  zestimate: Number,
  walkScore: Number,
  transitScore: Number,
  listings: [listingSchema]
});

let listingSchema = mongoose.Schema({
  userId: String,
  address: String,
  map: String,
  price: Number,
  sqft: Number,
  bedrooms: Number,
  bathrooms: Number
});

let Neighborhoods = mongoose.model('Neighborhoods', neighborhoodSchema);

let userSchema = mongoose.Schema({
  userName: String,
  hash: String,
  salt: String
});

let Users = mongoose.model('Users', userSchema);

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
 * neighborhoodName: String,
 * username: String,
 * password: String,
 * listing: {
 *   address: String,
 *   price: Number,
 *   map: String,
 *   sqft: Number,
 *   bedrooms: Number,
 *   bathrooms: Number
 * }
 */
let saveListing = (neighborhoodName, username, password, listing, callback) => {
  Users.findOne({userName: username}, (err, userInfo) => {
    if(err) {
      callback(err);
    }
    if(user.compare(password, userInfo.hash, userInfo.salt)) {
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
    } else {
      callback(new Error('invalid login'));
    }
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
 * address: String
 * info: Object,
 * username: String,
 * password: String,
 * callback: Function
 */
let updateListing = (neighborhoodName, address, info, username, password, callback) => {
  Users.findOne({userName: username}, (err, userInfo) => {
    if(err) {
      callback(err);
    }
    if(user.compare(password, userInfo.hash, userInfo.salt)) {
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
  } else {
      callback(new Error('invalid login'));
    }
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
let deleteListing = (neighborhoodName, address, username, password, callback) => {
  Users.findOne({userName: username}, (err, userInfo) => {
    if(err) {
      callback(err);
    }
    if(user.compare(password, userInfo.hash, userInfo.salt)) {
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
      });
  } else {
      callback(new Error('invalid login'));
    }
  });
}

let login = (username, password, callback) => {
  Users.findOne({userName: username}, (err, userInfo) => {
    if(err) {
      callback(err);
    }
    if(user.compare(password, userInfo.hash, userInfo.salt)) {
      callback();
    } else {
      callback(new Error('invalid login'));
    }
  });
}

let seedDatabase = () => {
  var users = [];
  var data = createListings(users);

  console.log('seeding...');

  Users.insertMany(users, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Created users table');
    }
  });

  Neighborhoods.insertMany(data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Created listings table');
    }
  });
}

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
module.exports.seedDatabase = seedDatabase;