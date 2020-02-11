//require faker to generate fake data
const faker = require ('faker')

const nearbyImages = ['https://7-xillow.s3-us-west-1.amazonaws.com/img1.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img2.jpeg',
'https://7-xillow.s3-us-west-1.amazonaws.com/img3.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img4.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img5.jpeg',
'https://7-xillow.s3-us-west-1.amazonaws.com/img6.jpeg', 'https://7-xillow.s3-us-west-1.amazonaws.com/img7.jpeg'
]


//generate seed data using faker
let data = (num)=> {
    var neighborhoodArray =[];
    for (var j=0; j < nearbyImages.length; j++){
      var images = nearbyImages[j];
    }
    for(var i=0; i<num; i++){
       
      var neighborhoodObj ={}
      var address= '';
  
      neighborhoodObj.neighborhood= faker.random.number(),
      neighborhoodObj.mapImage= 'https://7-xillow.s3-us-west-1.amazonaws.com/clearImage1.png',
      // neighborhoodObj.walk_score = faker.random.number(),
      // neighborhoodObj.transit_score = faker.random.number(),
      neighborhoodObj.walk_score = 23,
      neighborhoodObj.transit_score = 12,
      neighborhoodObj.price = faker.random.number(),
      neighborhoodObj.sqft = faker.random.number(),
      neighborhoodObj.bedNumber = faker.random.number(),
      neighborhoodObj.bathNumner = faker.random.number(),
    //   neighborhoodObj.address = faker.address
    address += faker.address.streetAddress() + " ";
    address += faker.address.streetName() + " ";
    address += faker.address.city() + " ";
    address += faker.address.state() + " ";
    address += faker.address.zipCode();

    neighborhoodObj.address = address

 
    neighborhoodObj.nearbyImage = nearbyImages;

    neighborhoodArray.push(neighborhoodObj);

    }
    return neighborhoodArray;
}

module.exports.data = data;