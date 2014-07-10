'use strict';

var f = require('util').format;

describe('errors', function(){
  var errors = require('../lib/errors');

  [
    'CompileError',
    'ParseError',
    'SpunError',
    'ValidationError'
  ].forEach(function(constructor){
    it(f('should expose a %s constructor and be an instance of SpunError', constructor), function(){
      var instance;
      errors[constructor].should.be.type('function');
      instance = new errors[constructor]();
      instance.should.be.an.instanceOf(errors[constructor]);
      instance.should.be.an.instanceOf(errors.SpunError);
    });
  });

  describe('.createLineErrors()', function(){
    var createLineErrors = errors.createLineErrors;

    it('should assign errors to the target', function(){
      var target = {};
      var Parent = function(){};
      var line = {};
      var lines = [line];
      createLineErrors(target, Parent, [{name: 'FooError', message: 'wow'}]);
      (new target.FooError(line, lines)).should.be.an.instanceOf(Parent);
    });
  });

  describe('.getStack()', function(){
    var getStack = errors.getStack;

    it('should return line info', function(){
      var line1 = {file: 'line1file', number: 1};
      var line2 = {file: 'line2file', number: 2};
      var lines = [line1, line2];
      var stack = getStack(line2, lines);
      stack.join('').should.equal('line2file (line 2)line1file (line 1)');
    });
  });
});
