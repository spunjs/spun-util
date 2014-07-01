'use strict';

var should = require('should');

describe('spun-util', function(){
  var sinon = require('sinon');
  var processTitle = 'node';
  var _process = {
    /* jshint ignore:start */
    set title(title){
      processTitle = title;
    },
    /* jshint ignore:end */
    exit: sinon.stub()
  };
  var prequire = require('proxyquire').noCallThru();
  var cli = prequire('../lib/cli', {
    './process': _process
  });
  var sUtil = prequire('..', {
    './cli': cli
  });


  before(function(){
    _process.exit.reset();
  });

  it('should change process title to spun', function(){
    processTitle.should.equal('spun');
  });

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

    describe('.stringQuotes', function(){
      it('should match appropriately', function(){
        regex.stringQuotes.test('f"').should.be.true;
        regex.stringQuotes.test('"f').should.be.false;
      });
    });

    describe('.emptyLines', function(){
      it('should match empty lines and comments', function(){
        [
          '     ',
          '#asdf',
          'foo',
          '   #asdfasdf',
          'boo',
          ''
        ].join('\n')
        .replace(regex.emptyLines, '')
        .should.equal('foo\nboo\n');
      });
    });
  });

  describe('cli', function(){
    describe('log', function(){
      it('should log to console', function(){
        sUtil.cli.log('log');
      });
    });

    describe('warn', function(){
      it('should warn to console', function(){
        sUtil.cli.warn('warning');
      });
    });

    describe('error', function(){
      it('should error to console', function(){
        sUtil.cli.error('error');
      });
    });

    describe('help', function(){
      it('should call process.exit(0) with no args', function(){
        sUtil.cli.help();
        sinon.assert.calledWith(_process.exit, 0);
      });

      it('should call process.exit() with an exit code', function(){
        sUtil.cli.help(5);
        sinon.assert.calledWith(_process.exit, 5);
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
