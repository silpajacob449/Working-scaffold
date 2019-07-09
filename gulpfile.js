// Dependencies
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    streamqueue = require('streamqueue'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglifyjs'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    injectPartials = require('gulp-inject-partials'),
    browserSync = require('browser-sync'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    compass = require('gulp-compass');
reload = browserSync.reload;

// Compass compiler
gulp.task('compass', function () {
    gulp.src('./dev/sass/**/*.scss')
        .pipe(plumber(function (error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe(compass({
            config_file: 'config.rb',
            css: './dev/css',
            sass: './dev/sass'
        }))
        .pipe(postcss([
            autoprefixer({
                browsers: ["> 0%"]
            })
        ]))
        .pipe(gulp.dest('./dist/css'))
        .pipe(gulp.dest('./dev/css'));
});

// Partial renderer
gulp.task('ptl_render', function () {
    return gulp.src('./dev/templates/*.html')
        .pipe(injectPartials({
            removeTags: true
        }))
        .pipe(gulp.dest('./dev'))
        .pipe(gulp.dest('./dist'));
});

// Uglify
gulp.task('uglify', function () {
    gulp.src('./dev/js/temp/bundle.js')
        .pipe(plumber(function (error) {
            gutil.log(error.message);
            this.emit('end');
        }))
        .pipe(uglify('main.js'))
        .pipe(gulp.dest('./dev/js'))
        .pipe(gulp.dest('./dist/js'))
});

// Gulp scripts
gulp.task('scripts', function () {
    return streamqueue({
                objectMode: true
            },
            gulp.src('dev/lib/jquery-3.3.1.min.js'),
            gulp.src('dev/lib/modernizr.custom.js'),
            gulp.src('dev/lib/bootstrap.min.js'),
            gulp.src('dev/lib/font-awsome-all.min.js'),
            gulp.src('dev/lib/owl.carousel.min.js'),
            gulp.src('dev/lib/jquery.lazy.min.js'),
            gulp.src('dev/lib/masonry.pkgd.min.js'),
            gulp.src('dev/lib/imagesloaded.js'),
            gulp.src('dev/lib/select2.min.js'),
            gulp.src('dev/lib/aos.js'),
            gulp.src('dev/lib/parallax.min.js'),
            gulp.src('dev/lib/script.js')

        )
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dev/js/temp'))
        .pipe(gulp.dest('dist/js/temp'));
});

// Copy images to dist folder
gulp.task('copyimages', function () {
    gulp.src('./dev/images/**/*.{svg,png,jpg,ico}')
        .pipe(gulp.dest('./dist/images'));
});

// Copy fonts to dist folder
gulp.task('copyfonts', function () {
    gulp.src('./dev/fonts/**/*.{ttf,woff,eof,svg}')
        .pipe(gulp.dest('./dist/fonts'));
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Browser auto reload */
gulp.task('browser-sync', function () {
    browserSync.init(['./dev/css/*.css', './dev/js/*.js'], {
        server: {
            baseDir: './dev/'
        }
    });
});


// Live watch
gulp.task('watch', ['ptl_render', 'scripts', 'uglify', 'browser-sync', 'copyimages', 'copyfonts', 'compass'], function () {
    gulp.watch('./dev/templates/**/*.html', ['ptl_render']);
    gulp.watch('./dev/sass/**/*.scss', ['compass']);
    gulp.watch('./dev/lib/**/*.js', ['scripts']);
    gulp.watch('./dev/js/temp/bundle.js', ['uglify']);
    gulp.watch(['./dev/css/styles.css', './dev/js/*.js'], ['bs-reload']);
    gulp.watch(['./dev/*.html'], ['bs-reload']);
    gulp.watch(['./dev/images/**/*.{svg,png,jpg,ico}'], ['bs-reload']);
    gulp.watch(['./dev/fonts/**/*.{ttf,woff,eof,svg}'], ['bs-reload']);
});