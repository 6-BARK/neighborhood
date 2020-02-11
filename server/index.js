
const express = require('express');
const path = require('path');
const app = express();
// Set a constant for the port that our express server will listen on
const PORT = 3001;
const database = require ('../database/index.js')

app.use(express.json())

// Serve static files. Any requests for specific files will be served if they exist in the provided folder
app.use(express.static(path.join(__dirname, '../client/dist')));


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

app.listen(PORT, () => console.log('Listening on port: ' + PORT));