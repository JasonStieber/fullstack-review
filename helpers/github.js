const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  var apiURL = 'https://api.github.com';
  var path = `/orgs/${username.toString()}/repos`;
  let options = {
    url: apiURL+path,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  console.log(request.get(options));

}

module.exports.getReposByUsername = getReposByUsername;
