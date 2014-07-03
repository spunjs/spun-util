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
  },
  parsing: {
    InvalidSpecSourceError: function InvalidSpecSourceError(name){
      var e = Error.call(this, f('Invalid spec given: %j', name));
      this.stack = e.stack;
      this.message = e.message;
    },
    EmptySpecFileError: function EmptySpecFileError(path){
      var e = Error.call(this, f('Empty spec file at %s', path));
      this.stack = e.stack;
      this.message = e.message;
    },
    IncludeWithoutArgsError: function IncludeWithoutArgsError(line){
      var e = Error.call(this,
      f('Spec: %s\nLine: %s\nAn include without a path argument was found.', line.file, line.number));
      this.stack = e.stack;
      this.message = e.message;
    },
    InfiniteIncludeError: function InfiniteIncludeError(line){
      var e = Error.call(this,
        f(
          'Spec: %s\nLine: %s\nAn infinite include was detected.',
          line.file,
          line.number
        )
      );
      this.stack = e.stack;
      this.message = e.message;
    },
    InvalidIncludePathError: function InvalidIncludePathError(line){
      var e = Error.call(this,
      f('Spec: %s\nLine: %s\nAn invalid include path argument was found.', line.file, line.number));
      this.stack = e.stack;
      this.message = e.message;
    },
    MultipleMixinDeclarationsError: function MultipleMixinDeclarationsError(line){
      var e = Error.call(this,
      f('Multiple mixin declarations were found in %s', line.file));
      this.stack = e.stack;
      this.message = e.message;
    },
    SelfReferencingIncludeError: function SelfReferencingIncludeError(line){
      var e = Error.call(this,
      f('Spec: %s\nLine: %s\nAn include that includes itself was found.', line.file, line.number));
      this.stack = e.stack;
      this.message = e.message;
    },
    UnexpectedCloseInMixinError: function UnexpectedCloseInMixinError(line){
      var e = Error.call(this,
      f('Spec: %s\nLine: %s\nAn unexpected close command was found.', line.file, line.number));
      this.stack = e.stack;
      this.message = e.message;
    },
    UnexpectedMixinDeclarationError: function UnexpectedMixinDeclarationError(line){
      var e = Error.call(this,
      f('Spec: %s\nLine: %s\nAn unexpected mixin declaraion was found.', line.file, line.number));
      this.stack = e.stack;
      this.message = e.message;
    },
    UnexpectedQuitInMixinError: function UnexpectedQuitInMixinError(line){
      var e = Error.call(this,
      f('Spec: %s\nLine: %s\nAn unexpected quit command was found.', line.file, line.number));
      this.stack = e.stack;
      this.message = e.message;
    },
    UnresolveableIncludeError: function UnresolveableIncludeError(line){
      var e = Error.call(this,
        f(
          'Spec: %s\nLine: %s\nAn unresolveable include was detected.',
          line.file,
          line.number
        )
      );
      this.stack = e.stack;
      this.message = e.message;
    }
  },
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
  }
};
