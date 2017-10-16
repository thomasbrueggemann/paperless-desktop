var gulp = require("gulp");
var gutil = require("gulp-util");
var gulpif = require("gulp-if");
var streamify = require("gulp-streamify");
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-cssmin");
var less = require("gulp-less");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var source = require("vinyl-source-stream");
var babelify = require("babelify");
var browserify = require("browserify");
var watchify = require("watchify");
var uglify = require("gulp-uglify");

var dependencies = [
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

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task("browserify-watch", ["browserify-vendor"], function() {
	var bundler = watchify(browserify("main.js", watchify.args));
	bundler.external(dependencies);
	bundler.transform(babelify);
	bundler.on("update", rebundle);
	return rebundle();

	function rebundle() {
		var start = Date.now();
		return bundler
			.bundle()
			.on("error", function(err) {
				gutil.log(gutil.colors.red(err.toString()));
			})
			.on("end", function() {
				gutil.log(
					gutil.colors.green(
						"Finished rebundling in",
						Date.now() - start + "ms."
					)
				);
			})
			.pipe(source("bundle.js"))
			.pipe(gulp.dest("js/"));
	}
});

gulp.task("default", ["browserify-vendor", "browserify"]);
