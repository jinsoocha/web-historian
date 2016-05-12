var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


exports.handleRequest = function (req, res) {

  
  var handleFile = function (error, file) {
    if (error) {
      return console.error('Uhoh, there was an error', error);
    } else {
      res.writeHead(200, headers);  
      res.write(file);  
      res.end();  
    }
  };  

  if (req.method === 'GET') {
    fs.readFile(archive.paths.siteAssets + '/index.html', 'utf-8', handleFile);
  }

  if (req.method === 'POST') {
    var message;
    req.on('data', function(chunk) {
      message = chunk.slice(4, chunk.length) + '\n';
    }).on('end', function() {
      fs.writeFile(archive.paths.list, message, function() {
        message + '>' + archive.paths.list;
      });
      res.writeHead(302, headers);
      res.end();
    }); 
  }
};
