"use strict";

/**
 Параметры:
    uglify - минимизирует код при true
    websocketAddress - подменяет адрес, куда подключается websocket (Адрес целиком: ws://host:port)
 */

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');
var rimraf = require('gulp-rimraf');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat-util');
var htmlclean = require('gulp-htmlclean');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
 var util = require('gulp-util');
 var env = util.env;
var gulpif = require('gulp-if');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');
var stringify = require('stringify');
var uglifyify = require('uglifyify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

/**
 * Проверка переменных env
 */

//if (!env.websocketAddress) {
//    env.websocketAddress = "ws://localhost:7373";
//}
//console.log(env);
/**
 * Сборка app.min.js
 */
gulp.task('build:js', function () {
    var b = browserify({
        entries: './src/js/modules/BWM/BWM.js',
        debug: true
    });
    try {
        b = b.transform(babelify, {
            stage: 0,
            ignore: /\.min\.js/
        });
        b = b.transform(stringify, ['.html']);
        if (env.uglify) {
            b = b.transform(uglifyify, {ignore: '**/*.min.js', sourcemap: true});
        }
    } catch (exception) {
        console.error(exception);
        arguments[0]();
    }


    return b.bundle()
        .pipe(source('app.min.js'))
        .pipe(replace("WEBSOCKET_ADDRESS",env.websocketAddress))
        .pipe(buffer()) 
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./out/js/'));
});

gulp.task('watch:js',gulp.series('build:js',function doWatchJs(){
    return gulp.watch("src/js/**/*",gulp.series('build:js'));
}));

gulp.task('build:less', function(){
    return gulp.src('./src/less/style.less')
        .pipe(less())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(rename('style.min.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./out/css/'))
});

gulp.task('watch:less',gulp.series('build:less',function doWatchLess(){
    gulp.watch("src/less/**/*",gulp.series('build:less'));
    return gulp.watch("src/css/*",gulp.series('build:less'));
}));


gulp.task('copy:image',function(){
    return gulp.src('./src/image/**/*')
        .pipe(gulp.dest("./out/image/"))
});

gulp.task('watch:image',gulp.series('copy:image',function doWatchImages(){
    return gulp.watch("src/image/**/*",gulp.series('copy:image'))
}));

gulp.task('watch',gulp.parallel('watch:js','watch:less'));
gulp.task('build',gulp.parallel('build:less','build:js'));

gulp.task("default",gulp.series('build'));