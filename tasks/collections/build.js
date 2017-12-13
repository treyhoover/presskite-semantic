/*******************************
        Define Sub-Tasks
*******************************/

module.exports = function(gulp) {

  var
    // build sub-tasks
    buildJS      = require('./../build/javascript'),
    buildCSS     = require('./../build/css'),
    buildAssets  = require('./../build/assets'),
    exportJSONVars  = require('./../build/json-vars')
  ;

  // in case these tasks are undefined during import, less make sure these are available in scope
  gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
  gulp.task('build-css', 'Builds all css from source', buildCSS);
  gulp.task('build-assets', 'Copies all assets from source', buildAssets);
  gulp.task('build-json-vars', 'Exports less variables as json variables', exportJSONVars);
};
