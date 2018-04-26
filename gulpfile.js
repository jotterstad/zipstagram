// ## Globals
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var concat          = require('gulp-concat');
var cssmin         = require('gulp-cssmin');
var rename          = require('gulp-rename');
var browserSync     = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "192.168.1.150:3000"
    });
});

gulp.task('styles', function() {
    gulp.src(['./themes/zipstagram/_src/scss/site.scss'])
        .pipe(sass())
        .pipe(gulp.dest('./public/_dist/css/'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/_dist/css/'))
})

gulp.task('scripts', function() {
    gulp.src('./themes/zipstagram/_src/scripts/**/*.js')
    .pipe(concat('site.js'))
    .pipe(gulp.dest('./public/_dist/scripts/'))

})

gulp.task('watch', function() {
    browserSync.init({
        files: [
            //'./routes/index.js',
            './themes/zipstagram/views/*.njk',
            './public/_dist/**/*.css'
        ],
        proxy: '192.168.1.150:3000',
      });
    gulp.watch('./themes/zipstagram/_src/scripts/**/*', ['scripts']);
    gulp.watch('./themes/zipstagram/_src/scss/**/*', ['styles']);
})

gulp.task('default', ['styles','scripts'])