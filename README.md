# hybrid-app

## Instructions

1. `npm install`

2. `npm install -g cordova`

3. manage platforms and plugins for cordova in scripts/prepare-dependencies.js like this:

var PLATFORMS = {
'android': '3.6.4',
'ios': '3.7.0'
};
var PLUGINS = {
'org.apache.cordova.statusbar' : '@0.1.9'
//'https://github.com/phonegap-build/StatusBarPlugin.git' : '#1.1.0'
};

4. to automatically install platforms and plugins, use: `node scripts/prepare-dependencies.js`

5. to update your change made in www and compile project, use: `cordova build [ios|android]`

6. to launch emulator to test your app, use: `cordova emulate [ios|android]`

7. for iOS, when the webview finished loading page, webViewDidFinishLoad in the MainviewController will be called, so add these lines into it can verify url is correctly loaded
    NSString *currentURL = self.webView.request.mainDocumentURL.absoluteString;
    NSLog(@"URL loaded is:%@", currentURL);

   for Android, when the webview finished loading page, onPageFinished message will be posted, so in CordovaApp.java we can handle the message will able to help verify url is correctly loaded, like this:
    public Object onMessage(String id, Object data) {
    	if ("onPageFinished".equals(id)) {
        	LOG.d(TAG, "Successfully received message(" + id + "," + data + ")");
    	}
		return super.onMessage(id, data);
    }

8. JS unit test case is located in www/tests/spec/, run JS unit test from www/tests/SpecRunner.html
