'use strict';

var cat = require('../index.js');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');
var assert = require('assert');

describe('## gulp-file-include', () => {

	it('should work in buffer mode', function(done) {
		var stream = cat();
        var fakeBuffer = new Buffer("wadup");
        var fakeFile = new gutil.File({
            contents: fakeBuffer
        });

        var fakeBuffer2 = new Buffer("doe");
        var fakeFile2 = new gutil.File({
            contents: fakeBuffer2
        });

        stream.on('data', function(newFile) {
            if (newFile === fakeFile) {
                assert.equal(fakeBuffer, newFile.contents);
            } else {
                assert.equal(fakeBuffer2, newFile.contents);
            }
        });

        stream.on('end', function() {
            done();
        });

        stream.write(fakeFile);
        stream.write(fakeFile2);
        stream.end();
    });
});
