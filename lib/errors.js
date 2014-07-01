'use strict';

var u = require('util');
var f = u.format;
var inherits = u.inherits;

module.exports = {
  running: (function(){
    var i = 1;

    return {
      NO_SCRIPT_GIVEN: i++,
      ERROR_RUNNING_SOURCE: i++
    };
  })(),
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
    InvalidSpecError: function InvalidSpecError(name){
      var e = Error.call(this, f('Invalid spec given: %j', name));
      this.stack = e.stack;
      this.message = e.message;
    },
    InvalidUrlError: function InvalidUrlError(line, location){
      var e = Error.call(this, f('Line %s: Invalid URL %j', line.number, location));
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
  }
};
