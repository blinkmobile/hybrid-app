var registeredJS = -1;

function runTest(){
    pollUntil(function () {
          return typeof registeredJS !== 'undefined' && registeredJS === 0
    }, 500, function () {
        window.onload();
    });
}

function registerTestCase(id, jsSpec){
    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', jsSpec);
    head.appendChild(script);
    registeredJS++;
}

registeredJS--;

