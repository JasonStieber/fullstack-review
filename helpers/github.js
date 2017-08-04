const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  var apiURL = 'https://api.github.com';
  var path = `/users/${username.toString()}/repos`;
  let options = {
    url: apiURL+path,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  // console.log(options.url);
  request.get(options, (e, r, repoArr) => {
    // console.log(JSON.parse(repoArr));
    var parsedRepos = JSON.parse(repoArr);
    for(var i = 0; i < parsedRepos.length; i++){
      db.save(parsedRepos[i]);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;
