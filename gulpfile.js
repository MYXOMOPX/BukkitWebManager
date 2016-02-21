"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
//var browserify = require('gulp-browserify');
var babelify = require('babelify');
// var bower = require('gulp-bower');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('gulp-rimraf'); // Удаление папки. Maven::clean
// var merge = require('merge-stream');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat-util');
var htmlclean = require('gulp-htmlclean');
var open = require('open'); // Открыть браузер
// var templateCache = require('gulp-angular-templatecache');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber'); // Игнорит ошибки при watch
var connect = require('gulp-connect'); // Web-сервер.
// var util = require('gulp-util');
// var env = util.env;
var gulpif = require('gulp-if');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var stringify = require('stringify');
var uglifyify = require('uglifyify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

/**
 * Сборка app.min.js
 */
gulp.task('build-js', function () {
    // set up the browserify instance on a task basis
    var b = browserify({
        entries: './src/js/modules/Main/Main.js',
        debug: true
    });
    try {
        b = b.transform(babelify, {
            stage: 0,
            ignore: /\.min\.js/
        });
        b = b.transform(stringify, ['.html']);
        b = b.transform(uglifyify, {ignore: '**/*.min.js', sourcemap: true});
    } catch (exception) {
        console.error(exception);
        arguments[0]();
    }


    return b.bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer()) // главное - работает!
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./out/js/'));
});

gulp.task('watch-js',gulp.series('build-js',function doWatchJs(){
    return gulp.watch("src/js/**/*",gulp.series('build-js'));
}));

gulp.task('build-less', function(){
    return gulp.src('./src/less/style.less')
        .pipe(less())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(rename('style.min.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./out/css/'))
});

gulp.task('watch-less',gulp.series('build-less',function doWatchLess(){
    return gulp.watch("src/less/**/*",gulp.series('build-less'));
}));



gulp.task('watch',gulp.parallel('watch-js','watch-less'));