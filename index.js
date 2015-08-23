'use strict';

var request = require('request');
var cheerio = require('cheerio');

var host = 'http://galeriakoloru.pl/dope-classic-spray-graffiti';


var getSite = function(url, cb){
  request(url, function(err, response, body) {
    try {
      cb(null, body);
    } catch (e) {
      cb(new Error('Error on response parsing for ' + url));
    }
  });
};

getSite(host, function(err, resp){
  var $ = cheerio.load(resp, {
    normalizeWhitespace: true
  });

  console.log($('.colorbox').length);
});
