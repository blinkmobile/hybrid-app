/** https://github.com/jokeyrhyme/poll-until.js */
function pollUntil(condition, interval, callback) {
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