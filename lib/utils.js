'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.ensureTrailingSlash = ensureTrailingSlash;
exports.resolvePublicPath = resolvePublicPath;
exports.resolveOutput = resolveOutput;
exports.handleUrl = handleUrl;

function _path() {
  const data = _interopRequireDefault(require('path'));

  _path = function _path() {
    return data;
  };

  return data;
}

function _globby() {
  const data = _interopRequireDefault(require('globby'));

  _globby = function _globby() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function ensureTrailingSlash(string) {
  if (string.length && string.substr(-1, 1) !== '/') {
    return `${string}/`;
  }

  return string;
} // Copied from html-webpack-plugin

function resolvePublicPath(compilation, filename) {
  /* istanbul ignore else */
  const publicPath =
    typeof compilation.options.output.publicPath !== 'undefined'
      ? compilation.options.output.publicPath
      : _path().default.relative(_path().default.dirname(filename), '.'); // TODO: How to test this? I haven't written this logic, unsure what it does

  return ensureTrailingSlash(publicPath);
}

function resolveOutput(compilation, addedFilename, outputPath) {
  if (outputPath && outputPath.length) {
    /* eslint-disable no-param-reassign */
    compilation.assets[`${outputPath}/${addedFilename}`] =
      compilation.assets[addedFilename];
    delete compilation.assets[addedFilename];
    /* eslint-enable */
  }
}
/**
 * handle globby filepath and return an array with all matched assets.
 *
 * @export
 * @param {Array} assets
 * @returns
 */

function handleUrl(_x) {
  return _handleUrl.apply(this, arguments);
}

function _handleUrl() {
  _handleUrl = _asyncToGenerator(function*(assets) {
    const globbyAssets = [];
    const normalAssets = []; // if filepath is null or undefined, just bubble up.

    assets.forEach(asset =>
      asset.filepath && _globby().default.hasMagic(asset.filepath)
        ? globbyAssets.push(asset)
        : normalAssets.push(asset)
    );
    const ret = [];
    yield Promise.all(
      globbyAssets.map(asset =>
        (0, _globby().default)(asset.filepath).then(paths =>
          paths.forEach(filepath =>
            ret.push(
              Object.assign({}, asset, {
                filepath,
              })
            )
          )
        )
      )
    );
    return ret.concat(normalAssets);
  });
  return _handleUrl.apply(this, arguments);
}
