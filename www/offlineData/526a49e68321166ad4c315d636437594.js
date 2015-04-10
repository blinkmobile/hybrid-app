/*!
 * pickadate.js v3.4.0, 2014/02/15
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */

/*!
 * Date picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/date.htm
 */

/*!
 * Time picker for pickadate.js v3.4.0
 * http://amsul.github.io/pickadate.js/time.htm
 */

//! moment.js
//! version : 2.5.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function(e){typeof define=="function"&&define.amd?define("picker",["jquery"],e):
this.Picker=e(jQuery)})(function(e){function n(i,s,o,u){function d(){return n._.node
("div",n._.node("div",n._.node("div",n._.node("div",p.component.nodes(a.open),l.box
),l.wrap),l.frame),l.holder)}function v(){c.data(s,p).addClass(l.input).val(c.data
("value")?p.get("select",f.format):i.value).on("focus."+a.id+" click."+a.id,y),f.
editable||c.on("keydown."+a.id,function(e){var t=e.keyCode,n=/^(8|46)$/.test(t);if(
t==27)return p.close(),!1;if(t==32||n||!a.open&&p.component.key[t])e.preventDefault
(),e.stopPropagation(),n?p.clear().close():p.open()}),r(i,{haspopup:!0,expanded:!1
,readonly:!1,owns:i.id+"_root"+(p._hidden?" "+p._hidden.id:"")})}function m(){p.$root
.on({focusin:function(e){p.$root.removeClass(l.focused),r(p.$root[0],"selected",!1
),e.stopPropagation()},"mousedown click":function(t){var n=t.target;n!=p.$root.children
()[0]&&(t.stopPropagation(),t.type=="mousedown"&&!e(n).is(":input")&&n.nodeName!="OPTION"&&
(t.preventDefault(),i.focus()))}}).on("click","[data-pick], [data-nav], [data-clear]"
,function(){var t=e(this),r=t.data(),s=t.hasClass(l.navDisabled)||t.hasClass(l.disabled
),o=document.activeElement;o=o&&(o.type||o.href)&&o,(s||o&&!e.contains(p.$root[0]
,o))&&i.focus(),r.nav&&!s?p.set("highlight",p.component.item.highlight,{nav:r.nav
}):n._.isInteger(r.pick)&&!s?p.set("select",r.pick).close(!0):r.clear&&p.clear().
close(!0)}),r(p.$root[0],"hidden",!0)}function g(){var t=[typeof f.hiddenPrefix=="string"?
f.hiddenPrefix:"",typeof f.hiddenSuffix=="string"?f.hiddenSuffix:"_submit"];p._hidden=
e('<input type=hidden name="'+t[0]+i.name+t[1]+'"'+'id="'+t[0]+i.id+t[1]+'"'+(c.data
("value")||i.value?' value="'+p.get("select",f.formatSubmit)+'"':"")+">")[0],c.on
("change."+a.id,function(){p._hidden.value=i.value?p.get("select",f.formatSubmit)
:""}).after(p._hidden)}function y(e){e.stopPropagation(),e.type=="focus"&&(p.$root
.addClass(l.focused),r(p.$root[0],"selected",!0)),p.open()}if(!i)return n;var a={
id:i.id||"P"+Math.abs(~~(Math.random()*new Date))},f=o?e.extend(!0,{},o.defaults,
u):u||{},l=e.extend({},n.klasses(),f.klass),c=e(i),h=function(){return this.start
()},p=h.prototype={constructor:h,$node:c,start:function(){return a&&a.start?p:(a.
methods={},a.start=!0,a.open=!1,a.type=i.type,i.autofocus=i==document.activeElement
,i.type="text",i.readOnly=!f.editable,i.id=i.id||a.id,p.component=new o(p,f),p.$root=
e(n._.node("div",d(),l.picker,'id="'+i.id+'_root"')),m(),f.formatSubmit&&g(),v(),
f.container?e(f.container).append(p.$root):c.after(p.$root),p.on({start:p.component
.onStart,render:p.component.onRender,stop:p.component.onStop,open:p.component.onOpen
,close:p.component.onClose,set:p.component.onSet}).on({start:f.onStart,render:f.onRender
,stop:f.onStop,open:f.onOpen,close:f.onClose,set:f.onSet}),i.autofocus&&p.open(),
p.trigger("start").trigger("render"))},render:function(e){return e?p.$root.html(d
()):p.$root.find("."+l.box).html(p.component.nodes(a.open)),p.trigger("render")},
stop:function(){return a.start?(p.close(),p._hidden&&p._hidden.parentNode.removeChild
(p._hidden),p.$root.remove(),c.removeClass(l.input).removeData(s),setTimeout(function(
){c.off("."+a.id)},0),i.type=a.type,i.readOnly=!1,p.trigger("stop"),a.methods={},
a.start=!1,p):p},open:function(s){return a.open?p:(c.addClass(l.active),r(i,"expanded"
,!0),p.$root.addClass(l.opened),r(p.$root[0],"hidden",!1),s!==!1&&(a.open=!0,c.trigger
("focus"),t.on("click."+a.id+" focusin."+a.id,function(e){var t=e.target;t!=i&&t!=
document&&e.which!=3&&p.close(t===p.$root.children()[0])}).on("keydown."+a.id,function(
t){var r=t.keyCode,s=p.component.key[r],o=t.target;r==27?p.close(!0):o!=i||!s&&r!=13?
e.contains(p.$root[0],o)&&r==13&&(t.preventDefault(),o.click()):(t.preventDefault
(),s?n._.trigger(p.component.key.go,p,[n._.trigger(s)]):p.$root.find("."+l.highlighted
).hasClass(l.disabled)||p.set("select",p.component.item.highlight).close())})),p.
trigger("open"))},close:function(e){return e&&(c.off("focus."+a.id).trigger("focus"
),setTimeout(function(){c.on("focus."+a.id,y)},0)),c.removeClass(l.active),r(i,"expanded"
,!1),p.$root.removeClass(l.opened+" "+l.focused),r(p.$root[0],"hidden",!0),r(p.$root
[0],"selected",!1),a.open?(a.open=!1,t.off("."+a.id),p.trigger("close")):p},clear
:function(){return p.set("clear")},set:function(t,n,r){var i,s,o=e.isPlainObject(
t),u=o?t:{};r=o&&e.isPlainObject(n)?n:r||{};if(t){o||(u[t]=n);for(i in u)s=u[i],i in 
p.component.item&&p.component.set(i,s,r),(i=="select"||i=="clear")&&c.val(i=="clear"?""
:p.get(i,f.format)).trigger("change");p.render()}return r.muted?p:p.trigger("set"
,u)},get:function(e,t){e=e||"value";if(a[e]!=null)return a[e];if(e=="value")return i
.value;if(e in p.component.item)return typeof t=="string"?n._.trigger(p.component
.formats.toString,p.component,[t,p.component.get(e)]):p.component.get(e)},on:function(
t,n){var r,i,s=e.isPlainObject(t),o=s?t:{};if(t){s||(o[t]=n);for(r in o)i=o[r],a.
methods[r]=a.methods[r]||[],a.methods[r].push(i)}return p},off:function(){var e,t
,n=arguments;for(e=0,namesCount=n.length;e<namesCount;e+=1)t=n[e],t in a.methods&&delete 
a.methods[t];return p},trigger:function(e,t){var r=a.methods[e];return r&&r.map(function(
e){n._.trigger(e,p,[t])}),p}};return new h}function r(t,n,r){if(e.isPlainObject(n
))for(var s in n)i(t,s,n[s]);else i(t,n,r)}function i(e,t,n){e.setAttribute((t=="role"?""
:"aria-")+t,n)}function s(t,n){e.isPlainObject(t)||(t={attribute:n}),n="";for(var r in 
t){var i=(r=="role"?"":"aria-")+r,s=t[r];n+=s==null?"":i+'="'+t[r]+'"'}return n}var t=
e(document);return n.klasses=function(e){return e=e||"picker",{picker:e,opened:e+"--opened"
,focused:e+"--focused",input:e+"__input",active:e+"__input--active",holder:e+"__holder"
,frame:e+"__frame",wrap:e+"__wrap",box:e+"__box"}},n._={group:function(e){var t,r=""
,i=n._.trigger(e.min,e);for(;i<=n._.trigger(e.max,e,[i]);i+=e.i)t=n._.trigger(e.item
,e,[i]),r+=n._.node(e.node,t[0],t[1],t[2]);return r},node:function(t,n,r,i){return n?
(n=e.isArray(n)?n.join(""):n,r=r?' class="'+r+'"':"",i=i?" "+i:"","<"+t+r+i+">"+n+"</"+
t+">"):""},lead:function(e){return(e<10?"0":"")+e},trigger:function(e,t,n){return typeof 
e=="function"?e.apply(t,n||[]):e},digits:function(e){return/\d/.test(e[1])?2:1},isDate
:function(e){return{}.toString.call(e).indexOf("Date")>-1&&this.isInteger(e.getDate
())},isInteger:function(e){return{}.toString.call(e).indexOf("Number")>-1&&e%1===0
},ariaAttr:s},n.extend=function(t,r){e.fn[t]=function(i,s){var o=this.data(t);return i=="picker"?
o:o&&typeof i=="string"?(n._.trigger(o[i],o,[s]),this):this.each(function(){var s=
e(this);s.data(t)||new n(this,t,r,i)})},e.fn[t].defaults=r.defaults},n}),function(
e){typeof define=="function"&&define.amd?define("picker.date",["picker","jquery"]
,e):e(Picker,jQuery)}(function(e,t){function s(e,t){var n=this,r=e.$node[0].value
,i=e.$node.data("value"),s=i||r,o=i?t.formatSubmit:t.format,u=function(){return getComputedStyle
(e.$root[0]).direction==="rtl"};n.settings=t,n.$node=e.$node,n.queue={min:"measure create"
,max:"measure create",now:"now create",select:"parse create validate",highlight:"parse navigate create validate"
,view:"parse create validate viewset",disable:"deactivate",enable:"activate"},n.item=
{},n.item.disable=(t.disable||[]).slice(0),n.item.enable=-function(e){return e[0]===!0?
e.shift():-1}(n.item.disable),n.set("min",t.min).set("max",t.max).set("now"),s?n.
set("select",s,{format:o,fromValue:!!r}):n.set("select",null).set("highlight",n.item
.now),n.key={40:7,38:-7,39:function(){return u()?-1:1},37:function(){return u()?1
:-1},go:function(e){var t=n.item.highlight,r=new Date(t.year,t.month,t.date+e);n.
set("highlight",[r.getFullYear(),r.getMonth(),r.getDate()],{interval:e}),this.render
()}},e.on("render",function(){e.$root.find("."+t.klass.selectMonth).on("change",function(
){var n=this.value;n&&(e.set("highlight",[e.get("view").year,n,e.get("highlight")
.date]),e.$root.find("."+t.klass.selectMonth).trigger("focus"))}),e.$root.find("."+
t.klass.selectYear).on("change",function(){var n=this.value;n&&(e.set("highlight"
,[n,e.get("view").month,e.get("highlight").date]),e.$root.find("."+t.klass.selectYear
).trigger("focus"))})}).on("open",function(){e.$root.find("button, select").attr("disabled"
,!1)}).on("close",function(){e.$root.find("button, select").attr("disabled",!0)})
}var n=7,r=6,i=e._;s.prototype.set=function(e,t,n){var r=this,i=r.item;return t===
null?(i[e]=t,r):(i[e=="enable"?"disable":e=="flip"?"enable":e]=r.queue[e].split(" "
).map(function(i){return t=r[i](e,t,n),t}).pop(),e=="select"?r.set("highlight",i.
select,n):e=="highlight"?r.set("view",i.highlight,n):e.match(/^(flip|min|max|disable|enable)$/
)&&(i.select&&r.disabled(i.select)&&r.set("select",i.select,n),i.highlight&&r.disabled
(i.highlight)&&r.set("highlight",i.highlight,n)),r)},s.prototype.get=function(e){
return this.item[e]},s.prototype.create=function(e,n,r){var s,o=this;return n=n===
undefined?e:n,n==-Infinity||n==Infinity?s=n:t.isPlainObject(n)&&i.isInteger(n.pick
)?n=n.obj:t.isArray(n)?(n=new Date(n[0],n[1],n[2]),n=i.isDate(n)?n:o.create().obj
):i.isInteger(n)||i.isDate(n)?n=o.normalize(new Date(n),r):n=o.now(e,n,r),{year:s||
n.getFullYear(),month:s||n.getMonth(),date:s||n.getDate(),day:s||n.getDay(),obj:s||
n,pick:s||n.getTime()}},s.prototype.createRange=function(e,n){var r=this,s=function(
e){return e===!0||t.isArray(e)||i.isDate(e)?r.create(e):e};return i.isInteger(e)||
(e=s(e)),i.isInteger(n)||(n=s(n)),i.isInteger(e)&&t.isPlainObject(n)?e=[n.year,n.
month,n.date+e]:i.isInteger(n)&&t.isPlainObject(e)&&(n=[e.year,e.month,e.date+n])
,{from:s(e),to:s(n)}},s.prototype.withinRange=function(e,t){return e=this.createRange
(e.from,e.to),t.pick>=e.from.pick&&t.pick<=e.to.pick},s.prototype.overlapRanges=function(
e,t){var n=this;return e=n.createRange(e.from,e.to),t=n.createRange(t.from,t.to),
n.withinRange(e,t.from)||n.withinRange(e,t.to)||n.withinRange(t,e.from)||n.withinRange
(t,e.to)},s.prototype.now=function(e,t,n){return t=new Date,n&&n.rel&&t.setDate(t
.getDate()+n.rel),this.normalize(t,n)},s.prototype.navigate=function(e,n,r){var i
,s,o,u,a=t.isArray(n),f=t.isPlainObject(n),l=this.item.view;if(a||f){f?(s=n.year,
o=n.month,u=n.date):(s=+n[0],o=+n[1],u=+n[2]),r&&r.nav&&l&&l.month!==o&&(s=l.year
,o=l.month),i=new Date(s,o+(r&&r.nav?r.nav:0),1),s=i.getFullYear(),o=i.getMonth()
;while((new Date(s,o,u)).getMonth()!==o)u-=1;n=[s,o,u]}return n},s.prototype.normalize=
function(e){return e.setHours(0,0,0,0),e},s.prototype.measure=function(e,t){var n=
this;return t?i.isInteger(t)&&(t=n.now(e,t,{rel:t})):t=e=="min"?-Infinity:Infinity
,t},s.prototype.viewset=function(e,t){return this.create([t.year,t.month,1])},s.prototype
.validate=function(e,n,r){var s=this,o=n,u=r&&r.interval?r.interval:1,a=s.item.enable===-1
,f,l,c=s.item.min,h=s.item.max,p,d,v=a&&s.item.disable.filter(function(e){if(t.isArray
(e)){var r=s.create(e).pick;r<n.pick?f=!0:r>n.pick&&(l=!0)}return i.isInteger(e)}
).length;if(!r||!r.nav)if(!a&&s.disabled(n)||a&&s.disabled(n)&&(v||f||l)||!a&&(n.
pick<=c.pick||n.pick>=h.pick)){a&&!v&&(!l&&u>0||!f&&u<0)&&(u*=-1);while(s.disabled
(n)){Math.abs(u)>1&&(n.month<o.month||n.month>o.month)&&(n=o,u=u>0?1:-1),n.pick<=
c.pick?(p=!0,u=1,n=s.create([c.year,c.month,c.date-1])):n.pick>=h.pick&&(d=!0,u=-1
,n=s.create([h.year,h.month,h.date+1]));if(p&&d)break;n=s.create([n.year,n.month,
n.date+u])}}return n},s.prototype.disabled=function(e){var n=this,r=n.item.disable
.filter(function(r){if(i.isInteger(r))return e.day===(n.settings.firstDay?r:r-1)%7
;if(t.isArray(r)||i.isDate(r))return e.pick===n.create(r).pick;if(t.isPlainObject
(r))return n.withinRange(r,e)});return r=r.length&&!r.filter(function(e){return t
.isArray(e)&&e[3]=="inverted"||t.isPlainObject(e)&&e.inverted}).length,n.item.enable===-1?!
r:r||e.pick<n.item.min.pick||e.pick>n.item.max.pick},s.prototype.parse=function(e
,n,r){var s=this,o={},u;if(!n||i.isInteger(n)||t.isArray(n)||i.isDate(n)||t.isPlainObject
(n)&&i.isInteger(n.pick))return n;if(!r||!r.format)r=r||{},r.format=s.settings.format
;return u=typeof n=="string"&&!r.fromValue?1:0,s.formats.toArray(r.format).map(function(
e){var t=s.formats[e],r=t?i.trigger(t,s,[n,o]):e.replace(/^!/,"").length;t&&(o[e]=
n.substr(0,r)),n=n.substr(r)}),[o.yyyy||o.yy,+(o.mm||o.m)-u,o.dd||o.d]},s.prototype
.formats=function(){function e(e,t,n){var r=e.match(/\w+/)[0];return!n.mm&&!n.m&&
(n.m=t.indexOf(r)),r.length}function t(e){return e.match(/\w+/)[0].length}return{
d:function(e,t){return e?i.digits(e):t.date},dd:function(e,t){return e?2:i.lead(t
.date)},ddd:function(e,n){return e?t(e):this.settings.weekdaysShort[n.day]},dddd:
function(e,n){return e?t(e):this.settings.weekdaysFull[n.day]},m:function(e,t){return e?
i.digits(e):t.month+1},mm:function(e,t){return e?2:i.lead(t.month+1)},mmm:function(
t,n){var r=this.settings.monthsShort;return t?e(t,r,n):r[n.month]},mmmm:function(
t,n){var r=this.settings.monthsFull;return t?e(t,r,n):r[n.month]},yy:function(e,t
){return e?2:(""+t.year).slice(2)},yyyy:function(e,t){return e?4:t.year},toArray:
function(e){return e.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(e,t)
{var n=this;return n.formats.toArray(e).map(function(e){return i.trigger(n.formats
[e],n,[0,t])||e.replace(/^!/,"")}).join("")}}}(),s.prototype.isDateExact=function(
e,n){var r=this;return i.isInteger(e)&&i.isInteger(n)||typeof e=="boolean"&&typeof 
n=="boolean"?e===n:(i.isDate(e)||t.isArray(e))&&(i.isDate(n)||t.isArray(n))?r.create
(e).pick===r.create(n).pick:t.isPlainObject(e)&&t.isPlainObject(n)?r.isDateExact(
e.from,n.from)&&r.isDateExact(e.to,n.to):!1},s.prototype.isDateOverlap=function(e
,n){var r=this;return i.isInteger(e)&&(i.isDate(n)||t.isArray(n))?e===r.create(n)
.day+1:i.isInteger(n)&&(i.isDate(e)||t.isArray(e))?n===r.create(e).day+1:t.isPlainObject
(e)&&t.isPlainObject(n)?r.overlapRanges(e,n):!1},s.prototype.flipEnable=function(
e){var t=this.item;t.enable=e||(t.enable==-1?1:-1)},s.prototype.deactivate=function(
e,n){var r=this,s=r.item.disable.slice(0);return n=="flip"?r.flipEnable():n===!1?
(r.flipEnable(1),s=[]):n===!0?(r.flipEnable(-1),s=[]):n.map(function(e){var n;for(
var o=0;o<s.length;o+=1)if(r.isDateExact(e,s[o])){n=!0;break}n||(i.isInteger(e)||
i.isDate(e)||t.isArray(e)||t.isPlainObject(e)&&e.from&&e.to)&&s.push(e)}),s},s.prototype
.activate=function(e,n){var r=this,s=r.item.disable,o=s.length;return n=="flip"?r
.flipEnable():n===!0?(r.flipEnable(1),s=[]):n===!1?(r.flipEnable(-1),s=[]):n.map(
function(e){var n,u,a,f;for(a=0;a<o;a+=1){u=s[a];if(r.isDateExact(u,e)){n=s[a]=null
,f=!0;break}if(r.isDateOverlap(u,e)){t.isPlainObject(e)?(e.inverted=!0,n=e):t.isArray
(e)?(n=e,n[3]||n.push("inverted")):i.isDate(e)&&(n=[e.getFullYear(),e.getMonth(),
e.getDate(),"inverted"]);break}}if(n)for(a=0;a<o;a+=1)if(r.isDateExact(s[a],e)){s
[a]=null;break}if(f)for(a=0;a<o;a+=1)if(r.isDateOverlap(s[a],e)){s[a]=null;break}
n&&s.push(n)}),s.filter(function(e){return e!=null})},s.prototype.nodes=function(
e){var t=this,s=t.settings,o=t.item,u=o.now,a=o.select,f=o.highlight,l=o.view,c=o
.disable,h=o.min,p=o.max,d=function(e){return s.firstDay&&e.push(e.shift()),i.node
("thead",i.node("tr",i.group({min:0,max:n-1,i:1,node:"th",item:function(t){return[
e[t],s.klass.weekdays]}})))}((s.showWeekdaysFull?s.weekdaysFull:s.weekdaysShort).
slice(0)),v=function(e){return i.node("div"," ",s.klass["nav"+(e?"Next":"Prev")]+
(e&&l.year>=p.year&&l.month>=p.month||!e&&l.year<=h.year&&l.month<=h.month?" "+s.
klass.navDisabled:""),"data-nav="+(e||-1))},m=function(t){return s.selectMonths?i
.node("select",i.group({min:0,max:11,i:1,node:"option",item:function(e){return[t[
e],0,"value="+e+(l.month==e?" selected":"")+(l.year==h.year&&e<h.month||l.year==p
.year&&e>p.month?" disabled":"")]}}),s.klass.selectMonth,e?"":"disabled"):i.node("div"
,t[l.month],s.klass.month)},g=function(){var t=l.year,n=s.selectYears===!0?5:~~(s
.selectYears/2);if(n){var r=h.year,o=p.year,u=t-n,a=t+n;r>u&&(a+=r-u,u=r);if(o<a)
{var f=u-r,c=a-o;u-=f>c?c:f,a=o}return i.node("select",i.group({min:u,max:a,i:1,node
:"option",item:function(e){return[e,0,"value="+e+(t==e?" selected":"")]}}),s.klass
.selectYear,e?"":"disabled")}return i.node("div",t,s.klass.year)};return i.node("div"
,v()+v(1)+m(s.showMonthsShort?s.monthsShort:s.monthsFull)+g(),s.klass.header)+i.node
("table",d+i.node("tbody",i.group({min:0,max:r-1,i:1,node:"tr",item:function(e){var r=
s.firstDay&&t.create([l.year,l.month,1]).day===0?-7:0;return[i.group({min:n*e-l.day+
r+1,max:function(){return this.min+n-1},i:1,node:"td",item:function(e){e=t.create
([l.year,l.month,e+(s.firstDay?1:0)]);var n=a&&a.pick==e.pick,r=f&&f.pick==e.pick
,o=c&&t.disabled(e)||e.pick<h.pick||e.pick>p.pick;return[i.node("div",e.date,function(
t){return t.push(l.month==e.month?s.klass.infocus:s.klass.outfocus),u.pick==e.pick&&
t.push(s.klass.now),n&&t.push(s.klass.selected),r&&t.push(s.klass.highlighted),o&&
t.push(s.klass.disabled),t.join(" ")}([s.klass.day]),"data-pick="+e.pick+" "+i.ariaAttr
({role:"button",controls:t.$node[0].id,checked:n&&t.$node.val()===i.trigger(t.formats
.toString,t,[s.format,e])?!0:null,activedescendant:r?!0:null,disabled:o?!0:null})
)]}})]}})),s.klass.table)+i.node("div",i.node("button",s.today,s.klass.buttonToday
,"type=button data-pick="+u.pick+(e?"":" disabled"))+i.node("button",s.clear,s.klass
.buttonClear,"type=button data-clear=1"+(e?"":" disabled")),s.klass.footer)},s.defaults=
function(e){return{monthsFull:["January","February","March","April","May","June","July"
,"August","September","October","November","December"],monthsShort:["Jan","Feb","Mar"
,"Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday"
,"Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon"
,"Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",format:"d mmmm, yyyy"
,klass:{table:e+"table",header:e+"header",navPrev:e+"nav--prev",navNext:e+"nav--next"
,navDisabled:e+"nav--disabled",month:e+"month",year:e+"year",selectMonth:e+"select--month"
,selectYear:e+"select--year",weekdays:e+"weekday",day:e+"day",disabled:e+"day--disabled"
,selected:e+"day--selected",highlighted:e+"day--highlighted",now:e+"day--today",infocus
:e+"day--infocus",outfocus:e+"day--outfocus",footer:e+"footer",buttonClear:e+"button--clear"
,buttonToday:e+"button--today"}}}(e.klasses().picker+"__"),e.extend("pickadate",s
)}),function(e){typeof define=="function"&&define.amd?define("picker.time",["picker"
,"jquery"],e):e(Picker,jQuery)}(function(e,t){function u(e,t){var n=this,r=e.$node
[0].value,i=e.$node.data("value"),s=i||r,o=i?t.formatSubmit:t.format;n.settings=t
,n.$node=e.$node,n.queue={interval:"i",min:"measure create",max:"measure create",
now:"now create",select:"parse create validate",highlight:"parse create validate"
,view:"parse create validate",disable:"deactivate",enable:"activate"},n.item={},n
.item.interval=t.interval||30,n.item.disable=(t.disable||[]).slice(0),n.item.enable=-
function(e){return e[0]===!0?e.shift():-1}(n.item.disable),n.set("min",t.min).set
("max",t.max).set("now"),s?n.set("select",s,{format:o,fromValue:!!r}):n.set("select"
,null).set("highlight",n.item.now),n.key={40:1,38:-1,39:1,37:-1,go:function(e){n.
set("highlight",n.item.highlight.pick+e*n.item.interval,{interval:e*n.item.interval
}),this.render()}},e.on("render",function(){var n=e.$root.children(),r=n.find("."+
t.klass.viewset);r.length&&(n[0].scrollTop=~~r.position().top-r[0].clientHeight*2
)}).on("open",function(){e.$root.find("button").attr("disable",!1)}).on("close",function(
){e.$root.find("button").attr("disable",!0)})}var n=24,r=60,i=12,s=n*r,o=e._;u.prototype
.set=function(e,t,n){var r=this,i=r.item;return t===null?(i[e]=t,r):(i[e=="enable"?"disable"
:e=="flip"?"enable":e]=r.queue[e].split(" ").map(function(i){return t=r[i](e,t,n)
,t}).pop(),e=="select"?r.set("highlight",i.select,n):e=="highlight"?r.set("view",
i.highlight,n):e=="interval"?r.set("min",i.min,n).set("max",i.max,n):e.match(/^(flip|min|max|disable|enable)$/
)&&(e=="min"&&r.set("max",i.max,n),i.select&&r.disabled(i.select)&&r.set("select"
,i.select,n),i.highlight&&r.disabled(i.highlight)&&r.set("highlight",i.highlight,
n)),r)},u.prototype.get=function(e){return this.item[e]},u.prototype.create=function(
e,i,u){var a=this;return i=i===undefined?e:i,o.isDate(i)&&(i=[i.getHours(),i.getMinutes
()]),t.isPlainObject(i)&&o.isInteger(i.pick)?i=i.pick:t.isArray(i)?i=+i[0]*r+ +i[1
]:o.isInteger(i)||(i=a.now(e,i,u)),e=="max"&&i<a.item.min.pick&&(i+=s),e!="min"&&
e!="max"&&(i-a.item.min.pick)%a.item.interval!==0&&(i+=a.item.interval),i=a.normalize
(e,i,u),{hour:~~(n+i/r)%n,mins:(r+i%r)%r,time:(s+i)%s,pick:i}},u.prototype.createRange=
function(e,n){var r=this,i=function(e){return e===!0||t.isArray(e)||o.isDate(e)?r
.create(e):e};return o.isInteger(e)||(e=i(e)),o.isInteger(n)||(n=i(n)),o.isInteger
(e)&&t.isPlainObject(n)?e=[n.hour,n.mins+e*r.settings.interval]:o.isInteger(n)&&t
.isPlainObject(e)&&(n=[e.hour,e.mins+n*r.settings.interval]),{from:i(e),to:i(n)}}
,u.prototype.withinRange=function(e,t){return e=this.createRange(e.from,e.to),t.pick>=
e.from.pick&&t.pick<=e.to.pick},u.prototype.overlapRanges=function(e,t){var n=this
;return e=n.createRange(e.from,e.to),t=n.createRange(t.from,t.to),n.withinRange(e
,t.from)||n.withinRange(e,t.to)||n.withinRange(t,e.from)||n.withinRange(t,e.to)},
u.prototype.now=function(e,t){var n=this.item.interval,i=new Date,s=i.getHours()*
r+i.getMinutes(),u=o.isInteger(t),a;return s-=s%n,a=t<0&&n*t+s<=-n,s+=e=="min"&&a?0
:n,u&&(s+=n*(a&&e!="max"?t+1:t)),s},u.prototype.normalize=function(e,t){var n=this
.item.interval,r=this.item.min&&this.item.min.pick||0;return t-=e=="min"?0:(t-r)%
n,t},u.prototype.measure=function(e,i,s){var u=this;return i?i===!0||o.isInteger(
i)?i=u.now(e,i,s):t.isPlainObject(i)&&o.isInteger(i.pick)&&(i=u.normalize(e,i.pick
,s)):i=e=="min"?[0,0]:[n-1,r-1],i},u.prototype.validate=function(e,t,n){var r=this
,i=n&&n.interval?n.interval:r.item.interval;return r.disabled(t)&&(t=r.shift(t,i)
),t=r.scope(t),r.disabled(t)&&(t=r.shift(t,i*-1)),t},u.prototype.disabled=function(
e){var n=this,r=n.item.disable.filter(function(r){if(o.isInteger(r))return e.hour==
r;if(t.isArray(r)||o.isDate(r))return e.pick==n.create(r).pick;if(t.isPlainObject
(r))return n.withinRange(r,e)});return r=r.length&&!r.filter(function(e){return t
.isArray(e)&&e[2]=="inverted"||t.isPlainObject(e)&&e.inverted}).length,n.item.enable===-1?!
r:r||e.pick<n.item.min.pick||e.pick>n.item.max.pick},u.prototype.shift=function(e
,t){var n=this,r=n.item.min.pick,i=n.item.max.pick;t=t||n.item.interval;while(n.disabled
(e)){e=n.create(e.pick+=t);if(e.pick<=r||e.pick>=i)break}return e},u.prototype.scope=
function(e){var t=this.item.min.pick,n=this.item.max.pick;return this.create(e.pick>
n?n:e.pick<t?t:e)},u.prototype.parse=function(e,n,i){var s,u,a,f,l,c=this,h={};if(!
n||o.isInteger(n)||t.isArray(n)||o.isDate(n)||t.isPlainObject(n)&&o.isInteger(n.pick
))return n;if(!i||!i.format)i=i||{},i.format=c.settings.format;c.formats.toArray(
i.format).map(function(e){var t,r=c.formats[e],i=r?o.trigger(r,c,[n,h]):e.replace
(/^!/,"").length;r&&(t=n.substr(0,i),h[e]=t.match(/^\d+$/)?+t:t),n=n.substr(i)});
for(f in h){l=h[f];if(o.isInteger(l))if(f.match(/^(h|hh)$/i)){s=l;if(f=="h"||f=="hh"
)s%=12}else f=="i"&&(u=l);else f.match(/^a$/i)&&l.match(/^p/i)&&("h"in h||"hh"in 
h)&&(a=!0)}return(a?s+12:s)*r+u},u.prototype.formats={h:function(e,t){return e?o.
digits(e):t.hour%i||i},hh:function(e,t){return e?2:o.lead(t.hour%i||i)},H:function(
e,t){return e?o.digits(e):""+t.hour%24},HH:function(e,t){return e?o.digits(e):o.lead
(t.hour%24)},i:function(e,t){return e?2:o.lead(t.mins)},a:function(e,t){return e?4
:s/2>t.time%s?"a.m.":"p.m."},A:function(e,t){return e?2:s/2>t.time%s?"AM":"PM"},toArray
:function(e){return e.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)},toString:function(e,t){
var n=this;return n.formats.toArray(e).map(function(e){return o.trigger(n.formats
[e],n,[0,t])||e.replace(/^!/,"")}).join("")}},u.prototype.isTimeExact=function(e,
n){var r=this;return o.isInteger(e)&&o.isInteger(n)||typeof e=="boolean"&&typeof 
n=="boolean"?e===n:(o.isDate(e)||t.isArray(e))&&(o.isDate(n)||t.isArray(n))?r.create
(e).pick===r.create(n).pick:t.isPlainObject(e)&&t.isPlainObject(n)?r.isTimeExact(
e.from,n.from)&&r.isTimeExact(e.to,n.to):!1},u.prototype.isTimeOverlap=function(e
,n){var r=this;return o.isInteger(e)&&(o.isDate(n)||t.isArray(n))?e===r.create(n)
.hour:o.isInteger(n)&&(o.isDate(e)||t.isArray(e))?n===r.create(e).hour:t.isPlainObject
(e)&&t.isPlainObject(n)?r.overlapRanges(e,n):!1},u.prototype.flipEnable=function(
e){var t=this.item;t.enable=e||(t.enable==-1?1:-1)},u.prototype.deactivate=function(
e,n){var r=this,i=r.item.disable.slice(0);return n=="flip"?r.flipEnable():n===!1?
(r.flipEnable(1),i=[]):n===!0?(r.flipEnable(-1),i=[]):n.map(function(e){var n;for(
var s=0;s<i.length;s+=1)if(r.isTimeExact(e,i[s])){n=!0;break}n||(o.isInteger(e)||
o.isDate(e)||t.isArray(e)||t.isPlainObject(e)&&e.from&&e.to)&&i.push(e)}),i},u.prototype
.activate=function(e,n){var r=this,i=r.item.disable,s=i.length;return n=="flip"?r
.flipEnable():n===!0?(r.flipEnable(1),i=[]):n===!1?(r.flipEnable(-1),i=[]):n.map(
function(e){var n,u,a,f;for(a=0;a<s;a+=1){u=i[a];if(r.isTimeExact(u,e)){n=i[a]=null
,f=!0;break}if(r.isTimeOverlap(u,e)){t.isPlainObject(e)?(e.inverted=!0,n=e):t.isArray
(e)?(n=e,n[2]||n.push("inverted")):o.isDate(e)&&(n=[e.getFullYear(),e.getMonth(),
e.getDate(),"inverted"]);break}}if(n)for(a=0;a<s;a+=1)if(r.isTimeExact(i[a],e)){i
[a]=null;break}if(f)for(a=0;a<s;a+=1)if(r.isTimeOverlap(i[a],e)){i[a]=null;break}
n&&i.push(n)}),i.filter(function(e){return e!=null})},u.prototype.i=function(e,t)
{return o.isInteger(t)&&t>0?t:this.item.interval},u.prototype.nodes=function(e){var t=
this,n=t.settings,r=t.item.select,i=t.item.highlight,s=t.item.view,u=t.item.disable
;return o.node("ul",o.group({min:t.item.min.pick,max:t.item.max.pick,i:t.item.interval
,node:"li",item:function(e){e=t.create(e);var a=e.pick,f=r&&r.pick==a,l=i&&i.pick==
a,c=u&&t.disabled(e);return[o.trigger(t.formats.toString,t,[o.trigger(n.formatLabel
,t,[e])||n.format,e]),function(e){return f&&e.push(n.klass.selected),l&&e.push(n.
klass.highlighted),s&&s.pick==a&&e.push(n.klass.viewset),c&&e.push(n.klass.disabled
),e.join(" ")}([n.klass.listItem]),"data-pick="+e.pick+" "+o.ariaAttr({role:"button"
,controls:t.$node[0].id,checked:f&&t.$node.val()===o.trigger(t.formats.toString,t
,[n.format,e])?!0:null,activedescendant:l?!0:null,disabled:c?!0:null})]}})+o.node
("li",o.node("button",n.clear,n.klass.buttonClear,"type=button data-clear=1"+(e?""
:" disable"))),n.klass.list)},u.defaults=function(e){return{clear:"Clear",format:"h:i A"
,interval:30,klass:{picker:e+" "+e+"--time",holder:e+"__holder",list:e+"__list",listItem
:e+"__list-item",disabled:e+"__list-item--disabled",selected:e+"__list-item--selected"
,highlighted:e+"__list-item--highlighted",viewset:e+"__list-item--viewset",now:e+"__list-item--now"
,buttonClear:e+"__button--clear"}}}(e.klasses().picker),e.extend("pickatime",u)})
,function(e){function t(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow
:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated
:!1,iso:!1}}function n(e,t){return function(n){return l(e.call(this,n),t)}}function r
(e,t){return function(n){return this.lang().ordinal(e.call(this,n),t)}}function i
(){}function s(e){S(e),u(this,e)}function o(e){var t=m(e),n=t.year||0,r=t.month||0
,i=t.week||0,s=t.day||0,o=t.hour||0,u=t.minute||0,a=t.second||0,f=t.millisecond||0
;this._milliseconds=+f+1e3*a+6e4*u+36e5*o,this._days=+s+7*i,this._months=+r+12*n,
this._data={},this._bubble()}function u(e,t){for(var n in t)t.hasOwnProperty(n)&&
(e[n]=t[n]);return t.hasOwnProperty("toString")&&(e.toString=t.toString),t.hasOwnProperty
("valueOf")&&(e.valueOf=t.valueOf),e}function a(e){var t,n={};for(t in e)e.hasOwnProperty
(t)&&mt.hasOwnProperty(t)&&(n[t]=e[t]);return n}function f(e){return 0>e?Math.ceil
(e):Math.floor(e)}function l(e,t,n){for(var r=""+Math.abs(e),i=e>=0;r.length<t;)r="0"+
r;return(i?n?"+":"":"-")+r}function c(e,t,n,r){var i,s,o=t._milliseconds,u=t._days
,a=t._months;o&&e._d.setTime(+e._d+o*n),(u||a)&&(i=e.minute(),s=e.hour()),u&&e.date
(e.date()+u*n),a&&e.month(e.month()+a*n),o&&!r&&rt.updateOffset(e),(u||a)&&(e.minute
(i),e.hour(s))}function h(e){return"[object Array]"===Object.prototype.toString.call
(e)}function p(e){return"[object Date]"===Object.prototype.toString.call(e)||e instanceof 
Date}function d(e,t,n){var r,i=Math.min(e.length,t.length),s=Math.abs(e.length-t.
length),o=0;for(r=0;i>r;r++)(n&&e[r]!==t[r]||!n&&y(e[r])!==y(t[r]))&&o++;return o+
s}function v(e){if(e){var t=e.toLowerCase().replace(/(.)s$/,"$1");e=Xt[e]||Vt[t]||
t}return e}function m(e){var t,n,r={};for(n in e)e.hasOwnProperty(n)&&(t=v(n),t&&
(r[t]=e[n]));return r}function g(t){var n,r;if(0===t.indexOf("week"))n=7,r="day";
else{if(0!==t.indexOf("month"))return;n=12,r="month"}rt[t]=function(i,s){var o,u,
a=rt.fn._lang[t],f=[];if("number"==typeof i&&(s=i,i=e),u=function(e){var t=rt().utc
().set(r,e);return a.call(rt.fn._lang,t,i||"")},null!=s)return u(s);for(o=0;n>o;o++
)f.push(u(o));return f}}function y(e){var t=+e,n=0;return 0!==t&&isFinite(t)&&(n=
t>=0?Math.floor(t):Math.ceil(t)),n}function b(e,t){return(new Date(Date.UTC(e,t+1
,0))).getUTCDate()}function w(e){return E(e)?366:365}function E(e){return e%4===0&&
e%100!==0||e%400===0}function S(e){var t;e._a&&-2===e._pf.overflow&&(t=e._a[ft]<0||
e._a[ft]>11?ft:e._a[lt]<1||e._a[lt]>b(e._a[at],e._a[ft])?lt:e._a[ct]<0||e._a[ct]>23?
ct:e._a[ht]<0||e._a[ht]>59?ht:e._a[pt]<0||e._a[pt]>59?pt:e._a[dt]<0||e._a[dt]>999?
dt:-1,e._pf._overflowDayOfYear&&(at>t||t>lt)&&(t=lt),e._pf.overflow=t)}function x
(e){return null==e._isValid&&(e._isValid=!isNaN(e._d.getTime())&&e._pf.overflow<0&&!
e._pf.empty&&!e._pf.invalidMonth&&!e._pf.nullInput&&!e._pf.invalidFormat&&!e._pf.
userInvalidated,e._strict&&(e._isValid=e._isValid&&0===e._pf.charsLeftOver&&0===e
._pf.unusedTokens.length)),e._isValid}function T(e){return e?e.toLowerCase().replace
("_","-"):e}function N(e,t){return t._isUTC?rt(e).zone(t._offset||0):rt(e).local(
)}function C(e,t){return t.abbr=e,vt[e]||(vt[e]=new i),vt[e].set(t),vt[e]}function k
(e){delete vt[e]}function L(e){var t,n,r,i,s=0,o=function(e){if(!vt[e]&&gt)try{require
("./lang/"+e)}catch(t){}return vt[e]};if(!e)return rt.fn._lang;if(!h(e)){if(n=o(e
))return n;e=[e]}for(;s<e.length;){for(i=T(e[s]).split("-"),t=i.length,r=T(e[s+1]
),r=r?r.split("-"):null;t>0;){if(n=o(i.slice(0,t).join("-")))return n;if(r&&r.length>=
t&&d(i,r,!0)>=t-1)break;t--}s++}return rt.fn._lang}function A(e){return e.match(/\[[\s\S]/
)?e.replace(/^\[|\]$/g,""):e.replace(/\\/g,"")}function O(e){var t,n,r=e.match(Et
);for(t=0,n=r.length;n>t;t++)r[t]=Qt[r[t]]?Qt[r[t]]:A(r[t]);return function(i){var s=""
;for(t=0;n>t;t++)s+=r[t]instanceof Function?r[t].call(i,e):r[t];return s}}function M
(e,t){return e.isValid()?(t=_(t,e.lang()),$t[t]||($t[t]=O(t)),$t[t](e)):e.lang().
invalidDate()}function _(e,t){function n(e){return t.longDateFormat(e)||e}var r=5
;for(St.lastIndex=0;r>=0&&St.test(e);)e=e.replace(St,n),St.lastIndex=0,r-=1;return e
}function D(e,t){var n,r=t._strict;switch(e){case"DDDD":return Pt;case"YYYY":case"GGGG"
:case"gggg":return r?Ht:Nt;case"Y":case"G":case"g":return jt;case"YYYYYY":case"YYYYY"
:case"GGGGG":case"ggggg":return r?Bt:Ct;case"S":if(r)return _t;case"SS":if(r)return Dt
;case"SSS":if(r)return Pt;case"DDD":return Tt;case"MMM":case"MMMM":case"dd":case"ddd"
:case"dddd":return Lt;case"a":case"A":return L(t._l)._meridiemParse;case"X":return Mt
;case"Z":case"ZZ":return At;case"T":return Ot;case"SSSS":return kt;case"MM":case"DD"
:case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW"
:return r?Dt:xt;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W"
:case"e":case"E":return xt;default:return n=new RegExp(R(q(e.replace("\\","")),"i"
))}}function P(e){e=e||"";var t=e.match(At)||[],n=t[t.length-1]||[],r=(n+"").match
(Ut)||["-",0,0],i=+(60*r[1])+y(r[2]);return"+"===r[0]?-i:i}function H(e,t,n){var r
,i=n._a;switch(e){case"M":case"MM":null!=t&&(i[ft]=y(t)-1);break;case"MMM":case"MMMM"
:r=L(n._l).monthsParse(t),null!=r?i[ft]=r:n._pf.invalidMonth=t;break;case"D":case"DD"
:null!=t&&(i[lt]=y(t));break;case"DDD":case"DDDD":null!=t&&(n._dayOfYear=y(t));break;
case"YY":i[at]=y(t)+(y(t)>68?1900:2e3);break;case"YYYY":case"YYYYY":case"YYYYYY":
i[at]=y(t);break;case"a":case"A":n._isPm=L(n._l).isPM(t);break;case"H":case"HH":case"h"
:case"hh":i[ct]=y(t);break;case"m":case"mm":i[ht]=y(t);break;case"s":case"ss":i[pt
]=y(t);break;case"S":case"SS":case"SSS":case"SSSS":i[dt]=y(1e3*("0."+t));break;case"X"
:n._d=new Date(1e3*parseFloat(t));break;case"Z":case"ZZ":n._useUTC=!0,n._tzm=P(t)
;break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e"
:case"E":e=e.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":e=e.
substr(0,2),t&&(n._w=n._w||{},n._w[e]=t)}}function B(e){var t,n,r,i,s,o,u,a,f,l,c=
[];if(!e._d){for(r=F(e),e._w&&null==e._a[lt]&&null==e._a[ft]&&(s=function(t){var n=
parseInt(t,10);return t?t.length<3?n>68?1900+n:2e3+n:n:null==e._a[at]?rt().weekYear
():e._a[at]},o=e._w,null!=o.GG||null!=o.W||null!=o.E?u=G(s(o.GG),o.W||1,o.E,4,1):
(a=L(e._l),f=null!=o.d?$(o.d,a):null!=o.e?parseInt(o.e,10)+a._week.dow:0,l=parseInt
(o.w,10)||1,null!=o.d&&f<a._week.dow&&l++,u=G(s(o.gg),l,f,a._week.doy,a._week.dow
)),e._a[at]=u.year,e._dayOfYear=u.dayOfYear),e._dayOfYear&&(i=null==e._a[at]?r[at
]:e._a[at],e._dayOfYear>w(i)&&(e._pf._overflowDayOfYear=!0),n=V(i,0,e._dayOfYear)
,e._a[ft]=n.getUTCMonth(),e._a[lt]=n.getUTCDate()),t=0;3>t&&null==e._a[t];++t)e._a
[t]=c[t]=r[t];for(;7>t;t++)e._a[t]=c[t]=null==e._a[t]?2===t?1:0:e._a[t];c[ct]+=y(
(e._tzm||0)/60),c[ht]+=y((e._tzm||0)%60),e._d=(e._useUTC?V:X).apply(null,c)}}function j
(e){var t;e._d||(t=m(e._i),e._a=[t.year,t.month,t.day,t.hour,t.minute,t.second,t.
millisecond],B(e))}function F(e){var t=new Date;return e._useUTC?[t.getUTCFullYear
(),t.getUTCMonth(),t.getUTCDate()]:[t.getFullYear(),t.getMonth(),t.getDate()]}function I
(e){e._a=[],e._pf.empty=!0;var t,n,r,i,s,o=L(e._l),u=""+e._i,a=u.length,f=0;for(r=
_(e._f,o).match(Et)||[],t=0;t<r.length;t++)i=r[t],n=(u.match(D(i,e))||[])[0],n&&(
s=u.substr(0,u.indexOf(n)),s.length>0&&e._pf.unusedInput.push(s),u=u.slice(u.indexOf
(n)+n.length),f+=n.length),Qt[i]?(n?e._pf.empty=!1:e._pf.unusedTokens.push(i),H(i
,n,e)):e._strict&&!n&&e._pf.unusedTokens.push(i);e._pf.charsLeftOver=a-f,u.length>0&&
e._pf.unusedInput.push(u),e._isPm&&e._a[ct]<12&&(e._a[ct]+=12),e._isPm===!1&&12===
e._a[ct]&&(e._a[ct]=0),B(e),S(e)}function q(e){return e.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g
,function(e,t,n,r,i){return t||n||r||i})}function R(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g
,"\\$&")}function U(e){var n,r,i,s,o;if(0===e._f.length)return e._pf.invalidFormat=!0
,e._d=new Date(0/0),void 0;for(s=0;s<e._f.length;s++)o=0,n=u({},e),n._pf=t(),n._f=
e._f[s],I(n),x(n)&&(o+=n._pf.charsLeftOver,o+=10*n._pf.unusedTokens.length,n._pf.
score=o,(null==i||i>o)&&(i=o,r=n));u(e,r||n)}function z(e){var t,n,r=e._i,i=Ft.exec
(r);if(i){for(e._pf.iso=!0,t=0,n=qt.length;n>t;t++)if(qt[t][1].exec(r)){e._f=qt[t
][0]+(i[6]||" ");break}for(t=0,n=Rt.length;n>t;t++)if(Rt[t][1].exec(r)){e._f+=Rt[
t][0];break}r.match(At)&&(e._f+="Z"),I(e)}else e._d=new Date(r)}function W(t){var n=
t._i,r=yt.exec(n);n===e?t._d=new Date:r?t._d=new Date(+r[1]):"string"==typeof n?z
(t):h(n)?(t._a=n.slice(0),B(t)):p(n)?t._d=new Date(+n):"object"==typeof n?j(t):t.
_d=new Date(n)}function X(e,t,n,r,i,s,o){var u=new Date(e,t,n,r,i,s,o);return 1970>
e&&u.setFullYear(e),u}function V(e){var t=new Date(Date.UTC.apply(null,arguments)
);return 1970>e&&t.setUTCFullYear(e),t}function $(e,t){if("string"==typeof e)if(isNaN
(e)){if(e=t.weekdaysParse(e),"number"!=typeof e)return null}else e=parseInt(e,10)
;return e}function J(e,t,n,r,i){return i.relativeTime(t||1,!!n,e,r)}function K(e,
t,n){var r=ut(Math.abs(e)/1e3),i=ut(r/60),s=ut(i/60),o=ut(s/24),u=ut(o/365),a=45>
r&&["s",r]||1===i&&["m"]||45>i&&["mm",i]||1===s&&["h"]||22>s&&["hh",s]||1===o&&["d"
]||25>=o&&["dd",o]||45>=o&&["M"]||345>o&&["MM",ut(o/30)]||1===u&&["y"]||["yy",u];
return a[2]=t,a[3]=e>0,a[4]=n,J.apply({},a)}function Q(e,t,n){var r,i=n-t,s=n-e.day
();return s>i&&(s-=7),i-7>s&&(s+=7),r=rt(e).add("d",s),{week:Math.ceil(r.dayOfYear
()/7),year:r.year()}}function G(e,t,n,r,i){var s,o,u=V(e,0,1).getUTCDay();return n=
null!=n?n:i,s=i-u+(u>r?7:0)-(i>u?7:0),o=7*(t-1)+(n-i)+s+1,{year:o>0?e:e-1,dayOfYear
:o>0?o:w(e-1)+o}}function Y(e){var t=e._i,n=e._f;return null===t?rt.invalid({nullInput
:!0}):("string"==typeof t&&(e._i=t=L().preparse(t)),rt.isMoment(t)?(e=a(t),e._d=new 
Date(+t._d)):n?h(n)?U(e):I(e):W(e),new s(e))}function Z(e,t){rt.fn[e]=rt.fn[e+"s"
]=function(e){var n=this._isUTC?"UTC":"";return null!=e?(this._d["set"+n+t](e),rt
.updateOffset(this),this):this._d["get"+n+t]()}}function et(e){rt.duration.fn[e]=
function(){return this._data[e]}}function tt(e,t){rt.duration.fn["as"+e]=function(
){return+this/t}}function nt(e){var t=!1,n=rt;"undefined"==typeof ender&&(e?(ot.moment=
function(){return!t&&console&&console.warn&&(t=!0,console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release."
)),n.apply(null,arguments)},u(ot.moment,n)):ot.moment=rt)}for(var rt,it,st="2.5.1"
,ot=this,ut=Math.round,at=0,ft=1,lt=2,ct=3,ht=4,pt=5,dt=6,vt={},mt={_isAMomentObject
:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang
:null},gt="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require
,yt=/^\/?Date\((\-?\d+)/i,bt=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/
,wt=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/
,Et=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g
,St=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,xt=/\d\d?/,Tt=/\d{1,3}/,Nt=/\d{1,4}/
,Ct=/[+\-]?\d{1,6}/,kt=/\d+/,Lt=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i
,At=/Z|[\+\-]\d\d:?\d\d/gi,Ot=/T/i,Mt=/[\+\-]?\d+(\.\d{1,3})?/,_t=/\d/,Dt=/\d\d/,
Pt=/\d{3}/,Ht=/\d{4}/,Bt=/[+-]?\d{6}/,jt=/[+-]?\d+/,Ft=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/
,It="YYYY-MM-DDTHH:mm:ssZ",qt=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD"
,/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/
],["YYYY-DDD",/\d{4}-\d{3}/]],Rt=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/
],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/
]],Ut=/([\+\-]|\d\d)/gi,zt="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),Wt=
{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years
:31536e6},Xt={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week"
,W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear"
,GG:"isoWeekYear"},Vt={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek"
,weekyear:"weekYear",isoweekyear:"isoWeekYear"},$t={},Jt="DDD w W M D d".split(" "
),Kt="M D H h m s w W".split(" "),Qt={M:function(){return this.month()+1},MMM:function(
e){return this.lang().monthsShort(this,e)},MMMM:function(e){return this.lang().months
(this,e)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()
},d:function(){return this.day()},dd:function(e){return this.lang().weekdaysMin(this
,e)},ddd:function(e){return this.lang().weekdaysShort(this,e)},dddd:function(e){return this
.lang().weekdays(this,e)},w:function(){return this.week()},W:function(){return this
.isoWeek()},YY:function(){return l(this.year()%100,2)},YYYY:function(){return l(this
.year(),4)},YYYYY:function(){return l(this.year(),5)},YYYYYY:function(){var e=this
.year(),t=e>=0?"+":"-";return t+l(Math.abs(e),6)},gg:function(){return l(this.weekYear
()%100,2)},gggg:function(){return l(this.weekYear(),4)},ggggg:function(){return l
(this.weekYear(),5)},GG:function(){return l(this.isoWeekYear()%100,2)},GGGG:function(
){return l(this.isoWeekYear(),4)},GGGGG:function(){return l(this.isoWeekYear(),5)
},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(
){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this
.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours(
)},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s
:function(){return this.seconds()},S:function(){return y(this.milliseconds()/100)
},SS:function(){return l(y(this.milliseconds()/10),2)},SSS:function(){return l(this
.milliseconds(),3)},SSSS:function(){return l(this.milliseconds(),3)},Z:function()
{var e=-this.zone(),t="+";return 0>e&&(e=-e,t="-"),t+l(y(e/60),2)+":"+l(y(e)%60,2
)},ZZ:function(){var e=-this.zone(),t="+";return 0>e&&(e=-e,t="-"),t+l(y(e/60),2)+
l(y(e)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName
()},X:function(){return this.unix()},Q:function(){return this.quarter()}},Gt=["months"
,"monthsShort","weekdays","weekdaysShort","weekdaysMin"];Jt.length;)it=Jt.pop(),Qt
[it+"o"]=r(Qt[it],it);for(;Kt.length;)it=Kt.pop(),Qt[it+it]=n(Qt[it],2);for(Qt.DDDD=
n(Qt.DDD,3),u(i.prototype,{set:function(e){var t,n;for(n in e)t=e[n],"function"==typeof 
t?this[n]=t:this["_"+n]=t},_months:"January_February_March_April_May_June_July_August_September_October_November_December"
.split("_"),months:function(e){return this._months[e.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec"
.split("_"),monthsShort:function(e){return this._monthsShort[e.month()]},monthsParse
:function(e){var t,n,r;for(this._monthsParse||(this._monthsParse=[]),t=0;12>t;t++
)if(this._monthsParse[t]||(n=rt.utc([2e3,t]),r="^"+this.months(n,"")+"|^"+this.monthsShort
(n,""),this._monthsParse[t]=new RegExp(r.replace(".",""),"i")),this._monthsParse[
t].test(e))return t},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday"
.split("_"),weekdays:function(e){return this._weekdays[e.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat"
.split("_"),weekdaysShort:function(e){return this._weekdaysShort[e.day()]},_weekdaysMin
:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(e){return this._weekdaysMin
[e.day()]},weekdaysParse:function(e){var t,n,r;for(this._weekdaysParse||(this._weekdaysParse=
[]),t=0;7>t;t++)if(this._weekdaysParse[t]||(n=rt([2e3,1]).day(t),r="^"+this.weekdays
(n,"")+"|^"+this.weekdaysShort(n,"")+"|^"+this.weekdaysMin(n,""),this._weekdaysParse
[t]=new RegExp(r.replace(".",""),"i")),this._weekdaysParse[t].test(e))return t},_longDateFormat
:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"
},longDateFormat:function(e){var t=this._longDateFormat[e];return!t&&this._longDateFormat
[e.toUpperCase()]&&(t=this._longDateFormat[e.toUpperCase()].replace(/MMMM|MM|DD|dddd/g
,function(e){return e.slice(1)}),this._longDateFormat[e]=t),t},isPM:function(e){return"p"===
(e+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(
e,t,n){return e>11?n?"pm":"PM":n?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay
:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT"
,sameElse:"L"},calendar:function(e,t){var n=this._calendar[e];return"function"==typeof 
n?n.apply(t):n},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute"
,mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months"
,y:"a year",yy:"%d years"},relativeTime:function(e,t,n,r){var i=this._relativeTime
[n];return"function"==typeof i?i(e,t,n,r):i.replace(/%d/i,e)},pastFuture:function(
e,t){var n=this._relativeTime[e>0?"future":"past"];return"function"==typeof n?n(t
):n.replace(/%s/i,t)},ordinal:function(e){return this._ordinal.replace("%d",e)},_ordinal
:"%d",preparse:function(e){return e},postformat:function(e){return e},week:function(
e){return Q(e,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate
:"Invalid date",invalidDate:function(){return this._invalidDate}}),rt=function(n,
r,i,s){var o;return"boolean"==typeof i&&(s=i,i=e),o={},o._isAMomentObject=!0,o._i=
n,o._f=r,o._l=i,o._strict=s,o._isUTC=!1,o._pf=t(),Y(o)},rt.utc=function(n,r,i,s){
var o;return"boolean"==typeof i&&(s=i,i=e),o={},o._isAMomentObject=!0,o._useUTC=!0
,o._isUTC=!0,o._l=i,o._i=n,o._f=r,o._strict=s,o._pf=t(),Y(o).utc()},rt.unix=function(
e){return rt(1e3*e)},rt.duration=function(e,t){var n,r,i,s=e,u=null;return rt.isDuration
(e)?s={ms:e._milliseconds,d:e._days,M:e._months}:"number"==typeof e?(s={},t?s[t]=
e:s.milliseconds=e):(u=bt.exec(e))?(n="-"===u[1]?-1:1,s={y:0,d:y(u[lt])*n,h:y(u[ct
])*n,m:y(u[ht])*n,s:y(u[pt])*n,ms:y(u[dt])*n}):(u=wt.exec(e))&&(n="-"===u[1]?-1:1
,i=function(e){var t=e&&parseFloat(e.replace(",","."));return(isNaN(t)?0:t)*n},s=
{y:i(u[2]),M:i(u[3]),d:i(u[4]),h:i(u[5]),m:i(u[6]),s:i(u[7]),w:i(u[8])}),r=new o(
s),rt.isDuration(e)&&e.hasOwnProperty("_lang")&&(r._lang=e._lang),r},rt.version=st
,rt.defaultFormat=It,rt.updateOffset=function(){},rt.lang=function(e,t){var n;return e?
(t?C(T(e),t):null===t?(k(e),e="en"):vt[e]||L(e),n=rt.duration.fn._lang=rt.fn._lang=
L(e),n._abbr):rt.fn._lang._abbr},rt.langData=function(e){return e&&e._lang&&e._lang
._abbr&&(e=e._lang._abbr),L(e)},rt.isMoment=function(e){return e instanceof s||null!=
e&&e.hasOwnProperty("_isAMomentObject")},rt.isDuration=function(e){return e instanceof 
o},it=Gt.length-1;it>=0;--it)g(Gt[it]);for(rt.normalizeUnits=function(e){return v
(e)},rt.invalid=function(e){var t=rt.utc(0/0);return null!=e?u(t._pf,e):t._pf.userInvalidated=!0
,t},rt.parseZone=function(e){return rt(e).parseZone()},u(rt.fn=s.prototype,{clone
:function(){return rt(this)},valueOf:function(){return+this._d+6e4*(this._offset||0
)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.
clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){
return this._offset?new Date(+this):this._d},toISOString:function(){var e=rt(this
).utc();return 0<e.year()&&e.year()<=9999?M(e,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):M(e
,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var e=this;return[e.year()
,e.month(),e.date(),e.hours(),e.minutes(),e.seconds(),e.milliseconds()]},isValid:
function(){return x(this)},isDSTShifted:function(){return this._a?this.isValid()&&
d(this._a,(this._isUTC?rt.utc(this._a):rt(this._a)).toArray())>0:!1},parsingFlags
:function(){return u({},this._pf)},invalidAt:function(){return this._pf.overflow}
,utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1
,this},format:function(e){var t=M(this,e||rt.defaultFormat);return this.lang().postformat
(t)},add:function(e,t){var n;return n="string"==typeof e?rt.duration(+t,e):rt.duration
(e,t),c(this,n,1),this},subtract:function(e,t){var n;return n="string"==typeof e?
rt.duration(+t,e):rt.duration(e,t),c(this,n,-1),this},diff:function(e,t,n){var r,
i,s=N(e,this),o=6e4*(this.zone()-s.zone());return t=v(t),"year"===t||"month"===t?
(r=432e5*(this.daysInMonth()+s.daysInMonth()),i=12*(this.year()-s.year())+(this.month
()-s.month()),i+=(this-rt(this).startOf("month")-(s-rt(s).startOf("month")))/r,i-=6e4*
(this.zone()-rt(this).startOf("month").zone()-(s.zone()-rt(s).startOf("month").zone
()))/r,"year"===t&&(i/=12)):(r=this-s,i="second"===t?r/1e3:"minute"===t?r/6e4:"hour"===
t?r/36e5:"day"===t?(r-o)/864e5:"week"===t?(r-o)/6048e5:r),n?i:f(i)},from:function(
e,t){return rt.duration(this.diff(e)).lang(this.lang()._abbr).humanize(!t)},fromNow
:function(e){return this.from(rt(),e)},calendar:function(){var e=N(rt(),this).startOf
("day"),t=this.diff(e,"days",!0),n=-6>t?"sameElse":-1>t?"lastWeek":0>t?"lastDay":1>
t?"sameDay":2>t?"nextDay":7>t?"nextWeek":"sameElse";return this.format(this.lang(
).calendar(n,this))},isLeapYear:function(){return E(this.year())},isDST:function(
){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month
(5).zone()},day:function(e){var t=this._isUTC?this._d.getUTCDay():this._d.getDay(
);return null!=e?(e=$(e,this.lang()),this.add({d:e-t})):t},month:function(e){var t
,n=this._isUTC?"UTC":"";return null!=e?"string"==typeof e&&(e=this.lang().monthsParse
(e),"number"!=typeof e)?this:(t=this.date(),this.date(1),this._d["set"+n+"Month"]
(e),this.date(Math.min(t,this.daysInMonth())),rt.updateOffset(this),this):this._d
["get"+n+"Month"]()},startOf:function(e){switch(e=v(e)){case"year":this.month(0);
case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour"
:this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===
e?this.weekday(0):"isoWeek"===e&&this.isoWeekday(1),this},endOf:function(e){return e=
v(e),this.startOf(e).add("isoWeek"===e?"week":e,1).subtract("ms",1)},isAfter:function(
e,t){return t="undefined"!=typeof t?t:"millisecond",+this.clone().startOf(t)>+rt(
e).startOf(t)},isBefore:function(e,t){return t="undefined"!=typeof t?t:"millisecond"
,+this.clone().startOf(t)<+rt(e).startOf(t)},isSame:function(e,t){return t=t||"ms"
,+this.clone().startOf(t)===+N(e,this).startOf(t)},min:function(e){return e=rt.apply
(null,arguments),this>e?this:e},max:function(e){return e=rt.apply(null,arguments)
,e>this?this:e},zone:function(e){var t=this._offset||0;return null==e?this._isUTC?
t:this._d.getTimezoneOffset():("string"==typeof e&&(e=P(e)),Math.abs(e)<16&&(e=60*
e),this._offset=e,this._isUTC=!0,t!==e&&c(this,rt.duration(t-e,"m"),1,!0),this)},
zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this.
_isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this
.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset
:function(e){return e=e?rt(e).zone():0,(this.zone()-e)%60===0},daysInMonth:function(
){return b(this.year(),this.month())},dayOfYear:function(e){var t=ut((rt(this).startOf
("day")-rt(this).startOf("year"))/864e5)+1;return null==e?t:this.add("d",e-t)},quarter
:function(){return Math.ceil((this.month()+1)/3)},weekYear:function(e){var t=Q(this
,this.lang()._week.dow,this.lang()._week.doy).year;return null==e?t:this.add("y",
e-t)},isoWeekYear:function(e){var t=Q(this,1,4).year;return null==e?t:this.add("y"
,e-t)},week:function(e){var t=this.lang().week(this);return null==e?t:this.add("d"
,7*(e-t))},isoWeek:function(e){var t=Q(this,1,4).week;return null==e?t:this.add("d"
,7*(e-t))},weekday:function(e){var t=(this.day()+7-this.lang()._week.dow)%7;return null==
e?t:this.add("d",e-t)},isoWeekday:function(e){return null==e?this.day()||7:this.day
(this.day()%7?e:e-7)},get:function(e){return e=v(e),this[e]()},set:function(e,t){
return e=v(e),"function"==typeof this[e]&&this[e](t),this},lang:function(t){return t===
e?this._lang:(this._lang=L(t),this)}}),it=0;it<zt.length;it++)Z(zt[it].toLowerCase
().replace(/s$/,""),zt[it]);Z("year","FullYear"),rt.fn.days=rt.fn.day,rt.fn.months=
rt.fn.month,rt.fn.weeks=rt.fn.week,rt.fn.isoWeeks=rt.fn.isoWeek,rt.fn.toJSON=rt.fn
.toISOString,u(rt.duration.fn=o.prototype,{_bubble:function(){var e,t,n,r,i=this.
_milliseconds,s=this._days,o=this._months,u=this._data;u.milliseconds=i%1e3,e=f(i/1e3
),u.seconds=e%60,t=f(e/60),u.minutes=t%60,n=f(t/60),u.hours=n%24,s+=f(n/24),u.days=
s%30,o+=f(s/30),u.months=o%12,r=f(o/12),u.years=r},weeks:function(){return f(this
.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*
y(this._months/12)},humanize:function(e){var t=+this,n=K(t,!e,this.lang());return e&&
(n=this.lang().pastFuture(t,n)),this.lang().postformat(n)},add:function(e,t){var n=
rt.duration(e,t);return this._milliseconds+=n._milliseconds,this._days+=n._days,this
._months+=n._months,this._bubble(),this},subtract:function(e,t){var n=rt.duration
(e,t);return this._milliseconds-=n._milliseconds,this._days-=n._days,this._months-=
n._months,this._bubble(),this},get:function(e){return e=v(e),this[e.toLowerCase()+"s"
]()},as:function(e){return e=v(e),this["as"+e.charAt(0).toUpperCase()+e.slice(1)+"s"
]()},lang:rt.fn.lang,toIsoString:function(){var e=Math.abs(this.years()),t=Math.abs
(this.months()),n=Math.abs(this.days()),r=Math.abs(this.hours()),i=Math.abs(this.
minutes()),s=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds
()?(this.asSeconds()<0?"-":"")+"P"+(e?e+"Y":"")+(t?t+"M":"")+(n?n+"D":"")+(r||i||
s?"T":"")+(r?r+"H":"")+(i?i+"M":"")+(s?s+"S":""):"P0D"}});for(it in Wt)Wt.hasOwnProperty
(it)&&(tt(it,Wt[it]),et(it.toLowerCase()));tt("Weeks",6048e5),rt.duration.fn.asMonths=
function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},rt.lang("en"
,{ordinal:function(e){var t=e%10,n=1===y(e%100/10)?"th":1===t?"st":2===t?"nd":3===
t?"rd":"th";return e+n}}),gt?(module.exports=rt,nt(!0)):"function"==typeof define&&
define.amd?define("moment",["require","exports","module"],function(t,n,r){return r
.config&&r.config()&&r.config().noGlobal!==!0&&nt(r.config().noGlobal===e),rt}):nt
()}.call(this);