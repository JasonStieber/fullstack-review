const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
const Promise = require('bluebird');
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open' function(){
Promise.promisifyAll(mongoose);
// });

let repoSchema = mongoose.Schema({
  repoId: Number,
  name: String,
  description: String,
  url: String,
  date: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  Repo.findOne({'repoId': repo.id}, 'date', function(err, existingRepo){
    if(err) {
      return console.log(err);
    } else if(existingRepo){ // the repo alreay exists update the date
      console.log('Entry already exists');
    } else { //it is a new repo add an entry
      var dbEntry = new Repo({repoId: repo.id, name: repo.owner.login, description: repo.description, 
                              url: repo.html_url, date: repo.updated_at});
    dbEntry.save((err, dbEntry) => {
      if(err){ console.log(err); }
      console.log('archrived ');
    });
  }
    
  });
};

let fetch = (numOfRepos, user) => {
  return Repo
    .find({name: user})
    .limit(numOfRepos)
    .sort('-date')
    .exec();
}

module.exports.save = save;
module.exports.fetch = fetch;
