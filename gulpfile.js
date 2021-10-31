'use strict';

// Load Gulp and tools we will use.
var $          = require('gulp-load-plugins')(),
    del        = require('del'),
    extend     = require('extend'),
    fs         = require("fs"),
    gulp       = require('gulp'),
    importOnce = require('node-sass-import-once');

var options = {};

options.gulpWatchOptions = {};

// The root paths are used to construct all the other paths in this
// configuration. The "project" root path is where this gulpfile.js is located.
options.rootPath = {
  project     : __dirname + '/',
  theme       : __dirname + '/'
};

options.theme = {
  root       : options.rootPath.theme,
  scss       : options.rootPath.theme + 'assets/scss/',
  css        : options.rootPath.theme + 'assets/css'
};

// Define the node-scss configuration.
options.scss = {
  importer: importOnce,
  outputStyle: 'compressed',
  lintIgnore: ['scss/_settings.scss'],
  includePaths: [],
};

// Define which browsers to add vendor prefixes for.
options.autoprefixer = {
  browsers: [
    'last 10 versions',
    'ie >= 9'
  ]
};

// If config.js exists, load that config and overriding the options object.
if (fs.existsSync(options.rootPath.project + "/config.js")) {
  var config = {};
  config = require("./config");
  extend(true, options, config);
}

var scssFiles = [
  options.theme.scss + '**/*.scss',
  // Do not open scss partials as they will be included as needed.
  '!' + options.theme.scss + '**/_*.scss',
];

// The default task.
gulp.task('default', ['build']);

// Build everything.
gulp.task('build', ['sass', 'lint']);

// Default watch task.
// @todo needs to add a javascript watch task.
gulp.task('watch', ['watch:css']);

// Watch for changes for scss files and rebuild.
gulp.task('watch:css', ['sass', 'lint:sass'], function () {
  return gulp.watch(options.theme.scss + '**/*.scss', options.gulpWatchOptions, ['sass', 'lint:sass']);
});

// Lint Sass and JavaScript.
// @todo needs to add a javascript lint task.
gulp.task('lint', ['lint:sass']);

// Build CSS for development environment.
// gulp.task('sass', ['clean:css'], function () {
gulp.task('sass', [], function () {
  return gulp.src(scssFiles)
    .pipe($.sourcemaps.init())
    // Allow the options object to override the defaults for the task.
    .pipe($.sass(extend(true, {
      noCache: true,
      outputStyle: options.scss.outputStyle,
      sourceMap: true
    }, options.scss)).on('error', $.sass.logError))
    .pipe($.autoprefixer(options.autoprefixer))
    .pipe($.rename({dirname: ''}))
    .pipe($.size({showFiles: true}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(options.theme.css));
});

// Clean CSS files.
gulp.task('clean:css', function () {
  return del([
    options.theme.css + '**/*.css',
    options.theme.css + '**/*.map'
  ], {force: true});
});

// Lint Sass.
gulp.task('lint:sass', function () {
  return gulp.src(options.theme.scss + '**/*.scss')
    // use gulp-cached to check only modified files.
    .pipe($.sassLint({
      files: {
        include: $.cached('scsslint'),
        ignore: options.scss.lintIgnore
      }
    }))
    .pipe($.sassLint.format());
});
