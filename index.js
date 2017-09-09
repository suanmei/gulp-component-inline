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
			var contents = fs.readFileSync(file, 'utf-8');

            contents = contents.replace(INLINE_REGEX, function(matchString, index) {
                var compFile = matchString.match(FILE_REGEX)[1];
                var compileResult;

				compFile = path.join(path.dirname(file.path), '/', compFile);

				if (!fs.existsSync(compFile)) {
					this.emit('error', new PluginError(PLUGIN_NAME, "File not found: " + compFile));
			          	return cb();
		        }

                if(/\.css$/.test(compFile)) {
                    compileResult = compileCss(compFile);
                } else {
                    compileResult = compileTmpl(compFile);
                }

                return compileResult;
            });

	        function compileCss(compFile) {
	            var result = fs.readFileSync(compFile, 'utf-8');

	            result = cssmin(result);
	            result = result.replace(/\'/g, '"');

	            return "__inline('" + result + "')";
	        }

	        function compileTmpl(compFile) {
	            var result = fs.readFileSync(compFile, 'utf-8');
	            var content = template.compile(result).toString().replace(/^function anonymous/, 'function');

	            content = content.replace("'use strict';", '');
				
	            return '[' + content + '][0]';
	        }

            file.contents = new Buffer(contents);
        }
        cb(null, file);
    });
};
