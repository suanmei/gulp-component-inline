'use strict';

var component = require('../index.js');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');

describe('## gulp-component-inline', function() {
	var result = fs.readFileSync('test/fixtures/result.js', 'utf8');
	it('should work in buffer mode && compile arttemplate and css file into js', function() {
	    var file = new gutil.File({path: 'test/fixtures/index.js', contents: fs.readFileSync('test/fixtures/index.js')});

	    var stream = component();
	    stream.on('data', newFile => {
	        should.exist(newFile);
	        should.exist(newFile.contents);

	        String(newFile.contents).should.equal(result);
	        done();
	    });

	    stream.write(file);
	    stream.end();
    });
});
