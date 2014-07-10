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

    describe('.variableName', function(){
      it('should match camelCase', function(){
        regex.variableName.test('asdfAsdf2asdf').should.be.true;
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
});
