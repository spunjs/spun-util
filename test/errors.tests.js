'use strict';

describe('errors', function(){
  var errors = require('../lib/errors');

  describe('.createLineErrors', function(){
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
});
