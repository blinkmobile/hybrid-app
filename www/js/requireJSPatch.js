window.require.config({
  waitSeconds: 60
});

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

pollUntilReady();