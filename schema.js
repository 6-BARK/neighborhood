const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/neighbors', {useMongoClient: true});

let listingSchema = mongoose.Schema({
neighborhood: Number,
walk_score: Number,
transit_score: Number,
nearby_homes: [
    {
        price:Number,
        sqft: Number,
        bedNumber: Number,
        bathNumner: Number,
        address: String

    }
]

});




