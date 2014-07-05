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
    SelfReferencingIncludeError: function SelfReferencingIncludeError(line){
      var e = Error.call(this,
      f('Spec: %s\nLine: %s\nAn include that includes itself was found.', line.file, line.number));
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
  running: {
    ExitedWithBadCodeError: function ExitedWithBadCodeError(code, spec){
      var e = Error.call(this,
      f('Spec %s exited with code %s', spec.path, code));
      this.stack = e.stack;
      this.message = e.message;
    }
  },
  validating: {
    ValidationError: function ValidationError(lines, line, msg){
      var e = Error.call(this,
      f('%s: %s\n   %s', ValidationError.name, msg, errors.getStack(lines, line)));
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
  },
  getStack: function getStack(lines, line){
    var index = lines.indexOf(line);
    var stack = lines.slice(0, index + 1);
    return stack.map(function(line){
      return f('%s (line %s)', line.file, line.number);
    }).reverse().join('\n   ');
  }
};


