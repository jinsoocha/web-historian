var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(this.paths.list, 'utf-8', function(err, data) {
    data = data.split('\n');
    callback(data);
  });
};

// exports.isUrlInList = function(url, callback) {
//   this.readListOfUrls(function(listArray) {
//     for (var i = 0; i < listArray.length; i++) {
//       if (url === listArray[i]) {
//         found = true;
//       }
//     }
//     callback(found);
//   });
// };

//need to figure out what this one does 

exports.addUrlToList = function(url, callback) {
  var context = this;
  fs.writeFile(this.paths.list, url, function() {
    url = 'www.' + url + '\n';
    url + '>' + context.paths.list;
    callback();
  });
};

// exports.isUrlArchived = function(url) {
//   fs.readFile(this.paths.archivedSites + '/' + url, 'utf-8', function(err, data) {
//     if (data) {
//       return true;
//     }
//   });
// };

exports.downloadUrls = function(url) {
  var context = this;
  console.log("downloading!")
  var callback = function(url) {
    var options = {
      host: url,
      port: 80,
      path: '/'
    };

    var req = http.request(options, function(res) {
      var html = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        html += chunk;
      }).on('end', function() {
        fs.writeFile(context.paths.archivedSites + '/' + url, html, function() {
          html + '>' + context.paths.archivedSites;
        });
      });
    });

    req.end();
    
  };

  callback(url);

};
