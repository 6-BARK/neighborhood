const faker = require('faker');
const fs = require('fs');
const user = require('../lib/user.js');

const nearbyImages = ['https://7-xillow.s3-us-west-1.amazonaws.com/img1.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img2.jpeg',
'https://7-xillow.s3-us-west-1.amazonaws.com/img3.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img4.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img5.jpeg',
'https://7-xillow.s3-us-west-1.amazonaws.com/img6.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img7.jpeg'
];

const writeNeighborhoods = fs.createWriteStream('neighborhoods.csv');
writeNeighborhoods.write('id,name,value_shift,predicted_shift,zestimate,walk_score,transit_score\n', 'utf8');

const writeHouses = fs.createWriteStream('houses.csv');
writeHouses.write('id,user,neighborhood,map,price,sqft,beds,baths,street_address,street_name,city,state,zip_code\n', 'utf8');

const writeUsers = fs.createWriteStream('users.csv');
writeUsers.write('id,username,hash,salt\n', 'utf8');

function writeFiveMillionUsers(writer, encoding, callback) {
  let i = 5000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const username = faker.internet.userName();
      const password = faker.internet.password();

      const newUser = user.createUser({username, password});
      const userData = `${id},${newUser.username},${newUser.hash},${newUser.salt}\n`;
      if (i === 0) {
        writer.write(userData, encoding, callback);
      } else {
      // see if we should continue, or wait
      // don't pass the callback, because we're not done yet.
        ok = writer.write(userData, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
  write()
}

function writeFiveHundredThousandNeighborhoods(writer, encoding, callback) {
  let i = 500000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const neighborhoodName = `${faker.address.cityPrefix()} ${faker.address.citySuffix()}`;
      
      const neighborhoodData = `${id},${neighborhoodName},${faker.random.number()},${faker.random.number()},${faker.random.number()},${faker.random.number()},${faker.random.number()}\n`;
      if (i === 0) {
        writer.write(neighborhoodData, encoding, callback);
      } else {
        ok = writer.write(neighborhoodData, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

function writeTenMillionListings(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const neighborhoodData = `${id},${Math.floor(5000000 * Math.random())},${Math.floor(500000 * Math.random())},${nearbyImages[Math.floor(Math.random() * 7)]},${faker.random.number()},${faker.random.number()},${faker.random.number()},${faker.random.number()},${faker.address.streetAddress()},${faker.address.streetName()},${faker.address.city()},${faker.address.state()},${faker.address.zipCode()}\n`;
      if (i === 0) {
        writer.write(neighborhoodData, encoding, callback);
      } else {
        ok = writer.write(neighborhoodData, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write()
}

writeFiveHundredThousandNeighborhoods(writeNeighborhoods, 'utf-8', () => {
  writeNeighborhoods.end();
});
writeFiveMillionUsers(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
writeTenMillionListings(writeHouses, 'utf-8', () => {
  writeHouses.end();
});