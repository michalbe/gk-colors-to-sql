'use strict';

var request = require('request');
var cheerio = require('cheerio');


// CONFIG
var host = 'http://galeriakoloru.pl/dope-classic-spray-graffiti';
var lastId = 27;
var groupId = 4;
var langId = 1;

var getSite = function(url, cb){
  request(url, function(err, response, body) {
    try {
      cb(null, body);
    } catch (e) {
      cb(new Error('Error on response parsing for ' + url));
    }
  });
};

var output = [];
getSite(host, function(err, resp){
  var $ = cheerio.load(resp, {
    normalizeWhitespace: true
  });
  var color;
  var texturedColors = [];
  var colors = $('.colorbox');
  for (var i=0, l=colors.length; i<l; i++){
    color = $(colors[i]);
    output.push({
      name: color.find('span').html().replace('<br>', ' - '),
      color: color.find('.color').css('background-color') ||
        (texturedColors.push(i), 0),
      id: ++lastId
    });
  }

  if (texturedColors.length > 0) {
    console.log('Warning');
    console.log('Colors ', texturedColors, ' are textures');
  }

  var position = 0;
  for (color in output) {
    console.log(
      'INSERT INTO `rabeko`.`dev_attribute` (`id_attribute`, ' +
      '`id_attribute_group`, `color`, `position`) VALUES (\'' +
      output[color].id +'\', \'' + groupId + '\', \'' + output[color].color +
      '\', \'' + (position++) + '\');'
    );

    console.log(
      'INSERT INTO `rabeko`.`dev_attribute_lang` (`id_attribute`, `id_lang`, ' +
      '`name`) VALUES (\'' + output[color].id +'\', \'' + langId + '\', \'' +
      output[color].name + '\');'
    );
  }
});
