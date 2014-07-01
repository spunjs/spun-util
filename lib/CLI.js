'use strict';

module.exports = CLI;

var chalk = require('chalk');
var f = require('util').format;

function CLI(name){
  this.error = function error(msg){
    console.error(f('[%s] %s', chalk.red(name), msg));
  };

  this.log = function log(msg){
    console.log(f('[%s] %s', chalk.gray(name), msg));
  };

  this.warn = function warn(msg){
    console.warn(f('[%s] %s', chalk.yellow(name), msg));
  };
}
