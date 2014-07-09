'use strict';

var u = require('util');
var f = u.format;
var inherits = u.inherits;

var errors = module.exports = {
  compiling: {
    ExpectedAssignmentError: function ExpectedAssignmentError(line, value){
      var e = Error.call(this, f('Line %s: Expected an assignment but saw %s', line.number, value));
      this.stack = e.stack;
      this.message = e.message;
    },
    ExpectedStringError: function ExpectedStringError(line, value){
      var e = Error.call(this, f('Line %s: Expected a string but saw %s', line.number, value));
      this.stack = e.stack;
      this.message = e.message;
    },
    InvalidCommandError: function InvalidCommandError(line){
      var e = Error.call(this, f('Line %s: Invalid command syntax %j', line.number, line.text));
      this.stack = e.stack;
      this.message = e.message;
    },
    InvalidGetRequestError: function InvalidGetRequestError(line, location){
      var e = Error.call(this, f('Line %s: Invalid get request for %j', line.number, location));
      this.stack = e.stack;
      this.message = e.message;
    },
    InvalidUrlError: function InvalidUrlError(line, location){
      var e = Error.call(this, f('Line %s: Invalid URL %j', line.number, location));
      this.message = e.message;
      this.stack = e.stack;
    },
    MissingStrategyError: function MissingStrategyError(strategy){
      var e = Error.call(this, f('The provider had no "%s" method.', strategy));
      this.message = e.message;
      this.stack = e.stack;
    },
    ProgramStrategyError: function ProgramStrategyError(strategy){
      var e = Error.call(this, f('provider.program raised the following error:\n  %s', strategy));
      this.message = e.message;
      this.stack = e.stack;
    },
    StrategyError: function StrategyError(msg){
      var e = Error.call(this, msg);
      this.message = e.message;
      this.stack = e.stack;
    },
    UnknownAssignmentError: function UnknownAssignmentError(line, name, value){
      var e = Error.call(this, f('Line %s: Unkown assignment key %s with value %s', line.number, name, value));
      this.stack = e.stack;
      this.message = e.message;
    },
    UnknownCommandError: function UnknownCommandError(line, value){
      var e = Error.call(this, f('Line %s: Unknown command %s', line.number, value));
      this.stack = e.stack;
      this.message = e.message;
    }
  },
  running: {
    ExitedWithBadCodeError: function ExitedWithBadCodeError(code, spec){
      var e = Error.call(this,
      f('Spec %s exited with code %s', spec.path, code));
      this.stack = e.stack;
      this.message = e.message;
    },
    FailingSpecsError: function FailingSpecsError(count){
      var msg = count === 1
        ? '%s spec'
        : '%s specs';
      var e = Error.call(this,
      f(msg + ' failed.  See the output for details.', count));
      this.stack = e.stack;
      this.message = e.message;
    }
  },
  ParseError: ParseError,
  SpunError: SpunError,
  ValidationError: ValidationError,
  setup: {
    StrategyNotImplementedError: function StrategyNotImplementedError(strategy, provider, file){
      var e = Error.call(this, f('Strategy %s not implemented by %s for %s', strategy, provider, file));
      this.message = e.message;
      this.stack = e.stack;
    },
    StrategyProviderNotGivenError: function StrategyProviderNotGivenError(){
      var e = Error.call(this, 'No strategy provider was given.');
      this.message = e.message;
      this.stack = e.stack;
    }
  },
  createLineErrors: createLineErrors,
  getStack: getStack
};

function ParseError(){}
function SpunError(){}
function ValidationError(){}

inherits(ParseError, SpunError);
inherits(ValidationError, SpunError);

/**
 * Creates errors from an array.  Each error accepts a line and lines.
 *
 * @param target A namespace to assign the errors to.
 * @param Parent The that the errors inherit from.
 * @param errors An array of {name,message} objects that describe errors.
 * @param messageGenerator A function that accepts a message and a line.
 */

function createLineErrors(target, Parent, errors, messageGenerator){
  messageGenerator = messageGenerator || function(msg){return msg;};

  errors.forEach(function(error){
    var name = error.name;
    var msg = error.message;
    var Error = function(line, lines){
      this.message = messageGenerator(msg, line);
      this.stack = getStack(line, lines);
    };
    target[name] = Error;
    inherits(Error, Parent);
  });
}

/**
 * Returns a stack trace of spun lines.
 * @param line The line the error occurred on.
 * @param lines The lines containing the line.
 */

function getStack(line, lines){
  var index = lines.indexOf(line);
  var stack = lines.slice(0, index + 1);
  return stack.map(function(line){
    return f('%s (line %s)', line.file, line.number);
  }).reverse();
}

