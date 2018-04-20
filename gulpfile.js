const gulp = require("gulp");
const gutil = require("gulp-util");
const source = require("vinyl-source-stream");
const babelify = require("babelify");
const browserify = require("browserify");

const production = false;

const dependencies = [
	"alt",
	"react",
	"react-dom",
	"react-router",
	"axios",
	"jquery",
	"moment",
	"simple-react-pdf2",
	"react-select2-wrapper",
	"react-file-drop"
];

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-vendor", function() {
	return browserify({
		debug: true
	})
		.require(dependencies)
		.bundle()
		.pipe(source("vendor.bundle.js"))
		.pipe(gulp.dest("js/build"));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify", ["browserify-vendor"], function() {
	return browserify({
		entries: "js/src/main.js",
		debug: true
	})
		.external(dependencies)
		.transform(babelify)
		.bundle()
		.pipe(source("bundle.js"))
		.pipe(gulp.dest("js/build"));
});

gulp.task("default", ["browserify-vendor", "browserify"]);
