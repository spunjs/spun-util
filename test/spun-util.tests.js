'use strict';

var should = require('should');

describe('spun-util', function(){
  var sUtil = require('..');

  describe('regex', function(){
    var regex = sUtil.regex;

    describe('.string', function(){
      it('should match appropriately', function(){
        regex.string.exec('"asdf"')[1].should.equal('asdf');
        regex.string.test('\'asdf\'').should.be.false;
        regex.string.test('asdf').should.be.false;
      });
    });

    describe('.assignment', function(){
      it('should match appropriately', function(){
        regex.assignment.exec('f="asdf"')[1].should.equal('f');
        regex.assignment.exec('f="asdf"')[2].should.equal('asdf');
        regex.assignment.test('f=\'asdf\'').should.be.false;
        regex.assignment.test('f=asdf').should.be.false;
      });
    });

    describe('.command', function(){
      it('should match commands with params', function(){
        var results = regex.command.exec('foo asdf');
        results[1].should.equal('foo');
        results[2].should.equal('asdf');
      });

      it('should match commands without params', function(){
        var results = regex.command.exec('foo');
        results[1].should.equal('foo');
        should(results[2]).not.be.ok;
      });
    });

    describe('.stringQuotes', function(){
      it('should match appropriately', function(){
        regex.stringQuotes.test('f"').should.be.true;
        regex.stringQuotes.test('"f').should.be.false;
      });
    });

    describe('.emptyLines', function(){
      it('should match empty lines and comments', function(){
        [
          '   ',
          '#asdf',
          '   #asdfasdf',
          ''
        ].forEach(function(line){
          line.replace(regex.emptyLines, '').should.equal('');
        });
      });
    });
  });

  describe('cli', function(){
    var cli;

    before(function(){
      cli = new sUtil.CLI('spun-util');
    });

    describe('log', function(){
      it('should log to console', function(){
        cli.log('log');
      });
    });

    describe('praise', function(){
      it('should praise to console', function(){
        cli.praise('praise');
      });
    });

    describe('warn', function(){
      it('should warn to console', function(){
        cli.warn('warning');
      });
    });

    describe('error', function(){
      it('should error to console', function(){
        cli.error('error');
      });
    });
  });

  describe('errors', function(){
    var errors = sUtil.errors;

    Object.keys(errors.compiling).forEach(function(error){
      describe('.' + error, function(){
        it('should have error properties when thrown ' + error, function(){
          var line = {number: 5, text: 'asdf'};
          try {
            throw new errors.compiling[error](line, error);
          } catch(e) {
            e.message.should.be.type('string');
            e.stack.should.be.an.instanceOf(Object);
            e.should.be.an.instanceOf(errors.compiling[error]);
          }
        });
      });
    });
  });
});
