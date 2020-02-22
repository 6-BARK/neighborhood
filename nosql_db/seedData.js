const faker = require('faker');
const user = require('../lib/user.js');

const nearbyImages = ['https://7-xillow.s3-us-west-1.amazonaws.com/img1.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img2.jpeg',
'https://7-xillow.s3-us-west-1.amazonaws.com/img3.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img4.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img5.jpeg',
'https://7-xillow.s3-us-west-1.amazonaws.com/img6.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img7.jpeg'
];

let createUser = () => {
    var name = faker.internet.userName();
    var password = faker.internet.password();
    return user.createUser({name, password});
}

let createNeighborhood = () => {
    return {
        name: faker.address.cityPrefix() + faker.address.citySuffix(),
        valueShift: faker.random.number(),
        predictedShift: faker.random.number(),
        zestimate: faker.random.number(),
        walkScore: faker.random.number(),
        transitScore: faker.random.number(),
        listings: []
    };
}

let createUsers = (count) => {
    var users = [];
    for(var i = 0; i < count; i++) {
        users.push(createUser());
    }

    return users;
}

let createNeighborhoods = (count) => {
    var neighborhoods = [];
    for (var i = 0; i < count; i++) {
        neighborhoods.push(createNeighborhood());
    }
}

let createListing = (user) => {
    return {
        userName: user,
        address: faker.address.streetAddress() + faker.address.streetName() + faker.address.city() + faker.address.state() +  faker.address.zipCode(),
        price: faker.random.number(),
        map: nearbyImages[Math.floor(Math.random() * 7)],
        sqft: faker.random.number(),
        bedrooms: faker.random.number(),
        bathrooms: faker.random.number()
    };
}

let createListings = (users, listingCount = 10000000) => {
    var neighborhoods = [createNeighborhood()];
    users = createUsers(10);
    for (var i = 0; i < listingCount; i++) {
        var bool =  neighborhoods[neighborhoods.length-1].listings.length > 0 && Math.random() * neighborhoods.length < neighborhoods.length/10;

        if (bool) {
            neighborhoods.push(createNeighborhood());
        }

        neighborhoods[neighborhoods.length-1].listings.push(createListing(users[i % 10]));
    }

    return neighborhoods;
}

module.exports.createListings = createListings;