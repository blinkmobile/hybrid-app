console.log('requireJSPatch is loading');
console.log('require is:' + require);
console.log('window.require is:' + window.require);
﻿window.require.config({
  waitSeconds: 60
});

window.files = {"https://blinkm.co/integration":"ms-appx:///www/offlineData/d6aad549714cef60767a6c032f233500.html","https://d1c6dfkb81l78v.cloudfront.net/backbonejs/1.0.0/backbone-min.js":"ms-appx:///www/offlineData/2c4ba987f2a7a6ccf17f8ce861267b30.js","https://d1c6dfkb81l78v.cloudfront.net/blink/blobs/1377493706402/bmp-blobs.min.js":"ms-appx:///www/offlineData/b05bafb8705a06d1524074ad533003e6.js","https://d1c6dfkb81l78v.cloudfront.net/blink/bic/3/1421629856875/bic.min.js":"ms-appx:///www/offlineData/c5947897d86f8ba07043144b33f00e01.js","https://d1c6dfkb81l78v.cloudfront.net/blink/bic/3/1421629856875/formsdeps.min.js":"ms-appx:///www/offlineData/526a49e68321166ad4c315d636437594.js","https://d1c6dfkb81l78v.cloudfront.net/blink/require/6/require.min.js":"ms-appx:///www/offlineData/2df201e0c89614731845433089fe0f04.js","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.2/jquery.mobile-1.3.2.min.css":"ms-appx:///www/offlineData/457978862f64c1f2201cbda0e371e268.css","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.0/jqm.theme.min.css":"ms-appx:///www/offlineData/491da3c59e56996eacaf9d42e20c3777.css","https://d1c6dfkb81l78v.cloudfront.net/blink/bic/3/1421629856875/bic.js":"ms-appx:///www/offlineData/9eeae0a89dcb40e7618db00d4f5586bf.js","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.0/jqm.structure.min.css":"ms-appx:///www/offlineData/276ca25a79d072181af9375a580a513f.css","https://d1c6dfkb81l78v.cloudfront.net/blink/forms/3/3.1.7/forms3jqm.min.js":"ms-appx:///www/offlineData/21b2b33c3d1c2496a2627e5c77318b98.js","https://d1c6dfkb81l78v.cloudfront.net/mustache/0.7.3/mustache.min.js":"ms-appx:///www/offlineData/4bd5abb61dffd4201152f442fc96310c.js","https://d1c6dfkb81l78v.cloudfront.net/modernizr/2.7.1/modernizr.custom.26204.min.js":"ms-appx:///www/offlineData/4c519ffbf407b7ab7900d902c2f0a354.js","https://d1c6dfkb81l78v.cloudfront.net/jquery/1.9.1/jquery.min.js":"ms-appx:///www/offlineData/927901d81c5e7336f00a7fabded36020.js","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.2/images/ajax-loader.gif":"ms-appx:///www/offlineData/4b502c86a3e31071b2d0916405f87267.gif","https://blinkm.co/_R_/common/3/xhr/GetConfig.php?_asn=integration":"ms-appx:///www/offlineData/fc1898c402382e32a9db0865e5311c4a.php","https://d1c6dfkb81l78v.cloudfront.net/lodash/2.4.1/lodash.underscore.min.js":"ms-appx:///www/offlineData/9bbd8c8d0dc233d4a02263261296b4c9.js","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.2/images/icons-18-black.png":"ms-appx:///www/offlineData/cc0d124f99df3d0bebae7a1ff9e5a99e.png","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.2/jquery.mobile.structure-1.3.2.min.css":"ms-appx:///www/offlineData/c66df96e4e8cd4ef593ecd67c9b31ee1.css","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.2/images/icons-36-black.png":"ms-appx:///www/offlineData/53cf35b3fb4594828f8066bcd4e22233.png","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.2/jquery.mobile-1.3.2.min.js":"ms-appx:///www/offlineData/34e565dab435fd9d4527d50e3dfa4b75.js","https://d1c6dfkb81l78v.cloudfront.net/moment/2.6.0/moment.min.js":"ms-appx:///www/offlineData/4ffb1eccbdd475d4d7da61a899498c05.js","https://d1c6dfkb81l78v.cloudfront.net/moment/2.6.0/moment-with-langs.min.js":"ms-appx:///www/offlineData/95b7ffc05c18bd46a5645454e93b1830.js","https://d1c6dfkb81l78v.cloudfront.net/signaturepad/2.3.0/jq.sig.min.js":"ms-appx:///www/offlineData/ab0e9e235fb428d5af192f97f70501bc.js","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.2/images/icons-36-white.png":"ms-appx:///www/offlineData/6351eeb1a5b77ba4a7bbc188c7a7aae5.png","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.2/images/icons-18-white.png":"ms-appx:///www/offlineData/3767a0e18a565d4041dc8b26fe9864f1.png","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.0/images/icons-18-black.png":"ms-appx:///www/offlineData/f9ca317373bde47bb255c912e16aa323.png","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.0/images/icons-36-black.png":"ms-appx:///www/offlineData/3fe7b823545d330435e4e055e65f92b2.png","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.0/images/ajax-loader.gif":"ms-appx:///www/offlineData/0859221065973b1120c459e5ac353041.gif","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.0/images/icons-18-white.png":"ms-appx:///www/offlineData/5e3fcbab158dd8983192bb0454ea6f8f.png","https://d1c6dfkb81l78v.cloudfront.net/lodash/2.4.1/lodash.compat.min.js":"ms-appx:///www/offlineData/4e45151f8c40eb3d10fa518b5948b5e1.js","https://d1c6dfkb81l78v.cloudfront.net/pickadate/3.4.0/compressed/themes/default.css":"ms-appx:///www/offlineData/c65a38f6ef117b9c48d73592f350e4df.css","https://d1c6dfkb81l78v.cloudfront.net/bluebird/1.2.4/bluebird.min.js":"ms-appx:///www/offlineData/f9254be3cb31290a7d4282e1113d1426.js","https://d1c6dfkb81l78v.cloudfront.net/pickadate/3.4.0/compressed/themes/default.date.css":"ms-appx:///www/offlineData/1cb2ee2ab43e48752a286a6ef9084ed7.css","https://d1c6dfkb81l78v.cloudfront.net/pickadate/3.4.0/compressed/themes/default.time.css":"ms-appx:///www/offlineData/6f4d452b9a33353804052fb1d189c534.css","https://d1c6dfkb81l78v.cloudfront.net/q/0.9.7/q.min.js":"ms-appx:///www/offlineData/e24c4cfba1f2361454d61126483eec91.js","https://d1c6dfkb81l78v.cloudfront.net/jquery.mobile/1.3.0/images/icons-36-white.png":"ms-appx:///www/offlineData/30132048113ea1d0b0a662da08d2b2c6.png","https://d1c6dfkb81l78v.cloudfront.net/pouchdb/2.2.3/pouchdb-nightly.min.js":"ms-appx:///www/offlineData/f7b720bbc46eb2f094e1e38e2ec28f1d.js","https://d1c6dfkb81l78v.cloudfront.net/es5-shim/2.3.0/es5-shim.min.js":"ms-appx:///www/offlineData/612caa9523ed94fcb5864a81047c739b.js" };

window.oldLoad = window.require.load;

window.require.load = function () {
  console.log('Require.load called too early');
}

var pollUntilReady = function () {
  if (window.cordova && window.cordova.offline) {
    cordova.offline.listResources(
      function (files) {
        cordova.offline.fixURLsInString(
          function (url) {
            window.require.load = function (context, id, url) {
              if (url.substr(0, 2) === '//' && files['https:' + url]) {
                return window.oldLoad(context, id, files['https:' + url]);
              } else if (url.substr(0, 2) === '//' && files['http:' + url]) {
                return window.oldLoad(context, id, files['http:' + url]);
              }
              return window.oldLoad(context, id, url);
            };
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
          },
          function (err) {
            console.log('#fixURLsInString failed');
            console.log(err);
          },
          {
            string: window.BICURL
          }
        )
      },
      function (err) {
        console.log('#listResources failed');
        console.log(err);
      }
    );
  } else {
    window.setTimeout(pollUntilReady, 1000);
  }
}

//pollUntilReady();

window.require.load = function (context, id, url) {

  //todo log what is loading console.log....
  console.log('reqire load url is :'+url);
  if (url.substr(0, 2) === '//') {
    if (files['https:' + url]) {
      console.log('return https oldload is: ' + files['https:' + url]);
      return window.oldLoad(context, id, files['https:' + url]);
    } else if (files['http:' + url]) {
      console.log('return http oldload is: ' + files['http:' + url]);
      return window.oldLoad(context, id, files['http:' + url]);
    }
  } else {
    console.log('return exact match: ' + files[url]);
    return window.oldLoad(context, id, files[url]);
  }
  console.log('return oldload is not found');
  return window.oldLoad(context, id, url);
};
