!function(){var a,b,c,d,e,f,g,h,i,j;for(a="//d1c6dfkb81l78v.cloudfront.net/",b="/_c_/",document.currentScript||(f=document.getElementsByTagName("script"),document.currentScript=f[f.length-1]),c=window.BICURL?window.BICURL.replace(/\\/g,"/").replace(/\/[^\/]*$/,""):document.currentScript.src.replace(/\\/g,"/").replace(/\/[^\/]*$/,""),f=document.getElementsByTagName("script"),g=f.length;g>0;)if(g-=1,h=f[g],h.src&&/\/blink\/require\/\d+\/require\.min\.js/.test(h.src)){a=h.src.replace(/blink\/require\/\d+\/require\.min\.js[\w\.]*$/,"");
break}"file:"===location.protocol&&(a=a.replace(/^\/\//,"https://")),e=function(c){var d;
return d=[a+c,b+c]},d={BlinkForms:e("blink/forms/3/3.1.7/forms3jqm.min"),"BMP.Blobs":e("blink/blobs/1377493706402/bmp-blobs.min"),signaturepad:e("signaturepad/2.3.0/jq.sig.min"),jquerymobile:e("jquery.mobile/1.3.2/jquery.mobile-1.3.2.min"),jquery:e("jquery/1.9.1/jquery.min"),bluebird:e("bluebird/1.2.4/bluebird.min"),backbone:e("backbonejs/1.0.0/backbone-min"),lodash:e("lodash/2.4.1/lodash.compat.min"),modernizr:e("modernizr/2.7.1/modernizr.custom.26204.min"),mustache:e("mustache/0.7.3/mustache.min"),q:e("q/0.9.7/q.min"),underscore:e("lodash/2.4.1/lodash.underscore.min"),formsdeps:c+"/formsdeps.min","es5-shim":e("es5-shim/2.3.0/es5-shim.min"),pouchdb:e("pouchdb/2.2.3/pouchdb-nightly.min")},i=!0,require.version<"2.2"&&(i=!1,require.version>="2.1"&&(j=require.version.match(/(\d+)\.(\d+)\.(\d+)/),j&&j[3]>=10&&(i=!0))),i||(d.moment=c+"/formsdeps.min",d.picker=c+"/formsdeps.min",d["picker.date"]=c+"/formsdeps.min",d["picker.time"]=c+"/formsdeps.min"),require.config({paths:d})
}(),require.config({shim:{"BMP.Blobs":{deps:["underscore","jquery"],exports:"BMP"},signaturepad:{deps:["jquery"],exports:"$"},backbone:{deps:["underscore","jquery"],exports:"Backbone"},modernizr:{exports:"Modernizr"},underscore:{exports:"_"}},bundles:{formsdeps:["picker","picker.date","picker.time","moment"]}}),define("implementations",[],function(){return{es5:[{isAvailable:function(){return!(Array.prototype&&Array.prototype.every&&Array.prototype.filter&&Array.prototype.forEach&&Array.prototype.indexOf&&Array.prototype.lastIndexOf&&Array.prototype.map&&Array.prototype.some&&Array.prototype.reduce&&Array.prototype.reduceRight&&Array.isArray&&Function.prototype.bind)
},implementation:"es5-shim"},{isAvailable:function(){return!0},module:function(){return{}
}}],promises:[{isAvailable:function(){return"Promise"in window&&"resolve"in window.Promise&&"reject"in window.Promise&&"all"in window.Promise&&"race"in window.Promise&&function(){var a;
return new window.Promise(function(b){a=b}),"function"==typeof a}()},module:function(){return Promise
}},{isAvailable:function(){return!0},implementation:"bluebird"}]}}),/**
 * AMD-Feature - A loader plugin for AMD loaders.
 *
 * https://github.com/jensarps/AMD-feature
 *
 * @author Jens Arps - http://jensarps.de/
 * @license MIT or BSD - https://github.com/jensarps/AMD-feature/blob/master/LICENSE
 * @version 1.1.0
 */
define("feature",["implementations"],function(a){return{load:function(b,c,d,e){var f,g,h,i=a[b],j="[object Array]"==Object.prototype.toString.call(i);
if(e.isBuild&&j)for(f=0,g=i.length;g>f;f++)i[f].implementation&&c([i[f].implementation],d);
else{if(j)for(f=0,g=i.length;g>f;f++){var k=i[f];if(k.isAvailable()){if("undefined"!=typeof k.module)return void d(k.module());
h=k.implementation;break}}else{if("undefined"!=typeof i.module)return void d(i.module());
h=i}c([h],d)}}}}),function(a,b){"function"==typeof define&&define.amd?define("pollUntil",[],b):"object"==typeof exports?module.exports=b():a.pollUntil=b()
}(this,function(){return function a(b,c,d){var e;return b&&b()?(e=null,d()):e=setTimeout(function(){a(b,c,d)
},c||197),function(){clearTimeout(e)}}}),function(){var a;a=window.BMP,a.BlinkGap={},a.BlinkGap.isHere=function(){return window.isBlinkGap||window.cordova?!0:a.BIC&&a.BIC.isBlinkGap?!0:!!(window.PhoneGap&&"object"===$.type(window.device)&&window.device instanceof window.Device)
},a.BlinkGap.isReady=function(){return a.BlinkGap.isHere()&&!!(window.PhoneGap&&window.PhoneGap.available||window.cordova&&window.cordova.available)
},a.BlinkGap.hasCamera=function(){return a.BlinkGap.isHere()&&!!(window.Camera&&window.Camera.getPicture||navigator.camera&&navigator.camera.getPicture)
},a.BlinkGap.hasTouchDraw=function(){return a.BlinkGap.isHere()&&!!(window.BGTouchDraw&&window.BGTouchDraw.getDrawing||navigator.bgtouchdraw&&navigator.bgtouchdraw.getDrawing)
},a.BlinkGap.hasOffline=function(){return!!(a.BlinkGap.isHere()&&window.cordova&&window.cordova.offline)
},a.BlinkGap.isOfflineReady=function(){return!!(a.BlinkGap.isReady()&&a.BlinkGap.hasOffline()&&window.cordova.offline.available)
},a.BlinkGap.waitForOffline=function(b,c){var d,e;e=setTimeout(function(){!a.BlinkGap.isOfflineReady()&&d&&(d(),c(new Error("no cordova.offline.available after 5 seconds")))
},5e3),d=pollUntil(a.BlinkGap.isOfflineReady,197,function(){clearTimeout(e),b()})
},a.BlinkGap.whenReady=function(){var b,c,d,e;return b=new $.Deferred,c=new Date,e=function(){document.removeEventListener("deviceready",e,!1),b.resolve()
},d=function(){a.BlinkGap.isHere()?a.BlinkGap.isReady()?b.resolve():document.addEventListener&&document.addEventListener("deviceready",e,!1):$.now()-c>1e4?b.reject(new Error("waitForBlinkGap(): still no PhoneGap after 10 seconds")):setTimeout(d,197)
},d(),b.promise()}}(),function(){function a(){var a;if(!BMP.BlinkGap.hasOffline())throw new Error("no offline cordova plugin");
if(!cordova.offline.initialURL||"string"!=typeof cordova.offline.initialURL)throw new Error("offline cordova plugin did not supply initialURL");
if(a=cordova.offline.initialURL.match(/(https?:\/\/[^\/]+)/),!a)throw new Error("initialURL was malformed and could not be parsed");
return a[1]}function b(){return this.plugin=window.cordova.offline,this.urlsMap={},this
}BMP.BlinkGap.hasOffline()&&(b.prototype.populateURLsMap=function(a,b){var c=this;
BMP.BlinkGap.waitForOffline(function(){c.plugin.listResources(function(b){c.urlsMap=b,a()
},function(a){b(a)})},function(a){b(a)})},b.prototype.getURL=function(b){var c;return c=this.urlsMap[b],0===b.indexOf("//")?(c||(c=this.urlsMap["https:"+b]),c||(c=this.urlsMap["http:"+b])):0===b.indexOf("/")&&(b=a()+b,c=this.urlsMap[b]),c
},BMP.BlinkGap.offline=new b)}(),define("BlinkGap",["pollUntil"],function(a){return function(){var b;
return b||a.BMP.BlinkGap}}(this)),function(a,b){"function"==typeof define&&define.amd?define("bic",["feature!promises","jquery","underscore","backbone","mustache","BlinkForms","jquerymobile","BMP.Blobs","modernizr","pouchdb","pollUntil","feature!es5","BlinkGap"],b):a.bic=b()
}(this,function(a,b,c,d,e,f,g,h,i,j,k){/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
var l,m,n;!function(a){function b(a,b){return u.call(a,b)}function c(a,b){var c,d,e,f,g,h,i,j,k,l,m,n=b&&b.split("/"),o=s.map,p=o&&o["*"]||{};
if(a&&"."===a.charAt(0))if(b){for(n=n.slice(0,n.length-1),a=a.split("/"),g=a.length-1,s.nodeIdCompat&&w.test(a[g])&&(a[g]=a[g].replace(w,"")),a=n.concat(a),k=0;k<a.length;k+=1)if(m=a[k],"."===m)a.splice(k,1),k-=1;
else if(".."===m){if(1===k&&(".."===a[2]||".."===a[0]))break;k>0&&(a.splice(k-1,2),k-=2)
}a=a.join("/")}else 0===a.indexOf("./")&&(a=a.substring(2));if((n||p)&&o){for(c=a.split("/"),k=c.length;k>0;k-=1){if(d=c.slice(0,k).join("/"),n)for(l=n.length;l>0;l-=1)if(e=o[n.slice(0,l).join("/")],e&&(e=e[d])){f=e,h=k;
break}if(f)break;!i&&p&&p[d]&&(i=p[d],j=k)}!f&&i&&(f=i,h=j),f&&(c.splice(0,h,f),a=c.join("/"))
}return a}function d(b,c){return function(){return k.apply(a,v.call(arguments,0).concat([b,c]))
}}function e(a){return function(b){return c(b,a)}}function f(a){return function(b){q[a]=b
}}function g(c){if(b(r,c)){var d=r[c];delete r[c],t[c]=!0,j.apply(a,d)}if(!b(q,c)&&!b(t,c))throw new Error("No "+c);
return q[c]}function h(a){var b,c=a?a.indexOf("!"):-1;return c>-1&&(b=a.substring(0,c),a=a.substring(c+1,a.length)),[b,a]
}function i(a){return function(){return s&&s.config&&s.config[a]||{}}}var j,k,o,p,q={},r={},s={},t={},u=Object.prototype.hasOwnProperty,v=[].slice,w=/\.js$/;
o=function(a,b){var d,f=h(a),i=f[0];return a=f[1],i&&(i=c(i,b),d=g(i)),i?a=d&&d.normalize?d.normalize(a,e(b)):c(a,b):(a=c(a,b),f=h(a),i=f[0],a=f[1],i&&(d=g(i))),{f:i?i+"!"+a:a,n:a,pr:i,p:d}
},p={require:function(a){return d(a)},exports:function(a){var b=q[a];return"undefined"!=typeof b?b:q[a]={}
},module:function(a){return{id:a,uri:"",exports:q[a],config:i(a)}}},j=function(c,e,h,i){var j,k,l,m,n,s,u=[],v=typeof h;
if(i=i||c,"undefined"===v||"function"===v){for(e=!e.length&&h.length?["require","exports","module"]:e,n=0;n<e.length;n+=1)if(m=o(e[n],i),k=m.f,"require"===k)u[n]=p.require(c);
else if("exports"===k)u[n]=p.exports(c),s=!0;else if("module"===k)j=u[n]=p.module(c);
else if(b(q,k)||b(r,k)||b(t,k))u[n]=g(k);else{if(!m.p)throw new Error(c+" missing "+k);
m.p.load(m.n,d(i,!0),f(k),{}),u[n]=q[k]}l=h?h.apply(q[c],u):void 0,c&&(j&&j.exports!==a&&j.exports!==q[c]?q[c]=j.exports:l===a&&s||(q[c]=l))
}else c&&(q[c]=h)},l=m=k=function(b,c,d,e,f){if("string"==typeof b)return p[b]?p[b](c):g(o(b,c).f);
if(!b.splice){if(s=b,s.deps&&k(s.deps,s.callback),!c)return;c.splice?(b=c,c=d,d=null):b=a
}return c=c||function(){},"function"==typeof d&&(d=e,e=f),e?j(a,b,c,d):setTimeout(function(){j(a,b,c,d)
},4),k},k.config=function(a){return k(a)},l._defined=q,n=function(a,c,d){c.splice||(d=c,c=[]),b(q,a)||b(r,a)||(r[a]=[a,c,d])
},n.amd={jQuery:!0}}(),n("../bower_components/almond/almond",function(){}),n("implementations",[],function(){return{data:[{isAvailable:function(){try{return i.indexeddb&&null===window.indexedDB.open("idbTest",1).onupgradeneeded&&-1===navigator.userAgent.indexOf("iPhone")&&-1===navigator.userAgent.indexOf("iPad")||window.BMP.BIC.isBlinkGap&&i.websqldatabase
}catch(a){}return!1},implementation:"data-pouch"},{isAvailable:function(){return!0
},implementation:"data-inMemory"}],api:[{isAvailable:function(){return window.cordova&&window.cordova.offline
},implementation:"api-native"},{isAvailable:function(){return!0},implementation:"api-web"}]}
}),/**
 * AMD-Feature - A loader plugin for AMD loaders.
 *
 * https://github.com/jensarps/AMD-feature
 *
 * @author Jens Arps - http://jensarps.de/
 * @license MIT or BSD - https://github.com/jensarps/AMD-feature/blob/master/LICENSE
 * @version 1.1.0
 */
n("feature",["implementations"],function(a){return{load:function(b,c,d,e){var f,g,h,i=a[b],j="[object Array]"==Object.prototype.toString.call(i);
if(e.isBuild&&j)for(f=0,g=i.length;g>f;f++)i[f].implementation&&c([i[f].implementation],d);
else{if(j)for(f=0,g=i.length;g>f;f++){var k=i[f];if(k.isAvailable()){if("undefined"!=typeof k.module)return void d(k.module());
h=k.implementation;break}}else{if("undefined"!=typeof i.module)return void d(i.module());
h=i}c([h],d)}}}}),function(){function a(a,b,c){var d=b&&c||0,e=0;for(b=b||[],a.toLowerCase().replace(/[0-9a-f]{2}/g,function(a){16>e&&(b[d+e++]=o[a])
});16>e;)b[d+e++]=0;return b}function b(a,b){var c=b||0,d=l;return d[a[c++]]+d[a[c++]]+d[a[c++]]+d[a[c++]]+"-"+d[a[c++]]+d[a[c++]]+"-"+d[a[c++]]+d[a[c++]]+"-"+d[a[c++]]+d[a[c++]]+"-"+d[a[c++]]+d[a[c++]]+d[a[c++]]+d[a[c++]]+d[a[c++]]+d[a[c++]]
}function c(a,c,d){var e=c&&d||0,f=c||[];a=a||{};var g=null!=a.clockseq?a.clockseq:s,h=null!=a.msecs?a.msecs:(new Date).getTime(),i=null!=a.nsecs?a.nsecs:u+1,j=h-t+(i-u)/1e4;
if(0>j&&null==a.clockseq&&(g=g+1&16383),(0>j||h>t)&&null==a.nsecs&&(i=0),i>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
t=h,u=i,s=g,h+=122192928e5;var k=(1e4*(268435455&h)+i)%4294967296;f[e++]=k>>>24&255,f[e++]=k>>>16&255,f[e++]=k>>>8&255,f[e++]=255&k;
var l=h/4294967296*1e4&268435455;f[e++]=l>>>8&255,f[e++]=255&l,f[e++]=l>>>24&15|16,f[e++]=l>>>16&255,f[e++]=g>>>8|128,f[e++]=255&g;
for(var m=a.node||r,n=0;6>n;n++)f[e+n]=m[n];return c?c:b(f)}function d(a,c,d){var f=c&&d||0;
"string"==typeof a&&(c="binary"==a?new k(16):null,a=null),a=a||{};var g=a.random||(a.rng||e)();
if(g[6]=15&g[6]|64,g[8]=63&g[8]|128,c)for(var h=0;16>h;h++)c[f+h]=g[h];return c||b(g)
}var e,f=this;if("function"==typeof m)try{var g=m("crypto").randomBytes;e=g&&function(){return g(16)
}}catch(h){}if(!e&&f.crypto&&crypto.getRandomValues){var i=new Uint8Array(16);e=function(){return crypto.getRandomValues(i),i
}}if(!e){var j=new Array(16);e=function(){for(var a,b=0;16>b;b++)0===(3&b)&&(a=4294967296*Math.random()),j[b]=a>>>((3&b)<<3)&255;
return j}}for(var k="function"==typeof Buffer?Buffer:Array,l=[],o={},p=0;256>p;p++)l[p]=(p+256).toString(16).substr(1),o[l[p]]=p;
var q=e(),r=[1|q[0],q[1],q[2],q[3],q[4],q[5]],s=16383&(q[6]<<8|q[7]),t=0,u=0,v=d;
if(v.v1=c,v.v4=d,v.parse=a,v.unparse=b,v.BufferClass=k,"function"==typeof n&&n.amd)n("uuid",[],function(){return v
});else if("undefined"!=typeof module&&module.exports)module.exports=v;else{var w=f.uuid;
v.noConflict=function(){return f.uuid=w,v},f.uuid=v}}.call(this),n("api-native",["uuid"],function(d){var e={getAnswerSpaceMap:function(b){return new a(function(a,c){var d="";
b&&(d="&_username="+b),cordova.offline.retrieveContent(function(b){a(JSON.parse(b))
},c,{url:"/_R_/common/3/xhr/GetConfig.php?_asn="+window.BMP.BIC.siteVars.answerSpace+d})
})},getInteractionResult:function(a,d,e){var f="";return d&&"object"==typeof d&&c.each(d,function(a,b){a&&(f+="&"+b+"="+a)
}),b.ajax("/_R_/common/3/xhr/GetAnswer.php?asn="+window.BMP.BIC.siteVars.answerSpace+"&iact="+a+"&ajax=false"+f,e)
},getForm:function(){return new a(function(a,b){cordova.offline.retrieveContent(function(b){a(JSON.parse(b))
},b,{url:"/_R_/common/3/xhr/GetForm.php?_v=3&_aid="+window.BMP.BIC.siteVars.answerSpaceId})
})},getDataSuitcase:function(b,c){return new a(function(a,d){cordova.offline.retrieveContent(a,d,{url:"/_R_/common/3/xhr/GetMoJO.php?_id="+window.BMP.BIC.siteVars.answerSpaceId+"&_m="+b})
})},setPendingItem:function(a,c,e){return e._uuid=d.v4(),e._submittedTime=b.now(),e._submittedTimezoneOffset=(new Date).getTimezoneOffset(),e._submittedTimezoneOffset/=-60,b.post("/_R_/common/3/xhr/SaveFormRecord.php?_asid="+window.BMP.BIC.siteVars.answerSpaceId+"&_fn="+a+"&_action="+c,e)
},getLoginStatus:function(){return b.ajax("/_R_/common/3/xhr/GetLogin.php")},getFormList:function(c){return new a(function(a,d){cordova.offline.retrieveContent(function(c){a(b.parseXML(c))
},d,{url:"/_R_/common/3/xhr/GetFormList.php?_asid="+window.BMP.BIC.siteVars.answerSpaceId+"&_fn="+c})
})},getFormRecord:function(c,d,e){return new a(function(a,f){cordova.offline.retrieveContent(function(c){a(b.parseXML(c))
},f,{url:"/_R_/common/3/xhr/GetFormRecord.php?_asid="+window.BMP.BIC.siteVars.answerSpaceId+"&_fn="+c+"&_tid="+e+"&action="+d})
})}};return e}),n("api-web",["uuid"],function(a){var d={getAnswerSpaceMap:function(a){var c="";
return a&&(c="&_username="+a),b.ajax("/_R_/common/3/xhr/GetConfig.php?_asn="+window.BMP.BIC.siteVars.answerSpace+c)
},getInteractionResult:function(a,d,e){var f="";return d&&"object"==typeof d&&c.each(d,function(a,b){a&&(f+="&"+b+"="+a)
}),b.ajax("/_R_/common/3/xhr/GetAnswer.php?asn="+window.BMP.BIC.siteVars.answerSpace+"&iact="+a+"&ajax=false"+f,e)
},getForm:function(){return b.ajax("/_R_/common/3/xhr/GetForm.php?_v=3&_aid="+window.BMP.BIC.siteVars.answerSpaceId)
},getDataSuitcase:function(a,c){return b.ajax("/_R_/common/3/xhr/GetMoJO.php?_id="+window.BMP.BIC.siteVars.answerSpaceId+"&_m="+a,{dataType:"text"})
},setPendingItem:function(c,d,e){return e._uuid=a.v4(),e._submittedTime=b.now(),e._submittedTimezoneOffset=(new Date).getTimezoneOffset(),e._submittedTimezoneOffset/=-60,b.post("/_R_/common/3/xhr/SaveFormRecord.php?_asid="+window.BMP.BIC.siteVars.answerSpaceId+"&_fn="+c+"&_action="+d,e)
},getLoginStatus:function(){return b.ajax("/_R_/common/3/xhr/GetLogin.php")},getFormList:function(a){return b.ajax("/_R_/common/3/xhr/GetFormList.php?_asid="+window.BMP.BIC.siteVars.answerSpaceId+"&_fn="+a)
},getFormRecord:function(a,c,d){return b.ajax("/_R_/common/3/xhr/GetFormRecord.php?_asid="+window.BMP.BIC.siteVars.answerSpaceId+"&_fn="+a+"&_tid="+d+"&action="+c)
}};return d}),n("model-interaction",["feature!api"],function(e){var f=d.Model.extend({idAttribute:"_id",defaults:{header:null,content:null,contentTime:null,footer:null,name:null},inherit:function(a){if(this.has("parent")){var b,d=m("model-application");
c.each(this.attributes,function(b,d){c.has(a,d)&&a[d]||(a[d]=b)},this),"app"!==this.get("parent")?(b=d.interactions.get(this.get("parent")),b.inherit(a)):c.each(d.attributes,function(b,d){c.has(a,d)&&a[d]||(a[d]=b)
},d)}return a},performXSLT:function(){var a,d,e,f,g,h,i,j,k,l,n,o,p,q,r;if(this.has("args"))for(i=this.get("args"),a=this.get("xsl"),j=a.match(/\$args\[[\w\:][\w\:\-\.]*\]/g),k=j?j.length:0,l=0;k>l;l+=1)n="string"==typeof i[j[l].substring(1)]?i[j[l].substring(1)]:"",n=n.replace('"',""),n=n.replace("'",""),n=decodeURIComponent(n),a=a.replace(j[l],n);
else a=this.get("xsl");p=a.match(/blink-stars\(([@\w.]+),\W*(\w+)\W*\)/),p&&m(["model-application"],function(b){var d;
for(d=function(a){return q="",r=a[1],a=a[2],c.each(b.stars.where({type:a}),function(a){q+=" or "+r+"='"+a.get("_id")+"'"
}),q=q.substr(4)};p;)q=d(p),a=q.length>0?a.replace(/\(?blink-stars\(([@\w.]+),\W*(\w+)\W*\)\)?/,"("+q+")"):a.replace(/\(?blink-stars\(([@\w.]+),\W*(\w+)\W*\)\)?/,"(false())"),p=a.match(/blink-stars\(([@\w.]+),\W*(\w+)\W*\)/)
}),o=this,m(["model-application"],function(c){return d=o.get("starXml")||c.datasuitcases.get(o.get("xml")).get("data"),e=a,"string"!=typeof d||"string"!=typeof e?void o.set("content","XSLT failed due to poorly formed XML or XSL."):(g=b.parseXML(d),a=b.parseXML(e),window.XSLTProcessor?(h=new window.XSLTProcessor,h.importStylesheet(a),f=h.transformToFragment(g,document)):f=void 0!==g.transformNode?g.transformNode(a):window.xsltProcess?window.xsltProcess(g,a):"<p>Your browser does not support Data Suitcase keywords.</p>",void(f&&o.set("content",f)))
})},prepareForView:function(d){var f,g,h,i,j=this,k="";return new a(function(a,l){j.id===window.BMP.BIC.siteVars.answerSpace&&m(["model-application"],function(e){e.has("homeScreen")&&e.get("homeScreen")!==!1&&e.has("homeInteraction")?(f=e.interactions.findWhere({dbid:"i"+e.get("homeInteraction")}),f?(f.set({parent:j.get("parent")}),f.prepareForView(d).then(function(){a(f)
})):l()):(j.set({interactionList:c.map(c.filter(e.interactions.models,function(a){return a.id!==window.BMP.BIC.siteVars.answerSpace&&"hide"!==a.get("display")&&(!a.has("tags")||a.has("tags")&&0===a.get("tags").length||c.filter(a.get("tags"),function(a){return a==="nav-"+window.BMP.BIC.siteVars.answerSpace.toLowerCase()
},this).length>0)},this),function(a){return a.attributes})}),0===j.get("interactionList").length&&e.has("loginAccess")&&e.get("loginAccess")===!0&&e.has("loginPromptInteraction")?(g=e.interactions.findWhere({dbid:"i"+e.get("loginPromptInteraction")}),i=b.mobile.path.parseLocation().pathname,"/"===i.slice(-1)&&(i=i.slice(0,i.length-1)),a(j),b.mobile.changePage(i+"/"+g.id)):a(j))
}),"madl code"===j.get("type")&&e.getInteractionResult(j.id,j.get("args"),d.options).then(function(b){j.save({content:b,contentTime:Date.now()},{success:function(){a(j)
},error:function(){a(j)}})},function(a,b,c){l(c)}),"xslt"===j.get("type")&&0===j.get("xml").indexOf("stars:")&&j.set({mojoType:"stars",xml:j.get("xml").replace(/^stars:/,"")}),"xslt"===j.get("type")&&"stars"===j.get("mojoType")&&m(["model-application"],function(b){c.each(b.stars.where({type:j.get("xml")}),function(a){k+="<"+a.get("type")+' id="'+a.get("_id")+'">',h=c.clone(a.attributes),delete h._id,delete h._rev,delete h.type,delete h.state,c.each(h,function(a,b){k+="<"+b+">"+a+"</"+b+">"
}),k+="</"+a.get("type")+">"}),k="<stars>"+k+"</stars>",j.set({starXml:k}),a(j)}),"madl code"!==j.get("type")&&j.id!==window.BMP.BIC.siteVars.answerSpace&&a(j)
})}});return f}),n("data-pouch",[],function(){var b=function(b){var c;this.name=this.dbAdapter&&b?b:"BlinkMobile",this.getDB=function(){var b=this;
return c?a.resolve(c):new a(function(a,d){var e=new j(b.dbAdapter()+b.name,function(b){b?d(b):(c=e,a(c))
})})}};return c.extend(b.prototype,{dbAdapter:function(){var a=!1;return window.BMP.BIC.isBlinkGap===!0&&j.adapters.websql?a="websql://":j.adapters.idb&&(a="idb://"),a
},create:function(b){var c=this;return new a(function(a,d){c.getDB().then(function(e){e.post(b.toJSON(),function(b,e){b?d(b):c.read(e).then(function(b){a(b)
})})})})},update:function(b){var c=this;return new a(function(a,d){c.getDB().then(function(e){e.put(b.toJSON(),function(e){e?d(e):c.read(b).then(function(b){a(b)
})})})})},read:function(b){var c=this;return new a(function(a,d){c.getDB().then(function(c){c.get(b.id,function(b,c){b?d(b):a(c)
})})})},readAll:function(){var b=this;return new a(function(a,d){b.getDB().then(function(b){b.allDocs({include_docs:!0},function(b,e){b?d(b):a(c.map(e.rows,function(a){return a.doc
}))})})})},"delete":function(b){var c=this;return new a(function(a,d){c.getDB().then(function(c){c.get(b.id,function(b,e){b?d(b):c.remove(e,function(b,c){b?d(b):a(c)
})})})})},deleteAll:function(){var b;return b=this,new a(function(a,c){j.destroy(b.dbAdapter()+b.name,function(b){b?c(b):a()
})})}}),b}),n("data-inMemory",[],function(){var b=function(){this.data={}};return c.extend(b.prototype,{create:function(){return a.reject("Persistent storage not available")
},update:function(){return a.reject("Persistent storage not available")},read:function(){return a.reject("Persistent storage not available")
},readAll:function(){return a.reject("Persistent storage not available")},"delete":function(){return a.reject("Persistent storage not available")
}}),b}),n("collection-interactions",["model-interaction","feature!data"],function(b,e){var f=d.Collection.extend({model:b,datastore:function(){return this.data=new e(window.BMP.BIC.siteVars.answerSpace+"-Interaction"),this
},load:function(){var b=this;return new a(function(a,c){b.fetch({success:a,error:c})
})},save:function(){return a.all(c.map(this.models,function(b){return new a(function(a,c){b.save({},{success:a,error:c})
})}))},comparator:"order"});return f}),n("model-datasuitcase",["feature!api"],function(b){var c=d.Model.extend({idAttribute:"_id",populate:function(){var c=this,d=0;
return this.has("contentTime")&&(d=this.get("contentTime")),new a(function(a,e){b.getDataSuitcase(c.id,d).then(function(b){c.save({data:b,contentTime:Date.now()},{success:a,error:e})
})})}});return c}),n("collection-datasuitcases",["model-datasuitcase","feature!data"],function(b,e){var f=d.Collection.extend({model:b,datastore:function(){return this.data=new e(window.BMP.BIC.siteVars.answerSpace+"-DataSuitcase"),this
},load:function(){var b=this;return new a(function(a,c){b.fetch({success:a,error:c})
})},save:function(){return a.all(c.map(this.models,function(b){return new a(function(a,c){b.save({},{success:a,error:c})
})}))}});return f}),n("model-form",["feature!api"],function(a){var b=d.Model.extend({idAttribute:"_id",populate:function(){var b=this;
a.getForm(this.id).then(function(a){b.save({definition:a.definition,contentTime:Date.now()})
})}});return b}),n("collection-forms",["model-form","feature!data","feature!api"],function(b,e,g){var h=d.Collection.extend({model:b,initialize:function(){f||(window.BlinkForms={}),f.getDefinition=function(b,c){return new a(function(a,d){m(["model-application"],function(e){var g=e.forms.get(b);
if(!g)return d(new Error('unable to locate "'+b+'" definition'));try{a(f.flattenDefinition(g.attributes,c))
}catch(h){d(h)}})})}},datastore:function(){return this.data=new e(window.BMP.BIC.siteVars.answerSpace+"-Form"),this
},load:function(){var b=this;return new a(function(a,c){b.fetch({success:a,error:c})
})},download:function(){var b=this;return navigator.onLine||window.BMP.BIC.isBlinkGap?void g.getForm().then(function(a){c.each(a,function(a){var c=JSON.parse(a),d=b.findWhere({_id:c["default"].name});
d?d.set(c).save():(c._id=c["default"].name,b.create(c))})}):a.resolve()}});return h
}),n("model-pending",[],function(){var a=d.Model.extend({idAttribute:"_id"});return a
}),n("collection-pending",["model-pending","feature!data","feature!api"],function(b,e,f){var g=d.Collection.extend({model:b,datastore:function(){return this.data=new e(window.BMP.BIC.siteVars.answerSpace+"-Pending"),this
},load:function(){var b=this;return new a(function(a,c){b.fetch({success:a,error:c})
})},processQueue:function(){var b,d;return b=[],d=function(a,b){return function(c,d,e){if(c&&200===e.status)a.save({status:"Submitted",result:c});
else if("error"===d&&c.responseText){var f=JSON.parse(c.responseText);a.save({status:"Failed Validation",errors:f})
}a.trigger("processed"),b()}},c.each(this.where({status:"Pending"}),function(c){b.push(new a(function(a,b){f.setPendingItem(c.get("name"),c.get("action"),c.get("data")).then(d(c,a),d(c,b))
}))},this),a.all(b)}});return g}),n("model-star",[],function(){var a=d.Model.extend({idAttribute:"_id",initialize:function(){this.on("add",function(){this.save()
},this)},toggle:function(){var a=this;a.get("state")?this.set("state",!1):this.set("state",!0),m(["model-application"],function(b){a.get("state")?b.stars.add(a):a.destroy()
})}});return a}),n("collection-stars",["model-star","feature!data"],function(b,e){var f=d.Collection.extend({model:b,datastore:function(){return this.data=new e(window.BMP.BIC.siteVars.answerSpace+"-Star"),this
},load:function(){var b=this;return new a(function(a,c){b.fetch({success:a,error:c})
})},clear:function(a){c.each(this.where({type:a}),function(a){a.destroy()})}});return f
}),/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
n("domReady",[],function(){function a(a){var b;for(b=0;b<a.length;b+=1)a[b](j)}function b(){var b=k;
i&&b.length&&(k=[],a(b))}function c(){i||(i=!0,g&&clearInterval(g),b())}function d(a){return i?a(j):k.push(a),d
}var e,f,g,h="undefined"!=typeof window&&window.document,i=!h,j=h?document:null,k=[];
if(h){if(document.addEventListener)document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1);
else if(window.attachEvent){window.attachEvent("onload",c),f=document.createElement("div");
try{e=null===window.frameElement}catch(l){}f.doScroll&&e&&window.external&&(g=setInterval(function(){try{f.doScroll(),c()
}catch(a){}},30))}"complete"===document.readyState&&c()}return d.version="2.0.1",d.load=function(a,b,c,e){e.isBuild?c(null):d(c)
},d}),n("model-form-record",["feature!api"],function(a){var b=d.Model.extend({idAttribute:"_id",populate:function(b,d){var e=this;
a.getFormRecord(e.get("formName"),b,e.get("id")).then(function(a){var b,f,g;g={},b=a.evaluate("//"+e.get("formName"),a),f=b.iterateNext(),c.each(f.children,function(a){g[a.nodeName]=a.innerHTML
}),e.set({record:g,contentTime:Date.now()}),e.save({},{success:d,error:d})})}});return b
}),n("collection-form-records",["model-form-record","feature!data","feature!api"],function(b,e,f){var g=d.Collection.extend({model:b,datastore:function(){return this.data=new e(window.BMP.BIC.siteVars.answerSpace+"-FormRecord"),this
},load:function(){var b=this;return new a(function(a,c){b.fetch({success:a,error:c})
})},pull:function(b){var d=this;return new a(function(a,e){f.getFormList(b).then(function(e){var f,g,h,i;
for(f=e.evaluate("//"+b,e),g=f.iterateNext(),i=function(a){"id"===a.nodeName?h.id=a.innerHTML:h.list[a.nodeName]=a.innerHTML
};g;)h={},h.formName=b,h.list={},c.each(g.children,i),h._id=b+"-"+h.id,d.add(h,{merge:!0}),g=f.iterateNext();
a()},function(){e()})})}});return g}),n("model-application",["collection-interactions","collection-datasuitcases","collection-forms","collection-pending","feature!data","feature!api","collection-stars","domReady","collection-form-records"],function(e,f,g,i,j,l,m,n,o){var p=d.Model.extend({idAttribute:"_id",defaults:{_id:window.BMP.BIC.siteVars.answerSpace,loginStatus:!1},datastore:function(){return this.data=new j(window.BMP.BIC.siteVars.answerSpace+"-AnswerSpace"),this
},collections:function(){var b=this;return this.collections._promise?this.collections._promise:(this.collections._promise=new a(function(c,d){k(function(){return!!b.data
},null,function(){b.interactions=b.interactions||new e,b.datasuitcases=b.datasuitcases||new f,b.forms=b.forms||new g,b.pending=b.pending||new i,b.stars=b.stars||new m,b.formRecords=b.formRecords||new o,a.all([b.interactions.datastore().load(),b.datasuitcases.datastore().load(),b.forms.datastore().load(),b.pending.datastore().load(),b.stars.datastore().load(),b.formRecords.datastore().load()]).then(c,d)
})}),this.collections._promise)},setup:function(){var b=this;return new a(function(a,c){b.fetch({success:a,error:c})
})},populate:function(){var b=this;return navigator.onLine||h.BlinkGap.isHere()?b.collections().then(null,function(){return null
}).then(function(){return a.resolve(l.getAnswerSpaceMap())}).then(function(d){return a.all(c.compact(c.map(d,function(c,d){var e;
return"c"===d.substr(0,1)||"i"===d.substr(0,1)?(e=c.pertinent,e._id=e.name.toLowerCase(),e.dbid=d,b.interactions.add(e,{merge:!0}),e._id):"a"===d.substr(0,1)?new a(function(a,f){e={_id:window.BMP.BIC.siteVars.answerSpace.toLowerCase(),dbid:d},b.interactions.add(e,{merge:!0}),b.save(c.pertinent,{success:function(){a(window.BMP.BIC.siteVars.answerSpace.toLowerCase())
},error:f})}):void 0})))}).then(function(d){return a.all(c.map(c.reject(b.interactions.models,function(a){return c.contains(d,a.id)
}),function(b){return new a(function(a,c){b.destroy({success:a,error:c})})}))}).then(function(){return a.all(c.map(c.compact(c.uniq(b.interactions.pluck("xml"))),function(c){return new a(function(a){b.datasuitcases.get(c)?b.datasuitcases.get(c).populate().then(a,a):(b.datasuitcases.add({_id:c}),b.datasuitcases.get(c).populate().then(a,a))
})}))}).then(function(){return b.datasuitcases.save()}).then(function(){return b.interactions.save()
}):a.resolve()},whenPopulated:function(){var b=this;return new a(function(a,c){b.collections().then(function(){var d;
b.interactions.length?a():(b.interactions.once("add",function(){clearTimeout(d),a()
}),d=setTimeout(function(){c(new Error("whenPopulated timed out after 20 seconds"))
},2e4))},function(){c(new Error("whenPopulated failed due to collections"))})})},checkLoginStatus:function(){var b=this;
return new a(function(a){l.getLoginStatus().then(function(c){var d=c.status||c;b.get("loginStatus")!==d?b.populate().then(function(){b.set({loginStatus:d}),a()
}):a()})})},initialRender:function(){var a=this;b.mobile.defaultPageTransition=a.get("defaultTransition"),n(function(){b.mobile.changePage(b.mobile.path.parseLocation().href,{changeHash:!1,reloadPage:!0,transition:"fade"}),b(document).one("pageshow",function(){window.BootStatus&&window.BootStatus.notifySuccess&&window.BootStatus.notifySuccess(),b("#temp").remove()
})})}});return window.BMP.BIC3=new p,window.BMP.BIC3.history={length:0},window.onpopstate=function(){window.BMP.BIC3.history.length+=1
},window.BMP.BIC3.version="3.1.22",b.extend(window.BMP.BIC3,window.BMP.BIC),window.BMP.BIC=window.BMP.BIC3,window.BMP.BIC3
}),n("main",["model-application"],function(c){function e(){b.ajaxPrefilter(function(a,b,c){c.setRequestHeader("X-Blink-Config",JSON.stringify(window.BMP.BIC.siteVars))
}),m(["router"])}function f(){window.BMP.BlinkGap.isHere()?window.BMP.BlinkGap.whenReady().then(e,e):e()
}return d.ajaxSync=d.sync,d.dataSync=function(b,c,d){var e,f;switch(e=c.data||c.collection.data,b){case"read":f=void 0!==c.id?e.read(c):e.readAll();
break;case"create":f=e.create(c);break;case"update":f=e.update(c);break;case"patch":f=e.update(c);
break;case"delete":f=e["delete"](c);break;default:f=a.reject(new Error("unknown method"))
}return f.then(function(a){d.success&&d.success(a)},function(a){d.error&&d.error(a)
}),c.trigger("request",c,f,d),f},d.getSyncMethod=function(a){return a.data||a.collection&&a.collection.data?d.dataSync:d.ajaxSync
},d.sync=function(a,b,c){return d.getSyncMethod(b).apply(this,[a,b,c])},f(),c}),/**
 * @license RequireJS text 2.0.12 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
n("text",["module"],function(a){var b,c,d,e,f,g=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],h=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,i=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,j="undefined"!=typeof location&&location.href,k=j&&location.protocol&&location.protocol.replace(/\:/,""),l=j&&location.hostname,n=j&&(location.port||void 0),o={},p=a.config&&a.config()||{};
return b={version:"2.0.12",strip:function(a){if(a){a=a.replace(h,"");var b=a.match(i);
b&&(a=b[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")
},createXhr:p.createXhr||function(){var a,b,c;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;
if("undefined"!=typeof ActiveXObject)for(b=0;3>b;b+=1){c=g[b];try{a=new ActiveXObject(c)
}catch(d){}if(a){g=[c];break}}return a},parseName:function(a){var b,c,d,e=!1,f=a.indexOf("."),g=0===a.indexOf("./")||0===a.indexOf("../");
return-1!==f&&(!g||f>1)?(b=a.substring(0,f),c=a.substring(f+1,a.length)):b=a,d=c||b,f=d.indexOf("!"),-1!==f&&(e="strip"===d.substring(f+1),d=d.substring(0,f),c?c=d:b=d),{moduleName:b,ext:c,strip:e}
},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,c,d,e){var f,g,h,i=b.xdRegExp.exec(a);
return i?(f=i[2],g=i[3],g=g.split(":"),h=g[1],g=g[0],!(f&&f!==c||g&&g.toLowerCase()!==d.toLowerCase()||(h||g)&&h!==e)):!0
},finishLoad:function(a,c,d,e){d=c?b.strip(d):d,p.isBuild&&(o[a]=d),e(d)},load:function(a,c,d,e){if(e&&e.isBuild&&!e.inlineText)return void d();
p.isBuild=e&&e.isBuild;var f=b.parseName(a),g=f.moduleName+(f.ext?"."+f.ext:""),h=c.toUrl(g),i=p.useXhr||b.useXhr;
//!strip part to avoid file system issues.
return 0===h.indexOf("empty:")?void d():void(!j||i(h,k,l,n)?b.get(h,function(c){b.finishLoad(a,f.strip,c,d)
},function(a){d.error&&d.error(a)}):c([g],function(a){b.finishLoad(f.moduleName+"."+f.ext,f.strip,a,d)
}))},write:function(a,c,d){if(o.hasOwnProperty(c)){var e=b.jsEscape(o[c]);d.asModule(a+"!"+c,"define(function () { return '"+e+"';});\n")
}},writeFile:function(a,c,d,e,f){var g=b.parseName(c),h=g.ext?"."+g.ext:"",i=g.moduleName+h,j=d.toUrl(g.moduleName+h)+".js";
b.load(i,d,function(){var c=function(a){return e(j,a)};c.asModule=function(a,b){return e.asModule(a,j,b)
},b.write(a,i,c,f)},f)}},"node"===p.env||!p.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(c=m.nodeRequire("fs"),b.get=function(a,b,d){try{var e=c.readFileSync(a,"utf8");
0===e.indexOf("\ufeff")&&(e=e.substring(1)),b(e)}catch(f){d&&d(f)}}):"xhr"===p.env||!p.env&&b.createXhr()?b.get=function(a,c,d,e){var f,g=b.createXhr();
if(g.open("GET",a,!0),e)for(f in e)e.hasOwnProperty(f)&&g.setRequestHeader(f.toLowerCase(),e[f]);
p.onXhr&&p.onXhr(g,a),g.onreadystatechange=function(){var b,e;4===g.readyState&&(b=g.status||0,b>399&&600>b?(e=new Error(a+" HTTP status: "+b),e.xhr=g,d&&d(e)):c(g.responseText),p.onXhrComplete&&p.onXhrComplete(g,a))
},g.send(null)}:"rhino"===p.env||!p.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?b.get=function(a,b){var c,d,e="utf-8",f=new java.io.File(a),g=java.lang.System.getProperty("line.separator"),h=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f),e)),i="";
try{for(c=new java.lang.StringBuffer,d=h.readLine(),d&&d.length()&&65279===d.charAt(0)&&(d=d.substring(1)),null!==d&&c.append(d);null!==(d=h.readLine());)c.append(g),c.append(d);
i=String(c.toString())}finally{h.close()}b(i)}:("xpconnect"===p.env||!p.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(d=Components.classes,e=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),f="@mozilla.org/windows-registry-key;1"in d,b.get=function(a,b){var c,g,h,i={};
f&&(a=a.replace(/\//g,"\\")),h=new FileUtils.File(a);try{c=d["@mozilla.org/network/file-input-stream;1"].createInstance(e.nsIFileInputStream),c.init(h,1,0,!1),g=d["@mozilla.org/intl/converter-input-stream;1"].createInstance(e.nsIConverterInputStream),g.init(c,"utf-8",c.available(),e.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),g.readString(c.available(),i),g.close(),c.close(),b(i.value)
}catch(j){throw new Error((h&&h.path||"")+": "+j)}}),b}),n("text!template-interaction.mustache",[],function(){return'{{{header}}}\n<div data-role="content">\n  <style>\n  .ui-controlgroup-controls {\n    width: 100%;\n  }\n  </style>\n  {{{content}}}\n</div>\n{{{footer}}}\n'
}),n("text!template-inputPrompt.mustache",[],function(){return'<form method="get">\n    {{{inputs}}}\n    <button type="submit" data-theme="a">Go</button>\n</form>\n'
}),n("text!template-form-controls.mustache",[],function(){return'{{#pages}}\n<div id="FormPageCount" data-role="controlgroup" data-type="horizontal">\n  <a id="previousFormPage" data-role="button" data-icon="back" {{^previous}}class="ui-disable"{{/previous}} style="width: 32%" data-iconpos="left">&nbsp;</a>\n  <a data-role="button" style="width: 33%"><span id="currentPage">{{current}}</span> of <span id="totalPages">{{total}}</span></a>\n  <a id="nextFormPage" data-role="button" data-icon="forward" {{^next}}class="ui-disable"{{/next}} style="width: 32%" data-iconpos="right">&nbsp;</a>\n</div>\n{{/pages}}\n\n<div id="FormControls" data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n    <a id="close" data-role="button" data-icon="delete" data-iconpos="top" style="width: 49%;">Close</a>\n    <a id="submit" data-role="button" data-icon="check" data-iconpos="top" style="width: 49%;">Submit</a>\n</div>\n\n<div id="closePopup" data-role="popup" data-dismissible="false" data-overlay-theme="a" data-theme="c">\n  <div data-role="header">\n    <h1>Close</h1>\n  </div>\n  <div data-role="content">\n    <h3>Are you sure you want to close this form?</h3>\n    <div data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n      <a href="#" id="save" data-role="button" data-rel="save" style="width: 49%;">Save</a>\n      <a href="#" id="discard" data-role="button" data-rel="delete" style="width: 49%;">Discard</a>\n    </div>\n    <a data-role="button" data-rel="back">Cancel</a>\n  </div>\n</div>\n'
}),n("view-form-controls",["text!template-form-controls.mustache","model-application"],function(a,c){var g=d.View.extend({events:{"click #FormControls #submit":"formSubmit","click #FormControls #close":"formClose","click #nextFormPage":"nextFormPage","click #previousFormPage":"previousFormPage"},render:function(){var c,d;
return c=this,d={},f.current.get("pages").length>1&&(d.pages={current:f.current.get("pages").current.index()+1,total:f.current.get("pages").length},0!==f.current.get("pages").current.index()&&(d.pages.previous=!0),f.current.get("pages").current.index()!==f.current.get("pages").length-1&&(d.pages.next=!0)),c.$el.html(e.render(a,d)),b.mobile.activePage.trigger("pagecreate"),c
},nextFormPage:function(){var a,b;a=this,b=f.current.get("pages").current.index(),b<f.current.get("pages").length-1&&f.current.get("pages").goto(b+1),a.render()
},previousFormPage:function(){var a,b;a=this,b=f.current.get("pages").current.index(),b>0&&f.current.get("pages").goto(b-1),a.render()
},formSubmit:function(){this.addToQueue("Pending")},formClose:function(){var a=this;
b("#closePopup").popup({afteropen:function(c){b(c.target).on("click","#save",{view:a},a.formSave),b(c.target).on("click","#discard",{view:a},a.formDiscard)
},afterclose:function(a){b(a.target).off("click","#save"),b(a.target).off("click","#discard")
}}),b("#closePopup").popup("open")},formSave:function(a){a.data.view.addToQueue("Draft"),b("#closePopup").one("popupafterclose",function(){history.back()
}),b("#closePopup").popup("close")},formDiscard:function(){b("#closePopup").one("popupafterclose",function(){history.back()
}),b("#closePopup").popup("close")},addToQueue:function(a){var d,e;d=this,f.current.data().then(function(f){f._action=d.model.get("blinkFormAction");
var g={type:"Form",status:a,name:d.model.get("blinkFormObjectName"),label:d.model.get("displayName"),action:d.model.get("blinkFormAction"),answerspaceid:c.get("dbid"),data:f};
d.model.get("args")["args[pid]"]?(e=c.pending.get(d.model.get("args")["args[pid]"]),e.save(g)):e=c.pending.create(g),b(window).one("pagechange",function(){navigator.onLine&&"Draft"!==e.get("status")?(e.once("processed",function(){"Submitted"===e.get("status")?(c.view.popup(e.get("result")),e.destroy()):c.view.pendingQueue()
}),c.pending.processQueue()):c.view.pendingQueue()}),0===window.BMP.BIC3.history.length?window.BMP.BIC3.view.home():history.back()
})}});return g}),n("view-form-action",["model-application","view-form-controls"],function(a,b){var c=d.View.extend({id:"ActiveFormContainer",render:function(){var c,d=this;
return f.getDefinition(d.model.get("blinkFormObjectName"),d.model.get("blinkFormAction")).then(function(e){if(f.initialize(e,d.model.get("blinkFormAction")),d.$el.append(f.current.$form),c=new b({model:d.model}),c.render(),d.$el.append(c.$el),d.model.get("args")["args[id]"]){var g;
g=a.formRecords.get(d.model.get("blinkFormObjectName")+"-"+d.model.get("args")["args[id]"]),g.populate(d.model.get("blinkFormAction"),function(){f.current.setRecord(g.get("record")),d.trigger("render")
})}else d.model.get("args")["args[pid]"]?(f.current.setRecord(a.pending.get(d.model.get("args")["args[pid]"]).get("data")),f.current.getErrors&&f.current.getErrors(),d.trigger("render")):d.trigger("render")
}).then(null,function(a){window.console.log(a)}),d}});return c}),n("text!template-form-list.mustache",[],function(){return'<table data-role="table" data-mode="columntoggle" class="ui-responsive table-stroke">\n  <thead>\n    <tr>\n      {{#headers}}\n      <th>{{.}}</th>\n      <th>Action</th>\n      {{/headers}}\n    </tr>\n  </thead>\n  <tbody>\n    {{#content}}\n    <tr>\n      {{#contents}}\n      <td>{{{.}}}</td>\n      {{/contents}}\n      <td>\n        {{#interactions.edit}}<a interaction="{{interactions.edit}}" _id="{{id}}">Edit</a>{{/interactions.edit}}\n        {{#interactions.view}}<a interaction="{{interactions.view}}" _id="{{id}}">View</a>{{/interactions.view}}\n        {{#interactions.delete}}<a interaction="{{interactions.delete}}" _id="{{id}}">Delete</a>{{/interactions.delete}}\n      </td>\n    </tr>\n    {{/content}}\n    {{^content}}\n    <tr>\n      <th>No items on the remote server</th>\n    </tr>\n    {{/content}}\n  </tbody>\n</table>\n'
}),n("view-form-list",["text!template-form-list.mustache","model-application"],function(a,b){var g=d.View.extend({render:function(){var d=this;
return b.formRecords.pull(d.model.get("blinkFormObjectName")).then(function(){var g={};
g.headers=[],f.getDefinition(d.model.get("blinkFormObjectName"),d.model.get("blinkFormAction")).then(function(f){var h=[];
c.each(f._elements,function(a){"subForm"!==a.type&&(h.push(a.name),g.headers.push(a.name))
}),g.content=c.map(b.formRecords.models,function(a){var b={};return b.id=a.get("id"),b.contents=[],c.each(a.attributes.list,function(a,d){"id"!==d&&"_id"!==d&&c.contains(h,d)&&b.contents.push(a)
}),b}),g.interactions={},g.interactions.edit=b.interactions.findWhere({blinkFormObjectName:d.model.get("blinkFormObjectName"),blinkFormAction:"edit"}).id,g.interactions.view=b.interactions.findWhere({blinkFormObjectName:d.model.get("blinkFormObjectName"),blinkFormAction:"view"}).id,g.interactions["delete"]=b.interactions.findWhere({blinkFormObjectName:d.model.get("blinkFormObjectName"),blinkFormAction:"delete"}).id,d.$el.html(e.render(a,g)),d.trigger("render")
})},function(){d.$el.html("Cannot contact server"),d.trigger("render")}),d}});return g
}),n("view-form-search",function(){}),n("view-form",["view-form-action","view-form-list","view-form-search"],function(a,c,e){var f=d.View.extend({render:function(){var d,f,g;
return d=this,f=d.model.get("blinkFormAction"),"list"===f?g=new c({model:d.model}):"search"===f?g=new e({model:d.model}):(b("#ActiveFormContainer").length>0&&b("#ActiveFormContainer").attr("id","FormContainer"),g=new a({model:d.model})),d.listenToOnce(g,"render",function(){d.$el.append(g.$el),d.trigger("render")
}),g.render(),d}});return f}),n("text!template-category-list.mustache",[],function(){return'<ul data-role="listview">\n  {{#models}}\n  <li>\n    <a interaction="{{_id}}">\n      {{#displayName}}\n        {{displayName}}\n      {{/displayName}}\n      {{^displayName}}\n        {{_id}}\n      {{/displayName}}\n    </a>\n  </li>\n  {{/models}}\n</ul>\n'
}),n("text!template-pending.mustache",[],function(){return'<div id="pendingPopup" data-role="popup">\n  <div data-role="header">\n    <h1>Pending Queue</h1>\n  </div>\n  <div id="pendingContent" data-role="content">\n    <ul data-role="listview">\n      {{#validationPresent}}<li data-role="list-divider">Failed Validation</li>{{/validationPresent}}\n      {{#validation}}\n      <li>\n        <div>\n          <h2>{{label}}</h2>\n          <div data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n            <a class="clearPendingItem" _pid="{{_id}}" data-role="button" style="width: 49%;">Clear</a>\n            <a interaction="{{editInteraction}}" _pid="{{_id}}" data-role="button" style="width: 49%;">Edit</a>\n          </div>\n        </div>\n      </li>\n      {{/validation}}\n\n      <li data-role="list-divider">Pending</li>\n      {{#pending}}\n      <li>\n        <div>\n          <h2>{{label}}</h2>\n        </div>\n      </li>\n      {{/pending}}\n      {{#pendingPresent}}\n      <li>\n        <a id="submitPendingItems" href="#">Submit All</a>\n      </li>\n      {{/pendingPresent}}\n      {{^pending}}<li>No items pending transmission to server</li>{{/pending}}\n\n      <li data-role="list-divider">Draft</li>\n      {{#draft}}\n      <li>\n        <div>\n          <h2>{{label}}</h2>\n          <div data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n            <a class="clearPendingItem" _pid="{{_id}}" data-role="button" style="width: 49%;">Clear</a>\n            <a interaction="{{editInteraction}}" _pid="{{_id}}" data-role="button" style="width: 49%;">Edit</a>\n          </div>\n        </div>\n      </li>\n      {{/draft}}\n      {{#draftPresent}}\n      <li>\n        <a id="clearPendingItemsConfirmation" href="#">Clear All</a>\n      </li>\n      {{/draftPresent}}\n      {{^draft}}<li>No items saved as draft.</li>{{/draft}}\n    </ul>\n  </div>\n</div>\n'
}),n("view-star",[],function(){var a=d.View.extend({events:{click:"toggle"},initialize:function(){this.listenTo(this.model,"change:state",this.render)
},toggle:function(a){a.preventDefault(),this.model.toggle()},render:function(){this.model.get("state")?(this.$el.addClass("blink-star-on"),this.$el.removeClass("blink-star-off")):(this.$el.addClass("blink-star-off"),this.$el.removeClass("blink-star-on"))
}});return a}),n("text!template-popup.mustache",[],function(){return'<div id="popup" data-role="popup">\n{{{contents}}}\n</div>\n\n'
}),n("text!template-clear-confirmation-popup.mustache",[],function(){return'<div id="clearConfirmationPopup" data-role="popup">\n  <div data-role="header">\n    <h1>Clear All Drafts</h1>\n  </div>\n  <div data-role="content">\n    <h3>Are you sure you want to delete all drafts?</h3>\n    <div data-role="controlgroup" data-type="horizontal" style="width: 100%;">\n      <a href="#" id="clearPendingItems" data-role="button" style="width: 49%;">Delete</a>\n      <a href="#" data-role="button" data-rel="back" style="width: 49%;">Cancel</a>\n    </div>\n  </div>\n</div>\n'
}),n("view-interaction",["text!template-interaction.mustache","text!template-inputPrompt.mustache","view-form","model-application","text!template-category-list.mustache","model-star","text!template-pending.mustache","view-star","text!template-popup.mustache","text!template-clear-confirmation-popup.mustache"],function(f,g,h,i,j,k,l,m,n,o){var p=d.View.extend({initialize:function(){b("body").append(this.$el),window.BMP.BIC3.view=this
},events:{"click [keyword]":"blinklink","click [interaction]":"blinklink","click [category]":"blinklink","click [masterCategory]":"blinklink","click [back]":"back","click [home]":"home","click [login]":"blinklink","click [pending]":"pendingQueue","click #queue":"pendingQueue","click .clearPendingItem":"clearPendingItem","click #submitPendingItems":"submitPendingItems","click #clearPendingItems":"clearPendingItems","click #clearPendingItemsConfirmation":"clearPendingItemsConfirmation",pageremove:"destroy"},attributes:{"data-role":"page"},blinklink:function(a){a.preventDefault();
var c,d,e,f,g,h="",j=!0;for(c="A"!==a.target.tagName?b(a.target).parents("a"):b(a.target),d="",c.attr("keyword")?d=c.attr("keyword"):c.attr("interaction")?d=c.attr("interaction"):c.attr("category")?d=c.attr("category"):c.attr("masterCategory")?d=c.attr("masterCategory"):""===c.attr("home")?d=i.get("siteName"):""===c.attr("login")&&(d=i.get(i.has("loginAccess")&&i.has("loginUseInteractions")&&i.has("loginUseInteractions")&&i.has("loginPromptInteraction")?"loginPromptInteraction":"siteName")),e=0;e<c[0].attributes.length;e+=1)"_"===c[0].attributes[e].name.substr(0,1)&&(j?(j=!1,h="/?args["+c[0].attributes[e].name.substr(1)+"]="+c[0].attributes[e].value):h+="&args["+c[0].attributes[e].name.substr(1)+"]="+c[0].attributes[e].value);
for(f="",g=b.mobile.path.parseLocation().pathname,window.cordova&&window.cordova.offline&&window.cordova.offline.available&&-1!==g.indexOf(window.cordova.offline.filePathPrex)&&(g=g.substr(g.indexOf(window.cordova.offline.filePathPrex)+window.cordova.offline.filePathPrex.length+1),g=g.substr(g.indexOf("/")),g=g.substr(0,g.indexOf("."))),g=g.split("/"),g.shift(),""===g[g.length-1]&&g.pop(),"offlineData"===g[0]&&g[1]===window.initialURLHashed&&(g.pop(),g[0]=window.BMP.BIC.siteVars.answerSpace),e=g.length-1;-1!==e;e-=1)i.interactions.get(g[e].toLowerCase()).get("type")||-1!==f.indexOf(g[e])||-1!==f.indexOf(g[e].toLowerCase())||g[e]===d||g[e]===d.toLowerCase()||(f=""!==f?g[e]+"/"+f:g[e]);
f="/"+f,b.mobile.changePage(f+"/"+d+h)},back:function(a){a.preventDefault(),history.back()
},home:function(){b.mobile.changePage("/"+i.get("siteName"))},render:function(a){var d,k,l,m=this.model.inherit({}),n=this;
return c.has(m,"themeSwatch")&&this.$el.attr("data-theme",m.themeSwatch),this.model.has("inputPrompt")&&!this.model.has("args")?(k=this.model.get("inputPrompt"),d="<form>"===k.substr(0,6)?k:e.render(g,{inputs:k}),this.$el.html(e.render(f,{header:m.header,footer:m.footer,content:d})),this.trigger("render")):n.model.has("type")&&"xslt"===n.model.get("type")?(n.model.once("change:content",function(){"object"==typeof n.model.get("content")?(n.$el.html(e.render(f,{header:m.header,footer:m.footer,content:""})),n.$el.children("[data-role=content]")[0].appendChild(n.model.get("content")),n.processStars(),n.trigger("render")):"string"==typeof n.model.get("content")?(n.$el.html(e.render(f,{header:m.header,footer:m.footer,content:n.model.get("content")})),n.trigger("render")):(n.$el.html(e.render(f,{header:m.header,footer:m.footer,content:"Unknown error rendering XSLT interaction."})),n.trigger("render"))
}),this.model.performXSLT()):this.model.has("type")&&"form"===this.model.get("type")?(b("#ActiveFormContainer").length>0&&b("#ActiveFormContainer").attr("id","FormContainer"),n.$el.html(e.render(f,{header:m.header,footer:m.footer})),l=new h({model:n.model,el:n.$el.children('[data-role="content"]')}),n.listenToOnce(l,"render",function(){n.trigger("render")
}),l.render()):this.model.id.toLowerCase()===window.BMP.BIC.siteVars.answerSpace.toLowerCase()?(n.$el.html(e.render(f,{header:m.header,footer:m.footer,content:e.render(j,{models:n.model.get("interactionList"),path:"/"===a.dataUrl.substr(-1)?a.dataUrl:a.dataUrl+"/"})})),n.trigger("render")):this.model.has("type")?"message"===this.model.get("type")?(this.$el.html(e.render(f,{header:m.header,footer:m.footer,content:m.message})),this.trigger("render")):(this.$el.html(e.render(f,m)),this.model.has("content")&&(this.blinkAnswerMessages(),this.maps(),this.processStars()),this.trigger("render")):(n.$el.html(e.render(f,{header:m.header,footer:m.footer,content:e.render(j,{models:c.map(c.filter(i.interactions.models,function(a){return"hide"!==a.get("display")&&c.filter(a.get("tags"),function(a){return a==="nav-"+this.model.id.toLowerCase()
},this).length>0},n),function(a){return a.attributes}),path:"/"===a.dataUrl.substr(-1)?a.dataUrl:a.dataUrl+"/"})})),n.trigger("render")),this
},maps:function(){var a,c=this.$el.find("[class=googlemap]");0!==c.length&&(window.BMP.BIC3.MapCallback=void 0!==c.attr("data-marker-title")?this.addressMap:void 0!==c.attr("data-kml")?this.kmlMap:void 0!==c.attr("data-map-action")?this.directionsMap:this.basicMap,void 0===window.google?(a=document.createElement("script"),a.type="text/javascript",a.src="https://maps.googleapis.com/maps/api/js?v=3&sensor=true&callback=window.BMP.BIC3.MapCallback",b("body").append(a)):window.BMP.BIC3.MapCallback())
},blinkAnswerMessages:function(a){if(a)a=JSON.parse(a),"string"==typeof a.mojotarget&&("string"==typeof a.mojoxml?i.datasuitcases.create({_id:a.mojotarget,data:a.mojoxml}):void 0!==a.mojodelete&&i.datasuitcases.remove(a.mojotarget)),a.startype&&(a.clearstars&&i.stars.clear(a.startype),"array"===b.type(a.staroff)&&c.each(a.staroff,function(a){i.stars.get(a)&&i.stars.get(a.toString()).destroy()
},this),"array"===b.type(a.staron)&&c.each(a.staron,function(b){i.stars.create({_id:b.toString(),type:a.startype,state:!0})
}));else{var d=this.model.get("content").match(/<!-- blinkAnswerMessage:\{.*\} -->/g);
"array"===b.type(d)&&c.each(d,function(a){this.blinkAnswerMessages(a.substring(24,a.length-4))
},this)}},pendingQueue:function(){var a=function(a){return c.map(i.pending.where({status:a}),function(a){var b=c.clone(a.attributes);
return b._id||(b._id=a.cid),b.editInteraction=i.interactions.where({blinkFormObjectName:a.get("name"),blinkFormAction:a.get("action")}),b.editInteraction=b.editInteraction&&b.editInteraction.length>0?b.editInteraction[0].id:null,b.label||(b.label=b.name),b
})};this.$el.append(e.render(l,{pending:a("Pending"),pendingPresent:a("Pending").length>0,draft:a("Draft"),draftPresent:a("Draft").length>0,validation:a("Failed Validation"),validationPresent:a("Failed Validation").length>0})),this.$el.trigger("pagecreate"),b("#pendingPopup").one("popupafterclose",function(){b("#pendingPopup").remove()
}),b("#pendingPopup").popup("open")},clearPendingItem:function(a){var c,d=b("#pendingPopup");
c="A"!==a.target.tagName?b(a.target).parents("a"):b(a.target),i.pending.get(c[0].attributes._pid.value).destroy(),d.popup("close")
},submitPendingItems:function(){var a=b("#pendingPopup");b.mobile.loading("show"),i.pending.processQueue().then(null,function(){return null
}).then(function(){a.one("popupafterclose",function(){b.mobile.loading("hide")}),a.popup("close")
})},clearPendingItems:function(){var a,c,d=b("#clearConfirmationPopup");for(a=i.pending.where({status:"Draft"}),c=0;c<a.length;c+=1)a[c].destroy();
d.one("popupafterclose",function(){d.remove()}),d.popup("close")},clearPendingItemsConfirmation:function(){var a=b("#pendingPopup");
a.one("popupafterclose",function(){b("#clearConfirmationPopup").popup({afterclose:function(){b("#clearConfirmationPopup").remove()
}}),setInterval(function(){b("#clearConfirmationPopup").popup("open")},100)}),this.$el.append(e.render(o,{})),this.$el.trigger("pagecreate"),a.popup("close")
},popup:function(a){this.$el.append(e.render(n,{contents:a})),this.$el.trigger("pagecreate"),b("#popup").popup("open")
},destroy:function(){this.remove()},processStars:function(){var a=this.$el.find(".blink-starrable");
a&&a.each(function(a,c){var d,e,f=i.stars.get(b(c).data("id"));f||(d=b(c).data(),d._id=d.id.toString(),delete d.id,d.state=!1,f=new k(d)),e=new m({model:f,el:c}),e.render()
})},basicMap:function(){var a,c,d=window.BMP.BIC3.view.$el.find("[class=googlemap]");
a={center:new google.maps.LatLng(d.attr("data-latitude"),d.attr("data-longitude")),zoom:parseInt(d.attr("data-zoom"),10),mapTypeId:google.maps.MapTypeId[d.attr("data-type").toUpperCase()]},c=new google.maps.Map(b("[class='googlemap']")[0],a),b(document).bind("pageshow",function(){google.maps.event.trigger(c,"resize"),c.setCenter(new google.maps.LatLng(d.attr("data-latitude"),d.attr("data-longitude")))
})},addressMap:function(){var a,c,d,e=window.BMP.BIC3.view.$el.find("[class=googlemap]");
a=new google.maps.Geocoder,c={address:e.attr("data-marker-title")},a.geocode(c,function(a){c={center:a[0].geometry.location,zoom:parseInt(e.attr("data-zoom"),10),mapTypeId:google.maps.MapTypeId[e.attr("data-type").toUpperCase()]},d=new google.maps.Map(b("[class='googlemap']")[0],c),b(document).bind("pageshow",function(){google.maps.event.trigger(d,"resize"),d.setCenter(a[0].geometry.location)
})})},kmlMap:function(){var a,c,d,e=window.BMP.BIC3.view.$el.find("[class=googlemap]");
a={center:new google.maps.LatLng(e.attr("data-latitude"),e.attr("data-longitude")),zoom:parseInt(e.attr("data-zoom"),10),mapTypeId:google.maps.MapTypeId[e.attr("data-type").toUpperCase()]},c=new google.maps.Map(b("[class='googlemap']")[0],a),d=new google.maps.KmlLayer(e.attr("data-kml"),{preserveViewport:!0}),d.setMap(c),b(document).bind("pageshow",function(){google.maps.event.trigger(c,"resize"),c.setCenter(new google.maps.LatLng(e.attr("data-latitude"),e.attr("data-longitude")))
})},directionsMap:function(){var c,d,e,f,g,h,i,j,k,l;l=window.BMP.BIC3.view.$el.find("[class=googlemap]"),k=function(c){var d={enableHighAccuracy:!0,maximumAge:3e5,timeout:5e3};
return c=b.extend({},d,b.isPlainObject(c)?c:{}),new a(function(a,d){navigator.geolocation.getCurrentPosition(function(c){var e=c.coords;
"object"===b.type(e)?a(e):d("GeoLocation error: blank location from browser / device")
},function(a){var b;switch(a.code){case a.PERMISSION_DENIED:b="user has not granted permission";
break;case a.PERMISSION_DENIED_TIMEOUT:b="user did not grant permission in time";
break;case a.POSITION_UNAVAILABLE:b="unable to determine position";break;default:b="unknown error"
}d("GeoLocation error: "+b)},c)})},e=new google.maps.DirectionsRenderer,f=new google.maps.DirectionsService,c={center:new google.maps.LatLng(-33.873658,151.206915),zoom:10,mapTypeId:google.maps.MapTypeId[l.attr("data-type").toUpperCase()]},d=new google.maps.Map(b("[class='googlemap']")[0],c),e.setPanel(b("[class='googledirections']")[0]),b(document).bind("pageshow",function(){google.maps.event.trigger(d,"resize"),e.setMap(d)
}),void 0===l.attr("data-destination-address")||void 0===l.attr("data-origin-address")?(i=k(),i.then(function(a){void 0===l.attr("data-origin-address")?(g=new google.maps.LatLng(a.latitude,a.longitude),h=l.attr("data-destination-address")):void 0===l.attr("data-destination-address")&&(g=l.attr("data-origin-address"),h=new google.maps.LatLng(a.latitude,a.longitude)),j={origin:g,destination:h,travelMode:google.maps.TravelMode[l.attr("data-travelmode").toUpperCase()]},f.route(j,function(a,b){b===google.maps.DirectionsStatus.OK&&e.setDirections(a)
})})):(j={origin:l.attr("data-origin-address"),destination:l.attr("data-destination-address"),travelMode:google.maps.TravelMode[l.attr("data-travelmode").toUpperCase()]},f.route(j,function(a,b){b===google.maps.DirectionsStatus.OK&&e.setDirections(a)
}))}});return p}),n("router",["model-application","view-interaction"],function(e,f){var g=d.Router.extend({initialize:function(){h.FileInput.initialize(),e.router=this,b(document).on("pagebeforeload",function(a,c){a.preventDefault(),window.BMP.BIC3.history.length+=1,b.mobile.loading("show"),e.router.routeRequest(c)
}),a.resolve(e.datastore()).then(function(){return e.collections()}).then(function(){return e.setup()
}).then(null,function(){}).then(function(){return e.populate()}).then(null,function(){}).then(function(){return e.forms.download()
}).then(null,function(){}).then(function(){return e.initialRender()}).then(null,function(a){throw a
})},routeRequest:function(a){var c,d=b.mobile.path.parseUrl(a.absUrl);h.BlinkGap.isOfflineReady()&&-1!==d.hrefNoSearch.indexOf(window.cordova.offline.filePathPrex)&&(d.hrefNoSearch=d.hrefNoSearch.substr(d.hrefNoSearch.indexOf(window.cordova.offline.filePathPrex)+window.cordova.offline.filePathPrex.length+1),d.hrefNoSearch=d.hrefNoSearch.substr(d.hrefNoSearch.indexOf("/")),d.hrefNoSearch=d.hrefNoSearch.substr(0,d.hrefNoSearch.indexOf("."))),e.whenPopulated().then(null,function(){return null
}).then(function(){c=e.router.inheritanceChain(d.pathname),e.currentInteraction=c,e.router.parseArgs(d.search.substr(1),c),c.prepareForView(a).then(function(c){new f({tagName:"div",model:c}).once("render",function(){this.$el.attr("data-url",a.dataUrl),this.$el.attr("data-external-page",!0),this.$el.one("pagecreate",b.mobile._bindPageRemove),a.deferred.resolve(a.absUrl,a.options,this.$el)
}).render(a)},function(){a.deferred.reject(a.absUrl,a.options),b.mobile.showPageLoadingMsg(b.mobile.pageLoadErrorMessageTheme,b.mobile.pageLoadErrorMessage,!0),setTimeout(b.mobile.hidePageLoadingMsg,1500)
})})},inheritanceChain:function(a){var b,d,f,g;return b=a.substr(1).toLowerCase().split("/").reverse(),f=b[b.length-1],g=[],""===b[0]&&b.shift(),b[0]===window.initialURLHashed&&"offlinedata"===b[b.length-1]&&(b[0]=window.BMP.BIC.siteVars.answerSpace,b.pop()),c.each(b,function(a,h){if(!c.find(g,function(b){return b===a
})){if(d=e.interactions.get(a)||e.interactions.where({dbid:"i"+a})[0]||null,!f||!d)throw"Invalid Model Name";
h!==b.length-1?(d.set({parent:f}),f=d.id):(d.set({parent:"app"}),f="app"),g.push(a)
}},this),e.interactions.get(b[0])},parseArgs:function(a,b){var d,e=a.split("&"),f={};
return c.each(e,function(a){d=a.split("="),"args"!==d[0].substr(0,4)&&(d[0]="args["+d[0]+"]"),f[d[0]]=d[1]
}),b.set(f?{args:f}:{args:null}),this}});return new g}),m("main")}),require(["bic"]);

//# sourceMappingURL=bic.min.map
