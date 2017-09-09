'use strict';

var through = require('through2');
var path = require('path');
var fs = require('fs');
var template = require('ali-arttemplate');
var cssmin = require('cssmin');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-component-inline';
var INLINE_REGEX = /__inline\([^\)].*\)/m;
var FILE_REGEX = /__inline\(["']([^"^']*)/;

module.exports = function(options) {
    options = options || {}; // 自定义配置扩展口

    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Cannot use streamed files'));
            return cb();
        }

        if (file.isBuffer()) {
			var contents = 'wadup';



            file.contents = new Buffer(contents);
        }
        cb(null, file);
    });
};
