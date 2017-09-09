'use strict';

var component = require('../index.js');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');

describe('## gulp-component-inline', function() {

	it('should pass file when it isNull()', function(done) {
	    var stream = component();
	    var emptyFile = {
	        'isNull': function() {
	            return true;
	        }
	    };
	    stream.on('data', function(data) {
	        data.should.equal(emptyFile);
	        done();
	    });
	    stream.write(emptyFile);
		stream.end();
	});

	it('should emit error when file isStream()', function(done) {
	    var stream = component();
	    var streamFile = {
	        'isNull': function() {
	            return false;
	        },
	        'isStream': function() {
	            return true;
	        }
	    };
	    stream.on('error', function(err) {
	        err.message.should.equal('Cannot use streamed files');
	        done();
	    });
	    stream.write(streamFile);
	    stream.end();
	});

	it('should compile arttemplate and css files into js', function(done) {
	    var file = new gutil.File({path: 'test/fixtures/index.js', contents: fs.readFileSync('test/fixtures/index.js')});
		var result = fs.readFileSync('test/fixtures/result.js', 'utf8');
	    var stream = component();

	    stream.on('data', function(newFile) {
	        should.exist(newFile);
	        should.exist(newFile.contents);

	        String(newFile.contents).should.equal(result);
	        done();
	    });

		stream.on('error', function(err) {
	        err.message.should.equal('File is not existed');
	        done();
	    });

	    stream.write(file);
	    stream.end();
    });
});
