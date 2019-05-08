const gulp = require('gulp');
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync').create();

// compile scss into css
function style(){
    return gulp.src('./src/styles/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/styles/css'))
        .pipe(browserSync.stream());
}

function tScripts(){
    return gulp.src('./src/scripts/ts/**/*.ts')
        .pipe(ts())
        .on('error', () => { /* Ignore compiler errors */})
        .pipe(gulp.dest('./src/scripts/js/'))
        .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    });

    gulp.watch('./src/styles/scss/**/*.scss', style);
    gulp.watch('./src/scripts/ts/**/*.ts', tScripts);
    gulp.watch('./**/*.html').on('change',browserSync.reload);
}

exports.style = style;
exports.watch = watch;
exports.tScripts = tScripts;