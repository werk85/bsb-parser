var browserify = require('browserify');
var deploy = require('gulp-gh-pages');
var gulp = require('gulp');
var peg = require('gulp-peg');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');

function bundle() {
	return browserify('./lib/index.js', {
			standalone: 'bsbParser',
			debug: true
		})
		.bundle();
}

gulp.task('peg', function () {
	return gulp.src('./lib/grammar.pegjs')
		.pipe(peg())
		.pipe(gulp.dest('./build'));
});

gulp.task('default', ['peg'], function () {
	return bundle()
		.pipe(source('bsb-parser.js'))
		.pipe(gulp.dest('./dist'));
});

gulp.task('dist', ['peg', 'default'], function () {
	return bundle()
		.pipe(source('bsb-parser.min.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('./dist'));
});

gulp.task('deploy', ['dist'], function () {
	return gulp.src(['./dist/*'])
		.pipe(deploy());
});

gulp.task('watch', function () {
	gulp.watch('lib/**', ['default']);
});