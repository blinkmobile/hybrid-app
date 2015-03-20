var BlinkGap = BlinkGap || {};

(function () {
  'use strict';
  var isCordovaReady, app, activation, cameras, deviceInfo;

  window.cordova = {
    offline: window.offline
  };

  app = WinJS.Application;
  activation = Windows.ApplicationModel.Activation;

  app.addEventListener('activated', function (event) {
    console.log('WinJS app: activated');
    if (event.detail.kind === activation.ActivationKind.launch) {
      console.log('WinJS app: launched');
      event.setPromise(WinJS.UI.processAll().then(function () {
        console.log('WinJS app: UI processed');
      }));
    }
  }, false);

  isCordovaReady = true;
  /*
  document.addEventListener('deviceready', function () {
    console.info('deviceready');
    isCordovaReady = true;
  }, false);
  */

  deviceInfo = Windows.Devices.Enumeration.DeviceInformation;
  deviceInfo.findAllAsync(Windows.Devices.Enumeration.DeviceClass.videoCapture).then(function (devices) {
    devices = devices.filter(function (device) {
      return device.isEnabled;
    });
    cameras = devices;
  });

  function positionToW3C(position) {
    var obj = {};
    obj.coords = {
      latitude: position.coordinate.point.position.latitude,
      longitude: position.coordinate.point.position.longitude,
      altitude: position.coordinate.point.position.altitude,
      accuracy: position.coordinate.accuracy,
      altitudeAccuracy: position.coordinate.altitudeAccuracy,
      heading: position.coordinate.heading,
      speed: position.coordinate.speed
    };
    return obj;
  }

  BlinkGap.messageTarget = null;
  BlinkGap.postMessage = function (message) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    }
    BlinkGap.messageTarget.postMessage(message, '*');
  };
  BlinkGap.postCommand = function (command) {
    var args;
    args = Array.prototype.slice.call(arguments, 0);
    args.shift(); // remove callbackId from the start of the array
    BlinkGap.postMessage({
      command: command,
      arguments: args
    });
  };
  BlinkGap.postCommandResult = function (callbackId) {
    var args;
    args = Array.prototype.slice.call(arguments, 0);
    args.shift(); // remove callbackId from the start of the array
    BlinkGap.postMessage({
      commandresult: callbackId,
      arguments: args
    });
  };

  window.addEventListener('message', function (event) {
    var obj, geoloc, injector, $location, $rootScope;
    //if (event.origin !== origin) {
    //  return; // message from an unknown source
    //}
    if (!isCordovaReady || !Array.isArray(cameras)) {
      return; // don't respond to messages until Cordova is ready
    }
    BlinkGap.messageTarget = event.source;
    if (event.data === 'iframe-hi') {
      BlinkGap.postMessage('root-hi');
      event.source.postMessage(JSON.stringify({
        command: 'device.cameras',
        arguments: [
          cameras.map(function (c) {
            return { id: c.id, name: c.name };
          })
        ]
      }), '*');
      return;
    }
    try {
      obj = JSON.parse(event.data);
    } catch (ignore) { }
    if (obj && typeof obj === 'object') {
      if (obj.command) {
        if (obj.command === 'navigator.geolocation.getCurrentPosition') {
          geoloc = geoloc || new Windows.Devices.Geolocation.Geolocator();
          geoloc.getGeopositionAsync().then(function (position) {
            BlinkGap.postCommandResult(obj.arguments[0], positionToW3C(position));
          }, function (error) {
            console.error('Windows GeoLocation', arguments);
            BlinkGap.postCommandResult(obj.arguments[1], error);
          });
        }
        if (obj.command === 'navigator.camera.getPicture') {
          WinJS.Application.sessionState.cameraCallbacks = {
            success: obj.arguments[0],
            error: obj.arguments[1]
          }
          var filePicker = new Windows.Storage.Pickers.FileOpenPicker();
          filePicker.suggestedStartLocation = Windows.Storage.Pickers.picturesLibrary;
          filePicker.fileTypeFilter.replaceAll([".png", ".jpg", ".jpeg"]);
          filePicker.pickSingleFileAndContinue();
        }
        if (obj.command === 'offline.clear') {
          offline.clear(
            function (result) {
              BlinkGap.postCommandResult(obj.arguments[0], result);
            },
            function (err) {
              BlinkGap.postCommandResult(obj.arguments[1], err);
            }
          );
        }
        if (obj.command === 'offline.checkForUpdates') {
          offline.checkForUpdates(
            function (result) {
              BlinkGap.postCommandResult(obj.arguments[0], result);
            },
            function (err) {
              BlinkGap.postCommandResult(obj.arguments[1], err);
            }
          );
        }
        if (obj.command === 'offline.fetchResources') {
          offline.fetchResources(
            function (result) {
              BlinkGap.postCommandResult(obj.arguments[0], result);
            },
            function (err) {
              BlinkGap.postCommandResult(obj.arguments[1], err);
            },
            obj.arguments[2]
          );
        }
        if (obj.command === 'offline.listResources') {
          offline.listResources(
            function (result) {
              BlinkGap.postCommandResult(obj.arguments[0], result);
            },
            function (err) {
              BlinkGap.postCommandResult(obj.arguments[1], err);
            }
          );
        }
        if (obj.command === 'offline.setOptions') {
          offline.setOptions(
            function (result) {
              BlinkGap.postCommandResult(obj.arguments[0], result);
            },
            function (err) {
              BlinkGap.postCommandResult(obj.arguments[1], err);
            },
            obj.arguments[2]
          );
        }
        if (obj.command === 'offline.retrieveContent') {
          offline.retrieveContent(
            function (result) {
              BlinkGap.postCommandResult(obj.arguments[0], result);
            },
            function (err) {
              BlinkGap.postCommandResult(obj.arguments[1], err);
            },
            obj.arguments[2]
          );
        }
        if (obj.command === 'offline.fixURLsInString') {
          offline.fixURLsInString(
            function (result) {
              BlinkGap.postCommandResult(obj.arguments[0], result);
            },
            function (err) {
              BlinkGap.postCommandResult(obj.arguments[1], err);
            },
            obj.arguments[2]
          );
        }
        if (obj.command === 'XMLHttpRequest.send') {
          var data, options, callback, uri, httpClient, promise;
          data = obj.arguments[0];
          options = obj.arguments[1];
          callback = obj.arguments[2];
          if (options.uri.substr(0, 4) === 'http') {
            uri = new Windows.Foundation.Uri(options.uri)
          } else {
            uri = new Windows.Foundation.Uri(origin, options.uri);
          }
          httpClient = new Windows.Web.Http.HttpClient();
          httpClient.defaultRequestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows Phone 8.1; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; Microsoft; Virtual) like Gecko BlinkGap/0.0.0';

          for (var header in options.headers) {
            try {
              httpClient.defaultRequestHeaders[header] = options.headers[header];
            } catch (e) {
              console.log(e);
            }
          };

          switch (options.method) {
            case 'GET':
              promise = httpClient.getAsync(uri);
              break;
            case 'POST':
              promise = httpClient.postAsync(uri, new Windows.Web.Http.HttpStringContent(data, Windows.Storage.Streams.UnicodeEncoding.utf8, options.mime || options.headers['Content-Type']) || 'application/x-www-form-urlencoded');
              break;
            case 'PUT':
              promise = httpClient.putAsync(uri, new Windows.Web.Http.HttpStringContent(data, Windows.Storage.Streams.UnicodeEncoding.utf8, options.mime || options.headers['Content-Type']) || 'application/x-www-form-urlencoded');
              break;
            case 'DELETE':
              promise = httpClient.deleteAsync(uri);
              break;
          }

          promise.done(
            function (response) {
              var headers = '';
              for (var header in response.headers) {
                if (typeof response.headers[header] === 'string') {
                  headers += header + ': ' + response.headers[header] + '\r\n';
                }
              };
              BlinkGap.postCommandResult(callback, null, headers, response.content.toString());
            },
            function (err) {
              BlinkGap.postCommandResult(callback, err);
            }
          );
        }
      }
    }
    console.log(event);
  }, false);

}());
