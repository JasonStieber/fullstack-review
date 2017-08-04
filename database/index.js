const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open' function(){

// });

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  url: String,
  date: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  var getHub = new Repo({name: repo.name, description: repo.description, 
                         url: repo.html_url, date: repo.updated_at});
  getHub.save((err, getHub) => {
    if(err) return console.log(err);
  
  });
  console.log('archrived ');
};

module.exports.save = save;
