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
      res.writeHead(404, headers);
      res.end(console.log(error));
    } else {
      res.writeHead(200, headers);
      res.write(file);  
      res.end();  
    }
  };  

  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf-8', function(error, file) {
        res.writeHead(200, headers);
        res.write(file);  
        res.end();  
      });
    } else if (req.url === '/styles.css') {
      fs.readFile(archive.paths.siteAssets + '/styles.css', 'utf-8', function(error, file) {
        res.write(file);
        res.end();
      });  
    } else {
      fs.readFile(archive.paths.archivedSites + req.url, 'utf-8', handleFile);
    }
  }

  if (req.method === 'POST') {
    var message = '';
    req.on('data', function(chunk) {
      message += chunk;
      message = message.slice(4, message.length);
    }).on('end', function() {
      archive.readListOfUrls(function(listArray) {
        if (listArray.indexOf(message) === -1) {
          console.log(message, "new url, putting it in the text file")
          fs.appendFile(archive.paths.list, message + '\n');
          archive.downloadUrls(message);          
        }
      });      
      fs.readFile(archive.paths.archivedSites + '/' + message, 'utf-8', function(error, contents) {
        if (contents) {
          console.log("we have the contents!")
          res.writeHead(200, headers);
          res.write(contents);  
          res.end();  
        } else {
          console.log("download the url")
          fs.readFile(archive.paths.siteAssets + '/loading.html', 'utf-8', function(error, file) {
            res.writeHead(200, headers);
            res.write(file);  
            res.end();  
          });
        }
      });
    });         
  }
};
