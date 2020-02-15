
const express = require('express');
const path = require('path');
const app = express();
// Set a constant for the port that our express server will listen on
const PORT = 3001;
const database = require('../nosql_db/index.js');
// const database = require('../sql_db/index.js');

app.use(express.json());

// Serve static files. Any requests for specific files will be served if they exist in the provided folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Create / POST - create a new item
// Read / GET - read an item
// Update / PUT - update an item
// Delete / DELETE - delete an item

// add item to db
app.post('/save', function(req, res) {
  database.save(req.body);
});

//get request to get the data from the db
app.get('/listings', function (req, res) {
    // TODO - your code here!
    // This route should send back the top 25 repos
  database.fetch((err, results) => {
    if(err) {
      console.log(err)
    } else {
      res.send(results)
    }
  });
});

app.put('/update', function(req, res) {
  database.update(req.body);
});

app.delete('/delist', function(req, res) {
  database.remove(req.body);
});

app.listen(PORT, () => console.log('Listening on port: ' + PORT));