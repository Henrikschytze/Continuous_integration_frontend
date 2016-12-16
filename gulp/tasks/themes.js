'use strict';

const gulp = require('gulp');
const config = require('../config.js');
const mergeStream = require('merge-stream');
var plugins = require('gulp-load-plugins')();

gulp.task('themes', function () {
    var streams = config.bundles.filter(function (b) {
        return b.themes != null;
    }).map(function (b) {

        console.log(b.name + ' themes are compiling');

        return gulp.src(b.themes)
            .pipe(plugins.plumber(config.errorHandler("themes")))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less())
            .pipe(plugins.cssnano(config.cssnanoSettings))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(config.stylesDist));
    });

    return mergeStream(streams);
});