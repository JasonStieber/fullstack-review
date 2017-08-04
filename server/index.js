const express = require('express');
const gitHub = require('../helpers/github.js');
var bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // console.log("string and a comma", req);

  // if(err) { throw err; } 
  gitHub.getReposByUsername(req.body.user)


  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  res.end();
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

