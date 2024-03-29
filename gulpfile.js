var gulp = require("gulp");
var sass = require("gulp-sass");
var ap	 = require("gulp-autoprefixer");
var browser   = require("browser-sync");
var plumber = require("gulp-plumber");
var cssmin = require("gulp-minify-css");
var imagemin = require("gulp-imagemin");
var glob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');
var notify = require( 'gulp-notify' );


// js
gulp.task('js', function() {
	gulp.src(['src/js/**/*.js'])
		.pipe(uglify())
		.pipe( gulp.dest('assets/js'));
	});

gulp.task('sass', function () {
		return gulp
				.src('src/sass/*.scss')
				.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
				.pipe(glob())
				.pipe(sass())
				.pipe(ap())
				.pipe(cssmin())
				.pipe(gulp.dest('./'));
});

// browser
gulp.task("browser-sync", function () {
		browser({
					// WordPress
				proxy: "http://127.0.0.1:8080"
					//static
//				server: {
//					baseDir: "./",
//					index: "index.html"
//				}
		});
});

gulp.task("bs-reload", function () {
		browser.reload();
});


// imagemin
gulp.task("imagemin", function(){
	gulp.src("src/img/*.{png,jpg,gif,svg}")
		.pipe(imagemin())
		.pipe(gulp.dest("assets/img"));
	});

// watch
gulp.task("watch",["browser-sync"], function() {
		gulp.watch("src/sass/**/*.scss",["sass","bs-reload"]);
		gulp.watch("*.php", ["bs-reload"]);
		gulp.watch("**/*.php", ["bs-reload"]);
		gulp.watch("style.css", ["bs-reload"]);
		gulp.watch("src/img/**", ["imagemin","bs-reload"]);
	});

// build
gulp.task("default",["sass","imagemin","js","watch"]);

gulp.task('build', ['sass', 'imagemin','js'], function() {
	console.log('done');
});
