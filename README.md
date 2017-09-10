# gulp-component-inline
[![Build Status][travis-img]][travis-url]
[![Coverage Status][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]

Gulp Plugin which inlines artTemplate file (or css files) directly in JS by '\_\_inline', and compiles them into JS

# Install
	npm install gulp-component-inline --save-dev

# Basic Usage
```
const gulp = require('gulp');
const component = require('gulp-component-inline');

gulp.task('default', () =>
	gulp.src('src/*.js')
		.pipe(component())
		.pipe(gulp.dest('dist'))
);
```

The plugin can actively recognize which type of file do you want to compile. So it don't need any extra APIs, just use it simply in you task.

# Example

### index.js
```
__inline('../tmpl/index.tmpl');
__inline('../css/index.css');
__inline('../css/index.scss');
```

### index.tmpl
```
<span class="menu-name">{{menu.title}}</span>
```

### index.css
```
p {
  margin: 0;
}
```

### index.scss
```
div {
  text-align: center;

  a {
    color: red;
  }
}
```

Finally, `index.js` will compile to what is bellow:

```
[function($data,$filename
/*``*/) {
var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,menu=$data.menu,$out='';$out+='<span class="menu-name">';
$out+=$escape(menu.title);
$out+='</span>\n';
return new String($out);
}][0];
__inline('p{margin:0}');
__inline('div{text-align:center}div a{color:red}');
```

Congratulations! You now have mastered the usage of the plugin.

# License
MIT

[travis-img]: https://travis-ci.org/suanmei/gulp-component-inline.svg?branch=master
[travis-url]: https://travis-ci.org/suanmei/gulp-component-inline
[coveralls-img]: https://coveralls.io/repos/github/suanmei/gulp-component-inline/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/suanmei/gulp-component-inline?branch=master
[license-img]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
