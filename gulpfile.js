const gulp = require('gulp');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync').create();

// compile scss into css
function style(){
    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream());
}

function tScripts(){
    return gulp.src('./typescript/**/*.ts')
        .pipe(ts())
        .on('error', () => { /* Ignore compiler errors */})
        .pipe(gulp.dest('./src/javascript/'))
        .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });

    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./typescript/**/*.ts', tScripts);
    gulp.watch('./**/*.html').on('change',browserSync.reload);
}

exports.style = style;
exports.watch = watch;
exports.tScripts = tScripts;