const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

//set up the static server 
gulp.task('serve', function() {
    browserSync.init({
        server: '.'
    });
});

gulp.task('watch', ['serve', 'sass'], function() {
    gulp.watch("app/styles/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile SASS into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/styles/scss/*.scss")
      .pipe(sass({
        sourceComments: 'map',
        sourceMap: 'scss'
      }))
      .pipe(gulp.dest("app/styles/css"))
      .pipe(browserSync.stream());
  });

  gulp.task('default', ['serve']);
  gulp.task('serve', ['serve']);
  gulp.task('sync', ['watch']);