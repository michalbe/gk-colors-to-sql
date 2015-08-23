'use strict';

var request = require('request');

var host = 'http://galeriakoloru.pl/dope-classic-spray-graffiti';


var getSite = function(url, cb){
  request(url, function(err, response, body) {
    try {
      cb(null, response);
    } catch (e) {
      cb(new Error('Error on response parsing for ' + url));
    }
  });
};

getSite(host, function(err, resp){
  console.log(resp);
});
