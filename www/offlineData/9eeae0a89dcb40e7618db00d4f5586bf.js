/*jslint browser:true, indent:2*/
/*global define, require*/ // Require.JS and AMD
// Temporary Fixes
// These will end up in Global Require (I hope...)

(function () {

  var cloudfront, filesystem, rootPath, paths, getPaths, scripts, s, script,
    supportsBundles, versionMatches;

  cloudfront = '//d1c6dfkb81l78v.cloudfront.net/';
  filesystem = '/_c_/';

  if (!document.currentScript) {
    scripts = document.getElementsByTagName('script');
    document.currentScript = scripts[scripts.length - 1];
  }
  /*jslint regexp:true*/ // this regular expression has been double-checked
  if (window.BICURL) {
    rootPath = window.BICURL.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
  } else {
    rootPath = document.currentScript.src.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
  }
  /*jslint regexp:false*/

  // determine our current CDN based on how we referenced Require.JS
  scripts = document.getElementsByTagName('script');
  s = scripts.length;
  while (s > 0) {
    s -= 1;
    script = scripts[s];
    if (script.src && /\/blink\/require\/\d+\/require\.min\.js/.test(script.src)) {
      cloudfront = script.src.replace(/blink\/require\/\d+\/require\.min\.js[\w\.]*$/, '');
      break; // exit early
    }
  }

  if (location.protocol === 'file:') {
    cloudfront = cloudfront.replace(/^\/\//, 'https://');
  }

  getPaths = function (path) {
    var result;
    result = [
      cloudfront + path,
      filesystem + path
    ];
    return result;
  };

  // dynamically set paths and fall-back paths;
  paths = {
    BlinkForms: getPaths('blink/forms/3/3.1.7/forms3jqm.min'),
    'BMP.Blobs': getPaths('blink/blobs/1377493706402/bmp-blobs.min'),
    signaturepad: getPaths('signaturepad/2.3.0/jq.sig.min'),
    jquerymobile: getPaths('jquery.mobile/1.3.2/jquery.mobile-1.3.2.min'),
    jquery: getPaths('jquery/1.9.1/jquery.min'),
    bluebird: getPaths('bluebird/1.2.4/bluebird.min'),
    backbone: getPaths('backbonejs/1.0.0/backbone-min'),
    lodash: getPaths('lodash/2.4.1/lodash.compat.min'),
    modernizr: getPaths('modernizr/2.7.1/modernizr.custom.26204.min'),
    mustache: getPaths('mustache/0.7.3/mustache.min'),
    q: getPaths('q/0.9.7/q.min'),
    underscore: getPaths('lodash/2.4.1/lodash.underscore.min'),
    formsdeps: rootPath + "/formsdeps.min",
    'es5-shim': getPaths('es5-shim/2.3.0/es5-shim.min'),
    pouchdb: getPaths('pouchdb/2.2.3/pouchdb-nightly.min')
  };

  // check if we are using a pre-bundles Require.JS
  supportsBundles = true;
  if (require.version < "2.2") {
    supportsBundles = false;
    if (require.version >= "2.1") {
      versionMatches = require.version.match(/(\d+)\.(\d+)\.(\d+)/);
      if (versionMatches && versionMatches[3] >= 10) {
        supportsBundles = true; // introduced in Require.JS 2.1.10
      }
    }
  }
  if (!supportsBundles) {
    paths.moment = rootPath + '/formsdeps.min';
    paths.picker = rootPath + '/formsdeps.min';
    paths['picker.date'] = rootPath + '/formsdeps.min';
    paths['picker.time'] = rootPath + '/formsdeps.min';
  }

  require.config({ paths: paths });
}());

require.config({
  shim: {
    'BMP.Blobs': {
      deps: ['underscore', 'jquery'],
      exports: 'BMP'
    },
    'signaturepad': {
      deps: ['jquery'],
      exports: '$'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    modernizr: {
      exports: 'Modernizr'
    },
    underscore: {
      exports: '_'
    }
  },
  bundles: {
    'formsdeps': ['picker', 'picker.date', 'picker.time', 'moment']
  }
});

define('implementations', [], function () {

  return {
    'es5': [
      {
        isAvailable: function () {
          // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/es5/array.js
          return !(Array.prototype &&
            Array.prototype.every &&
            Array.prototype.filter &&
            Array.prototype.forEach &&
            Array.prototype.indexOf &&
            Array.prototype.lastIndexOf &&
            Array.prototype.map &&
            Array.prototype.some &&
            Array.prototype.reduce &&
            Array.prototype.reduceRight &&
            Array.isArray &&
            Function.prototype.bind);
        },
        implementation: 'es5-shim'
      },
      {
        isAvailable: function () { return true; },
        module: function () {
          return {};
        }
      }
    ],
    promises: [
      {
        // native ES6 Promises
        isAvailable: function () {
          // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/es6/promises.js
          return 'Promise' in window &&
            'resolve' in window.Promise &&
            'reject' in window.Promise &&
            'all' in window.Promise &&
            'race' in window.Promise &&
            (function() {
              var resolve;
              new window.Promise(function(r) { resolve = r; });
              return typeof resolve === 'function';
            }());
        },
        module: function () {
          return Promise;
        }
      },
      {
        // fallback to Bluebird
        isAvailable: function () { return true; },
        implementation: 'bluebird'
      }
    ]
  };
});

/**
 * AMD-Feature - A loader plugin for AMD loaders.
 *
 * https://github.com/jensarps/AMD-feature
 *
 * @author Jens Arps - http://jensarps.de/
 * @license MIT or BSD - https://github.com/jensarps/AMD-feature/blob/master/LICENSE
 * @version 1.1.0
 */
define('feature',['implementations'], function (implementations) {

  return {

    load: function (name, req, load, config) {

      var i, m, toLoad,
          featureInfo = implementations[name],
          hasMultipleImpls = Object.prototype.toString.call(featureInfo) == '[object Array]';

      if (config.isBuild && hasMultipleImpls) {
        // In build context, we want all possible
        // implementations included.
        for (i = 0, m = featureInfo.length; i < m; i++) {
          if (featureInfo[i].implementation) {
            req([featureInfo[i].implementation], load);
          }
        }

        // We're done here now.
        return;
      }

      if (hasMultipleImpls) {
        // We have different implementations available,
        // test for the one to use.
        for (i = 0, m = featureInfo.length; i < m; i++) {
          var current = featureInfo[i];
          if (current.isAvailable()) {
            if (typeof current.module != 'undefined') {
              load(current.module());
              return;
            }
            toLoad = current.implementation;
            break;
          }
        }
      } else {
        if (typeof featureInfo.module != 'undefined') {
          load(featureInfo.module());
          return;
        }
        toLoad = featureInfo;
      }

      req([toLoad], load);
    }
  };
});

// https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define('pollUntil',[], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.pollUntil = factory();
  }
}(this, function () {

  // https://gist.github.com/jokeyrhyme/9753904
  /**
   * @param {Function} condition a function that returns `true` or `false`
   * @param {Number} [interval=197] the amount of time to wait between tests
   * @param {Function} callback a function to invoke when the condition returns `true`
   * @returns {Function} call this to stop early (but no earlier than first check)
   */
  return function pollUntil(condition, interval, callback) {
    var timeout;
    if (condition && condition()) {
      timeout = null;
      callback();
    } else {
      timeout =  setTimeout(function () {
        pollUntil(condition, interval, callback);
      }, interval || 197);
    }
    return function stop() {
      clearTimeout(timeout);
    };
  };
}));

/*jslint browser:true, indent:2*/
/*global $, cordova*/ // 3rd-party globals
/*global pollUntil*/

/**
 *
 */
(function () {

  var BMP;

  BMP = window.BMP;

  BMP.BlinkGap = {};

  // detect BlinkGap / PhoneGap / Callback
  BMP.BlinkGap.isHere = function () {
    if (window.isBlinkGap || window.cordova) {
      return true;
    }
    if (BMP.BIC && BMP.BIC.isBlinkGap) {
      return true;
    }
    return !!(
      window.PhoneGap &&
      $.type(window.device) === 'object' &&
      window.device instanceof window.Device
    );
  };

  BMP.BlinkGap.isReady = function () {
    return BMP.BlinkGap.isHere() && !!(
      (window.PhoneGap && window.PhoneGap.available) ||
      (window.cordova && window.cordova.available)
    );
  };

  BMP.BlinkGap.hasCamera = function () {
    return BMP.BlinkGap.isHere() && !!(
      (window.Camera && window.Camera.getPicture) ||
      (navigator.camera && navigator.camera.getPicture)
    );
  };

  BMP.BlinkGap.hasTouchDraw = function () {
    return BMP.BlinkGap.isHere() && !!(
      (window.BGTouchDraw && window.BGTouchDraw.getDrawing) ||
      (navigator.bgtouchdraw && navigator.bgtouchdraw.getDrawing)
    );
  };

  BMP.BlinkGap.hasOffline = function () {
    return !!(
      BMP.BlinkGap.isHere() &&
      window.cordova &&
      window.cordova.offline
    );
  };

  BMP.BlinkGap.isOfflineReady = function () {
    return !!(
      BMP.BlinkGap.isReady() &&
      BMP.BlinkGap.hasOffline() &&
      window.cordova.offline.available
    );
  };

  BMP.BlinkGap.waitForOffline = function (onSuccess, onError) {
    var stopPolling, timeout;
    timeout = setTimeout(function () {
      if (!BMP.BlinkGap.isOfflineReady() && stopPolling) {
        stopPolling();
        onError(new Error('no cordova.offline.available after 5 seconds'));
      }
    }, 5e3);
    stopPolling = pollUntil(BMP.BlinkGap.isOfflineReady, 197, function () {
      clearTimeout(timeout);
      onSuccess();
    });
  };

  /**
   * @return {jQueryPromise}
   */
  BMP.BlinkGap.whenReady = function () {
    var dfrd, start, checkFn, readyHandler;

    dfrd = new $.Deferred();
    start = new Date();

    readyHandler = function () {
      document.removeEventListener('deviceready', readyHandler, false);
      dfrd.resolve();
    };

    checkFn = function () {
      if (BMP.BlinkGap.isHere()) {
        if (BMP.BlinkGap.isReady()) {
          dfrd.resolve();
        } else if (document.addEventListener) {
          document.addEventListener('deviceready', readyHandler, false);
        }
      } else if (($.now() - start) > 10 * 1000) {
        dfrd.reject(new Error('waitForBlinkGap(): still no PhoneGap after 10 seconds'));
      } else {
        setTimeout(checkFn, 197);
      }
    };

    checkFn();

    return dfrd.promise();
  };

}());

(function () {


  if (!BMP.BlinkGap.hasOffline()) {
    return; // don't bother with this
  }

  function getInitialOrigin() {
    var match;
    if (!BMP.BlinkGap.hasOffline()) {
      throw new Error('no offline cordova plugin');
    }
    if (!cordova.offline.initialURL || typeof cordova.offline.initialURL !== 'string') {
      throw new Error('offline cordova plugin did not supply initialURL');
    }
    match = cordova.offline.initialURL.match(/(https?:\/\/[^\/]+)/);
    if (!match) {
      throw new Error('initialURL was malformed and could not be parsed');
    }
    return match[1];
  }

  /**
   * @class wrapper to facilitate more convenient use of cordova.offline
   */
  function BGOffline() {
    this.plugin = window.cordova.offline;
    this.urlsMap = {};
    return this;
  }

  BGOffline.prototype.populateURLsMap = function (onSuccess, onError) {
    var me = this;
    BMP.BlinkGap.waitForOffline(function () {
      me.plugin.listResources(function (list) {
        me.urlsMap = list;
        onSuccess();
      }, function (err) {
        onError(err);
      });
    }, function (err) {
      onError(err);
    });
  };

  BGOffline.prototype.getURL = function (onlineURL) {
    var offlineURL;
    offlineURL = this.urlsMap[onlineURL];
    if (onlineURL.indexOf('//') === 0) {
      if (!offlineURL) {
        offlineURL = this.urlsMap['https:' + onlineURL];
      }
      if (!offlineURL) {
        offlineURL = this.urlsMap['http:' + onlineURL];
      }
    } else if (onlineURL.indexOf('/') === 0) {
      onlineURL = getInitialOrigin() + onlineURL;
      offlineURL = this.urlsMap[onlineURL];
    }
    return offlineURL;
  };

  BMP.BlinkGap.offline = new BGOffline();
}());

define("BlinkGap", ["pollUntil"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.BMP.BlinkGap;
    };
}(this)));


// Begin!
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('bic', [
            'feature!promises',
            'jquery',
            'underscore',
            'backbone',
            'mustache',
            'BlinkForms',
            'jquerymobile',
            'BMP.Blobs',
            'modernizr',
            'pouchdb',
            'pollUntil',
            'feature!es5',
            'BlinkGap'
        ], factory);
    } else {
        root.bic = factory();
    }
}(this, function (Promise, $, _, Backbone, Mustache, BlinkForms, jquerymobile, BMP, Modernizr, Pouch, pollUntil) {
/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("../bower_components/almond/almond", function(){});

define('implementations',[],function () {

  return {
    'data': [
      {
        isAvailable: function () {
          try {
            return (Modernizr.indexeddb && window.indexedDB.open('idbTest', 1).onupgradeneeded === null && navigator.userAgent.indexOf('iPhone') === -1 && navigator.userAgent.indexOf('iPad') === -1) || (window.BMP.BIC.isBlinkGap && Modernizr.websqldatabase);
          } catch (ignore) {}
          return false;
        },

        implementation: 'data-pouch'
      },

      {
        isAvailable: function () {
          return true;
        },

        implementation: 'data-inMemory'
      }
    ],
    'api': [
      {
        isAvailable: function () {
          return window.cordova && window.cordova.offline;
        },
        implementation: 'api-native'
      },
      {
        isAvailable: function () {
          return true;
        },
        implementation: 'api-web'
      }
    ]
  };
});

/**
 * AMD-Feature - A loader plugin for AMD loaders.
 *
 * https://github.com/jensarps/AMD-feature
 *
 * @author Jens Arps - http://jensarps.de/
 * @license MIT or BSD - https://github.com/jensarps/AMD-feature/blob/master/LICENSE
 * @version 1.1.0
 */
define('feature',['implementations'], function (implementations) {

  return {

    load: function (name, req, load, config) {

      var i, m, toLoad,
          featureInfo = implementations[name],
          hasMultipleImpls = Object.prototype.toString.call(featureInfo) == '[object Array]';

      if (config.isBuild && hasMultipleImpls) {
        // In build context, we want all possible
        // implementations included.
        for (i = 0, m = featureInfo.length; i < m; i++) {
          if (featureInfo[i].implementation) {
            req([featureInfo[i].implementation], load);
          }
        }

        // We're done here now.
        return;
      }

      if (hasMultipleImpls) {
        // We have different implementations available,
        // test for the one to use.
        for (i = 0, m = featureInfo.length; i < m; i++) {
          var current = featureInfo[i];
          if (current.isAvailable()) {
            if (typeof current.module != 'undefined') {
              load(current.module());
              return;
            }
            toLoad = current.implementation;
            break;
          }
        }
      } else {
        if (typeof featureInfo.module != 'undefined') {
          load(featureInfo.module());
          return;
        }
        toLoad = featureInfo;
      }

      req([toLoad], load);
    }
  };
});

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

(function() {
  var _global = this;

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng;

  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
  //
  // Moderately fast, high quality
  if (typeof(require) == 'function') {
    try {
      var _rb = require('crypto').randomBytes;
      _rng = _rb && function() {return _rb(16);};
    } catch(e) {}
  }

  if (!_rng && _global.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
  }

  // Buffer class to use
  var BufferClass = typeof(Buffer) == 'function' ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define('uuid',[],function() {return uuid;});
  } else if (typeof(module) != 'undefined' && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else {
    // Publish as global (in browsers)
    var _previousRoot = _global.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _global.uuid = _previousRoot;
      return uuid;
    };

    _global.uuid = uuid;
  }
}).call(this);

/*global cordova: true */
define(
  'api-native',['uuid'],
  function (uuid) {

    var API = {
      getAnswerSpaceMap: function (user) {
        return new Promise(function (resolve, reject) {
          var userString = '';
          if (user) {
            userString = '&_username=' + user;
          }
          cordova.offline.retrieveContent(
            function (data) {
              resolve(JSON.parse(data));
            },
            reject,
            {
              url: '/_R_/common/3/xhr/GetConfig.php?_asn=' + window.BMP.BIC.siteVars.answerSpace + userString
            }
          );
        });
      },

      getInteractionResult: function (iact, args, options) {
        var getargs = '';
        if (args && typeof args === "object") {
          _.each(args, function (value, key) {
            if (value) {
              getargs += '&' + key + '=' + value;
            }
          });
        }
        return $.ajax('/_R_/common/3/xhr/GetAnswer.php?asn=' + window.BMP.BIC.siteVars.answerSpace + '&iact=' + iact + '&ajax=false' + getargs, options);
      },

      getForm: function () {
        return new Promise(function (resolve, reject) {
          cordova.offline.retrieveContent(
            function (data) {
              resolve(JSON.parse(data));
            },
            reject,
            {
              url: '/_R_/common/3/xhr/GetForm.php?_v=3&_aid=' + window.BMP.BIC.siteVars.answerSpaceId
            }
          );
        });
      },

      getDataSuitcase: function (suitcase, time) {
        return new Promise(function (resolve, reject) {
          cordova.offline.retrieveContent(
            resolve,
            reject,
            {
              url: '/_R_/common/3/xhr/GetMoJO.php?_id=' + window.BMP.BIC.siteVars.answerSpaceId + '&_m=' + suitcase
            }
          );
        });
      },

      setPendingItem: function (formname, formaction, formdata) {
        formdata._uuid = uuid.v4();
        formdata._submittedTime = $.now();
        formdata._submittedTimezoneOffset = (new Date()).getTimezoneOffset();
        formdata._submittedTimezoneOffset /= -60;
        return $.post('/_R_/common/3/xhr/SaveFormRecord.php?_asid=' + window.BMP.BIC.siteVars.answerSpaceId + '&_fn=' + formname + '&_action=' + formaction, formdata);
      },

      getLoginStatus: function () {
        return $.ajax('/_R_/common/3/xhr/GetLogin.php');
      },

      getFormList: function (formName) {
        return new Promise(function (resolve, reject) {
          cordova.offline.retrieveContent(
            function (data) {
              resolve($.parseXML(data));
            },
            reject,
            {
              url: '/_R_/common/3/xhr/GetFormList.php?_asid=' + window.BMP.BIC.siteVars.answerSpaceId + '&_fn=' + formName
            }
          );
        });
      },

      getFormRecord: function (formName, formAction, recordID) {
        return new Promise(function (resolve, reject) {
          cordova.offline.retrieveContent(
            function (data) {
              resolve($.parseXML(data));
            },
            reject,
            {
              url: '/_R_/common/3/xhr/GetFormRecord.php?_asid=' + window.BMP.BIC.siteVars.answerSpaceId + '&_fn=' + formName + '&_tid=' + recordID + '&action=' + formAction
            }
          );
        });
      }
    };

    return API;
  }
);


define(
  'api-web',['uuid'],
  function (uuid) {

    var API = {
      getAnswerSpaceMap: function (user) {
        var userString = '';
        if (user) {
          userString = '&_username=' + user;
        }
        cordova.offline.retrieveContent(
          function (data) {
            return data;
          },
          reject,
          {
            url: '/_R_/common/3/xhr/GetConfig.php?_asn=' + window.BMP.BIC.siteVars.answerSpace + userString
          }
        );
//        return $.ajax('/_R_/common/3/xhr/GetConfig.php?_asn=' + window.BMP.BIC.siteVars.answerSpace + userString);
      },

      getInteractionResult: function (iact, args, options) {
        var getargs = '';
        if (args && typeof args === "object") {
          _.each(args, function (value, key) {
            if (value) {
              getargs += '&' + key + '=' + value;
            }
          });
        }
        return $.ajax('/_R_/common/3/xhr/GetAnswer.php?asn=' + window.BMP.BIC.siteVars.answerSpace + '&iact=' + iact + '&ajax=false' + getargs, options);
      },

      getForm: function () {
        cordova.offline.retrieveContent(
          function (data) {
            return data;
          },
          reject,
          {
            url: '/_R_/common/3/xhr/GetForm.php?_v=3&_aid=' + window.BMP.BIC.siteVars.answerSpaceId
          }
        );
        //return $.ajax('/_R_/common/3/xhr/GetForm.php?_v=3&_aid=' + window.BMP.BIC.siteVars.answerSpaceId);
      },

      getDataSuitcase: function (suitcase, time) {
        return $.ajax('/_R_/common/3/xhr/GetMoJO.php?_id=' + window.BMP.BIC.siteVars.answerSpaceId + '&_m=' + suitcase, {dataType: "text"});
      },

      setPendingItem: function (formname, formaction, formdata) {
        formdata._uuid = uuid.v4();
        formdata._submittedTime = $.now();
        formdata._submittedTimezoneOffset = (new Date()).getTimezoneOffset();
        formdata._submittedTimezoneOffset /= -60;
        return $.post('/_R_/common/3/xhr/SaveFormRecord.php?_asid=' + window.BMP.BIC.siteVars.answerSpaceId + '&_fn=' + formname + '&_action=' + formaction, formdata);
      },

      getLoginStatus: function () {
        return $.ajax('/_R_/common/3/xhr/GetLogin.php');
      },

      getFormList: function (formName) {
        return $.ajax('/_R_/common/3/xhr/GetFormList.php?_asid=' + window.BMP.BIC.siteVars.answerSpaceId + '&_fn=' + formName);
      },

      getFormRecord: function (formName, formAction, recordID) {
        return $.ajax('/_R_/common/3/xhr/GetFormRecord.php?_asid=' + window.BMP.BIC.siteVars.answerSpaceId + '&_fn=' + formName + '&_tid=' + recordID + '&action=' + formAction);
      }

    };

    return API;
  }
);

define(
  'model-interaction',['feature!api'],
  function (API) {

    var Interaction = Backbone.Model.extend({

      idAttribute: "_id",

      defaults: {
        header: null,
        content: null,
        contentTime: null,
        footer: null,
        name: null
      },

      inherit: function (config) {
        if (this.has("parent")) {
          var app = require('model-application'),
            parent;

          _.each(this.attributes, function (value, key) {
            if (!_.has(config, key) || !config[key]) {
              config[key] = value;
            }
          }, this);

          if (this.get("parent") !== "app") {
            // Not the answerSpace config, so go deeper
            parent = app.interactions.get(this.get("parent"));
            parent.inherit(config);
          } else {
            _.each(app.attributes, function (value, key) {
              if (!_.has(config, key) || !config[key]) {
                config[key] = value;
              }
            }, app);
          }
        }
        return config;
      },

      performXSLT: function () {
        var xsl,
          xmlString,
          xslString,
          html,
          xml,
          processor,
          args,
          placeholders,
          pLength,
          p,
          value,
          model,
          starType,
          condition,
          variable;

        if (this.has("args")) {
          args = this.get("args");
          xsl = this.get("xsl");
          placeholders = xsl.match(/\$args\[[\w\:][\w\:\-\.]*\]/g);
          pLength = placeholders ? placeholders.length : 0;
          for (p = 0; p < pLength; p = p + 1) {
            value = typeof args[placeholders[p].substring(1)] === 'string' ? args[placeholders[p].substring(1)] : '';
            value = value.replace('"', '');
            value = value.replace("'", '');
            value = decodeURIComponent(value);
            xsl = xsl.replace(placeholders[p], value);
          }
        } else {
          xsl = this.get("xsl");
        }

        starType = xsl.match(/blink-stars\(([@\w.]+),\W*(\w+)\W*\)/);
        if (starType) {
          require(['model-application'], function (app) {
            var constructCondition;

            constructCondition = function (starType) {
              condition = '';
              variable = starType[1];
              starType = starType[2];
              _.each(app.stars.where({type: starType}), function (value) {
                condition += ' or ' + variable + '=\'' + value.get("_id") + '\'';
              });
              condition = condition.substr(4);
              return condition;
            };

            while (starType) {
              condition = constructCondition(starType);

              if (condition.length > 0) {
                xsl = xsl.replace(/\(?blink-stars\(([@\w.]+),\W*(\w+)\W*\)\)?/, '(' + condition + ')');
              } else {
                xsl = xsl.replace(/\(?blink-stars\(([@\w.]+),\W*(\w+)\W*\)\)?/, '(false())');
              }

              starType = xsl.match(/blink-stars\(([@\w.]+),\W*(\w+)\W*\)/);
            }
          });
        }

        model = this;
        require(['model-application'], function (app) {
          xmlString = model.get("starXml") || app.datasuitcases.get(model.get("xml")).get("data");
          xslString = xsl;
          if (typeof xmlString !== 'string' || typeof xslString !== 'string') {
            model.set("content", 'XSLT failed due to poorly formed XML or XSL.');
            return;
          }
          xml = $.parseXML(xmlString);
          xsl = $.parseXML(xslString);
          if (window.XSLTProcessor) {
            //console.log("XSLTProcessor (W3C)");
            processor = new window.XSLTProcessor();
            processor.importStylesheet(xsl);
            html = processor.transformToFragment(xml, document);
          } else if (xml.transformNode !== undefined) {
            //console.log("transformNode (IE)");
            html = xml.transformNode(xsl);
          } else if (window.xsltProcess) {
            //console.log("AJAXSLT");
            html = window.xsltProcess(xml, xsl);
          } else {
            //console.log("XSLT: Not supported");
            html = '<p>Your browser does not support Data Suitcase keywords.</p>';
          }
          if (html) {
            model.set("content", html);
          }
        });
      },

      prepareForView: function (data) {
        // Handle MADL updates here
        // Check for other updates needed here?
        var model = this,
          homeInteraction,
          loginInteraction,
          xml = '',
          attrs,
          path;

        return new Promise(function (resolve, reject) {
          if (model.id === window.BMP.BIC.siteVars.answerSpace) {
            require(['model-application'], function (app) {
              if (app.has("homeScreen") && app.get("homeScreen") !== false && app.has("homeInteraction")) {
                homeInteraction = app.interactions.findWhere({dbid: "i" + app.get("homeInteraction")});
                if (homeInteraction) {
                  homeInteraction.set({parent: model.get("parent")});
                  homeInteraction.prepareForView(data).then(function () {
                    resolve(homeInteraction);
                  });
                } else {
                  reject();
                }
              } else {
                model.set({interactionList: _.map(_.filter(app.interactions.models, function (value) {
                  return value.id !== window.BMP.BIC.siteVars.answerSpace && value.get("display") !== "hide" && (!value.has("tags") || (value.has("tags") && value.get("tags").length === 0) || _.filter(value.get("tags"), function (element) {
                    return element === 'nav-' + window.BMP.BIC.siteVars.answerSpace.toLowerCase();
                  }, this).length > 0);
                }, this), function (value) {
                  return value.attributes;
                })});

                if (model.get("interactionList").length === 0 && app.has("loginAccess") && app.get("loginAccess") === true && app.has("loginPromptInteraction")) {
                  loginInteraction = app.interactions.findWhere({dbid: "i" + app.get("loginPromptInteraction")});

                  path = $.mobile.path.parseLocation().pathname;
                  if (path.slice(-1) === "/") {
                    path = path.slice(0, path.length - 1);
                  }

                  resolve(model);
                  $.mobile.changePage(path + '/' + loginInteraction.id);
                  //if (loginInteraction) {
                    //loginInteraction.set({parent: model.get("parent")});
                    //loginInteraction.prepareForView(data).then(function () {
                      //resolve(loginInteraction);
                    //});
                  //}
                } else {
                  resolve(model);
                }
              }
            });
          }

          if (model.get("type") === "madl code") {
            /*jslint unparam: true*/
            API.getInteractionResult(model.id, model.get('args'), data.options).then(
              function (result) {
                model.save({
                  content: result,
                  contentTime: Date.now()
                }, {
                  success: function () {
                    resolve(model);
                  },
                  error: function () {
                    resolve(model);
                  }
                });
              },
              function (jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
              }
            );
            /*jslint unparam: false*/
          }

          if (model.get("type") === "xslt" && model.get("xml").indexOf('stars:') === 0) {
            model.set({
              mojoType: "stars",
              xml: model.get("xml").replace(/^stars:/, '')
            });
          }

          if (model.get("type") === "xslt" && model.get("mojoType") === "stars") {
            require(['model-application'], function (app) {
              _.each(app.stars.where({type: model.get("xml")}), function (value) {
                xml += '<' + value.get("type") + ' id="' + value.get("_id") + '">';

                attrs = _.clone(value.attributes);
                delete attrs._id;
                delete attrs._rev;
                delete attrs.type;
                delete attrs.state;

                _.each(attrs, function (value, key) {
                  xml += '<' + key + '>' + value + '</' + key + '>';
                });

                xml += '</' + value.get("type") + '>';
              });
              xml = '<stars>' + xml + '</stars>';
              model.set({
                starXml: xml
              });
              resolve(model);
            });
          }

          if (model.get("type") !== "madl code" && model.id !== window.BMP.BIC.siteVars.answerSpace) {
            resolve(model);
          }

        });
      }
    });

    return Interaction;
  }
);

/*jslint unparam: true*/
/*jslint sub:true*/ // we need to use obj['prop'] instead of obj.prop for IE8
define(
  'data-pouch',[],
  function () {


    var Data = function (name) {//, apiTrigger, apiCall, apiParameters) {
      var db;
      if (this.dbAdapter && name) {
        this.name = name;
      } else {
        this.name = 'BlinkMobile';
      }
      this.getDB = function () {
        var me = this;
        if (db) {
          return Promise.resolve(db);
        }
        return new Promise(function (resolve, reject) {
          var pouch = new Pouch(me.dbAdapter() + me.name, function (err) {
            if (err) {
              reject(err);
            } else {
              db = pouch;
              resolve(db);
            }
          });
        });
      };
    };

    _.extend(Data.prototype, {

      dbAdapter: function () {
        var type = false;
        if (window.BMP.BIC.isBlinkGap === true && Pouch.adapters.websql) {
          type = 'websql://';
        } else if (Pouch.adapters.idb) {
          type = 'idb://';
        }
        return type;
      },

      create: function (model) {
        var that = this;
        return new Promise(function (resolve, reject) {
          that.getDB().then(function (db) {
            db.post(model.toJSON(), function (err, response) {
              if (err) {
                reject(err);
              } else {
                that.read(response).then(function (doc) {
                  resolve(doc);
                });
              }
            });
          });
        });
      },

      update: function (model) {
        var that = this;
        return new Promise(function (resolve, reject) {
          that.getDB().then(function (db) {
            db.put(model.toJSON(), function (err) {
              if (err) {
                reject(err);
              } else {
                that.read(model).then(function (doc) {
                  resolve(doc);
                });
              }
            });
          });
        });
      },

      read: function (model) {
        var that = this;
        return new Promise(function (resolve, reject) {
          that.getDB().then(function (db) {
            db.get(model.id, function (err, doc) {
              if (err) {
                reject(err);
              } else {
                resolve(doc);
              }
            });
          });
        });
      },

      readAll: function () {
        var that = this;
        return new Promise(function (resolve, reject) {
          that.getDB().then(function (db) {
            db.allDocs({include_docs: true}, function (err, response) {
              if (err) {
                reject(err);
              } else {
                resolve(_.map(response.rows, function (value) {
                  return value.doc;
                }));
              }
            });
          });
        });
      },

      'delete': function (model) {
        var that = this;
        return new Promise(function (resolve, reject) {
          that.getDB().then(function (db) {
            db.get(model.id, function (err, doc) {
              if (err) {
                reject(err);
              } else {
                db.remove(doc, function (err, doc) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(doc);
                  }
                });
              }
            });
          });
        });
      },

      deleteAll: function () {
        var data;
        data = this;

        return new Promise(function (resolve, reject) {
          Pouch.destroy(data.dbAdapter() + data.name, function (err, info) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
    });

    return Data;
  }
);


/*jslint sub:true*/ // we need to use obj['prop'] instead of obj.prop for IE8
define(
  'data-inMemory',[],
  function () {


    var Data = function () {
      this.data = {};
    };

    _.extend(Data.prototype, {
      create: function () {
        return Promise.reject('Persistent storage not available');
      },

      update: function () {
        return Promise.reject('Persistent storage not available');
      },

      read: function () {
        return Promise.reject('Persistent storage not available');
      },

      readAll: function () {
        return Promise.reject('Persistent storage not available');
      },

      'delete': function () {
        return Promise.reject('Persistent storage not available');
      }
    });

    return Data;
  }
);

define(
  'collection-interactions',['model-interaction', 'feature!data'],
  function (Interaction, Data) {

    var InteractionCollection = Backbone.Collection.extend({

      model: Interaction,

      datastore: function () {
        this.data = new Data(window.BMP.BIC.siteVars.answerSpace + '-Interaction');
        return this;
      },

      load: function () {
        var collection = this;

        return new Promise(function (resolve, reject) {
          collection.fetch({
            success: resolve,
            error: reject
          });
        });
      },

      save: function () {
        return Promise.all(_.map(this.models, function (model) {
          return new Promise(function (resolve, reject) {
            model.save({}, {
              success: resolve,
              error: reject
            });
          });
        }));
      },

      comparator: "order"

    });

    return InteractionCollection;
  }
);

define(
  'model-datasuitcase',['feature!api'],
  function (API) {

    var DataSuitcase = Backbone.Model.extend({
      idAttribute: "_id",

      populate: function () {
        var model = this,
          time = 0;

        if (this.has("contentTime")) {
          time = this.get("contentTime");
        }

        return new Promise(function (resolve, reject) {
          API.getDataSuitcase(model.id, time).then(
            function (data) {
              model.save({
                data: data,
                contentTime: Date.now()
              }, {
                success: resolve,
                error: reject
              });
            }
          );
        });
      }
    });
    return DataSuitcase;
  }
);

define(
  'collection-datasuitcases',['model-datasuitcase', 'feature!data'],
  function (DataSuitcase, Data) {

    var DataSuitcaseCollection = Backbone.Collection.extend({
      model: DataSuitcase,

      datastore: function () {
        this.data = new Data(window.BMP.BIC.siteVars.answerSpace + '-DataSuitcase');
        return this;
      },

      load: function () {
        var collection = this;

        return new Promise(function (resolve, reject) {
          collection.fetch({
            success: resolve,
            error: reject
          });
        });
      },

      save: function () {
        return Promise.all(_.map(this.models, function (model) {
          return new Promise(function (resolve, reject) {
            model.save({}, {
              success: resolve,
              error: reject
            });
          });
        }));
      }
    });
    return DataSuitcaseCollection;
  }
);

define(
  'model-form',['feature!api'],
  function (API) {

    var Form = Backbone.Model.extend({
      idAttribute: "_id",

      populate: function () {
        var model = this;
        API.getForm(this.id).then(
          function (data) {
            model.save({
              definition: data.definition,
              contentTime: Date.now()
            });
          }
        );
      }
    });

    return Form;
  }
);

/*jslint sub:true*/ // we need to use obj['prop'] instead of obj.prop for IE8
define(
  'collection-forms',['model-form', 'feature!data', 'feature!api'],
  function (Form, Data, API) {

    var FormCollection = Backbone.Collection.extend({
      model: Form,

      initialize: function () {
        if (!BlinkForms) {
          window.BlinkForms = {};
        }
        BlinkForms.getDefinition = function (name, action) {
          return new Promise(function (resolve, reject) {
            require(['model-application'], function (app) {
              var def = app.forms.get(name);

              if (!def) {
                return reject(new Error('unable to locate "' + name + '" definition'));
              }

              try {
                resolve(BlinkForms.flattenDefinition(def.attributes, action));
              } catch (err) {
                reject(err);
              }
            });
          });
        };
      },

      datastore: function () {
        this.data = new Data(window.BMP.BIC.siteVars.answerSpace + '-Form');
        return this;
      },

      load: function () {
        var collection = this;

        return new Promise(function (resolve, reject) {
          collection.fetch({
            success: resolve,
            error: reject
          });
        });
      },

      download: function () {
        var collection = this;

        if (!(navigator.onLine || window.BMP.BIC.isBlinkGap)) {
          return Promise.resolve();
        }

        API.getForm().then(function (data) {
          _.each(data, function (recordData) {
            var record = JSON.parse(recordData),
              preExisting = collection.findWhere({_id: record['default'].name});
            if (preExisting) {
              preExisting.set(record).save();
            } else {
              record._id = record['default'].name;
              collection.create(record);
            }
          });
        });
      }

    });
    return FormCollection;
  }
);

define(
  'model-pending',[],
  function () {

    var PendingItem = Backbone.Model.extend({
      idAttribute: "_id"
    });

    return PendingItem;
  }
);

define(
  'collection-pending',['model-pending', 'feature!data', 'feature!api'],
  function (PendingItem, Data, API) {

    var PendingCollection = Backbone.Collection.extend({
      model: PendingItem,

      datastore: function () {
        this.data = new Data(window.BMP.BIC.siteVars.answerSpace + '-Pending');
        return this;
      },

      load: function () {
        var collection = this;

        return new Promise(function (resolve, reject) {
          collection.fetch({
            success: resolve,
            error: reject
          });
        });
      },

      processQueue: function () {
        var promises, callback;
        promises = [];
        /*jslint unparam: true*/
        callback = function (element, callback) {
          return function (data, status, xhr) {
            if (data && xhr.status === 200) {
              element.save({
                status: 'Submitted',
                result: data
              });
            } else if (status === 'error' && data.responseText) {
              var errors = JSON.parse(data.responseText);
              element.save({
                status: 'Failed Validation',
                errors: errors
              });
            }
            element.trigger('processed');
            callback();
          };
        };
        /*jslint unparam: false*/

        _.each(this.where({status: "Pending"}), function (element) {
          promises.push(new Promise(function (resolve, reject) {
            API.setPendingItem(element.get('name'), element.get('action'), element.get('data')).then(
              callback(element, resolve),
              callback(element, reject)
            );
          }));
        }, this);

        return Promise.all(promises);
      }
    });

    return PendingCollection;
  }
);

define(
  'model-star',[],
  function () {

    var Star = Backbone.Model.extend({
      idAttribute: "_id",

      initialize: function () {
        this.on('add', function () {
          this.save();
        }, this);
      },

      toggle: function () {
        var model = this;
        if (model.get("state")) {
          this.set("state", false);
        } else {
          this.set("state", true);
        }
        require(['model-application'], function (app) {
          if (model.get("state")) {
            app.stars.add(model);
          } else {
            model.destroy();
          }
        });
      }
    });

    return Star;
  }
);

define(
  'collection-stars',['model-star', 'feature!data'],
  function (Star, Data) {

    var FormCollection = Backbone.Collection.extend({
      model: Star,

      datastore: function () {
        this.data = new Data(window.BMP.BIC.siteVars.answerSpace + '-Star');
        return this;
      },

      load: function () {
        var collection = this;

        return new Promise(function (resolve, reject) {
          collection.fetch({
            success: resolve,
            error: reject
          });
        });
      },

      clear: function (type) {
        _.each(this.where({type: type}), function (model) {
          model.destroy();
        });
      }
    });
    return FormCollection;
  }
);

/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('domReady',[],function () {


    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

define(
  'model-form-record',['feature!api'],
  function (API) {

    var FormRecord = Backbone.Model.extend({
      idAttribute: "_id",

      populate: function (action, callback) {
        var model = this;
        API.getFormRecord(model.get('formName'), action, model.get('id')).then(
          function (data) {
            var nodes, node, record;

            record = {};
            nodes = data.evaluate('//' + model.get('formName'), data);
            node = nodes.iterateNext();

            _.each(node.children, function (key) {
              record[key.nodeName] = key.innerHTML;
            });

            model.set({
              record: record,
              contentTime: Date.now()
            });

            model.save({}, {
              success: callback,
              error: callback
            });
          }
        );
      }
    });

    return FormRecord;
  }
);


define(
  'collection-form-records',['model-form-record', 'feature!data', 'feature!api'],
  function (FormRecord, Data, API) {

    var FormRecordCollection = Backbone.Collection.extend({
      model: FormRecord,

      datastore: function () {
        this.data = new Data(window.BMP.BIC.siteVars.answerSpace + '-FormRecord');
        return this;
      },

      load: function () {
        var collection = this;

        return new Promise(function (resolve, reject) {
          collection.fetch({
            success: resolve,
            error: reject
          });
        });
      },

      pull: function (formName) {
        var collection = this;

        return new Promise(function (resolve, reject) {
          API.getFormList(formName).then(
            function (data) {
              var nodes, node, parsed, parseNodes;

              nodes = data.evaluate('//' + formName, data);
              node = nodes.iterateNext();

              parseNodes = function (key) {
                if (key.nodeName === 'id') {
                  parsed.id = key.innerHTML;
                } else {
                  parsed.list[key.nodeName] = key.innerHTML;
                }
              };

              while (node) {
                parsed = {};
                parsed.formName = formName;
                parsed.list = {};

                _.each(node.children, parseNodes);

                parsed._id = formName + '-' + parsed.id;

                collection.add(parsed, {merge: true});
                node = nodes.iterateNext();
              }

              resolve();
            },
            function () {
              reject();
            }
          );
        });
      }
    });
    return FormRecordCollection;
  }
);


/*globals pollUntil*/
define(
  'model-application',['collection-interactions', 'collection-datasuitcases', 'collection-forms', 'collection-pending', 'feature!data', 'feature!api', 'collection-stars', 'domReady', 'collection-form-records'],
  function (InteractionCollection, DataSuitcaseCollection, FormCollection, PendingCollection, Data, API, StarsCollection, domReady, FormRecordsCollection) {

    var Application = Backbone.Model.extend({

      idAttribute: "_id",

      defaults: {
        _id: window.BMP.BIC.siteVars.answerSpace,
        loginStatus: false
      },

      datastore: function () {
        this.data = new Data(window.BMP.BIC.siteVars.answerSpace + '-AnswerSpace');
        return this;
      },

      collections: function () {
        var app = this;

        if (this.collections._promise) {
          // return a cached promise when possible
          return this.collections._promise;
        }

        this.collections._promise = new Promise(function (resolve, reject) {
          pollUntil(function () {
            // need to wait for the data layer to be configured RE: cordova
            return !!app.data;
          }, null, function () {
            // now data is safe to use, so we can get started
            app.interactions = app.interactions || new InteractionCollection();
            app.datasuitcases = app.datasuitcases || new DataSuitcaseCollection();
            app.forms = app.forms || new FormCollection();
            app.pending = app.pending || new PendingCollection();
            app.stars = app.stars || new StarsCollection();
            app.formRecords = app.formRecords || new FormRecordsCollection();

            Promise.all([
              app.interactions.datastore().load(),
              app.datasuitcases.datastore().load(),
              app.forms.datastore().load(),
              app.pending.datastore().load(),
              app.stars.datastore().load(),
              app.formRecords.datastore().load()
            ]).then(resolve, reject);
          });
        });

        return this.collections._promise;
      },

      setup: function () {
        var app = this;

        return new Promise(function (resolve, reject) {
          app.fetch({
            success: resolve,
            error: reject
          });
        });
      },

      populate: function () {
        var app = this;

        if (!(navigator.onLine || BMP.BlinkGap.isHere())) {
          return Promise.resolve();
        }

        return app.collections()
          .then(null, function () {
            return null;
          })
          .then(function () {
            return Promise.resolve(API.getAnswerSpaceMap());
          })
          .then(
            function (data) {
              return Promise.all(_.compact(_.map(data, function (value, key) {
                var model;
                if (key.substr(0, 1) === 'c' || key.substr(0, 1) === 'i') {
                  model = value.pertinent;
                  model._id = model.name.toLowerCase();
                  model.dbid = key;
                  app.interactions.add(model, {merge: true});
                  return model._id;
                }
                if (key.substr(0, 1) === 'a') {
                  return new Promise(function (resolve, reject) {
                    model = {
                      _id: window.BMP.BIC.siteVars.answerSpace.toLowerCase(),
                      dbid: key
                    };
                    app.interactions.add(model, {merge: true});
                    app.save(value.pertinent, {
                      success: function () {
                        resolve(window.BMP.BIC.siteVars.answerSpace.toLowerCase());
                      },
                      error: reject
                    });
                  });
                }
              })));
            }
          )
          .then(
            function (interactions) {
              return Promise.all(_.map(
                _.reject(app.interactions.models, function (model) {
                  return _.contains(interactions, model.id);
                }),
                function (model) {
                  return new Promise(function (resolve, reject) {
                    model.destroy({
                      success: resolve,
                      error: reject
                    });
                  });
                }
              ));
            }
          )
          .then(
            function () {
              return Promise.all(_.map(_.compact(_.uniq(app.interactions.pluck('xml'))), function (element) {
                return new Promise(function (resolve) { // args.[1] 'reject'
                  if (!app.datasuitcases.get(element)) {
                    app.datasuitcases.add({_id: element});
                    app.datasuitcases.get(element).populate().then(resolve, resolve);
                  } else {
                    app.datasuitcases.get(element).populate().then(resolve, resolve);
                  }
                });
              }));
            }
          )
          .then(
            function () {
              return app.datasuitcases.save();
            }
          )
          .then(
            function () {
              return app.interactions.save();
            }
          );
      },

      whenPopulated: function () {
        var me = this;
        return new Promise(function (resolve, reject) {
          me.collections().then(function () {
            var timeout;
            if (me.interactions.length) {
              resolve();
            } else {
              me.interactions.once('add', function () {
                clearTimeout(timeout);
                resolve();
              });
              timeout = setTimeout(function () {
                reject(new Error('whenPopulated timed out after 20 seconds'));
              }, 20e3);
            }
          }, function () {
            reject(new Error('whenPopulated failed due to collections'));
          });
        });
      },

      checkLoginStatus: function () {
        //false
        var app = this;

        return new Promise(function (resolve) {
          API.getLoginStatus().then(function (data) {
            var status = data.status || data;
            if (app.get('loginStatus') !== status) {
              app.populate().then(function () {
                app.set({loginStatus: status});
                resolve();
              });
            } else {
              resolve();
            }
          });
        });
      },

      initialRender: function () {
        var app = this;
        $.mobile.defaultPageTransition = app.get("defaultTransition");
        domReady(function () {
          $.mobile.changePage($.mobile.path.parseLocation().href, {
            changeHash: false,
            reloadPage: true,
            transition: 'fade'
          });
          $(document).one('pageshow', function () {
            if (window.BootStatus && window.BootStatus.notifySuccess) {
              window.BootStatus.notifySuccess();
            }
            $('#temp').remove();
          });
        });
      }
    });

    window.BMP.BIC3 = new Application();

    window.BMP.BIC3.history = { length: 0 };

    window.onpopstate = function () {
      window.BMP.BIC3.history.length += 1;
    };

    window.BMP.BIC3.version = '3.1.22';

    // keep BMP.BIC and BMP.BIC3 the same
    $.extend(window.BMP.BIC3, window.BMP.BIC);
    window.BMP.BIC = window.BMP.BIC3;

    return window.BMP.BIC3;
  }
);

/*jslint browser:true, indent:2, nomen:true*/
/*global requirejs, require, define, module*/
/*global $, cordova*/
/*jslint sub:true*/ // we need to use obj['prop'] instead of obj.prop for IE8
define(
  'main',['model-application'],
  function (app) {


    function start() {
      // AJAX Default Options
      /*jslint unparam: true*/
      $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('X-Blink-Config',
          JSON.stringify(window.BMP.BIC.siteVars));
      });
      /*jslint unparam: false*/

      require(['router']);
    }

    // Delay the app for Cordova
    function init() {
      if (window.BMP.BlinkGap.isHere()) {
        window.BMP.BlinkGap.whenReady().then(start, start);
      } else {
        start();
      }
    }

    // Save traditional sync method as ajaxSync
    Backbone.ajaxSync = Backbone.sync;

    // New sync method
    Backbone.dataSync = function (method, model, options) {
      var data, promise;
      data = model.data || model.collection.data;

      switch (method) {
      case "read":
        promise = model.id !== undefined ? data.read(model) : data.readAll();
        break;
      case "create":
        promise = data.create(model);
        break;
      case "update":
        promise = data.update(model);
        break;
      case "patch":
        promise = data.update(model);
        break;
      case "delete":
        promise = data['delete'](model);
        break;
      default:
        promise = Promise.reject(new Error('unknown method'));
      }

      promise.then(function (response) {
        if (options.success) {
          options.success(response);
        }
      }, function (response) {
        if (options.error) {
          options.error(response);
        }
      });

      model.trigger('request', model, promise, options);

      return promise;
    };

    // Fallback to traditional sync when not specified
    Backbone.getSyncMethod = function (model) {
      if (model.data || (model.collection && model.collection.data)) {
        return Backbone.dataSync;
      }
      return Backbone.ajaxSync;
    };

    // Hook Backbone.sync up to the data layer
    Backbone.sync = function (method, model, options) {
      return Backbone.getSyncMethod(model).apply(this, [method, model, options]);
    };

    init();

    return app; // export BMP.BIC
  }
);

/**
 * @license RequireJS text 2.0.12 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
  define, window, process, Packages,
  java, location, Components, FileUtils */

define('text',['module'], function (module) {


    var text, fs, Cc, Ci, xpcIsWindows,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = {},
        masterConfig = (module.config && module.config()) || {};

    text = {
        version: '2.0.12',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var modName, ext, temp,
                strip = false,
                index = name.indexOf("."),
                isRelative = name.indexOf('./') === 0 ||
                             name.indexOf('../') === 0;

            if (index !== -1 && (!isRelative || index > 1)) {
                modName = name.substring(0, index);
                ext = name.substring(index + 1, name.length);
            } else {
                modName = name;
            }

            temp = ext || modName;
            index = temp.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = temp.substring(index + 1) === "strip";
                temp = temp.substring(0, index);
                if (ext) {
                    ext = temp;
                } else {
                    modName = temp;
                }
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || uPort === port);
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config && config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config && config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName +
                    (parsed.ext ? '.' + parsed.ext : ''),
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            // Do not load if it is an empty: url
            if (url.indexOf('empty:') === 0) {
                onLoad();
                return;
            }

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                extPart = parsed.ext ? '.' + parsed.ext : '',
                nonStripName = parsed.moduleName + extPart,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node &&
            !process.versions['node-webkit'])) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback, errback) {
            try {
                var file = fs.readFileSync(url, 'utf8');
                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
                if (file.indexOf('\uFEFF') === 0) {
                    file = file.substring(1);
                }
                callback(file);
            } catch (e) {
                if (errback) {
                    errback(e);
                }
            }
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback, headers) {
            var xhr = text.createXhr(), header;
            xhr.open('GET', url, true);

            //Allow plugins direct access to xhr headers
            if (headers) {
                for (header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
                    }
                }
            }

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status || 0;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        if (errback) {
                            errback(err);
                        }
                    } else {
                        callback(xhr.responseText);
                    }

                    if (masterConfig.onXhrComplete) {
                        masterConfig.onXhrComplete(xhr, url);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                if (line !== null) {
                    stringBuffer.append(line);
                }

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
            typeof Components !== 'undefined' && Components.classes &&
            Components.interfaces)) {
        //Avert your gaze!
        Cc = Components.classes;
        Ci = Components.interfaces;
        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
        xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

        text.get = function (url, callback) {
            var inStream, convertStream, fileObj,
                readData = {};

            if (xpcIsWindows) {
                url = url.replace(/\//g, '\\');
            }

            fileObj = new FileUtils.File(url);

            //XPCOM, you so crazy
            try {
                inStream = Cc['@mozilla.org/network/file-input-stream;1']
                           .createInstance(Ci.nsIFileInputStream);
                inStream.init(fileObj, 1, 0, false);

                convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
                                .createInstance(Ci.nsIConverterInputStream);
                convertStream.init(inStream, "utf-8", inStream.available(),
                Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

                convertStream.readString(inStream.available(), readData);
                convertStream.close();
                inStream.close();
                callback(readData.value);
            } catch (e) {
                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
            }
        };
    }
    return text;
});


define('text!template-interaction.mustache',[],function () { return '{{{header}}}\n<div data-role="content">\n  <style>\n  .ui-controlgroup-controls {\n    width: 100%;\n  }\n  </style>\n  {{{content}}}\n</div>\n{{{footer}}}\n';});


define('text!template-inputPrompt.mustache',[],function () { return '<form method="get">\n    {{{inputs}}}\n    <button type="submit" data-theme="a">Go</button>\n</form>\n';});


define('text!template-form-controls.mustache',[],function () { return '{{#pages}}\n<div id="FormPageCount" data-role="controlgroup" data-type="horizontal">\n  <a id="previousFormPage" data-role="button" data-icon="back" {{^previous}}class="ui-disable"{{/previous}} style="width: 32%" data-iconpos="left">&nbsp;</a>\n  <a data-role="button" style="width: 33%"><span id="currentPage">{{current}}</span> of <span id="totalPages">{{total}}</span></a>\n  <a id="nextFormPage" data-role="button" data-icon="forward" {{^next}}class="ui-disable"{{/next}} style="width: 32%" data-iconpos="right">&nbsp;</a>\n</div>\n{{/pages}}\n\n<div id="FormControls" data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n    <a id="close" data-role="button" data-icon="delete" data-iconpos="top" style="width: 49%;">Close</a>\n    <a id="submit" data-role="button" data-icon="check" data-iconpos="top" style="width: 49%;">Submit</a>\n</div>\n\n<div id="closePopup" data-role="popup" data-dismissible="false" data-overlay-theme="a" data-theme="c">\n  <div data-role="header">\n    <h1>Close</h1>\n  </div>\n  <div data-role="content">\n    <h3>Are you sure you want to close this form?</h3>\n    <div data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n      <a href="#" id="save" data-role="button" data-rel="save" style="width: 49%;">Save</a>\n      <a href="#" id="discard" data-role="button" data-rel="delete" style="width: 49%;">Discard</a>\n    </div>\n    <a data-role="button" data-rel="back">Cancel</a>\n  </div>\n</div>\n';});

define(
  'view-form-controls',['text!template-form-controls.mustache', 'model-application'],
  function (Template, app) {

    var FormControlView = Backbone.View.extend({

      events: {
        "click #FormControls #submit" : "formSubmit",
        "click #FormControls #close" : "formClose",
        "click #nextFormPage" : "nextFormPage",
        "click #previousFormPage" : "previousFormPage"
      },

      render: function () {
        var view, options;

        view = this;
        options = {};


        if (BlinkForms.current.get('pages').length > 1) {
          options.pages = {
            current: BlinkForms.current.get('pages').current.index() + 1,
            total: BlinkForms.current.get('pages').length
          };

          if (BlinkForms.current.get('pages').current.index() !== 0) {
            options.pages.previous = true;
          }

          if (BlinkForms.current.get('pages').current.index() !== BlinkForms.current.get('pages').length - 1) {
            options.pages.next = true;
          }
        }

        view.$el.html(Mustache.render(Template, options));
        $.mobile.activePage.trigger('pagecreate');

        return view;
      },

      nextFormPage: function () {
        var view, index;

        view = this;
        index = BlinkForms.current.get('pages').current.index();

        if (index < BlinkForms.current.get('pages').length - 1) {
          BlinkForms.current.get('pages').goto(index + 1);
        }

        view.render();
      },

      previousFormPage: function () {
        var view, index;

        view = this;
        index = BlinkForms.current.get('pages').current.index();

        if (index > 0) {
          BlinkForms.current.get('pages').goto(index - 1);
        }

        view.render();
      },

      formSubmit: function () {
        this.addToQueue("Pending");
      },

      formClose: function () {
        var that = this;
        $('#closePopup').popup({
          afteropen: function (event) {
            $(event.target).on('click', '#save', {view: that}, that.formSave);
            $(event.target).on('click', '#discard', {view: that}, that.formDiscard);
          },
          afterclose: function (event) {
            $(event.target).off('click', '#save');
            $(event.target).off('click', '#discard');
          }
        });
        $('#closePopup').popup('open');
      },

      formSave: function (e) {
        e.data.view.addToQueue('Draft');
        $('#closePopup').one('popupafterclose', function () {
          history.back();
        });
        $('#closePopup').popup('close');
      },

      formDiscard: function () {
        $('#closePopup').one('popupafterclose', function () {
          history.back();
        });
        $('#closePopup').popup('close');
      },

      addToQueue: function (status) {
        var view, model;

        view = this;
        BlinkForms.current.data().then(function (data) {
          data._action = view.model.get("blinkFormAction");
          var modelAttrs = {
            type: "Form",
            status: status,
            name: view.model.get("blinkFormObjectName"),
            label: view.model.get('displayName'),
            action: view.model.get("blinkFormAction"),
            answerspaceid: app.get("dbid"),
            data: data
          };
          if (view.model.get('args')['args[pid]']) {
            model = app.pending.get(view.model.get('args')['args[pid]']);
            model.save(modelAttrs);
          } else {
            model = app.pending.create(modelAttrs);
          }
          $(window).one("pagechange", function () {
            if (!navigator.onLine || model.get('status') === 'Draft') {
              app.view.pendingQueue();
            } else {
              model.once('processed', function () {
                if (model.get('status') === 'Submitted') {
                  app.view.popup(model.get('result'));
                  model.destroy();
                } else {
                  app.view.pendingQueue();
                }
              });
              app.pending.processQueue();
            }
          });

          if (window.BMP.BIC3.history.length === 0) {
            window.BMP.BIC3.view.home();
          } else {
            history.back();
          }

        });
      }

    });

    return FormControlView;
  }
);

define(
  'view-form-action',['model-application', 'view-form-controls'],
  function (app, FormControls) {

    var FormActionView = Backbone.View.extend({
      id: 'ActiveFormContainer',

      render: function () {
        var view = this, subView;

        BlinkForms.getDefinition(view.model.get("blinkFormObjectName"), view.model.get("blinkFormAction"))
          .then(function (definition) {
            BlinkForms.initialize(definition, view.model.get("blinkFormAction"));
            view.$el.append(BlinkForms.current.$form);
            subView = new FormControls({
              model: view.model
            });
            subView.render();
            view.$el.append(subView.$el);

            if (view.model.get("args")['args[id]']) {
              var formRecord;
              formRecord = app.formRecords.get(view.model.get("blinkFormObjectName") + '-' + view.model.get("args")['args[id]']);
              formRecord.populate(view.model.get("blinkFormAction"), function () {
                BlinkForms.current.setRecord(formRecord.get('record'));
                view.trigger("render");
              });
            } else if (view.model.get("args")['args[pid]']) {
              BlinkForms.current.setRecord(app.pending.get(view.model.get("args")['args[pid]']).get("data"));
              if (BlinkForms.current.getErrors) {
                BlinkForms.current.getErrors();
              }
              view.trigger("render");
            } else {
              view.trigger("render");
            }
          })
          .then(null, function (err) {
            window.console.log(err);
          });

        return view;
      }
    });

    return FormActionView;
  }
);


define('text!template-form-list.mustache',[],function () { return '<table data-role="table" data-mode="columntoggle" class="ui-responsive table-stroke">\n  <thead>\n    <tr>\n      {{#headers}}\n      <th>{{.}}</th>\n      <th>Action</th>\n      {{/headers}}\n    </tr>\n  </thead>\n  <tbody>\n    {{#content}}\n    <tr>\n      {{#contents}}\n      <td>{{{.}}}</td>\n      {{/contents}}\n      <td>\n        {{#interactions.edit}}<a interaction="{{interactions.edit}}" _id="{{id}}">Edit</a>{{/interactions.edit}}\n        {{#interactions.view}}<a interaction="{{interactions.view}}" _id="{{id}}">View</a>{{/interactions.view}}\n        {{#interactions.delete}}<a interaction="{{interactions.delete}}" _id="{{id}}">Delete</a>{{/interactions.delete}}\n      </td>\n    </tr>\n    {{/content}}\n    {{^content}}\n    <tr>\n      <th>No items on the remote server</th>\n    </tr>\n    {{/content}}\n  </tbody>\n</table>\n';});

define(
  'view-form-list',['text!template-form-list.mustache', 'model-application'],
  function (Template, app) {

    var FormListView = Backbone.View.extend({
      render: function () {
        var view = this;

        app.formRecords.pull(view.model.get("blinkFormObjectName")).then(
          function () {
            var templateData = {};
            templateData.headers = [];
            BlinkForms.getDefinition(view.model.get("blinkFormObjectName"), view.model.get("blinkFormAction")).then(function (definition) {
              var elements = [];
              /*jslint unparam: true */
              _.each(definition._elements, function (value, ik) {
                if (value.type !== 'subForm') {
                  elements.push(value.name);
                  templateData.headers.push(value.name);
                }
              });
              /*jslint unparam: false */

              templateData.content = _.map(app.formRecords.models, function (value) {
                var record = {};

                record.id = value.get("id");
                record.contents = [];

                _.each(value.attributes.list, function (iv, ik) {
                  if (ik !== 'id' && ik !== '_id' && _.contains(elements, ik)) {
                    record.contents.push(iv);
                  }
                });

                return record;
              });

              templateData.interactions = {};
              templateData.interactions.edit = app.interactions.findWhere({
                blinkFormObjectName: view.model.get("blinkFormObjectName"),
                blinkFormAction: "edit"
              }).id;
              templateData.interactions.view = app.interactions.findWhere({
                blinkFormObjectName: view.model.get("blinkFormObjectName"),
                blinkFormAction: "view"
              }).id;
              templateData.interactions['delete'] = app.interactions.findWhere({
                blinkFormObjectName: view.model.get("blinkFormObjectName"),
                blinkFormAction: "delete"
              }).id;

              view.$el.html(Mustache.render(Template, templateData));
              view.trigger('render');

            });
          },
          function () {
            view.$el.html('Cannot contact server');
            view.trigger('render');
          }
        );

        return view;
      }
    });

    return FormListView;
  }
);

;
define("view-form-search", function(){});

define(
  'view-form',['view-form-action', 'view-form-list', 'view-form-search'],
  function (FormAction, FormList, FormSearch) {

    var FormView = Backbone.View.extend({
      render: function () {
        var view, action, subView;

        view = this;
        action = view.model.get("blinkFormAction");

        if (action === "list") {
          subView = new FormList({
            model: view.model
          });
        } else if (action === "search") {
          subView = new FormSearch({
            model: view.model
          });
        } else {
          if ($('#ActiveFormContainer').length > 0) {
            $('#ActiveFormContainer').attr('id', 'FormContainer');
          }
          subView = new FormAction({
            model: view.model
          });
        }

        view.listenToOnce(subView, 'render', function () {
          view.$el.append(subView.$el);
          view.trigger('render');
        });

        subView.render();

        return view;
      }
    });

    return FormView;
  }
);




define('text!template-category-list.mustache',[],function () { return '<ul data-role="listview">\n  {{#models}}\n  <li>\n    <a interaction="{{_id}}">\n      {{#displayName}}\n        {{displayName}}\n      {{/displayName}}\n      {{^displayName}}\n        {{_id}}\n      {{/displayName}}\n    </a>\n  </li>\n  {{/models}}\n</ul>\n';});


define('text!template-pending.mustache',[],function () { return '<div id="pendingPopup" data-role="popup">\n  <div data-role="header">\n    <h1>Pending Queue</h1>\n  </div>\n  <div id="pendingContent" data-role="content">\n    <ul data-role="listview">\n      {{#validationPresent}}<li data-role="list-divider">Failed Validation</li>{{/validationPresent}}\n      {{#validation}}\n      <li>\n        <div>\n          <h2>{{label}}</h2>\n          <div data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n            <a class="clearPendingItem" _pid="{{_id}}" data-role="button" style="width: 49%;">Clear</a>\n            <a interaction="{{editInteraction}}" _pid="{{_id}}" data-role="button" style="width: 49%;">Edit</a>\n          </div>\n        </div>\n      </li>\n      {{/validation}}\n\n      <li data-role="list-divider">Pending</li>\n      {{#pending}}\n      <li>\n        <div>\n          <h2>{{label}}</h2>\n        </div>\n      </li>\n      {{/pending}}\n      {{#pendingPresent}}\n      <li>\n        <a id="submitPendingItems" href="#">Submit All</a>\n      </li>\n      {{/pendingPresent}}\n      {{^pending}}<li>No items pending transmission to server</li>{{/pending}}\n\n      <li data-role="list-divider">Draft</li>\n      {{#draft}}\n      <li>\n        <div>\n          <h2>{{label}}</h2>\n          <div data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n            <a class="clearPendingItem" _pid="{{_id}}" data-role="button" style="width: 49%;">Clear</a>\n            <a interaction="{{editInteraction}}" _pid="{{_id}}" data-role="button" style="width: 49%;">Edit</a>\n          </div>\n        </div>\n      </li>\n      {{/draft}}\n      {{#draftPresent}}\n      <li>\n        <a id="clearPendingItemsConfirmation" href="#">Clear All</a>\n      </li>\n      {{/draftPresent}}\n      {{^draft}}<li>No items saved as draft.</li>{{/draft}}\n    </ul>\n  </div>\n</div>\n';});

define(
  'view-star',[],
  function () {

    var StarView = Backbone.View.extend({
      events: {
        "click": "toggle"
      },

      initialize: function () {
        this.listenTo(this.model, "change:state", this.render);
      },

      toggle: function (e) {
        e.preventDefault();
        this.model.toggle();
      },

      render: function () {
        if (this.model.get('state')) {
          this.$el.addClass('blink-star-on');
          this.$el.removeClass('blink-star-off');
        } else {
          this.$el.addClass('blink-star-off');
          this.$el.removeClass('blink-star-on');
        }
      }
    });

    return StarView;
  }
);

define('text!template-popup.mustache',[],function () { return '<div id="popup" data-role="popup">\n{{{contents}}}\n</div>\n\n';});


define('text!template-clear-confirmation-popup.mustache',[],function () { return '<div id="clearConfirmationPopup" data-role="popup">\n  <div data-role="header">\n    <h1>Clear All Drafts</h1>\n  </div>\n  <div data-role="content">\n    <h3>Are you sure you want to delete all drafts?</h3>\n    <div data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n      <a href="#" id="clearPendingItems" data-role="button" style="width: 49%;">Delete</a>\n      <a href="#" data-role="button" data-rel="back" style="width: 49%;">Cancel</a>\n    </div>\n  </div>\n</div>\n';});

/*global google: true */
define(
  'view-interaction',['text!template-interaction.mustache', 'text!template-inputPrompt.mustache', 'view-form', 'model-application', 'text!template-category-list.mustache', 'model-star', 'text!template-pending.mustache', 'view-star', 'text!template-popup.mustache', 'text!template-clear-confirmation-popup.mustache'],
  function (Template, inputPromptTemplate, FormView, app, categoryTemplate, StarModel, pendingTemplate, StarView, popupTemplate, clearConfirmationPopupTemplate) {

    var InteractionView = Backbone.View.extend({

      initialize: function () {
        $('body').append(this.$el);
        window.BMP.BIC3.view = this;

        // this.$el.once("pageremove", function () {
        //   console.log("Backbone view cleanup");

        // })
      },

      events: {
        // Old Blink Link Shortcut Methods
        "click [keyword]" : "blinklink",
        "click [interaction]" : "blinklink",
        "click [category]" : "blinklink",
        "click [masterCategory]" : "blinklink",
        "click [back]" : "back",
        "click [home]" : "home",
        "click [login]" : "blinklink",
        "click [pending]" : "pendingQueue",

        // Form Actions
        "click #queue" : "pendingQueue",
        "click .clearPendingItem": "clearPendingItem",
        "click #submitPendingItems": "submitPendingItems",
        "click #clearPendingItems": "clearPendingItems",
        "click #clearPendingItemsConfirmation": "clearPendingItemsConfirmation",

        // Destroy
        "pageremove" : "destroy"
      },

      attributes: {
        "data-role": "page"
      },

      blinklink: function (e) {
        e.preventDefault();

        var $element,
          location,
          attributes = "",
          first = true,
          count,
          path,
          pathParts;

        if (e.target.tagName !== 'A') {
          $element = $(e.target).parents('a');
        } else {
          $element = $(e.target);
        }

        location = "";
        if ($element.attr("keyword")) {
          location = $element.attr("keyword");
        } else if ($element.attr("interaction")) {
          location = $element.attr("interaction");
        } else if ($element.attr("category")) {
          location = $element.attr("category");
        } else if ($element.attr("masterCategory")) {
          location = $element.attr("masterCategory");
        } else if ($element.attr("home") === "") {
          location = app.get("siteName");
        } else if ($element.attr("login") === "") {
          if (app.has("loginAccess") && app.has("loginUseInteractions") && app.has("loginUseInteractions") && app.has("loginPromptInteraction")) {
            location = app.get("loginPromptInteraction");
          } else {
            location = app.get("siteName");
          }
        }

        for (count = 0; count < $element[0].attributes.length; count = count + 1) {
          if ($element[0].attributes[count].name.substr(0, 1) === "_") {
            if (!first) {
              attributes += "&args[" + $element[0].attributes[count].name.substr(1) + "]=" + $element[0].attributes[count].value;
            } else {
              first = false;
              attributes = "/?args[" + $element[0].attributes[count].name.substr(1) + "]=" + $element[0].attributes[count].value;
            }
          }
        }

        path = '';
        pathParts = $.mobile.path.parseLocation().pathname;
        if (window.cordova && window.cordova.offline && window.cordova.offline.available && pathParts.indexOf(window.cordova.offline.filePathPrex) !== -1) {
          // Remove file path
          pathParts = pathParts.substr(pathParts.indexOf(window.cordova.offline.filePathPrex) + window.cordova.offline.filePathPrex.length + 1);
          // Remove domain info
          pathParts = pathParts.substr(pathParts.indexOf('/'));
          // Remove file suffix
          pathParts = pathParts.substr(0, pathParts.indexOf('.'));
        }
        pathParts = pathParts.split('/');
        pathParts.shift();
        if (pathParts[pathParts.length - 1] === "") {
          pathParts.pop();
        }

        if (pathParts[0] === 'www' && pathParts[1] === window.initialURLHashed) {
          pathParts.pop();
          pathParts.pop();
          pathParts[0] = window.BMP.BIC.siteVars.answerSpace;
        }

        for (count = pathParts.length - 1; count !== -1; count = count - 1) {
          if (!app.interactions.get(pathParts[count].toLowerCase()).get('type') && path.indexOf(pathParts[count]) === -1 && path.indexOf(pathParts[count].toLowerCase()) === -1 && pathParts[count] !== location && pathParts[count] !== location.toLowerCase()) {
            if (path !== '') {
              path = pathParts[count] + '/' + path;
            } else {
              path = pathParts[count];
            }
          }
        }

        path = '/' + path;

        $.mobile.changePage(path + '/' + location + attributes);
      },

      back: function (e) {
        e.preventDefault();
        history.back();
      },

      home: function () {
        $.mobile.changePage('/' + app.get("siteName"));
      },

      render: function (data) {
        var form,
          rawform,
          inheritedAttributes = this.model.inherit({}),
          view = this,
          subView;

        // Non-type specific
        if (_.has(inheritedAttributes, "themeSwatch")) {
          this.$el.attr("data-theme", inheritedAttributes.themeSwatch);
        }

        // Input Prompt
        if (this.model.has("inputPrompt") && !(this.model.has("args"))) {
          rawform = this.model.get("inputPrompt");
          if (rawform.substr(0, 6) === "<form>") {
            form = rawform;
          } else {
            form = Mustache.render(inputPromptTemplate, {inputs: rawform});
          }
          this.$el.html(Mustache.render(Template, {
            header: inheritedAttributes.header,
            footer: inheritedAttributes.footer,
            content: form
          }));
          this.trigger("render");
        } else if (view.model.has("type") && view.model.get("type") === "xslt") {
          // XSLT
          view.model.once("change:content", function () {
            if (typeof view.model.get("content") === 'object') {
              view.$el.html(Mustache.render(Template, {
                header: inheritedAttributes.header,
                footer: inheritedAttributes.footer,
                content: ''
              }));
              view.$el.children('[data-role=content]')[0].appendChild(view.model.get("content"));
              view.processStars();
              view.trigger("render");
            } else if (typeof view.model.get("content") === 'string') {
              view.$el.html(Mustache.render(Template, {
                header: inheritedAttributes.header,
                footer: inheritedAttributes.footer,
                content: view.model.get("content")
              }));
              view.trigger("render");
            } else {
              view.$el.html(Mustache.render(Template, {
                header: inheritedAttributes.header,
                footer: inheritedAttributes.footer,
                content: "Unknown error rendering XSLT interaction."
              }));
              view.trigger("render");
            }
          });
          this.model.performXSLT();
        } else if (this.model.has("type") && this.model.get("type") === "form") {
          if ($('#ActiveFormContainer').length > 0) {
            $('#ActiveFormContainer').attr('id', 'FormContainer');
          }

          // Form
          view.$el.html(Mustache.render(Template, {
            header: inheritedAttributes.header,
            footer: inheritedAttributes.footer
          }));

          subView = new FormView({
            model: view.model,
            el: view.$el.children('[data-role="content"]')
          });

          view.listenToOnce(subView, 'render', function () {
            view.trigger('render');
          });

          subView.render();

        } else if (this.model.id.toLowerCase() === window.BMP.BIC.siteVars.answerSpace.toLowerCase()) {
          // Home Screen
          view.$el.html(Mustache.render(Template, {
            header: inheritedAttributes.header,
            footer: inheritedAttributes.footer,
            content: Mustache.render(categoryTemplate, {
              models: view.model.get("interactionList"),
              path: data.dataUrl.substr(-1) === '/' ? data.dataUrl : data.dataUrl + '/'
            })
          }));
          view.trigger("render");
        } else if (!this.model.has("type")) {
          // Category
          view.$el.html(Mustache.render(Template, {
            header: inheritedAttributes.header,
            footer: inheritedAttributes.footer,
            content: Mustache.render(categoryTemplate, {
              models: _.map(_.filter(app.interactions.models, function (value) {
                return value.get("display") !== "hide" && _.filter(value.get("tags"), function (element) {
                  return element === 'nav-' + this.model.id.toLowerCase();
                }, this).length > 0;
              }, view), function (value) {
                return value.attributes;
              }),
              path: data.dataUrl.substr(-1) === '/' ? data.dataUrl : data.dataUrl + '/'
            })
          }));
          view.trigger("render");
        } else if (this.model.get("type") === "message") {
          this.$el.html(Mustache.render(Template, {
            header: inheritedAttributes.header,
            footer: inheritedAttributes.footer,
            content: inheritedAttributes.message
          }));
          this.trigger("render");
        } else {
          // MADL, others
          this.$el.html(Mustache.render(Template, inheritedAttributes));
          if (this.model.has("content")) {
            this.blinkAnswerMessages();
            this.maps();
            this.processStars();
          }
          this.trigger("render");
        }
        return this;
      },

      maps: function () {
        var mapDiv = this.$el.find("[class=googlemap]"), script;

        if (mapDiv.length !== 0) {
          //this.$el.append('<style type="text/css">.googlemap { width: 100%; height: 360px; }</style>');
          //this.$el.append('<script src="/_BICv3_/js/gMaps.js"></script>');
          if (mapDiv.attr('data-marker-title') !== undefined) {
          // Address Map
            window.BMP.BIC3.MapCallback = this.addressMap;
          } else if (mapDiv.attr('data-kml') !== undefined) {
          // KML Map
            window.BMP.BIC3.MapCallback = this.kmlMap;
          } else if (mapDiv.attr('data-map-action') !== undefined) {
          // Directions Map
            window.BMP.BIC3.MapCallback = this.directionsMap;
          } else {
          // Basic Map
            window.BMP.BIC3.MapCallback = this.basicMap;
          }

          if (window.google === undefined) {
            script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://maps.googleapis.com/maps/api/js?v=3&sensor=true&callback=window.BMP.BIC3.MapCallback";
            $('body').append(script);
          } else {
            window.BMP.BIC3.MapCallback();
          }
        }
      },

      blinkAnswerMessages: function (message) {
        if (!message) {
          // First Pass - Extract content

          /*jslint regexp: true */
          var blinkAnswerMessage = this.model.get('content').match(/<!-- blinkAnswerMessage:\{.*\} -->/g);
          /*jslint regexp: false */

          if ($.type(blinkAnswerMessage) === 'array') {
            _.each(blinkAnswerMessage, function (element) {
              this.blinkAnswerMessages(element.substring(24, element.length - 4));
            }, this);
          }
        } else {
          // Process a given message
          message = JSON.parse(message);
          if (typeof message.mojotarget === 'string') {
            if (typeof message.mojoxml === 'string') {
              // Add a DS
              app.datasuitcases.create({
                _id: message.mojotarget,
                data: message.mojoxml
              });
            } else if (message.mojodelete !== undefined) {
              // Remove a DS
              app.datasuitcases.remove(message.mojotarget);
            }
          }

          if (message.startype) {
            if (message.clearstars) {
              // Clear all stars?
              app.stars.clear(message.startype);
            }
            if ($.type(message.staroff) === 'array') {
              // Remove specific stars
              _.each(message.staroff, function (element) {
                if (app.stars.get(element)) {
                  app.stars.get(element.toString()).destroy();
                }
              }, this);
            }
            if ($.type(message.staron) === 'array') {
              // Add stars
              _.each(message.staron, function (element) {
                app.stars.create({
                  _id: element.toString(),
                  type: message.startype,
                  state: true
                });
              });
            }
          }
        }
      },

      pendingQueue: function () {
        //var el = $('#pendingContent');
        var pendingExtractor = function (status) {
          return _.map(app.pending.where({status: status}), function (pendingItem) {
            var pendingAttrs = _.clone(pendingItem.attributes);
            if (!pendingAttrs._id) {
              pendingAttrs._id = pendingItem.cid;
            }
            pendingAttrs.editInteraction = app.interactions.where({
              blinkFormObjectName: pendingItem.get("name"),
              blinkFormAction: pendingItem.get("action")
            });
            if (pendingAttrs.editInteraction && pendingAttrs.editInteraction.length > 0) {
              pendingAttrs.editInteraction = pendingAttrs.editInteraction[0].id;
            } else {
              pendingAttrs.editInteraction = null;
            }
            if (!pendingAttrs.label) {
              pendingAttrs.label = pendingAttrs.name;
            }
            return pendingAttrs;
          });
        };

        this.$el.append(Mustache.render(pendingTemplate, {
          pending: pendingExtractor('Pending'),
          pendingPresent: pendingExtractor('Pending').length > 0,
          draft: pendingExtractor('Draft'),
          draftPresent: pendingExtractor('Draft').length > 0,
          validation: pendingExtractor('Failed Validation'),
          validationPresent: pendingExtractor('Failed Validation').length > 0
        }));
        this.$el.trigger('pagecreate');
        $('#pendingPopup').one('popupafterclose', function () {
          $('#pendingPopup').remove();
        });
        $('#pendingPopup').popup('open');
      },

      clearPendingItem: function (e) {
        var $element, popup = $('#pendingPopup');

        if (e.target.tagName !== 'A') {
          $element = $(e.target).parents('a');
        } else {
          $element = $(e.target);
        }

        app.pending.get($element[0].attributes._pid.value).destroy();
        popup.popup('close');
      },

      submitPendingItems: function () {
        var popup = $('#pendingPopup');
        $.mobile.loading('show');
        app.pending.processQueue()
          .then(null, function () {
            return null;
          })
          .then(function () {
            popup.one('popupafterclose', function () {
              $.mobile.loading('hide');
            });
            popup.popup('close');
          });
      },

      clearPendingItems: function () {
        var items, popup = $('#clearConfirmationPopup'), i;
        items = app.pending.where({status: 'Draft'});
        for (i = 0; i < items.length; i = i + 1) {
          items[i].destroy();
        }
        popup.one('popupafterclose', function () {
          popup.remove();
        });
        popup.popup('close');
      },

      clearPendingItemsConfirmation: function () {
        var pendingPopup = $('#pendingPopup');

        pendingPopup.one('popupafterclose', function () {
          $('#clearConfirmationPopup').popup({
            afterclose: function () {
              $('#clearConfirmationPopup').remove();
            }
          });
          setInterval(function () {
            $('#clearConfirmationPopup').popup('open');
          }, 100);
        });

        this.$el.append(Mustache.render(clearConfirmationPopupTemplate, {}));
        this.$el.trigger('pagecreate');
        pendingPopup.popup('close');
      },

      popup: function (data) {
        this.$el.append(Mustache.render(popupTemplate, {
          contents: data
        }));
        this.$el.trigger('pagecreate');
        $('#popup').popup('open');
      },

      destroy: function () {
        this.remove();
      },

      processStars: function () {
        var elements = this.$el.find('.blink-starrable');
        if (elements) {
          /*jslint unparam: true*/
          elements.each(function (index, element) {
            var attrs,
              model = app.stars.get($(element).data('id')),
              star;
            if (!model) {
              attrs = $(element).data();
              attrs._id = attrs.id.toString();
              delete attrs.id;
              attrs.state = false;
              model = new StarModel(attrs);
            }
            star = new StarView({
              model: model,
              el: element
            });
            star.render();
          });
          /*jslint unparam: false*/
        }
      },



      basicMap: function () {
        var options, map, mapDiv = window.BMP.BIC3.view.$el.find("[class=googlemap]");

        options = {
          center: new google.maps.LatLng(mapDiv.attr('data-latitude'), mapDiv.attr('data-longitude')),
          zoom: parseInt(mapDiv.attr('data-zoom'), 10),
          mapTypeId: google.maps.MapTypeId[mapDiv.attr('data-type').toUpperCase()]
        };

        map = new google.maps.Map($("[class=\'googlemap\']")[0], options);

        $(document).bind("pageshow", function () {
          google.maps.event.trigger(map, "resize");
          map.setCenter(new google.maps.LatLng(mapDiv.attr('data-latitude'), mapDiv.attr('data-longitude')));
        });
      },

      addressMap: function () {
        var geocoder, options, map, mapDiv = window.BMP.BIC3.view.$el.find("[class=googlemap]");

        geocoder = new google.maps.Geocoder();

        options = {
          address: mapDiv.attr('data-marker-title')
        };

        geocoder.geocode(options, function (results) {
          options = {
            center: results[0].geometry.location,
            zoom: parseInt(mapDiv.attr('data-zoom'), 10),
            mapTypeId: google.maps.MapTypeId[mapDiv.attr('data-type').toUpperCase()]
          };
          map = new google.maps.Map($("[class=\'googlemap\']")[0], options);
          $(document).bind("pageshow", function () {
            google.maps.event.trigger(map, "resize");
            map.setCenter(results[0].geometry.location);
          });
        });
      },

      kmlMap: function () {
        var options, map, kml, mapDiv = window.BMP.BIC3.view.$el.find("[class=googlemap]");

        options = {
          center: new google.maps.LatLng(mapDiv.attr('data-latitude'), mapDiv.attr('data-longitude')),
          zoom: parseInt(mapDiv.attr('data-zoom'), 10),
          mapTypeId: google.maps.MapTypeId[mapDiv.attr('data-type').toUpperCase()]
        };

        map = new google.maps.Map($("[class=\'googlemap\']")[0], options);
        kml = new google.maps.KmlLayer(mapDiv.attr('data-kml'), {preserveViewport: true});
        kml.setMap(map);

        $(document).bind("pageshow", function () {
          google.maps.event.trigger(map, "resize");
          map.setCenter(new google.maps.LatLng(mapDiv.attr('data-latitude'), mapDiv.attr('data-longitude')));
        });
      },

      directionsMap: function () {
        var options, map, directionsDisplay, directionsService, origin, destination, locationPromise, request, getGeoLocation, mapDiv;

        mapDiv = window.BMP.BIC3.view.$el.find("[class=googlemap]");

        getGeoLocation = function (options) {
          var defaultOptions = {
              enableHighAccuracy: true,
              maximumAge: 5 * 60 * 1000, // 5 minutes
              timeout: 5 * 1000 // 5 seconds
            };
          options = $.extend({}, defaultOptions, $.isPlainObject(options) ? options : {});

          return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var coords = position.coords;
              if ($.type(coords) === 'object') {
                resolve(coords);
              } else {
                reject('GeoLocation error: blank location from browser / device');
              }
            }, function (error) {
              var string;
              switch (error.code) {
              case error.PERMISSION_DENIED:
                string = 'user has not granted permission';
                break;
              case error.PERMISSION_DENIED_TIMEOUT:
                string = 'user did not grant permission in time';
                break;
              case error.POSITION_UNAVAILABLE:
                string = 'unable to determine position';
                break;
              default:
                string = 'unknown error';
              }
              reject('GeoLocation error: ' + string);
            }, options);
          });
        };

        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();

        options = {
          center: new google.maps.LatLng(-33.873658, 151.206915),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId[mapDiv.attr('data-type').toUpperCase()]
        };

        map = new google.maps.Map($("[class=\'googlemap\']")[0], options);

        directionsDisplay.setPanel($("[class='googledirections']")[0]);

        $(document).bind("pageshow", function () {
          google.maps.event.trigger(map, "resize");
          directionsDisplay.setMap(map);
        });

        if (mapDiv.attr('data-destination-address') === undefined || mapDiv.attr('data-origin-address') === undefined) {
          // Set the origin from attributes or GPS
          locationPromise = getGeoLocation();
          locationPromise.then(function (location) {
            if (mapDiv.attr('data-origin-address') === undefined) {
              origin = new google.maps.LatLng(location.latitude, location.longitude);
              destination = mapDiv.attr('data-destination-address');
            } else if (mapDiv.attr('data-destination-address') === undefined) {
              origin = mapDiv.attr('data-origin-address');
              destination = new google.maps.LatLng(location.latitude, location.longitude);
            }
            request = {
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode[mapDiv.attr('data-travelmode').toUpperCase()]
            };

            directionsService.route(request, function (result, status) {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
              }
            });
          });
        } else {
          request = {
            origin: mapDiv.attr('data-origin-address'),
            destination: mapDiv.attr('data-destination-address'),
            travelMode: google.maps.TravelMode[mapDiv.attr('data-travelmode').toUpperCase()]
          };

          directionsService.route(request, function (result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
          });
        }

      }
    });

    return InteractionView;
  }
);

define(
  'router',['model-application', 'view-interaction'],
  function (app, InteractionView) {

    var Router = Backbone.Router.extend({
      initialize: function () {
        BMP.FileInput.initialize();

        app.router = this;

        $(document).on('pagebeforeload', function (e, data) {
          e.preventDefault();

          // keep track of history depth for forms post-submission behaviour
          window.BMP.BIC3.history.length += 1;

          $.mobile.loading('show');
          app.router.routeRequest(data);
        });

        Promise.resolve(app.datastore())
          .then(function () {
            return app.collections();
          })
          .then(function () {
            return app.setup();
          })
          .then(null, function () {
            return;
          })
          .then(function () {
            return app.populate();
          })
          .then(null, function () {
            return;
          })
          .then(function () {
            return app.forms.download();
          })
          .then(null, function () {
            return;
          })
          .then(function () {
            return app.initialRender();
          })
          .then(null, function (err) {
            throw err;
          });
      },

      routeRequest: function (data) {
        var path = $.mobile.path.parseUrl(data.absUrl),
          model;

        if (BMP.BlinkGap.isOfflineReady() && path.hrefNoSearch.indexOf(window.cordova.offline.filePathPrex) !== -1) {
          // Remove file path
          path.hrefNoSearch = path.hrefNoSearch.substr(path.hrefNoSearch.indexOf(window.cordova.offline.filePathPrex) + window.cordova.offline.filePathPrex.length + 1);
          // Remove domain info
          path.hrefNoSearch = path.hrefNoSearch.substr(path.hrefNoSearch.indexOf('/'));
          // Remove file suffix
          path.hrefNoSearch = path.hrefNoSearch.substr(0, path.hrefNoSearch.indexOf('.'));
        }

        app.whenPopulated()
          .then(null, function () {
            return null;
          })
          .then(function () {

            model = app.router.inheritanceChain(path.pathname);

            app.currentInteraction = model;

            app.router.parseArgs(path.search.substr(1), model);

            model.prepareForView(data).then(function (model) {
              new InteractionView({
                tagName: 'div',
                model: model
              }).once("render", function () {
                this.$el.attr("data-url", data.dataUrl);
                this.$el.attr("data-external-page", true);
                this.$el.one('pagecreate', $.mobile._bindPageRemove);
                data.deferred.resolve(data.absUrl, data.options, this.$el);
              }).render(data);
            }, function () {
              data.deferred.reject(data.absUrl, data.options);
              $.mobile.showPageLoadingMsg($.mobile.pageLoadErrorMessageTheme, $.mobile.pageLoadErrorMessage, true);
              setTimeout($.mobile.hidePageLoadingMsg, 1500);
            });
          });

      },

      inheritanceChain: function (data) {
        var path, parentModel, parent, usedPathItems;
        path = data.substr(1).toLowerCase().split('/').reverse();
        parent = path[path.length - 1];
        usedPathItems = [];

        if (path[0] === "") {
          path.shift();
        }

        if (path[0] === window.initialURLHashed && path[path.length - 1] === 'www') {
          path[0] = window.BMP.BIC.siteVars.answerSpace;
          path.pop();
          path.pop();
        }

        _.each(path, function (element, index) {
          if (!_.find(usedPathItems, function (id) {return id === element; })) {
            parentModel = app.interactions.get(element) || app.interactions.where({dbid: "i" + element})[0] || null;
            if (parent && parentModel) {
              if (index !== path.length - 1) {
                parentModel.set({parent: parent});
                parent = parentModel.id;
              } else {
                parentModel.set({parent: "app"});
                parent = "app";
              }
            } else {
              throw "Invalid Model Name";
            }
            usedPathItems.push(element);
          }
        }, this);

        return app.interactions.get(path[0]);
      },

      parseArgs: function (argString, model) {
        var args = argString.split('&'),
          tempargs,
          finalargs = {};

        _.each(args, function (element) {
          tempargs = element.split('=');
          if (tempargs[0].substr(0, 4) !== "args") {
            tempargs[0] = "args[" + tempargs[0] + "]";
          }
          finalargs[tempargs[0]] = tempargs[1];
        });

        if (finalargs) {
          model.set({args: finalargs});
        } else {
          model.set({args: null});
        }

        return this;
      }
    });

    return new Router();
  }
);


require('main');
}));
require(['bic']);
