function Manifest (manifest) {
  this.manifest = manifest;
}

Manifest.prototype.parse = function (callback) {
  var lines, entries, currentSection;

  lines = this.manifest.split(/\r\n|\r|\n/);

  entries = {
    cache: [],
    network: [],
    fallback: [],
    settings: []
  }

  if (lines[0].indexOf('CACHE MANIFEST') !== 0) {
    return callback('Invalid Cache Manifest', null);
  }
  lines.shift();

  lines.forEach(function (line) {
    if (!line.length) {
      return;
    } else if (line.indexOf('CACHE:') === 0) {
      currentSection = 'cache';
    } else if (line.indexOf('NETWORK:') === 0) {
      currentSection = 'network';
    } else if (line.indexOf('FALLBACK:') === 0) {
      currentSection = 'fallback';
    } else if (line.indexOf('SETTINGS:') === 0) {
      currentSection = 'settings';
    } else if (line.indexOf('#') === 0) {
      return;
    } else {
      if(currentSection === null) currentSection = 'cache';
      entries[currentSection].push(line)
    }

  });

  return entries
}
