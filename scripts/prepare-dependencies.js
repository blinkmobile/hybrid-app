#!/usr/bin/env node
/*eslint-env node*/
/*eslint-disable no-sync*/ // this script is not sensitive to performance

'use strict';

// Node.js built-ins

var childProcess = require('child_process');
var path = require('path');

// 3rd-party modules

var rimraf = require('rimraf');
var Promise = typeof Promise === 'undefined' ? require('bluebird') : Promise;

// this module

var PLATFORMS = {
  //'android': '3.6.4',
  //'ios': '3.7.0'
  'windows': '3.8.0'
};
var PLUGINS = {
   'org.apache.cordova.statusbar' : '@0.1.9',
   'org.apache.cordova.camera' : '@0.3.5'
//'https://github.com/phonegap-build/StatusBarPlugin.git' : '#1.1.0'
};

var cwd = path.join(__dirname, '..');

function deletePlatforms() {
  console.info('removing platforms/ ...');
  return new Promise(function (resolve, reject) {
    rimraf(path.join(cwd, 'platforms'), function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function deletePlugins() {
  console.info('removing plugins/ ...');
  return new Promise(function (resolve, reject) {
    rimraf(path.join(cwd, 'plugins'), function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function execCordova(args) {
  return new Promise(function (resolve, reject) {
    childProcess.exec('cordova ' + args, {
      cwd: cwd
    }, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function installPlatforms() {
  var current = Promise.fulfilled();
  Promise.all(Object.keys(PLATFORMS).map(function (platform) {
    var version = PLATFORMS[platform];
    current = current.then(function () {
      console.info('installing ' + platform + ' v' + version + ' ...');
      return execCordova('platform add ' + platform + '@' + version);
    });
    return current;
  }));
}

function installPlugins() {
  var current = Promise.fulfilled();
  Promise.all(Object.keys(PLUGINS).map(function (plugin) {
    var version = PLUGINS[plugin];
    current = current.then(function () {
      console.info('installing ' + plugin + ' v' + version + ' ...');

      return execCordova('plugin add ' + plugin + version);
    });
    return current;
  }));
}

deletePlatforms()
.then(function () {
  return deletePlugins();
})
.then(function () {
  return installPlatforms();
})
.then(function () {
  return installPlugins();
})
.done();
