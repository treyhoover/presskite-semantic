/*******************************
 Build Task
 *******************************/

var
  gulp = require('gulp'),
  fs = require('fs'),
  less = require('less'),
  through = require('through2'),

  // config
  config = require('../config/user'),

  // shorthand
  output = config.paths.output,
  source = config.paths.source
;

module.exports = function (callback) {

  console.info('Building json vars');

  gulp.src(source.themes + "/presskite/globals/site.variables")
    .pipe(through.obj((file, enc, cb) => {
      const src = file.contents.toString('utf8');

      less.parse(src, {}, function (err, root, imports, options) {
        const prefix = null;
        let lessVars = {};

        if (err) return callback(err);
        try {
          let evalEnv = new less.contexts.Eval(options);
          let evaldRoot = root.eval(evalEnv);
          let ruleset = evaldRoot.rules;

          ruleset.forEach(function (rule) {
            if (rule.variable === true) {
              let name = rule.name.substr(1);

              if (!prefix || name.substr(0, prefix.length) !== prefix) {
                let value = rule.value;
                lessVars[name] = value.toCSS(options);
              }
            }
          });
        } catch (err) {
          return callback(err);
        }

        const json = JSON.stringify(lessVars, null, 2);

        if (!fs.existsSync(output.packaged)) {
          fs.mkdirSync(output.packaged);
        }

        fs.writeFile(output.packaged + '/variables.json', json, cb);
      });
    }));
};
