var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
    var array = [];
    data = data.split('\n');
    callback(data);
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(this.paths.list, 'utf-8', function(err, data) {
    var array = [];
    data = data.split('\n');
    
    for (var x = 0; x < data.length; x++) {
      callback(data[x]);
    }  
  });
};

//need to figure out what this one does 

exports.addUrlToList = function(url, callback) {
  var context = this;
  fs.writeFile(this.paths.list, url, function() {
    url = 'www.' + url + '\n';
    url + '>' + context.paths.list;
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readFile(this.paths.archivedSites + '/' + url, 'utf-8', function(err, data) {
    callback(data);
  });
};

exports.downloadUrls = function() {
};
