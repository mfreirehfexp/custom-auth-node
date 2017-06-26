const gulp     = require('gulp');
const ts       = require('gulp-typescript');
const del      = require('del');
const jasmine  = require('gulp-jasmine');

const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const WATCH_FILES = ['src/**/*.ts','index.ts','test.ts'];

// pull in the project TypeScript config
const tsProjectBuild = ts.createProject('tsconfig.json');
const tsProjectTest = ts.createProject('tsconfig-test.json');


gulp.task('scripts',['clean:dist'], () => {
  const tsResult = tsProjectBuild.src()
      .pipe(tsProjectBuild());
  return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('scripts:test',['clean:test'], () => {
  const tsResult = tsProjectTest.src()
      .pipe(tsProjectTest());
  return tsResult.js.pipe(gulp.dest('test/build'));
});

gulp.task('assets', () => {
  return gulp.src(JSON_FILES)
      .pipe(gulp.dest('build'));
});
gulp.task('assets:test', () => {
  return gulp.src(JSON_FILES)
      .pipe(gulp.dest('test/build'));
});

gulp.task('clean:dist', function() {
  return del.sync('build/*',{force:true});
})
gulp.task('clean:test', function() {
  return del.sync('test/build/*');
})

gulp.task('watch', ['scripts:test'], () => {
  gulp.watch(WATCH_FILES, ['scripts:test','jasmine']);
});

gulp.task('jasmine', ['scripts:test'], () => {
  gulp.src('test/build/**/*.spec.js')
      .pipe(jasmine())
      .on('error', function(error) {
        // we have an error
        console.log("\n\n\n",error.message || error);
      })
  // gulp-jasmine works on filepaths so you can't have any plugins before it
});



gulp.task('default', ['assets:test','watch','jasmine']);

gulp.task('build', ['assets','scripts']);

gulp.task('build-test', ['assets:test','scripts:test']);
