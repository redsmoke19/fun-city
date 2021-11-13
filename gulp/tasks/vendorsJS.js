const gulp = require('gulp');
const concat = require('gulp-concat');

const vendorsScripts = [
  'node_modules/svg4everybody/dist/svg4everybody.min.js',
  'node_modules/swiper/swiper-bundle.min.js',
  'dev/static/js/vendor/validate.js',
  'node_modules/lightgallery/lightgallery.min.js',
];

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp
      .src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/static/js/'))
    : cb();
};
