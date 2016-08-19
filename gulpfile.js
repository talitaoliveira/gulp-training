var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create(); // Time-saving synchronised browser testing.

// Constants with all directories and files path.
// ----------------------------------------------------------------------
const src_path = {
	html: 'src/html/*.html',
	htmlAll: 'src/html/**/*.html',
	css: 'src/css/*.sass',
	cssPure: 'src/css/*.css',
	cssAll: 'src/css/**/*',
}
const build_path = {
	index: 'build',
	css: 'build/css/',
}

// Watching directories with gulp-watch plugin.
// ---------------------------------------------------------------------
gulp.task('watch', function(){
  gulp.watch(src_path.htmlAll, ['html']);
  gulp.watch(src_path.cssAll, ['css']);
});

// HTML task.
// Using Jade with gulp-jade plugin.
// ----------------------------------------------------------------------
gulp.task('html', function(){
  gulp.src(src_path.html)
      .pipe(gulp.dest(build_path.index))
      .pipe(browserSync.stream());
});
// CSS task.
// Using Sass, Skeleton, and Sourcemaps
// with gulp-sass, and gulp-sourcemaps plugins.
// ----------------------------------------------------------------------
gulp.task('css', function(){
  gulp.src(src_path.css)
      .pipe(sass({
        // outputStyle: 'compressed' // CSS Compress: Just uncomment to enable.
      }).on('error', sass.logError))
      .pipe(gulp.dest(build_path.css))
      .pipe(browserSync.stream());
});

// Synchronised browser testing.
// ---------------------------------------------------------------------
gulp.task('browser-sync', ['css'], function() {
  browserSync.init({
    server: build_path.index
  });

  gulp.watch(build_path.cssAll, ['css']);
  gulp.watch(build_path.htmlAll).on('change', browserSync.reload);

});

// Gulp tasks.
// ---------------------------------------------------------------------
gulp.task('default', ['watch', 'html', 'css', 'browser-sync']);