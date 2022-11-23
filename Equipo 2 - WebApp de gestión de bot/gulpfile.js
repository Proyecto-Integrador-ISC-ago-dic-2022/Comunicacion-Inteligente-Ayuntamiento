var gulp = require('gulp');
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

// Genera el servidor loopback para accesar a la página en el puerto 8081
gulp.task('server', function(){
  gulp.src('./')
  .pipe(server({
    livereload: true,
    open: true,
    port: 8081,
    fallback: './pages/categorias.html'
  }));
  console.log('server online on loopback address (127.0.0.1) port: 8081');
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


//Abre una página en específico, uusado en pruebas de interacción yy visuales
gulp.task('open', function() {
  gulp.src('pages/categorias.html')
    .pipe(open());
});

//Inicializa los tasks de gulp y paraleliza los tasks server y watch. Abre el servidor en el puerto 8081
gulp.task('open-app', gulp.parallel('server', 'watch'));