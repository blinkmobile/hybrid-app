// this needs to be in the iframe
(function () {
  'use strict';
  window.Device = function () { return this; };
  window.Device.hasResource = function () { return false; };
  window.PhoneGap = window.Device;
  window.device = new window.Device();
  window.isBlinkGap = true;
  window.device.camerapresent = false;
  window.cordova = { offline: {} };
  window.navigator.standalone = true; // trick Forms v2 into loading inline signature panel

  window.alert = function (msg) { console.warn('alert: ' + msg); };
  window.confirm = function (msg) { console.warn('confirm: ' + msg); };
  window.prompt = function (msg) { console.warn('prompt: ' + msg); };

  window.onerror = function (err, url, line) {
    console.error('webview window.onerror:', err, url, line);
    return true;
  };
}());

(function () {
    'use strict';
    var callbacks, handshake, rootOrigin;
    callbacks = {};

    function generateCallbackID() {
        return Math.random().toString();
    }

    function postCommand(command) {
        var theseCallbacks, args;
        theseCallbacks = [];
        args = Array.prototype.slice.call(arguments, 1); // skip command
        args.forEach(function (arg, index) {
            var callbackId;
            if (typeof arg === 'function') {
                callbackId = generateCallbackID();
                callbacks[callbackId] = function () {
                    theseCallbacks.forEach(function (id) {
                        delete callbacks[id];
                    });
                    arg.apply(null, arguments);
                };
                args[index] = callbackId;
                theseCallbacks.push(callbackId);
            }
        });
        window.top.postMessage(JSON.stringify({
            command: command,
            arguments: args
        }), '*');
    }

    // establish communications with root window
    handshake = setInterval(function () {
        window.top.postMessage('iframe-hi', '*');
    }, 1e3);
    setTimeout(function () {
        clearTimeout(handshake);
        if (!rootOrigin) {
            window.isBlinkGap = false;
            delete window.cordova;
            delete window.device;
            delete window.Device;
            delete window.PhoneGap;
            console.warn('no iframe handshake after 15 seconds, BlinkGap disabled');
        }
    }, 15e3);

    // handle messages
    window.addEventListener('message', function (event) {
        var obj;
        if (event.source !== window.top) {
            return; // message from an unexpected source
        }
        if (rootOrigin && rootOrigin !== event.origin) {
            return; // message from an unexpected source
        }
        if (event.data === 'root-hi') {
            clearTimeout(handshake);
            rootOrigin = event.origin;
            window.isBlinkGap = true;
            window.Device.available = true;
            window.cordova.available = true;
            window.cordova.offline.available = true;
        }
        try {
            obj = JSON.parse(event.data);
        } catch (ignore) { }
        if (obj && typeof obj === 'object') {
            if (obj.commandresult && callbacks[obj.commandresult]) {
                obj.arguments = obj.arguments || [];
                callbacks[obj.commandresult].apply(null, obj.arguments);
                return;
            }
            if (obj.command === 'device.cameras') {
                window.device.camerapresent = true;
                window.device.cameras = obj.arguments[0];
                navigator.camera = navigator.camera || {};
                navigator.camera.getPicture = function (onSuccess, onError, options) {
                    postCommand('navigator.camera.getPicture', onSuccess, onError, options);
                };
            }
            if (obj.command === 'evaluate') {
                eval(obj.arguments[0]);
            }
            if (obj.command === 'emitEvent') {
              var event = document.createEvent('Event');
              event.initEvent(obj.arguments[0], true, true);
              document.dispatchEvent(event);
            }
        }
        console.log(event);
    }, false);

    window.cordova.offline = {
        clear: function (onSuccess, onError) {
          postCommand('offline.clear', onSuccess, onError);
        },
        checkForUpdates: function (onSuccess, onError) {
          postCommand('offline.checkForUpdates', onSuccess, onError);
        },
        fetchResources: function (onSuccess, onError, options) {
          postCommand('offline.fetchResources', onSuccess, onError, options);
        },
        listResources: function (onSuccess, onError) {
          postCommand('offline.listResources', onSuccess, onError);
        },
        setOptions: function (onSuccess, onError, options) {
          postCommand('offline.setOptions', onSuccess, onError, options);
        },
        retrieveContent: function (onSuccess, onError, options) {
          postCommand('offline.retrieveContent', onSuccess, onError, options);
        },
        fixURLsInString: function (onSuccess, onError, options) {
          postCommand('offline.fixURLsInString', onSuccess, onError, options);
        },
        available: false
    };
    window.cordova.available = true;

    window.XMLHttpRequest = function (params) {
      // Private
      var xhr, options, response;

      xhr = this;

      options = {
        headers: {},
        method: 'GET',
        uri: '',
        mime: null
      };

      response = {
        headers: {}
      }

      // Properties
      this.onreadystatechange = null; // Callback
      this.readyState = 0;
      this.responseType = '';
      this.timeout = 0;
      this.ontimeout = null;
      this.upload = null;
      this.withCredentials = false;

      // Properties specific to response
      this.response = null;
      this.responseText = null;
      this.responseXML = null;
      this.status = null;
      this.statusText = null;

      // Methods
      this.abort = function () { };
      this.getAllResponseHeaders = function () {
        return response.headers;
      };
      this.getResponseHeader = function (header) {
        return response.headers[header];
      };
      this.open = function (method, url, async) {
        if (!async) {
          throw new Error('synchronous XHR is not supported');
        }
        options.method = method;
        options.uri = url;
        this.readyState = 1;
        if (this.onreadystatechange) { this.onreadystatechange(); }
      };
      this.overrideMimeType = function (mime) {
        options.mime = mime;
      };
      this.send = function (data) {
        data = data || null;
        postCommand('XMLHttpRequest.send', data, options, function (err, headers, data) {
          if (err) {
            // HANDLE???
            console.error('Failed to XHR', err);
          }
          if (xhr.responseType && xhr.responseType !== '') {
            // CAST HERE
            console.log('Failing to cast');
          } else {
            xhr.response = data;
          }
          xhr.responseText = data;
          xhr.responseXML = data; // TO FIX LATER
          xhr.status = 200; // TO FIX LATER
          xhr.statusText = 'OK'; // TO FIX LATER
          xhr.readyState = 4;
          response.headers = headers;
          if (xhr.onreadystatechange) { xhr.onreadystatechange(); }
        });
      };
      this.setRequestHeader = function (header, value) {
        options.headers[header] = value;
      };
    };

    console.log(window.cordova);

    if (!window.Modernizr) {
      window.Modernizr = {};
    }
    Modernizr.geolocation = true;

    if (!navigator.geolocation) {
      navigator.geolocation = {};
    }

    console.log('Modernizr.geolocation', Modernizr.geolocation);
    // duck-punch broken inner geolocation with message to root window

    navigator.geolocation.getCurrentPosition = function (onSuccess, onError, options) {
        options = options || {};
        postCommand('navigator.geolocation.getCurrentPosition', onSuccess, onError, options);
    };
    navigator.geolocation.clearWatch = function () {
      console.warn('geolocation.clearWatch() is just a stub');
      return;
    };
    navigator.geolocation.watchPosition = function (onSuccess, onError) {
      var positionError;
      console.warn('geolocation.watchPosition() is just a stub');
      positionError = new Error('not supported');
      positionError.code = 'POSITION_UNAVAILABLE';
      onError(positionError);
      return 0;
    };

    var deviceready = document.createEvent('Event');
    deviceready.initEvent('deviceready', true, true);
    document.dispatchEvent(deviceready);
}());
