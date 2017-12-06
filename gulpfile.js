const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');


// set up a static server
gulp.task('serve', function() {
    browserSync.init({
        server: "."
    });
});

// watch the html/scss files
gulp.task('watch', ['serve', 'sass'], function() {
    gulp.watch("app/assets/scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// compile SASS into CSS & hot reload the browser
gulp.task('sass', function() {
  return gulp.src("app/assets/scss/*.scss")
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'scss'
    }))
    .pipe(gulp.dest("app/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
gulp.task('server', ['serve']);
gulp.task('css-build', ['sass'])
gulp.task('sync', ['watch']);