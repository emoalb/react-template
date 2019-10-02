const childProcess = require('child_process');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const concatCss = require('gulp-concat-css');
const postcss = require('gulp-postcss');

function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError)).pipe(postcss([autoprefixer({
            overrideBrowserslist:
                "last 2 version",
            cascade: false
        })
        ])).pipe(concatCss("App.css"))
        .pipe(gulp.dest('./src'))
        .pipe(browserSync.reload({stream: true}));
}


function browserSyncServer(done) {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        reloadDelay: 500
    });
    done();
}


function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function webpackBuild() {
    return childProcess.spawn('webpackBuild.bat');
}

function copyHTML() {
    return gulp.src('./dist/*.html').pipe(gulp.dest('./dev'))

}

function compress() {
    return gulp.src('./dist/*.js').pipe(uglify()).pipe(gulp.dest('./dev'))

}

function watch() {
    gulp.watch(
        ['./src/**/*'],
        gulp.series(webpackBuild, browserSyncReload));

    gulp.watch(
        ['./scss/*'],
        gulp.series(style, webpackBuild, browserSyncReload));

    gulp.watch(
        ['./dist/*.html'],
        gulp.series(browserSyncReload));
}

gulp.task('default', gulp.series(style,webpackBuild, browserSyncServer, watch));
gulp.task('production', gulp.series(style,webpackBuild, copyHTML, compress));
