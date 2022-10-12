var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var server = require('gulp-webserver');

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/argon-dashboard.scss',
  SCSS: './assets/scss/**/**'
};

gulp.task('server', function(){
  gulp.src('./')
  .pipe(server({
    livereload: true,
    open: true,
    port: 8081,
    fallback: './pages/login.html'
  }));
  console.log('server online on loopback address (127.0.0.1) port: 8081')
});

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});


gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});



gulp.task('open', function() {
  gulp.src('pages/login.html')
    .pipe(open());
});

gulp.task('open-app', gulp.parallel('server', 'watch'));