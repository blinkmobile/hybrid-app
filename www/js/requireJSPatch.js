console.log('requireJSPatch is loading');
console.log('require is:' + require);
console.log('window.require is:' + window.require);
// ﻿window.require.config({
//   waitSeconds: 60
// });

// Windows.ApplicationModel.Package.current.installedLocation.getFileAsync("www\\offlineData\\uris.json").done(
//   function (file) {
//     Windows.Storage.FileIO.readTextAsync(file).done(
//       function (fileContent) {
//         window.files = JSON.parse(fileContent);
//       },
//       function (err) {
//         console.error(err);
//       }
//     );
//   },
//   function (err) {
//     console.error(err);
//   }
// );

window.oldLoad = window.require.load;
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
