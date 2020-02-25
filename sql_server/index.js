require('newrelic');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../sql_db/index.js');

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/listings/:houseId', (req, res) => {
  // console.log(req.body);
  db.getHouseInfo(req.params.houseId, (err, houseInfo) => {
    if(err) {
      res.status(400).end('House listing does not exist');
    } else {
      res.status(200).json(houseInfo);
    }
  });
});

app.get('/api/neighborhoods/:neighborhoodId', (req, res) => {
  db.getNeighborhoodInfo(req.params.neighborhoodId, (err, neighborhoodInfo) => {
    if(err) {
      res.status(400).end('Neighborhood does not exist');
    } else {
      res.status(200).json(neighborhoodInfo);
    }
  });
});

app.post('/api/listings', (req, res) => {
  db.createNewListing(req.body, (err) => {
    if(err) {
      res.status(400).end('Failed to post new listing');
    } else {
      res.status(200).end('Successfully created new listing');
    }
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
