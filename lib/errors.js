'use strict';

var u = require('util');
var f = u.format;
var inherits = u.inherits;

var errors = module.exports = {
  CompileError: CompileError,
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

function CompileError(){}
function ParseError(){}
function SpunError(){}
function ValidationError(){}

inherits(CompileError, SpunError);
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

