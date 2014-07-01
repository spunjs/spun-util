'use strict';

module.exports.help = help;
module.exports.log = log;
module.exports.error = error;
module.exports.warn = warn;

var chalk = require('chalk');
var f = require('util').format;
var _process = require('./process');
var moduleName = 'spun';

_process.title = moduleName;

function help(code){
  var GLOBS = chalk.bold.underline('GLOBS');
  var SYNOPSIS = chalk.bold.underline('SYNOPSIS');
  var OPTIONS = chalk.bold.underline('OPTIONS');

  console.log([
    '',
    chalk.bold.underline('selenium-run'),
    '',
    f('  Usage: slrun [--cwd dir] %s...', GLOBS),
    '',
    SYNOPSIS,
    '  selenium-run executes selenium-spec files that have the ".sl" extension.',
    '',
    OPTIONS,
    f('  --cwd The cwd to resolve %s against.  By default process.cwd() will be used.', GLOBS),
    '',
    GLOBS,
    f('  An array of glob patterns.  By default, "./test/**/*.sl" will be used.  All %s are resolved against the value of --cwd.', GLOBS)
  ].join('\n'));

  _process.exit(parseInt(code) || 0);
}

function log(msg){
  console.log(f('[%s] %s', chalk.gray(moduleName), msg));
}

function error(msg){
  console.error(f('[%s] %s', chalk.red(moduleName), msg));
}

function warn(msg){
  console.warn(f('[%s] %s', chalk.yellow(moduleName), msg));
}
