var $           = require('gulp-load-plugins')();
var argv        = require('yargs').argv;
var gulp        = require('gulp');
var isProduction    = !!(argv.production);


var PATHS = {
  src:  'scss/*.scss',
  // YOUR SCSS Libraries
  sass: [
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src/'
  ],
  dist:'./react-ui/src/css',
  COMPATIBILITY: ['last 2 versions', 'ie >= 9'],
};

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function() {
  return gulp.src(PATHS.src)
    // .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
    .on('error', $.sass.logError))
    
    .pipe($.autoprefixer({
      browsers: PATHS.COMPATIBILITY
    }))
    .pipe(
      $.pleeease({
        sass: true,
        includePaths: PATHS.sass,
        sourcemaps: isProduction ? false : false,
        mqpacker: true,
        rem: false,
        pseudoElements: false,
        opacity: true,
        minifier: isProduction ? false : false,
      })
    )
    .pipe(gulp.dest(PATHS.dist));
});


// Build the site, run the server, and watch for file changes
gulp.task('default', ['sass'], function() {
  gulp.watch([PATHS.src], ['sass']);
});
