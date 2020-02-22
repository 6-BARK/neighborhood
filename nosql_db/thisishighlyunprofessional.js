const mongoose = require('mongoose');
const user = require('../lib/user.js');
const faker = require('faker');

const nearbyImages = ['https://7-xillow.s3-us-west-1.amazonaws.com/img1.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img2.jpeg',
'https://7-xillow.s3-us-west-1.amazonaws.com/img3.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img4.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img5.jpeg',
'https://7-xillow.s3-us-west-1.amazonaws.com/img6.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img7.jpeg'
];

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/neighborhoods', { useNewUrlParser: true }); // CHANGE THIS YOU SILLY CHILD
mongoose.connection.dropDatabase();
// mongoose.connect('mongodb://localhost/neighborhoods'); // CHANGE THIS YOU SILLY CHILD
// mongoose.connection.dropDatabase();


let listingSchema = mongoose.Schema({
  user_id: Number,
  map: String,
  price: Number,
  sqft: Number,
  bedrooms: Number,
  bathrooms: Number,
  street_address: String,
  street_name: String,
  city: String,
  state: String,
  zip_code: String
});

let neighborhoodSchema = mongoose.Schema({
    name: String,
    value_shift: Number,
    predicted_shift: Number,
    zestimate: Number,
    walk_score: Number,
    transit_score: Number,
    listings: [listingSchema]
  });

let Neighborhoods = mongoose.model('Neighborhoods', neighborhoodSchema);

let userSchema = mongoose.Schema({
  _id: Number,
  user_name: String,
  hash: String,
  salt: String
});

let Users = mongoose.model('Users', userSchema);

let createFiveHundredThousandRandomNeighborhoods = () => {
  var neighborhoods = [];
  for (var i = 0; i < 500000; i++) {
    neighborhoods.push({
      name: `${faker.address.cityPrefix()} ${faker.address.citySuffix()}`,
      value_shift: faker.random.number(),
      predicted_shift: faker.random.number(),
      zestimate: faker.random.number(),
      walk_score: faker.random.number(),
      transit_score: faker.random.number(),
      listings: []
    });
  }

  // Neighborhoods.insertMany(neighborhoods);
  return neighborhoods;
};

let createFiveMillionRandomUsers = () => {
  var users = [];

  for (var i = 0; i < 5000000; i++) {
    var username = faker.internet.userName();
    var password = faker.internet.password();
    var newUser = user.createUser({username, password});
    newUser._id = i;
    users.push(newUser);
  }

  return users;
};

let createTenMillionRandomListings = (neighborhoods) => {
  for (var i = 0; i < 10000000; i++) {
    var newListing = {
      user_id: Math.floor(Math.random() * 5000000),
      map: nearbyImages[Math.floor(Math.random() * 7)],
      price: faker.random.number(),
      sqft: faker.random.number(),
      bedrooms: faker.random.number(),
      bathrooms: faker.random.number(),
      street_address: faker.address.streetAddress(),
      street_name: faker.address.streetName(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip_code: faker.address.zipCode()
    };
    neighborhoods[Math.floor(Math.random * 500000)].listings.push(newListing);
  }

  return neighborhoods;
};



// let insert = createFiveMillionRandomUsers();
// Users.insertMany(insert);
// insert = createTenMillionRandomListings(createFiveHundredThousandRandomNeighborhoods());
// Neighborhoods.insertMany(insert);

let insertNeighborhoods = async () => {
  for(var o = 0; o < 1000; o++) {
    var neighborhoods = [];
    for(var i = 0; i < 500; i++) {
      neighborhoods.push({
        name: `${faker.address.cityPrefix()} ${faker.address.citySuffix()}`,
        value_shift: faker.random.number(),
        predicted_shift: faker.random.number(),
        zestimate: faker.random.number(),
        walk_score: faker.random.number(),
        transit_score: faker.random.number(),
        listings: []
      });
      for (var n = 0; n < 20; n++) {
        var newListing = {
          user_id: Math.floor(Math.random() * 5000000),
          map: nearbyImages[Math.floor(Math.random() * 7)],
          price: faker.random.number(),
          sqft: faker.random.number(),
          bedrooms: faker.random.number(),
          bathrooms: faker.random.number(),
          street_address: faker.address.streetAddress(),
          street_name: faker.address.streetName(),
          city: faker.address.city(),
          state: faker.address.state(),
          zip_code: faker.address.zipCode()
        };
        neighborhoods[neighborhoods.length-1].listings.push(newListing);
      }
    }
    await Neighborhoods.insertMany(neighborhoods);
  }
  console.log('dunzo');
}

insertNeighborhoods();
