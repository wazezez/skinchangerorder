var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var minifyCSS = require('gulp-minify-css');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var del = require('del');
var htmlPartial = require('gulp-html-partial');

// Go to host
var rsync = require('gulp-rsync');
var prompt = require('gulp-prompt');
var gutil = require('gulp-util');
var argv  = require('minimist')(process.argv);
var ftp = require( 'vinyl-ftp' );


gulp.task('useref', function(){
  return gulp.src('dev/*.html')
    .pipe(htmlPartial({
        basePath: 'dev/partials/'
    }))
    .pipe(useref())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('scripts',function(){
  return gulp.src(
    [
    'node_modules/babel-polyfill/dist/polyfill.js',
    'dev/**/*.js'
    ])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})


//
// Очистка DIST
//
gulp.task('clean:dist', function(callback){
  del(['dist/**/*', '!dist/images', '!dist/images/**/*'], callback)
});


gulp.task('sass', function() {
  return gulp.src('dev/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('htmlpartials', function() {
  return gulp.src('dev/**/*.html')
    .pipe(htmlPartial({
        basePath: 'dev/partials/'
    }))
    .pipe(gulp.dest('dev'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dev'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  // Обновляем браузер при любых изменениях в HTML или JS
  // gulp.watch('dev/**/*.html', ['htmlpartials']);
  gulp.watch('dev/**/*.html', browserSync.reload);
  gulp.watch('dev/js/**/*.js', browserSync.reload);
});

// *
// Сжатие изображений
//
gulp.task('images', function(){
  return gulp.src('dev/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// *
// Перенос шрифтов
// *
gulp.task('fonts', function() {
  return gulp.src('dev/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// *
// Build
// *
gulp.task('build', function (callback) {
  runSequence('useref','scripts',
    ['sass', 'images', 'fonts'],
    callback
  )
})
