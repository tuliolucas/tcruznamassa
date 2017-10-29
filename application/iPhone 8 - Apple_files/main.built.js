window.require;"use strict";var _createClass=function(){function a(f,c){for(var b=0;
b<c.length;b++){var d=c[b];d.enumerable=d.enumerable||false;d.configurable=true;
if("value" in d){d.writable=true}Object.defineProperty(f,d.key,d)}}return function(d,b,c){if(b){a(d.prototype,b)
}if(c){a(d,c)}return d}}();var _get=function get(b,f,d){if(b===null){b=Function.prototype
}var g=Object.getOwnPropertyDescriptor(b,f);if(g===undefined){var c=Object.getPrototypeOf(b);
if(c===null){return undefined}else{return get(c,f,d)}}else{if("value" in g){return g.value
}else{var a=g.get;if(a===undefined){return undefined}return a.call(d)}}};var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(a){return typeof a
}:function(a){return a&&typeof Symbol==="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a
};var _templateObject=_taggedTemplateLiteral(["/105/media/","/","/",""],["/105/media/","/","/",""]);
function _taggedTemplateLiteral(a,b){return Object.freeze(Object.defineProperties(a,{raw:{value:Object.freeze(b)}}))
}function _toConsumableArray(a){if(Array.isArray(a)){for(var c=0,b=Array(a.length);
c<a.length;c++){b[c]=a[c]}return b}else{return Array.from(a)}}function _classCallCheck(a,b){if(!(a instanceof b)){throw new TypeError("Cannot call a class as a function")
}}function _possibleConstructorReturn(a,b){if(!a){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
}return b&&(typeof b==="object"||typeof b==="function")?b:a}function _inherits(b,a){if(typeof a!=="function"&&a!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof a)
}b.prototype=Object.create(a&&a.prototype,{constructor:{value:b,enumerable:false,writable:true,configurable:true}});
if(a){Object.setPrototypeOf?Object.setPrototypeOf(b,a):b.__proto__=a}}(function e(b,g,d){function c(m,j){if(!g[m]){if(!b[m]){var i=typeof require=="function"&&require;
if(!j&&i){return i(m,!0)}if(a){return a(m,!0)}var k=new Error("Cannot find module '"+m+"'");
throw k.code="MODULE_NOT_FOUND",k}var h=g[m]={exports:{}};b[m][0].call(h.exports,function(l){var o=b[m][1][l];
return c(o?o:l)},h,h.exports,e,b,g,d)}return g[m].exports}var a=typeof require=="function"&&require;
for(var f=0;f<d.length;f++){c(d[f])}return c})({1:[function(b,f,a){var d=b("./ac-ajax/Ajax");
var c=b("./ac-ajax/Request");f.exports=new d();f.exports.Ajax=d;f.exports.Request=c
},{"./ac-ajax/Ajax":2,"./ac-ajax/Request":3}],2:[function(g,d,h){var a=g("./Request");
var q=g("./XDomain-request");var k=g("./URLParser");var b=function b(){};b._Request=a;
b.prototype={_defaults:{method:"get",timeout:5000},_extend:function c(){for(var t=1;
t<arguments.length;t++){for(var s in arguments[t]){if(arguments[t].hasOwnProperty(s)){arguments[0][s]=arguments[t][s]
}}}return arguments[0]},_getOptions:function r(s,t){return this._extend({},this._defaults,t,s)
},_isCrossDomainRequest:function o(v){var u=new k();var t=u.parse(window.location.href).origin;
var s=u.parse(v).origin;u.destroy();return s!==t},create:function i(s){return new a(s)
},cors:function l(t){var s=window.XDomainRequest&&document.documentMode<10?q:a;
return new s(t)},get:function f(t){var s;t=this._getOptions({method:"get"},t);if(this._isCrossDomainRequest(t.url)){s=this.cors(t)
}else{s=this.create(t)}return s.send()},getJSON:function j(s){return this.get(s).then(function(t){return JSON.parse(t.responseText)
})},head:function m(s){s=this._getOptions({method:"head"},s);return this.create(s).send()
},isCrossDomainRequest:function p(s){return this._isCrossDomainRequest(s)},post:function n(s){s=this._getOptions({method:"post"},s);
return this.create(s).send()}};d.exports=b},{"./Request":3,"./URLParser":4,"./XDomain-request":5}],3:[function(d,c,i){var a=function a(p){this._initialize(p)
};a.create=function(){var p=function p(){};p.prototype=a.prototype;return new p()
};a.prototype={_addReadyStateChangeHandler:function b(){this.xhr.onreadystatechange=function(p){if(this.xhr.readyState===4){clearTimeout(this._timeout);
if(this.xhr.status>=200&&this.xhr.status<300){this.resolve(this.xhr)}else{this.reject(this.xhr)
}}}.bind(this)},_getPromise:function o(){this.promise=new Promise(function(q,p){this.resolve=q;
this.reject=p}.bind(this))},_getTransport:function n(){return new XMLHttpRequest()
},_initialize:function j(r){var q=this._validateConfiguration(r);if(q){throw q}this._configuration=r;
var p=this._configuration.method.toUpperCase();this.xhr=this._getTransport();this._getPromise();
this.xhr.open(p,this._configuration.url);this._setRequestHeaders(r.headers);this._addReadyStateChangeHandler()
},_sendXHR:function g(){if(this.xhr){if(this._configuration&&this._configuration.data){this.xhr.send(this._configuration.data)
}else{this.xhr.send()}}},_setRequestHeaders:function l(p){if(p){p.forEach(function(q){this.xhr.setRequestHeader(q.name,q.value)
},this)}},_setTimeout:function k(p){if(!p){if(this._configuration&&this._configuration.timeout){p=this._configuration.timeout
}else{clearTimeout(this._timeout);this._timeout=null}}if(this._timeout!==null){clearTimeout(this._timeout)
}if(p>0){this._timeout=setTimeout(function(){this.xhr.abort();this.reject()}.bind(this),p)
}},_timeout:null,_validateConfiguration:function f(r){if(!r){return"Must provide a configuration object"
}var q=[];var p=r.headers;if(!r.url){q.push("Must provide a url")}if(!r.method){q.push("Must provide a method")
}if(p){if(!Array.isArray(p)){return"Must provide an array of headers"}this._validateHeaders(p,q)
}return q.join(", ")},_validateHeaders:function m(r,s){for(var q=0,p=r.length;q<p;
q++){if(!r[q].hasOwnProperty("name")||!r[q].hasOwnProperty("value")){s.push("Must provide a name and value key for all headers");
break}}},promise:null,reject:null,resolve:null,send:function h(){this._setTimeout();
this._sendXHR();return this.promise},xhr:null};c.exports=a},{}],4:[function(c,d,b){var a=function a(){this.parser=null
};var f=a.prototype;f.parse=function(k){var i;var l;var h;var g;var j;if(typeof k!=="string"){throw new TypeError(k+" must be a string")
}if(!this.parser){this.parser=document.createElement("a")}this._qualifyPath(k);
h=this.parser.hostname;l=this.parser.protocol;g=this._normalizePort(this.parser);
i=this.parser.origin||this._constructOriginString(this.parser,g);j=this.parser.search;
return{originalPath:k,qualifiedPath:this.parser.href,protocol:l,hostname:h,origin:i,port:g,search:j}
};f.destroy=function(){this.parser=null};f._constructOriginString=function(i,g){var h=g?":"+g:"";
return i.protocol+"//"+i.hostname+h};f._normalizePort=function(g){return g.port==="80"||g.port==="443"||g.port==="0"?"":g.port
};f._qualifyPath=function(g){this.parser.href=g;this.parser.href=this.parser.href
};d.exports=a},{}],5:[function(b,d,a){var c=b("./Request");var f=function f(g){c.apply(this,arguments)
};f.prototype=c.create();f.prototype._getTransport=function(){return new XDomainRequest()
};f.prototype._addReadyStateChangeHandler=function(){this.xhr.ontimeout=function(){this.reject(this.xhr)
}.bind(this);this.xhr.onerror=function(){this.reject(this.xhr)}.bind(this);this.xhr.onload=function(){this.resolve(this.xhr)
}.bind(this)};f.prototype._setTimeout=function(g){if(!g){if(this._configuration&&this._configuration.timeout){g=this._configuration.timeout
}}if(g>0){this.xhr.timeout=g}};f.prototype._sendXHR=function(){setTimeout(function(){c.prototype._sendXHR.call(this)
}.bind(this),0)};d.exports=f},{"./Request":3}],6:[function(b,c,a){c.exports.EventEmitter=b("./ac-event-emitter/EventEmitter")
},{"./ac-event-emitter/EventEmitter":7}],7:[function(d,c,f){var h="EventEmitter:propagation";
var k=function k(l){if(l){this.context=l}};var g=k.prototype;var i=function i(){if(!this.hasOwnProperty("_events")&&_typeof(this._events)!=="object"){this._events={}
}return this._events};var a=function a(m,o){var p=m[0];var q=m[1];var n=m[2];if(typeof p!=="string"&&(typeof p==="undefined"?"undefined":_typeof(p))!=="object"||p===null||Array.isArray(p)){throw new TypeError("Expecting event name to be a string or object.")
}if(typeof p==="string"&&!q){throw new Error("Expecting a callback function to be provided.")
}if(q&&typeof q!=="function"){if((typeof p==="undefined"?"undefined":_typeof(p))==="object"&&(typeof q==="undefined"?"undefined":_typeof(q))==="object"){n=q
}else{throw new TypeError("Expecting callback to be a function.")}}if((typeof p==="undefined"?"undefined":_typeof(p))==="object"){for(var l in p){o.call(this,l,p[l],n)
}}if(typeof p==="string"){p=p.split(" ");p.forEach(function(r){o.call(this,r,q,n)
},this)}};var j=function j(o,p){var l;var m;var n;l=i.call(this)[o];if(!l||l.length===0){return
}l=l.slice();this._stoppedImmediatePropagation=false;for(m=0,n=l.length;m<n;m++){if(this._stoppedImmediatePropagation||p(l[m],m)){break
}}};var b=function b(m,n,o){var l=-1;j.call(this,n,function(q,p){if(q.callback===o){l=p;
return true}});if(l===-1){return}m[n].splice(l,1)};g.on=function(){var l=i.call(this);
a.call(this,arguments,function(n,o,m){l[n]=l[n]||(l[n]=[]);l[n].push({callback:o,context:m})
});return this};g.once=function(){a.call(this,arguments,function(m,o,l){var n=function n(p){o.call(l||this,p);
this.off(m,n)};this.on(m,n,this)});return this};g.off=function(n,p){var m=i.call(this);
if(arguments.length===0){this._events={}}else{if(!n||typeof n!=="string"&&(typeof n==="undefined"?"undefined":_typeof(n))!=="object"||Array.isArray(n)){throw new TypeError("Expecting event name to be a string or object.")
}}if((typeof n==="undefined"?"undefined":_typeof(n))==="object"){for(var o in n){b.call(this,m,o,n[o])
}}if(typeof n==="string"){var l=n.split(" ");if(l.length===1){if(p){b.call(this,m,n,p)
}else{m[n]=[]}}else{l.forEach(function(q){m[q]=[]})}}return this};g.trigger=function(m,n,l){if(!m){throw new Error("trigger method requires an event name")
}if(typeof m!=="string"){throw new TypeError("Expecting event names to be a string.")
}if(l&&typeof l!=="boolean"){throw new TypeError("Expecting doNotPropagate to be a boolean.")
}m=m.split(" ");m.forEach(function(o){j.call(this,o,function(p){p.callback.call(p.context||this.context||this,n)
}.bind(this));if(!l){j.call(this,h,function(q){var p=o;if(q.prefix){p=q.prefix+p
}q.emitter.trigger(p,n)})}},this);return this};g.propagateTo=function(m,n){var l=i.call(this);
if(!l[h]){this._events[h]=[]}l[h].push({emitter:m,prefix:n})};g.stopPropagatingTo=function(o){var m=i.call(this);
if(!o){m[h]=[];return}var p=m[h];var n=p.length;var l;for(l=0;l<n;l++){if(p[l].emitter===o){p.splice(l,1);
break}}};g.stopImmediatePropagation=function(){this._stoppedImmediatePropagation=true
};g.has=function(l,s,p){var o=i.call(this);var m=o[l];if(arguments.length===0){return Object.keys(o)
}if(!m){return false}if(!s){return m.length>0?true:false}for(var n=0,q=m.length;
n<q;n++){var r=m[n];if(p&&s&&r.context===p&&r.callback===s){return true}else{if(s&&!p&&r.callback===s){return true
}}}return false};c.exports=k},{}],8:[function(b,c,a){(function(d,f){if((typeof a==="undefined"?"undefined":_typeof(a))==="object"&&a){c.exports=f
}else{if(typeof define==="function"&&define.amd){define(f)}else{d.Deferred=f}}})(this,function(){var i={};
var g,o,r,f,n,m,p,k;g={0:"pending",1:"resolved",2:"rejected"};o=function o(x,z){var w,A,y,v,u;
if(this._status!==0){if(console&&console.warn){console.warn("Trying to fulfill more than once.")
}return false}this.data=z;A=this.pending;y=A.length;for(w=0;w<y;w++){v=A[w];if(v[x]){u=v[x](z)
}if((typeof u==="undefined"?"undefined":_typeof(u))==="object"&&u.hasOwnProperty("then")&&u.hasOwnProperty("status")){u.then(function(B){v.deferred.resolve(B)
},function(B){v.deferred.reject(B)},function(B){v.deferred.progress(B)})}else{v.deferred[x](u||undefined)
}}if(x!=="progress"){A=[]}return true};m=function m(v,u){this.then=v;this.status=u
};p=m.prototype;k=function k(u){return u};p.success=function(v,u){return this.then(v.bind(u),k,k)
};p.fail=function(v,u){return this.then(k,v.bind(u),k)};p.progress=function(v,u){return this.then(k,k,v.bind(u))
};f=function f(u){if(typeof u!=="function"){return function(){}}return u};r=function r(w,v,u){this.resolve=f(w);
this.reject=f(v);this.progress=f(u);this.deferred=new n()};n=function n(){this.pending=[];
this._status=0;this._promise=new m(this.then.bind(this),this.status.bind(this))
};n.prototype={status:function h(){return g[this._status]},promise:function t(){return this._promise
},progress:function d(u){o.call(this,"progress",u);return this._promise},resolve:function q(u){o.call(this,"resolve",u);
if(this._status===0){this._status=1}return this._promise},reject:function s(u){o.call(this,"reject",u);
if(this._status===0){this._status=2}return this._promise},then:function j(y,w,v){var u,x;
x=new r(y,w,v);if(this._status===0){this.pending.push(x)}else{if(this._status===1&&typeof y==="function"){u=y(this.data);
if((typeof u==="undefined"?"undefined":_typeof(u))==="object"&&u.hasOwnProperty("then")&&u.hasOwnProperty("status")){u.then(function(z){x.deferred.resolve(z)
},function(z){x.deferred.reject(z)},function(z){x.deferred.progress(z)})}else{x.deferred.resolve(u)
}}else{if(this._status===2&&typeof w==="function"){u=w(this.data);x.deferred.reject(u)
}}}return x.deferred.promise()}};var l=function l(){var w,v,y,x,u;w=[].slice.call(arguments);
v=new n();y=0;x=function x(A){y--;var z=w.indexOf(this);w[z]=A;if(y===0){v.resolve(w)
}};u=function u(z){v.reject(z)};w.forEach(function(z){if(z.then){y++}});w.forEach(function(z){if(z.then){z.then(x.bind(z),u)
}});return v.promise()};n.when=l;i.Deferred=n;return i}())},{}],9:[function(c,b,d){function g(){}g.prototype={resolve:function h(){this._defer.resolve.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},reject:function j(){this._defer.reject.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},progress:function a(){var k="ac-defer.progress is deprecated since it is not part of the A+ spec. Recommend using ac-event-emitter for progress signaling";
console.warn(k);this._defer.progress.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},then:function f(){this._defer.then.apply(this._defer,Array.prototype.slice.call(arguments));
return this.promise()},promise:function i(){return this._defer.promise.apply(this._defer,Array.prototype.slice.call(arguments))
}};b.exports=g},{}],10:[function(c,d,a){var h=new (c("./ac-deferred/Deferred"))(),g=c("smartsign-deferred").Deferred;
function b(){this._defer=new g()}b.prototype=h;d.exports.join=function i(){return g.when.apply(null,[].slice.call(arguments))
};d.exports.all=function f(j){return g.when.apply(null,j)};d.exports.Deferred=b
},{"./ac-deferred/Deferred":9,"smartsign-deferred":8}],11:[function(b,c,a){b("@marcom/ac-polyfills");
c.exports.Asset=b("./ac-asset-loader/AssetLoader/Asset");c.exports.Asset.Ajax=b("./ac-asset-loader/AssetLoader/Asset/Ajax");
c.exports.Asset.Ajax.JSON=b("./ac-asset-loader/AssetLoader/Asset/Ajax/JSON");c.exports.Asset.Img=b("./ac-asset-loader/AssetLoader/Asset/Img");
c.exports.Asset.Video=b("./ac-asset-loader/AssetLoader/Asset/Video");c.exports.Asset.Binary=b("./ac-asset-loader/AssetLoader/Asset/Binary");
c.exports.Asset.Binary.Chunk=b("./ac-asset-loader/AssetLoader/Asset/Binary/Chunk");
c.exports.AssetLoader=b("./ac-asset-loader/AssetLoader");c.exports.AssetLoader.Queue=b("./ac-asset-loader/AssetLoader/Queue")
},{"./ac-asset-loader/AssetLoader":12,"./ac-asset-loader/AssetLoader/Asset":13,"./ac-asset-loader/AssetLoader/Asset/Ajax":14,"./ac-asset-loader/AssetLoader/Asset/Ajax/JSON":15,"./ac-asset-loader/AssetLoader/Asset/Binary":16,"./ac-asset-loader/AssetLoader/Asset/Binary/Chunk":17,"./ac-asset-loader/AssetLoader/Asset/Img":18,"./ac-asset-loader/AssetLoader/Asset/Video":21,"./ac-asset-loader/AssetLoader/Queue":22,"@marcom/ac-polyfills":398}],12:[function(b,a,h){var j;
var g=b("@marcom/ac-object");var o=b("@marcom/ac-event-emitter").EventEmitter;var n=b("./AssetLoader/Asset/Ajax");
var f=b("./AssetLoader/Asset/Ajax/JSON");var i=b("./AssetLoader/Asset/Img");var m=b("./AssetLoader/Asset/Video");
var l=b("../utils/destroy");var c=b("./AssetLoader/Queue");var d={};function k(r,p){this.options=g.defaults(d,p||{});
var q=this._generateAssets(r);this._timeoutDuration=this.options.timeout;this._timeout=null;
this._proxyListeners();this.add(q,this.options)}j=k.prototype=new o();j.load=function(){if(this._timeoutDuration){this._timeout=window.setTimeout(this._onTimeout.bind(this),this._timeoutDuration)
}return this._queue.start()};j._clearTimeout=function(){window.clearTimeout(this._timeout);
this._timeout=null};j.pause=function(){this._clearTimeout();return this._queue.pause()
};j.destroy=function(){l(this,true)};j.add=function(p){if(!Array.isArray(p)){p=[p]
}p=this._generateAssets(p);if(!this._queue||this._queue.loaded){if(this._queue){this._queue.destroy()
}this._queue=new c(p,this.options);this._bindQueueListeners();return}this._queue.add(p)
};j._onTimeout=function(){this._queue.abort();this._queue.destroy();this.trigger("timeout")
};j._generateAssets=function(q){if(this._boundGenerateAsset===undefined){this._boundGenerateAsset=this._generateAsset.bind(this)
}q=[].concat(q);var p=q.map(this._boundGenerateAsset);return p};j._generateAsset=function(q,p){if(k.isValidAsset(q)){q.index=p;
return q}if(typeof q!=="string"||q===""){return null}if(!!q.match(/\.json$/)){return new f(q,p)
}if(!!q.match(/\.(xml|txt)$/)){return new n(q,p)}return new i(q,p)};j._proxyListeners=function(){this._boundOnResolved=this._onResolved.bind(this);
this._boundOnRejected=this._onRejected.bind(this);this._boundOnProgress=this._onProgress.bind(this)
};j._bindQueueListeners=function(){this._queue.on("resolved",this._boundOnResolved);
this._queue.on("rejected",this._boundOnRejected);this._queue.on("progress",this._boundOnProgress)
};j._onResolved=function(p){this._clearTimeout();this.trigger("loaded",p)};j._onRejected=function(p){this.trigger("error",p)
};j._onProgress=function(p){this.trigger("progress",p)};k.isValidAsset=function(p){return !!(p&&typeof p.load==="function"&&typeof p.destroy==="function")
};k.isValidAssetLoader=function(p){return !!(p&&typeof p.load==="function"&&typeof p.pause==="function"&&typeof p.destroy==="function")
};a.exports=k},{"../utils/destroy":23,"./AssetLoader/Asset/Ajax":14,"./AssetLoader/Asset/Ajax/JSON":15,"./AssetLoader/Asset/Img":18,"./AssetLoader/Asset/Video":21,"./AssetLoader/Queue":22,"@marcom/ac-event-emitter":6,"@marcom/ac-object":339}],13:[function(d,g,b){var i;
var c=d("ac-deferred").Deferred;var h=d("@marcom/ac-event-emitter").EventEmitter;
var f=d("../../utils/destroy");function a(k,j){this.src=k;this.index=j;this.data=null;
this._boundOnLoad=this._onLoad.bind(this);this._boundOnError=this._onError.bind(this)
}i=a.prototype=new h();i.load=function(){this._load()};i.destroy=function(){f(this)
};i._load=function(){this.data={src:this.src};window.setTimeout(this._onLoad.bind(this),20)
};i._onLoad=function(){this.trigger("loaded",this)};i._onError=function(){this.trigger("error",this.data)
};g.exports=a},{"../../utils/destroy":23,"@marcom/ac-event-emitter":6,"ac-deferred":10}],14:[function(d,g,b){var i;
var c=d("@marcom/ac-ajax");var a=d("@marcom/ac-object");var h=d("../Asset");function f(k,j){h.apply(this,arguments)
}i=f.prototype=a.create(h.prototype);i._load=function(){c.get({url:this.src}).then(this._boundOnLoad,this._boundOnError)
};i._onLoad=function(j){this.data=j.response;h.prototype._onLoad.call(this)};g.exports=f
},{"../Asset":13,"@marcom/ac-ajax":1,"@marcom/ac-object":339}],15:[function(c,d,b){var g;
var a=c("@marcom/ac-object");var f=c("../Ajax");function h(i){f.apply(this,arguments)
}g=h.prototype=a.create(f.prototype);g._onLoad=function(j){try{f.prototype._onLoad.call(this,{response:JSON.parse(j.response||j.responseText)})
}catch(i){this._onError(i)}};d.exports=h},{"../Ajax":14,"@marcom/ac-object":339}],16:[function(b,a,f){var k=b("@marcom/ac-ajax");
var d=b("@marcom/ac-object");var j=b("./Binary/Chunk");var i=b("./../Asset");var c={chunkSize:1024*1024};
function g(m,l){i.apply(this,arguments);this.options=d.defaults(c,l||{});this._totalSize=null;
this._rangeObjects={};this._contentType=null;this._request=null;this._numLoaded=0;
this._numRanges=0}var h=g.prototype=d.create(i.prototype);h.pause=function(){var l;
if(this._request!==null){this._request.xhr.abort()}for(l in this._rangeObjects){if(this._rangeObjects[l].isLoaded()===false){this._rangeObjects[l].pause()
}}};h._load=function(){if(this._boundQueueRangeRequests===undefined){this._boundQueueRangeRequests=this._queueRangeRequests.bind(this)
}if(this._totalSize===null){this._getMetaData().then(this._boundQueueRangeRequests)
}else{this._queueRangeRequests()}};h._getOrCreateRangeObject=function(n){var m=this._rangeObjects[n.toString()];
var l;var o;if(m===undefined){l=this.options.chunkSize-1;o=n+l;if(o>this._totalSize){l=null
}m=this._rangeObjects[n.toString()]=new j(this.src,{start:n,length:l});this._numRanges+=1
}return m};h._onRangeLoad=function(){this._numLoaded+=1;if(this._numLoaded===this._numRanges){this._afterAllChunksLoaded()
}};h._queueRangeRequests=function(){var p;var o=[];var q;var l;var m;for(var n=0;
n<this._totalSize;n+=this.options.chunkSize){m=this._getOrCreateRangeObject(n);
m.on("loaded",this._onRangeLoad,this);m.load()}};h._afterAllChunksLoaded=function(){var l;
var n=[];for(var m in this._rangeObjects){n.push(this._rangeObjects[m].data)}l=new Blob(n,{type:this._contentType});
this.trigger("loaded",l)};h._afterHeadRequest=function(l){this._totalSize=parseInt(l.getResponseHeader(["Content-Length"]));
this._contentType=l.getResponseHeader(["Content-Type"]);this._request=null};h._getMetaData=function(){if(!this._boundAfterHeadRequest){this._boundAfterHeadRequest=this._afterHeadRequest.bind(this)
}this._request=k.create({method:"HEAD",url:this.src,timeout:2*1000});return this._request.send().then(this._boundAfterHeadRequest,this._boundOnError)
};a.exports=g},{"./../Asset":13,"./Binary/Chunk":17,"@marcom/ac-ajax":1,"@marcom/ac-object":339}],17:[function(b,a,f){var g;
var j=b("@marcom/ac-ajax");var d=b("@marcom/ac-object");var h=b("../../Asset");
var c={start:0,length:null};function i(l,k){h.apply(this,arguments);this.options=d.defaults(c,k||{});
this._request=null;this.data=null}g=i.prototype=d.create(h.prototype);g.pause=function(){if(this._request!==null){this._request.xhr.abort();
this._request=null}};g.isLoaded=function(){return this.data!==null};g._load=function(){this._request=j.create({url:this.src+"?"+this._buildQueryString(),method:"get",timeout:30*1000,headers:[{name:"Range",value:this._buildRangeString()}]});
this._request.xhr.responseType="arraybuffer";this._request.send().then(this._boundOnLoad)
};g._onLoad=function(k){this.data=k.response;this._request=null;h.prototype._onLoad.call(this,this.data)
};g._buildRangeString=function(){var k="bytes="+this.options.start+"-";if(this.options.length!==null){k+=this.options.start+this.options.length
}return k};g._buildQueryString=function(){var k=this.options.start.toString();if(this.options.length!==undefined){k+=this.options.start+this.options.length
}return k};a.exports=i},{"../../Asset":13,"@marcom/ac-ajax":1,"@marcom/ac-object":339}],18:[function(c,d,b){var g;
var a=c("@marcom/ac-object");var f=c("../Asset");function h(j,i){f.apply(this,arguments)
}g=h.prototype=a.create(f.prototype);g._load=function(){var i=new Image();this.data=i;
this._boundOnLoad=this._onLoad.bind(this);i.onload=this._boundOnLoad;i.onerror=this._boundOnError;
i.src=this.src};d.exports=h},{"../Asset":13,"@marcom/ac-object":339}],19:[function(d,a,h){var k=d("@marcom/ac-ajax").Ajax,g=d("@marcom/ac-object"),j=d("./SplitFile/Chunk"),b=d("../Asset");
var i;var f={splitManifestTimeout:5000,splitChunkTimeout:null};var c=function c(m,l){b.apply(this,arguments);
if(m.lastIndexOf("/")!==m.length-1){m=m+"/"}this.options=g.extend(f,l||{});this._manifestPath=m+"manifest.json";
this._ajax=new k();this._request=null;this._chunksLoaded=0;this._chunksLen=null;
this._chunks=[];this._boundOnManifestLoaded=this._onManifestLoaded.bind(this)};
i=c.prototype=g.create(b.prototype);i._load=function(){var l={method:"get",url:this._manifestPath,timeout:this.options.manifestTimeout};
this._request=this._ajax.create(l);this._request.send().then(this._boundOnManifestLoaded)
};i._onManifestLoaded=function(p){this._manifest=JSON.parse(p.responseText);this._chunksLen=this._manifest.files.length;
var n,o=this._manifest.files,m,l=this._chunksLen;for(n=0;n<l;n++){m=this._getOrCreateChunkObject(o[n],n);
m.once("loaded",this._onChunkLoaded,this);m.load()}this._request=null;this._ajax=null
};i._getOrCreateChunkObject=function(n,l){var o=this.options.splitChunkTimeout?{timeout:this.options.splitChunkTimeout}:null;
if(!this._chunks[l]){var q=n.path;if(!q.match(/(^http(s?))/)){q=this.src+"/"+q}else{if(!!this.src.match(/(^http(s?))/)){var p=q.indexOf("/",10);
var m=this.src.indexOf("/",10);q=this.src.substring(0,m)+q.substring(p)}}this._chunks[l]=new j(q,o)
}return this._chunks[l]};i._onChunkLoaded=function(){this._chunksLoaded++;if(this._chunksLoaded===this._chunksLen){var n,l=this._chunks.length,m=[];
for(n=0;n<l;n++){m.push(this._chunks[n].data);this._chunks[n].off()}this.data=new Blob(m,{type:this._manifest.mimeType});
m=this._chunks=null;this.trigger("loaded",this.data)}};i.pause=function(){if(this._request!==null){if(this._request.xhr!==null){this._request.xhr.abort()
}this._request=null}this.data=null;this._chunks=null};a.exports=c},{"../Asset":13,"./SplitFile/Chunk":20,"@marcom/ac-ajax":1,"@marcom/ac-object":339}],20:[function(c,a,g){var h;
var j=c("@marcom/ac-ajax");var f=c("@marcom/ac-object");var b=c("../../Asset");
var d={timeout:30*1000};function i(l,k){b.apply(this,arguments);this.options=f.extend(d,k||{});
this._request=null;this.data=null}h=i.prototype=f.create(b.prototype);h.pause=function(){if(this._request!==null){this._request.xhr.abort();
this._request=null}};h.isLoaded=function(){return this.data!==null};h._load=function(){this._request=j.create({url:this.src,method:"get",timeout:this.options.timeout});
this._request.xhr.responseType="arraybuffer";this._request.send().then(this._boundOnLoad)
};h._onLoad=function(k){this.data=k.response;this._request=null;b.prototype._onLoad.call(this,this.data)
};a.exports=i},{"../../Asset":13,"@marcom/ac-ajax":1,"@marcom/ac-object":339}],21:[function(c,a,h){var j;
var g=c("@marcom/ac-feature");var f=c("@marcom/ac-object");var i=c("./Binary");
var k=c("../Asset");var b=c("./SplitFile");var d={chunkSize:1024*1024,split:false};
function l(n,m){k.apply(this,arguments);this.options=f.defaults(d,m||{});this._binary=this.options.binary||this._createAssetType()
}j=l.prototype=f.create(k.prototype);j._canUseBlob=function(){return window.Blob!==undefined&&window.URL!==undefined&&typeof window.URL.createObjectURL==="function"&&g.isDesktop()===true
};j._createAssetType=function(){if(this._canUseBlob()){if(this.options.split){return new b(this.src,this.options)
}return new i(this.src,this.options)}};j._load=function(){this._binary.on("loaded",this._boundOnLoad);
this._binary.on("error",this._boundOnError);this._binary.load()};j._onLoad=function(n){var m=n;
if(n instanceof window.Blob){m=this.options.element;if(!m){m=document.createElement("video")
}if(m.getAttribute("type")!==n.type){m.setAttribute("type",n.type)}m.src=window.URL.createObjectURL(n)
}k.prototype._onLoad.call(this,m)};j.pause=function(){this._binary.pause()};j.destroy=function(){this._binary.destroy();
k.prototype.destroy.call(this)};a.exports=l},{"../Asset":13,"./Binary":16,"./SplitFile":19,"@marcom/ac-feature":163,"@marcom/ac-object":339}],22:[function(b,a,g){var h;
var f=b("@marcom/ac-object");var i=b("ac-deferred").Deferred;var k=b("@marcom/ac-event-emitter").EventEmitter;
var j=b("../../utils/destroy");var d={threads:4};function c(m,l){this.options=f.defaults(d,l||{});
this._queue=m;this._active=[];this._allowedThreads=this.options.threads;this._availableThreads=this._allowedThreads;
this._deferred=new i();this._data=[];this.paused=true;this.loaded=false;this.promise=this._deferred.promise()
}h=c.prototype=new k();h.start=function(){var m=this._availableThreads;var l;this.paused=false;
if(m>this._queue.length){m=this._queue.length}for(l=1;l<=m;l++){this._startNewThread()
}return this.promise};h.pause=function(){this.paused=true;var l=[];this._active.forEach(function(n,m){if(typeof n.pause==="function"){this._queue.unshift(n);
this._releaseThread();n.off("loaded");n.off("error");n.pause();l.push(m)}},this);
l.forEach(function(m){this._active.splice(m,1)},this)};h.add=function(l){this._queue=this._queue.concat(l)
};h.destroy=function(){this.pause();j(this)};h._startNewThread=function(){var m=this._queue.shift();
this._occupyThread();if(m&&typeof m.load==="function"){var l=function l(o){this._onProgress(o);
this._active.splice(this._active.indexOf(m),1);m.off("error",n)};var n=function n(o){this._onError();
m.off("loaded",l)};m.once("loaded",l,this);m.once("error",n,this);m.load()}else{this._onError()
}this._active.push(m)};h._onResolved=function(){if(this._errored){return false}this._deferred.resolve(this._data);
this.trigger("resolved",this._data)};h._onError=function(l){if(this._errored){return false
}this._errored=true;this._deferred.reject(l);this.trigger("rejected",l)};h.abort=function(){this._deferred.reject()
};h._onProgress=function(l){if(this._errored){return false}this._releaseThread();
this._data[l.index]=l.data;this.trigger("progress",l.data);if(this._queue.length<=0){if(this._availableThreads>=this._allowedThreads){this._onResolved()
}}else{if(!this.paused&&!this._errored){this._startNewThread()}}};h._occupyThread=function(){this._availableThreads--;
if(this._availableThreads<0){throw"AssetLoader.Queue: Available thread count cannot be negative."
}};h._releaseThread=function(){this._availableThreads++;if(this._availableThreads>this._allowedThreads){throw"AssetLoader.Queue: Available thread count cannot be more than allowed thread amount."
}};a.exports=c},{"../../utils/destroy":23,"@marcom/ac-event-emitter":6,"@marcom/ac-object":339,"ac-deferred":10}],23:[function(b,d,a){d.exports=function c(f,g){if(typeof f.off==="function"){f.off()
}function h(j){var i=true;for(var k in j){if(j.hasOwnProperty(k)){if(j[k]!==null){i=false;
break}}}return i}window.setTimeout(function(){var i;for(i in f){if(f.hasOwnProperty(i)){if(g&&f[i]&&typeof f[i].destroy==="function"&&!h(f[i])){f[i].destroy()
}f[i]=null}}})}},{}],24:[function(b,c,a){c.exports={path:b("./ac-path/path")}},{"./ac-path/path":25}],25:[function(b,c,a){function d(f){return d.parse(f)
}d.basename=function(g,f){d._assertStr(g);var i;var h=g.match(/[^/]*$/)[0];if(f){i=h.match(new RegExp("(.*)"+f+"$"));
if(i){h=i[1]}}return h};d.dirname=function(g){d._assertStr(g);var f=g.match(/^(.*)\b\/|.*/);
return f[1]||g};d.extname=function(f){d._assertStr(f);var g=f.match(/\.[^.]*$/);
return g?g[0]:""};d.filename=function(f){d._assertStr(f);return d.basename(f,d.extname(f))
};d.format=function(g,h){d._assertObj(g);var f=g.dirname?g.dirname+"/":"";if(g.basename){f+=g.basename
}else{if(g.filename){f+=g.filename;if(g.extname){f+=g.extname}}}if(h){if(typeof h==="string"){f+="?"+h
}else{if(Object.prototype.toString.call(h)===Object.prototype.toString.call([])){f+="?"+h.join("&")
}}}return f};d.isAbsolute=function(f){d._assertStr(f);return !!f.match(/(^http(s?))/)
};d.isRootRelative=function(f){d._assertStr(f);return !!f.match(/^\/(?!\/)/)};d.parse=function(f){d._assertStr(f);
return{dirname:d.dirname(f),basename:d.basename(f),filename:d.filename(f),extname:d.extname(f)}
};d._assertStr=function(f){d._assertType(f,"string")};d._assertObj=function(f){d._assertType(f,"object")
};d._assertType=function(h,f){var g=typeof h==="undefined"?"undefined":_typeof(h);
if(g==="undefined"||g!==f){throw new TypeError("path param must be of type "+f)
}};c.exports=d},{}],26:[function(b,c,a){c.exports={cname:b("./ac-cname/cname")}
},{"./ac-cname/cname":27}],27:[function(c,d,a){var f=c("ac-path").path;function b(g){return b.addPrefix(g)
}b._prefix=function(){var g="https://images.apple.com/global/elements/blank.gif";return g.replace(/global\/.*/,"")
}();b.addPrefix=function(g){if(f.isAbsolute(g)){return g}b._assertRootRelative(g);
g=b._prefix+g.replace(/^\//,"");if(g.indexOf("/105/")>0){g=g.replace("/105/","/")
}return g};b.formatUrl=function(j,g,l,k){var i=f.format({dirname:j,filename:g,extname:l},k);
if(f.isAbsolute(i)){return i}b._assertRootRelative(j);var h=b.addPrefix(i);return h
};b._assertRootRelative=function(g){if(!f.isRootRelative(g)){throw new URIError("Only root-relative paths are currently supported")
}};d.exports=b},{"ac-path":24}],28:[function(c,d,b){d.exports=function a(f,h){var g;
if(h){g=f.getBoundingClientRect();return{width:g.width,height:g.height}}return{width:f.offsetWidth,height:f.offsetHeight}
}},{}],29:[function(f,g,d){var c=f("./getDimensions");var b=f("./getScrollX");var a=f("./getScrollY");
g.exports=function h(i,n){var k;var m;var l;var j;if(n){k=i.getBoundingClientRect();
m=b();l=a();return{top:k.top+l,right:k.right+m,bottom:k.bottom+l,left:k.left+m}
}j=c(i,n);k={top:i.offsetTop,left:i.offsetLeft,width:j.width,height:j.height};while(i=i.offsetParent){k.top+=i.offsetTop;
k.left+=i.offsetLeft}return{top:k.top,right:k.left+k.width,bottom:k.top+k.height,left:k.left}
}},{"./getDimensions":28,"./getScrollX":30,"./getScrollY":31}],30:[function(c,d,b){d.exports=function a(f){f=f||window;
if(f===window){return window.scrollX||window.pageXOffset}return f.scrollLeft}},{}],31:[function(c,d,b){d.exports=function a(f){f=f||window;
if(f===window){return window.scrollY||window.pageYOffset}return f.scrollTop}},{}],32:[function(d,f,c){var b=d("./shared/stylePropertyCache");
var h=d("./getStyleProperty");var g=d("./getStyleValue");f.exports=function a(k,j){var i;
k=h(k);if(!k){return false}i=b[k].css;if(typeof j!=="undefined"){j=g(k,j);if(j===false){return false
}i+=":"+j+";"}return i}},{"./getStyleProperty":33,"./getStyleValue":34,"./shared/stylePropertyCache":37}],33:[function(f,d,h){var a=f("./shared/stylePropertyCache");
var i=f("./shared/getStyleTestElement");var b=f("./utils/toCSS");var k=f("./utils/toDOM");
var j=f("./shared/prefixHelper");var c=function c(o,l){var m=b(o);var n=l===false?false:b(l);
a[o]=a[l]=a[m]=a[n]={dom:l,css:n};return l};d.exports=function g(p){var n;var l;
var o;var m;p+="";if(p in a){return a[p].dom}o=i();p=k(p);l=p.charAt(0).toUpperCase()+p.substring(1);
if(p==="filter"){n=["WebkitFilter","filter"]}else{n=(p+" "+j.dom.join(l+" ")+l).split(" ")
}for(m=0;m<n.length;m++){if(typeof o.style[n[m]]!=="undefined"){if(m!==0){j.reduce(m-1)
}return c(p,n[m])}}return c(p,false)}},{"./shared/getStyleTestElement":35,"./shared/prefixHelper":36,"./shared/stylePropertyCache":37,"./utils/toCSS":40,"./utils/toDOM":41}],34:[function(d,b,h){var f=d("./getStyleProperty");
var k=d("./shared/styleValueAvailable");var j=d("./shared/prefixHelper");var a=d("./shared/stylePropertyCache");
var i={};var l=/(\([^\)]+\))/gi;var g=/([^ ,;\(]+(\([^\)]+\))?)/gi;b.exports=function c(o,n){var m;
n+="";o=f(o);if(!o){return false}if(k(o,n)){return n}m=a[o].css;n=n.replace(g,function(q){var p;
var t;var s;var r;if(q[0]==="#"||!isNaN(q[0])){return q}t=q.replace(l,"");s=m+":"+t;
if(s in i){if(i[s]===false){return""}return q.replace(t,i[s])}p=j.css.map(function(u){return u+q
});p=[q].concat(p);for(r=0;r<p.length;r++){if(k(o,p[r])){if(r!==0){j.reduce(r-1)
}i[s]=p[r].replace(l,"");return p[r]}}i[s]=false;return""});n=n.trim();return n===""?false:n
}},{"./getStyleProperty":33,"./shared/prefixHelper":36,"./shared/stylePropertyCache":37,"./shared/styleValueAvailable":38}],35:[function(c,d,b){var f;
d.exports=function a(){if(!f){f=document.createElement("_")}else{f.style.cssText="";
f.removeAttribute("style")}return f};d.exports.resetElement=function(){f=null}},{}],36:[function(b,d,a){var i=["-webkit-","-moz-","-ms-"];
var f=["Webkit","Moz","ms"];var h=["webkit","moz","ms"];var c=function c(){this.initialize()
};var g=c.prototype;g.initialize=function(){this.reduced=false;this.css=i;this.dom=f;
this.evt=h};g.reduce=function(j){if(!this.reduced){this.reduced=true;this.css=[this.css[j]];
this.dom=[this.dom[j]];this.evt=[this.evt[j]]}};d.exports=new c()},{}],37:[function(b,c,a){c.exports={}
},{}],38:[function(c,b,d){var a=c("./stylePropertyCache");var f=c("./getStyleTestElement");
var i=false;var k;var j;var g=function g(){var l;if(!i){i=true;k="CSS" in window&&"supports" in window.CSS;
j=false;l=f();try{l.style.width="invalid"}catch(m){j=true}}};b.exports=function h(o,n){var m;
var l;g();if(k){o=a[o].css;return CSS.supports(o,n)}l=f();m=l.style[o];if(j){try{l.style[o]=n
}catch(p){return false}}else{l.style[o]=n}return l.style[o]&&l.style[o]!==m};b.exports.resetFlags=function(){i=false
}},{"./getStyleTestElement":35,"./stylePropertyCache":37}],39:[function(c,d,a){var b=/(-webkit-|-moz-|-ms-)|^(webkit|moz|ms)/gi;
d.exports=function f(g){g=String.prototype.replace.call(g,b,"");return g.charAt(0).toLowerCase()+g.substring(1)
}},{}],40:[function(c,d,b){var f=/^(webkit|moz|ms)/gi;d.exports=function a(h){var g;
if(h.toLowerCase()==="cssfloat"){return"float"}if(f.test(h)){h="-"+h}return h.replace(/([A-Z]+)([A-Z][a-z])/g,"$1-$2").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()
}},{}],41:[function(b,c,a){var f=/-([a-z])/g;c.exports=function d(h){var g;if(h.toLowerCase()==="float"){return"cssFloat"
}h=h.replace(f,function(j,i){return i.toUpperCase()});if(h.substr(0,2)==="Ms"){h="ms"+h.substring(2)
}return h}},{}],42:[function(b,c,a){c.exports={getStyle:b("./getStyle"),setStyle:b("./setStyle")}
},{"./getStyle":43,"./setStyle":45}],43:[function(c,d,b){var f=c("@marcom/ac-prefixer/getStyleProperty");
var g=c("@marcom/ac-prefixer/stripPrefixes");d.exports=function a(){var k=Array.prototype.slice.call(arguments);
var p=k.shift(k);var m=window.getComputedStyle(p);var l={};var o;var h;var n;var j;
if(typeof k[0]!=="string"){k=k[0]}for(j=0;j<k.length;j++){o=k[j];h=f(o);if(h){o=g(h);
n=m[h];if(!n||n==="auto"){n=null}if(n){n=g(n)}}else{n=null}l[o]=n}return l}},{"@marcom/ac-prefixer/getStyleProperty":33,"@marcom/ac-prefixer/stripPrefixes":39}],44:[function(c,d,b){d.exports=function a(j){var h;
var g;var f;if(!j&&j!==0){return""}if(Array.isArray(j)){return j+""}if((typeof j==="undefined"?"undefined":_typeof(j))==="object"){h="";
g=Object.keys(j);for(f=0;f<g.length;f++){h+=g[f]+"("+j[g[f]]+") "}return h.trim()
}return j}},{}],45:[function(d,f,c){var a=d("@marcom/ac-prefixer/getStyleCSS");
var g=d("@marcom/ac-prefixer/getStyleProperty");var b=d("./internal/normalizeValue");
f.exports=function h(o,l){var k="";var j;var n;var i;var m;var p;if((typeof l==="undefined"?"undefined":_typeof(l))!=="object"){throw new TypeError("setStyle: styles must be an Object")
}for(n in l){m=b(l[n]);if(!m&&m!==0){i=g(n);if("removeAttribute" in o.style){o.style.removeAttribute(i)
}else{o.style[i]=""}}else{j=a(n,m);if(j!==false){k+=" "+j}}}if(k.length){p=o.style.cssText;
if(p.charAt(p.length-1)!==";"){p+=";"}p+=k;o.style.cssText=p}return o}},{"./internal/normalizeValue":44,"@marcom/ac-prefixer/getStyleCSS":32,"@marcom/ac-prefixer/getStyleProperty":33}],46:[function(b,c,a){c.exports=8
},{}],47:[function(b,c,a){c.exports=11},{}],48:[function(b,c,a){c.exports=9},{}],49:[function(b,c,a){c.exports=1
},{}],50:[function(b,c,a){c.exports=3},{}],51:[function(b,c,a){var d=b("../isNode");
c.exports=function f(h,g){if(!d(h)){return false}if(typeof g==="number"){return h.nodeType===g
}return g.indexOf(h.nodeType)!==-1}},{"../isNode":55}],52:[function(i,a,r){var t=i("./isNodeType");
var n=i("../COMMENT_NODE");var k=i("../DOCUMENT_FRAGMENT_NODE");var j=i("../ELEMENT_NODE");
var s=i("../TEXT_NODE");var d=[j,s,n,k];var m=" must be an Element, TextNode, Comment, or Document Fragment";
var l=[j,s,n];var f=" must be an Element, TextNode, or Comment";var q=[j,k];var b=" must be an Element, or Document Fragment";
var o=" must have a parentNode";a.exports={parentNode:function h(u,x,w,v){v=v||"target";
if((u||x)&&!t(u,q)){throw new TypeError(w+": "+v+b)}},childNode:function c(u,x,w,v){v=v||"target";
if(!u&&!x){return}if(!t(u,l)){throw new TypeError(w+": "+v+f)}},insertNode:function g(u,x,w,v){v=v||"node";
if(!u&&!x){return}if(!t(u,d)){throw new TypeError(w+": "+v+m)}},hasParentNode:function p(u,w,v){v=v||"target";
if(!u.parentNode){throw new TypeError(w+": "+v+o)}}}},{"../COMMENT_NODE":46,"../DOCUMENT_FRAGMENT_NODE":47,"../ELEMENT_NODE":49,"../TEXT_NODE":50,"./isNodeType":51}],53:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./DOCUMENT_FRAGMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./DOCUMENT_FRAGMENT_NODE":47,"./internal/isNodeType":51}],54:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./ELEMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./ELEMENT_NODE":49,"./internal/isNodeType":51}],55:[function(b,c,a){c.exports=function d(f){return !!(f&&f.nodeType)
}},{}],56:[function(c,d,b){var f=c("./internal/validate");d.exports=function a(g){f.childNode(g,true,"remove");
if(!g.parentNode){return g}return g.parentNode.removeChild(g)}},{"./internal/validate":52}],57:[function(b,c,a){c.exports=window.Element?function(d){return d.matches||d.matchesSelector||d.webkitMatchesSelector||d.mozMatchesSelector||d.msMatchesSelector||d.oMatchesSelector
}(Element.prototype):null},{}],58:[function(g,a,q){g("@marcom/ac-polyfills/Array/prototype.indexOf");
var m=g("@marcom/ac-dom-nodes/isNode");var o=g("@marcom/ac-dom-nodes/COMMENT_NODE");
var j=g("@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE");var i=g("@marcom/ac-dom-nodes/DOCUMENT_NODE");
var h=g("@marcom/ac-dom-nodes/ELEMENT_NODE");var r=g("@marcom/ac-dom-nodes/TEXT_NODE");
var s=function s(u,t){if(!m(u)){return false}if(typeof t==="number"){return u.nodeType===t
}return t.indexOf(u.nodeType)!==-1};var p=[h,i,j];var b=" must be an Element, Document, or Document Fragment";
var l=[h,r,o];var d=" must be an Element, TextNode, or Comment";var k=" must be a string";
a.exports={parentNode:function f(t,w,v,u){u=u||"node";if((t||w)&&!s(t,p)){throw new TypeError(v+": "+u+b)
}},childNode:function c(t,w,v,u){u=u||"node";if(!t&&!w){return}if(!s(t,l)){throw new TypeError(v+": "+u+d)
}},selector:function n(t,w,v,u){u=u||"selector";if((t||w)&&typeof t!=="string"){throw new TypeError(v+": "+u+k)
}}}},{"@marcom/ac-dom-nodes/COMMENT_NODE":46,"@marcom/ac-dom-nodes/DOCUMENT_FRAGMENT_NODE":47,"@marcom/ac-dom-nodes/DOCUMENT_NODE":48,"@marcom/ac-dom-nodes/ELEMENT_NODE":49,"@marcom/ac-dom-nodes/TEXT_NODE":50,"@marcom/ac-dom-nodes/isNode":55,"@marcom/ac-polyfills/Array/prototype.indexOf":370}],59:[function(d,f,c){var g=d("@marcom/ac-dom-nodes/isElement");
var i=d("./internal/validate");var a=d("./internal/nativeMatches");var h=d("./shims/matchesSelector");
f.exports=function b(k,j){i.selector(j,true,"matchesSelector");if(!g(k)){return false
}if(!a){return h(k,j)}return a.call(k,j)}},{"./internal/nativeMatches":57,"./internal/validate":58,"./shims/matchesSelector":61,"@marcom/ac-dom-nodes/isElement":54}],60:[function(b,c,a){b("@marcom/ac-polyfills/Array/prototype.slice");
var h=b("./internal/validate");var g=b("./shims/querySelectorAll");var f="querySelectorAll" in document;
c.exports=function d(i,j){j=j||document;h.parentNode(j,true,"querySelectorAll","context");
h.selector(i,true,"querySelectorAll");if(!f){return g(i,j)}return Array.prototype.slice.call(j.querySelectorAll(i))
}},{"./internal/validate":58,"./shims/querySelectorAll":62,"@marcom/ac-polyfills/Array/prototype.slice":375}],61:[function(c,d,b){var f=c("../querySelectorAll");
d.exports=function a(l,g){var k=l.parentNode||document;var h=f(g,k);var j;for(j=0;
j<h.length;j++){if(h[j]===l){return true}}return false}},{"../querySelectorAll":60}],62:[function(c,b,f){c("@marcom/ac-polyfills/Array/prototype.indexOf");
var j=c("@marcom/ac-dom-nodes/isElement");var h=c("@marcom/ac-dom-nodes/isDocumentFragment");
var k=c("@marcom/ac-dom-nodes/remove");var d="_ac_qsa_";var i=function i(n,l){var m;
if(l===document){return true}m=n;while((m=m.parentNode)&&j(m)){if(m===l){return true
}}return false};var g=function g(l){if("recalc" in l){l.recalc(false)}else{document.recalc(false)
}window.scrollBy(0,0)};b.exports=function a(l,n){var p=document.createElement("style");
var q=d+(Math.random()+"").slice(-6);var m=[];var o;n=n||document;document[q]=[];
if(h(n)){n.appendChild(p)}else{document.documentElement.firstChild.appendChild(p)
}p.styleSheet.cssText="*{display:recalc;}"+l+'{ac-qsa:expression(document["'+q+'"] && document["'+q+'"].push(this));}';
g(n);while(document[q].length){o=document[q].shift();o.style.removeAttribute("ac-qsa");
if(m.indexOf(o)===-1&&i(o,n)){m.push(o)}}document[q]=null;k(p);g(n);return m}},{"@marcom/ac-dom-nodes/isDocumentFragment":53,"@marcom/ac-dom-nodes/isElement":54,"@marcom/ac-dom-nodes/remove":56,"@marcom/ac-polyfills/Array/prototype.indexOf":370}],63:[function(b,c,a){c.exports={createBezier:b("./ac-easing/createBezier"),createPredefined:b("./ac-easing/createPredefined"),createStep:b("./ac-easing/createStep"),Ease:b("./ac-easing/Ease")}
},{"./ac-easing/Ease":64,"./ac-easing/createBezier":65,"./ac-easing/createPredefined":66,"./ac-easing/createStep":67}],64:[function(b,c,a){var g="Ease expects an easing function.";
function f(i,h){if(typeof i!=="function"){throw new TypeError(g)}this.easingFunction=i;
this.cssString=h||null}var d=f.prototype;d.getValue=function(h){return this.easingFunction(h,0,1,1)
};c.exports=f},{}],65:[function(b,c,a){b("@marcom/ac-polyfills/Array/prototype.every");
var f=b("./Ease");var h=b("./helpers/KeySpline");var d="Bezier curve expects exactly four (4) numbers. Given: ";
c.exports=function g(j,p,i,o){var q=Array.prototype.slice.call(arguments);var m=q.every(function(r){return typeof r==="number"
});if(q.length!==4||!m){throw new TypeError(d+q)}var n=new h(j,p,i,o);var k=function k(t,r,u,s){return n.get(t/s)*u+r
};var l="cubic-bezier("+q.join(", ")+")";return new f(k,l)}},{"./Ease":64,"./helpers/KeySpline":68,"@marcom/ac-polyfills/Array/prototype.every":366}],66:[function(c,a,d){var i=c("./createStep");
var f=c("./helpers/cssAliases");var b=c("./helpers/easingFunctions");var h=c("./Ease");
var g='Easing function "%TYPE%" not recognized among the following: '+Object.keys(b).join(", ");
a.exports=function j(k){var l;if(k==="step-start"){return i(1,"start")}else{if(k==="step-end"){return i(1,"end")
}else{l=b[k]}}if(!l){throw new Error(g.replace("%TYPE%",k))}return new h(l,f[k])
}},{"./Ease":64,"./createStep":67,"./helpers/cssAliases":69,"./helpers/easingFunctions":70}],67:[function(d,f,c){var g=d("./Ease");
var b="Step function expects a numeric value greater than zero. Given: ";var a='Step function direction must be either "start" or "end" (default). Given: ';
f.exports=function h(i,l){l=l||"end";if(typeof i!=="number"||i<1){throw new TypeError(b+i)
}if(l!=="start"&&l!=="end"){throw new TypeError(a+l)}var k=function k(q,m,r,p){var o=r/i;
var n=Math[l==="start"?"floor":"ceil"](q/p*i);return m+o*n};var j="steps("+i+", "+l+")";
return new g(k,j)}},{"./Ease":64}],68:[function(b,c,a){
/*! MIT License
   *
   * KeySpline - use bezier curve for transition easing function
   * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
   *
   * Permission is hereby granted, free of charge, to any person obtaining a
   * copy of this software and associated documentation files (the "Software"),
   * to deal in the Software without restriction, including without limitation
   * the rights to use, copy, modify, merge, publish, distribute, sublicense,
   * and/or sell copies of the Software, and to permit persons to whom the
   * Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
   * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
   * DEALINGS IN THE SOFTWARE.
   */
function d(o,l,n,j){this.get=function(p){if(o===l&&n===j){return p
}return g(k(p),l,j)};function i(p,q){return 1-3*q+3*p}function h(p,q){return 3*q-6*p
}function f(p){return 3*p}function g(r,p,q){return((i(p,q)*r+h(p,q))*r+f(p))*r}function m(r,p,q){return 3*i(p,q)*r*r+2*h(p,q)*r+f(p)
}function k(s){var q=s;for(var r=0;r<4;++r){var t=m(q,o,n);if(t===0){return q}var p=g(q,o,n)-s;
q-=p/t}return q}}c.exports=d},{}],69:[function(c,d,b){var a={linear:"cubic-bezier(0, 0, 1, 1)",ease:"cubic-bezier(0.25, 0.1, 0.25, 1)","ease-in":"cubic-bezier(0.42, 0, 1, 1)","ease-out":"cubic-bezier(0, 0, 0.58, 1)","ease-in-out":"cubic-bezier(0.42, 0, 0.58, 1)","ease-in-cubic":"cubic-bezier(0.55, 0.055, 0.675, 0.19)","ease-out-cubic":"cubic-bezier(0.215, 0.61, 0.355, 1)","ease-in-out-cubic":"cubic-bezier(0.645, 0.045, 0.355, 1)","ease-in-quad":"cubic-bezier(0.55, 0.085, 0.68, 0.53)","ease-out-quad":"cubic-bezier(0.25, 0.46, 0.45, 0.94)","ease-in-out-quad":"cubic-bezier(0.455, 0.03, 0.515, 0.955)","ease-in-quart":"cubic-bezier(0.895, 0.03, 0.685, 0.22)","ease-out-quart":"cubic-bezier(0.165, 0.84, 0.44, 1)","ease-in-out-quart":"cubic-bezier(0.77, 0, 0.175, 1)","ease-in-quint":"cubic-bezier(0.755, 0.05, 0.855, 0.06)","ease-out-quint":"cubic-bezier(0.23, 1, 0.32, 1)","ease-in-out-quint":"cubic-bezier(0.86, 0, 0.07, 1)","ease-in-sine":"cubic-bezier(0.47, 0, 0.745, 0.715)","ease-out-sine":"cubic-bezier(0.39, 0.575, 0.565, 1)","ease-in-out-sine":"cubic-bezier(0.445, 0.05, 0.55, 0.95)","ease-in-expo":"cubic-bezier(0.95, 0.05, 0.795, 0.035)","ease-out-expo":"cubic-bezier(0.19, 1, 0.22, 1)","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","ease-in-circ":"cubic-bezier(0.6, 0.04, 0.98, 0.335)","ease-out-circ":"cubic-bezier(0.075, 0.82, 0.165, 1)","ease-in-out-circ":"cubic-bezier(0.785, 0.135, 0.15, 0.86)","ease-in-back":"cubic-bezier(0.6, -0.28, 0.735, 0.045)","ease-out-back":"cubic-bezier(0.175, 0.885, 0.32, 1.275)","ease-in-out-back":"cubic-bezier(0.68, -0.55, 0.265, 1.55)"};
a.easeIn=a["ease-in"];a.easeOut=a["ease-out"];a.easeInOut=a["ease-in-out"];a.easeInCubic=a["ease-in-cubic"];
a.easeOutCubic=a["ease-out-cubic"];a.easeInOutCubic=a["ease-in-out-cubic"];a.easeInQuad=a["ease-in-quad"];
a.easeOutQuad=a["ease-out-quad"];a.easeInOutQuad=a["ease-in-out-quad"];a.easeInQuart=a["ease-in-quart"];
a.easeOutQuart=a["ease-out-quart"];a.easeInOutQuart=a["ease-in-out-quart"];a.easeInQuint=a["ease-in-quint"];
a.easeOutQuint=a["ease-out-quint"];a.easeInOutQuint=a["ease-in-out-quint"];a.easeInSine=a["ease-in-sine"];
a.easeOutSine=a["ease-out-sine"];a.easeInOutSine=a["ease-in-out-sine"];a.easeInExpo=a["ease-in-expo"];
a.easeOutExpo=a["ease-out-expo"];a.easeInOutExpo=a["ease-in-out-expo"];a.easeInCirc=a["ease-in-circ"];
a.easeOutCirc=a["ease-out-circ"];a.easeInOutCirc=a["ease-in-out-circ"];a.easeInBack=a["ease-in-back"];
a.easeOutBack=a["ease-out-back"];a.easeInOutBack=a["ease-in-out-back"];d.exports=a
},{}],70:[function(d,b,F){var J=d("../createBezier");var w=J(0.25,0.1,0.25,1).easingFunction;
var g=J(0.42,0,1,1).easingFunction;var C=J(0,0,0.58,1).easingFunction;var x=J(0.42,0,0.58,1).easingFunction;
var u=function u(Q,O,R,P){return R*Q/P+O};var h=function h(Q,O,R,P){return R*(Q/=P)*Q+O
};var N=function N(Q,O,R,P){return -R*(Q/=P)*(Q-2)+O};var D=function D(Q,O,R,P){if((Q/=P/2)<1){return R/2*Q*Q+O
}return -R/2*(--Q*(Q-2)-1)+O};var i=function i(Q,O,R,P){return R*(Q/=P)*Q*Q+O};
var a=function a(Q,O,R,P){return R*((Q=Q/P-1)*Q*Q+1)+O};var j=function j(Q,O,R,P){if((Q/=P/2)<1){return R/2*Q*Q*Q+O
}return R/2*((Q-=2)*Q*Q+2)+O};var o=function o(Q,O,R,P){return R*(Q/=P)*Q*Q*Q+O
};var m=function m(Q,O,R,P){return -R*((Q=Q/P-1)*Q*Q*Q-1)+O};var p=function p(Q,O,R,P){if((Q/=P/2)<1){return R/2*Q*Q*Q*Q+O
}return -R/2*((Q-=2)*Q*Q*Q-2)+O};var y=function y(Q,O,R,P){return R*(Q/=P)*Q*Q*Q*Q+O
};var v=function v(Q,O,R,P){return R*((Q=Q/P-1)*Q*Q*Q*Q+1)+O};var z=function z(Q,O,R,P){if((Q/=P/2)<1){return R/2*Q*Q*Q*Q*Q+O
}return R/2*((Q-=2)*Q*Q*Q*Q+2)+O};var c=function c(Q,O,R,P){return -R*Math.cos(Q/P*(Math.PI/2))+R+O
};var L=function L(Q,O,R,P){return R*Math.sin(Q/P*(Math.PI/2))+O};var B=function B(Q,O,R,P){return -R/2*(Math.cos(Math.PI*Q/P)-1)+O
};var G=function G(Q,O,R,P){return Q===0?O:R*Math.pow(2,10*(Q/P-1))+O};var A=function A(Q,O,R,P){return Q===P?O+R:R*(-Math.pow(2,-10*Q/P)+1)+O
};var r=function r(Q,O,R,P){if(Q===0){return O}else{if(Q===P){return O+R}else{if((Q/=P/2)<1){return R/2*Math.pow(2,10*(Q-1))+O
}}}return R/2*(-Math.pow(2,-10*--Q)+2)+O};var l=function l(Q,O,R,P){return -R*(Math.sqrt(1-(Q/=P)*Q)-1)+O
};var f=function f(Q,O,R,P){return R*Math.sqrt(1-(Q=Q/P-1)*Q)+O};var I=function I(Q,O,R,P){if((Q/=P/2)<1){return -R/2*(Math.sqrt(1-Q*Q)-1)+O
}return R/2*(Math.sqrt(1-(Q-=2)*Q)+1)+O};var E=function E(S,Q,U,R){var O=1.70158;
var T=0;var P=U;if(S===0){return Q}else{if((S/=R)===1){return Q+U}}if(!T){T=R*0.3
}if(P<Math.abs(U)){P=U;O=T/4}else{O=T/(2*Math.PI)*Math.asin(U/P)}return -(P*Math.pow(2,10*(S-=1))*Math.sin((S*R-O)*(2*Math.PI)/T))+Q
};var H=function H(S,Q,U,R){var O=1.70158;var T=0;var P=U;if(S===0){return Q}else{if((S/=R)===1){return Q+U
}}if(!T){T=R*0.3}if(P<Math.abs(U)){P=U;O=T/4}else{O=T/(2*Math.PI)*Math.asin(U/P)
}return P*Math.pow(2,-10*S)*Math.sin((S*R-O)*(2*Math.PI)/T)+U+Q};var t=function t(S,Q,U,R){var O=1.70158;
var T=0;var P=U;if(S===0){return Q}else{if((S/=R/2)===2){return Q+U}}if(!T){T=R*(0.3*1.5)
}if(P<Math.abs(U)){P=U;O=T/4}else{O=T/(2*Math.PI)*Math.asin(U/P)}if(S<1){return -0.5*(P*Math.pow(2,10*(S-=1))*Math.sin((S*R-O)*(2*Math.PI)/T))+Q
}return P*Math.pow(2,-10*(S-=1))*Math.sin((S*R-O)*(2*Math.PI)/T)*0.5+U+Q};var s=function s(R,P,S,Q,O){if(O===undefined){O=1.70158
}return S*(R/=Q)*R*((O+1)*R-O)+P};var q=function q(R,P,S,Q,O){if(O===undefined){O=1.70158
}return S*((R=R/Q-1)*R*((O+1)*R+O)+1)+P};var k=function k(R,P,S,Q,O){if(O===undefined){O=1.70158
}if((R/=Q/2)<1){return S/2*(R*R*(((O*=1.525)+1)*R-O))+P}return S/2*((R-=2)*R*(((O*=1.525)+1)*R+O)+2)+P
};var K=function K(Q,O,R,P){if((Q/=P)<1/2.75){return R*(7.5625*Q*Q)+O}else{if(Q<2/2.75){return R*(7.5625*(Q-=1.5/2.75)*Q+0.75)+O
}else{if(Q<2.5/2.75){return R*(7.5625*(Q-=2.25/2.75)*Q+0.9375)+O}}}return R*(7.5625*(Q-=2.625/2.75)*Q+0.984375)+O
};var n=function n(Q,O,R,P){return R-K(P-Q,0,R,P)+O};var M=function M(Q,O,R,P){if(Q<P/2){return n(Q*2,0,R,P)*0.5+O
}return K(Q*2-P,0,R,P)*0.5+R*0.5+O};b.exports={linear:u,ease:w,easeIn:g,"ease-in":g,easeOut:C,"ease-out":C,easeInOut:x,"ease-in-out":x,easeInCubic:i,"ease-in-cubic":i,easeOutCubic:a,"ease-out-cubic":a,easeInOutCubic:j,"ease-in-out-cubic":j,easeInQuad:h,"ease-in-quad":h,easeOutQuad:N,"ease-out-quad":N,easeInOutQuad:D,"ease-in-out-quad":D,easeInQuart:o,"ease-in-quart":o,easeOutQuart:m,"ease-out-quart":m,easeInOutQuart:p,"ease-in-out-quart":p,easeInQuint:y,"ease-in-quint":y,easeOutQuint:v,"ease-out-quint":v,easeInOutQuint:z,"ease-in-out-quint":z,easeInSine:c,"ease-in-sine":c,easeOutSine:L,"ease-out-sine":L,easeInOutSine:B,"ease-in-out-sine":B,easeInExpo:G,"ease-in-expo":G,easeOutExpo:A,"ease-out-expo":A,easeInOutExpo:r,"ease-in-out-expo":r,easeInCirc:l,"ease-in-circ":l,easeOutCirc:f,"ease-out-circ":f,easeInOutCirc:I,"ease-in-out-circ":I,easeInBack:s,"ease-in-back":s,easeOutBack:q,"ease-out-back":q,easeInOutBack:k,"ease-in-out-back":k,easeInElastic:E,"ease-in-elastic":E,easeOutElastic:H,"ease-out-elastic":H,easeInOutElastic:t,"ease-in-out-elastic":t,easeInBounce:n,"ease-in-bounce":n,easeOutBounce:K,"ease-out-bounce":K,easeInOutBounce:M,"ease-in-out-bounce":M}
},{"../createBezier":65}],71:[function(c,d,b){var g=c("./ac-clock/Clock"),f=c("./ac-clock/ThrottledClock"),a=c("./ac-clock/sharedClockInstance");
a.Clock=g;a.ThrottledClock=f;d.exports=a},{"./ac-clock/Clock":72,"./ac-clock/ThrottledClock":73,"./ac-clock/sharedClockInstance":74}],72:[function(c,d,b){c("@marcom/ac-polyfills/Function/prototype.bind");
c("@marcom/ac-polyfills/requestAnimationFrame");var g;var f=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var a=new Date().getTime();function h(){f.call(this);this.lastFrameTime=null;this._animationFrame=null;
this._active=false;this._startTime=null;this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);
this._getTime=Date.now||function(){return new Date().getTime()}}g=h.prototype=new f(null);
g.start=function(){if(this._active){return}this._tick()};g.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};g.destroy=function(){this.stop();
this.off();var j;for(j in this){if(this.hasOwnProperty(j)){this[j]=null}}};g.isRunning=function(){return this._active
};g._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};g._onAnimationFrame=function(k){if(this.lastFrameTime===null){this.lastFrameTime=k
}var l=k-this.lastFrameTime;var j=0;if(l>=1000){l=0}if(l!==0){j=1000/l}if(this._firstFrame===true){l=0;
this._firstFrame=false}if(j===0){this._firstFrame=true}else{var i={time:k,delta:l,fps:j,naturalFps:j,timeNow:this._getTime()};
this.trigger("update",i);this.trigger("draw",i)}this._animationFrame=null;this.lastFrameTime=k;
if(this._active!==false){this._tick()}else{this.lastFrameTime=null}};d.exports=h
},{"@marcom/ac-event-emitter-micro":99,"@marcom/ac-polyfills/Function/prototype.bind":387,"@marcom/ac-polyfills/requestAnimationFrame":405}],73:[function(c,d,b){c("@marcom/ac-polyfills/requestAnimationFrame");
var g;var a=c("./sharedClockInstance"),f=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
function h(j,i){if(j===null){return}f.call(this);i=i||{};this._fps=j||null;this._clock=i.clock||a;
this._lastThrottledTime=null;this._clockEvent=null;this._boundOnClockDraw=this._onClockDraw.bind(this);
this._boundOnClockUpdate=this._onClockUpdate.bind(this);this._clock.on("update",this._boundOnClockUpdate)
}g=h.prototype=new f(null);g.setFps=function(i){this._fps=i;return this};g.getFps=function(){return this._fps
};g.start=function(){this._clock.start();return this};g.stop=function(){this._clock.stop();
return this};g.isRunning=function(){return this._clock.isRunning()};g.destroy=function(){this._clock.off("update",this._boundOnClockUpdate);
this._clock.destroy.call(this)};g._onClockUpdate=function(i){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var j=i.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(Math.ceil(1000/j)>=this._fps+2){return}this._clockEvent=i;this._clockEvent.delta=j;
this._clockEvent.fps=1000/j;this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._boundOnClockDraw);
this.trigger("update",this._clockEvent)};g._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};d.exports=h},{"./sharedClockInstance":74,"@marcom/ac-event-emitter-micro":99,"@marcom/ac-polyfills/requestAnimationFrame":405}],74:[function(b,c,a){var d=b("./Clock");
c.exports=new d()},{"./Clock":72}],75:[function(b,c,a){c.exports={Clip:b("./ac-clip/Clip")}
},{"./ac-clip/Clip":76}],76:[function(c,b,d){c("@marcom/ac-polyfills/Array/isArray");
var g=c("@marcom/ac-object/create");var l=c("@marcom/ac-easing").createPredefined;
var a=c("@marcom/ac-clock");var j=c("@marcom/ac-easing").Ease;var k=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var i="ease";function h(o,n,q,m){m=m||{};this._options=m;this._isYoyo=m.yoyo;this._direction=1;
this._timeScale=1;this._loop=m.loop||0;this._loopCount=0;this._target=o;this.duration(n);
this._delay=(m.delay||0)*1000;this._remainingDelay=this._delay;this._progress=0;
this._clock=m.clock||a;this._playing=false;this._getTime=Date.now||function(){return new Date().getTime()
};this._propsTo=q||{};this._propsFrom=m.propsFrom||{};this._onStart=m.onStart||null;
this._onUpdate=m.onUpdate||null;this._onDraw=m.onDraw||null;this._onComplete=m.onComplete||null;
var p=m.ease||i;this._ease=typeof p==="function"?new j(p):l(p);this._start=this._start.bind(this);
this._update=this._update.bind(this);this._draw=this._draw.bind(this);this._isPrepared=false;
h._add(this);k.call(this)}var f=h.prototype=g(k.prototype);h.COMPLETE="complete";
h.PAUSE="pause";h.PLAY="play";f.play=function(){if(!this._playing){this._playing=true;
if(this._delay===0||this._remainingDelay===0){this._start()}else{if(!this._isPrepared){this._setDiff();
this._updateProps()}this._startTimeout=setTimeout(this._start,this._remainingDelay/this._timeScale);
this._delayStart=this._getTime()}}return this};f.pause=function(){if(this._playing){if(this._startTimeout){this._remainingDelay=this._getTime()-this._delayStart;
clearTimeout(this._startTimeout)}this._stop();this.trigger(h.PAUSE,this)}return this
};f.destroy=function(){this.pause();this._options=null;this._target=null;this._storeTarget=null;
this._ease=null;this._clock=null;this._propsTo=null;this._propsFrom=null;this._storePropsTo=null;
this._storePropsFrom=null;this._propsDiff=null;this._propsEase=null;this._onStart=null;
this._onUpdate=null;this._onDraw=null;this._onComplete=null;h._remove(this);k.prototype.destroy.call(this);
return this};f.reset=function(){if(!this._isPrepared){return}this._stop();this._resetLoop(this._target,this._storeTarget);
this._direction=1;this._loop=this._options.loop||0;this._loopCount=0;this._propsFrom=this._storePropsFrom;
this._propsTo=this._storePropsTo;this._progress=0;this._setStartTime();if(this._onUpdate){this._onUpdate.call(this,this)
}if(this._onDraw){this._onDraw.call(this,this)}return this};f.playing=function(){return this._playing
};f.target=function(){return this._target};f.duration=function(m){if(m!==undefined){this._duration=m;
this._durationMs=m*1000/this._timeScale;if(this._playing){this._setStartTime()}}return this._duration
};f.timeScale=function(m){if(m!==undefined){this._timeScale=m;this.duration(this._duration)
}return this._timeScale};f.currentTime=function(m){if(m!==undefined){return this.progress(m/this._duration)*this._duration
}return this.progress()*this._duration};f.progress=function(m){if(m!==undefined){this._progress=Math.min(1,Math.max(0,m));
this._setStartTime();if(!this._isPrepared){this._setDiff()}if(this._playing&&m===1){this._completeProps();
if(this._onUpdate){this._onUpdate.call(this,this)}if(this._onDraw){this._onDraw.call(this,this)
}this._complete()}else{this._updateProps();if(this._onUpdate){this._onUpdate.call(this,this)
}if(this._onDraw){this._onDraw.call(this,this)}}}return this._progress};f._resetLoop=function(n,m){var o;
for(o in m){if(m.hasOwnProperty(o)){if(m[o]!==null){if(_typeof(m[o])==="object"){this._resetLoop(n[o],m[o])
}else{n[o]=m[o]}}}}};f._cloneObjects=function(){var o={};var n={};var m={};this._cloneObjectsLoop(this._target,this._propsTo,this._propsFrom,o,n,m);
return{target:o,propsTo:n,propsFrom:m}};f._cloneObjectsLoop=function(p,t,s,r,n,m){var o;
var q;for(q in s){if(s.hasOwnProperty(q)&&t[q]===undefined&&p[q]!==undefined){r[q]=p[q];
n[q]=p[q];m[q]=s[q]}}for(q in t){if(p.hasOwnProperty(q)){o=_typeof(p[q]);if(p[q]!==null&&o==="object"){if(Array.isArray(p[q])){r[q]=[];
n[q]=[];m[q]=[]}else{r[q]={};n[q]={};m[q]={}}this._cloneObjectsLoop(p[q],t[q]||{},s[q]||{},r[q],n[q],m[q])
}else{if(t[q]!==null&&o==="number"){r[q]=p[q];n[q]=t[q];if(s&&s[q]!==undefined){m[q]=s[q]
}}}}}};f._prepareProperties=function(){if(!this._isPrepared){var m=this._cloneObjects();
this._storeTarget=m.target;this._propsTo=m.propsTo;this._storePropsTo=this._propsTo;
this._propsFrom=m.propsFrom;this._storePropsFrom=this._propsFrom;this._isPrepared=true
}};f._setStartTime=function(){this._startTime=this._getTime()-this.progress()*this._durationMs
};f._setDiff=function(){if(!this._isPrepared){this._prepareProperties()}this._propsDiff={};
this._setDiffLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff)};
f._setDiffLoop=function(r,q,o,n){var m;var p;for(p in r){if(r.hasOwnProperty(p)){m=_typeof(r[p]);
if(r[p]!==null&&m==="object"){q[p]=q[p]||{};n[p]=n[p]||{};this._setDiffLoop(r[p],q[p],o[p],n[p])
}else{if(m==="number"&&o[p]!==undefined){if(q[p]!==undefined){o[p]=q[p]}else{q[p]=o[p]
}n[p]=r[p]-o[p]}else{r[p]=null;q[p]=null}}}}};f._start=function(){this._startTimeout=null;
this._remainingDelay=0;this._setStartTime();this._clock.on("update",this._update);
this._clock.on("draw",this._draw);if(!this._clock.isRunning()){this._clock.start()
}this._setDiff();this._playing=true;this._running=true;if(this._onStart){this._onStart.call(this,this)
}this.trigger(h.PLAY,this)};f._stop=function(){this._playing=false;this._running=false;
this._clock.off("update",this._update);this._clock.off("draw",this._draw)};f._updateProps=function(){var m;
if(this._direction===1){m=this._ease.getValue(this._progress)}else{m=1-this._ease.getValue(1-this._progress)
}this._updatePropsLoop(this._propsTo,this._propsFrom,this._target,this._propsDiff,m)
};f._updatePropsLoop=function(r,q,o,n,m){var p;for(p in r){if(r.hasOwnProperty(p)&&r[p]!==null){if(typeof r[p]!=="number"){this._updatePropsLoop(r[p],q[p],o[p],n[p],m)
}else{o[p]=q[p]+n[p]*m}}}};f._completeProps=function(){this._completePropsLoop(this._propsTo,this._target)
};f._completePropsLoop=function(o,m){var n;for(n in o){if(o.hasOwnProperty(n)&&o[n]!==null){if(typeof o[n]!=="number"){this._completePropsLoop(o[n],m[n])
}else{m[n]=o[n]}}}};f._complete=function(){if(this._isYoyo&&(this._loop>0&&this._loopCount<=this._loop||this._loop===0&&this._loopCount===0)){this._propsFrom=this._direction===1?this._storePropsTo:this._storePropsFrom;
this._propsTo=this._direction===1?this._storePropsFrom:this._storePropsTo;this._direction*=-1;
if(this._direction===-1){++this._loopCount}this.progress(0);this._start()}else{if(this._loopCount<this._loop){++this._loopCount;
this.progress(0);this._start()}else{this.trigger(h.COMPLETE,this);if(this._onComplete){this._onComplete.call(this,this)
}if(this._options&&this._options.destroyOnComplete){this.destroy()}}}};f._update=function(m){if(this._running){this._progress=(m.timeNow-this._startTime)/this._durationMs;
if(this._progress>=1){this._progress=1;this._running=false;this._completeProps()
}else{this._updateProps()}if(this._onUpdate){this._onUpdate.call(this,this)}}};
f._draw=function(m){if(this._onDraw){this._onDraw.call(this,this)}if(!this._running){this._stop();
if(this._progress===1){this._complete()}}};h._instantiate=function(){this._clips=[];
return this};h._add=function(m){this._clips.push(m)};h._remove=function(n){var m=this._clips.indexOf(n);
if(m>-1){this._clips.splice(m,1)}};h.getAll=function(o){if(o!==undefined){var m=[];
var n=this._clips.length;while(n--){if(this._clips[n].target()===o){m.push(this._clips[n])
}}return m}return Array.prototype.slice.call(this._clips)};h.destroyAll=function(o){var m=this.getAll(o);
if(this._clips.length===m.length){this._clips=[]}var n=m.length;while(n--){m[n].destroy()
}return m};h.to=function(o,n,p,m){m=m||{};if(m.destroyOnComplete===undefined){m.destroyOnComplete=true
}return new h(o,n,p,m).play()};h.from=function(p,o,m,n){n=n||{};n.propsFrom=m;if(n.destroyOnComplete===undefined){n.destroyOnComplete=true
}return new h(p,o,n.propsTo,n).play()};b.exports=h._instantiate()},{"@marcom/ac-clock":71,"@marcom/ac-easing":63,"@marcom/ac-event-emitter-micro":99,"@marcom/ac-object/create":341,"@marcom/ac-polyfills/Array/isArray":365}],77:[function(b,c,a){var d=b("./ac-color/Color");
d.decimalToHex=b("./ac-color/static/decimalToHex");d.hexToDecimal=b("./ac-color/static/hexToDecimal");
d.hexToRgb=b("./ac-color/static/hexToRgb");d.isColor=b("./ac-color/static/isColor");
d.isHex=b("./ac-color/static/isHex");d.isRgb=b("./ac-color/static/isRgb");d.isRgba=b("./ac-color/static/isRgba");
d.mixColors=b("./ac-color/static/mixColors");d.rgbaToArray=b("./ac-color/static/rgbaToArray");
d.rgbToArray=b("./ac-color/static/rgbToArray");d.rgbToDecimal=b("./ac-color/static/rgbToDecimal");
d.rgbToHex=b("./ac-color/static/rgbToHex");d.rgbToHsl=b("./ac-color/static/rgbToHsl");
d.rgbToHsv=b("./ac-color/static/rgbToHsv");d.rgbaToObject=b("./ac-color/static/rgbaToObject");
d.rgbToObject=b("./ac-color/static/rgbToObject");d.shortToLongHex=b("./ac-color/static/shortToLongHex");
c.exports={Color:d}},{"./ac-color/Color":78,"./ac-color/static/decimalToHex":80,"./ac-color/static/hexToDecimal":81,"./ac-color/static/hexToRgb":82,"./ac-color/static/isColor":83,"./ac-color/static/isHex":84,"./ac-color/static/isRgb":85,"./ac-color/static/isRgba":86,"./ac-color/static/mixColors":87,"./ac-color/static/rgbToArray":88,"./ac-color/static/rgbToDecimal":89,"./ac-color/static/rgbToHex":90,"./ac-color/static/rgbToHsl":91,"./ac-color/static/rgbToHsv":92,"./ac-color/static/rgbToObject":93,"./ac-color/static/rgbaToArray":94,"./ac-color/static/rgbaToObject":95,"./ac-color/static/shortToLongHex":96}],78:[function(d,a,q){var h=d("./helpers/cssColorNames");
var m=d("./static/hexToRgb");var l=d("./static/isColor");var f=d("./static/isHex");
var b=d("./static/isRgba");var p=d("./static/mixColors");var k=d("./static/rgbaToArray");
var n=d("./static/rgbToArray");var s=d("./static/rgbToDecimal");var i=d("./static/rgbToHex");
var c=d("./static/rgbaToObject");var j=d("./static/rgbToObject");var o=d("./static/shortToLongHex");
function r(t){if(!l(t)&&!h.nameToRgbObject[t]){throw new Error(t+" is not a supported color.")
}this._setColor(t)}var g=r.prototype;g._setColor=function(t){this._color={};if(f(t)){this._color.hex=o(t);
this._color.rgb={color:m(t)}}else{if(b(t)){this._color.rgba={color:t};var v=this.rgbaObject();
this._color.rgb={color:"rgb("+v.r+", "+v.g+", "+v.b+")"}}else{if(h.nameToRgbObject[t]){var u=h.nameToRgbObject[t];
this._color.rgb={object:u,color:"rgb("+u.r+", "+u.g+", "+u.b+")"}}else{this._color.rgb={color:t}
}}}};g.rgb=function(){return this._color.rgb.color};g.rgba=function(){if(this._color.rgba===undefined){var t=this.rgbObject();
this._color.rgba={color:"rgba("+t.r+", "+t.g+", "+t.b+", 1)"}}return this._color.rgba.color
};g.hex=function(){if(this._color.hex===undefined){this._color.hex=i.apply(this,this.rgbArray())
}return this._color.hex};g.decimal=function(){if(this._color.decimal===undefined){this._color.decimal=s(this.rgb())
}return this._color.decimal};g.cssName=function(){return h.rgbToName[this.rgb()]||null
};g.rgbArray=function(){if(this._color.rgb.array===undefined){this._color.rgb.array=n(this.rgb())
}return this._color.rgb.array};g.rgbaArray=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.array===undefined){this._color.rgba.array=k(this.rgba())}return this._color.rgba.array
};g.rgbObject=function(){if(this._color.rgb.object===undefined){this._color.rgb.object=j(this.rgb())
}return this._color.rgb.object};g.rgbaObject=function(){if(this._color.rgba===undefined){this.rgba()
}if(this._color.rgba.object===undefined){this._color.rgba.object=c(this.rgba())
}return this._color.rgba.object};g.getRed=function(){return this.rgbObject().r};
g.getGreen=function(){return this.rgbObject().g};g.getBlue=function(){return this.rgbObject().b
};g.getAlpha=function(){if(this._color.rgba===undefined){return 1}return this.rgbaObject().a
};g.setRed=function(t){if(t!==this.getRed()){this._setColor("rgba("+t+", "+this.getGreen()+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().r};g.setGreen=function(t){if(t!==this.getGreen()){this._setColor("rgba("+this.getRed()+", "+t+", "+this.getBlue()+", "+this.getAlpha()+")")
}return this.rgbObject().g};g.setBlue=function(t){if(t!==this.getBlue()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+t+", "+this.getAlpha()+")")
}return this.rgbObject().b};g.setAlpha=function(t){if(t!==this.getAlpha()){this._setColor("rgba("+this.getRed()+", "+this.getGreen()+", "+this.getBlue()+", "+t+")")
}return this.rgbaObject().a};g.mix=function(t,u){var v=j(p(this.rgb(),t,u));this._setColor("rgba("+v.r+", "+v.g+", "+v.b+", "+this.getAlpha()+")");
return this.rgb()};g.clone=function(){return new r(this.rgb())};a.exports=r},{"./helpers/cssColorNames":79,"./static/hexToRgb":82,"./static/isColor":83,"./static/isHex":84,"./static/isRgba":86,"./static/mixColors":87,"./static/rgbToArray":88,"./static/rgbToDecimal":89,"./static/rgbToHex":90,"./static/rgbToObject":93,"./static/rgbaToArray":94,"./static/rgbaToObject":95,"./static/shortToLongHex":96}],79:[function(b,c,a){var d={"rgb(240, 248, 255)":"aliceblue","rgb(250, 235, 215)":"antiquewhite","rgb(0, 0, 0)":"black","rgb(0, 0, 255)":"blue","rgb(0, 255, 255)":"cyan","rgb(0, 0, 139)":"darkblue","rgb(0, 139, 139)":"darkcyan","rgb(0, 100, 0)":"darkgreen","rgb(0, 206, 209)":"darkturquoise","rgb(0, 191, 255)":"deepskyblue","rgb(0, 128, 0)":"green","rgb(0, 255, 0)":"lime","rgb(0, 0, 205)":"mediumblue","rgb(0, 250, 154)":"mediumspringgreen","rgb(0, 0, 128)":"navy","rgb(0, 255, 127)":"springgreen","rgb(0, 128, 128)":"teal","rgb(25, 25, 112)":"midnightblue","rgb(30, 144, 255)":"dodgerblue","rgb(32, 178, 170)":"lightseagreen","rgb(34, 139, 34)":"forestgreen","rgb(46, 139, 87)":"seagreen","rgb(47, 79, 79)":"darkslategray","rgb(50, 205, 50)":"limegreen","rgb(60, 179, 113)":"mediumseagreen","rgb(64, 224, 208)":"turquoise","rgb(65, 105, 225)":"royalblue","rgb(70, 130, 180)":"steelblue","rgb(72, 61, 139)":"darkslateblue","rgb(72, 209, 204)":"mediumturquoise","rgb(75, 0, 130)":"indigo","rgb(85, 107, 47)":"darkolivegreen","rgb(95, 158, 160)":"cadetblue","rgb(100, 149, 237)":"cornflowerblue","rgb(102, 205, 170)":"mediumaquamarine","rgb(105, 105, 105)":"dimgray","rgb(106, 90, 205)":"slateblue","rgb(107, 142, 35)":"olivedrab","rgb(112, 128, 144)":"slategray","rgb(119, 136, 153)":"lightslategray","rgb(123, 104, 238)":"mediumslateblue","rgb(124, 252, 0)":"lawngreen","rgb(127, 255, 212)":"aquamarine","rgb(127, 255, 0)":"chartreuse","rgb(128, 128, 128)":"gray","rgb(128, 0, 0)":"maroon","rgb(128, 128, 0)":"olive","rgb(128, 0, 128)":"purple","rgb(135, 206, 250)":"lightskyblue","rgb(135, 206, 235)":"skyblue","rgb(138, 43, 226)":"blueviolet","rgb(139, 0, 139)":"darkmagenta","rgb(139, 0, 0)":"darkred","rgb(139, 69, 19)":"saddlebrown","rgb(143, 188, 143)":"darkseagreen","rgb(144, 238, 144)":"lightgreen","rgb(147, 112, 219)":"mediumpurple","rgb(148, 0, 211)":"darkviolet","rgb(152, 251, 152)":"palegreen","rgb(153, 50, 204)":"darkorchid","rgb(154, 205, 50)":"yellowgreen","rgb(160, 82, 45)":"sienna","rgb(165, 42, 42)":"brown","rgb(169, 169, 169)":"darkgray","rgb(173, 255, 47)":"greenyellow","rgb(173, 216, 230)":"lightblue","rgb(175, 238, 238)":"paleturquoise","rgb(176, 196, 222)":"lightsteelblue","rgb(176, 224, 230)":"powderblue","rgb(178, 34, 34)":"firebrick","rgb(184, 134, 11)":"darkgoldenrod","rgb(186, 85, 211)":"mediumorchid","rgb(188, 143, 143)":"rosybrown","rgb(189, 183, 107)":"darkkhaki","rgb(192, 192, 192)":"silver","rgb(199, 21, 133)":"mediumvioletred","rgb(205, 92, 92)":"indianred","rgb(205, 133, 63)":"peru","rgb(210, 105, 30)":"chocolate","rgb(210, 180, 140)":"tan","rgb(211, 211, 211)":"lightgray","rgb(216, 191, 216)":"thistle","rgb(218, 165, 32)":"goldenrod","rgb(218, 112, 214)":"orchid","rgb(219, 112, 147)":"palevioletred","rgb(220, 20, 60)":"crimson","rgb(220, 220, 220)":"gainsboro","rgb(221, 160, 221)":"plum","rgb(222, 184, 135)":"burlywood","rgb(224, 255, 255)":"lightcyan","rgb(230, 230, 250)":"lavender","rgb(233, 150, 122)":"darksalmon","rgb(238, 232, 170)":"palegoldenrod","rgb(238, 130, 238)":"violet","rgb(240, 255, 255)":"azure","rgb(240, 255, 240)":"honeydew","rgb(240, 230, 140)":"khaki","rgb(240, 128, 128)":"lightcoral","rgb(244, 164, 96)":"sandybrown","rgb(245, 245, 220)":"beige","rgb(245, 255, 250)":"mintcream","rgb(245, 222, 179)":"wheat","rgb(245, 245, 245)":"whitesmoke","rgb(248, 248, 255)":"ghostwhite","rgb(250, 250, 210)":"lightgoldenrodyellow","rgb(250, 240, 230)":"linen","rgb(250, 128, 114)":"salmon","rgb(253, 245, 230)":"oldlace","rgb(255, 228, 196)":"bisque","rgb(255, 235, 205)":"blanchedalmond","rgb(255, 127, 80)":"coral","rgb(255, 248, 220)":"cornsilk","rgb(255, 140, 0)":"darkorange","rgb(255, 20, 147)":"deeppink","rgb(255, 250, 240)":"floralwhite","rgb(255, 215, 0)":"gold","rgb(255, 105, 180)":"hotpink","rgb(255, 255, 240)":"ivory","rgb(255, 240, 245)":"lavenderblush","rgb(255, 250, 205)":"lemonchiffon","rgb(255, 182, 193)":"lightpink","rgb(255, 160, 122)":"lightsalmon","rgb(255, 255, 224)":"lightyellow","rgb(255, 0, 255)":"magenta","rgb(255, 228, 225)":"mistyrose","rgb(255, 228, 181)":"moccasin","rgb(255, 222, 173)":"navajowhite","rgb(255, 165, 0)":"orange","rgb(255, 69, 0)":"orangered","rgb(255, 239, 213)":"papayawhip","rgb(255, 218, 185)":"peachpuff","rgb(255, 192, 203)":"pink","rgb(255, 0, 0)":"red","rgb(255, 245, 238)":"seashell","rgb(255, 250, 250)":"snow","rgb(255, 99, 71)":"tomato","rgb(255, 255, 255)":"white","rgb(255, 255, 0)":"yellow","rgb(102, 51, 153)":"rebeccapurple"};
var f={aqua:{r:0,g:255,b:255},aliceblue:{r:240,g:248,b:255},antiquewhite:{r:250,g:235,b:215},black:{r:0,g:0,b:0},blue:{r:0,g:0,b:255},cyan:{r:0,g:255,b:255},darkblue:{r:0,g:0,b:139},darkcyan:{r:0,g:139,b:139},darkgreen:{r:0,g:100,b:0},darkturquoise:{r:0,g:206,b:209},deepskyblue:{r:0,g:191,b:255},green:{r:0,g:128,b:0},lime:{r:0,g:255,b:0},mediumblue:{r:0,g:0,b:205},mediumspringgreen:{r:0,g:250,b:154},navy:{r:0,g:0,b:128},springgreen:{r:0,g:255,b:127},teal:{r:0,g:128,b:128},midnightblue:{r:25,g:25,b:112},dodgerblue:{r:30,g:144,b:255},lightseagreen:{r:32,g:178,b:170},forestgreen:{r:34,g:139,b:34},seagreen:{r:46,g:139,b:87},darkslategray:{r:47,g:79,b:79},darkslategrey:{r:47,g:79,b:79},limegreen:{r:50,g:205,b:50},mediumseagreen:{r:60,g:179,b:113},turquoise:{r:64,g:224,b:208},royalblue:{r:65,g:105,b:225},steelblue:{r:70,g:130,b:180},darkslateblue:{r:72,g:61,b:139},mediumturquoise:{r:72,g:209,b:204},indigo:{r:75,g:0,b:130},darkolivegreen:{r:85,g:107,b:47},cadetblue:{r:95,g:158,b:160},cornflowerblue:{r:100,g:149,b:237},mediumaquamarine:{r:102,g:205,b:170},dimgray:{r:105,g:105,b:105},dimgrey:{r:105,g:105,b:105},slateblue:{r:106,g:90,b:205},olivedrab:{r:107,g:142,b:35},slategray:{r:112,g:128,b:144},slategrey:{r:112,g:128,b:144},lightslategray:{r:119,g:136,b:153},lightslategrey:{r:119,g:136,b:153},mediumslateblue:{r:123,g:104,b:238},lawngreen:{r:124,g:252,b:0},aquamarine:{r:127,g:255,b:212},chartreuse:{r:127,g:255,b:0},gray:{r:128,g:128,b:128},grey:{r:128,g:128,b:128},maroon:{r:128,g:0,b:0},olive:{r:128,g:128,b:0},purple:{r:128,g:0,b:128},lightskyblue:{r:135,g:206,b:250},skyblue:{r:135,g:206,b:235},blueviolet:{r:138,g:43,b:226},darkmagenta:{r:139,g:0,b:139},darkred:{r:139,g:0,b:0},saddlebrown:{r:139,g:69,b:19},darkseagreen:{r:143,g:188,b:143},lightgreen:{r:144,g:238,b:144},mediumpurple:{r:147,g:112,b:219},darkviolet:{r:148,g:0,b:211},palegreen:{r:152,g:251,b:152},darkorchid:{r:153,g:50,b:204},yellowgreen:{r:154,g:205,b:50},sienna:{r:160,g:82,b:45},brown:{r:165,g:42,b:42},darkgray:{r:169,g:169,b:169},darkgrey:{r:169,g:169,b:169},greenyellow:{r:173,g:255,b:47},lightblue:{r:173,g:216,b:230},paleturquoise:{r:175,g:238,b:238},lightsteelblue:{r:176,g:196,b:222},powderblue:{r:176,g:224,b:230},firebrick:{r:178,g:34,b:34},darkgoldenrod:{r:184,g:134,b:11},mediumorchid:{r:186,g:85,b:211},rosybrown:{r:188,g:143,b:143},darkkhaki:{r:189,g:183,b:107},silver:{r:192,g:192,b:192},mediumvioletred:{r:199,g:21,b:133},indianred:{r:205,g:92,b:92},peru:{r:205,g:133,b:63},chocolate:{r:210,g:105,b:30},tan:{r:210,g:180,b:140},lightgray:{r:211,g:211,b:211},lightgrey:{r:211,g:211,b:211},thistle:{r:216,g:191,b:216},goldenrod:{r:218,g:165,b:32},orchid:{r:218,g:112,b:214},palevioletred:{r:219,g:112,b:147},crimson:{r:220,g:20,b:60},gainsboro:{r:220,g:220,b:220},plum:{r:221,g:160,b:221},burlywood:{r:222,g:184,b:135},lightcyan:{r:224,g:255,b:255},lavender:{r:230,g:230,b:250},darksalmon:{r:233,g:150,b:122},palegoldenrod:{r:238,g:232,b:170},violet:{r:238,g:130,b:238},azure:{r:240,g:255,b:255},honeydew:{r:240,g:255,b:240},khaki:{r:240,g:230,b:140},lightcoral:{r:240,g:128,b:128},sandybrown:{r:244,g:164,b:96},beige:{r:245,g:245,b:220},mintcream:{r:245,g:255,b:250},wheat:{r:245,g:222,b:179},whitesmoke:{r:245,g:245,b:245},ghostwhite:{r:248,g:248,b:255},lightgoldenrodyellow:{r:250,g:250,b:210},linen:{r:250,g:240,b:230},salmon:{r:250,g:128,b:114},oldlace:{r:253,g:245,b:230},bisque:{r:255,g:228,b:196},blanchedalmond:{r:255,g:235,b:205},coral:{r:255,g:127,b:80},cornsilk:{r:255,g:248,b:220},darkorange:{r:255,g:140,b:0},deeppink:{r:255,g:20,b:147},floralwhite:{r:255,g:250,b:240},fuchsia:{r:255,g:0,b:255},gold:{r:255,g:215,b:0},hotpink:{r:255,g:105,b:180},ivory:{r:255,g:255,b:240},lavenderblush:{r:255,g:240,b:245},lemonchiffon:{r:255,g:250,b:205},lightpink:{r:255,g:182,b:193},lightsalmon:{r:255,g:160,b:122},lightyellow:{r:255,g:255,b:224},magenta:{r:255,g:0,b:255},mistyrose:{r:255,g:228,b:225},moccasin:{r:255,g:228,b:181},navajowhite:{r:255,g:222,b:173},orange:{r:255,g:165,b:0},orangered:{r:255,g:69,b:0},papayawhip:{r:255,g:239,b:213},peachpuff:{r:255,g:218,b:185},pink:{r:255,g:192,b:203},red:{r:255,g:0,b:0},seashell:{r:255,g:245,b:238},snow:{r:255,g:250,b:250},tomato:{r:255,g:99,b:71},white:{r:255,g:255,b:255},yellow:{r:255,g:255,b:0},rebeccapurple:{r:102,g:51,b:153}};
c.exports={rgbToName:d,nameToRgbObject:f}},{}],80:[function(c,d,b){d.exports=function a(f){return"#"+f.toString(16)
}},{}],81:[function(c,d,a){d.exports=function b(f){return parseInt(f.substr(1),16)
}},{}],82:[function(d,f,c){var a=d("./shortToLongHex");f.exports=function b(h){h=a(h);
var g=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);return g?"rgb("+parseInt(g[1],16)+", "+parseInt(g[2],16)+", "+parseInt(g[3],16)+")":null
}},{"./shortToLongHex":96}],83:[function(c,f,b){var h=c("./isRgb");var g=c("./isRgba");
var a=c("./isHex");f.exports=function d(i){return a(i)||h(i)||g(i)}},{"./isHex":84,"./isRgb":85,"./isRgba":86}],84:[function(c,d,b){d.exports=function a(g){var f=/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
return f.test(g)}},{}],85:[function(b,c,a){c.exports=function d(g){var f=/^rgb\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\s*\)$/;
return f.exec(g)!==null}},{}],86:[function(b,c,a){c.exports=function d(g){var f=/^rgba\(\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s*(0(\.\d+)?|1(\.0+)?)\s*\)$/;
return f.exec(g)!==null}},{}],87:[function(d,f,c){var b=d("./isHex");var a=d("./hexToRgb");
var h=d("./rgbToObject");f.exports=function g(n,m,l){n=b(n)?a(n):n;m=b(m)?a(m):m;
n=h(n);m=h(m);var k=n.r+(m.r-n.r)*l;var j=n.g+(m.g-n.g)*l;var i=n.b+(m.b-n.b)*l;
return"rgb("+Math.round(k)+", "+Math.round(j)+", "+Math.round(i)+")"}},{"./hexToRgb":82,"./isHex":84,"./rgbToObject":93}],88:[function(b,c,a){var d=b("./rgbToObject");
c.exports=function f(g){var h=d(g);return[h.r,h.g,h.b]}},{"./rgbToObject":93}],89:[function(d,f,b){var c=d("./hexToDecimal");
var h=d("./rgbToArray");var g=d("./rgbToHex");f.exports=function a(i){var j=g.apply(this,h(i));
return c(j)}},{"./hexToDecimal":81,"./rgbToArray":88,"./rgbToHex":90}],90:[function(b,c,a){c.exports=function d(i,h,f){return"#"+((1<<24)+(i<<16)+(h<<8)+f).toString(16).slice(1)
}},{}],91:[function(c,d,b){d.exports=function a(f,m,o){if(arguments.length!==3){return false
}f/=255;m/=255;o/=255;var p=Math.max(f,m,o);var j=Math.min(f,m,o);var n=p+j;var q=p-j;
var k;var t;var i=n/2;if(p===j){k=t=0}else{t=i>0.5?q/(2-p-j):q/n;switch(p){case f:k=(m-o)/q;
break;case m:k=2+(o-f)/q;break;case o:k=4+(f-m)/q;break}k*=60;if(k<0){k+=360}}return[k,Math.round(100*t),Math.round(100*i)]
}},{}],92:[function(c,d,a){d.exports=function b(f,m,n){if(arguments.length!==3){return false
}var i=f/255;var j=m/255;var p=n/255;var o=Math.max(i,j,p);var k=Math.min(i,j,p);
var l;var u;var t=o;var q=o-k;u=o===0?0:q/o;if(o===k){l=0}else{switch(o){case i:l=(j-p)/q+(j<p?6:0);
break;case j:l=(p-i)/q+2;break;case p:l=(i-j)/q+4;break}l/=6}return[Math.round(360*l),Math.round(100*u),Math.round(100*t)]
}},{}],93:[function(b,c,a){c.exports=function d(g){var h=/rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
var f=h.exec(g);return{r:Number(f[1]),g:Number(f[2]),b:Number(f[3])}}},{}],94:[function(b,c,a){var f=b("./rgbaToObject");
c.exports=function d(g){var h=f(g);return[h.r,h.g,h.b,h.a]}},{"./rgbaToObject":95}],95:[function(b,c,a){c.exports=function d(g){var h=/rgba\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0(\.\d+)?|1(\.0+)?)\s*\)/;
var f=h.exec(g);return{r:Number(f[1]),g:Number(f[2]),b:Number(f[3]),a:Number(f[4])}
}},{}],96:[function(c,d,b){d.exports=function a(g){var f=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;
g=g.replace(f,function(i,k,j,h){return"#"+k+k+j+j+h+h});return g}},{}],97:[function(d,f,c){var b=d("./utils/getBoundingClientRect");
f.exports=function a(g,i){var h;if(i){h=b(g);return{width:h.width,height:h.height}
}return{width:g.offsetWidth,height:g.offsetHeight}}},{"./utils/getBoundingClientRect":98}],98:[function(c,d,b){d.exports=function a(f){var g=f.getBoundingClientRect();
return{top:g.top,right:g.right,bottom:g.bottom,left:g.left,width:g.width||g.right-g.left,height:g.height||g.bottom-g.top}
}},{}],99:[function(b,c,a){c.exports={EventEmitterMicro:b("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":100}],100:[function(b,c,a){function f(){this._events={}
}var d=f.prototype;d.on=function(g,h){this._events[g]=this._events[g]||[];this._events[g].unshift(h)
};d.once=function(g,j){var i=this;function h(k){i.off(g,h);if(k!==undefined){j(k)
}else{j()}}this.on(g,h)};d.off=function(g,i){if(!this.has(g)){return}var h=this._events[g].indexOf(i);
if(h===-1){return}this._events[g].splice(h,1)};d.trigger=function(g,j){if(!this.has(g)){return
}for(var h=this._events[g].length-1;h>=0;h--){if(j!==undefined){this._events[g][h](j)
}else{this._events[g][h]()}}};d.has=function(g){if(g in this._events===false||this._events[g].length===0){return false
}return true};d.destroy=function(){for(var g in this._events){this._events[g]=null
}this._events=null};c.exports=f},{}],101:[function(b,c,a){c.exports={PageVisibilityManager:b("./ac-page-visibility/PageVisibilityManager")}
},{"./ac-page-visibility/PageVisibilityManager":102}],102:[function(c,f,b){var d=c("@marcom/ac-object/create");
var h=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;function a(){if(typeof document.addEventListener==="undefined"){return
}var i;if(typeof document.hidden!=="undefined"){this._hidden="hidden";i="visibilitychange"
}else{if(typeof document.mozHidden!=="undefined"){this._hidden="mozHidden";i="mozvisibilitychange"
}else{if(typeof document.msHidden!=="undefined"){this._hidden="msHidden";i="msvisibilitychange"
}else{if(typeof document.webkitHidden!=="undefined"){this._hidden="webkitHidden";
i="webkitvisibilitychange"}}}}if(typeof document[this._hidden]==="undefined"){this.isHidden=false
}else{this.isHidden=document[this._hidden]}if(i){document.addEventListener(i,this._handleVisibilityChange.bind(this),false)
}h.call(this)}var g=a.prototype=d(h.prototype);g.CHANGED="changed";g._handleVisibilityChange=function(i){this.isHidden=document[this._hidden];
this.trigger(this.CHANGED,{isHidden:this.isHidden})};f.exports=new a()},{"@marcom/ac-event-emitter-micro":99,"@marcom/ac-object/create":341}],103:[function(b,c,a){c.exports=d;
function d(f){var g=new Float32Array(16);g[0]=f[0];g[1]=f[1];g[2]=f[2];g[3]=f[3];
g[4]=f[4];g[5]=f[5];g[6]=f[6];g[7]=f[7];g[8]=f[8];g[9]=f[9];g[10]=f[10];g[11]=f[11];
g[12]=f[12];g[13]=f[13];g[14]=f[14];g[15]=f[15];return g}},{}],104:[function(b,d,a){d.exports=c;
function c(){var f=new Float32Array(16);f[0]=1;f[1]=0;f[2]=0;f[3]=0;f[4]=0;f[5]=1;
f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=1;f[11]=0;f[12]=0;f[13]=0;f[14]=0;f[15]=1;return f
}},{}],105:[function(b,c,a){c.exports=d;function d(t,r,o){var l=r[0],k=r[1],j=r[2],m=r[3],u=l+l,f=k+k,n=j+j,i=l*u,h=l*f,g=l*n,s=k*f,p=k*n,C=j*n,D=m*u,B=m*f,A=m*n;
t[0]=1-(s+C);t[1]=h+A;t[2]=g-B;t[3]=0;t[4]=h-A;t[5]=1-(i+C);t[6]=p+D;t[7]=0;t[8]=g+B;
t[9]=p-D;t[10]=1-(i+s);t[11]=0;t[12]=o[0];t[13]=o[1];t[14]=o[2];t[15]=1;return t
}},{}],106:[function(c,d,b){d.exports=a;function a(f){f[0]=1;f[1]=0;f[2]=0;f[3]=0;
f[4]=0;f[5]=1;f[6]=0;f[7]=0;f[8]=0;f[9]=0;f[10]=1;f[11]=0;f[12]=0;f[13]=0;f[14]=0;
f[15]=1;return f}},{}],107:[function(b,c,a){c.exports=d;function d(y,D){var H=D[0],F=D[1],E=D[2],B=D[3],j=D[4],i=D[5],h=D[6],g=D[7],x=D[8],w=D[9],v=D[10],u=D[11],J=D[12],I=D[13],G=D[14],C=D[15],t=H*i-F*j,s=H*h-E*j,r=H*g-B*j,q=F*h-E*i,p=F*g-B*i,o=E*g-B*h,n=x*I-w*J,m=x*G-v*J,l=x*C-u*J,k=w*G-v*I,A=w*C-u*I,z=v*C-u*G,f=t*z-s*A+r*k+q*l-p*m+o*n;
if(!f){return null}f=1/f;y[0]=(i*z-h*A+g*k)*f;y[1]=(E*A-F*z-B*k)*f;y[2]=(I*o-G*p+C*q)*f;
y[3]=(v*p-w*o-u*q)*f;y[4]=(h*l-j*z-g*m)*f;y[5]=(H*z-E*l+B*m)*f;y[6]=(G*r-J*o-C*s)*f;
y[7]=(x*o-v*r+u*s)*f;y[8]=(j*A-i*l+g*n)*f;y[9]=(F*l-H*A-B*n)*f;y[10]=(J*p-I*r+C*t)*f;
y[11]=(w*r-x*p-u*t)*f;y[12]=(i*m-j*k-h*n)*f;y[13]=(H*k-F*m+E*n)*f;y[14]=(I*s-J*q-G*t)*f;
y[15]=(x*q-w*s+v*t)*f;return y}},{}],108:[function(c,d,b){d.exports=a;function a(r,v,s){var z=v[0],y=v[1],w=v[2],t=v[3],l=v[4],j=v[5],h=v[6],f=v[7],q=v[8],p=v[9],o=v[10],n=v[11],B=v[12],A=v[13],x=v[14],u=v[15];
var m=s[0],k=s[1],i=s[2],g=s[3];r[0]=m*z+k*l+i*q+g*B;r[1]=m*y+k*j+i*p+g*A;r[2]=m*w+k*h+i*o+g*x;
r[3]=m*t+k*f+i*n+g*u;m=s[4];k=s[5];i=s[6];g=s[7];r[4]=m*z+k*l+i*q+g*B;r[5]=m*y+k*j+i*p+g*A;
r[6]=m*w+k*h+i*o+g*x;r[7]=m*t+k*f+i*n+g*u;m=s[8];k=s[9];i=s[10];g=s[11];r[8]=m*z+k*l+i*q+g*B;
r[9]=m*y+k*j+i*p+g*A;r[10]=m*w+k*h+i*o+g*x;r[11]=m*t+k*f+i*n+g*u;m=s[12];k=s[13];
i=s[14];g=s[15];r[12]=m*z+k*l+i*q+g*B;r[13]=m*y+k*j+i*p+g*A;r[14]=m*w+k*h+i*o+g*x;
r[15]=m*t+k*f+i*n+g*u;return r}},{}],109:[function(c,d,a){d.exports=b;function b(E,L,N,f){var p=f[0],o=f[1],n=f[2],F=Math.sqrt(p*p+o*o+n*n),w,J,v,P,O,M,K,m,l,k,j,D,C,B,A,u,r,q,I,H,G,i,h,g;
if(Math.abs(F)<0.000001){return null}F=1/F;p*=F;o*=F;n*=F;w=Math.sin(N);J=Math.cos(N);
v=1-J;P=L[0];O=L[1];M=L[2];K=L[3];m=L[4];l=L[5];k=L[6];j=L[7];D=L[8];C=L[9];B=L[10];
A=L[11];u=p*p*v+J;r=o*p*v+n*w;q=n*p*v-o*w;I=p*o*v-n*w;H=o*o*v+J;G=n*o*v+p*w;i=p*n*v+o*w;
h=o*n*v-p*w;g=n*n*v+J;E[0]=P*u+m*r+D*q;E[1]=O*u+l*r+C*q;E[2]=M*u+k*r+B*q;E[3]=K*u+j*r+A*q;
E[4]=P*I+m*H+D*G;E[5]=O*I+l*H+C*G;E[6]=M*I+k*H+B*G;E[7]=K*I+j*H+A*G;E[8]=P*i+m*h+D*g;
E[9]=O*i+l*h+C*g;E[10]=M*i+k*h+B*g;E[11]=K*i+j*h+A*g;if(L!==E){E[12]=L[12];E[13]=L[13];
E[14]=L[14];E[15]=L[15]}return E}},{}],110:[function(c,d,a){d.exports=b;function b(f,m,l){var r=Math.sin(l),k=Math.cos(l),q=m[4],p=m[5],o=m[6],n=m[7],j=m[8],i=m[9],h=m[10],g=m[11];
if(m!==f){f[0]=m[0];f[1]=m[1];f[2]=m[2];f[3]=m[3];f[12]=m[12];f[13]=m[13];f[14]=m[14];
f[15]=m[15]}f[4]=q*k+j*r;f[5]=p*k+i*r;f[6]=o*k+h*r;f[7]=n*k+g*r;f[8]=j*k-q*r;f[9]=i*k-p*r;
f[10]=h*k-o*r;f[11]=g*k-n*r;return f}},{}],111:[function(c,d,b){d.exports=a;function a(j,q,p){var r=Math.sin(p),o=Math.cos(p),i=q[0],h=q[1],g=q[2],f=q[3],n=q[8],m=q[9],l=q[10],k=q[11];
if(q!==j){j[4]=q[4];j[5]=q[5];j[6]=q[6];j[7]=q[7];j[12]=q[12];j[13]=q[13];j[14]=q[14];
j[15]=q[15]}j[0]=i*o-n*r;j[1]=h*o-m*r;j[2]=g*o-l*r;j[3]=f*o-k*r;j[8]=i*r+n*o;j[9]=h*r+m*o;
j[10]=g*r+l*o;j[11]=f*r+k*o;return j}},{}],112:[function(c,d,b){d.exports=a;function a(j,m,l){var r=Math.sin(l),k=Math.cos(l),i=m[0],h=m[1],g=m[2],f=m[3],q=m[4],p=m[5],o=m[6],n=m[7];
if(m!==j){j[8]=m[8];j[9]=m[9];j[10]=m[10];j[11]=m[11];j[12]=m[12];j[13]=m[13];j[14]=m[14];
j[15]=m[15]}j[0]=i*k+q*r;j[1]=h*k+p*r;j[2]=g*k+o*r;j[3]=f*k+n*r;j[4]=q*k-i*r;j[5]=p*k-h*r;
j[6]=o*k-g*r;j[7]=n*k-f*r;return j}},{}],113:[function(b,c,a){c.exports=d;function d(i,g,h){var f=h[0],k=h[1],j=h[2];
i[0]=g[0]*f;i[1]=g[1]*f;i[2]=g[2]*f;i[3]=g[3]*f;i[4]=g[4]*k;i[5]=g[5]*k;i[6]=g[6]*k;
i[7]=g[7]*k;i[8]=g[8]*j;i[9]=g[9]*j;i[10]=g[10]*j;i[11]=g[11]*j;i[12]=g[12];i[13]=g[13];
i[14]=g[14];i[15]=g[15];return i}},{}],114:[function(b,c,a){c.exports=d;function d(r,t,m){var l=m[0],k=m[1],j=m[2],A,w,u,s,i,h,g,f,q,p,o,n;
if(t===r){r[12]=t[0]*l+t[4]*k+t[8]*j+t[12];r[13]=t[1]*l+t[5]*k+t[9]*j+t[13];r[14]=t[2]*l+t[6]*k+t[10]*j+t[14];
r[15]=t[3]*l+t[7]*k+t[11]*j+t[15]}else{A=t[0];w=t[1];u=t[2];s=t[3];i=t[4];h=t[5];
g=t[6];f=t[7];q=t[8];p=t[9];o=t[10];n=t[11];r[0]=A;r[1]=w;r[2]=u;r[3]=s;r[4]=i;
r[5]=h;r[6]=g;r[7]=f;r[8]=q;r[9]=p;r[10]=o;r[11]=n;r[12]=A*l+i*k+q*j+t[12];r[13]=w*l+h*k+p*j+t[13];
r[14]=u*l+g*k+o*j+t[14];r[15]=s*l+f*k+n*j+t[15]}return r}},{}],115:[function(b,c,a){c.exports=d;
function d(i,h){if(i===h){var m=h[1],k=h[2],j=h[3],f=h[6],l=h[7],g=h[11];i[1]=h[4];
i[2]=h[8];i[3]=h[12];i[4]=m;i[6]=h[9];i[7]=h[13];i[8]=k;i[9]=f;i[11]=h[14];i[12]=j;
i[13]=l;i[14]=g}else{i[0]=h[0];i[1]=h[4];i[2]=h[8];i[3]=h[12];i[4]=h[1];i[5]=h[5];
i[6]=h[9];i[7]=h[13];i[8]=h[2];i[9]=h[6];i[10]=h[10];i[11]=h[14];i[12]=h[3];i[13]=h[7];
i[14]=h[11];i[15]=h[15]}return i}},{}],116:[function(b,d,a){d.exports=c;function c(){var f=new Float32Array(3);
f[0]=0;f[1]=0;f[2]=0;return f}},{}],117:[function(b,c,a){c.exports=d;function d(g,l,k){var f=l[0],n=l[1],m=l[2],j=k[0],i=k[1],h=k[2];
g[0]=n*h-m*i;g[1]=m*j-f*h;g[2]=f*i-n*j;return g}},{}],118:[function(c,d,b){d.exports=a;
function a(g,f){return g[0]*f[0]+g[1]*f[1]+g[2]*f[2]}},{}],119:[function(b,c,a){c.exports=d;
function d(f,i,h){var g=new Float32Array(3);g[0]=f;g[1]=i;g[2]=h;return g}},{}],120:[function(b,c,a){c.exports=d;
function d(g){var f=g[0],i=g[1],h=g[2];return Math.sqrt(f*f+i*i+h*h)}},{}],121:[function(c,d,b){d.exports=a;
function a(i,h){var g=h[0],k=h[1],j=h[2];var f=g*g+k*k+j*j;if(f>0){f=1/Math.sqrt(f);
i[0]=h[0]*f;i[1]=h[1]*f;i[2]=h[2]*f}return i}},{}],122:[function(b,d,a){d.exports=c;
function c(){var f=new Float32Array(4);f[0]=0;f[1]=0;f[2]=0;f[3]=0;return f}},{}],123:[function(b,c,a){c.exports=d;
function d(f,j,i,g){var h=new Float32Array(4);h[0]=f;h[1]=j;h[2]=i;h[3]=g;return h
}},{}],124:[function(b,d,a){d.exports=c;function c(j,i,g){var f=i[0],l=i[1],k=i[2],h=i[3];
j[0]=g[0]*f+g[4]*l+g[8]*k+g[12]*h;j[1]=g[1]*f+g[5]*l+g[9]*k+g[13]*h;j[2]=g[2]*f+g[6]*l+g[10]*k+g[14]*h;
j[3]=g[3]*f+g[7]*l+g[11]*k+g[15]*h;return j}},{}],125:[function(b,c,a){c.exports={Transform:b("./ac-transform/Transform")}
},{"./ac-transform/Transform":126}],126:[function(l,d,H){var k=l("./gl-matrix/mat4");
var b=l("./gl-matrix/vec3");var a=l("./gl-matrix/vec4");var f=Math.PI/180;var c=180/Math.PI;
var F=0,y=0,D=1,x=1,B=2,z=3;var j=4,w=4,i=5,v=5,h=6,g=7;var t=8,q=9,o=10,n=11;var G=12,u=12,E=13,s=13,C=14,A=15;
function p(){this.m=k.create()}var r=p.prototype;r.rotateX=function(J){var I=f*J;
k.rotateX(this.m,this.m,I);return this};r.rotateY=function(J){var I=f*J;k.rotateY(this.m,this.m,I);
return this};r.rotateZ=function(J){var I=f*J;k.rotateZ(this.m,this.m,I);return this
};r.rotate=r.rotateZ;r.rotate3d=function(J,M,L,K){if(M===null||M===undefined){M=J
}if(L===null||M===undefined){L=J}var I=f*K;k.rotate(this.m,this.m,I,[J,M,L]);return this
};r.rotateAxisAngle=r.rotate3d;r.scale=function(J,I){I=I||J;k.scale(this.m,this.m,[J,I,1]);
return this};r.scaleX=function(I){k.scale(this.m,this.m,[I,1,1]);return this};r.scaleY=function(I){k.scale(this.m,this.m,[1,I,1]);
return this};r.scaleZ=function(I){k.scale(this.m,this.m,[1,1,I]);return this};r.scale3d=function(K,J,I){k.scale(this.m,this.m,[K,J,I]);
return this};r.skew=function(K,J){if(J===null||J===undefined){return this.skewX(K)
}K=f*K;J=f*J;var I=k.create();I[w]=Math.tan(K);I[x]=Math.tan(J);k.multiply(this.m,this.m,I);
return this};r.skewX=function(J){J=f*J;var I=k.create();I[w]=Math.tan(J);k.multiply(this.m,this.m,I);
return this};r.skewY=function(J){J=f*J;var I=k.create();I[x]=Math.tan(J);k.multiply(this.m,this.m,I);
return this};r.translate=function(J,I){I=I||0;k.translate(this.m,this.m,[J,I,0]);
return this};r.translate3d=function(J,I,K){k.translate(this.m,this.m,[J,I,K]);return this
};r.translateX=function(I){k.translate(this.m,this.m,[I,0,0]);return this};r.translateY=function(I){k.translate(this.m,this.m,[0,I,0]);
return this};r.translateZ=function(I){k.translate(this.m,this.m,[0,0,I]);return this
};r.perspective=function(J){var I=k.create();if(J!==0){I[n]=-1/J}k.multiply(this.m,this.m,I)
};r.inverse=function(){var I=this.clone();I.m=k.invert(I.m,this.m);return I};r.reset=function(){k.identity(this.m);
return this};r.getTranslateXY=function(){var I=this.m;if(this.isAffine()){return[I[u],I[s]]
}return[I[G],I[E]]};r.getTranslateXYZ=function(){var I=this.m;if(this.isAffine()){return[I[u],I[s],0]
}return[I[G],I[E],I[C]]};r.getTranslateX=function(){var I=this.m;if(this.isAffine()){return I[u]
}return I[G]};r.getTranslateY=function(){var I=this.m;if(this.isAffine()){return I[s]
}return I[E]};r.getTranslateZ=function(){var I=this.m;if(this.isAffine()){return 0
}return I[C]};r.clone=function(){var I=new p();I.m=k.clone(this.m);return I};r.toArray=function(){var I=this.m;
if(this.isAffine()){return[I[y],I[x],I[w],I[v],I[u],I[s]]}return[I[F],I[D],I[B],I[z],I[j],I[i],I[h],I[g],I[t],I[q],I[o],I[n],I[G],I[E],I[C],I[A]]
};r.fromArray=function(I){this.m=Array.prototype.slice.call(I);return this};r.setMatrixValue=function(J){J=String(J).trim();
var I=k.create();if(J==="none"){this.m=I;return this}var L=J.slice(0,J.indexOf("(")),M,K;
if(L==="matrix3d"){M=J.slice(9,-1).split(",");for(K=0;K<M.length;K++){I[K]=parseFloat(M[K])
}}else{if(L==="matrix"){M=J.slice(7,-1).split(",");for(K=M.length;K--;){M[K]=parseFloat(M[K])
}I[F]=M[0];I[D]=M[1];I[G]=M[4];I[j]=M[2];I[i]=M[3];I[E]=M[5]}else{throw new TypeError("Invalid Matrix Value")
}}this.m=I;return this};var m=function m(I){return Math.abs(I)<0.0001};r.decompose=function(T){T=T||false;
var X=k.clone(this.m);var O=b.create();var ad=b.create();var L=b.create();var Q=a.create();
var J=a.create();var K=b.create();for(var Z=0;Z<16;Z++){X[Z]/=X[A]}var V=k.clone(X);
V[z]=0;V[g]=0;V[n]=0;V[A]=1;var aa=X[3],M=X[7],P=X[11],af=X[12],ae=X[13],ac=X[14],ab=X[15];
var S=a.create();if(!m(X[z])||!m(X[g])||!m(X[n])){S[0]=X[z];S[1]=X[g];S[2]=X[n];
S[3]=X[A];var Y=k.invert(k.create(),V);var R=k.transpose(k.create(),Y);Q=a.transformMat4(Q,S,R)
}else{Q=a.fromValues(0,0,0,1)}O[0]=af;O[1]=ae;O[2]=ac;var N=[b.create(),b.create(),b.create()];
N[0][0]=X[0];N[0][1]=X[1];N[0][2]=X[2];N[1][0]=X[4];N[1][1]=X[5];N[1][2]=X[6];N[2][0]=X[8];
N[2][1]=X[9];N[2][2]=X[10];ad[0]=b.length(N[0]);b.normalize(N[0],N[0]);L[0]=b.dot(N[0],N[1]);
N[1]=this._combine(N[1],N[0],1,-L[0]);ad[1]=b.length(N[1]);b.normalize(N[1],N[1]);
L[0]/=ad[1];L[1]=b.dot(N[0],N[2]);N[2]=this._combine(N[2],N[0],1,-L[1]);L[2]=b.dot(N[1],N[2]);
N[2]=this._combine(N[2],N[1],1,-L[2]);ad[2]=b.length(N[2]);b.normalize(N[2],N[2]);
L[1]/=ad[2];L[2]/=ad[2];var W=b.cross(b.create(),N[1],N[2]);if(b.dot(N[0],W)<0){for(Z=0;
Z<3;Z++){ad[Z]*=-1;N[Z][0]*=-1;N[Z][1]*=-1;N[Z][2]*=-1}}J[0]=0.5*Math.sqrt(Math.max(1+N[0][0]-N[1][1]-N[2][2],0));
J[1]=0.5*Math.sqrt(Math.max(1-N[0][0]+N[1][1]-N[2][2],0));J[2]=0.5*Math.sqrt(Math.max(1-N[0][0]-N[1][1]+N[2][2],0));
J[3]=0.5*Math.sqrt(Math.max(1+N[0][0]+N[1][1]+N[2][2],0));if(N[2][1]>N[1][2]){J[0]=-J[0]
}if(N[0][2]>N[2][0]){J[1]=-J[1]}if(N[1][0]>N[0][1]){J[2]=-J[2]}var I=a.fromValues(J[0],J[1],J[2],2*Math.acos(J[3]));
var U=this._rotationFromQuat(J);if(T){L[0]=Math.round(L[0]*c*100)/100;L[1]=Math.round(L[1]*c*100)/100;
L[2]=Math.round(L[2]*c*100)/100;U[0]=Math.round(U[0]*c*100)/100;U[1]=Math.round(U[1]*c*100)/100;
U[2]=Math.round(U[2]*c*100)/100;I[3]=Math.round(I[3]*c*100)/100}return{translation:O,scale:ad,skew:L,perspective:Q,quaternion:J,eulerRotation:U,axisAngle:I}
};r.recompose=function(O,N,K,L,M){O=O||b.create();N=N||b.create();K=K||b.create();
L=L||a.create();M=M||a.create();var J=k.fromRotationTranslation(k.create(),M,O);
J[z]=L[0];J[g]=L[1];J[n]=L[2];J[A]=L[3];var I=k.create();if(K[2]!==0){I[q]=K[2];
k.multiply(J,J,I)}if(K[1]!==0){I[q]=0;I[t]=K[1];k.multiply(J,J,I)}if(K[0]){I[t]=0;
I[4]=K[0];k.multiply(J,J,I)}k.scale(J,J,N);this.m=J;return this};r.isAffine=function(){return this.m[B]===0&&this.m[z]===0&&this.m[h]===0&&this.m[g]===0&&this.m[t]===0&&this.m[q]===0&&this.m[o]===1&&this.m[n]===0&&this.m[C]===0&&this.m[A]===1
};r.toString=function(){var I=this.m;if(this.isAffine()){return"matrix("+I[y]+", "+I[x]+", "+I[w]+", "+I[v]+", "+I[u]+", "+I[s]+")"
}return"matrix3d("+I[F]+", "+I[D]+", "+I[B]+", "+I[z]+", "+I[j]+", "+I[i]+", "+I[h]+", "+I[g]+", "+I[t]+", "+I[q]+", "+I[o]+", "+I[n]+", "+I[G]+", "+I[E]+", "+I[C]+", "+I[A]+")"
};r.toCSSString=r.toString;r._combine=function(J,M,L,K){var I=b.create();I[0]=L*J[0]+K*M[0];
I[1]=L*J[1]+K*M[1];I[2]=L*J[2]+K*M[2];return I};r._matrix2dToMat4=function(I){var K=k.create();
for(var L=0;L<4;L++){for(var J=0;J<4;J++){K[L*4+J]=I[L][J]}}return K};r._mat4ToMatrix2d=function(L){var I=[];
for(var K=0;K<4;K++){I[K]=[];for(var J=0;J<4;J++){I[K][J]=L[K*4+J]}}return I};r._rotationFromQuat=function(I){var M=I[3]*I[3];
var L=I[0]*I[0];var K=I[1]*I[1];var J=I[2]*I[2];var R=L+K+J+M;var N=I[0]*I[1]+I[2]*I[3];
var Q,P,O;if(N>0.499*R){P=2*Math.atan2(I[0],I[3]);O=Math.PI/2;Q=0;return b.fromValues(Q,P,O)
}if(N<-0.499*R){P=-2*Math.atan2(I[0],I[3]);O=-Math.PI/2;Q=0;return b.fromValues(Q,P,O)
}P=Math.atan2(2*I[1]*I[3]-2*I[0]*I[2],L-K-J+M);O=Math.asin(2*N/R);Q=Math.atan2(2*I[0]*I[3]-2*I[1]*I[2],-L+K-J+M);
return b.fromValues(Q,P,O)};d.exports=p},{"./gl-matrix/mat4":127,"./gl-matrix/vec3":128,"./gl-matrix/vec4":129}],127:[function(c,d,a){var b={create:c("gl-mat4/create"),rotate:c("gl-mat4/rotate"),rotateX:c("gl-mat4/rotateX"),rotateY:c("gl-mat4/rotateY"),rotateZ:c("gl-mat4/rotateZ"),scale:c("gl-mat4/scale"),multiply:c("gl-mat4/multiply"),translate:c("gl-mat4/translate"),invert:c("gl-mat4/invert"),clone:c("gl-mat4/clone"),transpose:c("gl-mat4/transpose"),identity:c("gl-mat4/identity"),fromRotationTranslation:c("gl-mat4/fromRotationTranslation")};
d.exports=b},{"gl-mat4/clone":103,"gl-mat4/create":104,"gl-mat4/fromRotationTranslation":105,"gl-mat4/identity":106,"gl-mat4/invert":107,"gl-mat4/multiply":108,"gl-mat4/rotate":109,"gl-mat4/rotateX":110,"gl-mat4/rotateY":111,"gl-mat4/rotateZ":112,"gl-mat4/scale":113,"gl-mat4/translate":114,"gl-mat4/transpose":115}],128:[function(b,d,a){var c={create:b("gl-vec3/create"),dot:b("gl-vec3/dot"),normalize:b("gl-vec3/normalize"),length:b("gl-vec3/length"),cross:b("gl-vec3/cross"),fromValues:b("gl-vec3/fromValues")};
d.exports=c},{"gl-vec3/create":116,"gl-vec3/cross":117,"gl-vec3/dot":118,"gl-vec3/fromValues":119,"gl-vec3/length":120,"gl-vec3/normalize":121}],129:[function(c,d,a){var b={create:c("gl-vec4/create"),transformMat4:c("gl-vec4/transformMat4"),fromValues:c("gl-vec4/fromValues")};
d.exports=b},{"gl-vec4/create":122,"gl-vec4/fromValues":123,"gl-vec4/transformMat4":124}],130:[function(g,d,h){g("./helpers/Float32Array");
var c=g("./helpers/transitionEnd");var i=g("@marcom/ac-clip").Clip;var k=g("./clips/ClipEasing");
var f=g("./clips/ClipInlineCss");var j=g("./clips/ClipTransitionCss");function b(n,m,o,l){if(n.nodeType){if(c===undefined||l&&l.inlineStyles){return new f(n,m,o,l)
}return new j(n,m,o,l)}return new k(n,m,o,l)}for(var a in i){if(typeof i[a]==="function"&&a.substr(0,1)!=="_"){b[a]=i[a].bind(i)
}}b.to=function(n,m,o,l){l=l||{};if(l.destroyOnComplete===undefined){l.destroyOnComplete=true
}return new b(n,m,o,l).play()};b.from=function(o,n,l,m){m=m||{};m.propsFrom=l;if(m.destroyOnComplete===undefined){m.destroyOnComplete=true
}return new b(o,n,m.propsTo,m).play()};d.exports=b},{"./clips/ClipEasing":131,"./clips/ClipInlineCss":132,"./clips/ClipTransitionCss":133,"./helpers/Float32Array":136,"./helpers/transitionEnd":145,"@marcom/ac-clip":75}],131:[function(b,a,c){var k=b("@marcom/ac-object/clone");
var g=b("@marcom/ac-object/create");var n=b("@marcom/ac-easing").createPredefined;
var l=b("../helpers/isCssCubicBezierString");var f=b("../helpers/BezierCurveCssManager");
var i=b("@marcom/ac-clip").Clip;var j=b("@marcom/ac-easing").Ease;function m(q,p,r,o){if(o&&l(o.ease)){o.ease=f.create(o.ease).toEasingFunction()
}o=o||{};this._propsEase=o.propsEase||{};i.call(this,q,p,r,o)}var h=i.prototype;
var d=m.prototype=g(h);d.reset=function(){var p=h.reset.call(this);if(this._clips){var o=this._clips.length;
while(o--){this._clips[o].reset()}}return p};d.destroy=function(){if(this._clips){var o=this._clips.length;
while(o--){this._clips[o].destroy()}this._clips=null}this._eases=null;this._storeOnUpdate=null;
return h.destroy.call(this)};d._prepareProperties=function(){var o=0;var r={};var p={};
var s={};var v;var u;if(this._propsEase){for(v in this._propsTo){if(this._propsTo.hasOwnProperty(v)){u=this._propsEase[v];
if(l(u)){u=f.create(u).toEasingFunction()}if(u===undefined){if(r[this._ease]===undefined){r[this._ease]={};
p[this._ease]={};s[this._ease]=this._ease.easingFunction;o++}r[this._ease][v]=this._propsTo[v];
p[this._ease][v]=this._propsFrom[v]}else{if(typeof u==="function"){r[o]={};p[o]={};
r[o][v]=this._propsTo[v];p[o][v]=this._propsFrom[v];s[o]=u;o++}else{if(r[u]===undefined){r[u]={};
p[u]={};s[u]=u;o++}r[u][v]=this._propsTo[v];p[u][v]=this._propsFrom[v]}}}}if(o>1){var q=k(this._options||{},true);
var t=this._duration*0.001;this._storeOnUpdate=this._onUpdate;this._onUpdate=this._onUpdateClips;
q.onStart=null;q.onUpdate=null;q.onDraw=null;q.onComplete=null;this._clips=[];for(u in r){if(r.hasOwnProperty(u)){q.ease=s[u];
q.propsFrom=p[u];this._clips.push(new i(this._target,t,r[u],q))}}u="linear";this._propsTo={};
this._propsFrom={}}else{for(v in s){if(s.hasOwnProperty(v)){u=s[v]}}}if(u!==undefined){this._ease=typeof u==="function"?new j(u):n(u)
}}return h._prepareProperties.call(this)};d._onUpdateClips=function(q){var o=this._direction===1?q.progress():1-q.progress();
var p=this._clips.length;while(p--){this._clips[p].progress(o)}if(typeof this._storeOnUpdate==="function"){this._storeOnUpdate.call(this,this)
}};a.exports=m},{"../helpers/BezierCurveCssManager":135,"../helpers/isCssCubicBezierString":141,"@marcom/ac-clip":75,"@marcom/ac-easing":63,"@marcom/ac-object/clone":340,"@marcom/ac-object/create":341}],132:[function(f,c,g){var l=f("@marcom/ac-dom-styles/setStyle");
var b=f("../helpers/convertToStyleObject");var d=f("../helpers/convertToTransitionableObjects");
var i=f("@marcom/ac-object/create");var j=f("../helpers/removeTransitions");var m=f("./ClipEasing");
function a(p,o,q,n){n=n||{};this._el=p;this._storeOnStart=n.onStart||null;this._storeOnDraw=n.onDraw||null;
this._storeOnComplete=n.onComplete||null;n.onStart=this._onStart;n.onDraw=this._onDraw;
n.onComplete=this._onComplete;m.call(this,{},o,q,n)}var k=m.prototype;var h=a.prototype=i(k);
h.play=function(){var n=k.play.call(this);if(this._remainingDelay!==0){l(this._el,b(this._target))
}return n};h.reset=function(){var n=k.reset.call(this);l(this._el,b(this._target));
return n};h.destroy=function(){this._el=null;this._completeStyles=null;this._storeOnStart=null;
this._storeOnDraw=null;this._storeOnComplete=null;return k.destroy.call(this)};
h.target=function(){return this._el};h._prepareProperties=function(){var q=d(this._el,this._propsTo,this._propsFrom);
this._target=q.target;this._propsFrom=q.propsFrom;this._propsTo=q.propsTo;j(this._el,this._target);
var o=this._isYoyo?this._propsFrom:this._propsTo;this._completeStyles=b(o);if(this._options.removeStylesOnComplete!==undefined){var r;
var p=this._options.removeStylesOnComplete;if(typeof p==="boolean"&&p){for(r in this._completeStyles){if(this._completeStyles.hasOwnProperty(r)){this._completeStyles[r]=null
}}}else{if((typeof p==="undefined"?"undefined":_typeof(p))==="object"&&p.length){var n=p.length;
while(n--){r=p[n];if(this._completeStyles.hasOwnProperty(r)){this._completeStyles[r]=null
}}}}}return k._prepareProperties.call(this)};h._onStart=function(n){if(this.playing()&&this._direction===1&&this._delay===0){l(this._el,b(this._propsFrom))
}if(typeof this._storeOnStart==="function"){this._storeOnStart.call(this,this)}};
h._onDraw=function(n){l(this._el,b(this._target));if(typeof this._storeOnDraw==="function"){this._storeOnDraw.call(this,this)
}};h._onComplete=function(n){l(this._el,this._completeStyles);if(typeof this._storeOnComplete==="function"){this._storeOnComplete.call(this,this)
}};c.exports=a},{"../helpers/convertToStyleObject":138,"../helpers/convertToTransitionableObjects":139,"../helpers/removeTransitions":142,"./ClipEasing":131,"@marcom/ac-dom-styles/setStyle":45,"@marcom/ac-object/create":341}],133:[function(k,b,y){var d=k("@marcom/ac-dom-styles/setStyle");
var f=k("@marcom/ac-dom-styles/getStyle");var c=k("../helpers/convertToStyleObject");
var p=k("../helpers/convertToTransitionableObjects");var x=k("@marcom/ac-object/clone");
var n=k("@marcom/ac-object/create");var u=k("@marcom/ac-easing").createPredefined;
var m=k("../helpers/isCssCubicBezierString");var v=k("../helpers/removeTransitions");
var j=k("../helpers/transitionEnd");var o=k("../helpers/waitAnimationFrames");var w=k("../helpers/BezierCurveCssManager");
var a=k("@marcom/ac-clip").Clip;var s=k("./ClipEasing");var t=k("@marcom/ac-page-visibility").PageVisibilityManager;
var g="ease";var i="%EASE% is not a supported predefined ease when transitioning with Elements and CSS transition. If you need to use %EASE% then pass the inlineStyle:true option.";
var l="Function eases are not supported when using CSS transitions with Elements. Either use a cubic-bezier string (e.g. 'cubic-bezier(0, 0, 1, 1)' or pass the inlineStyle option as `true` to render styles each frame instead of using CSS transitions.";
function h(B,A,C,z){z=z||{};this._el=B;this._storeEase=z.ease;if(typeof this._storeEase==="function"){throw new Error(l)
}this._storeOnStart=z.onStart||null;this._storeOnComplete=z.onComplete||null;z.onStart=this._onStart.bind(this);
z.onComplete=this._onComplete.bind(this);this._stylesTo=x(C,true);this._stylesFrom=z.propsFrom?x(z.propsFrom,true):{};
this._propsEase=z.propsEase?x(z.propsEase,true):{};if(m(z.ease)){z.ease=w.create(z.ease).toEasingFunction()
}a.call(this,{},A,{},z);this._propsFrom={}}var q=a.prototype;var r=h.prototype=n(q);
r.play=function(){var z=q.play.call(this);if(this._direction===1&&this.progress()===0&&this._remainingDelay!==0){this._applyStyles(0,c(this._stylesFrom))
}return z};r.reset=function(){var z=q.reset.call(this);this._stylesClip.reset();
this._applyStyles(0,c(this._styles));return z};r.destroy=function(){t.off("changed",this._onVisibilityChanged);
this._removeTransitionListener();this.off("pause",this._onPaused);this._onPaused();
this._stylesClip.destroy();this._stylesClip=null;this._el=null;this._propsArray=null;
this._styles=null;this._stylesFrom=null;this._stylesTo=null;this._completeStyles=null;
this._storeOnStart=null;this._storeOnComplete=null;this._onTransitionEnded=null;
return q.destroy.call(this)};r.target=function(){return this._el};r.duration=function(A){var z=q.duration.call(this,A);
if(A===undefined){return z}if(this.playing()){this.progress(this._progress)}return z
};r.progress=function(z){var A=q.progress.call(this,z);if(z===undefined){return A
}z=this._direction===1?z:1-z;this._stylesClip.progress(z);this._applyStyles(0,c(this._styles));
if(this.playing()){this._isWaitingForStylesToBeApplied=true;o(this._setStylesAfterWaiting,2)
}return A};r._prepareProperties=function(){var B=p(this._el,this._stylesTo,this._stylesFrom);
this._styles=B.target;this._stylesTo=B.propsTo;this._stylesFrom=B.propsFrom;var C=this._storeEase||g;
this._eases={};this._propsArray=[];var E;this._styleCompleteTo=c(this._stylesTo);
this._styleCompleteFrom=c(this._stylesFrom);this._propsEaseKeys={};var D;for(D in this._stylesTo){if(this._stylesTo.hasOwnProperty(D)){this._propsArray[this._propsArray.length]=D;
if(this._propsEase[D]===undefined){if(this._eases[C]===undefined){E=this._convertEase(C);
this._eases[C]=E.css}this._propsEaseKeys[D]=C}else{if(this._eases[this._propsEase[D]]===undefined){E=this._convertEase(this._propsEase[D]);
this._eases[this._propsEase[D]]=E.css;this._propsEaseKeys[D]=this._propsEase[D];
this._propsEase[D]=E.js}else{if(m(this._propsEase[D])){this._propsEaseKeys[D]=this._propsEase[D];
this._propsEase[D]=this._eases[this._propsEase[D]]["1"].toEasingFunction()}}}}}this._onPaused=this._onPaused.bind(this);
this.on("pause",this._onPaused);this._setOtherTransitions();this._currentTransitionStyles=this._otherTransitions;
this._completeStyles=c(this._isYoyo?this._stylesFrom:this._stylesTo);if(this._options.removeStylesOnComplete!==undefined){var A=this._options.removeStylesOnComplete;
if(typeof A==="boolean"&&A){for(D in this._stylesTo){this._completeStyles[D]=null
}}else{if((typeof A==="undefined"?"undefined":_typeof(A))==="object"&&A.length){var z=A.length;
while(z--){this._completeStyles[A[z]]=null}}}}this._onTransitionEnded=this._onTransitionEnded.bind(this);
this._setStylesAfterWaiting=this._setStylesAfterWaiting.bind(this);this._onVisibilityChanged=this._onVisibilityChanged.bind(this);
t.on(t.CHANGED,this._onVisibilityChanged);this._stylesClip=new s(this._styles,1,this._stylesTo,{ease:this._options.ease,propsFrom:this._stylesFrom,propsEase:this._options.propsEase});
a._remove(this._stylesClip);return q._prepareProperties.call(this)};r._convertEase=function(B){if(typeof B==="function"){throw new Error(l)
}var z;var A;if(m(B)){z=w.create(B);A=z.toEasingFunction()}else{var C=u(B);if(C.cssString===null){throw new Error(i.replace(/%EASE%/g,B))
}z=w.create(C.cssString);A=B}return{css:{"1":z,"-1":z.reversed()},js:A}};r._complete=function(){if((this._isWaitingForStylesToBeApplied||this._isTransitionEnded||!this._isListeningForTransitionEnd)&&this.progress()===1){this._isWaitingForStylesToBeApplied=false;
q._complete.call(this)}};r._onTransitionEnded=function(){this._isTransitionEnded=true;
this._complete()};r._addTransitionListener=function(){if(!this._isListeningForTransitionEnd&&this._el&&this._onTransitionEnded){this._isListeningForTransitionEnd=true;
this._isTransitionEnded=false;this._el.addEventListener(j,this._onTransitionEnded)
}};r._removeTransitionListener=function(){if(this._isListeningForTransitionEnd&&this._el&&this._onTransitionEnded){this._isListeningForTransitionEnd=false;
this._isTransitionEnded=false;this._el.removeEventListener(j,this._onTransitionEnded)
}};r._applyStyles=function(B,z){if(B>0){var C="";var A={};var D;for(D in this._eases){if(this._eases.hasOwnProperty(D)){A[D]=this._eases[D][this._direction].splitAt(this.progress()).toCSSString()
}}for(D in this._stylesTo){if(this._stylesTo.hasOwnProperty(D)){C+=D+" "+B+"ms "+A[this._propsEaseKeys[D]]+" 0ms, "
}}this._currentTransitionStyles=C.substr(0,C.length-2);if(!this._doStylesMatchCurrentStyles(z)){this._addTransitionListener()
}else{this._removeTransitionListener()}}else{this._currentTransitionStyles="";this._removeTransitionListener()
}z.transition=this._getOtherClipTransitionStyles()+this._currentTransitionStyles;
d(this._el,z)};r._doStylesMatchCurrentStyles=function(B){var A=f.apply(this,[this._el].concat([this._propsArray]));
var z;for(z in B){if(B.hasOwnProperty(z)&&A.hasOwnProperty(z)&&B[z]!==A[z]){return false
}}return true};r._setStylesAfterWaiting=function(){this._isWaitingForStylesToBeApplied=false;
if(this.playing()){var A=this._durationMs*(1-this.progress());var z=this._direction>0?this._styleCompleteTo:this._styleCompleteFrom;
this._applyStyles(A,z)}};r._setOtherTransitions=function(){v(this._el,this._stylesTo);
var z=a.getAll(this._el);var A=z.length;while(A--){if(z[A]!==this&&z[A].playing()&&z[A]._otherTransitions&&z[A]._otherTransitions.length){this._otherTransitions=z[A]._otherTransitions;
return}}this._otherTransitions=f(this._el,"transition").transition;if(this._otherTransitions===null||this._otherTransitions==="all 0s ease 0s"){this._otherTransitions=""
}};r._getTransitionStyles=function(){var z=this._getOtherClipTransitionStyles();
if(this._otherTransitions.length){z+=this._otherTransitions}else{if(z.length){z=z.substr(0,z.length-2)
}}return z};r._getOtherClipTransitionStyles=function(){var B="";var z=a.getAll(this._el);
var A=z.length;while(A--){if(z[A]!==this&&z[A].playing()&&z[A]._currentTransitionStyles&&z[A]._currentTransitionStyles.length){B+=z[A]._currentTransitionStyles+", "
}}return B};r._onVisibilityChanged=function(z){if(this.playing()&&!z.isHidden){this._update({timeNow:this._getTime()});
var A=this.progress();if(A<1){this.progress(A)}}};r._onPaused=function(A){var z=f.apply(this,[this._el].concat([this._propsArray]));
z.transition=this._getTransitionStyles();this._removeTransitionListener();d(this._el,z)
};r._onStart=function(z){var A=this._direction===1&&this.progress()===0&&this._delay===0?2:0;
if(A){this._isWaitingForStylesToBeApplied=true;this._applyStyles(0,this._styleCompleteFrom)
}o(this._setStylesAfterWaiting,A);if(typeof this._storeOnStart==="function"){this._storeOnStart.call(this,this)
}};r._onComplete=function(z){this._removeTransitionListener();this._completeStyles.transition=this._getTransitionStyles();
d(this._el,this._completeStyles);if(typeof this._storeOnComplete==="function"){this._storeOnComplete.call(this,this)
}};b.exports=h},{"../helpers/BezierCurveCssManager":135,"../helpers/convertToStyleObject":138,"../helpers/convertToTransitionableObjects":139,"../helpers/isCssCubicBezierString":141,"../helpers/removeTransitions":142,"../helpers/transitionEnd":145,"../helpers/waitAnimationFrames":146,"./ClipEasing":131,"@marcom/ac-clip":75,"@marcom/ac-dom-styles/getStyle":43,"@marcom/ac-dom-styles/setStyle":45,"@marcom/ac-easing":63,"@marcom/ac-object/clone":340,"@marcom/ac-object/create":341,"@marcom/ac-page-visibility":101}],134:[function(c,d,a){var g=c("@marcom/ac-easing").createBezier;
function b(i,h){this.manager=h;this.p1={x:i[0],y:i[1]};this.p2={x:i[2],y:i[3]};
this._isLinear=this.p1.x===this.p1.y&&this.p2.x===this.p2.y;this._cacheSplits={}
}var f=b.prototype;f.splitAt=function(k){if(this._isLinear){return this}k=Math.round(k*40)/40;
if(k===0){return this}else{if(this._cacheSplits[k]!==undefined){return this._cacheSplits[k]
}}var q=[this.p1.x,this.p2.x];var n=[this.p1.y,this.p2.y];var m=0;var o=k;var i=0;
var p=1;var j=this._getStartX(k,q);while(o!==j&&m<1000){if(o<j){p=k}else{i=k}k=i+(p-i)*0.5;
j=this._getStartX(k,q);++m}var l=this._splitBezier(k,q,n);var r=this._normalize(l);
var h=this.manager.create(r);this._cacheSplits[o]=h;return h};f.reversed=function(){var h=this.toArray();
return this.manager.create([0.5-(h[2]-0.5),0.5-(h[3]-0.5),0.5-(h[0]-0.5),0.5-(h[1]-0.5)])
};f.toArray=function(){return[this.p1.x,this.p1.y,this.p2.x,this.p2.y]};f.toCSSString=function(){return"cubic-bezier("+this.p1.x+", "+this.p1.y+", "+this.p2.x+", "+this.p2.y+")"
};f.toEasingFunction=function(){return g.apply(this,this.toArray()).easingFunction
};f._getStartX=function(m,h){var l=m-1;var k=m*m;var j=l*l;var i=k*m;return i-3*k*l*h[1]+3*m*j*h[0]
};f._splitBezier=function(m,h,n){var l=m-1;var k=m*m;var j=l*l;var i=k*m;return[i-3*k*l*h[1]+3*m*j*h[0],i-3*k*l*n[1]+3*m*j*n[0],k-2*m*l*h[1]+j*h[0],k-2*m*l*n[1]+j*n[0],m-l*h[1],m-l*n[1]]
};f._normalize=function(h){return[(h[2]-h[0])/(1-h[0]),(h[3]-h[1])/(1-h[1]),(h[4]-h[0])/(1-h[0]),(h[5]-h[1])/(1-h[1])]
};d.exports=b},{"@marcom/ac-easing":63}],135:[function(c,d,a){var b=c("./BezierCurveCss");
function g(){this._instances={}}var f=g.prototype;f.create=function(k){var j;if(typeof k==="string"){j=k.replace(/ /g,"")
}else{j="cubic-bezier("+k.join(",")+")"}if(this._instances[j]===undefined){if(typeof k==="string"){k=k.match(/\d*\.?\d+/g);
var h=k.length;while(h--){k[h]=Number(k[h])}}this._instances[j]=new b(k,this)}return this._instances[j]
};d.exports=new g()},{"./BezierCurveCss":134}],136:[function(b,c,a){if(typeof window.Float32Array==="undefined"){window.Float32Array=function(){}
}},{}],137:[function(f,g,d){var a=f("@marcom/ac-dom-metrics/getDimensions");var c=f("./splitUnits");
var b={translateX:"width",translateY:"height"};function i(j,l,m){this._transform=j;
var k;var n;var o;for(o in m){if(m.hasOwnProperty(o)&&typeof this._transform[o]==="function"){k=c(m[o]);
if(k.unit==="%"){n=this._convertPercentToPixelValue(o,k.value,l)}else{n=k.value
}this._transform[o].call(this._transform,n)}}}var h=i.prototype;h._convertPercentToPixelValue=function(m,l,k){m=b[m];
var j=a(k);if(j[m]){l*=0.01;return j[m]*l}return l};h.toArray=function(){return this._transform.toArray()
};h.toCSSString=function(){return this._transform.toCSSString()};g.exports=i},{"./splitUnits":143,"@marcom/ac-dom-metrics/getDimensions":97}],138:[function(b,c,a){c.exports=function d(h){var g={};
var f;var i;for(i in h){if(h.hasOwnProperty(i)&&h[i]!==null){if(h[i].isColor){if(h[i].isRgb){g[i]="rgb("+Math.round(h[i].r)+", "+Math.round(h[i].g)+", "+Math.round(h[i].b)+")"
}else{if(h[i].isRgba){g[i]="rgba("+Math.round(h[i].r)+", "+Math.round(h[i].g)+", "+Math.round(h[i].b)+", "+h[i].a+")"
}}}else{if(i==="transform"){f=h[i].length===6?"matrix":"matrix3d";g[i]=f+"("+h[i].join(",")+")"
}else{if(!h[i].unit){g[i]=h[i].value}else{g[i]=h[i].value+h[i].unit}}}}}return g
}},{}],139:[function(h,d,j){var m=h("@marcom/ac-dom-styles/getStyle");var o=h("@marcom/ac-object/clone");
var f=h("./splitUnits");var b=h("./toCamCase");var c=h("@marcom/ac-color").Color;
var l=h("@marcom/ac-feature/cssPropertyAvailable");var i=h("@marcom/ac-transform").Transform;
var a=h("./TransformMatrix");var n=function n(s){if(c.isRgba(s)){s=new c(s).rgbaObject();
s.isRgba=true}else{s=new c(s).rgbObject();s.isRgb=true}s.isColor=true;return s};
var r=function r(s){if(s.isRgb){s.isRgb=false;s.isRgba=true;s.a=1}};var q=function q(t,s,u){if(t.isRgba||s.isRgba||u.isRgba){r(t);
r(s);r(u)}};var p=function p(s){return[s[0],s[1],0,0,s[2],s[3],0,0,0,0,1,0,s[4],s[5],0,1]
};var k=function k(t,s,u){if(t.transform.length===16||s.transform.length===16||u.transform.length===16){if(t.transform.length===6){t.transform=p(t.transform)
}if(s.transform.length===6){s.transform=p(s.transform)}if(u.transform.length===6){u.transform=p(u.transform)
}}};d.exports=function g(u,A,z){var w={};A=o(A,true);z=o(z,true);var t;var B;var x;
var y;var v=l("transform");var s;for(s in A){if(A.hasOwnProperty(s)&&A[s]!==null){if(s==="transform"){if(v){B=new i();
t=m(u,"transform")["transform"]||"none";B.setMatrixValue(t);x=new a(new i(),u,A[s])
}if(x&&x.toCSSString()!==B.toCSSString()){y=new a(z[s]?new i():B.clone(),u,z[s]);
w[s]=B.toArray();A[s]=x.toArray();z[s]=y.toArray()}else{w[s]=null;A[s]=null}}else{t=m(u,s)[b(s)]||z[s];
if(c.isColor(t)){w[s]=n(t);z[s]=z[s]!==undefined?n(z[s]):o(w[s],true);A[s]=n(A[s])
}else{w[s]=f(t);z[s]=z[s]!==undefined?f(z[s]):o(w[s],true);A[s]=f(A[s])}}}}for(s in z){if(z.hasOwnProperty(s)&&z[s]!==null&&(A[s]===undefined||A[s]===null)){if(s==="transform"){if(v){B=new i();
B.setMatrixValue(getComputedStyle(u).transform||getComputedStyle(u).webkitTransform||"none");
y=new a(new i(),u,z[s])}if(y&&y.toCSSString()!==B.toCSSString()){x=new a(B.clone());
w[s]=B.toArray();A[s]=x.toArray();z[s]=y.toArray()}else{w[s]=null;A[s]=null;z[s]=null
}}else{t=m(u,s)[b(s)];if(c.isColor(t)){w[s]=n(t);A[s]=o(w[s],true);z[s]=n(z[s])
}else{w[s]=f(t);z[s]=f(z[s]);A[s]=o(w[s],true)}}}if(w[s]&&w[s].isColor){q(w[s],z[s],A[s])
}}if(w.transform){k(w,z,A)}return{target:w,propsTo:A,propsFrom:z}}},{"./TransformMatrix":137,"./splitUnits":143,"./toCamCase":144,"@marcom/ac-color":77,"@marcom/ac-dom-styles/getStyle":43,"@marcom/ac-feature/cssPropertyAvailable":168,"@marcom/ac-object/clone":340,"@marcom/ac-transform":125}],140:[function(b,c,a){c.exports=function d(j){if(j.transitionProperty){var m="";
var h=j.transitionProperty.split(", ");var k=j.transitionDuration.split(", ");var l=j.transitionTimingFunction.replace(/\d+[,]+[\s]/gi,function(i){return i.substr(0,i.length-1)
}).split(", ");var f=j.transitionDelay.split(", ");var g=h.length;while(g--){m+=h[g]+" "+k[g]+" "+l[g]+" "+f[g]+", "
}return m.substr(0,m.length-2)}return false}},{}],141:[function(c,d,b){d.exports=function a(f){return typeof f==="string"&&f.substr(0,13)==="cubic-bezier("
}},{}],142:[function(d,f,c){var h=d("@marcom/ac-dom-styles/setStyle");var a=d("@marcom/ac-dom-styles/getStyle");
var g=d("./getShorthandTransition");f.exports=function b(l,n){var m=a(l,"transition","transition-property","transition-duration","transition-timing-function","transition-delay");
m=m.transition||g(m);if(m&&m.length){m=m.split(",");var k=0;var o;var j=m.length;
while(j--){o=m[j].trim().split(" ")[0];if(n[o]!==undefined){m.splice(j,1);++k}}if(k){if(m.length===0){m=["all"]
}h(l,{transition:m.join(",").trim()})}}}},{"./getShorthandTransition":140,"@marcom/ac-dom-styles/getStyle":43,"@marcom/ac-dom-styles/setStyle":45}],143:[function(c,d,b){d.exports=function a(i){i=String(i);
if(i.indexOf(" ")>-1){throw new Error("Shorthand CSS is not supported. Please use longhand CSS only.")
}var h=/(\d*\.?\d*)(.*)/;var f=1;if(i&&i.substr(0,1)==="-"){i=i.substr(1);f=-1}var g=String(i).match(h);
return{value:Number(g[1])*f,unit:g[2]}}},{}],144:[function(c,d,b){d.exports=function a(g){var f=function f(i,j,k,h){return k===0&&h.substr(1,3)!=="moz"?j:j.toUpperCase()
};return g.replace(/-(\w)/g,f)}},{}],145:[function(d,f,c){var a;f.exports=function b(){if(a){return a
}var g;var h=document.createElement("fakeelement");var i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};
for(g in i){if(h.style[g]!==undefined){a=i[g];return a}}}()},{}],146:[function(d,f,b){var a=d("@marcom/ac-page-visibility").PageVisibilityManager;
f.exports=function c(k,i){if(i){var j=function j(l){if(a.isHidden){setTimeout(l,16)
}else{window.requestAnimationFrame(l)}};var h=0;var g=function g(){if(h===i){k.call(this)
}else{++h;j(g)}};g()}else{k.call(this)}}},{"@marcom/ac-page-visibility":101}],147:[function(b,c,a){c.exports={EventEmitterMicro:b("./ac-event-emitter-micro/EventEmitterMicro")}
},{"./ac-event-emitter-micro/EventEmitterMicro":148}],148:[function(b,c,a){function f(){this._events={}
}var d=f.prototype;d.on=function(g,h){this._events[g]=this._events[g]||[];this._events[g].unshift(h)
};d.once=function(g,j){var i=this;function h(k){i.off(g,h);if(k!==undefined){j(k)
}else{j()}}this.on(g,h)};d.off=function(g,i){if(!this.has(g)){return}if(arguments.length===1){this._events[g]=null;
delete this._events[g];return}var h=this._events[g].indexOf(i);if(h===-1){return
}this._events[g].splice(h,1)};d.trigger=function(g,j){if(!this.has(g)){return}for(var h=this._events[g].length-1;
h>=0;h--){if(j!==undefined){this._events[g][h](j)}else{this._events[g][h]()}}};
d.has=function(g){if(g in this._events===false||this._events[g].length===0){return false
}return true};d.destroy=function(){for(var g in this._events){this._events[g]=null
}this._events=null};c.exports=f},{}],149:[function(c,d,b){var a=function a(){var h="";
var g;for(g=0;g<arguments.length;g++){if(g>0){h+=","}h+=arguments[g]}return h};
d.exports=function f(i,h){h=h||a;var g=function g(){var j=arguments;var k=h.apply(this,j);
if(!(k in g.cache)){g.cache[k]=i.apply(this,j)}return g.cache[k]};g.cache={};return g
}},{}],150:[function(b,c,a){c.exports=function d(g){var f;return function(){if(typeof f==="undefined"){f=g.apply(this,arguments)
}return f}}},{}],151:[function(d,b,f){var g=d("./utils/eventTypeAvailable");var j=d("./shared/camelCasedEventTypes");
var c=d("./shared/windowFallbackEventTypes");var h=d("./shared/prefixHelper");var a={};
b.exports=function i(m,l){var n;var o;var k;l=l||"div";m=m.toLowerCase();if(!(l in a)){a[l]={}
}o=a[l];if(m in o){return o[m]}if(g(m,l)){return o[m]=m}if(m in j){for(k=0;k<j[m].length;
k++){n=j[m][k];if(g(n.toLowerCase(),l)){return o[m]=n}}}for(k=0;k<h.evt.length;
k++){n=h.evt[k]+m;if(g(n,l)){h.reduce(k);return o[m]=n}}if(l!=="window"&&c.indexOf(m)){return o[m]=i(m,"window")
}return o[m]=false}},{"./shared/camelCasedEventTypes":154,"./shared/prefixHelper":156,"./shared/windowFallbackEventTypes":159,"./utils/eventTypeAvailable":160}],152:[function(b,c,a){arguments[4][33][0].apply(a,arguments)
},{"./shared/getStyleTestElement":155,"./shared/prefixHelper":156,"./shared/stylePropertyCache":157,"./utils/toCSS":161,"./utils/toDOM":162,dup:33}],153:[function(b,c,a){arguments[4][34][0].apply(a,arguments)
},{"./getStyleProperty":152,"./shared/prefixHelper":156,"./shared/stylePropertyCache":157,"./shared/styleValueAvailable":158,dup:34}],154:[function(b,c,a){c.exports={transitionend:["webkitTransitionEnd","MSTransitionEnd"],animationstart:["webkitAnimationStart","MSAnimationStart"],animationend:["webkitAnimationEnd","MSAnimationEnd"],animationiteration:["webkitAnimationIteration","MSAnimationIteration"],fullscreenchange:["MSFullscreenChange"],fullscreenerror:["MSFullscreenError"]}
},{}],155:[function(b,c,a){arguments[4][35][0].apply(a,arguments)},{dup:35}],156:[function(b,c,a){arguments[4][36][0].apply(a,arguments)
},{dup:36}],157:[function(b,c,a){arguments[4][37][0].apply(a,arguments)},{dup:37}],158:[function(b,c,a){arguments[4][38][0].apply(a,arguments)
},{"./getStyleTestElement":155,"./stylePropertyCache":157,dup:38}],159:[function(b,c,a){c.exports=["transitionend","animationstart","animationend","animationiteration"]
},{}],160:[function(c,f,b){var a={window:window,document:document};f.exports=function d(i,g){var h;
i="on"+i;if(!(g in a)){a[g]=document.createElement(g)}h=a[g];if(i in h){return true
}if("setAttribute" in h){h.setAttribute(i,"return;");return typeof h[i]==="function"
}return false}},{}],161:[function(b,c,a){arguments[4][40][0].apply(a,arguments)
},{dup:40}],162:[function(b,c,a){arguments[4][41][0].apply(a,arguments)},{dup:41}],163:[function(b,c,a){c.exports={canvasAvailable:b("./canvasAvailable"),continuousScrollEventsAvailable:b("./continuousScrollEventsAvailable"),cookiesAvailable:b("./cookiesAvailable"),cssLinearGradientAvailable:b("./cssLinearGradientAvailable"),cssPropertyAvailable:b("./cssPropertyAvailable"),cssViewportUnitsAvailable:b("./cssViewportUnitsAvailable"),elementAttributeAvailable:b("./elementAttributeAvailable"),eventTypeAvailable:b("./eventTypeAvailable"),isDesktop:b("./isDesktop"),isHandheld:b("./isHandheld"),isRetina:b("./isRetina"),isTablet:b("./isTablet"),localStorageAvailable:b("./localStorageAvailable"),mediaElementsAvailable:b("./mediaElementsAvailable"),mediaQueriesAvailable:b("./mediaQueriesAvailable"),prefersReducedMotion:b("./prefersReducedMotion"),sessionStorageAvailable:b("./sessionStorageAvailable"),svgAvailable:b("./svgAvailable"),threeDTransformsAvailable:b("./threeDTransformsAvailable"),touchAvailable:b("./touchAvailable"),webGLAvailable:b("./webGLAvailable")}
},{"./canvasAvailable":164,"./continuousScrollEventsAvailable":165,"./cookiesAvailable":166,"./cssLinearGradientAvailable":167,"./cssPropertyAvailable":168,"./cssViewportUnitsAvailable":169,"./elementAttributeAvailable":170,"./eventTypeAvailable":171,"./isDesktop":173,"./isHandheld":174,"./isRetina":175,"./isTablet":176,"./localStorageAvailable":177,"./mediaElementsAvailable":178,"./mediaQueriesAvailable":179,"./prefersReducedMotion":180,"./sessionStorageAvailable":181,"./svgAvailable":182,"./threeDTransformsAvailable":183,"./touchAvailable":184,"./webGLAvailable":185}],164:[function(b,c,a){var g=b("./helpers/globals");
var f=b("@marcom/ac-function/once");var d=function d(){var h=g.getDocument();var i=h.createElement("canvas");
return !!(typeof i.getContext==="function"&&i.getContext("2d"))};c.exports=f(d);
c.exports.original=d},{"./helpers/globals":172,"@marcom/ac-function/once":150}],165:[function(c,f,b){var d=c("@marcom/ac-useragent");
var a=c("./touchAvailable").original;var g=c("@marcom/ac-function/once");function h(){return !a()||d.os.ios&&d.os.version.major>=8||d.browser.chrome
}f.exports=g(h);f.exports.original=h},{"./touchAvailable":184,"@marcom/ac-function/once":150,"@marcom/ac-useragent":427}],166:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var k=false;var h=g.getDocument();
var j=g.getNavigator();try{if("cookie" in h&&!!j.cookieEnabled){h.cookie="ac_feature_cookie=1";
k=h.cookie.indexOf("ac_feature_cookie")!==-1;h.cookie="ac_feature_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}}catch(i){}return k}d.exports=f(a);d.exports.original=a},{"./helpers/globals":172,"@marcom/ac-function/once":150}],167:[function(c,d,b){var g=c("@marcom/ac-prefixer/getStyleValue");
var f=c("@marcom/ac-function/once");function a(){var h=["linear-gradient(to bottom right, #9f9, white)","linear-gradient(top left, #9f9, white)","gradient(linear, left top, right bottom, from(#9f9), to(white))"];
return h.some(function(i){return !!g("background-image",i)})}d.exports=f(a);d.exports.original=a
},{"@marcom/ac-function/once":150,"@marcom/ac-prefixer/getStyleValue":153}],168:[function(c,d,b){var g=c("@marcom/ac-prefixer/getStyleValue");
var f=c("@marcom/ac-prefixer/getStyleProperty");var h=c("@marcom/ac-function/memoize");
function a(j,i){if(typeof i!=="undefined"){return !!g(j,i)}else{return !!f(j)}}d.exports=h(a);
d.exports.original=a},{"@marcom/ac-function/memoize":149,"@marcom/ac-prefixer/getStyleProperty":152,"@marcom/ac-prefixer/getStyleValue":153}],169:[function(b,c,a){var f=b("@marcom/ac-prefixer/getStyleValue");
var d=b("@marcom/ac-function/once");function g(){return !!f("margin","1vw 1vh")
}c.exports=d(g);c.exports.original=g},{"@marcom/ac-function/once":150,"@marcom/ac-prefixer/getStyleValue":153}],170:[function(b,d,a){var f=b("./helpers/globals");
var g=b("@marcom/ac-function/memoize");function c(h,j){var i=f.getDocument();var k;
j=j||"div";k=i.createElement(j);return h in k}d.exports=g(c);d.exports.original=c
},{"./helpers/globals":172,"@marcom/ac-function/memoize":149}],171:[function(c,f,b){var a=c("@marcom/ac-prefixer/getEventType");
var g=c("@marcom/ac-function/memoize");function d(i,h){return !!a(i,h)}f.exports=g(d);
f.exports.original=d},{"@marcom/ac-function/memoize":149,"@marcom/ac-prefixer/getEventType":151}],172:[function(b,d,a){d.exports={getWindow:function c(){return window
},getDocument:function f(){return document},getNavigator:function g(){return navigator
}}},{}],173:[function(d,f,b){var a=d("./touchAvailable").original;var h=d("./helpers/globals");
var g=d("@marcom/ac-function/once");function c(){var i=h.getWindow();return !a()&&!i.orientation
}f.exports=g(c);f.exports.original=c},{"./helpers/globals":172,"./touchAvailable":184,"@marcom/ac-function/once":150}],174:[function(f,g,c){var d=f("./isDesktop").original;
var a=f("./isTablet").original;var h=f("@marcom/ac-function/once");function b(){return !d()&&!a()
}g.exports=h(b);g.exports.original=b},{"./isDesktop":173,"./isTablet":176,"@marcom/ac-function/once":150}],175:[function(b,c,a){var d=b("./helpers/globals");
c.exports=function f(){var g=d.getWindow();return"devicePixelRatio" in g&&g.devicePixelRatio>=1.5
}},{"./helpers/globals":172}],176:[function(f,g,c){var d=f("./isDesktop").original;
var i=f("./helpers/globals");var h=f("@marcom/ac-function/once");var b=600;function a(){var k=i.getWindow();
var j=k.screen.width;if(k.orientation&&k.screen.height<j){j=k.screen.height}return !d()&&j>=b
}g.exports=h(a);g.exports.original=a},{"./helpers/globals":172,"./isDesktop":173,"@marcom/ac-function/once":150}],177:[function(c,d,a){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function b(){var j=g.getWindow();var i=false;
try{i=!!(j.localStorage&&j.localStorage.non_existent!==null)}catch(h){}return i
}d.exports=f(b);d.exports.original=b},{"./helpers/globals":172,"@marcom/ac-function/once":150}],178:[function(b,c,a){var g=b("./helpers/globals");
var d=b("@marcom/ac-function/once");function f(){var h=g.getWindow();return"HTMLMediaElement" in h
}c.exports=d(f);c.exports.original=f},{"./helpers/globals":172,"@marcom/ac-function/once":150}],179:[function(c,d,b){c("@marcom/ac-polyfills/matchMedia");
var g=c("./helpers/globals");var f=c("@marcom/ac-function/once");function a(){var i=g.getWindow();
var h=i.matchMedia("only all");return !!(h&&h.matches)}d.exports=f(a);d.exports.original=a
},{"./helpers/globals":172,"@marcom/ac-function/once":150,"@marcom/ac-polyfills/matchMedia":402}],180:[function(b,c,a){var f=b("./helpers/globals");
function d(){var h=f.getWindow();var g=h.matchMedia("(prefers-reduced-motion)");
return !!(g&&g.matches)}c.exports=d},{"./helpers/globals":172}],181:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var j=g.getWindow();var h=false;
try{if("sessionStorage" in j&&typeof j.sessionStorage.setItem==="function"){j.sessionStorage.setItem("ac_feature","test");
h=true;j.sessionStorage.removeItem("ac_feature","test")}}catch(i){}return h}d.exports=f(a);
d.exports.original=a},{"./helpers/globals":172,"@marcom/ac-function/once":150}],182:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var h=g.getDocument();return !!h.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":172,"@marcom/ac-function/once":150}],183:[function(b,c,a){var g=b("@marcom/ac-prefixer/getStyleValue");
var d=b("@marcom/ac-function/once");function f(){return !!(g("perspective","1px")&&g("transform","translateZ(0)"))
}c.exports=d(f);c.exports.original=f},{"@marcom/ac-function/once":150,"@marcom/ac-prefixer/getStyleValue":153}],184:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var j=g.getWindow();var h=g.getDocument();
var i=g.getNavigator();return !!("ontouchstart" in j||j.DocumentTouch&&h instanceof j.DocumentTouch||i.maxTouchPoints>0||i.msMaxTouchPoints>0)
}d.exports=f(a);d.exports.original=a},{"./helpers/globals":172,"@marcom/ac-function/once":150}],185:[function(c,d,b){var g=c("./helpers/globals");
var f=c("@marcom/ac-function/once");function a(){var h=g.getDocument();var i=h.createElement("canvas");
if(typeof i.getContext==="function"){return !!(i.getContext("webgl")||i.getContext("experimental-webgl"))
}return false}d.exports=f(a);d.exports.original=a},{"./helpers/globals":172,"@marcom/ac-function/once":150}],186:[function(b,c,a){var f={};
c.exports=function d(h,g,l){h=h.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");if(l||!f.hasOwnProperty(h)){var j=new RegExp("[\\?&]"+h+"=([^&#]*)");
var i=j.exec(location.search);var k=i===null?g:decodeURIComponent(i[1].replace(/\+/g," "));
if(k==="true"||k==="false"){k=k==="true"}if(!isNaN(parseFloat(k))){k=parseFloat(k)
}f[h]=k}return f[h]}},{}],187:[function(c,d,b){var a=c("@marcom/ac-jetpack-lib/core/BaseComponent");
var i=a.prototype;var h={ELEMENT_ENGAGEMENT:"data-engaged"};function g(o,q,j,m,k,p,l){this.name="EngagedElementComponent_"+l;
a.call(this,o,q,j,m,k,p,l);this.timeToEngage=300;this.inViewThreshold=0.75;if(this.element.hasAttribute(h.ELEMENT_ENGAGEMENT)){try{this._overwriteElementEngagementProps()
}catch(n){console.error("EngagedElementAnimationComponent::_overwriteElementEngagementProps bad JSON in data-attribute!",n)
}}this.trackedElement=this.section.elementEngagement.addElement(this.element,{timeToEngage:this.timeToEngage,inViewThreshold:this.inViewThreshold})
}var f=g.prototype=Object.create(a.prototype);g.prototype.constructor=g;f.setupEvents=function(){i.setupEvents.call(this);
this._onElementEngaged=this._onElementEngaged.bind(this);this.trackedElement.once("engaged",this._onElementEngaged)
};f._onElementEngaged=function(j){this.element.classList.add("engaged")};f._overwriteElementEngagementProps=function(){var k=this.element.getAttribute(h.ELEMENT_ENGAGEMENT);
var j=JSON.parse(k);this.timeToEngage=j.timeToEngage===undefined?this.timeToEngage:parseFloat(j.timeToEngage);
this.inViewThreshold=j.inViewThreshold===undefined?this.inViewThreshold:parseFloat(j.inViewThreshold)
};d.exports=g},{"@marcom/ac-jetpack-lib/core/BaseComponent":200}],188:[function(c,b,g){var d=c("@marcom/ac-jetpack-lib/core/BaseComponent");
var m=document.querySelector("#ac-localnav");var a=m.clientHeight;var l="";var f=null;
var j=0;var i={THEME:"data-localnav-theme"};function k(r,t,n,q,o,s,p){this.name="LocalnavThemeChangerComponent_"+j++;
d.call(this,r,t,n,q,o,s,p);this.theme=this.element.getAttribute(i.THEME);this.top=this.element.getBoundingClientRect().top+o;
this.bottom=this.element.getBoundingClientRect().bottom+o}var h=k.prototype=Object.create(d.prototype);
k.prototype.constructor=k;h.onSectionWillAppear=function(n,o){this.onScroll(null,n,o)
};h.onSectionWillDisappear=function(n,o){this.onScroll(null,n,o)};h.onScroll=function(p,o,q){var n=o+a;
if(this.top<n&&this.bottom>n){if(f&&f.theme!==this.theme){f.removeTheme()}f=this;
this.setTheme()}else{if(f===this){this.removeTheme();f=null}}};h.onResizeImmediate=function(o,n,p){this.top=this.element.getBoundingClientRect().top+n;
this.bottom=this.element.getBoundingClientRect().bottom+n;a=m.clientHeight};h.setTheme=function(){if(l===this.theme){return
}if(l!==""){m.classList.remove(l)}m.classList.add(this.theme);l=this.theme};h.removeTheme=function(){if(l!==this.theme){return
}m.classList.remove(l);l=""};b.exports=k},{"@marcom/ac-jetpack-lib/core/BaseComponent":200}],189:[function(g,c,i){var h=g("@marcom/ac-jetpack-lib/core/BaseComponent");
var d=g("@marcom/ac-jetpack-lib/model/EnabledFeatures");var q=h.prototype;var r=g("path");
var n=g("@marcom/ac-feature/canvasAvailable");var o=g("@marcom/ac-media-object");
var p=g("@marcom/ac-viewport-emitter");var l=g("@marcom/ac-cname").cname;var f=g("@marcom/ac-eclipse/Clip");
var b=0.2;var m=0;var k={ELEMENT_ENGAGEMENT:"data-engaged",MEDIA:"data-media"};
function a(x,z,s,v,t,y,u){this._name="MediaObjectComponent_"+u+"-"+m++;h.call(this,x,z,s,v,t,y,u);
if(!n()){return}this.uriPattern=a.URI_PATTERN;this.type="flow";this.name=null;this.locale="us";
this.rewindWhenInactive=false;this.loop=false;this.playbackRate=1;this.mute=false;
this.transitionIn=false;this.iosInline=false;try{this._overwriteMediaProps()}catch(w){console.error("MediaObjectComponent::_overwriteMediaProps bad JSON in data-attribute!",w)
}if(!this.name){console.log("Missing media name for "+this.element);return}this._media=null;
this._fadeClip=null;this._breakpoint=v;this._retina=p.retina;this._canLoad=false;
this._loadCalled=false;this._enhanceCalled=false;this._isEngaged=false;this._isSectionVisible=false;
this._isShown=false;this._mediaIsPlaying=false;this._mediaHasPlayed=false;this._playOnceReady=false;
this._onMediaLoaded=this._onMediaLoaded.bind(this);this._onMediaEnhanced=this._onMediaEnhanced.bind(this);
this._onMediaReady=this._onMediaReady.bind(this);this._onFadeInComplete=this._onFadeInComplete.bind(this);
this.timeToEngage=0;this.inViewThreshold=0.75;if(this.element.hasAttribute(k.ELEMENT_ENGAGEMENT)){try{this._overwriteElementEngagementProps()
}catch(w){console.error("EngagedElementAnimationComponent::_overwriteElementEngagementProps bad JSON in data-attribute!",w)
}}this.trackedElement=this.section.elementEngagement.addElement(this.element,{timeToEngage:this.timeToEngage,inViewThreshold:this.inViewThreshold});
this._initializeMedia()}var j=a.prototype=Object.create(h.prototype);a.prototype.constructor=a;
a.URI_PATTERN="";j.setupEvents=function(){q.setupEvents.call(this);this._onElementEngaged=this._onElementEngaged.bind(this);
if(this.trackedElement){this.trackedElement.on("engaged",this._onElementEngaged)
}};j.onSectionWillAppear=function(s,t){q.onSectionWillAppear.call(this,s,t);this._isSectionVisible=true;
this._loadMedia()};j.onSectionWillDisappear=function(s,t){q.onSectionWillDisappear.call(this,s,t);
this._isSectionVisible=false;if(this.rewindWhenInactive){this._rewindMedia()}else{this._pauseMedia()
}};j.onBreakpoint=function(t,v,s,u){q.onSectionWillDisappear.call(this,t,v,s,u);
this._rebuildIfChanged("_breakpoint",t)};j.onRetinaChange=function(v,t,s,u){q.onSectionWillDisappear.call(this,v,t,s,u);
this._rebuildIfChanged("_retina",v)};j._viewportForName=function(t,s){if(s.indexOf("xlarge")>-1){return"large"+(s.indexOf("_2x")>-1?"_2x":"")
}return s};j._uriPatternForName=function(s,t){return t};j._rebuildIfChanged=function(w,v){var u=JSON.stringify(this._getMediaSource());
this[w]=v;var t=JSON.stringify(this._getMediaSource());if(u!=t){var s=this._mediaIsPlaying;
this._destroyMedia();this._initializeMedia();if(this._isSectionVisible){if(s){this._playMedia()
}else{this._loadMedia()}}}};j._overwriteMediaProps=function(){var t=this.element.getAttribute(k.MEDIA);
var s=JSON.parse(t);this.uriPattern=s.uriPattern===undefined?this.uriPattern:s.uriPattern;
this.type=s.type===undefined?this.type:s.type;this.name=s.name===undefined?this.name:s.name;
this.locale=s.locale===undefined?this.locale:s.locale;this.rewindWhenInactive=s.rewindWhenInactive===undefined?this.rewindWhenInactive:s.rewindWhenInactive;
this.loop=s.loop===undefined?this.loop:s.loop;this.playbackRate=s.playbackRate===undefined?this.playbackRate:s.playbackRate;
this.mute=s.mute===undefined?this.mute:s.mute;this.iosInline=s.iosInline===undefined?this.iosInline:s.iosInline;
this.transitionIn=s.transitionIn===undefined?this.transitionIn:s.transitionIn};
j._overwriteElementEngagementProps=function(){var t=this.element.getAttribute(k.ELEMENT_ENGAGEMENT);
var s=JSON.parse(t);this.timeToEngage=s.timeToEngage===undefined?this.timeToEngage:parseFloat(s.timeToEngage);
this.inViewThreshold=s.inViewThreshold===undefined?this.inViewThreshold:parseFloat(s.inViewThreshold)
};j._getMediaSource=function(){var w=this._uriPatternForName(this.name,this.uriPattern);
var t=this._retina?this._breakpoint.concat("_2x"):this._breakpoint;t=this._viewportForName(this.name,t);
if((typeof w==="undefined"?"undefined":_typeof(w))=="object"){w=w[this.type]}var v=w.replace("{{locale}}",this.locale).replace("{{name}}",this.name).replace("{{type}}",this.type).replace("{{viewport}}",t);
if(r.isAbsolute(v)){v=l.addPrefix(v)}var u=r.dirname(v);var s=r.basename(v);if(this.type==="split-file"&&d.IS_DESKTOP){return{basePath:r.dirname(v)+"/"+r.basename(v),splitFileLoading:true}
}else{return{basePath:r.dirname(v),filename:r.basename(v),fileFormat:this.type==="flow"?"jpg":"mp4"}
}};j._initializeMedia=function(){var s;if(this.type=="flow"){s=o.createFlow}else{s=o.createVideo
}this.element.classList.remove("mediaobject-destroyed","mediaobject-enhanced","mediaobject-ended");
this._media=s(this.element,this._getMediaSource(),{looping:this.loop,playbackRate:this.playbackRate,iosInline:this.iosInline});
this._media.on("ready",this._onMediaReady);this._canLoad=true;this._loadCalled=false;
this._enhanceCalled=false;this._mediaIsPlaying=false;this._mediaHasPlayed=false;
this._isShown=false;this._playOnceReady=false};j._onElementEngaged=function(s){this.element.classList.add("engaged");
if(this._media&&(!this._isEngaged||!this._media.getEnded()||this.rewindWhenInactive||this.loop)){this._isEngaged=true;
this._playMedia()}};j._onMediaLoaded=function(){this._enhanceMedia()};j._onMediaEnhanced=function(){if(this.transitionIn){this._media.mediaElement.style.opacity=0
}if(this._playOnceReady){this._playMedia()}};j._onMediaReady=function(){if(this._playOnceReady){this._playMedia()
}};j._fadeIn=function(){this._fadeClip=new f(this._media.mediaElement,b,{opacity:1},{ease:"easeInQuad",onComplete:this._onFadeInComplete}).play()
};j._onFadeInComplete=function(){this._isShown=true;if(this._playOnceReady){this._playMedia()
}};j._loadMedia=function(){if(this._media&&this._canLoad&&!this._loadCalled){this._loadCalled=true;
this._media.on("loaded",this._onMediaLoaded);this._media.load()}};j._enhanceMedia=function(){if(this._media&&!this._enhanceCalled){this._enhanceCalled=true;
this._media.on("enhanced",this._onMediaEnhanced);this._media.enhance()}};j._playMedia=function(){this._mediaHasPlayed=true;
this._playOnceReady=true;if(!this._media){return}if(this._media.getReady()){if(this.transitionIn){if((!this._fadeClip||!this._fadeClip.playing())&&!this._isShown){this._fadeClip=new f(this._media.mediaElement,b,{opacity:1},{ease:"easeInQuad",onComplete:this._onFadeInComplete}).play()
}else{this._startMedia()}}else{this._startMedia()}}else{this._loadMedia()}};j._startMedia=function(){this._playOnceReady=false;
this._mediaIsPlaying=true;this._media.play();if(this.mute){this._media.mediaElement.muted=true
}};j._pauseMedia=function(){if(this._media&&this._mediaIsPlaying){this._mediaIsPlaying=false;
try{this._media.pause()}catch(s){}}};j._rewindMedia=function(){if(this._media&&this._mediaIsPlaying){this._mediaIsPlaying=false;
try{this._media.pause();this._media.setCurrentTime(0);this._media.pause()}catch(s){}}};
j._destroyMedia=function(){if(this._media){this._media.off();this._pauseMedia();
this._media.destroy();this._media=null;this._canLoad=true;this._loadCalled=false;
this._enhanceCalled=false;this._mediaIsPlaying=false;this._mediaHasPlayed=false;
this._isShown=false;this._playOnceReady=false}if(this._fadeClip&&this._fadeClip.playing()){this._fadeClip.destroy();
this._fadeClip=null}};c.exports=a},{"@marcom/ac-cname":26,"@marcom/ac-eclipse/Clip":130,"@marcom/ac-feature/canvasAvailable":164,"@marcom/ac-jetpack-lib/core/BaseComponent":200,"@marcom/ac-jetpack-lib/model/EnabledFeatures":205,"@marcom/ac-media-object":326,"@marcom/ac-viewport-emitter":433,path:463}],190:[function(b,d,a){var c=b("./ac-element-engagement/ElementEngagement");
d.exports=new c();d.exports.ElementEngagement=c},{"./ac-element-engagement/ElementEngagement":191}],191:[function(c,b,f){var g;
var k=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;var d={defaults:c("@marcom/ac-object/defaults"),extend:c("@marcom/ac-object/extend")};
var h=c("@marcom/ac-element-tracker").ElementTracker;var j={timeToEngage:500,inViewThreshold:0.75,stopOnEngaged:true};
var i={thresholdEnterTime:0,thresholdExitTime:0,inThreshold:false,engaged:false,tracking:true};
var a=function a(l){h.call(this,null,l);k.call(this);this._thresholdEnter=this._thresholdEnter.bind(this);
this._thresholdExit=this._thresholdExit.bind(this);this._enterView=this._enterView.bind(this);
this._exitView=this._exitView.bind(this)};g=a.prototype=Object.create(h.prototype);
g=d.extend(g,k.prototype);g._decorateTrackedElement=function(m,l){var n;n=d.defaults(j,l||{});
d.extend(m,n);d.extend(m,i)};g._attachElementListeners=function(l){l.on("thresholdenter",this._thresholdEnter,this);
l.on("thresholdexit",this._thresholdExit,this);l.on("enterview",this._enterView,this);
l.on("exitview",this._exitView,this)};g._removeElementListeners=function(l){l.off("thresholdenter",this._thresholdEnter);
l.off("thresholdexit",this._thresholdExit);l.off("enterview",this._enterView);l.off("exitview",this._exitView)
};g._attachAllElementListeners=function(){this.elements.forEach(function(l){if(!l.stopOnEngaged){this._attachElementListeners(l)
}else{if(!l.engaged){this._attachElementListeners(l)}}},this)};g._removeAllElementListeners=function(){this.elements.forEach(function(l){this._removeElementListeners(l)
},this)};g._elementInViewPastThreshold=function(m){var l=false;if(m.pixelsInView===this._windowHeight){l=true
}else{l=m.percentInView>m.inViewThreshold}return l};g._ifInView=function(l,n){var m=l.inThreshold;
h.prototype._ifInView.apply(this,arguments);if(!m&&this._elementInViewPastThreshold(l)){l.inThreshold=true;
l.trigger("thresholdenter",l);if(typeof l.timeToEngage==="number"&&l.timeToEngage>=0){l.engagedTimeout=window.setTimeout(this._engaged.bind(this,l),l.timeToEngage)
}}};g._ifAlreadyInView=function(l){var m=l.inThreshold;h.prototype._ifAlreadyInView.apply(this,arguments);
if(m&&!this._elementInViewPastThreshold(l)){l.inThreshold=false;l.trigger("thresholdexit",l);
if(l.engagedTimeout){window.clearTimeout(l.engagedTimeout);l.engagedTimeout=null
}}};g._engaged=function(l){l.engagedTimeout=null;this._elementEngaged(l);l.trigger("engaged",l);
this.trigger("engaged",l)};g._thresholdEnter=function(l){l.thresholdEnterTime=Date.now();
l.thresholdExitTime=0;this.trigger("thresholdenter",l)};g._thresholdExit=function(l){l.thresholdExitTime=Date.now();
this.trigger("thresholdexit",l)};g._enterView=function(l){this.trigger("enterview",l)
};g._exitView=function(l){this.trigger("exitview",l)};g._elementEngaged=function(l){l.engaged=true;
if(l.stopOnEngaged){this.stop(l)}};g.stop=function(l){if(this.tracking&&!l){this._removeAllElementListeners();
h.prototype.stop.call(this)}if(l&&l.tracking){l.tracking=false;this._removeElementListeners(l);
this.removeElement(l)}};g.start=function(l){if(!l){this._attachAllElementListeners()
}if(l&&!l.tracking){if(!l.stopOnEngaged){l.tracking=true;this._attachElementListeners(l)
}else{if(!l.engaged){l.tracking=true;this._attachElementListeners(l)}}}if(!this.tracking){h.prototype.start.call(this)
}else{this.refreshAllElementMetrics();this.refreshAllElementStates()}};g.addElement=function(n,l){l=l||{};
var m=h.prototype.addElement.call(this,n,l.useRenderedPosition);this._decorateTrackedElement(m,l);
return m};g.addElements=function(m,l){[].forEach.call(m,function(n){this.addElement(n,l)
},this)};b.exports=a},{"@marcom/ac-element-tracker":197,"@marcom/ac-event-emitter-micro":147,"@marcom/ac-object/defaults":342,"@marcom/ac-object/extend":343}],192:[function(b,c,a){arguments[4][49][0].apply(a,arguments)
},{dup:49}],193:[function(b,c,a){arguments[4][51][0].apply(a,arguments)},{"../isNode":195,dup:51}],194:[function(b,c,a){arguments[4][54][0].apply(a,arguments)
},{"./ELEMENT_NODE":192,"./internal/isNodeType":193,dup:54}],195:[function(b,c,a){arguments[4][55][0].apply(a,arguments)
},{dup:55}],196:[function(c,d,b){var f=/^\[object (HTMLCollection|NodeList|Object)\]$/;
d.exports=function a(g){if(!g){return false}if(typeof g.length!=="number"){return false
}if(_typeof(g[0])==="object"&&(!g[0]||!g[0].nodeType)){return false}return f.test(Object.prototype.toString.call(g))
}},{}],197:[function(b,c,a){var f=b("./ac-element-tracker/ElementTracker");var d=b("./ac-element-tracker/TrackedElement");
c.exports=new f();c.exports.ElementTracker=f;c.exports.TrackedElement=d},{"./ac-element-tracker/ElementTracker":198,"./ac-element-tracker/TrackedElement":199}],198:[function(d,c,h){var k={isNodeList:d("@marcom/ac-dom-nodes/isNodeList"),isElement:d("@marcom/ac-dom-nodes/isElement")};
var a={getDimensions:d("@marcom/ac-dom-metrics/getDimensions"),getPagePosition:d("@marcom/ac-dom-metrics/getPagePosition"),getScrollY:d("@marcom/ac-dom-metrics/getScrollY")};
var f={clone:d("@marcom/ac-object/clone"),extend:d("@marcom/ac-object/extend")};
var j=d("./TrackedElement");var g={autoStart:false,useRenderedPosition:false};function b(m,l){this.options=f.clone(g);
this.options=(typeof l==="undefined"?"undefined":_typeof(l))==="object"?f.extend(this.options,l):this.options;
this._scrollY=this._getScrollY();this._windowHeight=this._getWindowHeight();this.tracking=false;
this.elements=[];if(m&&(Array.isArray(m)||k.isNodeList(m)||k.isElement(m))){this.addElements(m)
}this.refreshAllElementStates=this.refreshAllElementStates.bind(this);this.refreshAllElementMetrics=this.refreshAllElementMetrics.bind(this);
if(this.options.autoStart){this.start()}}var i=b.prototype;i.destroy=function(){var m,l;
this.stop();for(m=0,l=this.elements.length;m<l;m++){this.elements[m].destroy()}this.elements=null;
this.options=null};i._registerTrackedElements=function(l){var m=[].concat(l);m.forEach(function(n){if(this._elementInDOM(n.element)){n.offsetTop=n.element.offsetTop;
this.elements.push(n)}},this)};i._elementInDOM=function(n){var m=false;var l=document.getElementsByTagName("body")[0];
if(k.isElement(n)&&l.contains(n)){m=true}return m};i._elementPercentInView=function(l){return l.pixelsInView/l.height
};i._elementPixelsInView=function(m){var l=m.top-this._scrollY;var n=m.bottom-this._scrollY;
if(l>this._windowHeight||n<0){return 0}return Math.min(n,this._windowHeight)-Math.max(l,0)
};i._ifInView=function(l,m){if(!m){l.trigger("enterview",l)}};i._ifAlreadyInView=function(l){if(!l.inView){l.trigger("exitview",l)
}};i.addElements=function(o,n){if(typeof n==="undefined"){n=this.options.useRenderedPosition
}o=k.isNodeList(o)?Array.prototype.slice.call(o):[].concat(o);for(var m=0,l=o.length;
m<l;m++){this.addElement(o[m],n)}};i.addElement=function(m,n){var l=null;if(typeof n==="undefined"){n=this.options.useRenderedPosition
}if(k.isElement(m)){l=new j(m,n);this._registerTrackedElements(l);this.refreshElementMetrics(l);
this.refreshElementState(l)}else{throw new TypeError("ElementTracker: "+m+" is not a valid DOM element")
}return l};i.removeElement=function(n){var m=[];var l;this.elements.forEach(function(p,o){if(p===n||p.element===n){m.push(o)
}});l=this.elements.filter(function(p,o){return m.indexOf(o)<0});this.elements=l
};i.start=function(){if(this.tracking===false){this.tracking=true;window.addEventListener("resize",this.refreshAllElementMetrics);
window.addEventListener("orientationchange",this.refreshAllElementMetrics);window.addEventListener("scroll",this.refreshAllElementStates);
this.refreshAllElementMetrics()}};i.stop=function(){if(this.tracking===true){this.tracking=false;
window.removeEventListener("resize",this.refreshAllElementMetrics);window.removeEventListener("orientationchange",this.refreshAllElementMetrics);
window.removeEventListener("scroll",this.refreshAllElementStates)}};i.refreshAllElementMetrics=function(l,m){if(typeof l!=="number"){l=this._getScrollY()
}if(typeof m!=="number"){m=this._getWindowHeight()}this._scrollY=l;this._windowHeight=m;
this.elements.forEach(this.refreshElementMetrics,this)};i.refreshElementMetrics=function(m){if(!m.isActive){return m
}var n=a.getDimensions(m.element,m.useRenderedPosition);var l=a.getPagePosition(m.element,m.useRenderedPosition);
m=f.extend(m,n,l);return this.refreshElementState(m)};i.refreshAllElementStates=function(l){if(typeof l!=="number"){l=this._getScrollY()
}this._scrollY=l;this.elements.forEach(this.refreshElementState,this)};i.refreshElementState=function(l){if(!l.isActive){return l
}var m=l.inView;l.pixelsInView=this._elementPixelsInView(l);l.percentInView=this._elementPercentInView(l);
l.inView=l.pixelsInView>0;if(l.inView){this._ifInView(l,m)}if(m){this._ifAlreadyInView(l)
}return l};i.pauseElementTracking=function(l){if(l){l.isActive=false}};i.resumeElementTracking=function(l){if(l){l.isActive=true
}};i._getWindowHeight=function(){return window.innerHeight};i._getScrollY=function(){return a.getScrollY()
};c.exports=b},{"./TrackedElement":199,"@marcom/ac-dom-metrics/getDimensions":28,"@marcom/ac-dom-metrics/getPagePosition":29,"@marcom/ac-dom-metrics/getScrollY":31,"@marcom/ac-dom-nodes/isElement":194,"@marcom/ac-dom-nodes/isNodeList":196,"@marcom/ac-object/clone":340,"@marcom/ac-object/extend":343}],199:[function(c,d,b){var a={isElement:c("@marcom/ac-dom-nodes/isElement")};
var g=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;var i=g.prototype;function h(j,k){if(!a.isElement(j)){throw new TypeError("TrackedElement: "+j+" is not a valid DOM element")
}g.call(this);this.element=j;this.inView=false;this.isActive=true;this.percentInView=0;
this.pixelsInView=0;this.offsetTop=0;this.top=0;this.right=0;this.bottom=0;this.left=0;
this.width=0;this.height=0;this.useRenderedPosition=k||false}var f=h.prototype=Object.create(i);
f.destroy=function(){this.element=null;i.destroy.call(this)};d.exports=h},{"@marcom/ac-dom-nodes/isElement":194,"@marcom/ac-event-emitter-micro":147}],200:[function(d,f,c){d("@marcom/ac-polyfills/Object/create");
var a=d("@marcom/ac-raf-emitter/RAFEmitter");var h=d("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var i=h.prototype;function b(n,p,j,m,k,o,l){if(arguments.length!==7){throw new Error("Incorrect number of arguments passed to BaseComponent check the constructor or BaseComponent.call method - argument's should be (section, componentElement, componentName, currentBreakpoint, scrollPosition, windowHeight, index)")
}h.call(this);this.section=n;this.element=p;this.componentName=j;this.index=l;this.isEnabled=true
}var g=b.prototype=Object.create(h.prototype);b.prototype.constructor=b;g.destroy=function(){this.teardownEvents();
this.teardownRAFEmitter();this.section=null;i.destroy.call(this)};g.setupEvents=function(){};
g.teardownEvents=function(){};g.setupRAFEmitter=function(){if(this._rafEmitter){return
}this._rafEmitter=new a();this.onDOMRead=this.onDOMRead.bind(this);this.onDOMWrite=this.onDOMWrite.bind(this);
this._rafEmitter.on("update",this.onDOMRead);this._rafEmitter.on("draw",this.onDOMWrite)
};g.teardownRAFEmitter=function(){if(!this._rafEmitter){return}this._rafEmitter.destroy();
this._rafEmitter=null};g.parsePropsFromDataAttribute=function(r,p,l){l=l||this.element;
p=p||{};r="data-"+r;var q=l.getAttribute(r)||"{}";var n=null;try{n=JSON.parse(q)
}catch(o){throw new Error(this.componentName+"::parsePropsFromDataAttribute bad JSON in `"+r+"`",o)
}var m={};for(var j in p){m[j]=n[j];if(!n.hasOwnProperty(j)){if(p[j]===null){throw new Error(this.componentName+"::parsePropsFromDataAttribute `"+j+"` is required in `"+r+"`")
}else{m[j]=p[j]}}}return m};g.onSectionWillAppearWithPadding=function(j,k){};g.onSectionWillAppear=function(j,k){};
g.activate=function(){};g.animateIn=function(){};g.requestDOMChange=function(){if(!this.isEnabled||!this.section.isVisible){return false
}if(!this._rafEmitter){this.setupRAFEmitter()}return this._rafEmitter.run()};g.onDOMRead=function(j){};
g.onDOMWrite=function(j){};g.deactivate=function(){};g.onScroll=function(k,j,l){};
g.onSectionWillDisappearWithPadding=function(j,k){};g.onSectionWillDisappear=function(j,k){};
g.onResizeDebounced=function(k,j,l){};g.onResizeImmediate=function(k,j,l){};g.onOrientationChange=function(l,k,j,m){};
g.onBreakpoint=function(k,m,j,l){};g.onRetinaChange=function(m,k,j,l){};f.exports=b
},{"@marcom/ac-event-emitter-micro":147,"@marcom/ac-polyfills/Object/create":391,"@marcom/ac-raf-emitter/RAFEmitter":419}],201:[function(f,c,i){f("@marcom/ac-polyfills/console.log");
var b=f("@marcom/ac-element-tracker").ElementTracker;var l=f("@marcom/ac-viewport-emitter");
if(!l.viewport){console.log("Jetpack Error: Required module `ac-viewport-emitter` not initialized properly (missing required css styles). Please see `ac-viewport-emitter` documentation.\n\tBreakpoint will always be 'large' and no `onBreakPoint` events will be fired");
l=f("../utils/ViewportEmitterStub")()}var k=f("../utils/Page");var a=f("../model/SectionMap");
var h=f("../model/DataAttributes");var d=f("../model/EnabledFeatures");function g(m){d.init();
k.setPage(this);this.name=this.name||"[NOT SET]";this._mainEl=document.querySelector("main,.main");
this._sections=[];this._visibleSections=[];this._visibleSectionsWithPadding=[];
this._elementTracker=new b(null,{autoStart:true});this._currentSection=null;this._sectionUnderLocalNav=null;
this._currentBreakpoint=l.viewport;this.isRetina=l.retina;this._cachedScrollY=this._getScrollY(true);
this._cachedWindowHeight=this.getWindowHeight(true);this._resizeTimeout=-1;this._resizeTimeoutDelay=this._resizeTimeoutDelay||250;
this.setupSections();this.setupEvents();this._updateSectionVisibility()}var j=g.prototype;
j.destroy=function(){for(var n=0,m=this._sections.length;n<m;n++){this._sections[n].destroy()
}this.teardownEvents();this._elementTracker.destroy();this._elementTracker=null;
this._sections=null;this._currentSection=null;this._sectionUnderLocalNav=null;this._visibleSections=null;
this._mainEl=null;k.removePage(this)};j.setupEvents=function(){this._onScroll=this._onScroll.bind(this);
this._onBreakpoint=this._onBreakpoint.bind(this);this._onRetinaChange=this._onRetinaChange.bind(this);
this._onPageDidAppear=this._onPageDidAppear.bind(this);this._onResizeImmediate=this._onResizeImmediate.bind(this);
this._onOrientationChange=this._onOrientationChange.bind(this);this._onPageWillDisappear=this._onPageWillDisappear.bind(this);
this.performDeepMetricsRefresh=this.performDeepMetricsRefresh.bind(this);window.addEventListener("scroll",this._onScroll);
window.addEventListener("resize",this._onResizeImmediate);window.addEventListener("orientationchange",this._onOrientationChange);
l.on("change",this._onBreakpoint);l.on("retinachange",this._onRetinaChange);k.on(k.DEEP_REFRESH_ALL_METRICS,this.performDeepMetricsRefresh)
};j.teardownEvents=function(){window.removeEventListener("scroll",this._onScroll);
window.removeEventListener("resize",this._onResizeImmediate);window.removeEventListener("orientationchange",this._onOrientationChange);
l.off("change",this._onBreakpoint);l.off("retinachange",this._onRetinaChange);k.off(k.DEEP_REFRESH_ALL_METRICS,this.performDeepMetricsRefresh);
this._elementTracker.stop();clearTimeout(this._resizeTimeout)};j.setupSections=function(){var n=this._mainEl.querySelectorAll("section,.section,[data-section-type]");
for(var p=0,m=n.length;p<m;p++){if(n[p].parentElement!==this._mainEl){console.warn("BasePage::addSection - Jetpack does not support nested BaseSections, consider using a component instead.",n[p]);
continue}var o=n[p];this._addSectionImp(o)}};j.addSection=function(m){var n=this.getBaseSectionForElement(m);
if(n){return n}n=this._addSectionImp(m);this._updateSectionVisibility();return n
};j.removeSection=function(m){var o=m instanceof a.BaseSection;var n=o?m:this.getBaseSectionForElement(m);
if(n){this._sections.splice(this._sections.indexOf(n),1)}this._updateSectionVisibility();
return n};j._addSectionImp=function(o){if(o.parentNode!==this._mainEl&&this._isNestedSection(o)){console.warn("BasePage::addSection - Jetpack does not support nested BaseSections, consider using a component instead.",o);
return null}var n=this._elementTracker.addElement(o);this._elementTracker.refreshElementState(n);
var p=o.hasAttribute(h.SECTION_TYPE)?o.getAttribute(h.SECTION_TYPE):"BaseSection";
if(p===""){p="BaseSection"}if(!a.hasOwnProperty(p)){throw"BasePage::setupSections parsing '#"+o.id+" ."+o.className+"' no section type '"+p+"'found!"
}var m=a[p];var q=new m(o,n,this._getCurrentBreakpoint(),this._getScrollY(),this.getWindowHeight(),this._sections.length);
q.setupEvents();this._sections.push(q);return q};j.getWindowHeight=function(m){if(m){this._cachedWindowHeight=window.innerHeight
}return this._cachedWindowHeight};j._activateSection=function(m){if(this._currentSection===m){return
}if(this._currentSection){this._currentSection.deactivate()}this._currentSection=m;
this._currentSection.activate()};j._updateSectionVisibility=function(){var A=this._getScrollY();
var m=this.getWindowHeight();var q=k.getViewportPadding();var r=[];var t=this._sections[0];
var p=[];var y=0;var w=[];var C=A-q;var o=A+m+q;for(var s=0,v=this._sections.length;
s<v;s++){var B=this._sections[s];var z=B.trackedElement;var x=z.pixelsInView;if(B.isFixedHero){x=m-A
}if(x>y){t=B;y=x}if(x>0.000001){r.push(B);p.push(B);w.push(B)}else{if(o>z.top&&C<z.bottom){r.push(B);
w.push(B)}}}var n={};var u={};for(s=0,v=Math.max(this._visibleSections.length,r.length);
s<v;s++){if(this._visibleSectionsWithPadding[s]){if(typeof n[s]==="undefined"){n[s]=w.indexOf(this._visibleSectionsWithPadding[s])===-1
}if(n[s]){this._visibleSectionsWithPadding[s].onSectionWillDisappearWithPadding(A,m)
}}if(this._visibleSections[s]&&p.indexOf(this._visibleSections[s])===-1){this._visibleSections[s].onSectionWillDisappear(A,m)
}if(w[s]){if(typeof u[s]==="undefined"){u[s]=this._visibleSectionsWithPadding.indexOf(w[s])===-1
}if(u[s]){w[s].onSectionWillAppearWithPadding(A,m)}}if(p[s]&&this._visibleSections.indexOf(p[s])===-1){p[s].onSectionWillAppear(A,m)
}}this._visibleSections=p;this._visibleSectionsWithPadding=w;this._activateSection(t)
};j._onPageDidAppear=function(m){};j._onPageWillDisappear=function(m){this.destroy()
};j._onBreakpoint=function(r){var n=r.to;var p=r.from;this._currentBreakpoint=n;
var o=this._getScrollY();var s=this.getWindowHeight();this._elementTracker.refreshAllElementMetrics(o,s);
for(var q=0,m=this._sections.length;q<m;q++){this._sections[q].onBreakpoint(n,p,o,s)
}this.performDeepMetricsRefresh()};j._onRetinaChange=function(q){var n=this._getScrollY(true);
var r=this.getWindowHeight(true);this.isRetina=l.retina;var p=this._currentBreakpoint;
this._elementTracker.refreshAllElementMetrics(n,r);for(var o=0,m=this._sections.length;
o<m;o++){this._sections[o].onRetinaChange(this.isRetina,p,n,r)}};j._onScroll=function(p){var n=this._getScrollY(true);
var q=this.getWindowHeight();this._updateSectionVisibility();for(var o=0,m=this._visibleSections.length;
o<m;o++){this._visibleSections[o].onScroll(p,n,q)}};j._onResizeDebounced=function(q){var n=this._getScrollY();
var r=this.getWindowHeight();var p=false;for(var o=0,m=this._sections.length;o<m;
o++){if(!p&&this._sections[o]["onResize"]){console.warn("Jetpack: onResize has been removed please use `onResizeImmediate` or `onResizeDebounced` instead.");
p=true}this._sections[o].onResizeDebounced(q,n,r)}this._updateSectionVisibility()
};j.performDeepMetricsRefresh=function(){var n=this._getScrollY();var p=this.getWindowHeight();
this._elementTracker.refreshAllElementMetrics(n,p);for(var o=0,m=this._sections.length;
o<m;o++){this._sections[o].elementEngagement.refreshAllElementMetrics(n,p);this._sections[o].updateScrollToPosition()
}this._updateSectionVisibility()};j._onOrientationChange=function(q){var o=this._getScrollY(true);
var r=this.getWindowHeight(true);var n=q.orientation;for(var p=0,m=this._sections.length;
p<m;p++){this._sections[p].onOrientationChange(q,n,o,r)}};j._onResizeImmediate=function(q){var n=this._getScrollY();
var r=this.getWindowHeight(true);var p=false;for(var o=0,m=this._sections.length;
o<m;o++){if(!p&&this._sections[o]["onResizeWillBeCalledAfterDelay"]){console.warn("Jetpack: onResizeWillBeCalledAfterDelay has been removed please use `onResizeImmediate` or `onResizeDebounced` instead.");
p=true}this._sections[o].onResizeImmediate(q,n,r)}window.clearTimeout(this._resizeTimeout);
this._resizeTimeout=window.setTimeout(this._onResizeDebounced.bind(this,q),this._resizeTimeoutDelay)
};j._getScrollY=function(m){if(m){this._cachedScrollY=window.pageYOffset||(document.documentElement||document.body).scrollTop
}return this._cachedScrollY};j._getVisibleBottomOfPage=function(){return this._getScrollY()+this.getWindowHeight()
};j._getCurrentBreakpoint=function(){return this._currentBreakpoint};j._isNestedSection=function(o){var p=o;
var m=this._sections.length;while(p=p.parentElement){for(var n=0;n<m;n++){if(this._sections[n].element===p){return true
}}}return false};j.getBaseSectionForElement=function(o){for(var n=0,m=this._sections.length;
n<m;n++){if(this._sections[n].element===o){return this._sections[n]}}return null
};c.exports=g},{"../model/DataAttributes":204,"../model/EnabledFeatures":205,"../model/SectionMap":206,"../utils/Page":207,"../utils/ViewportEmitterStub":208,"@marcom/ac-element-tracker":197,"@marcom/ac-polyfills/console.log":399,"@marcom/ac-viewport-emitter":433}],202:[function(c,b,g){c("@marcom/ac-polyfills/Object/create");
c("@marcom/ac-polyfills/console.log");var n={};var k={getPagePosition:c("@marcom/ac-dom-metrics/getPagePosition")};
var a=c("@marcom/ac-element-engagement").ElementEngagement;var f=c("./../model/DataAttributes");
var h=c("./../model/ComponentMap");var d=c("./BaseComponent");var l=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var m=l.prototype;function j(s,r,q,o,t,p){if(arguments.length!==6){throw new Error("Incorrect number of arguments passed to BaseSection")
}l.call(this);this.element=s;this.trackedElement=r;this.elementEngagement=new a(null,{autoStart:false});
this.index=p;this.isVisible=this.trackedElement.pixelsInView>0;this.isVisibleWithPadding=false;
this.hasAnimatedIn=false;this.isActive=false;this.isFixedHero=false;this.cachedBreakpoint=q;
this.cachedScrollPosition=o;this.cachedWindowHeight=t;this.name=this.name||this.element.className;
this.scrollToPosition=0;this.updateScrollToPosition();this._components=[];this.setupComponents(q,o,t);
this.setIsFixedHero();this.performDeprecatedMethodCheck()}var i=j.prototype=Object.create(l.prototype);
j.prototype.constructor=j;i.performDeprecatedMethodCheck=function(){if(this["onViewWillAppear"]){throw new Error("Section.onViewWillAppear is now `onSectionWillAppear`, please update your BaseSection subclass")
}if(this["onViewWillDisappear"]){throw new Error("Section.onViewWillDisappear is now `onSectionWillDisappear`, please update your BaseSection subclass")
}return true};i.destroy=function(){this.teardownEvents();this.elementEngagement.stop();
this.elementEngagement=null;for(var p=0,o=this._components.length;p<o;p++){this._components[p].destroy()
}this._components=null;this.trackedElement=null;this.element=null;m.destroy.call(this)
};i.setupEvents=function(){for(var p=0,o=this._components.length;p<o;p++){this._components[p].setupEvents()
}};i.teardownEvents=function(){for(var p=0,o=this._components.length;p<o;p++){this._components[p].teardownEvents()
}};i.setupComponents=function(){var t=Array.prototype.slice.call(this.element.querySelectorAll("["+f.COMPONENT_LIST+"]"));
if(this.element.hasAttribute(f.COMPONENT_LIST)){t.push(this.element)}for(var r=0;
r<t.length;r++){var v=t[r];var u=v.getAttribute(f.COMPONENT_LIST);if(u.indexOf("|")!==-1){throw"BaseSection::setupComponents component list should be space delimited, pipe character is no longer supported. Error at: '"+u+"'"
}var s=u.split(" ");for(var q=0,o=s.length;q<o;q++){var p=s[q];if(p===""||p===" "){continue
}this.addComponentOfType(p,v)}setTimeout(this.elementEngagement.refreshAllElementStates.bind(this.elementEngagement),100)
}};i.addComponentOfType=function(p,r){if(!h.hasOwnProperty(p)){throw"BaseSection::setupComponents parsing '#"+r.id+" ."+r.className+"' no component type '"+p+"'found!"
}var q=h[p];if(!this.componentIsSupported(q,p)){if(n[p]===undefined){console.log("BaseSection::setupComponents unsupported component '"+p+"'. Reason: '"+p+".IS_SUPPORTED' returned false");
n[p]=true}return}var o=new q(this,r,p,this.cachedBreakpoint,this.cachedScrollPosition,this.cachedWindowHeight,this._components.length);
this._components.push(o);return o};i.removeComponentOfType=function(o){var p=this.getComponentOfType(o);
if(p===null){return}this.removeComponent(p)};i.removeComponent=function(p){var o=this._components.indexOf(p);
if(o===-1){return}this._components.splice(o,1);p.destroy()};i.activate=function(){for(var p=0,o=this._components.length;
p<o;p++){if(!this._components[p].isEnabled){continue}this._components[p].activate()
}this.isActive=true;if(!this.hasAnimatedIn){this.animateIn();this.hasAnimatedIn=true
}};i.deactivate=function(){this.isActive=false;for(var p=0,o=this._components.length;
p<o;p++){if(!this._components[p].isEnabled){continue}this._components[p].deactivate()
}};i.animateIn=function(){for(var p=0,o=this._components.length;p<o;p++){if(!this._components[p].isEnabled){continue
}this._components[p].animateIn()}};i.onResizeImmediate=function(s,p,t){this.cachedScrollPosition=p;
this.cachedWindowHeight=t;var r=false;for(var q=0,o=this._components.length;q<o;
q++){if(!this._components[q].isEnabled){continue}if(!r&&this._components[q]["onResizeWillBeCalledAfterDelay"]){console.warn("Jetpack: onResizeWillBeCalledAfterDelay has been removed please use `onResizeImmediate` or `onResizeDebounced` instead.");
r=true}this._components[q].onResizeImmediate(s,p,t)}};i.onResizeDebounced=function(s,p,t){this.updateScrollToPosition();
var r=false;for(var q=0,o=this._components.length;q<o;q++){if(!this._components[q].isEnabled){continue
}if(!r&&this._components[q]["onResize"]){console.warn("Jetpack: onResize has been removed please use `onResizeImmediate` or `onResizeDebounced` instead.");
r=true}this._components[q].onResizeDebounced(s,p,t)}this.elementEngagement.refreshAllElementMetrics(p,t)
};i.onBreakpoint=function(q,t,p,s){this.cachedBreakpoint=q;for(var r=0,o=this._components.length;
r<o;r++){if(!this._components[r].isEnabled){continue}this._components[r].onBreakpoint(q,t,p,s)
}};i.onRetinaChange=function(t,r,p,s){for(var q=0,o=this._components.length;q<o;
q++){if(!this._components[q].isEnabled){continue}this._components[q].onRetinaChange(t,r,p,s)
}this.elementEngagement.refreshAllElementMetrics(p,s)};i.onOrientationChange=function(s,q,p,t){this.cachedScrollPosition=p;
this.cachedWindowHeight=t;for(var r=0,o=this._components.length;r<o;r++){if(!this._components[r].isEnabled){continue
}this._components[r].onOrientationChange(s,q,p,t)}};i.onScroll=function(r,p,s){this.cachedScrollPosition=p;
this.elementEngagement.refreshAllElementStates(p);for(var q=0,o=this._components.length;
q<o;q++){if(!this._components[q].isEnabled){continue}this._components[q].onScroll(r,p,s)
}};i.onSectionWillAppearWithPadding=function(p,r){this.cachedScrollPosition=p;this.isVisibleWithPadding=true;
this.elementEngagement.refreshAllElementStates(p);for(var q=0,o=this._components.length;
q<o;q++){this._components[q].onSectionWillAppearWithPadding(p,r)}};i.onSectionWillAppear=function(p,r){this.cachedScrollPosition=p;
this.isVisible=true;this.elementEngagement.refreshAllElementStates(p);for(var q=0,o=this._components.length;
q<o;q++){this._components[q].onSectionWillAppear(p,r)}};i.onSectionWillDisappearWithPadding=function(p,r){this.cachedScrollPosition=p;
this.isVisibleWithPadding=false;for(var q=0,o=this._components.length;q<o;q++){this._components[q].onSectionWillDisappearWithPadding(p,r)
}};i.onSectionWillDisappear=function(p,r){this.cachedScrollPosition=p;this.isVisible=false;
for(var q=0,o=this._components.length;q<o;q++){this._components[q].onSectionWillDisappear(p,r)
}};i.getComponentOfType=function(p){if(!h.hasOwnProperty(p)){throw"BaseSection::getComponentOfType no component type '"+p+"' exist in ComponentMap!"
}for(var q=0,o=this._components.length;q<o;q++){if(this._components[q].componentName===p){return this._components[q]
}}return null};i.getAllComponentsOfType=function(p){if(!h.hasOwnProperty(p)){throw"BaseSection::getAllComponentsOfType no component type '"+p+"' exist in ComponentMap!"
}var r=[];for(var q=0,o=this._components.length;q<o;q++){if(this._components[q].componentName===p){r.push(this._components[q])
}}return r};i.updateScrollToPosition=function(){return this.scrollToPosition=k.getPagePosition(this.element).top
};i.setIsFixedHero=function(){if(this.index!==0){this.isFixedHero=false}else{var o=window.getComputedStyle(this.element);
this.isFixedHero=o.position==="fixed"}};j.prototype.componentIsSupported=function(r,p){var o=r.IS_SUPPORTED;
if(o===undefined){return true}if(typeof o!=="function"){console.error('BaseSection::setupComponents error in "'+p+'".IS_SUPPORTED - it should be a function which returns true/false');
return true}var q=r.IS_SUPPORTED();if(q===undefined){console.error('BaseSection::setupComponents error in "'+p+'".IS_SUPPORTED - it should be a function which returns true/false');
return true}return q};b.exports=j},{"./../model/ComponentMap":203,"./../model/DataAttributes":204,"./BaseComponent":200,"@marcom/ac-dom-metrics/getPagePosition":29,"@marcom/ac-element-engagement":190,"@marcom/ac-event-emitter-micro":147,"@marcom/ac-polyfills/Object/create":391,"@marcom/ac-polyfills/console.log":399}],203:[function(b,c,a){c.exports={BaseComponent:b("../core/BaseComponent")}
},{"../core/BaseComponent":200}],204:[function(b,c,a){c.exports={PAGE_TYPE:"data-page-type",SECTION_TYPE:"data-section-type",JUMP_SECTION_NAME:"data-page-jump-name",COMPONENT_LIST:"data-component-list"}
},{}],205:[function(c,d,b){var a={isDesktop:c("@marcom/ac-feature/isDesktop"),isRetina:c("@marcom/ac-feature/isRetina"),threeDTransformsAvailable:c("@marcom/ac-feature/threeDTransformsAvailable"),prefersReducedMotion:c("@marcom/ac-feature/prefersReducedMotion")};
d.exports={TOUCH:undefined,SVG:undefined,PAGE_JUMP:undefined,IS_DESKTOP:undefined,IS_RETINA:undefined,THREE_D_TRANSFORMS:undefined,REDUCED_MOTION:undefined,IS_AOW:undefined,init:function f(){var h=document.getElementsByTagName("html")[0];
this.TOUCH=h.classList.contains("touch");this.SVG=h.classList.contains("svg");this.PAGE_JUMP=h.classList.contains("pageJump");
this.IS_DESKTOP=a.isDesktop();this.IS_RETINA=a.isRetina();this.THREE_D_TRANSFORMS=a.threeDTransformsAvailable();
this.REDUCED_MOTION=a.prefersReducedMotion();this.IS_AOW=h.classList.contains("aow")
},extend:function g(j){if(!j.hasOwnProperty("init")||typeof j.init!=="function"){throw new TypeError("The object extended Jetpack.model.EnabledFeatures must contain an init function")
}var k=this.init;var i=j.init;var h=Object.assign(this,j);h.init=function(){if(this.HAS_INITIALIZED){return
}this.HAS_INITIALIZED=true;k.call(h);i.call(h)};return h},HAS_INITIALIZED:false}
},{"@marcom/ac-feature/isDesktop":173,"@marcom/ac-feature/isRetina":175,"@marcom/ac-feature/prefersReducedMotion":180,"@marcom/ac-feature/threeDTransformsAvailable":183}],206:[function(b,c,a){c.exports={BaseSection:b("../core/BaseSection")}
},{"../core/BaseSection":202}],207:[function(b,d,a){var g=b("@marcom/ac-event-emitter-micro").EventEmitterMicro;
function c(){g.call(this);this._page=null;this.viewportPaddingRatio=1}var f=c.prototype=Object.create(g.prototype);
c.prototype.constructor=c;f.getPage=function(){return this._page};f.setPage=function(h){this._page=h
};f.removePage=function(h){if(h===this._page){this._page=null}};f.getViewportPadding=function(){return this.getPage().getWindowHeight()*this.viewportPaddingRatio
};f.deepRefreshAllElementMetrics=function(){this.trigger(c.prototype.DEEP_REFRESH_ALL_METRICS)
};f.onPageHeightSettled=function(l,h){var i=document.documentElement.scrollHeight;
var j=0;var h=h||30;window.requestAnimationFrame(function k(){var m=document.documentElement.scrollHeight;
if(i!==m){j=0}else{j++;if(j>=h){l();return}}i=m;window.requestAnimationFrame(k)
})};f.DEEP_REFRESH_ALL_METRICS="page.deep_refresh_all_metrics";d.exports=new c()
},{"@marcom/ac-event-emitter-micro":147}],208:[function(b,c,a){c.exports=function(){var d;
if(window.ViewportEmitterTestProxy){d=window.ViewportEmitterTestProxy}else{d={};
d.viewport="large";d.on=d.off=function(){}}return d}},{}],209:[function(b,c,a){arguments[4][1][0].apply(a,arguments)
},{"./ac-ajax/Ajax":210,"./ac-ajax/Request":211,dup:1}],210:[function(b,c,a){arguments[4][2][0].apply(a,arguments)
},{"./Request":211,"./URLParser":212,"./XDomain-request":213,dup:2}],211:[function(b,c,a){arguments[4][3][0].apply(a,arguments)
},{dup:3}],212:[function(b,c,a){arguments[4][4][0].apply(a,arguments)},{dup:4}],213:[function(b,c,a){arguments[4][5][0].apply(a,arguments)
},{"./Request":211,dup:5}],214:[function(b,c,a){c.exports={Queue:b("./ac-queue/Queue"),QueueItem:b("./ac-queue/QueueItem"),LiveQueue:b("./ac-queue/LiveQueue")}
},{"./ac-queue/LiveQueue":215,"./ac-queue/Queue":216,"./ac-queue/QueueItem":217}],215:[function(b,c,a){b("@marcom/ac-polyfills/Promise");
b("@marcom/ac-polyfills/requestAnimationFrame");b("@marcom/ac-polyfills/Function/prototype.bind");
var g=b("./Queue");var h=b("./QueueItem");function f(i){this._queue=new g();this._maxProcesses=i||1;
this._availableSlots=this._maxProcesses;this._rafId=0;this._isRunning=false;this._boundFunctions={_run:this._run.bind(this),_releaseSlot:this._releaseSlot.bind(this)}
}var d=f.prototype;d.start=function(){if(this._isRunning){cancelAnimationFrame(this._rafId)
}this._rafId=requestAnimationFrame(this._boundFunctions._run);this._isRunning=true
};d.pause=function(){if(this._isRunning){cancelAnimationFrame(this._rafId);this._rafId=0
}this._isRunning=false};d.stop=function(){this.pause();this.clear()};d.enqueue=function(i,j){if(typeof i!=="function"){throw new Error("LiveQueue can only enqueue functions")
}if(j===undefined){j=g.PRIORITY_DEFAULT}var k=new h(i,j);return this.enqueueQueueItem(k)
};d.enqueueQueueItem=function(i){this._queue.enqueueQueueItem(i);if(this._isRunning&&this._rafId===0){this.start()
}return i};d.dequeueQueueItem=function(i){return this._queue.dequeueQueueItem(i)
};d.clear=function(){this._queue=new g()};d.destroy=function(){this.pause();this._isRunning=false;
this._queue=null;this._boundFunctions=null};d.count=function(){return this._queue.count()+this.pending()
};d.pending=function(){return this._maxProcesses-this._availableSlots};d.isEmpty=function(){return this.count()===0
};d._run=function(){if(!this._isRunning){return}this._rafId=requestAnimationFrame(this._boundFunctions._run);
if(this._queue.isEmpty()||this._availableSlots===0){return}var j=this._queue.dequeue();
var i=j.data();if(this._isPromise(i)){this._retainSlot();i.then(this._boundFunctions._releaseSlot,this._boundFunctions._releaseSlot)
}this._stopRunningIfDone()};d._retainSlot=function(){this._availableSlots--};d._releaseSlot=function(){this._availableSlots++;
this._stopRunningIfDone()};d._stopRunningIfDone=function(){if(this._rafId!=0&&this._queue.count()===0&&this._availableSlots==this._maxProcesses){cancelAnimationFrame(this._rafId);
this._rafId=0}};d._isPromise=function(i){return !!(i&&typeof i.then==="function")
};c.exports=f},{"./Queue":216,"./QueueItem":217,"@marcom/ac-polyfills/Function/prototype.bind":387,"@marcom/ac-polyfills/Promise":394,"@marcom/ac-polyfills/requestAnimationFrame":405}],216:[function(b,c,a){var g=b("./QueueItem");
function f(){this._items=[]}var d=f.prototype;d.enqueue=function(j,h){if(h===undefined){h=f.PRIORITY_DEFAULT
}var i=new g(j,h);return this.enqueueQueueItem(i)};d.enqueueQueueItem=function(h){if(this._items.indexOf(h)===-1){this._items.push(h)
}return h};d.dequeue=function(){this._heapSort();var i=this._items.length-1;var h=this._items[0];
this._items[0]=this._items[i];this._items.pop();return h};d.dequeueQueueItem=function(i){var h=this._items.indexOf(i);
if(h>-1){this._items.splice(h,1)}return i};d.peek=function(){if(this.count()==0){return null
}this._heapSort();return this._items[0]};d.isEmpty=function(){return this._items.length===0
};d.count=function(){return this._items.length};d.toString=function(){var j=["Queue total items: "+this.count()+"\n"];
for(var h=0;h<this.count();++h){j.push(this._items[h].toString()+"\n")}return j.join("")
};d._heapSort=function(){var h=0;for(var m=this._items.length-1;m>=0;m--){var n=m;
while(n>0){h++;var j=Math.floor((n-1)/2);if(this._items[n].compareTo(this._items[j])>=0){break
}var l=this._items[n];this._items[n]=this._items[j];this._items[j]=l;n=j}}};f.PRIORITY_LOW=10;
f.PRIORITY_DEFAULT=5;f.PRIORITY_HIGH=1;c.exports=f},{"./QueueItem":217}],217:[function(b,c,a){var g=0;
function f(i,h){this.priority=h;this.data=i;this.insertionOrder=g++}var d=f.prototype;
d.compareTo=function(h){if(this.priority<h.priority){return -1}else{if(this.priority>h.priority){return 1
}else{return this.insertionOrder<h.insertionOrder?-1:1}}};d.toString=function(){return"QueueItem {priority:"+this.priority+",\tdata:"+this.data+"\tinsertionOrder:"+this.insertionOrder+"}"
};c.exports=f},{}],218:[function(d,f,c){var h;var g=d("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var b=d("@marcom/ac-object/defaults");var i={priority:5};function a(k,j){g.call(this);
this.options=b(i,j||{});this.src=k;this.data=null;this.error=null;this.priority=this.options.priority;
this.status="idle";this._onLoad=this._onLoad.bind(this);this._onError=this._onError.bind(this)
}h=a.prototype=Object.create(g.prototype);h.load=function(){if(this.status==="idle"){this.status="pending";
this._load()}};h.destroy=function(){g.prototype.destroy.call(this);this.status="destroyed";
this.data=null};h._load=function(){this.data={src:this.src};window.setTimeout(this._onLoad.bind(this),20)
};h._onLoad=function(){if(this.status!=="destroyed"){this.status="loaded";this.trigger("loaded",this)
}};h._onError=function(j){if(this.status!=="destroyed"){this.error=j;this.status="error";
this.trigger("error",this)}};f.exports=a},{"@marcom/ac-event-emitter-micro":147,"@marcom/ac-object/defaults":342}],219:[function(b,c,a){var f;
var d=b("../Asset");function g(i,h){d.apply(this,arguments)}f=g.prototype=Object.create(d.prototype);
f._load=function(){this.data=new Image();this.data.addEventListener("load",this._onLoad);
this.data.addEventListener("error",this._onError);this.data.src=this.src};f.destroy=function(){if(this.data){this.data.removeEventListener("load",this._onLoad);
this.data.removeEventListener("error",this._onError)}this.status="destroyed";this.data=null
};c.exports=g},{"../Asset":218}],220:[function(d,b,g){d("@marcom/ac-polyfills/Promise");
var h=d("@marcom/ac-object/defaults");var a=d("./XHR/ArrayBuffer");var l=d("./XHR/JSON");
var j=d("../Asset");var k=d("../AssetGroup");var i;var f={manifestTimeout:5000,chunkTimeout:10000};
var c=function c(p,n){var o=h(f,n||{});j.call(this,p,o);if(p.lastIndexOf("/")!==p.length-1){p=p+"/"
}var m="j";this._manifestPath=p+"manifest."+m+"son";this._chunks=[];this._loadChunks=this._loadChunks.bind(this);
this._onChunksLoaded=this._onChunksLoaded.bind(this);this._manifestLoader=null;
this._chunkLoader=null};i=c.prototype=Object.create(j.prototype);i._load=function(){this._loadManifest().then(this._loadChunks).then(this._onChunksLoaded)["catch"](this._onError)
};i._loadManifest=function(){var m=new l(this._manifestPath,{timeout:this.options.manifestTimeout});
var n=new k(m,{privateQueue:this.options.queue});n.load();this._manifestLoader=n;
return new Promise(function(p,o){n.once("load",function(q){p(q.latest)});n.once("error",function(q){o(q.latest.error)
})})};i._loadChunks=function(n){this._manifest=n.data;this._manifestLoader.destroy();
this._manifestLoader=null;var m=[];this._manifest.files.forEach(function(r,q){m.push(this._getOrCreateChunkObject(r,q))
},this);var p=new k(m,{privateQueue:this.options.queue,failFast:true});var o=new Promise(function(r,q){p.once("load",r);
p.once("error",function(s){q(s.latest.error)})});p.load();this._chunkLoader=p;return o
};i._getOrCreateChunkObject=function(o,m){var p=this.options.chunkTimeout?{timeout:this.options.chunkTimeout}:null;
if(!this._chunks[m]){var r=o.path;if(!r.match(/(^http(s?))/)){r=this.src+"/"+r}else{if(!!this.src.match(/(^http(s?))/)){var q=r.indexOf("/",10);
var n=this.src.indexOf("/",10);r=this.src.substring(0,n)+r.substring(q)}}this._chunks[m]=new a(r,p)
}return this._chunks[m]};i._onChunksLoaded=function(){var m=this._chunks.length;
var n=[];for(var o=0;o<m;o++){n.push(this._chunks[o].data);this._chunks[o].off()
}this.data=new Blob(n,{type:this._manifest.mimeType});n=this._chunks=null;this._chunkLoader.destroy();
this._chunkLoader=null;this._onLoad()};i.pause=function(){if(this._manifestLoader){this._manifestLoader.pause()
}if(this._chunkLoader){this._chunkLoader.pause()}};i.resume=function(){if(this._manifestLoader){this._manifestLoader.resume()
}if(this._chunkLoader){this._chunkLoader.resume()}};i.destroy=function(){this.pause();
if(this._manifestLoader){this._manifestLoader.destroy()}if(this._chunkLoader){this._chunkLoader.destroy()
}this._chunks=null;j.prototype.destroy.call(this)};b.exports=c},{"../Asset":218,"../AssetGroup":225,"./XHR/ArrayBuffer":223,"./XHR/JSON":224,"@marcom/ac-object/defaults":342,"@marcom/ac-polyfills/Promise":394}],221:[function(c,d,b){var g;
var f=c("../Asset");var h=c("./SplitFile");function a(j,i){f.apply(this,arguments);
this.options=i||{};this._binary=this.options.binary||this._createAssetType()}g=a.prototype=Object.create(f.prototype);
g._canUseBlob=function(){return window.Blob!==undefined&&window.URL!==undefined&&typeof window.URL.createObjectURL==="function"
};g._createAssetType=function(){if(this._canUseBlob()){return new h(this.src,this.options)
}};g._load=function(){this._binary.on("loaded",this._onLoad);this._binary.on("error",this._onError);
this._binary.load()};g._onLoad=function(i){this.data=i;if(this.data instanceof window.Blob){this.data=this.options.element;
if(!this.data){this.data=document.createElement("video")}if(this.data.getAttribute("type")!==i.type){this.data.setAttribute("type",i.type)
}this.data.src=window.URL.createObjectURL(i)}f.prototype._onLoad.call(this,this.data)
};g.pause=function(){this._binary.pause()};g.destroy=function(){this._binary.destroy();
f.prototype.destroy.call(this)};d.exports=a},{"../Asset":218,"./SplitFile":220}],222:[function(b,a,d){var g;
var j=b("@marcom/ac-ajax");var i=b("../Asset");var f=b("@marcom/ac-object/defaults");
var c={timeout:30*1000,responseType:""};function h(m,k){var l=f(c,k||{});i.call(this,m,l);
this._request=this._createRequest();this._request.xhr.responseType=this.options.responseType
}g=h.prototype=Object.create(i.prototype);g.destroy=function(){if(this.status==="idle"||this.status==="loaded"){this._request=null
}if(this.status==="pending"){this._request.xhr.abort();i.prototype.destroy.call(this);
return}i.prototype.destroy.call(this)};g._createRequest=function(){return j.create({url:this.src,method:"GET",timeout:this.options.timeout,responseType:this.options.responseType})
};g._load=function(){this._request.send().then(this._onLoad)["catch"](this._onError)
};g._onLoad=function(k){this.data=this.data||k.response;this._request=null;i.prototype._onLoad.call(this)
};a.exports=h},{"../Asset":218,"@marcom/ac-ajax":209,"@marcom/ac-object/defaults":342}],223:[function(d,f,b){var g;
var a=d("../XHR");var c=d("@marcom/ac-object/extend");var h={responseType:"arraybuffer"};
function i(l,j){var k=c(j||{},h);a.call(this,l,k)}g=i.prototype=Object.create(a.prototype);
f.exports=i},{"../XHR":222,"@marcom/ac-object/extend":343}],224:[function(b,c,a){var f;
var d=b("../XHR");function g(i,h){d.apply(this,arguments)}f=g.prototype=Object.create(d.prototype);
f._onLoad=function(i){try{this.data=JSON.parse(i.response||i.responseText)}catch(h){this._onError(h)
}d.prototype._onLoad.call(this,i)};c.exports=g},{"../XHR":222}],225:[function(c,b,f){c("@marcom/ac-polyfills/Promise");
var i=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;var g=c("@marcom/ac-object/defaults");
var a=c("./utils/enqueueAsset");var k=c("./utils/selectQueue");var j=c("./queue");
var d={failFast:true,privateQueue:false,privateQueueThreads:j.DEFAULT_THREADS};
var l=function l(n,m){i.call(this);this.options=g(d,m||{});this._onGroupError=this._onGroupError.bind(this);
this._onAssetError=this._onAssetError.bind(this);this._onScheduled=this._onScheduled.bind(this);
this._onProgress=this._onProgress.bind(this);this._onComplete=this._onComplete.bind(this);
this.errors=[];this._queue=k(this.options.privateQueue,this.options.privateQueueThreads);
this._assets=[].concat(n);this._loaded=[];this._errored=[];this._enqueued=[];this._dequeued=[];
this._pending=[];this._isRunning=false;this._isComplete=false;this._isErrored=false;
this._destroyPending=false};var h=l.prototype=Object.create(i.prototype);h.load=function(){var m=this._assets.map(function(o){var q={asset:o,success:this._onProgress,failure:this._onAssetError,scheduled:this._onScheduled};
var p=a(this._queue,q,this.options.failFast);this._enqueued.push(p);return p.promise
},this);Promise.all(m).then(this._onComplete)["catch"](this._onGroupError);this._isRunning=true;
this._queue.start();var n=new Promise(function(p,o){this.once("load",p);if(this.options.failFast){this.once("error",p)
}}.bind(this));return n};h.isRunning=function(){return this._isRunning};h.count=function(){return this._enqueued.length
};h.pending=function(){return this._pending.length};h.loadedCount=function(){return this._loaded.length
};h.isComplete=function(){return this._isComplete};h.isErrored=function(){return this._isErrored
};h.pause=function(){if(!this.isComplete()&&!this.isErrored()&&this.isRunning()){this._dequeueItems();
this._pauseAssets();this._isRunning=false}};h.resume=function(){if(!this.isComplete()&&!this.isErrored()&&!this.isRunning()&&!this._destroyPending){this._reenqueueItems();
this._resumeAssets();this._isRunning=true}};h.destroy=function(){if(!this._destroyPending){i.prototype.destroy.call(this);
this.pause();this._destroyPending=true;this._assets.forEach(function(m){m.destroy()
});if(this.pending()===0){this._destroy()}}};h.trigger=function(){if(!this._destroyPending){i.prototype.trigger.apply(this,arguments)
}};h._destroy=function(){if(this.privateQueue){this._queue.destroy();this._queue=null;
this.options.privateQueue=null}this.errors=null;this._assets=null;this._loaded=null;
this._errored=null;this._enqueued=null;this._dequeued=null;this._pending=null};
h._pauseAssets=function(){this._assets.forEach(function(m){if(typeof m.pause==="function"){m.pause()
}})};h._resumeAssets=function(){this._assets.forEach(function(m){if(typeof m.resume==="function"){m.resume()
}})};h._onProgress=function(o){if(!this.isErrored()){var m=this._pending.indexOf(o);
var p=this._pending.splice(m,1)[0];if(p&&p.asset.status==="loaded"){this._loaded.push(p.asset)
}if(this._destroyPending){if(this.pending()===0){this._destroy()}return}var n=this._makeDataObject(o.asset);
this.trigger("progress",n)}};h._onScheduled=function(n){var m=this._enqueued.indexOf(n);
if(m>-1){this._enqueued.splice(m,1);this._pending.push(n)}};h._onComplete=function(m){this._isRunning=false;
this._isComplete=true;var n=this._makeDataObject(this._loaded[this._loaded.length-1]);
this.trigger("load",n)};h._onAssetError=function(n){this.errors.push(n.error);this._errored.push(n);
var m=this._pending.indexOf(n);this._pending.splice(m,1);var o=this._makeDataObject(n.asset);
this.trigger("error",o)};h._onGroupError=function(m){if(this.options.failFast){this.pause();
this._isErrored=true;this._isRunning=false;this._isComplete=false}};h._makeDataObject=function(o){var n=this.errors.length;
var m=this.errors.map(function(p){return this._assets.indexOf(p)},this);return{latest:o,assets:this._assets,error:!!(n>0),errored:this.errors}
};h._dequeueItems=function(){this._enqueued.forEach(function(m){this._queue.dequeueQueueItem(m.queueItem);
this._dequeued.push(m)},this);this._enqueued=[]};h._reenqueueItems=function(){this._dequeued.forEach(function(m){this._queue.enqueueQueueItem(m.queueItem);
this._enqueued.push(m)},this);this._dequeued=[]};b.exports=l},{"./queue":230,"./utils/enqueueAsset":231,"./utils/selectQueue":232,"@marcom/ac-event-emitter-micro":147,"@marcom/ac-object/defaults":342,"@marcom/ac-polyfills/Promise":394}],226:[function(b,c,a){c.exports.assetLoader=b("./assetLoader");
c.exports.types=b("./assetTypes");c.exports.AssetGroup=b("./AssetGroup");c.exports.createAsset=b("./createAsset")
},{"./AssetGroup":225,"./assetLoader":227,"./assetTypes":228,"./createAsset":229}],227:[function(j,b,w){var q=j("./queue");
var r=j("./AssetGroup");var k=j("./assetTypes");var v=j("./createAsset");var a=j("./utils/selectQueue");
var s=j("@marcom/ac-object/clone");function u(x,y){x=[].concat(x);return x.map(function(z){return v(z,y)
})}function t(z,x){var y=s(x||{});y.privateQueue=a(y.privateQueue,y.privateQueueThreads);
z=u(z,y.privateQueue);return new r(z,y)}b.exports={count:function g(){return q.getInstance().count()
},pending:function d(){return q.getInstance().pending()},pause:function f(){return q.getInstance().pause()
},stop:function p(){return q.getInstance().stop()},clear:function o(){return q.getInstance().clear()
},isEmpty:function n(){return q.getInstance().isEmpty()},load:function i(y,x){var z=t(y,x);
return z.load()},resume:function c(){return q.getInstance().start()},setThreads:function l(x){q.setThreads(x)
},createAssets:function m(y,x){return u(y,x)},createAssetGroup:function h(y,x){return t(y,x)
},types:k}},{"./AssetGroup":225,"./assetTypes":228,"./createAsset":229,"./queue":230,"./utils/selectQueue":232,"@marcom/ac-object/clone":340}],228:[function(c,b,f){var g=c("./Asset/XHR");
var d=c("./Asset/SplitFile");var h=c("./Asset/Img");var i=c("./Asset/Video");var a=c("./Asset/XHR/ArrayBuffer");
var j=c("./Asset/XHR/JSON");b.exports={XHR_ASSET:g,JSON_ASSET:j,SPLITFILE_ASSET:d,IMG_ASSET:h,VIDEO_ASSET:i,ARRAY_BUFFER_ASSET:a}
},{"./Asset/Img":219,"./Asset/SplitFile":220,"./Asset/Video":221,"./Asset/XHR":222,"./Asset/XHR/ArrayBuffer":223,"./Asset/XHR/JSON":224}],229:[function(c,f,b){var d=c("./assetTypes");
var a=c("./Asset");var i={txt:d.XHR_ASSET,xml:d.XHR_ASSET,csv:d.XHR_ASSET,json:d.JSON_ASSET,png:d.IMG_ASSET,jpg:d.IMG_ASSET,gif:d.IMG_ASSET,svg:d.IMG_ASSET,splitfile:d.SPLITFILE_ASSET};
function h(j){j=j.replace(/([?#].*)$/,"");return i[j.split(".").pop()]}f.exports=function g(k,j){var l={};
if(a.prototype.isPrototypeOf(k)){return src}if(typeof k==="string"){l.src=k;l.type=h(k)
}if((typeof k==="undefined"?"undefined":_typeof(k))==="object"){l=k;if(typeof l.type==="string"){l.type=h(l.type)
}if(!l.type){l.type=h(l.src)}}if(!l.options){l.options={}}if(j){l.options.queue=j
}return new l.type(l.src,l.options)}},{"./Asset":218,"./assetTypes":228}],230:[function(f,b,i){var h=f("@marcom/ac-queue").LiveQueue;
var a=4;var p=a;var o;function k(){return p}function n(q){q=q||a;return new h(q)
}function d(q){q=q||p;if(!o){o=n(q)}return o}function m(q){p=q}b.exports={getInstance:function g(q){return d(q)
},setThreads:function j(q){m(q)},newInstance:function l(q){return n(q)},isLiveQueue:function c(q){return q instanceof h
},DEFAULT_THREADS:a}},{"@marcom/ac-queue":214}],231:[function(c,d,a){c("@marcom/ac-polyfills/Promise");
function b(h,g){if(typeof h[g]==="function"){h[g](h)}}d.exports=function f(h,k,l){var j=function j(n,m){k.scheduled(k);
k.asset.once("loaded",function(o){n(k)});k.asset.once("error",function(o){if(l){return m(o)
}n(k)});k.asset.load()};var i=function i(){return new Promise(j)};var g=new Promise(function(n,m){k.asset.once("loaded",function(o){b(k,"success");
n(o)});k.asset.once("error",function(o){k.error=o;b(k,"failure");if(l){return m(o)
}n(k)})});k.queueItem=h.enqueue(i,k.asset.priority);k.promise=g;return k}},{"@marcom/ac-polyfills/Promise":394}],232:[function(c,d,b){var a=c("../queue");
d.exports=function f(h,g){g=g||a.DEFAULT_THREADS;if(a.isLiveQueue(h)){return h}if(h===true){return a.newInstance(g)
}return a.getInstance()}},{"../queue":230}],233:[function(c,d,b){var g=c("./utils/addEventListener");
var a=c("./shared/getEventType");d.exports=function f(k,i,j,h){i=a(k,i);return g(k,i,j,h)
}},{"./shared/getEventType":242,"./utils/addEventListener":245}],234:[function(d,f,c){var a=d("./utils/dispatchEvent");
var b=d("./shared/getEventType");f.exports=function g(j,i,h){i=b(j,i);return a(j,i,h)
}},{"./shared/getEventType":242,"./utils/dispatchEvent":246}],235:[function(b,c,a){arguments[4][151][0].apply(a,arguments)
},{"./shared/camelCasedEventTypes":236,"./shared/prefixHelper":237,"./shared/windowFallbackEventTypes":238,"./utils/eventTypeAvailable":239,dup:151}],236:[function(b,c,a){arguments[4][154][0].apply(a,arguments)
},{dup:154}],237:[function(b,c,a){arguments[4][36][0].apply(a,arguments)},{dup:36}],238:[function(b,c,a){arguments[4][159][0].apply(a,arguments)
},{dup:159}],239:[function(b,c,a){arguments[4][160][0].apply(a,arguments)},{dup:160}],240:[function(c,d,a){d.exports=function b(f){f=f||window.event;
if(f.preventDefault){f.preventDefault()}else{f.returnValue=false}}},{}],241:[function(d,f,c){var b=d("./utils/removeEventListener");
var a=d("./shared/getEventType");f.exports=function g(k,i,j,h){i=a(k,i);return b(k,i,j,h)
}},{"./shared/getEventType":242,"./utils/removeEventListener":247}],242:[function(c,f,b){var d=c("@marcom/ac-prefixer/getEventType");
f.exports=function a(j,i){var h;var g;if("tagName" in j){h=j.tagName}else{if(j===window){h="window"
}else{h="document"}}g=d(i,h);if(g){return g}return i}},{"@marcom/ac-prefixer/getEventType":235}],243:[function(c,d,b){d.exports=function a(f){f=f||window.event;
if(f.stopPropagation){f.stopPropagation()}else{f.cancelBubble=true}}},{}],244:[function(b,c,a){c.exports=function d(f){f=f||window.event;
return typeof f.target!=="undefined"?f.target:f.srcElement}},{}],245:[function(b,c,a){c.exports=function d(i,g,h,f){if(i.addEventListener){i.addEventListener(g,h,!!f)
}else{i.attachEvent("on"+g,h)}return i}},{}],246:[function(b,c,a){b("@marcom/ac-polyfills/CustomEvent");
c.exports=function d(i,h,g){var f;if(i.dispatchEvent){if(g){f=new CustomEvent(h,g)
}else{f=new CustomEvent(h)}i.dispatchEvent(f)}else{f=document.createEventObject();
if(g&&"detail" in g){f.detail=g.detail}i.fireEvent("on"+h,f)}return i}},{"@marcom/ac-polyfills/CustomEvent":377}],247:[function(b,c,a){c.exports=function d(i,g,h,f){if(i.removeEventListener){i.removeEventListener(g,h,!!f)
}else{i.detachEvent("on"+g,h)}return i}},{}],248:[function(b,c,a){arguments[4][6][0].apply(a,arguments)
},{"./ac-event-emitter/EventEmitter":249,dup:6}],249:[function(b,c,a){arguments[4][7][0].apply(a,arguments)
},{dup:7}],250:[function(b,c,a){c.exports={DOMEmitter:b("./ac-dom-emitter/DOMEmitter")}
},{"./ac-dom-emitter/DOMEmitter":251}],251:[function(c,b,d){var f;var k=c("ac-event-emitter").EventEmitter,j=c("./DOMEmitterEvent"),g={addEventListener:c("@marcom/ac-dom-events/addEventListener"),removeEventListener:c("@marcom/ac-dom-events/removeEventListener"),dispatchEvent:c("@marcom/ac-dom-events/dispatchEvent")},a={querySelectorAll:c("@marcom/ac-dom-traversal/querySelectorAll"),matchesSelector:c("@marcom/ac-dom-traversal/matchesSelector")};
var i="dom-emitter";function h(l){if(l===null){return}this.el=l;this._bindings={};
this._delegateFuncs={};this._eventEmitter=new k()}f=h.prototype;f.on=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._on);
return this};f.once=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._once);
return this};f.off=function(){this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments,0),this._off);
return this};f.has=function(l,q,p,n){var o,r;if(typeof q==="string"){o=q;r=p}else{r=q;
n=p}if(o){var m=this._getDelegateFuncBindingIdx(l,o,r,n,true);if(m>-1){return true
}return false}if(this._eventEmitter&&this._eventEmitter.has.apply(this._eventEmitter,arguments)){return true
}return false};f.trigger=function(n,m,o,s){n=this._parseEventNames(n);n=this._cleanStringData(n);
var q,r,p,l=n.length;if(typeof m==="string"){q=this._cleanStringData(m);r=o}else{r=m;
s=o}for(p=0;p<l;p++){this._triggerDOMEvents(n[p],r,q)}return this};f.emitterTrigger=function(m,o,p){if(!this._eventEmitter){return this
}m=this._parseEventNames(m);m=this._cleanStringData(m);o=new j(o,this);var n,l=m.length;
for(n=0;n<l;n++){this._eventEmitter.trigger(m[n],o,p)}return this};f.propagateTo=function(l,m){this._eventEmitter.propagateTo(l,m);
return this};f.stopPropagatingTo=function(l){this._eventEmitter.stopPropagatingTo(l);
return this};f.stopImmediatePropagation=function(){this._eventEmitter.stopImmediatePropagation();
return this};f.destroy=function(){this._triggerInternalEvent("willdestroy");this.off();
var l;for(l in this){if(this.hasOwnProperty(l)){this[l]=null}}};f._parseEventNames=function(l){if(!l){return[l]
}return l.split(" ")};f._onListenerEvent=function(n,m){var l=new j(m,this);this._eventEmitter.trigger(n,l,false)
};f._setListener=function(l){this._bindings[l]=this._onListenerEvent.bind(this,l);
g.addEventListener(this.el,l,this._bindings[l])};f._removeListener=function(l){g.removeEventListener(this.el,l,this._bindings[l]);
this._bindings[l]=null};f._triggerInternalEvent=function(l,m){this.emitterTrigger(i+":"+l,m)
};f._normalizeArgumentsAndCall=function(l,n){var r={};if(l.length===0){n.call(this,r);
return}if(typeof l[0]==="string"||l[0]===null){l=this._cleanStringData(l);r.events=l[0];
if(typeof l[1]==="string"){r.delegateQuery=l[1];r.callback=l[2];r.context=l[3]}else{r.callback=l[1];
r.context=l[2]}n.call(this,r);return}var m,p,q=":",o=l[0];for(m in o){if(o.hasOwnProperty(m)){r={};
p=this._cleanStringData(m.split(q));r.events=p[0];r.delegateQuery=p[1];r.callback=o[m];
r.context=l[1];n.call(this,r)}}};f._registerDelegateFunc=function(n,p,q,l,o){var m=this._delegateFunc.bind(this,n,p,q,o);
this._delegateFuncs[p]=this._delegateFuncs[p]||{};this._delegateFuncs[p][n]=this._delegateFuncs[p][n]||[];
this._delegateFuncs[p][n].push({func:l,context:o,delegateFunc:m});return m};f._cleanStringData=function(o){var n=false;
if(typeof o==="string"){o=[o];n=true}var m=[],q,s,r,p,l=o.length;for(q=0;q<l;q++){s=o[q];
if(typeof s==="string"){if(s===""||s===" "){continue}r=s.length;while(s[0]===" "){s=s.slice(1,r);
r--}while(s[r-1]===" "){s=s.slice(0,r-1);r--}}m.push(s)}if(n){return m[0]}return m
};f._unregisterDelegateFunc=function(n,q,l,p){if(!this._delegateFuncs[q]||!this._delegateFuncs[q][n]){return
}var o=this._getDelegateFuncBindingIdx(n,q,l,p),m;if(o>-1){m=this._delegateFuncs[q][n][o].delegateFunc;
this._delegateFuncs[q][n].splice(o,1);if(this._delegateFuncs[q][n].length===0){this._delegateFuncs[q][n]=null
}}return m};f._unregisterDelegateFuncs=function(l,n){if(!this._delegateFuncs[n]){return
}if(l!==null&&!this._delegateFuncs[n][l]){return}if(l===null){var m;for(m in this._delegateFuncs[n]){if(this._delegateFuncs[n].hasOwnProperty(m)){this._unbindDelegateFunc(m,n)
}}return}this._unbindDelegateFunc(l,n)};f._unbindDelegateFunc=function(l,n){var o,p,m=0;
while(this._delegateFuncs[n][l]&&this._delegateFuncs[n][l][m]){o=this._delegateFuncs[n][l][m];
p=this._delegateFuncs[n][l][m].length;this._off({events:l,delegateQuery:n,callback:o.func,context:o.context});
if(this._delegateFuncs[n][l]&&p===this._delegateFuncs[n][l].length){m++}}o=p=null
};f._unregisterDelegateFuncsByEvent=function(l){var m;for(m in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(m)){this._unregisterDelegateFuncs(l,m)
}}};f._delegateFunc=function(l,p,r,n,q){if(this._targetHasDelegateAncestor(q.target,p)){var m=Array.prototype.slice.call(arguments,0),o=m.slice(4,m.length);
n=n||window;if(_typeof(q.detail)==="object"){o[0]=q.detail}r.apply(n,o)}};f._targetHasDelegateAncestor=function(n,m){var l=n;
while(l&&l!==this.el&&l!==document.documentElement){if(a.matchesSelector(l,m)){return true
}l=l.parentNode}return false};f._on=function(p){var m=p.events,q=p.callback,o=p.delegateQuery,n=p.context,l=p.unboundCallback||q;
m=this._parseEventNames(m);m.forEach(function(v,r,t,u,s){if(!this.has(s)){this._setListener(s)
}if(typeof u==="string"){v=this._registerDelegateFunc(s,u,v,r,t)}this._triggerInternalEvent("willon",{evt:s,callback:v,context:t,delegateQuery:u});
this._eventEmitter.on(s,v,t);this._triggerInternalEvent("didon",{evt:s,callback:v,context:t,delegateQuery:u})
}.bind(this,q,l,n,o));m=q=l=o=n=null};f._off=function(q){var m=q.events,r=q.callback,p=q.delegateQuery,o=q.context,l=q.unboundCallback||r;
if(typeof m==="undefined"){this._eventEmitter.off();var n;for(n in this._bindings){if(this._bindings.hasOwnProperty(n)){this._removeListener(n)
}}for(n in this._delegateFuncs){if(this._delegateFuncs.hasOwnProperty(n)){this._delegateFuncs[n]=null
}}return}m=this._parseEventNames(m);m.forEach(function(w,s,u,v,t){if(typeof v==="string"&&typeof s==="function"){w=this._unregisterDelegateFunc(t,v,s,u);
if(!w){return}}if(typeof v==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncs(t,v);
return}if(typeof t==="string"&&typeof w==="undefined"){this._unregisterDelegateFuncsByEvent(t);
if(typeof v==="string"){return}}this._triggerInternalEvent("willoff",{evt:t,callback:w,context:u,delegateQuery:v});
this._eventEmitter.off(t,w,u);this._triggerInternalEvent("didoff",{evt:t,callback:w,context:u,delegateQuery:v});
if(!this.has(t)){this._removeListener(t)}}.bind(this,r,l,o,p));m=r=l=p=o=null};
f._once=function(o){var l=o.events,p=o.callback,n=o.delegateQuery,m=o.context;l=this._parseEventNames(l);
l.forEach(function(t,r,s,q){if(typeof s==="string"){return this._handleDelegateOnce(q,t,r,s)
}if(!this.has(q)){this._setListener(q)}this._triggerInternalEvent("willonce",{evt:q,callback:t,context:r,delegateQuery:s});
this._eventEmitter.once.call(this,q,t,r);this._triggerInternalEvent("didonce",{evt:q,callback:t,context:r,delegateQuery:s})
}.bind(this,p,m,n));l=p=n=m=null};f._handleDelegateOnce=function(l,o,m,n){this._triggerInternalEvent("willonce",{evt:l,callback:o,context:m,delegateQuery:n});
this._on({events:l,context:m,delegateQuery:n,callback:this._getDelegateOnceCallback.bind(this,l,o,m,n),unboundCallback:o});
this._triggerInternalEvent("didonce",{evt:l,callback:o,context:m,delegateQuery:n});
return this};f._getDelegateOnceCallback=function(l,q,n,p){var m=Array.prototype.slice.call(arguments,0),o=m.slice(4,m.length);
q.apply(n,o);this._off({events:l,delegateQuery:p,callback:q,context:n})};f._getDelegateFuncBindingIdx=function(s,p,n,l,t){var r=-1;
if(this._delegateFuncs[p]&&this._delegateFuncs[p][s]){var o,m,q=this._delegateFuncs[p][s].length;
for(o=0;o<q;o++){m=this._delegateFuncs[p][s][o];if(t&&typeof n==="undefined"){n=m.func
}if(m.func===n&&m.context===l){r=o;break}}}return r};f._triggerDOMEvents=function(n,q,p){var m=[this.el];
if(p){m=a.querySelectorAll(p,this.el)}var o,r,l=m.length;for(o=0;o<l;o++){g.dispatchEvent(m[o],n,{bubbles:true,cancelable:true,detail:q})
}};b.exports=h},{"./DOMEmitterEvent":252,"@marcom/ac-dom-events/addEventListener":233,"@marcom/ac-dom-events/dispatchEvent":234,"@marcom/ac-dom-events/removeEventListener":241,"@marcom/ac-dom-traversal/matchesSelector":59,"@marcom/ac-dom-traversal/querySelectorAll":60,"ac-event-emitter":248}],252:[function(b,c,a){var f={preventDefault:b("@marcom/ac-dom-events/preventDefault"),stopPropagation:b("@marcom/ac-dom-events/stopPropagation"),target:b("@marcom/ac-dom-events/target")};
var d;var g=function g(i,h){this._domEmitter=h;this.originalEvent=i||{};this._originalTarget=f.target(this.originalEvent);
this.target=this._originalTarget||this._domEmitter.el;this.currentTarget=this._domEmitter.el;
this.timeStamp=this.originalEvent.timeStamp||Date.now();if(this._isDOMEvent(this.originalEvent)){if(_typeof(this.originalEvent.detail)==="object"){this.data=this.originalEvent.detail
}}else{if(i){this.data=this.originalEvent;this.originalEvent={}}}};d=g.prototype;
d.preventDefault=function(){f.preventDefault(this.originalEvent)};d.stopPropagation=function(){f.stopPropagation(this.originalEvent)
};d.stopImmediatePropagation=function(){if(this.originalEvent.stopImmediatePropagation){this.originalEvent.stopImmediatePropagation()
}this._domEmitter.stopImmediatePropagation()};d._isDOMEvent=function(h){if(this._originalTarget||document.createEvent!=="undefined"&&typeof CustomEvent!=="undefined"&&h instanceof CustomEvent){return true
}return false};c.exports=g},{"@marcom/ac-dom-events/preventDefault":240,"@marcom/ac-dom-events/stopPropagation":243,"@marcom/ac-dom-events/target":244}],253:[function(b,c,a){arguments[4][46][0].apply(a,arguments)
},{dup:46}],254:[function(b,c,a){arguments[4][47][0].apply(a,arguments)},{dup:47}],255:[function(b,c,a){arguments[4][48][0].apply(a,arguments)
},{dup:48}],256:[function(b,c,a){c.exports=10},{}],257:[function(b,c,a){arguments[4][49][0].apply(a,arguments)
},{dup:49}],258:[function(b,c,a){arguments[4][50][0].apply(a,arguments)},{dup:50}],259:[function(b,c,a){c.exports={createDocumentFragment:b("./createDocumentFragment"),filterByNodeType:b("./filterByNodeType"),hasAttribute:b("./hasAttribute"),indexOf:b("./indexOf"),insertAfter:b("./insertAfter"),insertBefore:b("./insertBefore"),insertFirstChild:b("./insertFirstChild"),insertLastChild:b("./insertLastChild"),isComment:b("./isComment"),isDocument:b("./isDocument"),isDocumentFragment:b("./isDocumentFragment"),isDocumentType:b("./isDocumentType"),isElement:b("./isElement"),isNode:b("./isNode"),isNodeList:b("./isNodeList"),isTextNode:b("./isTextNode"),remove:b("./remove"),replace:b("./replace"),COMMENT_NODE:b("./COMMENT_NODE"),DOCUMENT_FRAGMENT_NODE:b("./DOCUMENT_FRAGMENT_NODE"),DOCUMENT_NODE:b("./DOCUMENT_NODE"),DOCUMENT_TYPE_NODE:b("./DOCUMENT_TYPE_NODE"),ELEMENT_NODE:b("./ELEMENT_NODE"),TEXT_NODE:b("./TEXT_NODE")}
},{"./COMMENT_NODE":253,"./DOCUMENT_FRAGMENT_NODE":254,"./DOCUMENT_NODE":255,"./DOCUMENT_TYPE_NODE":256,"./ELEMENT_NODE":257,"./TEXT_NODE":258,"./createDocumentFragment":260,"./filterByNodeType":261,"./hasAttribute":262,"./indexOf":263,"./insertAfter":264,"./insertBefore":265,"./insertFirstChild":266,"./insertLastChild":267,"./isComment":270,"./isDocument":271,"./isDocumentFragment":272,"./isDocumentType":273,"./isElement":274,"./isNode":275,"./isNodeList":276,"./isTextNode":277,"./remove":278,"./replace":279}],260:[function(c,d,b){d.exports=function a(g){var f=document.createDocumentFragment();
var h;if(g){h=document.createElement("div");h.innerHTML=g;while(h.firstChild){f.appendChild(h.firstChild)
}}return f}},{}],261:[function(d,f,c){d("@marcom/ac-polyfills/Array/prototype.slice");
d("@marcom/ac-polyfills/Array/prototype.filter");var g=d("./internal/isNodeType");
var a=d("./ELEMENT_NODE");f.exports=function b(i,h){h=h||a;i=Array.prototype.slice.call(i);
return i.filter(function(j){return g(j,h)})}},{"./ELEMENT_NODE":257,"./internal/isNodeType":268,"@marcom/ac-polyfills/Array/prototype.filter":367,"@marcom/ac-polyfills/Array/prototype.slice":375}],262:[function(c,d,a){d.exports=function b(g,f){if("hasAttribute" in g){return g.hasAttribute(f)
}return g.attributes.getNamedItem(f)!==null}},{}],263:[function(c,d,b){c("@marcom/ac-polyfills/Array/prototype.indexOf");
c("@marcom/ac-polyfills/Array/prototype.slice");var g=c("./internal/validate");
var a=c("./filterByNodeType");d.exports=function f(k,i){var h=k.parentNode;var j;
if(!h){return 0}j=h.childNodes;if(i!==false){j=a(j,i)}else{j=Array.prototype.slice.call(j)
}return j.indexOf(k)}},{"./filterByNodeType":261,"./internal/validate":269,"@marcom/ac-polyfills/Array/prototype.indexOf":370,"@marcom/ac-polyfills/Array/prototype.slice":375}],264:[function(b,c,a){var f=b("./internal/validate");
c.exports=function d(g,h){f.insertNode(g,true,"insertAfter");f.childNode(h,true,"insertAfter");
f.hasParentNode(h,"insertAfter");if(!h.nextSibling){return h.parentNode.appendChild(g)
}return h.parentNode.insertBefore(g,h.nextSibling)}},{"./internal/validate":269}],265:[function(c,d,a){var f=c("./internal/validate");
d.exports=function b(g,h){f.insertNode(g,true,"insertBefore");f.childNode(h,true,"insertBefore");
f.hasParentNode(h,"insertBefore");return h.parentNode.insertBefore(g,h)}},{"./internal/validate":269}],266:[function(c,d,b){var f=c("./internal/validate");
d.exports=function a(g,h){f.insertNode(g,true,"insertFirstChild");f.parentNode(h,true,"insertFirstChild");
if(!h.firstChild){return h.appendChild(g)}return h.insertBefore(g,h.firstChild)
}},{"./internal/validate":269}],267:[function(b,c,a){var d=b("./internal/validate");
c.exports=function f(g,h){d.insertNode(g,true,"insertLastChild");d.parentNode(h,true,"insertLastChild");
return h.appendChild(g)}},{"./internal/validate":269}],268:[function(b,c,a){arguments[4][51][0].apply(a,arguments)
},{"../isNode":275,dup:51}],269:[function(b,c,a){arguments[4][52][0].apply(a,arguments)
},{"../COMMENT_NODE":253,"../DOCUMENT_FRAGMENT_NODE":254,"../ELEMENT_NODE":257,"../TEXT_NODE":258,"./isNodeType":268,dup:52}],270:[function(c,d,a){var g=c("./internal/isNodeType");
var f=c("./COMMENT_NODE");d.exports=function b(h){return g(h,f)}},{"./COMMENT_NODE":253,"./internal/isNodeType":268}],271:[function(c,d,b){var g=c("./internal/isNodeType");
var a=c("./DOCUMENT_NODE");d.exports=function f(h){return g(h,a)}},{"./DOCUMENT_NODE":255,"./internal/isNodeType":268}],272:[function(b,c,a){arguments[4][53][0].apply(a,arguments)
},{"./DOCUMENT_FRAGMENT_NODE":254,"./internal/isNodeType":268,dup:53}],273:[function(b,c,a){var g=b("./internal/isNodeType");
var f=b("./DOCUMENT_TYPE_NODE");c.exports=function d(h){return g(h,f)}},{"./DOCUMENT_TYPE_NODE":256,"./internal/isNodeType":268}],274:[function(b,c,a){arguments[4][54][0].apply(a,arguments)
},{"./ELEMENT_NODE":257,"./internal/isNodeType":268,dup:54}],275:[function(b,c,a){arguments[4][55][0].apply(a,arguments)
},{dup:55}],276:[function(b,c,a){arguments[4][196][0].apply(a,arguments)},{dup:196}],277:[function(c,d,a){var g=c("./internal/isNodeType");
var b=c("./TEXT_NODE");d.exports=function f(h){return g(h,b)}},{"./TEXT_NODE":258,"./internal/isNodeType":268}],278:[function(b,c,a){arguments[4][56][0].apply(a,arguments)
},{"./internal/validate":269,dup:56}],279:[function(b,d,a){var f=b("./internal/validate");
d.exports=function c(g,h){f.insertNode(g,true,"insertFirstChild","newNode");f.childNode(h,true,"insertFirstChild","oldNode");
f.hasParentNode(h,"insertFirstChild","oldNode");return h.parentNode.replaceChild(g,h)
}},{"./internal/validate":269}],280:[function(b,c,a){b("@marcom/ac-polyfills/Promise");
b("@marcom/ac-polyfills/JSON");c.exports={createFlow:b("./ac-flow/flow/factory"),Player:b("./ac-flow/flow/Player")}
},{"./ac-flow/flow/Player":283,"./ac-flow/flow/factory":294,"@marcom/ac-polyfills/JSON":388,"@marcom/ac-polyfills/Promise":394}],281:[function(c,a,d){var k=c("@marcom/ac-event-emitter-micro").EventEmitterMicro,j=c("./compositor/decorator/Keyframe"),i=c("./compositor/decorator/Superframe"),h=c("./compositor/decorator/SuperKeyframe"),m=c("./compositor/decorator/Cache");
var l=c("./compositor/Sequence");function f(n,p,q,o){k.call(this);this._compositor=new l(p,q,o);
this.options=n||{}}var g=f.prototype=new k(null);g._gotoImageFrame=function(n){if(this._rendering){return Promise.resolve()
}else{if(this._currentFrame===n){return Promise.resolve()}}this._rendering=true;
return this._compositor.compositeFrames(this._currentFrame,n).then(function(){this._rendering=false;
this._currentFrame=n}.bind(this))};g.init=function(){var n;if(this.options.element.nodeName==="CANVAS"){n=this.options.element
}else{n=document.createElement("canvas");this.options.element.appendChild(n)}this.gotoFrame=this._gotoImageFrame;
return this._compositor.init(n).then(this._decorateCompositor.bind(this))};g.resumeLoading=function(){return this._compositor.resumeLoading()
};g.pauseLoading=function(){this._compositor.pauseLoading()};g._decorateCompositor=function(){var n=this._compositor;
var p;var o;if(n){p=this._compositor._diffRender.flowData;o=this._compositor.canvas;
if(p.superframeFrequency){n=new i(n,p.superframeFrequency)}if(p.version>=4){n=new j(n)
}if(p.version>=4&&p.superframeFrequency){n=new h(n)}if(this.options.keyframeCache){n=new m(n,this.options.keyframeCache)
}if(n===this._compositor){return Promise.resolve()}else{this._compositor=n;return this._compositor.init(o)
}}else{return Promise.reject()}};g._destroy=function(){this.off();this._compositor.destroy()
};if(typeof Object.defineProperties!=="function"){Object.defineProperties=function(){}
}Object.defineProperties(g,{_currentFrame:{value:0,enumerable:false,writable:true},frameCount:{get:function b(){return this._compositor.frameCount
},enumerable:true}});a.exports=f},{"./compositor/Sequence":284,"./compositor/decorator/Cache":285,"./compositor/decorator/Keyframe":286,"./compositor/decorator/SuperKeyframe":287,"./compositor/decorator/Superframe":288,"@marcom/ac-event-emitter-micro":147}],282:[function(b,c,a){var h=b("@marcom/ac-asset-loader/assetLoader");
var f=b("./data/provider/Async");var g=function g(i,j,k){this._manifestUrl=i;this._keyframeUrls=j;
this._imageUrlPattern=k;this.state={manifestLoaded:false,keyframesLoaded:false,diffsLoaded:false,diffCountLoaded:0,totalDiffs:null};
this.assets={keyframes:null,manifest:null,diffs:null};this._promises={};this._loaders={};
this._activeLoaders=[];this._resumeQueue=[];this._paused=true;this._shouldPause=false;
this._boundOnManifestLoaded=this._onManifestLoaded.bind(this);this._boundOnKeyframesLoaded=this._onKeyframesLoaded.bind(this);
this._boundOnDiffsLoaded=this._onDiffsLoaded.bind(this)};var d=g.prototype;d.setManifestUrl=function(i){this._manifestUrl=i;
return this};d.setKeyframeUrls=function(i){this._keyframeUrls=i;return this};d.setImageUrlPattern=function(i){this._imageUrlPattern=i;
return this};d.pause=function(){this._shouldPause=true;var k,j=this._activeLoaders.length;
for(k=0;k<j;k++){this._activeLoaders[k].pause()}this._paused=true};d.destroy=function(){var j,i,k;
this.pause();for(j in this._loaders){if(this._loaders.hasOwnProperty(j)){this._loaders[j].destroy()
}}for(i in this._promises){if(this._promises.hasOwnProperty(i)){if(this._promises[i].status()==="pending"){this._promises[i].reject()
}}}for(k in this){if(this.hasOwnProperty(k)){this[k]=null}}};d.load=function(){if(this._paused&&(this._activeLoaders.length>0||this._resumeQueue.length>0)){this._resume();
return true}};d._resume=function(){this._shouldPause=false;var n,k=this._activeLoaders.length;
for(n=0;n<k;n++){this._activeLoaders[n].load()}var m,l=this._resumeQueue.length;
for(m=0;m<l;m++){this._resumeQueue[m].call(this)}this._resumeQueue=[];this._paused=false
};d.loadManifest=function(){if(this._shouldPause){this._resumeQueue.push(this.loadManifest);
return}if(this.assets.manifest){return this.assets.manifest}else{this._paused=false;
this._loaders.manifest=new f(this._getManifestAssetsData());this._activeLoaders.push(this._loaders.manifest);
return this._loaders.manifest.load().then(this._boundOnManifestLoaded)}};d.loadKeyframes=function(){var i;
if(this._shouldPause){this._resumeQueue.push(this.loadKeyframes)}if(this.assets.keyframes){i=Promise.resolve(this.assets.keyframes)
}else{this._paused=false;this._loaders.keyframes=h.createAssetGroup(this._getKeyframesAssetsData());
this._activeLoaders.push(this._loaders.keyframes);i=this._loaders.keyframes.load().then(this._boundOnKeyframesLoaded)
}this._promises.keyframes=i;return this._promises.keyframes};d.loadDiffs=function(){var i;
if(this._shouldPause){this._resumeQueue.push(this.loadDiffs)}if(this.assets.diffs){i=this._promises.diffs.resolve(this.assets.diffs)
}else{this._paused=false;this._loaders.diffs=h.createAssetGroup(this._getDiffsAssetsData());
this._activeLoaders.push(this._loaders.diffs);i=this._loaders.diffs.load().then(this._boundOnDiffsLoaded)
}this._promises.diffs=i;return this._promises.diffs};d._getManifestAssetsData=function(){return this._manifestUrl
};d._getKeyframesAssetsData=function(){return this._keyframeUrls};d._getDiffsAssetsData=function(){var l=this.assets.manifest.imagesRequired,j=[],m,k,n=this._imageUrlPattern.match(/#/g).length;
for(m=1;m<=l;m++){k="0000"+m;k=k.substring(k.length-n);j.push(this._imageUrlPattern.replace(/#{2,}/g,k))
}return j};d._onManifestLoaded=function(i){if(this.assets){this.assets.manifest=i;
this.state.manifestLoaded=true;this._paused=true;this._removeFromActiveLoaders(this._loaders.manifest);
return this.assets.manifest}};d._onKeyframesLoaded=function(i){if(this.assets){this.assets.keyframes=i;
this.state.keyframeLoaded=true;this._paused=true;this._removeFromActiveLoaders(this._loaders.keyframes);
return Promise.resolve(this.assets.keyframes)}};d._onDiffsLoaded=function(i){if(this.assets){this.assets.diffs=i;
this.state.diffsLoaded=true;this._paused=true;this._removeFromActiveLoaders(this._loaders.diffs);
return Promise.resolve(this.assets.diffs)}};d._removeFromActiveLoaders=function(l){var k,j=this._activeLoaders.length;
for(k=0;k<j;k++){if(this._activeLoaders[k]===l){this._activeLoaders.splice(k,1);
return}}};c.exports=g},{"./data/provider/Async":292,"@marcom/ac-asset-loader/assetLoader":227}],283:[function(d,a,f){var i=d("@marcom/ac-dom-emitter").DOMEmitter;
var j=d("@marcom/ac-raf-emitter/RAFEmitter");function c(k,l){this.element=l;this._domEmitter=new i(l);
this._frameRate=30;this.paused=true;this.loop=false;this._destroyed=false;this._flow=k;
this._rafEmitter=new j();this._rafDrawSet=false;this._shouldAdvanceToTimeGlobal=false;
this._shouldGlobalTimeUpdate=false;this._shouldLocalTimeUpdate=false;this._boundAdvanceTimeToGlobal=this._advanceToTimeGlobal.bind(this);
this._onBoundGlobalTimeUpdate=this._onGlobalTimeUpdate.bind(this);this._onBoundLocalTimeUpdate=this._onLocalTimeUpdate.bind(this);
this._rafEmitter.on("draw",this._onDraw.bind(this))}var g=c.prototype;g._timeToFrame=function(k){var l;
l=Math.round(k/this.duration*this._flow.frameCount);l=l%(this._flow.frameCount+1);
return l<0?this._flow.frameCount+l:l};g._advanceToTimeGlobal=function(l){if(this._rafDrawSet){this._prevTime=this._prevTime||l.time;
this._currentTime+=(l.time-this._prevTime)/1000*this.playbackRate;this._prevTime=l.time;
this._pauseAfterRender=false;var k=this._timeToFrame(this._currentTime);if(!this.loop){if(this.playbackRate>0&&this._currentTime>this.duration){k=this._flow.frameCount;
this._currentTime=this.duration;this._pauseAfterRender=true}else{if(this.playbackRate<0&&this._currentTime<0){k=0;
this._currentTime=0;this._pauseAfterRender=true}}}else{this._currentTime=(this.duration+this._currentTime)%this.duration
}if(!this.paused&&!this.seeking){return this._flow.gotoFrame(k).then(this._onBoundGlobalTimeUpdate)
}}};g._onGlobalTimeUpdate=function(){this.trigger("timeupdate");if(this._pauseAfterRender){this.paused=true;
this.trigger("ended")}else{this._bindAdvanceToTimeGlobal()}};g._onLocalTimeUpdate=function(){this.seeking=false;
this.trigger("timeupdate");this.trigger("seeked");this._bindAdvanceToTimeGlobal()
};g._advanceToTimeLocal=function(k){if(!this.seeking){this.seeking=true;this.trigger("seeking");
this._currentTime=1*k;this._prevTime=null;this._cancelFrame();this._flow.gotoFrame(this._timeToFrame(k)).then(this._onBoundLocalTimeUpdate)
}};g._onLoaded=function(){this.trigger("loaded");this.trigger("canplaythrough")
};g._nullProperties=function(l){var k;for(k in l){if(l.hasOwnProperty(k)){l[k]=null
}}return l};g.destroy=function(){this._rafEmitter.destroy();this.trigger("destroy");
this.pause();this.off();this._flow.destroy();this._flow=this._nullProperties(this._flow);
this._nullProperties(this)};g.load=function(){if(this._flow.resumeLoading()){return
}this.trigger("loadstart");return this._flow.init().then(function(m){var l=function(){this._onLoaded()
}.bind(this);var k=function(){if(this._destroyed===false){this.trigger("error")
}}.bind(this);if(m){return m.then(l,k)}else{l()}}.bind(this))};g.pauseLoading=function(){this._flow.pauseLoading()
};g.play=function(){if(this.paused){this.paused=false;this.trigger("play");this._prevTime=null;
this._bindAdvanceToTimeGlobal()}return this};g.pause=function(){if(!this.paused){this.paused=true;
this._cancelFrame();this.trigger("pause")}return this};g.on=function(){this._domEmitter.on.apply(this._domEmitter,arguments)
};g.once=function(){this._domEmitter.once.apply(this._domEmitter,arguments)};g.trigger=function(){this._domEmitter.trigger.apply(this._domEmitter,arguments)
};g.off=function(){this._domEmitter.off.apply(this._domEmitter,arguments)};g._cancelFrame=function(){this._rafEmitter.cancel();
this._rafDrawSet=false};g._onDraw=function(k){if(this._shouldAdvanceToTimeGlobal){this._advanceToTimeGlobal(k)
}else{if(this._shouldGlobalTimeUpdate){this._onGlobalTimeUpdate(k)}else{if(this._shouldLocalTimeUpdate){this._onLocalTimeUpdate(k)
}}}this._shouldLocalTimeUpdate=false;this._shouldGlobalTimeUpdate=false;this._shouldLocalTimeUpdate=false
};g._bindAdvanceToTimeGlobal=function(){this._rafDrawSet=true;this._shouldAdvanceToTimeGlobal=true;
this._rafEmitter.run()};g._bindGlobalTimeUpdate=function(){this._rafDrawSet=true;
this._shouldGlobalTimeUpdate=true;this._rafEmitter.run()};g._bindLocalTimeUpdate=function(){this._rafDrawSet=true;
this._shouldLocalTimeUpdate=true;this._rafEmitter.run()};if(typeof Object.defineProperties!=="function"){Object.defineProperties=function(){}
}Object.defineProperties(g,{_currentTime:{value:0,enumerable:false,writable:true},_playbackRate:{value:1,enumerable:false,writable:true},currentTime:{get:function b(){return this._currentTime*1
},set:g._advanceToTimeLocal,enumerable:true},frameRate:{get:function b(){return this._frameRate
},set:function h(k){if(isFinite(k)){this._frameRate=k;this.trigger("durationchange")
}},enumerable:true},playbackRate:{get:function b(){return this._playbackRate*1},set:function h(k){if(isFinite(k)){this._playbackRate=1*k;
this.trigger("ratechange")}},enumerable:true},duration:{get:function b(){return this._flow.frameCount/this.frameRate
},enumerable:true}});a.exports=c},{"@marcom/ac-dom-emitter":250,"@marcom/ac-raf-emitter/RAFEmitter":322}],284:[function(d,a,f){var h=d("../diff/Render");
var j=d("../LoadController");function b(l,m,k){this._keyframes=m;this._imageUrlPattern=k;
this._loadController=new j(l,m,k)}var g=b.prototype;g._initDiffRender=function(k){this._images=k.assets.map(function(l){return l.data
});this.canvas.height=this._images[0].height;this.canvas.width=this._images[0].width;
this.applyFrame(this._images[0])};g.init=function(k){this.canvas=k||document.createElement("canvas");
this.context=k.getContext("2d");return this._loadController.loadKeyframes().then(this._initDiffRender.bind(this)).then(this._loadController.loadManifest.bind(this._loadController)).then(this.createDiffRender.bind(this))
};g.resumeLoading=function(){return this._loadController.load()};g.pauseLoading=function(){this._loadController.pause()
};g.createDiffRender=function(k){this._diffRender=new h(k,this._imageUrlPattern,this._loadController);
return this._diffRender.init()};g.applyFrame=function(l){var k=this.context;k.drawImage(l,0,0)
};g.calculateRenderCount=function(k,l){var m=0;if(Math.abs(l-k)>=l){k=1;m=1}else{if(Math.abs(l-k)>=this.frameCount-l&&this._images[1]){k=this.frameCount-2;
m=1}}if(l>0&&l<this.frameCount-1){return Math.abs(k-l)+m}else{return m}};g.compositeFrames=function(k,l){l=this.frameCount<l?this.frameCount-1:l<0?0:l;
k=this.frameCount-2<k?this.frameCount-2:k<0?0:k;var m;if(Math.abs(l-k)>=l){k=1;
this.applyFrame(this._images[0])}else{if(Math.abs(l-k)>=this.frameCount-l&&this._images[1]){k=this.frameCount-2;
this.applyFrame(this._images[1])}}m=k>l?-1:k<l?1:0;if(l>0&&l<this.frameCount-1){while(k!==l){this._diffRender.renderDiff(this.canvas,k);
k+=m}}return Promise.resolve(k)};g.destroy=function(){this._loadController.destroy()
};if(typeof Object.defineProperties!=="function"){Object.defineProperties=function(){}
}Object.defineProperties(g,{frameCount:{get:function c(){return this._diffRender.frames.length+2
},enumerable:true},canvas:{get:function c(){return this._canvas},set:function i(k){return this._canvas=k
},enumerable:true},mainCompositor:{get:function c(){var k=this;while(k._compositor){k=k._compositor
}return k},enumerable:true}});a.exports=b},{"../LoadController":282,"../diff/Render":293}],285:[function(d,f,b){function a(j,i){this._compositor=j;
this._keyframeInterval=i||8;this._keyframes=[]}var g=a.prototype;g._getClosestKeyframe=function(i){var j=i%this._keyframeInterval,k=Math.floor(i/this._keyframeInterval)+(j>this._keyframeInterval/2?1:0);
return k};g._getFrameFromKeyframe=function(i){return i*this._keyframeInterval};
g._saveKeyframe=function(k){var i,j=Math.floor(k/this._keyframeInterval);if(k%this._keyframeInterval===0&&!this._keyframes[j]){i=document.createElement("canvas");
i.width=this._compositor.canvas.width;i.height=this._compositor.canvas.height;i.getContext("2d").drawImage(this._compositor.canvas,0,0);
this._keyframes[j]=i}};g.init=function(i){return this._compositor.init.apply(this._compositor,arguments)
};g.resumeLoading=function(){return this._compositor.resumeLoading()};g.pauseLoading=function(){return this._compositor.pauseLoading()
};g.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};g.calculateRenderCount=function(i,j){i=this._getFrameFromKeyframe(this._getClosestKeyframe(j));
return this._compositor.calculateRenderCount(i,j)+1};g.compositeFrames=function(i,k){var l=this._getClosestKeyframe(k);
if(this._keyframes[l]&&this._compositor.calculateRenderCount(i,k)>this.calculateRenderCount(i,k)){i=this._getFrameFromKeyframe(l);
this.applyFrame(this._keyframes[l]);return this._compositor.compositeFrames(i,k).then(function j(){})
}else{return this._compositor.compositeFrames(i,k).then(function j(){},null,this._saveKeyframe.bind(this))
}};g.destroy=function(){return this._compositor.destroy()};if(typeof Object.defineProperties!=="function"){Object.defineProperties=function(){}
}Object.defineProperties(g,{frameCount:{get:function c(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function c(){return this._compositor.canvas},set:function h(i){return this._compositor.canvas=i
},enumerable:true}});f.exports=a},{}],286:[function(d,f,a){var c=d("../../keyframe/Render");
function h(j){this._compositor=j;this._flowDataProvider=this.mainCompositor._loadController._loaders.manifest
}var g=h.prototype;g.init=function(j){this._keyframeDiffRender=new c(this._flowDataProvider._data,this.mainCompositor._imageUrlPattern);
return this._keyframeDiffRender.init()};g.resumeLoading=function(){return this._compositor.resumeLoading()
};g.pauseLoading=function(){return this._compositor.pauseLoading()};g.applyFrame=function(j){return this._compositor.applyFrame.apply(this._compositor,arguments)
};g.applyKeyframe=function(j,k){this._keyframeDiffRender.renderKeyframe(this.canvas,j,k)
};g.compositeFrames=function(j,k){if(!this._isKeyframeDiff(k-1)){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}this.applyKeyframe(k-1);return Promise.resolve(j-1)};g._isKeyframeDiff=function(j){return j in this._keyframeDiffRender._loader._keyframes
};g.calculateRenderCount=function(j,k){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};g.destroy=function(){return this._compositor.destroy()};if(typeof Object.defineProperties!=="function"){Object.defineProperties=function(){}
}Object.defineProperties(g,{frameCount:{get:function b(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function b(){return this._compositor.canvas},set:function i(j){return this._compositor.canvas=j
},enumerable:true},mainCompositor:{get:function b(){return this._compositor.mainCompositor
},enumerable:true}});f.exports=h},{"../../keyframe/Render":296}],287:[function(c,d,a){function h(i){this._compositor=i;
this._frames=this.mainCompositor._loadController._loaders.manifest._data.frames;
this._superframeInterval=this.mainCompositor._diffRender.flowData.superframeFrequency
}var f=h.prototype;f.init=function(i){return this._compositor.init.apply(this._compositor,arguments)
};f.resumeLoading=function(){return this._compositor.resumeLoading()};f.pauseLoading=function(){return this._compositor.pauseLoading()
};f.applyFrame=function(i){return this._compositor.applyFrame.apply(this._compositor,arguments)
};f.applyKeyframe=function(i,j){this._compositor.applyKeyframe.apply(this._compositor,arguments)
};f.compositeFrames=function(i,k){var l,j;if(k<1||k>this.frameCount-2){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}if(this._isKeyframeDiff(k-1)){l=Math.abs(i-k)===1?true:false;this.applyKeyframe(k-1,l);
return Promise.resolve(i-1)}if(Math.abs(k-i)>this._superframeInterval){j=this._getShortestRender(i,k);
if(this._isKeyframeDiff(j-1)||j<=0||j>=this.frameCount-2){return this._compositeFromSuperKeyframe(j,k)
}}return this._compositor.compositeFrames.apply(this._compositor,[i,k])};f._getShortestRender=function(i,k){var m=this._compositor.calculateRenderCount,l=this._getClosestSuperKeyframe(k-1),j=m.apply(this._compositor,[l,k])+1,n=m.apply(this._compositor,[i,k]);
if(j<=n){return l}else{return i}};f._compositeFromSuperKeyframe=function(m,k){var i=this.canvas.getContext("2d"),j=m<=0?this.mainCompositor._images[0]:m>=this.frameCount-2?this.mainCompositor._images[1]:this._frames[m-1].image,l;
i.drawImage(j,0,0);return this._compositor.compositeFrames.call(this._compositor,m,k)
};f._getClosestSuperFrame=function(i){return Math.round(i/this._superframeInterval)*this._superframeInterval
};f._getClosestSuperKeyframe=function(k){var n,o,m,l,j=this._frames.length;if(k<j+1&&k>0){l=k-1;
while(l>=0){if(this._frames[l].type==="keyframe"){n=l+1;break}l-=1}l=k+1;while(l<=j-1){if(this._frames[l].type==="keyframe"){o=l+1;
break}l+=1}}n=n?n:0;o=o?o:this.frameCount;m=k-n<o-k?n:o;return m};f._isKeyframeDiff=function(i){return this._compositor._isKeyframeDiff.apply(this._compositor,arguments)
};f.destroy=function(){return this._compositor.destroy()};if(typeof Object.defineProperties!=="function"){Object.defineProperties=function(){}
}Object.defineProperties(f,{frameCount:{get:function b(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function b(){return this._compositor.canvas},set:function g(i){return this._compositor.canvas=i
},enumerable:true},mainCompositor:{get:function b(){return this._compositor.mainCompositor
},enumerable:true}});d.exports=h},{}],288:[function(c,d,a){function g(j,i){this._compositor=j;
this._superframeInterval=i||4}var f=g.prototype;f._getClosestSuperframe=function(i){return Math.round(i/this._superframeInterval)*this._superframeInterval
};f.init=function(i){this._screenCanvas=i};f.resumeLoading=function(){return this._compositor.resumeLoading()
};f.pauseLoading=function(){return this._compositor.pauseLoading()};f.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};f.calculateRenderCount=function(i,k){var j=this._getClosestSuperframe(i);if(Math.abs(j-k)>this._superframeInterval/2){i=j+(i>k?-1:1)*this._superframeInterval;
return this.calculateRenderCount(i,k)+1}else{return Math.abs(j-k)+1}};f.compositeFrames=function(i,l){var m,j;
if(l<=0||l>=this.frameCount-2){this._compositor.compositeFrames(i,l)}if(i>this.frameCount-2){i=this.frameCount-2
}else{if(i<=0){i=1}}j=this._getClosestSuperframe(i);if(this._compositor.calculateRenderCount(i,l)>this.calculateRenderCount(i,l)){m=this._compositor.compositeFrames(j,j).then(function k(){var n=j+(i>l?-1:1)*this._superframeInterval;
this._compositor.compositeFrames(j,n).then(function(){return this.compositeFrames(n,l)
}.bind(this))}.bind(this))}else{m=this._compositor.compositeFrames(i,l).then(function k(){}.bind(this))
}m.then(function k(){}.bind(this));return m};f.destroy=function(){return this._compositor.destroy()
};if(typeof Object.defineProperties!=="function"){Object.defineProperties=function(){}
}Object.defineProperties(f,{frameCount:{get:function b(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function b(){return this._compositor.canvas},set:function h(i){return this._compositor.canvas=i
},enumerable:true},mainCompositor:{get:function b(){return this._compositor.mainCompositor
},enumerable:true}});d.exports=g},{}],289:[function(b,c,a){function d(f,g){this.location=f;
this.length=g}c.exports=d},{}],290:[function(c,d,b){function a(){}d.exports=a},{}],291:[function(f,c,h){var i=f("./Manifest"),d=f("./Block"),j;
var l={parseData:function g(m){j=0;var n=m.frames.map(this._parseFrame,this);return Object.create(i.prototype,{version:{value:m.version},framecount:{value:m.frameCount},blockSize:{value:m.blockSize},imagesRequired:{value:m.imagesRequired},reversible:{value:m.reversible},superframeFrequency:{value:m.superframeFrequency},frames:{value:n}})
},_valueForCharAt:function k(o,m){var n=o.charCodeAt(m);if(n>64&&n<91){return n-65
}if(n>96&&n<123){return n-71}if(n>47&&n<58){return n+4}if(n===43){return 62}if(n===47){return 63
}},_createNumberFromBase64Range:function b(q,m,p){var o=0,n;while(p--){n=this._valueForCharAt(q,m++);
o+=n<<p*6}return o},_parseFrame:function a(q){var p,t=[],o=q.value,n=q.startImageIndex,s=q.startBlockIndex,r,m;
if(q.type==="keyframe"){t.type="keyframe";t.width=q.width;t.height=q.height;t.x=q.x;
t.y=q.y;return t}for(p=0;p<o.length;p+=5){m=this._createNumberFromBase64Range(o,p,3);
r=this._createNumberFromBase64Range(o,p+3,2);t.push(Object.create(d.prototype,{location:{value:m,enumerable:true},length:{value:r,enumerable:true},block:{value:(s+=r)-r,enumerable:true},startImageIndex:{value:n,enumerable:true}}))
}return t}};c.exports=l},{"./Block":289,"./Manifest":290}],292:[function(b,c,a){var h=b("@marcom/ac-asset-loader/assetLoader");
var g=b("../processor");function f(i){this.url=i}var d=f.prototype;d.load=function(){return h.load(this.url).then(function(j){var i;
if(j&&j.latest&&j.latest.data){i=g.parseData(j.latest.data);this._data=i}return i
}.bind(this))};c.exports=f},{"../processor":291,"@marcom/ac-asset-loader/assetLoader":227}],293:[function(d,f,b){function a(k,i,j){this.flowData=k;
this.flowData.imageUrlPattern=i;this._loadController=j}var g=a.prototype;g._storeImages=function(l){var j=l.assets.length;
this.images=l.assets.map(function(i){return i.data});this._blocksPerFullDiff=[];
this._blockCountUpToIndex=[];var m=0;for(var k=0;k<j;k++){this._blocksPerFullDiff[k]=this.images[k].width/this.flowData.blockSize*(this.images[k].height/this.flowData.blockSize);
m+=this._blocksPerFullDiff[k];this._blockCountUpToIndex[k]=m}};g._applyDiffRange=function(k,q){var u=q.block,l=q.length,j=k.canvas.width/this.flowData.blockSize,n=q.startImageIndex,w=this.images[n].width,i=u%this._blockCountUpToIndex[n],v=w/this.flowData.blockSize,t=i%v*this.flowData.blockSize,s=Math.floor(i/(v||1))*this.flowData.blockSize,p=q.location%j*this.flowData.blockSize,o=Math.floor(q.location/j)*this.flowData.blockSize,m,r;
while(l){m=Math.min(l*this.flowData.blockSize,k.canvas.width-p,w-t);r=m/this.flowData.blockSize;
k.drawImage(this.images[n],t,s,m,this.flowData.blockSize,p,o,m,this.flowData.blockSize);
l-=r;if(l){if((t+=m)>=w){t=0;s+=this.flowData.blockSize}if((p+=m)>=k.canvas.width){p=0;
o+=this.flowData.blockSize}u+=r}}};g.init=function(){return this._loadController.loadDiffs().then(this._storeImages.bind(this))
};g.renderDiff=function(k,n){var m=k.getContext("2d");n-=1;for(var l=0,j=this.frames[n].length;
l<j;l++){this._applyDiffRange(m,this.frames[n][l])}};if(typeof Object.defineProperties!=="function"){Object.defineProperties=function(){}
}Object.defineProperties(g,{frames:{get:function c(){return this.flowData.frames
},set:function h(i){this.flowData.frames=i},enumerable:true}});f.exports=a},{}],294:[function(f,c,h){var k=f("@marcom/ac-object/defaults");
var j=f("./Flow");var d=f("./Player");var b={keyframeCache:8,preload:true};var g={fileFormat:"jpg",baseName:"flow",imageUrlPattern:"###",startframeFileFormat:null,endframeFileFormat:null,basePath:null,manifestPath:null,manifestFileFormat:"json",diffPath:null,framePath:null};
var a=function a(n){if(n.lastIndexOf("/")!==n.length-1){n=n+"/"}return n};var l=function l(q){var t=q.basePath?a(q.basePath):null;
var p=q.framePath?a(q.framePath):null;var o=q.diffPath?a(q.diffPath):null;var s=q.manifestPath?a(q.manifestPath):null;
var n=q.baseName+"_";var r={};r.startframe=(p||t)+n+"startframe."+(q.startframeFileFormat||q.fileFormat);
r.endframe=(p||t)+n+"endframe."+(q.endframeFileFormat||q.fileFormat);r.imageUrlPattern=(o||t)+n+q.imageUrlPattern+"."+q.fileFormat;
r.manifest=(s||t)+n+"manifest."+q.manifestFileFormat;return r};var m=function m(o,p){var n=l(p);
var q=[n.startframe,n.endframe];return new j(o,n.manifest,q,n.imageUrlPattern)};
var i=function i(q,r){var n=q||{};var p=r||{};n=k(b,q);p=k(g,r);if(!n.element){q.element=document.createElement("canvas")
}var o=m(n,p);var s=new d(o,n.element);if(n.preload){s.load()}return s};c.exports=i
},{"./Flow":281,"./Player":283,"@marcom/ac-object/defaults":342}],295:[function(d,f,b){var h=d("@marcom/ac-asset-loader/assetLoader");
function a(i,l){var k,j=i.match(/#/g).length;this._keyframes={};i=i.replace(/([^#]+)(#+)(\..*)/,"$1key_$2$3");
this._imageUrls=[];if(l.frames){l.frames.forEach(function(n,m){if(n.type==="keyframe"){k="0000"+m;
k=k.substring(k.length-j);this._imageUrls.push(i.replace(/#+/g,k));this._keyframes[m]=n
}}.bind(this))}}var g=a.prototype;g.load=function(){if(this._imageUrls.length>0){return h.load(this._imageUrls)
}return Promise.resolve()};if(typeof Object.defineProperties!=="function"){Object.defineProperties=function(){}
}Object.defineProperties(g,{keyframes:{get:function c(){return this._keyframes},enumerable:true}});
f.exports=a},{"@marcom/ac-asset-loader/assetLoader":227}],296:[function(b,c,a){var g=b("./Loader");
function f(i,h){this.flowData=i;this.flowData.imageUrlPattern=h}var d=f.prototype;
d._storeImages=function(k){var j=0,l;if(k&&k.assets.length>0){for(var h in this._loader._keyframes){if(this._loader._keyframes.hasOwnProperty(h)){l=k.assets[j];
this._loader._keyframes[h].image=l.data;j+=1}}}};d.init=function(){this._loader=new g(this.flowData.imageUrlPattern,this.flowData);
return this._loader.load().then(this._storeImages.bind(this))};d.renderKeyframe=function(k,j,r){var i=k.getContext("2d"),l=this._loader.keyframes[j],m=l.image,p=l.x,o=l.y,q=l.width,n=l.height;
if(r===true){i.drawImage(m,p,o,q,n,p,o,q,n)}else{if(this.flowData.reversible){i.drawImage(m,0,0)
}else{i.drawImage(m,p,o,q,n)}}};c.exports=f},{"./Loader":295}],297:[function(b,c,a){c.exports={SharedInstance:b("./ac-shared-instance/SharedInstance")}
},{"./ac-shared-instance/SharedInstance":298}],298:[function(d,h,c){var i=window,g="AC",a="SharedInstance",f=i[g];
var b=function(){var k={};return{get:function l(p,o){var q=null;if(k[p]&&k[p][o]){q=k[p][o]
}return q},set:function n(q,o,p){if(!k[q]){k[q]={}}if(typeof p==="function"){k[q][o]=new p()
}else{k[q][o]=p}return k[q][o]},share:function m(q,o,p){var r=this.get(q,o);if(!r){r=this.set(q,o,p)
}return r},remove:function j(p,o){var q=typeof o==="undefined"?"undefined":_typeof(o);
if(q==="string"||q==="number"){if(!k[p]||!k[p][o]){return}k[p][o]=null;return}if(k[p]){k[p]=null
}}}}();if(!f){f=i[g]={}}if(!f[a]){f[a]=b}h.exports=f[a]},{}],299:[function(b,c,a){c.exports={CID:b("./ac-mvc-cid/CID")}
},{"./ac-mvc-cid/CID":300}],300:[function(c,f,b){var a=c("@marcom/ac-shared-instance").SharedInstance;
var g="ac-mvc-cid:CID",d="1.0.0";function i(){this._idCount=0}var h=i.prototype;
h._cidPrefix="cid";h.getNewCID=function(){var j=this._cidPrefix+"-"+this._idCount;
this._idCount++;return j};f.exports=a.share(g,d,i)},{"@marcom/ac-shared-instance":297}],301:[function(b,c,a){c.exports={Model:b("./ac-mvc-model/Model")}
},{"./ac-mvc-model/Model":302}],302:[function(f,a,g){var k=f("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var b=f("@marcom/ac-object/defaults");var i=f("@marcom/ac-object/create");var c=f("@marcom/ac-mvc-cid").CID;
function d(l){k.call(this);this.attributes=b(this.defaultAttributes,l||{});this.cid=c.getNewCID();
if(this.attributes[this.idAttribute]){this.id=this.attributes[this.idAttribute]
}}var j=k.prototype;var h=d.prototype=i(j);h.defaultAttributes={};h.idAttribute="id";
h.get=function(l){if(!this.attributes){return}return this.attributes[l]};h.set=function(m,l){if(!this.attributes){return
}var q;var p;var o;var n={};var r=false;for(q in m){if(m.hasOwnProperty(q)){o=this.get(q);
if(o===m[q]||(typeof o==="undefined"?"undefined":_typeof(o))==="object"&&_typeof(m[q])==="object"&&JSON.stringify(o)===JSON.stringify(m[q])){continue
}r=true;this.attributes[q]=m[q];p={value:m[q],previous:o};n[q]=p;this._triggerChange(q,p,l)
}}if(r){this._trigger("change",n,l)}};h.hasAttribute=function(l){if(!this.attributes){return false
}return this.attributes[l]!==undefined};h.eachAttribute=function(m,l){if(!this.attributes){return
}var n;for(n in this.attributes){if(this.attributes.hasOwnProperty(n)){m.call(l,{attribute:n,value:this.attributes[n]})
}}};h.destroy=function(){this.trigger("destroy");j.destroy.call(this);var l;for(l in this){if(this.hasOwnProperty(l)){this[l]=null
}}};h._trigger=function(n,m,l){l=l||{};if(l.silent!==true){this.trigger(n,m)}};
h._triggerChange=function(n,m,l){return this._trigger("change:"+n,m,l)};a.exports=d
},{"@marcom/ac-event-emitter-micro":147,"@marcom/ac-mvc-cid":299,"@marcom/ac-object/create":341,"@marcom/ac-object/defaults":342}],303:[function(b,c,a){b("@marcom/ac-polyfills/Array/prototype.slice");
b("@marcom/ac-polyfills/Element/prototype.classList");var d=b("./className/add");
c.exports=function f(){var j=Array.prototype.slice.call(arguments);var h=j.shift(j);
var g;if(h.classList&&h.classList.add){h.classList.add.apply(h.classList,j);return
}for(g=0;g<j.length;g++){d(h,j[g])}}},{"./className/add":304,"@marcom/ac-polyfills/Array/prototype.slice":375,"@marcom/ac-polyfills/Element/prototype.classList":383}],304:[function(b,c,a){var d=b("./contains");
c.exports=function f(h,g){if(!d(h,g)){h.className+=" "+g}}},{"./contains":305}],305:[function(b,c,a){var f=b("./getTokenRegExp");
c.exports=function d(h,g){return f(g).test(h.className)}},{"./getTokenRegExp":306}],306:[function(b,c,a){c.exports=function d(f){return new RegExp("(\\s|^)"+f+"(\\s|$)")
}},{}],307:[function(c,d,b){var f=c("./contains");var g=c("./getTokenRegExp");d.exports=function a(i,h){if(f(i,h)){i.className=i.className.replace(g(h),"$1").trim()
}}},{"./contains":305,"./getTokenRegExp":306}],308:[function(d,f,c){d("@marcom/ac-polyfills/Array/prototype.slice");
d("@marcom/ac-polyfills/Element/prototype.classList");var b=d("./className/remove");
f.exports=function a(){var j=Array.prototype.slice.call(arguments);var h=j.shift(j);
var g;if(h.classList&&h.classList.remove){h.classList.remove.apply(h.classList,j);
return}for(g=0;g<j.length;g++){b(h,j[g])}}},{"./className/remove":307,"@marcom/ac-polyfills/Array/prototype.slice":375,"@marcom/ac-polyfills/Element/prototype.classList":383}],309:[function(b,c,a){arguments[4][297][0].apply(a,arguments)
},{"./ac-shared-instance/SharedInstance":310,dup:297}],310:[function(b,c,a){arguments[4][298][0].apply(a,arguments)
},{dup:298}],311:[function(b,c,a){arguments[4][299][0].apply(a,arguments)},{"./ac-mvc-cid/CID":312,dup:299}],312:[function(b,c,a){arguments[4][300][0].apply(a,arguments)
},{"@marcom/ac-shared-instance":309,dup:300}],313:[function(b,c,a){c.exports={View:b("./ac-mvc-view/View")}
},{"./ac-mvc-view/View":314}],314:[function(d,b,g){var k=d("@marcom/ac-dom-emitter").DOMEmitter;
var c=d("@marcom/ac-mvc-cid").CID;var f={create:d("@marcom/ac-object/create"),defaults:d("@marcom/ac-object/defaults")};
var j={insertLastChild:d("@marcom/ac-dom-nodes/insertLastChild"),remove:d("@marcom/ac-dom-nodes/remove")};
var i=d("@marcom/ac-classlist/add");var l=d("@marcom/ac-classlist/remove");function a(m){var o;
var n;var p;this.options=f.defaults(this.defaultOptions,m||{});this.cid=c.getNewCID();
this.model=this.options.model;if(this.options.template){this.template=this.options.template
}o=this.options.tagName||this.tagName;n=this.options.element;p=this.options.className||this.className;
if(!n){n=document.createElement(o)}k.call(this,n);if(p){this.addClassName(p)}if(this.options.events){this.delegateEvents(this.options.events)
}}var h=a.prototype=f.create(k.prototype);h.tagName="div";h.defaultOptions={};h.getTagName=function(){return this.el.tagName.toLowerCase()
};h.appendTo=function(m){j.insertLastChild(this.el,m);return this};h.render=function(){};
h.addClassName=function(m){return this._manipulateClassName(m,i)};h.removeClassName=function(m){return this._manipulateClassName(m,l)
};h.destroy=function(){this.emitterTrigger("destroy");this.off();j.remove(this.el);
var m;for(m in this){if(this.hasOwnProperty(m)){this[m]=null}}};h.delegateEvents=function(n,o){o=o||this;
var m,p;for(m in n){if(n.hasOwnProperty(m)){p=n[m];if(typeof p==="string"){n[m]=this[n[m]]
}}}this.on(n,o);return this};h._manipulateClassName=function(n,o){var m;if(typeof n==="string"){m=n.split(" ")
}else{if((typeof n==="undefined"?"undefined":_typeof(n))==="object"&&Array.isArray(n)){m=n.slice()
}else{return this}}m.unshift(this.el);o.apply(this.el,m);return this};b.exports=a
},{"@marcom/ac-classlist/add":303,"@marcom/ac-classlist/remove":308,"@marcom/ac-dom-emitter":250,"@marcom/ac-dom-nodes/insertLastChild":267,"@marcom/ac-dom-nodes/remove":278,"@marcom/ac-mvc-cid":311,"@marcom/ac-object/create":341,"@marcom/ac-object/defaults":342}],315:[function(b,c,a){arguments[4][297][0].apply(a,arguments)
},{"./ac-shared-instance/SharedInstance":316,dup:297}],316:[function(b,c,a){arguments[4][298][0].apply(a,arguments)
},{dup:298}],317:[function(c,f,b){var a=c("@marcom/ac-shared-instance").SharedInstance;
var g="ac-raf-emitter-id-generator:sharedRAFEmitterIDGeneratorInstance",d="1.0.3";
var h=function h(){this._currentID=0};h.prototype.getNewID=function(){this._currentID++;
return"raf:"+this._currentID};f.exports=a.share(g,d,h)},{"@marcom/ac-shared-instance":315}],318:[function(b,c,a){arguments[4][297][0].apply(a,arguments)
},{"./ac-shared-instance/SharedInstance":319,dup:297}],319:[function(b,c,a){arguments[4][298][0].apply(a,arguments)
},{dup:298}],320:[function(b,d,a){b("@marcom/ac-polyfills/performance/now");var f;
function c(g){g=g||{};this._reset();this._willRun=false;this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);
this._boundOnExternalAnimationFrame=this._onExternalAnimationFrame.bind(this)}f=c.prototype;
f.subscribe=function(g){if(this._nextFrameSubscribers[g.id]){return false}this._nextFrameSubscribers[g.id]=g;
this._nextFrameSubscriberCount++;this._run();return true};f.unsubscribe=function(g){if(!this._nextFrameSubscribers[g.id]){return false
}this._nextFrameSubscribers[g.id]=null;this._nextFrameSubscriberCount--;if(this._nextFrameSubscriberCount===0){this._cancel()
}return true};f.trigger=function(j,h){var g;for(g in this._subscribers){if(this._subscribers.hasOwnProperty(g)&&this._subscribers[g]!==null&&this._subscribers[g]._didDestroy===false){this._subscribers[g].trigger(j,h)
}}};f.destroy=function(){var g=this._cancel();this._subscribers=null;this._nextFrameSubscribers=null;
this._rafData=null;this._boundOnAnimationFrame=null;this._onExternalAnimationFrame=null;
return g};f.useExternalAnimationFrame=function(g){if(typeof g!=="boolean"){return
}var h=this._isUsingExternalAnimationFrame;if(g&&this._animationFrame){cancelAnimationFrame(this._animationFrame);
this._animationFrame=null}if(this._willRun&&!g&&!this._animationFrame){this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
}this._isUsingExternalAnimationFrame=g;if(g){return this._boundOnExternalAnimationFrame
}return h||false};f._run=function(){if(!this._willRun){this._willRun=true;if(this.lastFrameTime===0){this.lastFrameTime=performance.now()
}this._animationFrameActive=true;if(!this._isUsingExternalAnimationFrame){this._animationFrame=requestAnimationFrame(this._boundOnAnimationFrame)
}return true}};f._cancel=function(){var g=false;if(this._animationFrameActive){if(this._animationFrame){cancelAnimationFrame(this._animationFrame);
this._animationFrame=null}this._animationFrameActive=false;this._willRun=false;
g=true}if(!this._isRunning){this._reset()}return g};f._onSubscribersAnimationFrameStart=function(h){var g;
for(g in this._subscribers){if(this._subscribers.hasOwnProperty(g)&&this._subscribers[g]!==null&&this._subscribers[g]._didDestroy===false){this._subscribers[g]._onAnimationFrameStart(h)
}}};f._onSubscribersAnimationFrameEnd=function(h){var g;for(g in this._subscribers){if(this._subscribers.hasOwnProperty(g)&&this._subscribers[g]!==null&&this._subscribers[g]._didDestroy===false){this._subscribers[g]._onAnimationFrameEnd(h)
}}};f._onAnimationFrame=function(g){this._subscribers=this._nextFrameSubscribers;
this._nextFrameSubscribers={};this._nextFrameSubscriberCount=0;this._isRunning=true;
this._willRun=false;this._didRequestNextRAF=false;this._rafData.delta=g-this.lastFrameTime;
this.lastFrameTime=g;this._rafData.fps=0;if(this._rafData.delta>=1000){this._rafData.delta=0
}if(this._rafData.delta!==0){this._rafData.fps=1000/this._rafData.delta}this._rafData.time=g;
this._rafData.naturalFps=this._rafData.fps;this._rafData.timeNow=Date.now();this._onSubscribersAnimationFrameStart(this._rafData);
this.trigger("update",this._rafData);this.trigger("draw",this._rafData);this._onSubscribersAnimationFrameEnd(this._rafData);
if(!this._willRun){this._reset()}};f._onExternalAnimationFrame=function(g){if(!this._isUsingExternalAnimationFrame){return
}this._onAnimationFrame(g)};f._reset=function(){this._rafData={time:0,delta:0,fps:0,naturalFps:0,timeNow:0};
this._subscribers={};this._nextFrameSubscribers={};this._nextFrameSubscriberCount=0;
this._didEmitFrameData=false;this._animationFrame=null;this._animationFrameActive=false;
this._isRunning=false;this._shouldReset=false;this.lastFrameTime=0};d.exports=c
},{"@marcom/ac-polyfills/performance/now":404}],321:[function(c,g,b){var a=c("@marcom/ac-shared-instance").SharedInstance;
var h="ac-raf-executor:sharedRAFExecutorInstance",f="1.0.3";var d=c("./RAFExecutor");
g.exports=a.share(h,f,d)},{"./RAFExecutor":320,"@marcom/ac-shared-instance":318}],322:[function(f,g,d){var i;
var h=f("@marcom/ac-event-emitter-micro").EventEmitterMicro;var c=f("@marcom/ac-raf-executor/sharedRAFExecutorInstance");
var b=f("@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance");
function a(j){j=j||{};h.call(this);this.id=b.getNewID();this.executor=j.executor||c;
this._reset();this._willRun=false;this._didDestroy=false}i=a.prototype=Object.create(h.prototype);
i.run=function(){if(!this._willRun){this._willRun=true;this.executor.subscribe(this);
return true}return false};i.cancel=function(){var j=false;if(this._willRun){this.executor.unsubscribe(this);
this._willRun=false;j=true}this._reset();return j};i.destroy=function(){var j=this.cancel();
this.executor.unsubscribe(this);this.executor=null;h.prototype.destroy.call(this);
this._didDestroy=true;return j};i.willRun=function(){return this._willRun};i.isRunning=function(){return this._isRunning
};i._onAnimationFrameStart=function(j){this._isRunning=true;this._willRun=false;
if(!this._didEmitFrameData){this._didEmitFrameData=true;this.trigger("start",j)
}};i._onAnimationFrameEnd=function(j){if(!this._willRun){this.trigger("stop",j);
this._reset()}};i._reset=function(){this._didEmitFrameData=false;this._isRunning=false
};g.exports=a},{"@marcom/ac-event-emitter-micro":147,"@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance":317,"@marcom/ac-raf-executor/sharedRAFExecutorInstance":321}],323:[function(d,f,c){var h;
var a=d("./RAFEmitter");var i=d("@marcom/ac-object/clone");var g=d("@marcom/ac-event-emitter-micro").EventEmitterMicro;
function b(k,j){g.call(this);j=j||{};this._fps=k||0;this._delta=0;this._currentFps=0;
this._rafEmitter=j.rafEmitter||new a();this._lastThrottledTime=0;this._didEmitFrameData=false;
this._rafEmitterEvent=null;this._shouldDraw=false;this._boundOnRAFEmitterUpdate=this._onRAFEmitterUpdate.bind(this);
this._boundOnRAFEmitterDraw=this._onRAFEmitterDraw.bind(this);this._boundOnRAFEmitterStop=this._onRAFEmitterStop.bind(this);
this._rafEmitter.on("update",this._boundOnRAFEmitterUpdate);this._rafEmitter.on("draw",this._boundOnRAFEmitterDraw);
this._rafEmitter.on("stop",this._boundOnRAFEmitterStop)}h=b.prototype=Object.create(g.prototype);
h.setFps=function(j){if(j===this._fps){return false}this._fps=j;return true};h.getFps=function(){return this._fps
};h.run=function(){return this._rafEmitter.run()};h.cancel=function(){return this._rafEmitter.cancel()
};h.willRun=function(){return this._rafEmitter.willRun()};h.isRunning=function(){return this._rafEmitter.isRunning()
};h.destroy=function(){var j=this._rafEmitter.destroy();g.prototype.destroy.call(this);
this._rafEmitter=null;this._boundOnRAFEmitterUpdate=null;this._boundOnRAFEmitterDraw=null;
this._boundOnRAFEmitterStop=null;this._rafEmitterEvent=null;return j};h._onRAFEmitterUpdate=function(j){if(this._lastThrottledTime===0){this._lastThrottledTime=this._rafEmitter.executor.lastFrameTime
}this._delta=j.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}this._currentFps=1000/this._delta;if(this._currentFps>this._fps){this._rafEmitter.run();
return}this._rafEmitterEvent=i(j);this._rafEmitterEvent.delta=this._delta;this._rafEmitterEvent.fps=this._currentFps;
this._lastThrottledTime=this._rafEmitterEvent.time;this._shouldDraw=true;if(!this._didEmitFrameData){this.trigger("start",this._rafEmitterEvent);
this._didEmitFrameData=true}this.trigger("update",this._rafEmitterEvent)};h._onRAFEmitterDraw=function(){if(this._shouldDraw){this._shouldDraw=false;
this.trigger("draw",this._rafEmitterEvent)}};h._onRAFEmitterStop=function(){this._lastThrottledTime=0;
this._didEmitFrameData=false;this.trigger("stop",this._rafEmitterEvent)};f.exports=b
},{"./RAFEmitter":322,"@marcom/ac-event-emitter-micro":147,"@marcom/ac-object/clone":340}],324:[function(b,d,a){var c=b("./singleCall");
d.exports=c("draw")},{"./singleCall":325}],325:[function(d,f,c){var a=d("./RAFEmitter");
var b=d("./ThrottledRAFEmitter");f.exports=function(g){return function(j,i){var h;
if(i){h=new b(i)}else{h=new a()}h.once(g,function(k){j(k);h.destroy();j=h=null});
h.run()}}},{"./RAFEmitter":322,"./ThrottledRAFEmitter":323}],326:[function(b,d,a){var f=b("./ac-media-object/factories/createVideo");
var c=b("./ac-media-object/factories/createFlow");d.exports={createFlow:c,createVideo:f}
},{"./ac-media-object/factories/createFlow":327,"./ac-media-object/factories/createVideo":328}],327:[function(c,d,b){var a=c("./../views/FlowView");
var f=c("@marcom/ac-object/clone");d.exports=function(j,l,i){var k=f(i||{},true);
var g;k.type="flow";function h(m){throw new Error(m)}if(!l){h("Please provide both a valid container element and a valid mediaSrc object as arguments.")
}else{if(!l.basePath){h("Please provide a valid mediaSrc object with a basePath property.")
}}if(!k.mediaObjectView){g=new a(j,l,k);g.options.mediaObjectView=g}else{g=k.mediaObjectView
}return g}},{"./../views/FlowView":331,"@marcom/ac-object/clone":340}],328:[function(f,g,d){var b=f("./../views/VideoView");
var h=f("./../views/InlinePolyfillVideoView");var c=f("@marcom/ac-feature").isHandheld;
var a=f("@marcom/ac-feature").isTablet;var i=f("@marcom/ac-object/clone");g.exports=function(m,o,l){var n=i(l||{},true);
var j;n.type="video";function k(p){throw new Error(p)}if(!o){k("Please provide both a valid container element and a valid mediaSrc object as arguments.")
}else{if(!o.basePath){k("Please provide a valid mediaSrc object with a basePath property.")
}}if(!n.mediaObjectView){if(n.iosInline&&!window.matchMedia("(-webkit-video-playable-inline)").matches&&(c()||a())){j=new h(m,o,n)
}else{j=new b(m,o,n)}j.options.mediaObjectView=j}else{j=n.mediaObjectView}return j
}},{"./../views/InlinePolyfillVideoView":332,"./../views/VideoView":333,"@marcom/ac-feature":163,"@marcom/ac-object/clone":340}],329:[function(d,f,c){var h=d("@marcom/ac-mvc-model").Model;
var b=d("@marcom/ac-object");function a(i){h.apply(this,arguments)}var g=a.prototype=b.create(h.prototype);
g.defaultAttributes={type:"video",paused:true,ended:false,ready:false,loadStart:false,loaded:false,error:false,destroyed:false,currentTime:0,playbackRate:1,duration:0,preload:false,autoplay:false,frameRate:24,enhanced:false,looping:false};
g.getType=function(){return this.get("type")};g.getPaused=function(){return this.get("paused")
};g.getEnded=function(){return this.get("ended")};g.getReady=function(){return this.get("ready")
};g.getDestroyed=function(){return this.get("destroyed")};g.getLoadStart=function(){return this.get("loadedStart")
};g.getLoaded=function(){return this.get("loaded")};g.getError=function(){return this.get("error")
};g.getCurrentTime=function(){return this.get("currentTime")};g.getPlaybackRate=function(){return this.get("playbackRate")
};g.getDuration=function(){return this.get("duration")};g.getPreload=function(){return this.get("preload")
};g.getAutoplay=function(){return this.get("autoplay")};g.getFrameRate=function(){return this.get("frameRate")
};g.getEnhanced=function(){return this.get("enhanced")};g.getLooping=function(){return this.get("looping")
};g.setPaused=function(i){this.set({paused:i})};g.setEnded=function(i){this.set({ended:i})
};g.setReady=function(i){this.set({ready:i})};g.setDestroyed=function(i){this.set({destroyed:i})
};g.setDuration=function(i){this.set({duration:i})};g.setLoadStart=function(i){this.set({loadStart:i})
};g.setLoaded=function(i){this.set({loaded:i})};g.setError=function(i){this.set({error:i})
};g.setCurrentTime=function(i){this.set({currentTime:i})};g.setPlaybackRate=function(i){this.set({playbackRate:i})
};g.setPreload=function(i){this.set({preload:i})};g.setAutoplay=function(i){this.set({autoplay:i})
};g.setFrameRate=function(i){this.set({frameRate:i})};g.setEnhanced=function(i){this.set({enhanced:i})
};g.setLooping=function(i){this.set({looping:i})};f.exports=a},{"@marcom/ac-mvc-model":301,"@marcom/ac-object":339}],330:[function(d,g,c){var a=d("./../models/MediaModel");
var i=d("@marcom/ac-mvc-view").View;var b=d("@marcom/ac-object");var f=function f(k,l,j){i.call(this,{element:k});
this.options=b.clone(j||{},true);this.mediaSrc=l||"";this.model=this.options.model||new a(this.options);
this._onLoadStartChange=this._onLoadStartChange.bind(this);this._onLoadedChange=this._onLoadedChange.bind(this);
this._onPausedChange=this._onPausedChange.bind(this);this._onReadyChange=this._onReadyChange.bind(this);
this._onErrorChange=this._onErrorChange.bind(this);this._onEnhancedChange=this._onEnhancedChange.bind(this);
this._onCurrentTimeChange=this._onCurrentTimeChange.bind(this);this._onPlaybackRateChange=this._onPlaybackRateChange.bind(this);
this._onDestroyedChange=this._onDestroyedChange.bind(this);this._onEndedChange=this._onEndedChange.bind(this);
this._respondToPlay=this._respondToPlay.bind(this);this._respondToPause=this._respondToPause.bind(this);
this._respondToTimeUpdate=this._respondToTimeUpdate.bind(this);this._respondToEnded=this._respondToEnded.bind(this);
this._respondToDurationChange=this._respondToDurationChange.bind(this);this._respondToRateChange=this._respondToRateChange.bind(this);
this._init()};var h=f.prototype=b.create(i.prototype);h._init=function(){this._createMediaElement();
this._createMediaEmitter();this._createMediaLoader();this._bindEvents();this._config()
};h._createMediaElement=function(){};h._createMediaEmitter=function(){};h._createMediaLoader=function(){};
h._config=function(){if(this.options.preload===true){this._setPreload(true);this.load()
}if(this.options.autoplay===true){this._setAutoplay(true)}if(this.options.looping===true){this._setLooping(true)
}if(this.options.frameRate){this._setFrameRate(this.options.frameRate)}};h._bindEvents=function(){this._bindViewEvents();
this._bindModelEvents()};h.destroy=function(){if(!this.getDestroyed()){this._destroy();
this._setDestroyed(true);this.model.off();this.off();for(var j in this){if(this.hasOwnProperty(j)&&typeof this[j]!=="function"){this[j]=null
}}}};h._bindModelEvents=function(){this.model.on("change:loadStart",this._onLoadStartChange);
this.model.on("change:loaded",this._onLoadedChange);this.model.on("change:paused",this._onPausedChange);
this.model.on("change:ready",this._onReadyChange);this.model.on("change:error",this._onErrorChange);
this.model.on("change:enhanced",this._onEnhancedChange);this.model.on("change:currentTime",this._onCurrentTimeChange);
this.model.on("change:playbackRate",this._onPlaybackRateChange);this.model.on("change:destroyed",this._onDestroyedChange);
this.model.on("change:ended",this._onEndedChange)};h._onLoadStartChange=function(){this.trigger("loadstart")
};h._onLoadedChange=function(){this.trigger("loaded")};h._onPausedChange=function(j){if(j.value===true){this.trigger("pause");
this.el.classList.remove("mediaobject-playing")}else{this.trigger("play");this.el.classList.remove("mediaobject-ended");
this.el.classList.add("mediaobject-playing")}};h._onReadyChange=function(){this.trigger("ready")
};h._onErrorChange=function(){this.trigger("error")};h._onEnhancedChange=function(){this.el.classList.add("mediaobject-enhanced");
this.mediaElement.classList.add("mediaobject-element");this.trigger("enhanced")
};h._onCurrentTimeChange=function(){this.trigger("timeupdate")};h._onPlaybackRateChange=function(){this.trigger("ratechange")
};h._onDestroyedChange=function(){this.el.classList.remove("mediaobject-playing");
this.el.classList.remove("mediaobject-ended");this.el.classList.remove("mediaobject-enhanced");
this.el.classList.add("mediaobject-destroyed");this.trigger("destroyed")};h._onEndedChange=function(j){if(j.value===true){this.trigger("ended")
}};h._bindViewEvents=function(){if(!this.mediaEmitter){return}this.mediaEmitter.on("play",this._respondToPlay);
this.mediaEmitter.on("pause",this._respondToPause);this.mediaEmitter.on("timeupdate",this._respondToTimeUpdate);
this.mediaEmitter.on("ended",this._respondToEnded);this.mediaEmitter.on("durationchange",this._respondToDurationChange);
this.mediaEmitter.on("ratechange",this._respondToRateChange)};h._respondToPlay=function(){this.model.set({ended:false,paused:false})
};h._respondToPause=function(){this.model.setPaused(true)};h._respondToTimeUpdate=function(){var j=0;
if(this.mediaElement.currentTime){j=this.mediaElement.currentTime}else{if(this.mediaEmitter.currentTime){j=this.mediaEmitter.currentTime
}else{return}}if(this.getCurrentTime()!==j){this.model.set({currentTime:j})}};h._respondToEnded=function(){this.model.set({ended:true,paused:true});
this.el.classList.remove("mediaobject-playing");this.el.classList.add("mediaobject-ended")
};h._respondToDurationChange=function(){var j=0;if(this.mediaElement.duration){j=this.mediaElement.duration
}else{if(this.mediaEmitter.duration){j=this.mediaEmitter.duration}else{return}}this.model.set({duration:j})
};h._respondToRateChange=function(){var j=0;if(this.mediaElement.playbackRate){j=this.mediaElement.playbackRate
}else{if(this.mediaEmitter.playbackRate){j=this.mediaEmitter.playbackRate}else{return
}}this.model.set({playbackRate:j})};h.enhance=function(){};h.play=function(){};
h.pause=function(){};h.reset=function(){};h.setCurrentTime=function(j){};h.setPlaybackRate=function(j){};
h.goToFrame=function(k){var j=k/this.model.frameRate;return this.setCurrentTime(j)
};h.goToPercent=function(j){var k=j*this.getDuration();return this.setCurrentTime(k)
};h._setReady=function(j){this.model.setReady(j)};h._setLoadStart=function(j){this.model.setLoadStart(j)
};h._setLoaded=function(j){this.model.setLoaded(j)};h._setError=function(j){this.model.setError(j)
};h._setDuration=function(j){this.model.setDuration(j)};h._setPreload=function(j){this.model.setPreload(j)
};h._setAutoplay=function(j){this.model.setAutoplay(j)};h._setFrameRate=function(j){this.model.setFrameRate(j)
};h._setEnhanced=function(j){this.model.setEnhanced(j)};h._setDestroyed=function(j){this.model.setDestroyed(j)
};h._setLooping=function(j){};h._destroy=function(){};h.getType=function(){return this.model.getType()
};h.getPaused=function(){return this.model.getPaused()};h.getEnded=function(){return this.model.getEnded()
};h.getReady=function(){return this.model.getReady()};h.getLoadStart=function(){return this.model.getLoadStart()
};h.getLoaded=function(){return this.model.getLoaded()};h.getError=function(){return this.model.getError()
};h.getDuration=function(){return this.model.getDuration()};h.getEnhanced=function(){return this.model.getEnhanced()
};h.getCurrentTime=function(){return this.model.getCurrentTime()};h.getCurrentFrame=function(){return Math.floor(this.getCurrentTime()*this.options.frameRate)
};h.getCurrentPercent=function(){return this.model.getCurrentTime()/this.getDuration()||0
};h.getPlaybackRate=function(){return this.model.getPlaybackRate()};h.getFrameRate=function(){return this.model.getFrameRate()
};h.getPreload=function(){return this.model.getPreload()};h.getAutoplay=function(){return this.model.getAutoplay()
};h.getLooping=function(){return this.model.getLooping()};h.getDestroyed=function(){if(this.model){return this.model.getDestroyed()
}else{return true}};g.exports=f},{"./../models/MediaModel":329,"@marcom/ac-mvc-view":313,"@marcom/ac-object":339}],331:[function(b,a,c){var d=b("./BaseView");
var i=b("@marcom/ac-dom-nodes");var g=b("@marcom/ac-flow").createFlow;var j=b("@marcom/ac-raf-emitter/draw");
var h=function h(l,m,k){d.call(this,l,m,k);this._onLoad=this._onLoad.bind(this);
this._onError=this._onError.bind(this);this._onReady=this._onReady.bind(this)};
var f=h.prototype=Object.create(d.prototype);f._createMediaElement=function(){this.mediaElement=document.createElement("canvas")
};f._createMediaEmitter=function(){this.flowOptions={element:this.mediaElement,preload:false,keyframeCache:this.options.keyframeCache||false};
this.mediaEmitter=g(this.flowOptions,this.mediaSrc)};f._createMediaLoader=function(){this.mediaLoader=this.mediaEmitter
};f.load=function(){this._setLoadStart(true);this.mediaLoader.once("loaded",this._onLoad);
this.mediaLoader.once("error",this._onError);this.mediaEmitter.once("canplaythrough",this._onReady);
if(!this.loaded){this.mediaLoader.load()["catch"](this._onError)}};f._onLoad=function(){this._setLoaded(true)
};f._onError=function(){if(this.model){this._setError(true)}};f._onReady=function(){this._setReady(true);
this._setDuration(this.mediaEmitter.duration);this.setPlaybackRate(this.getPlaybackRate());
this._totalFrames=this._getTotalFrames();if(this.getAutoplay()){if(this.getEnhanced===false){this.enhance()
}this.play()}};f._getTotalFrames=function(){return this.getDuration()*this.getFrameRate()
};f.enhance=function(){this._setEnhanced(true);j(function(){if(this.mediaElement){this._inject()
}}.bind(this))};f._inject=function(){i.insertFirstChild(this.mediaElement,this.el)
};f._destroy=function(){this._remove();if(this.mediaEmitter){this.mediaEmitter.destroy()
}};f._remove=function(){i.remove(this.mediaElement)};f.play=function(){if(this.model.getPaused()===false){return
}if(this.mediaEmitter.currentTime>=this.getDuration()){this.setCurrentTime(0)}if(this.getReady()&&this.mediaEmitter!==null){this.mediaEmitter.play()
}};f.pause=function(){if(this.model.getPaused()===true){return}this.mediaEmitter.pause()
};f.reset=function(){if(this.model.getCurrentTime()===0){return}this.setCurrentTime(0);
this.pause()};f.setCurrentTime=function(k){if(k<0){k=0}if(k>this.getDuration()){k=this.getDuration()
}this.mediaEmitter.currentTime=k};f.setPlaybackRate=function(k){this.mediaEmitter.playbackRate=k
};f._setLooping=function(k){this.mediaEmitter.loop=k;this.model.setLooping(k)};
a.exports=h},{"./BaseView":330,"@marcom/ac-dom-nodes":259,"@marcom/ac-flow":280,"@marcom/ac-raf-emitter/draw":324}],332:[function(d,f,c){var b=d("./VideoView");
var i=b.prototype;var a=d("@marcom/ac-raf-emitter/RAFEmitter");var g=function g(k,l,j){b.call(this,k,l,j);
this._polyfillRAFEmitter=j.polyfillRAFEmitter||new a();this._boundHandlePolyfillRAFEmitterDraw=this._handlePolyfillRAFEmitterDraw.bind(this);
this._polyfillRAFEmitter.on("draw",this._boundHandlePolyfillRAFEmitterDraw)};var h=g.prototype=Object.create(b.prototype);
h._initInlineVideo=function(){i._initInlineVideo.apply(this,arguments);this._shouldLoop=false
};h._destroy=function(){i._destroy.apply(this,arguments);if(this._polyfillRAFEmitter){this._polyfillRAFEmitter.destroy();
this._polyfillRAFEmitter=null}};h.play=function(){if(this.model.getPaused()===false){return
}this.model.setPaused(false);this._polyfillRAFEmitter.run()};h.pause=function(){if(this.model.getPaused()===true){return
}this.model.setPaused(true);this._polyfillRAFEmitter.cancel()};h.setCurrentTime=function(j){i.setCurrentTime.apply(this,arguments);
this._polyfillRAFEmitter.run()};h._handlePolyfillRAFEmitterDraw=function(p){var m=this.model.getCurrentTime();
var l=this.model.getPlaybackRate();var o=this.mediaElement.duration;var q=p.delta/1000*l;
if(this.model.getPaused()){return}m+=q;var j=m<=0;var r=m>=o;var n=l>=0;var k=l<0;
if(j){m=0}if(r){m=o}if(this._shouldLoop){this._shouldLoop=false;if(n){this.setCurrentTime(q)
}else{this.setCurrentTime(o-q)}return}this.setCurrentTime(m);if(j&&k||r&&n){if(this.model.getLooping()){this._shouldLoop=true
}else{this.pause();this.model.setEnded(true)}}};f.exports=g},{"./VideoView":333,"@marcom/ac-raf-emitter/RAFEmitter":322}],333:[function(c,b,f){var g=c("./BaseView");
var o=g.prototype;var m=c("@marcom/ac-raf-emitter/draw");var k=c("@marcom/ac-dom-nodes");
var n=c("@marcom/ac-dom-emitter").DOMEmitter;var l=c("@marcom/ac-dom-styles");var d=c("@marcom/ac-asset-loader").assetLoader;
var a=c("@marcom/ac-useragent");var j=c("@marcom/ac-feature").isHandheld;var i=c("@marcom/ac-feature").isTablet;
var p=function p(r,s,q){this.srcForVideoEl=null;this._cannotPlayInlineVideo=null;
this._onLoaded=this._onLoaded.bind(this);this._onReady=this._onReady.bind(this);
g.call(this,r,s,q);if(q.iosInline){this._initInlineVideo()}};var h=p.prototype=Object.create(g.prototype);
h.inlineClassName="mediaobject-ios-inline-video";h.inlineAttribute="playsinline";
h._cannotPlayInlineVideo=null;h._initInlineVideo=function(){if(this.mediaElement.hasAttribute("controls")){this.mediaElement.removeAttribute("controls")
}this.mediaElement.setAttribute(this.inlineAttribute,"");this.mediaElement.classList.add(this.inlineClassName)
};h._createMediaElement=function(){this.mediaElement=document.createElement("video")
};h._createMediaEmitter=function(){this.mediaEmitter=new n(this.mediaElement)};
h._createMediaLoader=function(){var r,s;this.mediaSrc.basePath=this._forceTrailingSlash(this.mediaSrc.basePath);
if(this.mediaSrc.splitFileLoading){r=this.mediaSrc.basePath;var q={src:r,type:"splitfile"};
this.mediaLoader=d.createAssetGroup(q)}else{this.mediaSrc.fileFormat=this._checkFileFormat(this.mediaSrc.fileFormat);
r=this.mediaSrc.basePath+this.mediaSrc.filename+this.mediaSrc.fileFormat;this.srcForVideoEl=r
}};h._forceTrailingSlash=function(q){if(q&&q.lastIndexOf("/")!==q.length-1){q=q+"/"
}return q};h._checkFileFormat=function(q){if(q&&q.lastIndexOf(".")!==0){q="."+q
}return q};h.load=function(){this._setLoadStart(true);if(this.mediaSrc.splitFileLoading){var q=function(s){var r=window.URL.createObjectURL(s.latest.data);
if(this.mediaEmitter){this.mediaEmitter.once("loadeddata",this._onLoaded);this.mediaEmitter.once("canplaythrough",this._onReady)
}this.mediaElement.src=r;this.mediaElement.load();this.mediaLoader.destroy()}.bind(this);
this.mediaLoader.load().then(q)["catch"](this._setError.bind(this,true))}else{if(!this.cannotPlayInlineVideo()){this.mediaEmitter.once("loadeddata",this._onLoaded);
this.mediaEmitter.once("canplaythrough",this._onReady)}this.mediaElement.src=this.srcForVideoEl;
if(this.cannotPlayInlineVideo()){this._onLoaded()}else{this.mediaElement.load()
}}};h._onLoaded=function(){this._setLoaded(true)};h.cannotPlayInlineVideo=function(){if(this._cannotPlayInlineVideo!==null){return this._cannotPlayInlineVideo
}var q=a.os==="iOS"&&j();var r=a.os==="iOS"&&i()&&a.version<8;this._cannotPlayInlineVideo=q||r;
return this._cannotPlayInlineVideo};h._onReady=function(){this._setReady(true);
if(this.getAutoplay()){if(!this.getEnhanced()){this.enhance()}this.play()}};h.enhance=function(){this._setEnhanced(true);
m(function(){if(this.mediaElement.tagName==="VIDEO"){k.insertLastChild(this.mediaElement,this.el);
l.setStyle(this.mediaElement,{visibility:"hidden"});m(function(){if(this.mediaElement){this.setPlaybackRate(this.getPlaybackRate());
l.setStyle(this.mediaElement,{visibility:"visible"})}}.bind(this))}}.bind(this))
};h._destroy=function(){this._remove();if(this.mediaEmitter){this.mediaEmitter.off()
}if(this.mediaLoader){this.mediaLoader.destroy()}};h._remove=function(){k.remove(this.mediaElement)
};h._onEndedChange=function(q){o._onEndedChange.call(this,q);if(a.os==="iOS"&&j()&&q.value===true){this.mediaElement.webkitExitFullScreen()
}};h.play=function(){if(this.model.getPaused()===false){return}this.mediaElement.play()
};h.pause=function(){if(this.model.getPaused()===true){return}this.mediaElement.pause()
};h.reset=function(){if(this.model.getCurrentTime()===0){return}this.setCurrentTime(0);
this.pause()};h.setCurrentTime=function(q){if(!this.mediaElement.duration){return
}this.model.setCurrentTime(q);this.mediaElement.currentTime=q};h.setPlaybackRate=function(q){this.mediaElement.playbackRate=q
};h._setLooping=function(q){this.mediaElement.loop=q;this.model.setLooping(q)};
b.exports=p},{"./BaseView":330,"@marcom/ac-asset-loader":226,"@marcom/ac-dom-emitter":250,"@marcom/ac-dom-nodes":259,"@marcom/ac-dom-styles":42,"@marcom/ac-feature":163,"@marcom/ac-raf-emitter/draw":324,"@marcom/ac-useragent":427}],334:[function(d,f,c){var a=d("qs");
f.exports=function b(h,g){var i=a.stringify(h,{strictNullHandling:true});if(i&&g!==false){i="?"+i
}return i}},{qs:335}],335:[function(b,d,a){var g=b("./stringify");var c=b("./parse");
var f={};d.exports={stringify:g,parse:c}},{"./parse":336,"./stringify":337}],336:[function(b,c,a){var f=b("./utils");
var d={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1000,strictNullHandling:false,plainObjects:false,allowPrototypes:false};
d.parseValues=function(m,q){var k={};var j=m.split(q.delimiter,q.parameterLimit===Infinity?undefined:q.parameterLimit);
for(var l=0,o=j.length;l<o;++l){var g=j[l];var n=g.indexOf("]=")===-1?g.indexOf("="):g.indexOf("]=")+1;
if(n===-1){k[f.decode(g)]="";if(q.strictNullHandling){k[f.decode(g)]=null}}else{var p=f.decode(g.slice(0,n));
var h=f.decode(g.slice(n+1));if(!Object.prototype.hasOwnProperty.call(k,p)){k[p]=h
}else{k[p]=[].concat(k[p]).concat(h)}}}return k};d.parseObject=function(l,n,k){if(!l.length){return n
}var g=l.shift();var m;if(g==="[]"){m=[];m=m.concat(d.parseObject(l,n,k))}else{m=k.plainObjects?Object.create(null):{};
var j=g[0]==="["&&g[g.length-1]==="]"?g.slice(1,g.length-1):g;var i=parseInt(j,10);
var h=""+i;if(!isNaN(i)&&g!==j&&h===j&&i>=0&&k.parseArrays&&i<=k.arrayLimit){m=[];
m[i]=d.parseObject(l,n,k)}else{m[j]=d.parseObject(l,n,k)}}return m};d.parseKeys=function(j,n,g){if(!j){return
}if(g.allowDots){j=j.replace(/\.([^\.\[]+)/g,"[$1]")}var k=/^([^\[\]]*)/;var o=/(\[[^\[\]]*\])/g;
var m=k.exec(j);var l=[];if(m[1]){if(!g.plainObjects&&Object.prototype.hasOwnProperty(m[1])){if(!g.allowPrototypes){return
}}l.push(m[1])}var h=0;while((m=o.exec(j))!==null&&h<g.depth){++h;if(!g.plainObjects&&Object.prototype.hasOwnProperty(m[1].replace(/\[|\]/g,""))){if(!g.allowPrototypes){continue
}}l.push(m[1])}if(m){l.push("["+j.slice(m.index)+"]")}return d.parseObject(l,n,g)
};c.exports=function(k,p){p=p||{};p.delimiter=typeof p.delimiter==="string"||f.isRegExp(p.delimiter)?p.delimiter:d.delimiter;
p.depth=typeof p.depth==="number"?p.depth:d.depth;p.arrayLimit=typeof p.arrayLimit==="number"?p.arrayLimit:d.arrayLimit;
p.parseArrays=p.parseArrays!==false;p.allowDots=p.allowDots!==false;p.plainObjects=typeof p.plainObjects==="boolean"?p.plainObjects:d.plainObjects;
p.allowPrototypes=typeof p.allowPrototypes==="boolean"?p.allowPrototypes:d.allowPrototypes;
p.parameterLimit=typeof p.parameterLimit==="number"?p.parameterLimit:d.parameterLimit;
p.strictNullHandling=typeof p.strictNullHandling==="boolean"?p.strictNullHandling:d.strictNullHandling;
if(k===""||k===null||typeof k==="undefined"){return p.plainObjects?Object.create(null):{}
}var l=typeof k==="string"?d.parseValues(k,p):k;var h=p.plainObjects?Object.create(null):{};
var o=Object.keys(l);for(var j=0,m=o.length;j<m;++j){var n=o[j];var g=d.parseKeys(n,l[n],p);
h=f.merge(h,g,p)}return f.compact(h)}},{"./utils":338}],337:[function(b,c,a){var g=b("./utils");
var d={delimiter:"&",arrayPrefixGenerators:{brackets:function i(k,j){return k+"[]"
},indices:function h(k,j){return k+"["+j+"]"},repeat:function f(k,j){return k}},strictNullHandling:false};
d.stringify=function(n,p,j,l,k){if(typeof k==="function"){n=k(p,n)}else{if(g.isBuffer(n)){n=n.toString()
}else{if(n instanceof Date){n=n.toISOString()}else{if(n===null){if(l){return g.encode(p)
}n=""}}}}if(typeof n==="string"||typeof n==="number"||typeof n==="boolean"){return[g.encode(p)+"="+g.encode(n)]
}var s=[];if(typeof n==="undefined"){return s}var m=Array.isArray(k)?k:Object.keys(n);
for(var o=0,q=m.length;o<q;++o){var r=m[o];if(Array.isArray(n)){s=s.concat(d.stringify(n[r],j(p,r),j,l,k))
}else{s=s.concat(d.stringify(n[r],p+"["+r+"]",j,l,k))}}return s};c.exports=function(q,u){u=u||{};
var l=typeof u.delimiter==="undefined"?d.delimiter:u.delimiter;var n=typeof u.strictNullHandling==="boolean"?u.strictNullHandling:d.strictNullHandling;
var p;var m;if(typeof u.filter==="function"){m=u.filter;q=m("",q)}else{if(Array.isArray(u.filter)){p=m=u.filter
}}var t=[];if((typeof q==="undefined"?"undefined":_typeof(q))!=="object"||q===null){return""
}var j;if(u.arrayFormat in d.arrayPrefixGenerators){j=u.arrayFormat}else{if("indices" in u){j=u.indices?"indices":"repeat"
}else{j="indices"}}var k=d.arrayPrefixGenerators[j];if(!p){p=Object.keys(q)}for(var o=0,r=p.length;
o<r;++o){var s=p[o];t=t.concat(d.stringify(q[s],s,k,n,m))}return t.join(l)}},{"./utils":338}],338:[function(b,c,a){var f={};
f.hexTable=new Array(256);for(var d=0;d<256;++d){f.hexTable[d]="%"+((d<16?"0":"")+d.toString(16)).toUpperCase()
}a.arrayToObject=function(k,h){var l=h.plainObjects?Object.create(null):{};for(var j=0,g=k.length;
j<g;++j){if(typeof k[j]!=="undefined"){l[j]=k[j]}}return l};a.merge=function(o,n,h){if(!n){return o
}if((typeof n==="undefined"?"undefined":_typeof(n))!=="object"){if(Array.isArray(o)){o.push(n)
}else{if((typeof o==="undefined"?"undefined":_typeof(o))==="object"){o[n]=true}else{o=[o,n]
}}return o}if((typeof o==="undefined"?"undefined":_typeof(o))!=="object"){o=[o].concat(n);
return o}if(Array.isArray(o)&&!Array.isArray(n)){o=a.arrayToObject(o,h)}var l=Object.keys(n);
for(var g=0,j=l.length;g<j;++g){var i=l[g];var m=n[i];if(!Object.prototype.hasOwnProperty.call(o,i)){o[i]=m
}else{o[i]=a.merge(o[i],m,h)}}return o};a.decode=function(h){try{return decodeURIComponent(h.replace(/\+/g," "))
}catch(g){return h}};a.encode=function(k){if(k.length===0){return k}if(typeof k!=="string"){k=""+k
}var h="";for(var j=0,g=k.length;j<g;++j){var l=k.charCodeAt(j);if(l===45||l===46||l===95||l===126||l>=48&&l<=57||l>=65&&l<=90||l>=97&&l<=122){h+=k[j];
continue}if(l<128){h+=f.hexTable[l];continue}if(l<2048){h+=f.hexTable[192|l>>6]+f.hexTable[128|l&63];
continue}if(l<55296||l>=57344){h+=f.hexTable[224|l>>12]+f.hexTable[128|l>>6&63]+f.hexTable[128|l&63];
continue}++j;l=65536+((l&1023)<<10|k.charCodeAt(j)&1023);h+=f.hexTable[240|l>>18]+f.hexTable[128|l>>12&63]+f.hexTable[128|l>>6&63]+f.hexTable[128|l&63]
}return h};a.compact=function(o,j){if((typeof o==="undefined"?"undefined":_typeof(o))!=="object"||o===null){return o
}j=j||[];var n=j.indexOf(o);if(n!==-1){return j[n]}j.push(o);if(Array.isArray(o)){var g=[];
for(var l=0,h=o.length;l<h;++l){if(typeof o[l]!=="undefined"){g.push(o[l])}}return g
}var m=Object.keys(o);for(l=0,h=m.length;l<h;++l){var k=m[l];o[k]=a.compact(o[k],j)
}return o};a.isRegExp=function(g){return Object.prototype.toString.call(g)==="[object RegExp]"
};a.isBuffer=function(g){if(g===null||typeof g==="undefined"){return false}return !!(g.constructor&&g.constructor.isBuffer&&g.constructor.isBuffer(g))
}},{}],339:[function(b,c,a){c.exports={clone:b("./clone"),create:b("./create"),defaults:b("./defaults"),extend:b("./extend"),getPrototypeOf:b("./getPrototypeOf"),isDate:b("./isDate"),isEmpty:b("./isEmpty"),isRegExp:b("./isRegExp"),toQueryParameters:b("./toQueryParameters")}
},{"./clone":340,"./create":341,"./defaults":342,"./extend":343,"./getPrototypeOf":344,"./isDate":345,"./isEmpty":346,"./isRegExp":347,"./toQueryParameters":348}],340:[function(c,d,b){c("@marcom/ac-polyfills/Array/isArray");
var h=c("./extend");var a=Object.prototype.hasOwnProperty;var f=function f(i,j){var k;
for(k in j){if(a.call(j,k)){if(j[k]===null){i[k]=null}else{if(_typeof(j[k])==="object"){i[k]=Array.isArray(j[k])?[]:{};
f(i[k],j[k])}else{i[k]=j[k]}}}}return i};d.exports=function g(j,i){if(i){return f({},j)
}return h({},j)}},{"./extend":343,"@marcom/ac-polyfills/Array/isArray":365}],341:[function(b,d,a){var f=function f(){};
d.exports=function c(g){if(arguments.length>1){throw new Error("Second argument not supported")
}if(g===null||(typeof g==="undefined"?"undefined":_typeof(g))!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(g)}else{f.prototype=g;
return new f()}}},{}],342:[function(b,c,a){var f=b("./extend");c.exports=function d(h,g){if((typeof h==="undefined"?"undefined":_typeof(h))!=="object"){throw new TypeError("defaults: must provide a defaults object")
}g=g||{};if((typeof g==="undefined"?"undefined":_typeof(g))!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return f({},h,g)}},{"./extend":343}],343:[function(c,d,b){c("@marcom/ac-polyfills/Array/prototype.forEach");
var a=Object.prototype.hasOwnProperty;d.exports=function f(){var h;var g;if(arguments.length<2){h=[{},arguments[0]]
}else{h=[].slice.call(arguments)}g=h.shift();h.forEach(function(j){if(j!=null){for(var i in j){if(a.call(j,i)){g[i]=j[i]
}}}});return g}},{"@marcom/ac-polyfills/Array/prototype.forEach":369}],344:[function(c,d,b){var a=Object.prototype.hasOwnProperty;
d.exports=function f(i){if(Object.getPrototypeOf){return Object.getPrototypeOf(i)
}else{if((typeof i==="undefined"?"undefined":_typeof(i))!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(_typeof(this.__proto__)==="object"){return i.__proto__}else{var g=i.constructor;
var h;if(a.call(i,"constructor")){h=g;if(!delete i.constructor){return null}g=i.constructor;
i.constructor=h}return g?g.prototype:null}}}}},{}],345:[function(b,d,a){d.exports=function c(f){return Object.prototype.toString.call(f)==="[object Date]"
}},{}],346:[function(c,d,b){var a=Object.prototype.hasOwnProperty;d.exports=function f(g){var h;
if((typeof g==="undefined"?"undefined":_typeof(g))!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(h in g){if(a.call(g,h)){return false}}return true}},{}],347:[function(c,d,b){d.exports=function a(f){return window.RegExp?f instanceof RegExp:false
}},{}],348:[function(c,f,b){var a=c("@marcom/ac-url/joinSearchParams");f.exports=function d(g){if((typeof g==="undefined"?"undefined":_typeof(g))!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return a(g,false)}},{"@marcom/ac-url/joinSearchParams":334}],349:[function(b,c,a){(function(h){if(!h.console){h.console={}
}var d=h.console;var k,j;var i=function i(){};var g=["memory"];var f=("assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn").split(",");
while(k=g.pop()){if(!d[k]){d[k]={}}}while(j=f.pop()){if(typeof d[j]!=="function"){d[j]=i
}}})(typeof window==="undefined"?this:window)},{}],350:[function(b,c,a){var d=b("./promise/promise").Promise;
var f=b("./promise/polyfill").polyfill;a.Promise=d;a.polyfill=f},{"./promise/polyfill":354,"./promise/promise":355}],351:[function(c,d,b){var a=c("./utils").isArray;
var g=c("./utils").isFunction;function f(h){var i=this;if(!a(h)){throw new TypeError("You must pass an array to all.")
}return new i(function(o,n){var l=[],m=h.length,q;if(m===0){o([])}function p(r){return function(s){j(r,s)
}}function j(r,s){l[r]=s;if(--m===0){o(l)}}for(var k=0;k<h.length;k++){q=h[k];if(q&&g(q.then)){q.then(p(k),n)
}else{j(k,q)}}})}b.all=f},{"./utils":359}],352:[function(b,c,a){(function(f,g){var o=typeof window!=="undefined"?window:{};
var l=o.MutationObserver||o.WebKitMutationObserver;var n=typeof g!=="undefined"?g:this===undefined?window:this;
function m(){return function(){f.nextTick(p)}}function i(){var s=0;var q=new l(p);
var r=document.createTextNode("");q.observe(r,{characterData:true});return function(){r.data=s=++s%2
}}function k(){return function(){n.setTimeout(p,1)}}var j=[];function p(){for(var s=0;
s<j.length;s++){var r=j[s];var t=r[0],q=r[1];t(q)}j=[]}var h;if(typeof f!=="undefined"&&{}.toString.call(f)==="[object process]"){h=m()
}else{if(l){h=i()}else{h=k()}}function d(s,q){var r=j.push([s,q]);if(r===1){h()
}}a.asap=d}).call(this,b("_process"),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{_process:464}],353:[function(d,f,a){var c={instrument:false};function b(g,h){if(arguments.length===2){c[g]=h
}else{return c[g]}}a.config=c;a.configure=b},{}],354:[function(b,c,a){(function(f){var d=b("./promise").Promise;
var h=b("./utils").isFunction;function g(){var j;if(typeof f!=="undefined"){j=f
}else{if(typeof window!=="undefined"&&window.document){j=window}else{j=self}}var i="Promise" in j&&"resolve" in j.Promise&&"reject" in j.Promise&&"all" in j.Promise&&"race" in j.Promise&&function(){var k;
new j.Promise(function(l){k=l});return h(k)}();if(!i){j.Promise=d}}a.polyfill=g
}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})
},{"./promise":355,"./utils":359}],355:[function(q,d,F){var D=q("./config").config;
var C=q("./config").configure;var s=q("./utils").objectOrFunction;var a=q("./utils").isFunction;
var f=q("./utils").now;var g=q("./all").all;var j=q("./race").race;var l=q("./resolve").resolve;
var c=q("./reject").reject;var u=q("./asap").asap;var r=0;D.async=u;function h(G){if(!a(G)){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
}if(!(this instanceof h)){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
}this._subscribers=[];B(G,this)}function B(K,J){function G(L){v(J,L)}function I(L){k(J,L)
}try{K(G,I)}catch(H){I(H)}}function y(N,P,M,I){var G=a(M),L,K,O,H;if(G){try{L=M(I);
O=true}catch(J){H=true;K=J}}else{L=I;O=true}if(t(P,L)){return}else{if(G&&O){v(P,L)
}else{if(H){k(P,K)}else{if(N===b){v(P,L)}else{if(N===E){k(P,L)}}}}}}var m=void 0;
var p=0;var b=1;var E=2;function o(G,L,K,J){var I=G._subscribers;var H=I.length;
I[H]=L;I[H+b]=K;I[H+E]=J}function w(K,G){var M,L,J=K._subscribers,I=K._detail;for(var H=0;
H<J.length;H+=3){M=J[H];L=J[H+G];y(G,M,L,I)}K._subscribers=null}h.prototype={constructor:h,_state:undefined,_detail:undefined,_subscribers:undefined,then:function A(L,J){var K=this;
var H=new this.constructor(function(){});if(this._state){var I=arguments;D.async(function G(){y(K._state,H,I[K._state-1],K._detail)
})}else{o(this,H,L,J)}return H},"catch":function x(G){return this.then(null,G)}};
h.all=g;h.race=j;h.resolve=l;h.reject=c;function t(K,I){var J=null,G;try{if(K===I){throw new TypeError("A promises callback cannot return that same promise.")
}if(s(I)){J=I.then;if(a(J)){J.call(I,function(L){if(G){return true}G=true;if(I!==L){v(K,L)
}else{i(K,L)}},function(L){if(G){return true}G=true;k(K,L)});return true}}}catch(H){if(G){return true
}k(K,H);return true}return false}function v(H,G){if(H===G){i(H,G)}else{if(!t(H,G)){i(H,G)
}}}function i(H,G){if(H._state!==m){return}H._state=p;H._detail=G;D.async(z,H)}function k(H,G){if(H._state!==m){return
}H._state=p;H._detail=G;D.async(n,H)}function z(G){w(G,G._state=b)}function n(G){w(G,G._state=E)
}F.Promise=h},{"./all":351,"./asap":352,"./config":353,"./race":356,"./reject":357,"./resolve":358,"./utils":359}],356:[function(c,f,b){var a=c("./utils").isArray;
function d(g){var h=this;if(!a(g)){throw new TypeError("You must pass an array to race.")
}return new h(function(m,l){var k=[],n;for(var j=0;j<g.length;j++){n=g[j];if(n&&typeof n.then==="function"){n.then(m,l)
}else{m(n)}}})}b.race=d},{"./utils":359}],357:[function(b,c,a){function d(g){var f=this;
return new f(function(i,h){h(g)})}a.reject=d},{}],358:[function(b,c,a){function d(g){if(g&&(typeof g==="undefined"?"undefined":_typeof(g))==="object"&&g.constructor===this){return g
}var f=this;return new f(function(h){h(g)})}a.resolve=d},{}],359:[function(d,f,b){function g(i){return h(i)||(typeof i==="undefined"?"undefined":_typeof(i))==="object"&&i!==null
}function h(i){return typeof i==="function"}function a(i){return Object.prototype.toString.call(i)==="[object Array]"
}var c=Date.now||function(){return new Date().getTime()};b.objectOrFunction=g;b.isFunction=h;
b.isArray=a;b.now=c},{}],360:[function(b,c,a){(function(o,q){var k="3.7.3-pre";
var h=o.html5||{};var l=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;
var g=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;
var v;var m="_html5shiv";var d=0;var s={};var i;(function(){try{var y=q.createElement("a");
y.innerHTML="<xyz></xyz>";v="hidden" in y;i=y.childNodes.length==1||function(){q.createElement("a");
var A=q.createDocumentFragment();return typeof A.cloneNode=="undefined"||typeof A.createDocumentFragment=="undefined"||typeof A.createElement=="undefined"
}()}catch(z){v=true;i=true}})();function j(y,A){var B=y.createElement("p"),z=y.getElementsByTagName("head")[0]||y.documentElement;
B.innerHTML="x<style>"+A+"</style>";return z.insertBefore(B.lastChild,z.firstChild)
}function p(){var y=n.elements;return typeof y=="string"?y.split(" "):y}function t(y,z){var A=n.elements;
if(typeof A!="string"){A=A.join(" ")}if(typeof y!="string"){y=y.join(" ")}n.elements=A+" "+y;
f(z)}function u(y){var z=s[y[m]];if(!z){z={};d++;y[m]=d;s[d]=z}return z}function r(B,y,A){if(!y){y=q
}if(i){return y.createElement(B)}if(!A){A=u(y)}var z;if(A.cache[B]){z=A.cache[B].cloneNode()
}else{if(g.test(B)){z=(A.cache[B]=A.createElem(B)).cloneNode()}else{z=A.createElem(B)
}}return z.canHaveChildren&&!l.test(B)&&!z.tagUrn?A.frag.appendChild(z):z}function w(A,C){if(!A){A=q
}if(i){return A.createDocumentFragment()}C=C||u(A);var D=C.frag.cloneNode(),B=0,z=p(),y=z.length;
for(;B<y;B++){D.createElement(z[B])}return D}function x(y,z){if(!z.cache){z.cache={};
z.createElem=y.createElement;z.createFrag=y.createDocumentFragment;z.frag=z.createFrag()
}y.createElement=function(A){if(!n.shivMethods){return z.createElem(A)}return r(A,y,z)
};y.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+p().join().replace(/[\w\-:]+/g,function(A){z.createElem(A);
z.frag.createElement(A);return'c("'+A+'")'})+");return n}")(n,z.frag)}function f(y){if(!y){y=q
}var z=u(y);if(n.shivCSS&&!v&&!z.hasCSS){z.hasCSS=!!j(y,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")
}if(!i){x(y,z)}return y}var n={elements:h.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:k,shivCSS:h.shivCSS!==false,supportsUnknownElements:i,shivMethods:h.shivMethods!==false,type:"default",shivDocument:f,createElement:r,createDocumentFragment:w,addElements:t};
o.html5=n;f(q);if((typeof c==="undefined"?"undefined":_typeof(c))=="object"&&c.exports){c.exports=n
}})(typeof window!=="undefined"?window:this,document)},{}],361:[function(b,c,a){
/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){if(window.matchMedia&&window.matchMedia("all").addListener){return false
}var i=window.matchMedia,d=i("only all").matches,h=false,j=0,g=[],f=function f(k){clearTimeout(j);
j=setTimeout(function(){for(var p=0,m=g.length;p<m;p++){var l=g[p].mql,q=g[p].listeners||[],r=i(l.media).matches;
if(r!==l.matches){l.matches=r;for(var n=0,o=q.length;n<o;n++){q[n].call(window,l)
}}}},30)};window.matchMedia=function(n){var k=i(n),m=[],l=0;k.addListener=function(o){if(!d){return
}if(!h){h=true;window.addEventListener("resize",f,true)}if(l===0){l=g.push({mql:k,listeners:m})
}m.push(o)};k.removeListener=function(q){for(var p=0,o=m.length;p<o;p++){if(m[p]===q){m.splice(p,1)
}}};return k}})()},{}],362:[function(b,c,a){
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){var g=window.styleMedia||window.media;
if(!g){var h=document.createElement("style"),d=document.getElementsByTagName("script")[0],i=null;
h.type="text/css";h.id="matchmediajs-test";d.parentNode.insertBefore(h,d);i="getComputedStyle" in window&&window.getComputedStyle(h,null)||h.currentStyle;
g={matchMedium:function f(j){var k="@media "+j+"{ #matchmediajs-test { width: 1px; } }";
if(h.styleSheet){h.styleSheet.cssText=k}else{h.textContent=k}return i.width==="1px"
}}}return function(j){return{matches:g.matchMedium(j||"all"),media:j||"all"}}}())
},{}],363:[function(b,c,a){b("./Array/from");b("./Array/isArray");b("./Array/prototype.every");
b("./Array/prototype.filter");b("./Array/prototype.find");b("./Array/prototype.forEach");
b("./Array/prototype.indexOf");b("./Array/prototype.lastIndexOf");b("./Array/prototype.map");
b("./Array/prototype.reduce");b("./Array/prototype.reduceRight");b("./Array/prototype.slice");
b("./Array/prototype.some")},{"./Array/from":364,"./Array/isArray":365,"./Array/prototype.every":366,"./Array/prototype.filter":367,"./Array/prototype.find":368,"./Array/prototype.forEach":369,"./Array/prototype.indexOf":370,"./Array/prototype.lastIndexOf":371,"./Array/prototype.map":372,"./Array/prototype.reduce":373,"./Array/prototype.reduceRight":374,"./Array/prototype.slice":375,"./Array/prototype.some":376}],364:[function(b,c,a){if(!Array.from){Array.from=function(){var h=Object.prototype.toString;
var i=function i(k){return typeof k==="function"||h.call(k)==="[object Function]"
};var g=function g(l){var k=Number(l);if(isNaN(k)){return 0}if(k===0||!isFinite(k)){return k
}return(k>0?1:-1)*Math.floor(Math.abs(k))};var f=Math.pow(2,53)-1;var d=function d(l){var k=g(l);
return Math.min(Math.max(k,0),f)};return function j(t){var l=this;var s=Object(t);
if(t==null){throw new TypeError("Array.from requires an array-like object - not null or undefined")
}var q=arguments.length>1?arguments[1]:void undefined;var n;if(typeof q!=="undefined"){if(!i(q)){throw new TypeError("Array.from: when provided, the second argument must be a function")
}if(arguments.length>2){n=arguments[2]}}var r=d(s.length);var m=i(l)?Object(new l(r)):new Array(r);
var o=0;var p;while(o<r){p=s[o];if(q){m[o]=typeof n==="undefined"?q(p,o):q.call(n,p,o)
}else{m[o]=p}o+=1}m.length=r;return m}}()}},{}],365:[function(b,c,a){if(!Array.isArray){Array.isArray=function(d){return Object.prototype.toString.call(d)==="[object Array]"
}}},{}],366:[function(b,c,a){if(!Array.prototype.every){Array.prototype.every=function d(k,j){var h=Object(this);
var f=h.length>>>0;var g;if(typeof k!=="function"){throw new TypeError(k+" is not a function")
}for(g=0;g<f;g+=1){if(g in h&&!k.call(j,h[g],g,h)){return false}}return true}}},{}],367:[function(b,c,a){if(!Array.prototype.filter){Array.prototype.filter=function d(l,k){var j=Object(this);
var f=j.length>>>0;var h;var g=[];if(typeof l!=="function"){throw new TypeError(l+" is not a function")
}for(h=0;h<f;h+=1){if(h in j&&l.call(k,j[h],h,j)){g.push(j[h])}}return g}}},{}],368:[function(b,c,a){if(!Array.prototype.find){Object.defineProperty(Array.prototype,"find",{value:function d(g){if(this==null){throw new TypeError('"this" is null or not defined')
}var l=Object(this);var f=l.length>>>0;if(typeof g!=="function"){throw new TypeError("predicate must be a function")
}var h=arguments[1];var i=0;while(i<f){var j=l[i];if(g.call(h,j,i,l)){return j}i++
}return undefined}})}},{}],369:[function(b,c,a){if(!Array.prototype.forEach){Array.prototype.forEach=function d(l,k){var j=Object(this);
var f;var g;if(typeof l!=="function"){throw new TypeError("No function object passed to forEach.")
}var h=this.length;for(f=0;f<h;f+=1){g=j[f];l.call(k,g,f,j)}}}},{}],370:[function(b,c,a){if(!Array.prototype.indexOf){Array.prototype.indexOf=function d(g,h){var i=h||0;
var f=0;if(i<0){i=this.length+h-1;if(i<0){throw"Wrapped past beginning of array while looking up a negative start index."
}}for(f=0;f<this.length;f++){if(this[f]===g){return f}}return -1}}},{}],371:[function(c,d,b){if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function a(k,j){var g=Object(this);
var f=g.length>>>0;var h;j=parseInt(j,10);if(f<=0){return -1}h=typeof j==="number"?Math.min(f-1,j):f-1;
h=h>=0?h:f-Math.abs(h);for(;h>=0;h-=1){if(h in g&&k===g[h]){return h}}return -1
}}},{}],372:[function(b,c,a){if(!Array.prototype.map){Array.prototype.map=function d(l,k){var h=Object(this);
var g=h.length>>>0;var j;var f=new Array(g);if(typeof l!=="function"){throw new TypeError(l+" is not a function")
}for(j=0;j<g;j+=1){if(j in h){f[j]=l.call(k,h[j],j,h)}}return f}}},{}],373:[function(b,c,a){if(!Array.prototype.reduce){Array.prototype.reduce=function d(l,h){var j=Object(this);
var g=j.length>>>0;var k=0;var f;if(typeof l!=="function"){throw new TypeError(l+" is not a function")
}if(typeof h==="undefined"){if(!g){throw new TypeError("Reduce of empty array with no initial value")
}f=j[0];k=1}else{f=h}while(k<g){if(k in j){f=l.call(undefined,f,j[k],k,j);k+=1}}return f
}}},{}],374:[function(c,d,b){if(!Array.prototype.reduceRight){Array.prototype.reduceRight=function a(l,h){var j=Object(this);
var g=j.length>>>0;var k=g-1;var f;if(typeof l!=="function"){throw new TypeError(l+" is not a function")
}if(h===undefined){if(!g){throw new TypeError("Reduce of empty array with no initial value")
}f=j[g-1];k=g-2}else{f=h}while(k>=0){if(k in j){f=l.call(undefined,f,j[k],k,j);
k-=1}}return f}}},{}],375:[function(b,c,a){(function(){var d=Array.prototype.slice;
try{d.call(document.documentElement)}catch(f){Array.prototype.slice=function(n,j){j=typeof j!=="undefined"?j:this.length;
if(Object.prototype.toString.call(this)==="[object Array]"){return d.call(this,n,j)
}var l,h=[],k,g=this.length;var o=n||0;o=o>=0?o:g+o;var m=j?j:g;if(j<0){m=g+j}k=m-o;
if(k>0){h=new Array(k);if(this.charAt){for(l=0;l<k;l++){h[l]=this.charAt(o+l)}}else{for(l=0;
l<k;l++){h[l]=this[o+l]}}}return h}}})()},{}],376:[function(b,c,a){if(!Array.prototype.some){Array.prototype.some=function d(k,j){var g=Object(this);
var f=g.length>>>0;var h;if(typeof k!=="function"){throw new TypeError(k+" is not a function")
}for(h=0;h<f;h+=1){if(h in g&&k.call(j,g[h],h,g)===true){return true}}return false
}}},{}],377:[function(b,c,a){if(document.createEvent){try{new window.CustomEvent("click")
}catch(d){window.CustomEvent=function(){function f(h,i){i=i||{bubbles:false,cancelable:false,detail:undefined};
var g=document.createEvent("CustomEvent");g.initCustomEvent(h,i.bubbles,i.cancelable,i.detail);
return g}f.prototype=window.Event.prototype;return f}()}}},{}],378:[function(b,c,a){b("./Date/now");
b("./Date/prototype.toISOString");b("./Date/prototype.toJSON")},{"./Date/now":379,"./Date/prototype.toISOString":380,"./Date/prototype.toJSON":381}],379:[function(c,d,a){if(!Date.now){Date.now=function b(){return new Date().getTime()
}}},{}],380:[function(b,d,a){if(!Date.prototype.toISOString){Date.prototype.toISOString=function c(){if(!isFinite(this)){throw new RangeError("Date.prototype.toISOString called on non-finite value.")
}var g={year:this.getUTCFullYear(),month:this.getUTCMonth()+1,day:this.getUTCDate(),hours:this.getUTCHours(),minutes:this.getUTCMinutes(),seconds:this.getUTCSeconds(),mseconds:(this.getUTCMilliseconds()/1000).toFixed(3).substr(2,3)};
var h;var f;for(h in g){if(g.hasOwnProperty(h)&&h!=="year"&&h!=="mseconds"){g[h]=String(g[h]).length===1?"0"+String(g[h]):String(g[h])
}}if(g.year<0||g.year>9999){f=g.year<0?"-":"+";g.year=f+String(Math.abs(g.year/1000000)).substr(2,6)
}return g.year+"-"+g.month+"-"+g.day+"T"+g.hours+":"+g.minutes+":"+g.seconds+"."+g.mseconds+"Z"
}}},{}],381:[function(b,c,a){if(!Date.prototype.toJSON){Date.prototype.toJSON=function(h){var i=Object(this);
var d;var g=function g(j){var l=typeof j==="undefined"?"undefined":_typeof(j);var k=[null,"undefined","boolean","string","number"].some(function(m){return m===l
});if(k){return true}return false};var f=function f(j){var k;if(g(j)){return j}k=typeof j.valueOf==="function"?j.valueOf():typeof j.toString==="function"?j.toString():null;
if(k&&g(k)){return k}throw new TypeError(j+" cannot be converted to a primitive")
};d=f(i);if(typeof d==="number"&&!isFinite(d)){return null}if(typeof i.toISOString!=="function"){throw new TypeError("toISOString is not callable")
}return i.toISOString.call(i)}}},{}],382:[function(b,c,a){b("./Element/prototype.classList");
b("./Element/prototype.matches");b("./Element/prototype.remove")},{"./Element/prototype.classList":383,"./Element/prototype.matches":384,"./Element/prototype.remove":385}],383:[function(b,c,a){
/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if("document" in self){if(!("classList" in document.createElement("_"))){(function(n){if(!("Element" in n)){return
}var d="classList",j="prototype",q=n.Element[j],f=Object,o=String[j].trim||function(){return this.replace(/^\s+|\s+$/g,"")
},g=Array[j].indexOf||function(u){var t=0,s=this.length;for(;t<s;t++){if(t in this&&this[t]===u){return t
}}return -1},r=function r(s,t){this.name=s;this.code=DOMException[s];this.message=t
},k=function k(t,s){if(s===""){throw new r("SYNTAX_ERR","An invalid or illegal string was specified")
}if(/\s/.test(s)){throw new r("INVALID_CHARACTER_ERR","String contains an invalid character")
}return g.call(t,s)},h=function h(w){var v=o.call(w.getAttribute("class")||""),u=v?v.split(/\s+/):[],t=0,s=u.length;
for(;t<s;t++){this.push(u[t])}this._updateClassName=function(){w.setAttribute("class",this.toString())
}},i=h[j]=[],m=function m(){return new h(this)};r[j]=Error[j];i.item=function(s){return this[s]||null
};i.contains=function(s){s+="";return k(this,s)!==-1};i.add=function(){var w=arguments,v=0,t=w.length,u,s=false;
do{u=w[v]+"";if(k(this,u)===-1){this.push(u);s=true}}while(++v<t);if(s){this._updateClassName()
}};i.remove=function(){var x=arguments,w=0,t=x.length,v,s=false,u;do{v=x[w]+"";
u=k(this,v);while(u!==-1){this.splice(u,1);s=true;u=k(this,v)}}while(++w<t);if(s){this._updateClassName()
}};i.toggle=function(t,u){t+="";var s=this.contains(t),v=s?u!==true&&"remove":u!==false&&"add";
if(v){this[v](t)}if(u===true||u===false){return u}else{return !s}};i.toString=function(){return this.join(" ")
};if(f.defineProperty){var p={get:m,enumerable:true,configurable:true};try{f.defineProperty(q,d,p)
}catch(l){if(l.number===-2146823252){p.enumerable=false;f.defineProperty(q,d,p)
}}}else{if(f[j].__defineGetter__){q.__defineGetter__(d,m)}}})(self)}else{(function(){var f=document.createElement("_");
f.classList.add("c1","c2");if(!f.classList.contains("c2")){var g=function g(i){var h=DOMTokenList.prototype[i];
DOMTokenList.prototype[i]=function(l){var k,j=arguments.length;for(k=0;k<j;k++){l=arguments[k];
h.call(this,l)}}};g("add");g("remove")}f.classList.toggle("c3",false);if(f.classList.contains("c3")){var d=DOMTokenList.prototype.toggle;
DOMTokenList.prototype.toggle=function(h,i){if(1 in arguments&&!this.contains(h)===!i){return i
}else{return d.call(this,h)}}}f=null})()}}},{}],384:[function(b,c,a){if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(f){var g=(this.document||this.ownerDocument).querySelectorAll(f),d=g.length;
while(--d>=0&&g.item(d)!==this){}return d>-1}}},{}],385:[function(b,c,a){c.exports=function(){if(!("remove" in Element.prototype)){Element.prototype.remove=function(){if(this.parentNode){this.parentNode.removeChild(this)
}}}}},{}],386:[function(b,c,a){b("./Function/prototype.bind")},{"./Function/prototype.bind":387}],387:[function(b,c,a){if(!Function.prototype.bind){Function.prototype.bind=function(d){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var i=Array.prototype.slice.call(arguments,1);var h=this;var f=function f(){};
var g=function g(){return h.apply(this instanceof f&&d?this:d,i.concat(Array.prototype.slice.call(arguments)))
};f.prototype=this.prototype;g.prototype=new f();return g}}},{}],388:[function(require,module,exports){if((typeof JSON==="undefined"?"undefined":_typeof(JSON))!=="object"){JSON={}
}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null
};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()
}}var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];
if(value&&(typeof value==="undefined"?"undefined":_typeof(value))==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)
}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value==="undefined"?"undefined":_typeof(value)){case"string":return quote(value);
case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);
case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;
for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";
gap=mind;return v}if(rep&&(typeof rep==="undefined"?"undefined":_typeof(rep))==="object"){length=rep.length;
for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)
}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);
if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";
gap=mind;return v}}if(typeof JSON.stringify!=="function"){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;
i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;
if(replacer&&typeof replacer!=="function"&&((typeof replacer==="undefined"?"undefined":_typeof(replacer))!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")
}return str("",{"":value})}}if(typeof JSON.parse!=="function"){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];
if(value&&(typeof value==="undefined"?"undefined":_typeof(value))==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);
if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)
}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)
})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");
return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")
}}})()},{}],389:[function(b,c,a){b("./Object/assign");b("./Object/create");b("./Object/is");
b("./Object/keys")},{"./Object/assign":390,"./Object/create":391,"./Object/is":392,"./Object/keys":393}],390:[function(b,c,a){if(typeof Object.assign!="function"){Object.assign=function(h){if(h==null){throw new TypeError("Cannot convert undefined or null to object")
}h=Object(h);for(var d=1;d<arguments.length;d++){var g=arguments[d];if(g!=null){for(var f in g){if(Object.prototype.hasOwnProperty.call(g,f)){h[f]=g[f]
}}}}return h}}},{}],391:[function(b,c,a){if(!Object.create){var d=function d(){};
Object.create=function(f){if(arguments.length>1){throw new Error("Second argument not supported")
}if(f===null||(typeof f==="undefined"?"undefined":_typeof(f))!=="object"){throw new TypeError("Object prototype may only be an Object.")
}d.prototype=f;return new d()}}},{}],392:[function(b,c,a){if(!Object.is){Object.is=function(f,d){if(f===0&&d===0){return 1/f===1/d
}if(f!==f){return d!==d}return f===d}}},{}],393:[function(b,c,a){if(!Object.keys){Object.keys=function d(g){var f=[];
var h;if(!g||typeof g.hasOwnProperty!=="function"){throw"Object.keys called on non-object."
}for(h in g){if(g.hasOwnProperty(h)){f.push(h)}}return f}}},{}],394:[function(b,c,a){c.exports=b("es6-promise").polyfill()
},{"es6-promise":350}],395:[function(b,c,a){b("./String/prototype.trim")},{"./String/prototype.trim":396}],396:[function(c,d,b){if(!String.prototype.trim){String.prototype.trim=function a(){return this.replace(/^\s+|\s+$/g,"")
}}},{}],397:[function(b,c,a){window.XMLHttpRequest=window.XMLHttpRequest||function(){var f;
try{f=new ActiveXObject("Msxml2.XMLHTTP")}catch(d){try{f=new ActiveXObject("Microsoft.XMLHTTP")
}catch(d){f=false}}return f}},{}],398:[function(b,c,a){b("./Array");b("./console.log");
b("./CustomEvent");b("./Date");b("./Element");b("./Function");b("./getComputedStyle");
b("./html5shiv");b("./JSON");b("./matchMedia");b("./Object");b("./performance");
b("./Promise");b("./requestAnimationFrame");b("./String");b("./XMLHttpRequest")
},{"./Array":363,"./CustomEvent":377,"./Date":378,"./Element":382,"./Function":386,"./JSON":388,"./Object":389,"./Promise":394,"./String":395,"./XMLHttpRequest":397,"./console.log":399,"./getComputedStyle":400,"./html5shiv":401,"./matchMedia":402,"./performance":403,"./requestAnimationFrame":405}],399:[function(b,c,a){b("console-polyfill")
},{"console-polyfill":349}],400:[function(i,d,j){if(!window.getComputedStyle){var h=function h(p,s,r){p.document;
var q=p.currentStyle[s].match(/(-?[\d\.]+)(%|cm|em|in|mm|pc|pt|)/)||[0,0,""],o=q[1],t=q[2],n;
r=!r?r:/%|em/.test(t)&&p.parentElement?h(p.parentElement,"fontSize",null):16;n=s=="fontSize"?r:/width/i.test(s)?p.clientWidth:p.clientHeight;
return t=="%"?o/100*n:t=="cm"?o*0.3937*96:t=="em"?o*r:t=="in"?o*96:t=="mm"?o*0.3937*96/10:t=="pc"?o*12*96/72:t=="pt"?o*96/72:o
};var c=function c(q,u){var v=u=="border"?"Width":"",p=u+"Top"+v,s=u+"Right"+v,n=u+"Bottom"+v,o=u+"Left"+v;
q[u]=(q[p]==q[s]&&q[p]==q[n]&&q[p]==q[o]?[q[p]]:q[p]==q[n]&&q[o]==q[s]?[q[p],q[s]]:q[o]==q[s]?[q[p],q[s],q[n]]:[q[p],q[s],q[n],q[o]]).join(" ")
};var k=function k(q){var r=this,p=q.currentStyle,t=h(q,"fontSize"),n=function n(u){return"-"+u.toLowerCase()
},s;for(s in p){Array.prototype.push.call(r,s=="styleFloat"?"float":s.replace(/[A-Z]/,n));
if(s=="width"){r[s]=q.offsetWidth+"px"}else{if(s=="height"){r[s]=q.offsetHeight+"px"
}else{if(s=="styleFloat"){r["float"]=p[s];r.cssFloat=p[s]}else{if(/margin.|padding.|border.+W/.test(s)&&r[s]!="auto"){r[s]=Math.round(h(q,s,t))+"px"
}else{if(/^outline/.test(s)){try{r[s]=p[s]}catch(o){r.outlineColor=p.color;r.outlineStyle=r.outlineStyle||"none";
r.outlineWidth=r.outlineWidth||"0px";r.outline=[r.outlineColor,r.outlineWidth,r.outlineStyle].join(" ")
}}else{r[s]=p[s]}}}}}}c(r,"margin");c(r,"padding");c(r,"border");r.fontSize=Math.round(t)+"px"
};k.prototype={constructor:k,getPropertyPriority:function f(){throw new Error("NotSupportedError: DOM Exception 9")
},getPropertyValue:function b(n){return this[n.replace(/-\w/g,function(o){return o[1].toUpperCase()
})]},item:function m(n){return this[n]},removeProperty:function a(){throw new Error("NoModificationAllowedError: DOM Exception 7")
},setProperty:function g(){throw new Error("NoModificationAllowedError: DOM Exception 7")
},getPropertyCSSValue:function l(){throw new Error("NotSupportedError: DOM Exception 9")
}};window.getComputedStyle=function(n){return new k(n)}}},{}],401:[function(b,c,a){b("html5shiv/src/html5shiv")
},{"html5shiv/src/html5shiv":360}],402:[function(b,c,a){b("matchmedia-polyfill");
b("matchmedia-polyfill/matchMedia.addListener")},{"matchmedia-polyfill":362,"matchmedia-polyfill/matchMedia.addListener":361}],403:[function(b,c,a){b("./performance/now")
},{"./performance/now":404}],404:[function(b,c,a){
/*! MIT License
   *
   * performance.now polyfill
   * copyright Paul Irish 2015
   *
   */
b("../Date/now");
(function(){if("performance" in window==false){window.performance={}}if("now" in window.performance==false){var f=Date.now();
if(performance.timing&&performance.timing.navigationStart){f=performance.timing.navigationStart
}window.performance.now=function d(){return Date.now()-f}}})()},{"../Date/now":379}],405:[function(b,c,a){(function(){var f=0;
var g=["ms","moz","webkit","o"];for(var d=0;d<g.length&&!window.requestAnimationFrame;
++d){window.requestAnimationFrame=window[g[d]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[g[d]+"CancelAnimationFrame"]||window[g[d]+"CancelRequestAnimationFrame"]
}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(l,i){var h=Date.now();
var j=Math.max(0,16-(h-f));var k=window.setTimeout(function(){l(h+j)},j);f=h+j;
return k}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(h){clearTimeout(h)
}}})()},{}],406:[function(b,c,a){arguments[4][214][0].apply(a,arguments)},{"./ac-queue/LiveQueue":407,"./ac-queue/Queue":408,"./ac-queue/QueueItem":409,dup:214}],407:[function(b,c,a){arguments[4][215][0].apply(a,arguments)
},{"./Queue":408,"./QueueItem":409,"@marcom/ac-polyfills/Function/prototype.bind":387,"@marcom/ac-polyfills/Promise":394,"@marcom/ac-polyfills/requestAnimationFrame":405,dup:215}],408:[function(b,c,a){arguments[4][216][0].apply(a,arguments)
},{"./QueueItem":409,dup:216}],409:[function(b,c,a){arguments[4][217][0].apply(a,arguments)
},{dup:217}],410:[function(c,b,g){var f=c("@marcom/ac-object/defaults");var d=c("@marcom/ac-jetpack-lib/core/BaseComponent");
var k=c("./ProgressiveImageLoader");var i={};a.Events={ImageLoad:"progressive-image-load",Complete:"progressive-image-complete"};
function a(q,s,l,p,m,r,o){this.name=l+"_"+o;d.apply(this,arguments);if(this.section.getComponentOfType(this.componentName)){throw new Error("Each Jetpack Section can only contain one ProgressiveImageComponent. Mark progressive images with the [data-progressive-image] attribute, or use [data-progressive-image-group] to distinctly load multiple groups of images in a section")
}try{this._loadOptions=JSON.parse(this.element.getAttribute("data-progressive-image-options"))
}catch(n){this._loadOptions=null}this.imageLoader=new k({container:this.element,includeContainer:true})
}var h=a.prototype=Object.create(d.prototype);var j=d.prototype;a.IS_SUPPORTED=function(){var l=document.getElementsByTagName("html")[0];
return l.classList.contains("progressive-image")};h.setupEvents=function(){j.setupEvents.apply(this,arguments);
this._onImageLoad=this._onImageLoad.bind(this);this._onComplete=this._onComplete.bind(this);
this.imageLoader.on(k.Events.ImageLoad,this._onImageLoad);this.imageLoader.on(k.Events.Complete,this._onComplete)
};h.onSectionWillAppearWithPadding=function(){j.onSectionWillAppearWithPadding.apply(this,arguments);
this.imageLoader.load(this._loadOptions)};h.destroy=function(){this.imageLoader.destroy();
this.imageLoader=null;j.destroy.apply(this,arguments)};h._onImageLoad=function(l){this.section.trigger(a.Events.ImageLoad,l)
};h._onComplete=function(){this.section.trigger(a.Events.Complete)};b.exports=a
},{"./ProgressiveImageLoader":411,"@marcom/ac-jetpack-lib/core/BaseComponent":200,"@marcom/ac-object/defaults":342}],411:[function(b,a,h){var d=b("@marcom/ac-object/defaults");
var f=b("@marcom/ac-queue").LiveQueue;var l=b("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var g=b("@marcom/ac-raf-emitter/update");var j=b("@marcom/ac-raf-emitter/draw");
var c={container:document.body,includeContainer:false};var k={loadingPoolSize:8,timeout:null,imageDataAttribute:"data-progressive-image",imageAnimate:true,imageAnimateClass:"progressive-image-animated"};
m.Events={ImageLoad:"image-load",Complete:"complete"};function m(n){l.call(this);
this.options=d(c,n);this.loadingOptions=null;this.els=[];this.loadingQueue=null;
this._queueItems=[];this._queueItemsObj={};this._loadOrder=[];this._timeout=null;
this._didCallLoad=false}var i=m.prototype=Object.create(l.prototype);i.load=function(n){if(this._didCallLoad){return
}this._didCallLoad=true;this.loadingOptions=d(k,n);this.loadingQueue=new f(this.loadingOptions.loadingPoolSize);
this.els=Array.from(this._getProgressiveImageElements());if(this.options.includeContainer&&this.options.container.hasAttribute(this._getProgressiveImageDataAttribute())){this.els.unshift(this.options.container)
}j(function(){var p,o=this.els.length,q;for(p=0;p<o;p++){q={queueItem:this.loadingQueue.enqueue(this._loadNextItem.bind(this,p),p),el:this.els[p],id:p};
this._queueItems.push(q);this._queueItemsObj[p]=q;if(this.loadingOptions.imageAnimate){this.els[p].classList.add(this.loadingOptions.imageAnimateClass)
}}g(function(){this.loadingQueue.start();if(typeof this.loadingOptions.timeout==="number"){this._timeout=setTimeout(this.cancel.bind(this),this.loadingOptions.timeout)
}}.bind(this))}.bind(this))};i.setVisible=function(n){return new Promise(function(p,o){j(function(){n.removeAttribute(this._getProgressiveImageDataAttribute());
p();n=null}.bind(this))}.bind(this))};i.cancel=function(){if(this.els){var o,n=this.els.length;
for(o=0;o<n;o++){this.setVisible(this.els[o]);if(this.loadingOptions.imageAnimate){j(function(){this.els[o].setAttribute("data-progressive-image-loaded","")
}.bind(this,o))}}}this._handleLoadingComplete()};i.destroy=function(){this.cancel();
this.off();l.prototype.destroy.call(this)};i._loadNextItem=function(n){return new Promise(function(o,q,p){var r=this._queueItemsObj[o];
this._loadAndSetVisible(r.el).then(function(){var s=this._queueItems.indexOf(r);
this._queueItems.splice(s,1);this._queueItemsObj[r.id]=null;q();this._handleImageLoad(r.el);
r=q=null;if(this.loadingQueue.count()===1){this._handleLoadingComplete()}}.bind(this))
}.bind(this,n))};i._loadAndSetVisible=function(n){return new Promise(function(p,o){this.setVisible(n).then(function(){this._getBackgroundImageSrc(n).then(function(q){this._loadImage(q).then(p);
n=null}.bind(this))}.bind(this))}.bind(this))};i._getBackgroundImageSrc=function(n){return new Promise(function(p,o){g(function(){var q=n.currentStyle;
if(!q){q=window.getComputedStyle(n,false)}n=null;if(q.backgroundImage.indexOf("url(")===0){p(q.backgroundImage.slice(4,-1).replace(/"/g,""));
return}p(null)}.bind(this))}.bind(this))};i._getProgressiveImageDataAttribute=function(){return this.loadingOptions.imageDataAttribute
};i._getProgressiveImageCSSQuery=function(){return"["+this._getProgressiveImageDataAttribute()+"]"
};i._getProgressiveImageElements=function(){return this.options.container.querySelectorAll(this._getProgressiveImageCSSQuery())||[]
};i._loadImage=function(n){return new Promise(this._loadImagePromiseFunc.bind(this,n))
};i._loadImagePromiseFunc=function(r,q,p){function o(){this.removeEventListener("load",o);
q(this);q=null}if(!r){q(null);return}var n=new Image();n.addEventListener("load",o);
n.src=r};i._clearTimeout=function(){if(this._timeout){window.clearTimeout(this._timeout);
this._timeout=null}};i._handleImageLoad=function(n){j(function(){this.trigger(m.Events.ImageLoad,n);
if(this.loadingOptions.imageAnimate){n.setAttribute("data-progressive-image-loaded","")
}n=null}.bind(this))};i._handleLoadingComplete=function(){this.loadingQueue.stop();
this._clearTimeout();this.trigger(m.Events.Complete)};a.exports=m},{"@marcom/ac-event-emitter-micro":147,"@marcom/ac-object/defaults":342,"@marcom/ac-queue":406,"@marcom/ac-raf-emitter/draw":424,"@marcom/ac-raf-emitter/update":426}],412:[function(b,c,a){arguments[4][297][0].apply(a,arguments)
},{"./ac-shared-instance/SharedInstance":413,dup:297}],413:[function(b,c,a){arguments[4][298][0].apply(a,arguments)
},{dup:298}],414:[function(b,c,a){arguments[4][317][0].apply(a,arguments)},{"@marcom/ac-shared-instance":412,dup:317}],415:[function(b,c,a){arguments[4][297][0].apply(a,arguments)
},{"./ac-shared-instance/SharedInstance":416,dup:297}],416:[function(b,c,a){arguments[4][298][0].apply(a,arguments)
},{dup:298}],417:[function(b,d,a){b("@marcom/ac-polyfills/performance/now");var f;
function c(g){g=g||{};this._reset();this._willRun=false;this._totalSubscribeCount=-1;
this._requestAnimationFrame=window.requestAnimationFrame;this._cancelAnimationFrame=window.cancelAnimationFrame;
this._boundOnAnimationFrame=this._onAnimationFrame.bind(this);this._boundOnExternalAnimationFrame=this._onExternalAnimationFrame.bind(this)
}f=c.prototype;f.subscribe=function(g,h){this._totalSubscribeCount++;if(!this._nextFrameSubscribers[g.id]){if(h){this._nextFrameSubscribersOrder.unshift(g.id)
}else{this._nextFrameSubscribersOrder.push(g.id)}this._nextFrameSubscribers[g.id]=g;
this._nextFrameSubscriberArrayLength++;this._nextFrameSubscriberCount++;this._run()
}return this._totalSubscribeCount};f.unsubscribe=function(g){if(!this._nextFrameSubscribers[g.id]){return false
}this._nextFrameSubscribers[g.id]=null;this._nextFrameSubscriberCount--;if(this._nextFrameSubscriberCount===0){this._cancel()
}return true};f.trigger=function(j,h){var g;for(g=0;g<this._subscriberArrayLength;
g++){if(this._subscribers[this._subscribersOrder[g]]!==null&&this._subscribers[this._subscribersOrder[g]]._didDestroy===false){this._subscribers[this._subscribersOrder[g]].trigger(j,h)
}}};f.destroy=function(){var g=this._cancel();this._subscribers=null;this._subscribersOrder=null;
this._nextFrameSubscribers=null;this._nextFrameSubscribersOrder=null;this._rafData=null;
this._boundOnAnimationFrame=null;this._onExternalAnimationFrame=null;return g};
f.useExternalAnimationFrame=function(g){if(typeof g!=="boolean"){return}var h=this._isUsingExternalAnimationFrame;
if(g&&this._animationFrame){this._cancelAnimationFrame.call(window,this._animationFrame);
this._animationFrame=null}if(this._willRun&&!g&&!this._animationFrame){this._animationFrame=this._requestAnimationFrame.call(window,this._boundOnAnimationFrame)
}this._isUsingExternalAnimationFrame=g;if(g){return this._boundOnExternalAnimationFrame
}return h||false};f._run=function(){if(!this._willRun){this._willRun=true;if(this.lastFrameTime===0){this.lastFrameTime=performance.now()
}this._animationFrameActive=true;if(!this._isUsingExternalAnimationFrame){this._animationFrame=this._requestAnimationFrame.call(window,this._boundOnAnimationFrame)
}return true}};f._cancel=function(){var g=false;if(this._animationFrameActive){if(this._animationFrame){this._cancelAnimationFrame.call(window,this._animationFrame);
this._animationFrame=null}this._animationFrameActive=false;this._willRun=false;
g=true}if(!this._isRunning){this._reset()}return g};f._onSubscribersAnimationFrameStart=function(h){var g;
for(g=0;g<this._subscriberArrayLength;g++){if(this._subscribers[this._subscribersOrder[g]]!==null&&this._subscribers[this._subscribersOrder[g]]._didDestroy===false){this._subscribers[this._subscribersOrder[g]]._onAnimationFrameStart(h)
}}};f._onSubscribersAnimationFrameEnd=function(h){var g;for(g=0;g<this._subscriberArrayLength;
g++){if(this._subscribers[this._subscribersOrder[g]]!==null&&this._subscribers[this._subscribersOrder[g]]._didDestroy===false){this._subscribers[this._subscribersOrder[g]]._onAnimationFrameEnd(h)
}}};f._onAnimationFrame=function(g){this._subscribers=this._nextFrameSubscribers;
this._subscribersOrder=this._nextFrameSubscribersOrder;this._subscriberArrayLength=this._nextFrameSubscriberArrayLength;
this._subscriberCount=this._nextFrameSubscriberCount;this._nextFrameSubscribers={};
this._nextFrameSubscribersOrder=[];this._nextFrameSubscriberArrayLength=0;this._nextFrameSubscriberCount=0;
this._isRunning=true;this._willRun=false;this._didRequestNextRAF=false;this._rafData.delta=g-this.lastFrameTime;
this.lastFrameTime=g;this._rafData.fps=0;if(this._rafData.delta>=1000){this._rafData.delta=0
}if(this._rafData.delta!==0){this._rafData.fps=1000/this._rafData.delta}this._rafData.time=g;
this._rafData.naturalFps=this._rafData.fps;this._rafData.timeNow=Date.now();this._onSubscribersAnimationFrameStart(this._rafData);
this.trigger("update",this._rafData);this.trigger("external",this._rafData);this.trigger("draw",this._rafData);
this._onSubscribersAnimationFrameEnd(this._rafData);if(!this._willRun){this._reset()
}};f._onExternalAnimationFrame=function(g){if(!this._isUsingExternalAnimationFrame){return
}this._onAnimationFrame(g)};f._reset=function(){this._rafData={time:0,delta:0,fps:0,naturalFps:0,timeNow:0};
this._subscribers={};this._subscribersOrder=[];this._subscriberArrayLength=0;this._subscriberCount=0;
this._nextFrameSubscribers={};this._nextFrameSubscribersOrder=[];this._nextFrameSubscriberArrayLength=0;
this._nextFrameSubscriberCount=0;this._didEmitFrameData=false;this._animationFrame=null;
this._animationFrameActive=false;this._isRunning=false;this._shouldReset=false;
this.lastFrameTime=0};d.exports=c},{"@marcom/ac-polyfills/performance/now":404}],418:[function(c,g,b){var a=c("@marcom/ac-shared-instance").SharedInstance;
var h="ac-raf-executor:sharedRAFExecutorInstance",f="2.0.1";var d=c("./RAFExecutor");
g.exports=a.share(h,f,d)},{"./RAFExecutor":417,"@marcom/ac-shared-instance":415}],419:[function(f,g,d){var i;
var h=f("@marcom/ac-event-emitter-micro").EventEmitterMicro;var c=f("@marcom/ac-raf-executor/sharedRAFExecutorInstance");
var b=f("@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance");
function a(j){j=j||{};h.call(this);this.id=b.getNewID();this.executor=j.executor||c;
this._reset();this._willRun=false;this._didDestroy=false}i=a.prototype=Object.create(h.prototype);
i.run=function(){if(!this._willRun){this._willRun=true}return this._subscribe()
};i.cancel=function(){this._unsubscribe();if(this._willRun){this._willRun=false
}this._reset()};i.destroy=function(){var j=this.willRun();this.cancel();this.executor=null;
h.prototype.destroy.call(this);this._didDestroy=true;return j};i.willRun=function(){return this._willRun
};i.isRunning=function(){return this._isRunning};i._subscribe=function(){return this.executor.subscribe(this)
};i._unsubscribe=function(){return this.executor.unsubscribe(this)};i._onAnimationFrameStart=function(j){this._isRunning=true;
this._willRun=false;if(!this._didEmitFrameData){this._didEmitFrameData=true;this.trigger("start",j)
}};i._onAnimationFrameEnd=function(j){if(!this._willRun){this.trigger("stop",j);
this._reset()}};i._reset=function(){this._didEmitFrameData=false;this._isRunning=false
};g.exports=a},{"@marcom/ac-event-emitter-micro":147,"@marcom/ac-raf-emitter-id-generator/sharedRAFEmitterIDGeneratorInstance":414,"@marcom/ac-raf-executor/sharedRAFExecutorInstance":418}],420:[function(b,c,a){var d=b("./SingleCallRAFEmitter");
var g=function g(h){this.rafEmitter=new d();this.rafEmitter.on(h,this._onRAFExecuted.bind(this));
this.requestAnimationFrame=this.requestAnimationFrame.bind(this);this.cancelAnimationFrame=this.cancelAnimationFrame.bind(this);
this._frameCallbacks=[];this._nextFrameCallbacks=[];this._currentFrameID=-1;this._cancelFrameIdx=-1;
this._frameCallbackLength=0;this._nextFrameCallbacksLength=0;this._frameCallbackIteration=0
};var f=g.prototype;f.requestAnimationFrame=function(h){this._currentFrameID=this.rafEmitter.run();
this._nextFrameCallbacks.push(this._currentFrameID,h);this._nextFrameCallbacksLength+=2;
return this._currentFrameID};f.cancelAnimationFrame=function(h){this._cancelFrameIdx=this._nextFrameCallbacks.indexOf(h);
if(this._cancelFrameIdx===-1){return}this._nextFrameCallbacks.splice(this._cancelFrameIdx,2);
this._nextFrameCallbacksLength-=2;if(this._nextFrameCallbacksLength===0){this.rafEmitter.cancel()
}};f._onRAFExecuted=function(h){this._frameCallbacks=this._nextFrameCallbacks;this._frameCallbackLength=this._nextFrameCallbacksLength;
this._nextFrameCallbacks=[];this._nextFrameCallbacksLength=0;for(this._frameCallbackIteration=0;
this._frameCallbackIteration<this._frameCallbackLength;this._frameCallbackIteration+=2){this._frameCallbacks[this._frameCallbackIteration+1](h.time,h)
}};c.exports=g},{"./SingleCallRAFEmitter":422}],421:[function(b,c,a){var g=b("./RAFInterface");
var f=function f(){this.events={}};var d=f.prototype;d.requestAnimationFrame=function(h){if(!this.events[h]){this.events[h]=new g(h)
}return this.events[h].requestAnimationFrame};d.cancelAnimationFrame=function(h){if(!this.events[h]){this.events[h]=new g(h)
}return this.events[h].cancelAnimationFrame};c.exports=new f()},{"./RAFInterface":420}],422:[function(c,d,b){var a=c("./RAFEmitter");
var f=function f(h){a.call(this,h)};var g=f.prototype=Object.create(a.prototype);
g._subscribe=function(){return this.executor.subscribe(this,true)};d.exports=f},{"./RAFEmitter":419}],423:[function(b,c,a){var d=b("./RAFInterfaceController");
c.exports=d.cancelAnimationFrame("draw")},{"./RAFInterfaceController":421}],424:[function(b,c,a){var d=b("./RAFInterfaceController");
c.exports=d.requestAnimationFrame("draw")},{"./RAFInterfaceController":421}],425:[function(b,c,a){var d=b("./RAFInterfaceController");
c.exports=d.requestAnimationFrame("external")},{"./RAFInterfaceController":421}],426:[function(b,c,a){var d=b("./RAFInterfaceController");
c.exports=d.requestAnimationFrame("update")},{"./RAFInterfaceController":421}],427:[function(b,c,a){var d={ua:window.navigator.userAgent,platform:window.navigator.platform,vendor:window.navigator.vendor};
c.exports=b("./parseUserAgent")(d)},{"./parseUserAgent":430}],428:[function(b,c,a){c.exports={browser:{safari:false,chrome:false,firefox:false,ie:false,opera:false,android:false,edge:false,version:{name:"",major:0,minor:0,patch:0,documentMode:false}},os:{osx:false,ios:false,android:false,windows:false,linux:false,fireos:false,chromeos:false,version:{name:"",major:0,minor:0,patch:0}}}
},{}],429:[function(c,d,a){d.exports={browser:[{name:"edge",userAgent:"Edge",version:["rv","Edge"],test:function f(g){return g.ua.indexOf("Edge")>-1||g.ua==="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}},{name:"chrome",userAgent:"Chrome"},{name:"firefox",test:function f(g){return g.ua.indexOf("Firefox")>-1&&g.ua.indexOf("Opera")===-1
},version:"Firefox"},{name:"android",userAgent:"Android"},{name:"safari",test:function f(g){return g.ua.indexOf("Safari")>-1&&g.vendor.indexOf("Apple")>-1
},version:"Version"},{name:"ie",test:function f(g){return g.ua.indexOf("IE")>-1||g.ua.indexOf("Trident")>-1
},version:["MSIE","rv"],parseDocumentMode:function b(){var g=false;if(document.documentMode){g=parseInt(document.documentMode,10)
}return g}},{name:"opera",userAgent:"Opera",version:["Version","Opera"]}],os:[{name:"windows",test:function f(g){return g.platform.indexOf("Win")>-1
},version:"Windows NT"},{name:"osx",userAgent:"Mac",test:function f(g){return g.platform.indexOf("Mac")>-1
}},{name:"ios",test:function f(g){return g.ua.indexOf("iPhone")>-1||g.ua.indexOf("iPad")>-1
},version:["iPhone OS","CPU OS"]},{name:"linux",userAgent:"Linux",test:function f(g){return g.platform.indexOf("Linux")>-1&&g.ua.indexOf("Android")===-1
}},{name:"fireos",test:function f(g){return g.ua.indexOf("Firefox")>-1&&g.ua.indexOf("Mobile")>-1
},version:"rv"},{name:"android",userAgent:"Android"},{name:"chromeos",userAgent:"CrOS"}]}
},{}],430:[function(b,a,d){var c=b("./defaults");var h=b("./dictionary");function g(k){return new RegExp(k+"[a-zA-Z\\s/:]+([0-9_.]+)","i")
}function f(n,m){if(typeof n.parseVersion==="function"){return n.parseVersion(m)
}else{var p=n.version||n.userAgent;if(typeof p==="string"){p=[p]}var o=p.length;
var k;for(var l=0;l<o;l++){k=m.match(g(p[l]));if(k&&k.length>1){return k[1].replace(/_/g,".")
}}}}function j(m,r,p){var o=m.length;var q;var k;for(var n=0;n<o;n++){if(typeof m[n].test==="function"){if(m[n].test(p)===true){q=m[n].name
}}else{if(p.ua.indexOf(m[n].userAgent)>-1){q=m[n].name}}if(q){r[q]=true;k=f(m[n],p.ua);
if(typeof k==="string"){var l=k.split(".");r.version.name=k;if(l&&l.length>0){r.version.major=parseInt(l[0]||0);
r.version.minor=parseInt(l[1]||0);r.version.patch=parseInt(l[2]||0)}}else{if(q==="edge"){r.version.name="12.0.0";
r.version.major="12";r.version.minor="0";r.version.patch="0"}}if(typeof m[n].parseDocumentMode==="function"){r.version.documentMode=m[n].parseDocumentMode()
}return r}}return r}function i(l){var k={};k.browser=j(h.browser,c.browser,l);k.os=j(h.os,c.os,l);
return k}a.exports=i},{"./defaults":428,"./dictionary":429}],431:[function(b,c,a){arguments[4][245][0].apply(a,arguments)
},{dup:245}],432:[function(b,a,f){b("@marcom/ac-polyfills/Function/prototype.bind");
b("@marcom/ac-polyfills/Object/keys");b("@marcom/ac-polyfills/Object/create");var l=b("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var i=b("@marcom/ac-dom-events/utils/addEventListener");var h=b("@marcom/ac-feature/mediaQueriesAvailable");
var c="viewport-emitter";var j="::before";var d="only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)";
function k(m){l.call(this);this._initializeElement(m);if(h()){this._updateViewport=this._updateViewport.bind(this);
i(window,"resize",this._updateViewport);i(window,"orientationchange",this._updateViewport);
this._retinaQuery=window.matchMedia(d);this._updateRetina();if(this._retinaQuery.addListener){this._updateRetina=this._updateRetina.bind(this);
this._retinaQuery.addListener(this._updateRetina)}}this._updateViewport()}var g=k.prototype=Object.create(l.prototype);
g.viewport=false;g.retina=false;g._initializeElement=function(n){var m;n=n||c;m=document.getElementById(n);
if(!m){m=document.createElement("div");m.id=n;m=document.body.appendChild(m)}this._el=m
};g._getElementContent=function(){var m;if("currentStyle" in this._el){m=this._el.currentStyle["x-content"]
}else{this._invalidateStyles();m=window.getComputedStyle(this._el,j).content}if(m){m=m.replace(/["']/g,"")
}if(m){return m}return false};g._updateViewport=function(){var m=this.viewport;
var n;var o;this.viewport=this._getElementContent();if(this.viewport){this.viewport=this.viewport.split(":").pop()
}if(m&&this.viewport!==m){o={from:m,to:this.viewport};this.trigger("change",o);
this.trigger("from:"+m,o);this.trigger("to:"+this.viewport,o)}};g._updateRetina=function(m){var n=this.retina;
this.retina=this._retinaQuery.matches;if(n!==this.retina){this.trigger("retinachange",{from:n,to:this.retina})
}};g._invalidateStyles=function(){document.documentElement.clientWidth;this._el.innerHTML=this._el.innerHTML===" "?" ":" ";
document.documentElement.clientWidth};a.exports=k},{"@marcom/ac-dom-events/utils/addEventListener":431,"@marcom/ac-event-emitter-micro":147,"@marcom/ac-feature/mediaQueriesAvailable":179,"@marcom/ac-polyfills/Function/prototype.bind":387,"@marcom/ac-polyfills/Object/create":391,"@marcom/ac-polyfills/Object/keys":393}],433:[function(c,d,b){var a=c("./ViewportEmitter");
d.exports=new a()},{"./ViewportEmitter":432}],434:[function(m,f,J){var l={create:m("gl-mat4/create"),invert:m("gl-mat4/invert"),clone:m("gl-mat4/clone"),transpose:m("gl-mat4/transpose")};
var b={create:m("gl-vec3/create"),dot:m("gl-vec3/dot"),normalize:m("gl-vec3/normalize"),length:m("gl-vec3/length"),cross:m("gl-vec3/cross"),fromValues:m("gl-vec3/fromValues")};
var a={create:m("gl-vec4/create"),transformMat4:m("gl-vec4/transformMat4"),fromValues:m("gl-vec4/fromValues")};
var g=Math.PI/180;var d=180/Math.PI;var H=0,A=0,F=1,z=1,D=2,B=3;var k=4,y=4,j=5,x=5,i=6,h=7;
var v=8,t=9,s=10,r=11;var I=12,w=12,G=13,u=13,E=14,C=15;var c=function c(W,V){V=V||false;
var aa=l.clone(W);var Q=b.create();var ag=b.create();var N=b.create();var S=a.create();
var L=a.create();var M=b.create();for(var ac=0;ac<16;ac++){aa[ac]/=aa[C]}var Y=l.clone(aa);
Y[B]=0;Y[h]=0;Y[r]=0;Y[C]=1;var ad=aa[3],O=aa[7],R=aa[11],ai=aa[12],ah=aa[13],af=aa[14],ae=aa[15];
var U=a.create();if(!q(aa[B])||!q(aa[h])||!q(aa[r])){U[0]=aa[B];U[1]=aa[h];U[2]=aa[r];
U[3]=aa[C];var ab=l.invert(l.create(),Y);var T=l.transpose(l.create(),ab);S=a.transformMat4(S,U,T)
}else{S=a.fromValues(0,0,0,1)}Q[0]=ai;Q[1]=ah;Q[2]=af;var P=[b.create(),b.create(),b.create()];
P[0][0]=aa[0];P[0][1]=aa[1];P[0][2]=aa[2];P[1][0]=aa[4];P[1][1]=aa[5];P[1][2]=aa[6];
P[2][0]=aa[8];P[2][1]=aa[9];P[2][2]=aa[10];ag[0]=b.length(P[0]);b.normalize(P[0],P[0]);
N[0]=b.dot(P[0],P[1]);P[1]=o(P[1],P[0],1,-N[0]);ag[1]=b.length(P[1]);b.normalize(P[1],P[1]);
N[0]/=ag[1];N[1]=b.dot(P[0],P[2]);P[2]=o(P[2],P[0],1,-N[1]);N[2]=b.dot(P[1],P[2]);
P[2]=o(P[2],P[1],1,-N[2]);ag[2]=b.length(P[2]);b.normalize(P[2],P[2]);N[1]/=ag[2];
N[2]/=ag[2];var Z=b.cross(b.create(),P[1],P[2]);if(b.dot(P[0],Z)<0){for(ac=0;ac<3;
ac++){ag[ac]*=-1;P[ac][0]*=-1;P[ac][1]*=-1;P[ac][2]*=-1}}L[0]=0.5*Math.sqrt(Math.max(1+P[0][0]-P[1][1]-P[2][2],0));
L[1]=0.5*Math.sqrt(Math.max(1-P[0][0]+P[1][1]-P[2][2],0));L[2]=0.5*Math.sqrt(Math.max(1-P[0][0]-P[1][1]+P[2][2],0));
L[3]=0.5*Math.sqrt(Math.max(1+P[0][0]+P[1][1]+P[2][2],0));if(P[2][1]>P[1][2]){L[0]=-L[0]
}if(P[0][2]>P[2][0]){L[1]=-L[1]}if(P[1][0]>P[0][1]){L[2]=-L[2]}var K=a.fromValues(L[0],L[1],L[2],2*Math.acos(L[3]));
var X=p(L);if(V){N[0]=Math.round(N[0]*d*100)/100;N[1]=Math.round(N[1]*d*100)/100;
N[2]=Math.round(N[2]*d*100)/100;X[0]=Math.round(X[0]*d*100)/100;X[1]=Math.round(X[1]*d*100)/100;
X[2]=Math.round(X[2]*d*100)/100;K[3]=Math.round(K[3]*d*100)/100}return{translation:Q,scale:ag,skew:N,perspective:S,quaternion:L,eulerRotation:X,axisAngle:K}
};var o=function o(L,O,N,M){var K=b.create();K[0]=N*L[0]+M*O[0];K[1]=N*L[1]+M*O[1];
K[2]=N*L[2]+M*O[2];return K};var p=function p(K){var O=K[3]*K[3];var N=K[0]*K[0];
var M=K[1]*K[1];var L=K[2]*K[2];var T=N+M+L+O;var P=K[0]*K[1]+K[2]*K[3];var S,R,Q;
if(P>0.499*T){R=2*Math.atan2(K[0],K[3]);Q=Math.PI/2;S=0;return b.fromValues(S,R,Q)
}if(P<-0.499*T){R=-2*Math.atan2(K[0],K[3]);Q=-Math.PI/2;S=0;return b.fromValues(S,R,Q)
}R=Math.atan2(2*K[1]*K[3]-2*K[0]*K[2],N-M-L+O);Q=Math.asin(2*P/T);S=Math.atan2(2*K[0]*K[3]-2*K[1]*K[2],-N+M-L+O);
return b.fromValues(S,R,Q)};var q=function q(K){return Math.abs(K)<0.0001};var n=function n(N){var L=String(getComputedStyle(N).transform).trim();
var K=l.create();if(L==="none"){return K}var O=L.slice(0,L.indexOf("(")),P,M;if(O==="matrix3d"){P=L.slice(9,-1).split(",");
for(M=0;M<P.length;M++){K[M]=parseFloat(P[M])}}else{if(O==="matrix"){P=L.slice(7,-1).split(",");
for(M=P.length;M--;){P[M]=parseFloat(P[M])}K[H]=P[0];K[F]=P[1];K[I]=P[4];K[k]=P[2];
K[j]=P[3];K[G]=P[5]}else{throw new TypeError("Invalid Matrix Value")}}return K};
f.exports=function(M,L){var K=n(M);return c(K,L)}},{"gl-mat4/clone":435,"gl-mat4/create":436,"gl-mat4/invert":437,"gl-mat4/transpose":438,"gl-vec3/create":439,"gl-vec3/cross":440,"gl-vec3/dot":441,"gl-vec3/fromValues":442,"gl-vec3/length":443,"gl-vec3/normalize":444,"gl-vec4/create":445,"gl-vec4/fromValues":446,"gl-vec4/transformMat4":447}],435:[function(b,c,a){arguments[4][103][0].apply(a,arguments)
},{dup:103}],436:[function(b,c,a){arguments[4][104][0].apply(a,arguments)},{dup:104}],437:[function(b,c,a){arguments[4][107][0].apply(a,arguments)
},{dup:107}],438:[function(b,c,a){arguments[4][115][0].apply(a,arguments)},{dup:115}],439:[function(b,c,a){arguments[4][116][0].apply(a,arguments)
},{dup:116}],440:[function(b,c,a){arguments[4][117][0].apply(a,arguments)},{dup:117}],441:[function(b,c,a){arguments[4][118][0].apply(a,arguments)
},{dup:118}],442:[function(b,c,a){arguments[4][119][0].apply(a,arguments)},{dup:119}],443:[function(b,c,a){arguments[4][120][0].apply(a,arguments)
},{dup:120}],444:[function(b,c,a){arguments[4][121][0].apply(a,arguments)},{dup:121}],445:[function(b,c,a){arguments[4][122][0].apply(a,arguments)
},{dup:122}],446:[function(b,c,a){arguments[4][123][0].apply(a,arguments)},{dup:123}],447:[function(b,c,a){arguments[4][124][0].apply(a,arguments)
},{dup:124}],448:[function(c,b,f){var l=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var g=c("@marcom/sm-math-utils");var j=c("./Model/AnimSystemModel");var h=c("./Model/ElementMetricsLookup");
var o=c("./Keyframes/AnimatedContentKeyframe");var a=c("./Keyframes/AnimatedContentKeyframeTrigger");
var n=c("./Keyframes/AnimatedContentKeyframeEvent");var d=c("./Utils/BaseComponentShim");
var m=c("./AnimatedContentController");var k={create:c("@marcom/ac-raf-emitter/RAFEmitter"),update:c("@marcom/ac-raf-emitter/update"),draw:c("@marcom/ac-raf-emitter/draw")};
var i=function(s){_inherits(H,s);function H(I){_classCallCheck(this,H);var J=_possibleConstructorReturn(this,(H.__proto__||Object.getPrototypeOf(H)).call(this));
if(I instanceof HTMLElement){J.element=I}else{if(arguments.length>1){d.make(J,arguments)
}else{throw new TypeError("Cannot invalid constructor. Attach anim systems to the containing elements.")
}}H.StaticInit();J.isEnabled=true;J.timelines=new j.Timeline();J.oldValues=new j.Timeline();
J.metrics=new h();J.metrics.add(J.element);J.boundsMin=0;J.boundsMax=0;J.lastPosition=0;
J.keyFrames=new j.KeyFrames(J.metrics.get(J.element),j.pageMetrics.windowHeight);
J.animatedContentControllers=[];J.setupRAFEmitter();J.setupAnimatedContent();J.updateProgress(j.pageMetrics.scrollY);
J.gui=null;if(H.GUI_CLASS&&H.GUI_CLASS.IS_ENABLED){H.GUI_CLASS.REGISTER(J)}H.systems.push(J);
return J}_createClass(H,[{key:"destroy",value:function F(){for(var J=0,I=this.animatedContentControllers.length;
J<I;J++){this.animatedContentControllers[J].destroy()}this.timelines=null;this.keyFrames=null;
this.oldValues=null;_get(H.prototype.__proto__||Object.getPrototypeOf(H.prototype),"destroy",this).call(this)
}},{key:"setupAnimatedContent",value:function t(){var O=this;var J=[];[o.DATA_ATTRIBUTE,a.DATA_ATTRIBUTE,n.DATA_ATTRIBUTE].forEach(function(Q){for(var R=0;
R<12;R++){J.push(Q+(R===0?"":"-"+(R-1)))}});for(var N=0;N<J.length;N++){var L=J[N];
var P=this.element.querySelectorAll("["+L+"]");for(var K=0;K<P.length;K++){var M=P[K];
var I=this.getControllerForElement(M);if(I===null){I=new m(this,M,this.animatedContentControllers.length);
this.animatedContentControllers.push(I)}I.addKeyframe(L)}}k.update(function(){for(var R=0,Q=O.animatedContentControllers.length;
R<Q;R++){O.animatedContentControllers[R].determineActiveKeyframes();O.animatedContentControllers[R].updateAnimationConstraints()
}O.updateProgress(j.pageMetrics.scrollY);O.updateBounds();O.trigger(j.EVENTS.ON_KEYFRAMES_CREATED,O);
O._onScroll(j.pageMetrics.scrollY)})}},{key:"updateBounds",value:function A(){if(this.animatedContentControllers.length===0){this.boundsMin=0;
this.boundsMax=0.1;return}var K={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};
for(var L=0,I=this.animatedContentControllers.length;L<I;L++){this.animatedContentControllers[L].getBounds(K)
}var M=this.convertTValueToScrollPosition(K.min);var J=this.convertTValueToScrollPosition(K.max);
if(J-M<j.pageMetrics.windowHeight){K.min=this.convertScrollPositionToTValue(M-j.pageMetrics.windowHeight*0.5);
K.max=this.convertScrollPositionToTValue(J+j.pageMetrics.windowHeight*0.5)}else{K.min-=0.001;
K.max+=0.001}this.boundsMin=K.min;this.boundsMax=K.max;this.lastPosition=g.lerp(Math.random(),this.boundsMin,this.boundsMax)
}},{key:"_onBreakpointChange",value:function E(L,K){for(var J=0,I=this.animatedContentControllers.length;
J<I;J++){this.animatedContentControllers[J].determineActiveKeyframes()}}},{key:"_onResizeDebounced",value:function G(J){if(!this.isEnabled){return
}this.metrics.refreshAll();this.keyFrames=new j.KeyFrames(this.metrics.get(this.element),j.pageMetrics.windowHeight);
this.updateProgress(j.pageMetrics.scrollY);if(!this.hasDuration()){return}for(var K=0,I=this.animatedContentControllers.length;
K<I;K++){this.animatedContentControllers[K].updateAnimationConstraints()}this.updateBounds();
if(this.gui!==null){this.gui.onResizeDebounced()}if(J){this.timelines.local=this.timelines.localUnclamped=g.randFloat(this.boundsMin,this.boundsMax)
}if(this.timelines.localUnclamped>=this.boundsMin&&this.timelines.localUnclamped<=this.boundsMax){this.oldValues.local=-Math.random();
this._onScroll(j.pageMetrics.scrollY)}}},{key:"updateProgress",value:function v(I){if(!this.hasDuration()){this.timelines.local=this.timelines.localUnclamped=0;
return}this.timelines.localUnclamped=g.map(I,this.keyFrames.a,this.keyFrames.d,0,1)
}},{key:"performTimelineDispatch",value:function z(){if(this.oldValues.local!==this.timelines.local){this.trigger(j.EVENTS.ON_UPDATE_T_LOCAL,this.timelines);
for(var J=0,I=this.animatedContentControllers.length;J<I;J++){this.animatedContentControllers[J].onScrollUpdate(this.timelines)
}}this.oldValues.local=this.timelines.local}},{key:"_onScroll",value:function x(I){if(!this.isEnabled){return false
}this.updateProgress(I);if(this.timelines.localUnclamped>=this.boundsMin&&this.timelines.localUnclamped<=this.boundsMax){this.timelines.local=g.clamp(this.timelines.localUnclamped,this.boundsMin,this.boundsMax);
this.lastPosition=this.timelines.localUnclamped;this.performTimelineDispatch();
this.requestDOMChange();return}var J=this.lastPosition===this.boundsMin||this.lastPosition===this.boundsMax;
if(J){return}var L=this.lastPosition>this.boundsMin&&this.lastPosition<this.boundsMax;
var K=this.timelines.localUnclamped<this.boundsMin||this.timelines.localUnclamped>this.boundsMax;
if(L&&K){this.timelines.local=g.clamp(this.timelines.localUnclamped,this.boundsMin,this.boundsMax);
this.lastPosition=this.timelines.localUnclamped;this.performTimelineDispatch();
this.requestDOMChange();return}if(this.gui!==null){}}},{key:"setupRAFEmitter",value:function D(){this._rafEmitter=new k.create();
this.onDOMRead=this.onDOMRead.bind(this);this.onDOMWrite=this.onDOMWrite.bind(this);
this._rafEmitter.on("update",this.onDOMRead);this._rafEmitter.on("draw",this.onDOMWrite)
}},{key:"requestDOMChange",value:function y(){if(!this.isEnabled){return false}if(!this._rafEmitter){this.setupRAFEmitter()
}return this._rafEmitter.run()}},{key:"onDOMRead",value:function w(){for(var J=0,I=this.animatedContentControllers.length;
J<I;J++){this.animatedContentControllers[J].onDOMRead(this.timelines)}}},{key:"onDOMWrite",value:function p(){for(var J=0,I=this.animatedContentControllers.length;
J<I;J++){this.animatedContentControllers[J].onDOMWrite(this.timelines)}if(this.needsUpdate()){this.requestDOMChange()
}}},{key:"needsUpdate",value:function u(){for(var J=0,I=this.animatedContentControllers.length;
J<I;J++){if(this.animatedContentControllers[J].needsUpdate()){return true}}return false
}},{key:"getControllerForElement",value:function q(K){for(var J=0,I=this.animatedContentControllers.length;
J<I;J++){if(this.animatedContentControllers[J].element===K){return this.animatedContentControllers[J]
}}return null}},{key:"convertScrollPositionToTValue",value:function B(I){if(!this.hasDuration()){return 0
}return g.map(I,this.keyFrames.a,this.keyFrames.d,0,1)}},{key:"convertTValueToScrollPosition",value:function C(I){if(!this.hasDuration()){return 0
}return g.map(I,0,1,this.keyFrames.a,this.keyFrames.d)}},{key:"hasDuration",value:function r(){return this.keyFrames.a!==this.keyFrames.d
}}]);return H}(l);i.GUI_CLASS=null;i.systems=[];i.onScroll=function(){j.pageMetrics.scrollY=window.scrollY||window.pageYOffset;
for(var q=0,p=i.systems.length;q<p;q++){i.systems[q]._onScroll(j.pageMetrics.scrollY)
}};i.onResizedDebounced=function(){k.update(function(){var t=j.pageMetrics.breakpoint;
var v=j.getBreakpoint();if(v!==t){j.DOCUMENT_ELEMENT_CLASSES=Array.from(document.documentElement.classList);
j.pageMetrics.breakpoint=v;for(var s=0,q=i.systems.length;s<q;s++){i.systems[s]._onBreakpointChange(v,t)
}}var p=v!==t;for(var u=0,r=i.systems.length;u<r;u++){i.systems[u]._onResizeDebounced(p)
}})};i.INITIALIZED=false;i.StaticInit=function(){if(i.INITIALIZED){return}i.INITIALIZED=true;
j.DOCUMENT_ELEMENT_CLASSES=Array.from(document.documentElement.classList);j.pageMetrics.windowHeight=window.innerHeight;
j.pageMetrics.windowWidth=window.innerWidth;j.pageMetrics.scrollY=window.scrollY||window.pageYOffset;
j.pageMetrics.breakpoint=j.getBreakpoint();window.addEventListener("resize",function(){j.pageMetrics.windowHeight=window.innerHeight;
j.pageMetrics.windowWidth=window.innerWidth;j.pageMetrics.scrollY=window.scrollY||window.pageYOffset;
window.clearTimeout(j.RESIZE_TIMEOUT);j.RESIZE_TIMEOUT=window.setTimeout(i.onResizedDebounced,250)
});window.addEventListener("scroll",i.onScroll);try{var q=c("@marcom/ac-jetpack-lib/utils/Page");
q.on(q.DEEP_REFRESH_ALL_METRICS,i.onResizedDebounced)}catch(p){}};b.exports=i},{"./AnimatedContentController":449,"./Keyframes/AnimatedContentKeyframe":450,"./Keyframes/AnimatedContentKeyframeEvent":451,"./Keyframes/AnimatedContentKeyframeTrigger":452,"./Model/AnimSystemModel":453,"./Model/ElementMetricsLookup":455,"./Utils/BaseComponentShim":460,"@marcom/ac-event-emitter-micro":147,"@marcom/ac-jetpack-lib/utils/Page":462,"@marcom/ac-raf-emitter/RAFEmitter":419,"@marcom/ac-raf-emitter/draw":424,"@marcom/ac-raf-emitter/update":426,"@marcom/sm-math-utils":461}],449:[function(d,b,f){var i=d("./Model/AnimSystemModel");
var o=d("./Keyframes/AnimatedContentKeyframe");var a=d("./Keyframes/AnimatedContentKeyframeTrigger");
var m=d("./Keyframes/AnimatedContentKeyframeEvent");var h=d("./Parsing/ExpressionParser");
var g=d("./Parsing/TimeParser");var l=d("./Model/UUID");var n=d("@marcom/decompose-css-transform");
var j={update:d("@marcom/ac-raf-emitter/update"),external:d("@marcom/ac-raf-emitter/external"),draw:d("@marcom/ac-raf-emitter/draw")};
function k(p,q){this.animSystem=p;this.element=q;this.element._animController=this;
this.uuid=l();this.element._animationInfo={x:new i.TargetValue(0,0.05,false),y:new i.TargetValue(0,0.05,false),rotation:new i.TargetValue(0,0.05,false),scale:new i.TargetValue(0,0.05,false),scaleX:new i.TargetValue(0,0.05,false),scaleY:new i.TargetValue(0,0.05,false),opacity:new i.TargetValue(0,0.05,false),targetStyles:{},targetClasses:{add:[],remove:[]}};
this.eventObject=new i.EventObject(this,new o(this,"--fake--"));this.needsStyleUpdate=false;
this.needsClassUpdate=false;this.elementMetrics=this.animSystem.metrics.add(this.element);
this._parentElementMetrics=null;this.expressionParser=new h(this);this.timeParser=new g(this);
this.attributes=[];this.keyframes={};this._allKeyframes=[];this._activeKeyframes=[];
this.keyframesRequiringDispatch=[];this.updateCachedValuesFromElement();this.onKeyframesCreated=this.onKeyframesCreated.bind(this);
this.animSystem.on(i.EVENTS.ON_KEYFRAMES_CREATED,this.onKeyframesCreated)}k.prototype.constructor=k;
k.prototype.destroy=function(){this.element._animController=null;this.element._animationInfo=null;
this.eventObject.controller=null;this.eventObject.element=null;this.eventObject.keyframe=null;
this.eventObject.animationInfo=null;this.elementMetrics.destroy();this.animSystem.off(i.EVENTS.ON_KEYFRAMES_CREATED,this.onKeyframesCreated);
this.animSystem=null;for(var p=0;p<this._allKeyframes.length;p++){this._allKeyframes[p].destroy()
}this._allKeyframes=null;this._activeKeyframes=null;this.attributes=null;this.keyframes=null;
this.expressionParser.destroy();this.expressionParser=null;this.timeParser.destroy();
this.timeParser=null};k.prototype.updateCachedValuesFromElement=function(){var q=getComputedStyle(this.element);
var p=n(this.element,true);this.element._animationInfo.x.initialValue=this.element._animationInfo.x.target=this.element._animationInfo.x.current=p.translation[0];
this.element._animationInfo.y.initialValue=this.element._animationInfo.y.target=this.element._animationInfo.y.current=p.translation[1];
this.element._animationInfo.rotation.initialValue=this.element._animationInfo.rotation.target=this.element._animationInfo.rotation.current=p.eulerRotation[2];
this.element._animationInfo.scale.initialValue=this.element._animationInfo.scale.target=this.element._animationInfo.scale.current=p.scale[0];
this.element._animationInfo.scaleX.initialValue=this.element._animationInfo.scaleX.target=this.element._animationInfo.scaleX.current=p.scale[0];
this.element._animationInfo.scaleY.initialValue=this.element._animationInfo.scaleY.target=this.element._animationInfo.scaleY.current=p.scale[1];
this.element._animationInfo.opacity.initialValue=this.element._animationInfo.opacity.target=this.element._animationInfo.opacity.current=parseFloat(q.opacity)
};k.prototype.addKeyframe=function(p){var q=null;if(p.indexOf(o.DATA_ATTRIBUTE)!==-1){q=new o(this,p)
}else{if(p.indexOf(m.DATA_ATTRIBUTE)!==-1){q=new m(this,p)}else{if(p.indexOf(a.DATA_ATTRIBUTE)!==-1){q=new a(this,p)
}}}if(!q){throw new Error("Cannot create keyframe for type `"+p+"`")}q.parseOptions(q.jsonProps);
q.id=this._allKeyframes.length;this._allKeyframes.push(q)};k.prototype.needsUpdate=function(){for(var r=0,p=this.attributes.length;
r<p;r++){var q=this.attributes[r];var s=this.element._animationInfo[q];var t=Math.abs(s.current-s.target);
if(t>s.epsilon){return true}}return false};k.prototype.onScrollUpdate=function(t){for(var s=0,p=this.attributes.length;
s<p;s++){var q=this.attributes[s];var u=this.keyframes[this.attributes[s]];if(u.length===1){u[0].onScrollUpdate(t.local);
continue}var r=this.getNearestKeyframeForAttribute(t.local,q,true);if(r){r.onScrollUpdate(t.local)
}}};k.prototype.onKeyframesCreated=function(q){for(var t=0,p=this.attributes.length;
t<p;t++){var r=this.attributes[t];var s=this.getNearestKeyframeForAttribute(q.timelines.local,r,true);
if(s){s.onScrollUpdate(q.timelines.local);if(this.element._animationInfo[r].snapAtCreation){s.reconcile(r)
}}}};k.prototype.determineActiveKeyframes=function(){var v=this;var q=this._activeKeyframes;
var u=this.attributes;this._activeKeyframes=[];this.attributes=[];this.keyframes={};
for(var s=0;s<this._allKeyframes.length;s++){var r=this._allKeyframes[s];if(!r.setEnabled()){continue
}this._activeKeyframes.push(r);for(var w in r.animValues){this.keyframes[w]=this.keyframes[w]||[];
this.keyframes[w].push(r);if(this.attributes.indexOf(w)===-1){this.attributes.push(w)
}}}var t=q.filter(function(x){return v._activeKeyframes.indexOf(x)===-1});if(t.length===0){return
}var p=u.filter(function(x){return v.attributes.indexOf(x)===-1});if(p.length==0){return
}j.external(function(){var y=["x","y","scale","scaleX","scaleY","rotation"];var C=p.filter(function(G){return y.indexOf(G)!==-1
});if(C.length!==-1){v.element.style.removeProperty("transform")}for(var F=0,A=p.length;
F<A;++F){var B=p[F];var z=v.element._animationInfo[B];z.current=z.target=z.initialValue;
if(B==="opacity"){v.element.style.removeProperty("opacity")}}for(var E=0,x=t.length;
E<x;++E){var D=t[E];if(!(D instanceof a)){continue}D._unapply()}})};k.prototype.onDOMRead=function(t){for(var s=0,p=this.attributes.length;
s<p;s++){var q=this.attributes[s];var r=this.getNearestKeyframeForAttribute(t.local,q,true);
if(r){r.onDOMRead(q)}}};k.prototype.onDOMWrite=function(r){var t=this.element._animationInfo;
var q="";if(typeof this.keyframes.rotation!=="undefined"){q+="rotate("+t.rotation.current+"deg) "
}if(typeof this.keyframes.scale!=="undefined"){q+="scale("+t.scale.current+","+t.scale.current+") "
}else{var w=typeof this.keyframes.scaleX!=="undefined";var v=typeof this.keyframes.scaleY!=="undefined";
if(w||v){q+="scale("+t.scaleX.current+","+t.scaleY.current+") "}}if(typeof this.keyframes.y!=="undefined"||typeof this.keyframes.x!=="undefined"){q+="translate("+t.x.current+"px,"+t.y.current+"px)"
}if(q!==""){this.element.style.transform=q}if(typeof this.keyframes.opacity!=="undefined"){this.element.style.opacity=t.opacity.current
}if(this.needsStyleUpdate){for(var p in this.element._animationInfo.targetStyles){if(this.element._animationInfo.targetStyles[p]!==null){this.element.style[p]=this.element._animationInfo.targetStyles[p]
}this.element._animationInfo.targetStyles[p]=null}this.needsStyleUpdate=false}if(this.needsClassUpdate){if(this.element._animationInfo.targetClasses.add.length>0){this.element.classList.add.apply(this.element.classList,this.element._animationInfo.targetClasses.add)
}if(this.element._animationInfo.targetClasses.remove.length>0){this.element.classList.remove.apply(this.element.classList,this.element._animationInfo.targetClasses.remove)
}this.element._animationInfo.targetClasses.add.length=0;this.element._animationInfo.targetClasses.remove.length=0;
this.needsClassUpdate=false}if(this.keyframesRequiringDispatch.length===0){return
}for(var s=0,u=this.keyframesRequiringDispatch.length;s<u;s++){var x=this.keyframesRequiringDispatch[s];
x.needsEventDispatch=false;this.eventObject.keyframe=x;this.eventObject.event=x.event;
this.animSystem.trigger(x.event,this.eventObject)}this.keyframesRequiringDispatch.length=0
};k.prototype.updateAnimationConstraints=function(){var t=this;for(var s=0,p=this.attributes.length;
s<p;s++){var u=this.keyframes[this.attributes[s]];for(var q=0;q<u.length;q++){var r=u[q];
r.updateAnimationConstraints(r.jsonProps)}}this.attributes.forEach(function(v){if(t.keyframes[v].length===1){return
}t.keyframes[v].sort(i.KeyframeComparison)})};k.prototype.getBounds=function(t){for(var s=0,p=this.attributes.length;
s<p;s++){var u=this.keyframes[this.attributes[s]];for(var q=0;q<u.length;q++){var r=u[q];
t.min=Math.min(r.start,t.min);t.max=Math.max(r.end,t.max)}}};k.prototype.getNearestKeyframeForAttribute=function(q,r,w){var t=null;
var y=Number.POSITIVE_INFINITY;var v=this.keyframes[r];var u=v.length;if(u===0){return null
}if(u===1){return v[0]}for(var s=0;s<u;s++){var x=v[s];if(x.isInRange(q)){t=x;break
}var p=Number.POSITIVE_INFINITY;if(w){p=Math.min(Math.abs(q-x.start),Math.abs(q-x.end))
}else{p=Math.min(Math.abs(q-x.start),Math.abs(q-x.end))}if(p<y){y=p;t=x}}return t
};k.prototype.getAllKeyframesForAttribute=function(p){return this.keyframes[p]};
k.prototype.updateAnimation=function(r,q){var p=this;r.parseOptions(q);r.updateAnimationConstraints();
this.animSystem.updateBounds();this.animSystem._onScroll(i.pageMetrics.scrollY);
this.onScrollUpdate(this.animSystem.timelines);this.animSystem.requestDOMChange();
j.update(function(){p.animSystem.trigger(i.EVENTS.ON_KEYFRAME_UPDATED,r)})};Object.defineProperty(k.prototype,"parentElementMetrics",{get:function c(){if(this._parentElementMetrics===null){this._parentElementMetrics=this.animSystem.metrics.add(this.element.parentElement)
}return this._parentElementMetrics}});b.exports=k},{"./Keyframes/AnimatedContentKeyframe":450,"./Keyframes/AnimatedContentKeyframeEvent":451,"./Keyframes/AnimatedContentKeyframeTrigger":452,"./Model/AnimSystemModel":453,"./Model/UUID":456,"./Parsing/ExpressionParser":457,"./Parsing/TimeParser":459,"@marcom/ac-raf-emitter/draw":424,"@marcom/ac-raf-emitter/external":425,"@marcom/ac-raf-emitter/update":426,"@marcom/decompose-css-transform":434}],450:[function(f,g,c){var a=f("../Model/AnimSystemModel");
var b=f("@marcom/sm-math-utils");var h=f("../Model/EasingFunctions");function d(i,j){this.controller=i;
this.relativeTo=i.element;this.relativeToQS="";this.attributeName=j;var k=this.controller.element.getAttribute(this.attributeName);
this.jsonProps=k===null?{}:JSON.parse(k);this.ease=a.KeyframeDefaults.ease;this.easeFunctionString=a.KeyframeDefaults.easeFunctionString;
this.easeFunction=h[this.easeFunctionString];this.start=0;this.end=0;this.localT=0;
this.id=0;this.event="";this.needsEventDispatch=false;this.snapAtCreation=false;
this.isEnabled=false;this.animValues={};this.breakpointMask="SMLX";this.disabledWhen="";
this.keyframeType=a.KeyframeTypes.Interpolation;this.hold=false}d.prototype.constructor=d;
d.prototype.destroy=function(){this.controller=null;this.jsonProps=null;this.easeFunction=null;
this.animValues=null};d.prototype.parseOptions=function(j){if(j.relativeTo===""){this.relativeTo=this.controller.element
}else{if(j.relativeTo){this.relativeToQS=j.relativeTo;this.relativeTo=this.controller.animSystem.element.querySelector(j.relativeTo);
if(this.relativeTo===null){console.warn("AnimatedContentKeyframe for",this,"failed to find 'relativeTo:"+j.relativeTo+"' setting to this.element");
this.relativeTo=this.controller.element}this.controller.animSystem.metrics.add(this.relativeTo)
}}if(j.ease){this.ease=parseFloat(j.ease)}else{j.ease=this.ease}if(j.snapAtCreation){this.snapAtCreation=j.snapAtCreation
}else{j.snapAtCreation=this.snapAtCreation}if(j.easeFunction){this.easeFunction=j.easeFunction
}else{j.easeFunction=this.easeFunctionString}if(j.breakpointMask){this.breakpointMask=j.breakpointMask
}else{j.breakpointMask=this.breakpointMask}if(j.disabledWhen){this.disabledWhen=j.disabledWhen
}else{j.disabledWhen=this.disabledWhen}if(j.hold){this.hold=j.hold}else{j.hold=this.hold
}if(!h.hasOwnProperty(j.easeFunction)){console.error("AnimatedContentKeyframe parseOptions cannot find EasingFunction named '"+j.easingFunction+"'")
}this.easeFunction=h[j.easeFunction];for(var k in j){var l=j[k];if(a.KeyframeJSONReservedWords.indexOf(k)!==-1){continue
}if(!Array.isArray(l)){continue}this.animValues[k]=this.controller.expressionParser.parse(this,l);
if(this.controller.element._animationInfo[k]===undefined){var i=this.animValues[k][0];
this.controller.element._animationInfo[k]=new a.TargetValue(i,0.01,this.snapAtCreation)
}}this.keyframeType=this.hold?a.KeyframeTypes.InterpolationForward:a.KeyframeTypes.Interpolation;
if(j.event){this.event=j.event}};d.prototype.onScrollUpdate=function(j){if(this.start===this.end||j>this.end){this.localT=1;
return}var i=this.hold?this.localT:0;this.localT=b.mapClamp(j,this.start,this.end,i,1)
};d.prototype.reconcile=function(j){var k=this.easeFunction(this.localT);var l=this.animValues[j];
var i=this.controller.element._animationInfo[j];i.target=l[0]+k*(l[1]-l[0]);if(i.current!==i.target){i.current=i.target;
if(!this.needsEventDispatch){this.needsEventDispatch=true;this.controller.keyframesRequiringDispatch.push(this)
}}};d.prototype.reset=function(k){this.localT=k||0;var i=this.ease;this.ease=1;
for(var j in this.animValues){this.reconcile(j)}this.ease=i};d.prototype.onDOMRead=function(k){var l=this.easeFunction(this.localT);
var n=this.animValues[k];var j=this.controller.element._animationInfo[k];j.target=n[0]+l*(n[1]-n[0]);
var i=j.current;j.current+=(j.target-j.current)*this.ease;var m=j.current-j.target;
if(m<j.epsilon&&m>-j.epsilon){j.current=j.target;m=0}if(this.event===""||this.needsEventDispatch){return
}if(m>j.epsilon||m<-j.epsilon||m===0&&i!==j.current){this.needsEventDispatch=true;
this.controller.keyframesRequiringDispatch.push(this)}};d.prototype.isInRange=function(i){return i>=this.start&&i<=this.end
};d.prototype.setEnabled=function(){var j=this.breakpointMask.indexOf(a.pageMetrics.breakpoint)!==-1;
var i=false;if(this.disabledWhen!==""){i=a.DOCUMENT_ELEMENT_CLASSES.indexOf(this.disabledWhen)!==-1
}this.isEnabled=j&&!i;return this.isEnabled};d.prototype.updateAnimationConstraints=function(){this.start=this.controller.timeParser.parse(this,this.jsonProps.start);
this.end=this.controller.timeParser.parse(this,this.jsonProps.end);for(var i in this.animValues){var j=this.jsonProps[i];
this.animValues[i]=this.controller.expressionParser.parse(this,j)}};d.DATA_ATTRIBUTE="data-animated-content";
g.exports=d},{"../Model/AnimSystemModel":453,"../Model/EasingFunctions":454,"@marcom/sm-math-utils":461}],451:[function(d,f,b){var c=d("./AnimatedContentKeyframe");
var a=d("../Model/AnimSystemModel.js");var g=function(o){_inherits(l,o);function l(p,r){_classCallCheck(this,l);
var q=_possibleConstructorReturn(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,p,r));
q.keyframeType=a.KeyframeTypes.Event;q.isApplied=false;q.hasDuration=false;q.isCurrentlyInRange=false;
return q}_createClass(l,[{key:"parseOptions",value:function k(p){p.x=undefined;
p.y=undefined;p.scale=undefined;p.scaleX=undefined;p.scaleY=undefined;p.rotation=undefined;
p.style=undefined;p.cssClass=undefined;p.rotation=undefined;p.opacity=undefined;
p.hold=undefined;if(p.end===undefined){p.end=p.start}this.event=p.event;this.animValues[this.event]=[0,0];
if(typeof this.controller.element._animationInfo[this.event]==="undefined"){this.controller.element._animationInfo[this.event]=new a.TargetValue(0,1,false)
}_get(l.prototype.__proto__||Object.getPrototypeOf(l.prototype),"parseOptions",this).call(this,p);
this.keyframeType=a.KeyframeTypes.Event}},{key:"onScrollUpdate",value:function n(r){if(this.hasDuration){var q=this.isCurrentlyInRange;
var p=r>=this.start&&r<=this.end;if(q===p){return}if(p&&!q){this._trigger(this.event+":enter")
}else{if(q&&!p){this._trigger(this.event+":exit")}}this.isCurrentlyInRange=p;return
}if(!this.isApplied&&r>this.start){this._trigger(this.event);this.isApplied=true
}else{if(this.isApplied&&r<this.start){this.isApplied=false}}}},{key:"_trigger",value:function h(p){this.controller.eventObject.event=p;
this.controller.eventObject.keyframe=this;this.controller.animSystem.trigger(p,this.controller.eventObject)
}},{key:"updateAnimationConstraints",value:function m(){this.start=this.controller.timeParser.parse(this,this.jsonProps.start);
this.end=this.controller.timeParser.parse(this,this.jsonProps.end);this.hasDuration=this.start!==this.end
}},{key:"onDOMRead",value:function j(p,q){}},{key:"reconcile",value:function i(p,q){}}]);
return l}(c);g.DATA_ATTRIBUTE="data-trigger-event";f.exports=g},{"../Model/AnimSystemModel.js":453,"./AnimatedContentKeyframe":450}],452:[function(d,f,b){var c=d("./AnimatedContentKeyframe");
var a=d("../Model/AnimSystemModel.js");function g(h,i){c.call(this,h,i);this.keyframeType=a.KeyframeTypes.Trigger;
this._triggerType=g.TRIGGER_TYPE_CSS_CLASS;this.cssClass="";this.friendlyName="";
this.style={on:null,off:null};this.toggle=false;this.isApplied=false}g.prototype=Object.create(c.prototype);
g.prototype.constructor=g;g.prototype.parseOptions=function(i){i.x=undefined;i.y=undefined;
i.scale=undefined;i.scaleX=undefined;i.scaleY=undefined;i.rotation=undefined;i.opacity=undefined;
i.hold=undefined;if(i.toggle!==undefined){this.toggle=i.toggle}if(i.cssClass!==undefined){this._triggerType=g.TRIGGER_TYPE_CSS_CLASS;
this.cssClass=i.cssClass;this.friendlyName="."+this.cssClass}else{if(i.style!==undefined&&this.isValidStyleProperty(i.style)){this._triggerType=g.TRIGGER_TYPE_STYLE_PROPERTY;
this.style=i.style;this.toggle=this.style.off!==undefined?true:this.toggle;if(this.toggle&&this.style.off===undefined){this.style.off={};
for(var k in this.style.on){this.style.off[k]=""}}}else{throw new TypeError("AnimatedContentKeyframeTrigger no 'cssClass` property found. If using `style` property its also missing or invalid")
}}if(i.end===undefined){i.end=i.start}if(this._triggerType===g.TRIGGER_TYPE_CSS_CLASS){this.isApplied=this.controller.element.classList.contains(this.cssClass)
}else{var h=getComputedStyle(this.controller.element);this.isApplied=true;for(var j in this.style.on){if(h[j]!==this.style.on[j]){this.isApplied=false;
break}}}c.prototype.parseOptions.call(this,i);this.animValues[this.friendlyName]=[0,0];
if(this.controller.element._animationInfo[this.friendlyName]===undefined){this.controller.element._animationInfo[this.friendlyName]=new a.TargetValue(0,1,false)
}this.keyframeType=a.KeyframeTypes.Trigger};g.prototype.onScrollUpdate=function(h){if(this.isApplied&&!this.toggle){return
}if(this.start!==this.end){if(!this.isApplied&&h>this.start&&h<this.end){this._apply()
}else{if(this.isApplied&&this.toggle&&(h<this.start||h>this.end)){this._unapply()
}}}else{if(!this.isApplied&&h>this.start){this._apply()}else{if(this.isApplied&&this.toggle&&h<this.start){this._unapply()
}}}};g.prototype._apply=function(){if(this._triggerType===g.TRIGGER_TYPE_CSS_CLASS){this.controller.element._animationInfo.targetClasses.add.push(this.cssClass);
this.controller.needsClassUpdate=true}else{for(var h in this.style.on){this.controller.element._animationInfo.targetStyles[h]=this.style.on[h]
}this.controller.needsStyleUpdate=true}this.isApplied=true};g.prototype._unapply=function(){if(this._triggerType===g.TRIGGER_TYPE_CSS_CLASS){this.controller.element._animationInfo.targetClasses.remove.push(this.cssClass);
this.controller.needsClassUpdate=true}else{for(var h in this.style.off){this.controller.element._animationInfo.targetStyles[h]=this.style.off[h]
}this.controller.needsStyleUpdate=true}this.isApplied=false};g.prototype.updateAnimationConstraints=function(){this.start=this.controller.timeParser.parse(this,this.jsonProps.start);
this.end=this.controller.timeParser.parse(this,this.jsonProps.end)};g.prototype.isValidStyleProperty=function(h){if(!h.hasOwnProperty("on")){return false
}if(_typeof(h.on)!=="object"){throw new TypeError("AnimatedContentKeyframeTrigger `style` property should be in the form of: {on:{visibility:hidden, otherProperty: value}}")
}if(this.toggle&&h.hasOwnProperty("off")&&_typeof(h.off)!=="object"){throw new TypeError("AnimatedContentKeyframeTrigger `style` property should be in the form of: {on:{visibility:hidden, otherProperty: value}}")
}return true};g.prototype.reconcile=function(h,i){};g.prototype.onDOMRead=function(h,i){};
g.TRIGGER_TYPE_CSS_CLASS=0;g.TRIGGER_TYPE_STYLE_PROPERTY=1;g.DATA_ATTRIBUTE="data-trigger";
f.exports=g},{"../Model/AnimSystemModel.js":453,"./AnimatedContentKeyframe":450}],453:[function(d,b,f){var k={COMPONENT_NAME:"AnimSystem",DOCUMENT_ELEMENT_CLASSES:[],RESIZE_TIMEOUT:-1,BREAKPOINTS:[{name:"S",min:0,max:735,fullName:"small"},{name:"M",min:736,max:1068,fullName:"medium"},{name:"L",min:1069,max:Number.POSITIVE_INFINITY,fullName:"large"}],getBreakpoint:function c(){for(var l=0;
l<k.BREAKPOINTS.length;l++){var m=k.BREAKPOINTS[l];if(k.pageMetrics.windowWidth<=m.max){return m.name
}}console.warn("AnimSystem Could not determine breakpoint via ViewportEmitter or internal reasonable defaults")
},KeyframeDefaults:{ease:0.1,easeFunctionString:"linear",easeFunction:"linear",relativeToQS:"",snapAtCreation:false,breakpointMask:"SMLX",cssClass:""},KeyframeTypes:{Interpolation:0,InterpolationForward:1,Trigger:2,Event:3},EVENTS:{ON_CONSTRAINTS_UPDATED:"ON_CONSTRAINTS_UPDATED",ON_KEYFRAMES_CREATED:"ON_KEYFRAMES_CREATED",ON_KEYFRAME_UPDATED:"ON_KEYFRAME_UPDATED",ON_UPDATE_T_LOCAL:"ON_UPDATE_T_LOCAL"},KeyframeJSONReservedWords:["event","relativeTo","start","end","easeFunction","easing","breakpointMask"],TargetValue:function g(l,n,m){this.epsilon=parseFloat(n);
this.snapAtCreation=m;this.initialValue=l;this.target=0;this.current=0},Timeline:function h(){this.local=0;
this.localUnclamped=0},KeyFrames:function i(l,m){this.a=l.top-m;if(this.a<0){this.a=l.top
}this.b=l.top;this.d=l.bottom;this.c=Math.max(this.d-m,this.b)},pageMetrics:new function(){this.scrollY=0;
this.windowHeight=0;this.windowWidth=0;this.breakpoint=""}(),EventObject:function j(l,m){this.controller=l;
this.element=this.controller.element;this.keyframe=m;this.event="";this.animationInfo=this.element._animationInfo
},KeyframeComparison:function a(m,l){if(m.start<l.start){return -1}else{if(m.start>l.start){return 1
}}return 0}};b.exports=k},{}],454:[function(b,c,a){var d=function d(){_classCallCheck(this,d);
this.linear=function(f){return f},this.easeInQuad=function(f){return f*f},this.easeOutQuad=function(f){return f*(2-f)
},this.easeInOutQuad=function(f){return f<0.5?2*f*f:-1+(4-2*f)*f},this.easeInCubic=function(f){return f*f*f
},this.easeOutCubic=function(f){return --f*f*f+1},this.easeInOutCubic=function(f){return f<0.5?4*f*f*f:(f-1)*(2*f-2)*(2*f-2)+1
},this.easeInQuart=function(f){return f*f*f*f},this.easeOutQuart=function(f){return 1- --f*f*f*f
},this.easeInOutQuart=function(f){return f<0.5?8*f*f*f*f:1-8*--f*f*f*f},this.easeInQuint=function(f){return f*f*f*f*f
},this.easeOutQuint=function(f){return 1+ --f*f*f*f*f},this.easeInOutQuint=function(f){return f<0.5?16*f*f*f*f*f:1+16*--f*f*f*f*f
}};c.exports=new d()},{}],455:[function(d,f,b){var g=window.Symbol||function(){var h=0;
return function(){return ++h+""}}();var a=function(){function h(){_classCallCheck(this,h);
this._symbols=[];this._lut={}}_createClass(h,[{key:"destroy",value:function k(){for(var o=0,n=this._symbols.length;
o<n;o++){var p=this._lut[this._symbols[o]];p.el.__animSystemSymbol=null;p.el=null
}this._lut=null}},{key:"add",value:function m(o){if(o.__animSystemSymbol===undefined){o.__animSystemSymbol=g()
}if(this._lut[o.__animSystemSymbol]===undefined){var n=new c(o);this._refreshMetrics(n);
this._lut[o.__animSystemSymbol]=n;this._symbols.push(o.__animSystemSymbol)}return this._lut[o.__animSystemSymbol]
}},{key:"get",value:function i(n){return this._lut[n.__animSystemSymbol]}},{key:"refreshAll",value:function j(){for(var o=0,n=this._symbols.length;
o<n;o++){var p=this._lut[this._symbols[o]];this._refreshMetrics(p)}}},{key:"_refreshMetrics",value:function l(o){var n=o.el;
if(n.offsetWidth===undefined){var q=n.getBoundingClientRect();o.width=q.width;o.height=q.height;
o.top=window.pageYOffset+q.top;o.left=window.pageXOffset+q.left;o.right=o.left+o.width;
o.bottom=o.top+o.height;return}o.width=n.offsetWidth;o.height=n.offsetHeight;o.top=0;
o.left=0;var p=n;while(p){o.top+=p.offsetTop;o.left+=p.offsetLeft;p=p.offsetParent
}o.right=o.left+o.width;o.bottom=o.top+o.height}}]);return h}();var c=function(){function h(k){_classCallCheck(this,h);
this.el=k;this.top=0;this.bottom=0;this.left=0;this.right=0;this.height=0;this.width=0
}_createClass(h,[{key:"toString",value:function j(){return"top:"+top+", bottom:"+bottom+", left:"+left+", right:"+right+", height:"+height+", width:"+width
}},{key:"toObject",value:function i(){return{top:this.top,bottom:this.bottom,left:this.left,right:this.right,height:this.height,width:this.width}
}}]);return h}();f.exports=a},{}],456:[function(b,c,a){c.exports=function d(){var f="";
for(var g=0;g<32;g++){var h=Math.random()*16|0;if(g===8||g===12||g===16||g===20){f+="-"
}f+=(g===12?4:g===16?h&3|8:h).toString(16)}return f}},{}],457:[function(d,f,b){var a=d("../Model/AnimSystemModel");
var g=d("./Operations");var i=/([-|\+])?(\d+\.?\d*)(px|vh|vw|pw|ph|\%w|\%h|rw|rh|\%)?|(-|\+|\*|\/)/g;
var h=/(px|vh|vw|pw|ph|\%w|\%h|rw|rh|\%)/g;var c=function(){function q(s){_classCallCheck(this,q);
this.controller=s}_createClass(q,[{key:"parse",value:function m(s,t){if(Array.isArray(t)){return this.parseArray(s,t)
}else{throw new Error("AnimatedContentKeyframe value `"+t+"` is not supported. Only arrays in the form of [start,end] are currently supported")
}}},{key:"parseArray",value:function k(t,w){var x=0;var s=0;var v=w[0];var u=w[1];
if(typeof v==="number"){x=v}else{x=this.parseExpression(t,v)}if(typeof u==="number"){s=u
}else{s=this.parseExpression(t,u)}return[x,s]}},{key:"parseExpression",value:function j(z,J){if(typeof J==="number"){return J
}var w=5;var t=void 0;while((t=J.indexOf("("))!==-1&&--w>0){var u=this.captureParenthesis(J,t);
var D=this.parseExpression(z,u);J=J.replace("("+u+")",D)}var A=void 0;var H=[];
while((A=i.exec(J))!==null){if(A.index===i.lastIndex){i.lastIndex++}if(A[4]){H.push(g.GetOpCode(A[4]))
}else{var B=A[1];var G=parseFloat(A[2]);var F=A[3];if(B==="-"){G*=-1}var M=this.parseSplitUnit(z,G,F);
H.push(M)}}var L=H.length;if(L===3){return H[1](H[0],H[2])}for(var x=0;x<L;x++){if(typeof H[x]==="function"&&H[x].priority===1){var I=H[x-1];
var y=H[x+1];var E=H[x](I,y);H[x-1]=null;H[x+0]=null;H[x+1]=E;x+=1}}var K=0;while(H[K]==null&&K<L){K+=1
}var v=H[K];var C=null;var s=null;for(K=K+1;K<L;K++){if(H[K]===null){K+=1;continue
}if(H[K] instanceof Function){C=H[K];continue}if(s===null){s=H[K]}if(s!==null){C=C||g.add;
v=C(v,s);C=null;s=null}}return v}},{key:"parseSplitUnit",value:function o(s,u,t){if(typeof t==="undefined"){return parseFloat(u)
}switch(t){case"vh":return u*0.01*a.pageMetrics.windowHeight;break;case"%":return u*0.01*this.controller.elementMetrics.height;
break;case"px":return u;break;case"rh":return u*0.01*this.controller.animSystem.metrics.get(s.relativeTo).height;
break;case"vw":return u*0.01*a.pageMetrics.windowWidth;break;case"rw":return u*0.01*this.controller.animSystem.metrics.get(s.relativeTo).width;
break;case"%w":return u*0.01*this.controller.elementMetrics.width;break;case"%h":return u*0.01*this.controller.elementMetrics.height;
break;case"pw":return u*0.01*this.controller.parentElementMetrics.width;break;case"ph":return u*0.01*this.controller.parentElementMetrics.height;
break;default:throw new Error("AnimatedContentKeyframe no strategy found for unit `"+t+"` only `vh, vw, %, ph, pw` are supported")
}return 0}},{key:"captureParenthesis",value:function p(y,x){var t="";var w=0;var v=false;
var s=y.length;for(var u=x;u<s;u++){if(y[u]==="("){w+=1;if(v){t+=y[u]}v=true}else{if(y[u]===")"){w-=1;
if(w!==0){t+=y[u]}}else{if(v){t+=y[u]}}}if(v&&w===0){return t}}}},{key:"isUnitlessNumber",value:function l(s){return String(s).match(h)===null
}},{key:"destroy",value:function r(){this.controller=null}},{key:"logParts",value:function n(s){console.log(s.reduce(function(t,u){if(typeof u==="function"){return t+u.friendlyName+" "
}return t+(u+" ")},""))}}]);return q}();f.exports=c},{"../Model/AnimSystemModel":453,"./Operations":458}],458:[function(b,c,a){var d=function d(){_classCallCheck(this,d);
this.sub=function(f,g){return f-g};this.add=function(f,g){return f+g};this.mul=function(f,g){return f*g
};this.div=function(f,g){return f/g};this.add.friendlyName="add";this.sub.friendlyName="sub";
this.mul.friendlyName="mul";this.div.friendlyName="div";this.add.priority=0;this.sub.priority=0;
this.mul.priority=1;this.div.priority=1;this.GetOpCode=function(f){switch(f){case"-":return this.sub;
break;case"+":return this.add;break;case"*":return this.mul;break;case"/":return this.div;
break;default:throw new Error('AnimSystem.parsing.Operations - op code "'+f+"\" was found. Only '+ - * /' are supported. Check expression for typos/spacing issues")
}}};c.exports=new d()},{}],459:[function(b,c,a){var d=function(){function g(i){_classCallCheck(this,g);
this.controller=i}_createClass(g,[{key:"parse",value:function h(l,m){if(typeof m==="number"){return m
}var k=this.controller.animSystem.metrics.get(l.relativeTo).top;var i=this.controller.expressionParser.parseExpression(l,m);
var j=i+k;return this.controller.animSystem.convertScrollPositionToTValue(j)}},{key:"destroy",value:function f(){this.controller=null
}}]);return g}();c.exports=d},{}],460:[function(d,f,c){var b=function b(){};b.destroy=function(){};
b.setupEvents=function(){};b.teardownEvents=function(){};b.onSectionWillAppearWithPadding=function(g,h){};
b.onSectionWillAppear=function(g,h){};b.activate=function(){};b.deactivate=function(){};
b.animateIn=function(){};b.onScroll=function(h,g,i){};b.onSectionWillDisappearWithPadding=function(g,h){};
b.onSectionWillDisappear=function(g,h){};b.onResizeImmediate=function(h,g,i){};
b.onResizeDebounced=function(h,g,i){};b.onBreakpoint=function(h,j,g,i){};b.onRetinaChange=function(j,h,g,i){};
b.onOrientationChange=function(i,h,g,j){};f.exports={make:function a(h,g){h.section=g[0];
h.element=g[1];h.index=g[6];h.componentName="AnimSystem";h.destroy=b.destroy;h.setupEvents=b.setupEvents;
h.teardownEvents=b.teardownEvents;h.onSectionWillAppearWithPadding=b.onSectionWillAppearWithPadding;
h.onSectionWillAppear=b.onSectionWillAppear;h.activate=b.activate;h.deactivate=b.deactivate;
h.animateIn=b.animateIn;h.onScroll=b.onScroll;h.onSectionWillDisappearWithPadding=b.onSectionWillDisappearWithPadding;
h.onSectionWillDisappear=b.onSectionWillDisappear;h.onResizeImmediate=b.onResizeImmediate;
h.onResizeDebounced=b.onResizeDebounced;h.onOrientationChange=b.onOrientationChange;
h.onBreakpoint=b.onBreakpoint;h.onRetinaChange=b.onRetinaChange}}},{}],461:[function(d,c,h){c.exports={lerp:function f(m,n,l){return n+(l-n)*m
},map:function b(o,n,l,m,p){return m+(p-m)*(o-n)/(l-n)},mapClamp:function k(o,n,l,m,q){var p=m+(q-m)*(o-n)/(l-n);
return Math.max(m,Math.min(q,p))},norm:function a(n,m,l){return(n-m)/(l-m)},clamp:function j(n,m,l){return Math.max(m,Math.min(l,n))
},randFloat:function g(m,l){return Math.random()*(l-m)+m},randInt:function i(m,l){return Math.floor(Math.random()*(l-m)+m)
}}},{}],462:[function(b,c,a){},{}],463:[function(b,c,a){(function(j){function h(o,l){var k=0;
for(var m=o.length-1;m>=0;m--){var n=o[m];if(n==="."){o.splice(m,1)}else{if(n===".."){o.splice(m,1);
k++}else{if(k){o.splice(m,1);k--}}}}if(l){for(;k--;k){o.unshift("..")}}return o
}var g=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;var d=function d(k){return g.exec(k).slice(1)
};a.resolve=function(){var m="",k=false;for(var l=arguments.length-1;l>=-1&&!k;
l--){var n=l>=0?arguments[l]:j.cwd();if(typeof n!=="string"){throw new TypeError("Arguments to path.resolve must be strings")
}else{if(!n){continue}}m=n+"/"+m;k=n.charAt(0)==="/"}m=h(f(m.split("/"),function(o){return !!o
}),!k).join("/");return(k?"/":"")+m||"."};a.normalize=function(m){var l=a.isAbsolute(m),k=i(m,-1)==="/";
m=h(f(m.split("/"),function(n){return !!n}),!l).join("/");if(!m&&!l){m="."}if(m&&k){m+="/"
}return(l?"/":"")+m};a.isAbsolute=function(k){return k.charAt(0)==="/"};a.join=function(){var k=Array.prototype.slice.call(arguments,0);
return a.normalize(f(k,function(m,l){if(typeof m!=="string"){throw new TypeError("Arguments to path.join must be strings")
}return m}).join("/"))};a.relative=function(q,r){q=a.resolve(q).substr(1);r=a.resolve(r).substr(1);
function m(t){var v=0;for(;v<t.length;v++){if(t[v]!==""){break}}var u=t.length-1;
for(;u>=0;u--){if(t[u]!==""){break}}if(v>u){return[]}return t.slice(v,u-v+1)}var p=m(q.split("/"));
var l=m(r.split("/"));var k=Math.min(p.length,l.length);var s=k;for(var o=0;o<k;
o++){if(p[o]!==l[o]){s=o;break}}var n=[];for(var o=s;o<p.length;o++){n.push("..")
}n=n.concat(l.slice(s));return n.join("/")};a.sep="/";a.delimiter=":";a.dirname=function(n){var k=d(n),l=k[0],m=k[1];
if(!l&&!m){return"."}if(m){m=m.substr(0,m.length-1)}return l+m};a.basename=function(m,k){var l=d(m)[2];
if(k&&l.substr(-1*k.length)===k){l=l.substr(0,l.length-k.length)}return l};a.extname=function(k){return d(k)[3]
};function f(k,n){if(k.filter){return k.filter(n)}var m=[];for(var l=0;l<k.length;
l++){if(n(k[l],l,k)){m.push(k[l])}}return m}var i="ab".substr(-1)==="b"?function(l,m,k){return l.substr(m,k)
}:function(l,m,k){if(m<0){m=l.length+m}return l.substr(m,k)}}).call(this,b("_process"))
},{_process:464}],464:[function(g,a,s){var j=a.exports={};var k;var m;function h(){throw new Error("setTimeout has not been defined")
}function q(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){k=setTimeout
}else{k=h}}catch(t){k=h}try{if(typeof clearTimeout==="function"){m=clearTimeout
}else{m=q}}catch(t){m=q}})();function f(t){if(k===setTimeout){return setTimeout(t,0)
}if((k===h||!k)&&setTimeout){k=setTimeout;return setTimeout(t,0)}try{return k(t,0)
}catch(u){try{return k.call(null,t,0)}catch(u){return k.call(this,t,0)}}}function d(t){if(m===clearTimeout){return clearTimeout(t)
}if((m===q||!m)&&clearTimeout){m=clearTimeout;return clearTimeout(t)}try{return m(t)
}catch(u){try{return m.call(null,t)}catch(u){return m.call(this,t)}}}var n=[];var r=false;
var i;var o=-1;function l(){if(!r||!i){return}r=false;if(i.length){n=i.concat(n)
}else{o=-1}if(n.length){p()}}function p(){if(r){return}var u=f(l);r=true;var t=n.length;
while(t){i=n;n=[];while(++o<t){if(i){i[o].run()}}o=-1;t=n.length}i=null;r=false;
d(u)}j.nextTick=function(t){var u=new Array(arguments.length-1);if(arguments.length>1){for(var v=1;
v<arguments.length;v++){u[v-1]=arguments[v]}}n.push(new b(t,u));if(n.length===1&&!r){f(p)
}};function b(t,u){this.fun=t;this.array=u}b.prototype.run=function(){this.fun.apply(null,this.array)
};j.title="browser";j.browser=true;j.env={};j.argv=[];j.version="";j.versions={};
function c(){}j.on=c;j.addListener=c;j.once=c;j.off=c;j.removeListener=c;j.removeAllListeners=c;
j.emit=c;j.prependListener=c;j.prependOnceListener=c;j.listeners=function(t){return[]
};j.binding=function(t){throw new Error("process.binding is not supported")};j.cwd=function(){return"/"
};j.chdir=function(t){throw new Error("process.chdir is not supported")};j.umask=function(){return 0
}},{}],465:[function(b,a,f){var c=b("@marcom/ac-jetpack-lib/core/BaseComponent");
var h=b("@marcom/ac-dom-styles/getStyle");var j=b("@marcom/ac-asset-loader").AssetLoader;
var k={draw:b("@marcom/ac-raf-emitter/draw")};var g=null;try{g=b("ac-analytics")
}catch(d){}var i=function(n){_inherits(r,n);function r(C,u,y,t,A,s,x){_classCallCheck(this,r);
var v=_possibleConstructorReturn(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments));
v.onLoadSuccess=v.onLoadSuccess.bind(v);v.navElements={localNav:document.querySelector("#ac-localnav")||null,globalNav:document.querySelector("#ac-globalnav")||null,segmentBar:document.querySelector("#ac-gn-segmentbar")||null,localeSwitcher:document.querySelector("#ac-localeswitcher")||null};
v.navigationHasAnimatedIn=false;if(g){v.analyticsObserver=new g.observer.Event(v);
var w=[];var D=!!document.querySelector("html.hero-masks");if(D){w=w.concat([".image-hero-primary",".image-hero-primary-8-shimmer",".image-hero-primary-iphone8plus-8-reflection",".image-hero-primary-iphone8plus",".image-hero-primary-iphone8-desat-reflection",".image-hero-primary-iphone8-fullsat-reflection",".image-hero-primary-iphone8",".image-hero-primary-iphone8plus-reflection"])
}else{w.push(".image-hero-primary-iphone8-combo-fallback")}var z=/url\(\s*(['"]?)(.*?)\1\s*\)/g;
w=w.map(function(F){var G=v.element.querySelector(F);if(G){var E=h(G,"background-image");
if(E&&E.backgroundImage){var H=z.exec(E.backgroundImage);return H?H[2]:""}}return""
}).filter(function(E){return !!E});var B=new j(w);B.load().then(v.onLoadSuccess)
}return v}_createClass(r,[{key:"setupEvents",value:function m(){this.showNav()}},{key:"showNav",value:function q(t){var s=this;
k.draw(function(){if(!s.navigationHasAnimatedIn){s.navigationHasAnimatedIn=true;
for(var u in s.navElements){if(s.navElements[u]!==null){s.navElements[u].classList.add("animate-in")
}}}})}},{key:"onSectionWillAppear",value:function l(s,t){this.element.classList.add("is-visible")
}},{key:"onSectionWillDisappear",value:function p(s,t){this.element.classList.remove("is-visible")
}},{key:"onLoadSuccess",value:function o(){this.analyticsObserver.track({eVar70:"hero assets loaded",title:"hero assets loaded"})
}}]);return r}(c);a.exports=i},{"@marcom/ac-asset-loader":11,"@marcom/ac-dom-styles/getStyle":43,"@marcom/ac-jetpack-lib/core/BaseComponent":200,"@marcom/ac-raf-emitter/draw":424,"ac-analytics":undefined}],466:[function(d,c,g){var k=d("@marcom/ac-jetpack-fuel/components/media-object/MediaObjectComponent");
var f=d("@marcom/ac-raf-emitter/update");var l=d("@marcom/ac-raf-emitter/draw");
var h=d("../shared/inlineVideoAutoplaySupported");var i=["large","medium","small"];
var m="/105/media/{{locale}}/iphone-8/2017/95d4d604-018c-4bb3-a900-2d84eb37a5d7/{{name}}/{{viewport}}";
k.URI_PATTERN=m;var b={};var j={SCOPE:"data-media-scope",CONTROLS:"data-media-controls-{{scope}}",PLAY:"data-media-play",REPLAY:"data-media-replay"};
var a=function(F){_inherits(H,F);_createClass(H,null,[{key:"IS_SUPPORTED",value:function o(){return h()
}}]);function H(){_classCallCheck(this,H);var L=_possibleConstructorReturn(this,(H.__proto__||Object.getPrototypeOf(H)).apply(this,arguments));
L._mediaControls={scope:L.element.hasAttribute(j.SCOPE)?L.element.getAttribute(j.SCOPE):null,play:null,replay:null};
L._getControlElements();L._state={reduceMotion:window.matchMedia("(prefers-reduced-motion)").matches};
L._allowMediaPauseOnModalOpen=document.documentElement.classList.contains("high-gpu");
return L}_createClass(H,[{key:"_getControlElements",value:function A(){var M=j.CONTROLS.replace(/{{scope}}/,this._mediaControls.scope);
var L=this.section.element.querySelector("["+M+"]");if(L){this._mediaControls.play=L.querySelector("["+j.PLAY+"]");
this._mediaControls.replay=L.querySelector("["+j.REPLAY+"]")}}},{key:"_onElementEngaged",value:function x(L){this.element.classList.add("engaged");
if(this._media&&(!this._isEngaged||!this._media.getEnded()||this.rewindWhenInactive||this.loop)&&!this._state.reduceMotion){this._isEngaged=true;
this._playMedia()}}},{key:"_onMediaEnhanced",value:function J(){var L=this;_get(H.prototype.__proto__||Object.getPrototypeOf(H.prototype),"_onMediaEnhanced",this).call(this);
l(function(){if(L._state.reduceMotion&&L._mediaControls.play){L._mediaControls.play.disabled=false;
L._mediaControls.play.classList.add("active")}})}},{key:"_onControlClickPlay",value:function I(){var L=this;
l(function(){L._mediaControls.play.disabled=true;L._mediaControls.play.classList.remove("active")
});this._mediaControls.play.removeEventListener("click",this._onControlClickPlay);
this._playMedia()}},{key:"_onControlClickReplay",value:function q(){this._playMedia()
}},{key:"_onMediaPlay",value:function K(){var L=this;l(function(){if(L._mediaControls.replay){L._mediaControls.replay.disabled=true
}})}},{key:"_onMediaEnded",value:function C(){var L=this;l(function(){if(L._mediaControls.replay){L._mediaControls.replay.disabled=false;
L._mediaControls.replay.classList.add("active")}})}},{key:"_setupControlsEvents",value:function s(){this._onControlClickPlay=this._onControlClickPlay.bind(this);
this._onControlClickReplay=this._onControlClickReplay.bind(this);this._onMediaPlay=this._onMediaPlay.bind(this);
this._onMediaEnded=this._onMediaEnded.bind(this);this._media.on("play",this._onMediaPlay);
this._media.on("ended",this._onMediaEnded);if(this._mediaControls.play){this._mediaControls.play.addEventListener("click",this._onControlClickPlay)
}if(this._mediaControls.replay){this._mediaControls.replay.addEventListener("click",this._onControlClickReplay)
}}},{key:"_teardownControlsEvents",value:function p(){if(this._media){this._media.off("play",this._onMediaPlay);
this._media.off("ended",this._onMediaEnded)}if(this._mediaControls.play){this._mediaControls.play.removeEventListener("click",this._onControlClickPlay)
}if(this._mediaControls.replay){this._mediaControls.replay.removeEventListener("click",this._onControlClickReplay)
}}},{key:"_resetControls",value:function y(){if(this._mediaControls.play){this._mediaControls.play.classList.remove("active");
this._mediaControls.play.disabled=true}if(this._mediaControls.replay){this._mediaControls.replay.classList.remove("active");
this._mediaControls.replay.disabled=true}}},{key:"_rebuildIfChanged",value:function E(P,O){var N=JSON.stringify(this._getMediaSource());
this[P]=O;var M=JSON.stringify(this._getMediaSource());if(N!=M){var L=this._mediaIsPlaying;
this._teardownControlsEvents();this._resetControls();this._destroyMedia();this._initializeMedia();
this._setupControlsEvents();if(this._isSectionVisible){if(L&&!this._state.reduceMotion){this._playMedia()
}else{this._loadMedia()}}}}},{key:"setupEvents",value:function t(){var L=this;_get(H.prototype.__proto__||Object.getPrototypeOf(H.prototype),"setupEvents",this).call(this);
this._didPlay=false;this._media.once("play",function(){L._didPlay=true});this._setupControlsEvents()
}},{key:"teardownEvents",value:function D(){this._teardownControlsEvents();_get(H.prototype.__proto__||Object.getPrototypeOf(H.prototype),"teardownEvents",this).call(this)
}},{key:"destroy",value:function G(){this._resetControls();_get(H.prototype.__proto__||Object.getPrototypeOf(H.prototype),"destroy",this).call(this)
}},{key:"_destroyMedia",value:function n(){if(this._media){this._media.off();this._pauseMedia();
if(!this._media.getDestroyed()){this._media._destroy();this._media._setDestroyed(true);
this._media.model.off();this._media.off()}this._media.destroy();this._media=null;
this._canLoad=true;this._loadCalled=false;this._enhanceCalled=false;this._mediaIsPlaying=false;
this._mediaHasPlayed=false;this._isShown=false;this._playOnceReady=false}if(this._fadeClip&&this._fadeClip.playing()){this._fadeClip.destroy();
this._fadeClip=null}}},{key:"hideVideo",value:function v(L){var M=this;this.isEnabled=false;
l(function(){if(M._mediaIsPlaying){M._media.pause();M._media.goToPercent(1)}l(function(){M._media.mediaElement.style.display="none";
if(L){l(function(){L()})}})})}},{key:"showVideo",value:function r(L){var M=this;
this.isEnabled=true;l(function(){M._media.mediaElement.style.display="";if(L){l(function(){L()
})}})}},{key:"modalWillOpen",value:function B(M){var L=this;f(function(){if(L._allowMediaPauseOnModalOpen&&L._media.el.classList.contains("element-in-view")){l(function(){L._pauseMedia();
M()});return}L.hideVideo(M)})}},{key:"modalDidOpen",value:function w(L){this.showVideo(L)
}},{key:"modalWillClose",value:function u(M){var L=this;f(function(){if(L._allowMediaPauseOnModalOpen&&L._media.el.classList.contains("element-in-view")){l(function(){L._pauseMedia();
M();M=null});return}L.hideVideo(M);M=null})}},{key:"modalDidClose",value:function z(L){var M=this;
f(function(){if(M._allowMediaPauseOnModalOpen&&M._media&&M._media.el.classList.contains("element-in-view")){if(!M._media.getEnded()&&M._didPlay){l(function(){M.showVideo();
M._playMedia();L();L=null});return}}M.showVideo(L);L=null})}}]);return H}(k);c.exports=a
},{"../shared/inlineVideoAutoplaySupported":484,"@marcom/ac-jetpack-fuel/components/media-object/MediaObjectComponent":189,"@marcom/ac-raf-emitter/draw":424,"@marcom/ac-raf-emitter/update":426}],467:[function(d,b,i){var f=d("@marcom/ac-jetpack-lib/core/BaseComponent");
var j=d("@marcom/ac-jetpack-lib/utils/Page");var c=d("@marcom/ac-useragent");var g=d("@marcom/ac-feature");
var h=d("@marcom/ac-raf-emitter/update");var k=d("@marcom/ac-raf-emitter/draw");
var a=function(m){_inherits(l,m);function l(A,D,w,z,x,C,y){_classCallCheck(this,l);
var B=_possibleConstructorReturn(this,(l.__proto__||Object.getPrototypeOf(l)).apply(this,arguments));
B.modalName=D.getAttribute("data-modal-content");B.modalHeroContent=Array.from(D.querySelectorAll("[data-load-images-with-primary] [data-visibility-trigger]"));
return B}_createClass(l,[{key:"setupEvents",value:function r(){this._animSystems=this.section.getAllComponentsOfType("AnimSystem");
this.disableAnimSystems()}},{key:"enableAnimSystems",value:function o(){this._animSystems.forEach(function(w){w.isEnabled=true
})}},{key:"disableAnimSystems",value:function v(){this._animSystems.forEach(function(w){w.isEnabled=false
})}},{key:"activateModalHeroContent",value:function q(){this.modalHeroContent.forEach(function(w){w.classList.add("content-active")
})}},{key:"recalcModalAnimSystems",value:function n(){this._animSystems.forEach(function(w){w._onResizeDebounced(true)
})}},{key:"destroy",value:function u(){_get(l.prototype.__proto__||Object.getPrototypeOf(l.prototype),"destroy",this).call(this)
}},{key:"modalWillOpen",value:function t(x,w,y){var z=this;if(y.name!==this.modalName){x();
return}k(function(){z.activateModalHeroContent();x()})}},{key:"modalDidOpen",value:function p(x,w,z){var y=this;
if(z.name!==this.modalName){x();return}this.enableAnimSystems();h(function(){y.recalcModalAnimSystems();
x()})}},{key:"modalWillClose",value:function s(x,w,y){if(y.name!==this.modalName){x();
return}this.disableAnimSystems();x()}}]);return l}(f);b.exports=a},{"@marcom/ac-feature":163,"@marcom/ac-jetpack-lib/core/BaseComponent":200,"@marcom/ac-jetpack-lib/utils/Page":207,"@marcom/ac-raf-emitter/draw":424,"@marcom/ac-raf-emitter/update":426,"@marcom/ac-useragent":427}],468:[function(f,h,d){var c=f("@marcom/ac-jetpack-lib/core/BaseComponent");
var g=c.prototype;var a=f("@marcom/ac-raf-emitter/draw");var i="modal-content-width-active";
var b=function(m){_inherits(k,m);function k(s,u,n,q,o,t,p){_classCallCheck(this,k);
var r=_possibleConstructorReturn(this,(k.__proto__||Object.getPrototypeOf(k)).apply(this,arguments));
r.classTarget=document.documentElement;return r}_createClass(k,[{key:"modalWillOpen",value:function l(p,o,q){var n=this;
a(function(){n.classTarget.classList.add(i);p()})}},{key:"modalDidClose",value:function j(p,o,q){var n=this;
a(function(){n.classTarget.classList.remove(i);p()})}}]);return k}(c);h.exports=b
},{"@marcom/ac-jetpack-lib/core/BaseComponent":200,"@marcom/ac-raf-emitter/draw":424}],469:[function(c,a,h){var d=c("@marcom/ac-jetpack-lib/core/BaseComponent");
var j=d.prototype;var b=c("@marcom/ac-useragent");var f=c("@marcom/ac-feature");
var g=c("@marcom/ac-raf-emitter/update");function k(p,r,l,o,m,q,n){d.apply(this,arguments)
}var i=k.prototype=Object.create(d.prototype);i.setupEvents=function(){this._animSystems=this.section.getAllComponentsOfType("AnimSystem")
};i.destroy=function(){j.destroy.call(this)};i.recalcModalAnimSystems=function(){this._animSystems.forEach(function(l){l._onResizeDebounced(true)
})};i.modalWillOpen=function(l){this._animSystems.forEach(function(m){m.isEnabled=false
});l()};i.modalWillClose=function(m){var l=this;if(this._getAllowAnimRefreshOnWillClose()){setTimeout(function(){l._handleModalClose()
},250)}m()};i.modalDidClose=function(l){if(!this._getAllowAnimRefreshOnWillClose()){this._handleModalClose(l);
return}l()};i._handleModalClose=function(m){var l=this;this._animSystems.forEach(function(n){n.isEnabled=true
});g(function(){l.recalcModalAnimSystems();if(m){m()}})};i._getAllowAnimRefreshOnWillClose=function(){if(b.browser.chrome&&!b.os.android){return true
}return false};a.exports=k},{"@marcom/ac-feature":163,"@marcom/ac-jetpack-lib/core/BaseComponent":200,"@marcom/ac-raf-emitter/update":426,"@marcom/ac-useragent":427}],470:[function(d,f,c){var g=d("@marcom/ac-progressive-image-loader/ProgressiveImageComponent");
var i=d("@marcom/ac-progressive-image-loader/ProgressiveImageLoader");var a=d("../modal/ModalTriggers");
var b=a.DATA_ATTRIBUTES.open;var h=function(m){_inherits(l,m);function l(){_classCallCheck(this,l);
var n=_possibleConstructorReturn(this,(l.__proto__||Object.getPrototypeOf(l)).apply(this,arguments));
n._loadOptions=Object.assign({imageAnimate:false},n._loadOptions);n.isModalSection=n.element.classList.contains("section-modal");
n.modalTriggerEl=n.element.querySelector("["+b+"]");if(n.modalTriggerEl){n.modalName=n.modalTriggerEl.getAttribute(b);
n.priorityContainer=document.querySelector('[data-modal-content="'+n.modalName+'"] [data-load-images-with-primary]');
if(n.priorityContainer){n.priorityImageLoader=new i({container:n.priorityContainer})
}}return n}_createClass(l,[{key:"onSectionWillAppearWithPadding",value:function k(){if(this.isModalSection){return
}this.imageLoader.load(this._loadOptions);if(this.priorityImageLoader){this.priorityImageLoader.load(this._loadOptions)
}}},{key:"onSectionWillAppear",value:function j(){if(!this.isModalSection){return
}this.imageLoader.load(this._loadOptions)}}]);return l}(g);f.exports=h},{"../modal/ModalTriggers":477,"@marcom/ac-progressive-image-loader/ProgressiveImageComponent":410,"@marcom/ac-progressive-image-loader/ProgressiveImageLoader":411}],471:[function(c,d,b){var f=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var a=function(n){_inherits(t,n);function t(z){_classCallCheck(this,t);var y=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));
y._element=z;y._loader=y._element.querySelector(".video-controls-loader");y._button=y._element.querySelector(".video-controls-button");
y._icon=y._element.querySelector(".video-controls-icon");y._hasVideoBeenIntitated=false;
y._buttonState=y._getButtonState();y._analyticsTag=y._getAnalyticsTag();y._initialize();
return y}_createClass(t,[{key:"_initialize",value:function x(){this._setupEvents()
}},{key:"_setupEvents",value:function s(){this._button.addEventListener("click",this._handleButtonClick.bind(this));
this._updateAnalytics("play")}},{key:"_handleButtonClick",value:function l(y){if(!this._hasVideoBeenIntitated){this._hasVideoBeenIntitated=true;
this._startLoader();this._updateButtonState()}else{this._updateButtonState()}}},{key:"_updateButtonState",value:function p(){var y=this._buttonState;
var z=this._buttonState==="play"?"pause":"play";this._updateAriaLabel(z);this._updateButtonIcon(y,z);
this._setButtonState(z);if(this._hasVideoBeenIntitated){this.trigger("controls_"+y)
}this._updateAnalytics(z)}},{key:"_getButtonState",value:function m(){return this._icon.getAttribute("data-button-state")
}},{key:"_setButtonState",value:function g(y){this._icon.setAttribute("data-button-state",y);
this._buttonState=this._getButtonState()}},{key:"_updateAriaLabel",value:function w(z){var y=this._button.getAttribute("data-"+z+"-label");
this._button.setAttribute("aria-label",y)}},{key:"_updateButtonIcon",value:function u(y,z){this._icon.classList.remove("image-camera-modal-"+y+"-button");
this._icon.classList.add("image-camera-modal-"+z+"-button")}},{key:"_getAnalyticsTag",value:function o(){return this._button.getAttribute("data-analytics-click")
}},{key:"_updateAnalytics",value:function k(z){var y=this._analyticsTag+"-"+z;this._button.setAttribute("data-analytics-click",y)
}},{key:"_startLoader",value:function j(){this._showLoader();this.trigger("controls_load")
}},{key:"_showLoader",value:function h(){this._loader.classList.add("show");this._button.classList.add("hide")
}},{key:"_hideLoader",value:function q(){this._loader.classList.remove("show");
this._button.classList.remove("hide")}},{key:"end",value:function i(){var y=this._buttonState;
var z="play";this._updateAriaLabel(z);this._updateButtonIcon(y,z);this._setButtonState(z);
this._updateAnalytics(z)}},{key:"reset",value:function v(){if(this._hasVideoBeenIntitated){this._startLoader()
}else{this.end()}}},{key:"loaded",value:function r(){this._hideLoader();this.trigger("controls_play")
}}]);return t}(f);d.exports=a},{"@marcom/ac-event-emitter-micro":147}],472:[function(f,g,d){var c=f("@marcom/ac-jetpack-lib/core/BaseComponent");
var b=f("../../shared/video/MediaObjectVideo");var a=f("./VideoControls");var h=function(l){_inherits(i,l);
function i(B,D,y,w,z,C,A){_classCallCheck(this,i);var x=_possibleConstructorReturn(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments));
x.name="VideoPlayer_"+A;x._video=null;x._videoControls=null;return x}_createClass(i,[{key:"setupEvents",value:function p(){this._initialize()
}},{key:"_initialize",value:function n(){this._createVideo();this._createVideoControls()
}},{key:"_createVideo",value:function k(){var x=this.element.querySelector(".video-playback");
var y=x.getAttribute("data-media-name");var w={autoload:false};this._video=new b(y,x,w);
this._video.on("video_ready",this._onVideoReady.bind(this));this._video.on("video_ended",this._onVideoEnded.bind(this));
this._video.on("video_reset",this._onVideoReset.bind(this))}},{key:"_onVideoReady",value:function t(){this._videoControls.loaded()
}},{key:"_onVideoEnded",value:function s(){this._videoControls.end()}},{key:"_onVideoReset",value:function o(){this._videoControls.reset()
}},{key:"_createVideoControls",value:function v(){var w=this.element.querySelector(".video-controls");
this._videoControls=new a(w);this._videoControls.on("controls_load",this._onLoad.bind(this));
this._videoControls.on("controls_play",this._onPlay.bind(this));this._videoControls.on("controls_pause",this._onPause.bind(this))
}},{key:"_onLoad",value:function m(){this._video.load()}},{key:"_onPlay",value:function r(){this._video.mediaManager.mediaObject.mediaElement.play()
}},{key:"_onPause",value:function u(){this._video.mediaManager.mediaObject.mediaElement.pause()
}},{key:"modalWillClose",value:function q(w){this._video.mediaManager.mediaObject.mediaElement.pause();
this._videoControls.end();this._video._videoElement.style.display="none";w()}},{key:"modalDidClose",value:function j(w){this._video._videoElement.style.display="";
w()}}]);return i}(c);g.exports=h},{"../../shared/video/MediaObjectVideo":488,"./VideoControls":471,"@marcom/ac-jetpack-lib/core/BaseComponent":200}],473:[function(g,d,r){try{var s=g("@marcom/ac-analytics");
var k=s.createBasicObserverSuite()}catch(p){}var o=g("@marcom/ac-get-param");var m=g("@marcom/ac-jetpack-lib/core/BasePage");
var a=g("@marcom/ac-jetpack-lib/model/ComponentMap");var h=g("@marcom/ac-jetpack-lib/model/SectionMap");
var l=g("./shared/PassiveSection");var j=g("@marcom/anim-system/Model/AnimSystemModel");
var n=g("@marcom/ac-jetpack-lib/model/EnabledFeatures");var f=g("./shared/helpers/History/HistoryHelper");
var b=g("./shared/model/EnabledFeatures");var c=g("./shared/model/ComponentMap");
var q=g("./modal/ModalController.js");var i=function(){return{initialize:function t(){var w=this;
h.BaseSection=l;Object.assign(a,c);n.extend(b);n.init();document.addEventListener("readystatechange",function(){if(document.readyState==="complete"){w.instantiatePageController()
}})},instantiatePageController:function v(){q.initialize({analyticsSectionObservers:k}).then(function(){var w=new m();
i.addFooterAsSection(w);q.setPage(w);new f(w)})["catch"](function(w){console.error(w,w.stack)
})},addFooterAsSection:function u(x){var w=document.querySelector("[data-modal-footer-container]");
x.addSection(w)}}}();d.exports=i.initialize()},{"./modal/ModalController.js":476,"./shared/PassiveSection":479,"./shared/helpers/History/HistoryHelper":480,"./shared/model/ComponentMap":485,"./shared/model/EnabledFeatures":486,"@marcom/ac-analytics":undefined,"@marcom/ac-get-param":186,"@marcom/ac-jetpack-lib/core/BasePage":201,"@marcom/ac-jetpack-lib/model/ComponentMap":203,"@marcom/ac-jetpack-lib/model/EnabledFeatures":205,"@marcom/ac-jetpack-lib/model/SectionMap":206,"@marcom/anim-system/Model/AnimSystemModel":453}],474:[function(j,a,x){var i=j("@marcom/ac-raf-emitter/update");
var g=j("@marcom/ac-raf-emitter/external");var l=j("@marcom/ac-raf-emitter/draw");
var m=j("@marcom/ac-event-emitter-micro/EventEmitterMicro");var q=j("./force-repaint");
var s=j("@marcom/ac-useragent");var f=j("@marcom/ac-viewport-emitter");var u=j("@marcom/sm-math-utils");
var v=document.documentElement.classList.contains("modal-background-scale");var w={"modal-background-content":"[data-modal-background-content]","modal-background-elements":"[data-modal-background-elements]",globalnav:"#ac-globalnav",localnav:"#ac-localnav","localnav-background":".ac-ln-background","localnav-wrapper":".ac-ln-wrapper",footer:"#ac-globalfooter"};
var d={active:"modal-active",animating:"modal-animating",enableTransition:"modal-enable-transition",enableTransitionIn:"modal-enable-transition-in",enableTransitionOut:"modal-enable-transition-out",willOpen:"modal-will-open",willAnimateStart:"modal-will-animate-start",open:"modal-open",willStartClose:"modal-will-start-close",willAnimateClose:"modal-will-animate-close",willClose:"modal-will-close",backgroundLock:"modal-background-lock",interactive:"modal-interactive",backgroundAnimatedContent:"modal-background-animated-content",preventGlobalnavTransition:"modal-prevent-globalnav-transition",modalSelected:"modal-content-selected",fixNavigation:"modal-fix-navigation",navWillTransition:"modal-nav-will-transition"};
var r={animateIn:["animate-modal-in","animate-scrim-in","animate-close-button-in"],animateOut:["animate-modal-out","animate-scrim-out","animate-close-button-out"]};
if(v){r.animateIn.push("animate-background-in");r.animateOut.push("animate-background-out")
}var b={willOpen:"will-open",didOpen:"did-open",willClose:"will-close",didClose:"did-close",animationComplete:"animation-complete"};
var h={animateBackgroundInScale:"--animate-modal-background-in-scale",animateBackgroundOutTranslateY:"--animate-modal-background-out-translateY"};
var t=s.browser.safari&&s.os.osx;var c=1296000;var k=1;var o=3.5;var p={IN:{DEFAULT_VALUE:null,SAFARI_DESKTOP:20,SAFARI_DESKTOP_RETINA:20},OUT:{DEFAULT_VALUE:null,SAFARI_DESKTOP:100,SAFARI_DESKTOP_RETINA:125}};
var n=function(Y){_inherits(S,Y);function S(){_classCallCheck(this,S);var ah=_possibleConstructorReturn(this,(S.__proto__||Object.getPrototypeOf(S)).apply(this,arguments));
ah.el=ah._createElement();ah.classNameElement=document.body;ah.isAnimating=false;
ah.isOpen=false;ah.currentModal=null;ah.backgroundOffset=0;ah.modalOffset=0;ah.mayAnimate=false;
ah.scrollingElement=document.body;ah.cssVariablesElement=document.documentElement;
ah.backgroundContent=document.querySelector(w["modal-background-content"]);ah.backgroundElementsContainer=ah.backgroundContent.querySelector(w["modal-background-elements"]);
ah.backgroundTransformElements=ah._getBackgroundTransformElements();ah.globalnav=document.querySelector(w.globalnav);
ah.localnav=document.querySelector(w.localnav);ah.localnavBG=document.querySelector(w["localnav-background"]);
ah.localnavWrapper=document.querySelector(w["localnav-wrapper"]);ah.footer=document.querySelector(w.footer);
ah._compositeElement=ah._compositeElement.bind(ah);ah._onAnimationComplete=ah._onAnimationComplete.bind(ah);
ah._onAllAnimationsComplete=ah._onAllAnimationsComplete.bind(ah);ah._animateInSecondPhase=ah._animateInSecondPhase.bind(ah);
ah._animateOutSecondPhase=ah._animateOutSecondPhase.bind(ah);return ah}_createClass(S,[{key:"initialize",value:function z(ah){var ai=this;
return new Promise(function(ak,aj){ai.controller=ah.controller;ai.bindEvents();
i(function(){ai.backgroundContentScale=parseFloat(window.getComputedStyle(ai.cssVariablesElement).getPropertyValue(h.animateBackgroundInScale))
});ai.migrateComponentElements().then(function(al){l(function(){var am=ai.backgroundContent;
am.parentNode.insertBefore(ai.el,am.nextSibling);ai.mayAnimate=true;ak(al)})})})
}},{key:"bindEvents",value:function A(){this.classNameElement.addEventListener("animationend",this._onAnimationComplete)
}},{key:"migrateComponentElements",value:function Z(){var ah=this;return new Promise(function(ak,aj){var an=[];
var am=0;for(var ai in ah.controller.modals){if(ah.controller.modals.hasOwnProperty(ai)){var al=document.createElement("section");
al.className="section-modal-"+am;am++;al.appendChild(ah.controller.modals[ai].modalElement);
an.push(al);ah.el.appendChild(al)}}ak(an)})}},{key:"initializeOpen",value:function ae(ah){if(!this.mayAnimate){return
}this.mayAnimate=false;this.isOpen=true;this.currentModal=this.controller.modals[ah];
this._eventData={name:ah,modal:this.currentModal};this.trigger(b.willOpen,this._eventData)
}},{key:"initializeClose",value:function N(){if(!this.mayAnimate){return}this.mayAnimate=false;
this.isOpen=false;this._eventData={name:this.currentModal.name,scrollTo:this.backgroundOffset,modal:this.currentModal};
this.trigger(b.willClose,this._eventData)}},{key:"animateIn",value:function aa(){var ah=this;
this.isAnimating=true;i(function(){ah.scrollY=ah.controller.page._getScrollY();
ah.backgroundOffset=ah.scrollY;ah.openNavOffset=ah._getNavOffset();ah.contentHeight=ah._getContentHeight();
ah.windowDimensions={width:window.innerWidth,height:window.innerHeight};ah._createAnimationPromises(r.animateIn)
});l(function(){ah._setModalOffset(null);ah._setComponentSelected(ah.currentModal.name);
ah.classNameElement.classList.add(d.animating);ah.classNameElement.classList.add(d.active);
ah.classNameElement.classList.add(d.enableTransition);ah.classNameElement.classList.add(d.enableTransitionIn);
ah.classNameElement.classList.add(d.willAnimateStart);l(function(){var ai=ah.openNavOffset.localnav.height;
ah.currentModal.modalNavUnderlay.style.paddingTop=ai+"px";ah.currentModal.modalNavUnderlay.style.marginTop=-ai+"px";
ah.scrollingElement.style.height=ah.contentHeight+"px";ah._setBackgroundOffset(ah.backgroundOffset-ah.openNavOffset.totalHeight);
ah.classNameElement.classList.add(d.backgroundLock);l(function(){if(t){l(ah._animateInSecondPhase);
return}ah._animateInSecondPhase()})})})}},{key:"_animateInSecondPhase",value:function X(){var ah=this;
this._setSecondPhaseTimeout("IN",function(){var ai=ah.scrollY;if(ah.openNavOffset.stuck){ai=ah.openNavOffset.globalnav.height;
ai+=1}window.scroll(0,ai);l(function(){ah.classNameElement.classList.add(d.interactive);
ah.classNameElement.classList.add(d.willOpen)})})}},{key:"animateOut",value:function P(){var ah=this;
this.isAnimating=true;i(function(){ah.scrollY=ah.controller.page._getScrollY();
ah.modalOffset=ah.scrollY;ah.closeNavOffset=ah._getNavOffset();ah.windowDimensions={width:window.innerWidth,height:window.innerHeight};
ah._createAnimationPromises(r.animateOut)});g(function(){var aj=0;if(ah.globalnav){if(ah.openNavOffset.stuck&&ah.closeNavOffset.stuck){ah.classNameElement.classList.add(d.preventGlobalnavTransition)
}if(ah.openNavOffset.stuck!==ah.closeNavOffset.stuck){ah.classNameElement.classList.add(d.navWillTransition);
var ai=u.clamp(ah.closeNavOffset.globalnav.top,-ah.closeNavOffset.globalnav.height,0);
ah._setGlobalnavOffset(ai+"px")}else{if(!ah.openNavOffset.stuck){ah._setGlobalnavOffset(-ah.closeNavOffset.globalnav.height+"px")
}else{ah._setGlobalnavOffset(ah.closeNavOffset.globalnav.top+"px")}}aj+=ah.closeNavOffset.globalnav.height
}if(ah.localnav){ah._setLocalnavOffset(ah.closeNavOffset.localnav.top+"px");aj+=ah.closeNavOffset.localnav.height
}ah.classNameElement.classList.add(d.fixNavigation);ah.closeNavPadding=aj;if(!ah.closeNavOffset.stuck){q(ah.localnav)
}});l(function(){ah._setModalOffset(ah.modalOffset);ah.scrollingElement.style.height=ah.contentHeight+"px";
ah.classNameElement.classList.add(d.animating);ah.classNameElement.classList.remove(d.interactive);
ah.classNameElement.classList.remove(d.open);ah.classNameElement.classList.add(d.willStartClose);
ah.classNameElement.classList.add(d.enableTransition);ah.classNameElement.classList.add(d.enableTransitionOut);
ah.currentModal.modalElement.style.paddingTop=ah.closeNavPadding+"px";ah.cssVariablesElement.style.setProperty(h.animateBackgroundOutTranslateY,ah._getScaleScrollOffset()+"px");
l(function(){if(t){l(ah._animateOutSecondPhase);return}ah._animateOutSecondPhase()
})})}},{key:"_animateOutSecondPhase",value:function F(){var ah=this;this._setSecondPhaseTimeout("OUT",function(){var ai=ah.backgroundOffset;
window.scrollTo(0,ai);l(function(){ah._setBackgroundOffset(null);ah.backgroundContent.style.marginTop="";
var aj=ah.closeNavOffset.localnav.height;ah.backgroundContent.style.paddingTop=aj+"px";
ah.classNameElement.classList.remove(d.backgroundLock);ah.classNameElement.classList.add(d.willAnimateClose);
l(function(){ah.classNameElement.classList.remove(d.willStartClose);ah.classNameElement.classList.add(d.willClose);
if(ah.globalnav){if(ah.openNavOffset.stuck&&!ah.closeNavOffset.stuck){ah._setGlobalnavOffset(-ah.openNavOffset.globalnav.height+"px")
}else{ah._setGlobalnavOffset(ah.openNavOffset.globalnav.top+"px")}}if(ah.localnav){ah._setLocalnavOffset(ah.openNavOffset.localnav.top+"px")
}})})})}},{key:"completeOpen",value:function T(){this.mayAnimate=true}},{key:"completeClose",value:function M(){this.mayAnimate=true
}},{key:"_onAnimationComplete",value:function J(ai){var ah=ai.animationName;if(this._animationResolveMap&&this._animationResolveMap[ah]){this._animationResolveMap[ah]()
}}},{key:"_onAllAnimationsComplete",value:function ab(){this._removeAnimationPromises();
this.isAnimating=false;if(this.isOpen){this._onOpenAnimationComplete()}else{this._onClosedAnimationComplete()
}}},{key:"_onOpenAnimationComplete",value:function U(){var ah=this;l(function(){ah.classNameElement.classList.add(d.open);
ah.classNameElement.classList.remove(d.willOpen);l(function(){ah.classNameElement.classList.remove(d.willAnimateStart);
ah.classNameElement.classList.remove(d.animating);ah.classNameElement.classList.remove(d.enableTransition);
ah.classNameElement.classList.remove(d.enableTransitionIn);ah.classNameElement.classList.remove(d.preventGlobalnavTransition);
ah.scrollingElement.style.height="";l(function(){ah.trigger(b.animationComplete,ah._eventData);
ah.trigger(b.didOpen,ah._eventData)})})})}},{key:"_onClosedAnimationComplete",value:function V(){var ah=this;
l(function(){ah.scrollingElement.style.height="";ah.currentModal.modalElement.style.paddingTop="";
ah.currentModal.modalElement.style.marginTop="";if(!ah.closeNavOffset.stuck){g(function(){q(ah.localnav)
})}l(function(){ah.classNameElement.classList.remove(d.fixNavigation);ah.classNameElement.classList.remove(d.navWillTransition);
ah.classNameElement.classList.remove(d.willClose);ah.classNameElement.classList.remove(d.willAnimateClose);
ah.classNameElement.classList.remove(d.active);ah.classNameElement.classList.remove(d.animating);
ah.classNameElement.classList.remove(d.enableTransition);ah.classNameElement.classList.remove(d.enableTransitionOut);
if(ah.globalnav){ah._setGlobalnavOffset("")}if(ah.localnav){ah._setLocalnavOffset("")
}ah.backgroundContent.style.paddingTop="";l(function(){ah.trigger(b.animationComplete,ah._eventData);
ah.trigger(b.didClose,ah._eventData)})})})}},{key:"_setComponentSelected",value:function y(ah){for(var ai in this.controller.modals){if(this.controller.modals.hasOwnProperty(ai)){if(ai===ah){this.controller.modals[ai].modalElement.classList.add(d.modalSelected)
}else{this.controller.modals[ai].modalElement.classList.remove(d.modalSelected)
}}}}},{key:"_getBackgroundTransformElements",value:function K(){var ah=Array.prototype.slice.call(this.backgroundElementsContainer.childNodes,0).filter(function(ai){return ai.nodeType===Node.ELEMENT_NODE
});return ah}},{key:"_getNavOffset",value:function R(){var al=0;var ai=0;var aj=0;
var am=false;var ah={};var ak={};ah.height=0;ak.height=0;if(this.globalnav){ah=this.globalnav.getBoundingClientRect();
al+=ah.height}if(this.localnav){ak=this.localnav.getBoundingClientRect();al+=ak.height;
am=this._getLocalNavStuck();if(am){ai+=u.clamp(this.scrollY-ak.height,0,ak.height)
}else{aj=this.scrollY-ak.height}}return{globalnav:ah,localnav:ak,stuck:am,totalHeight:al,stickyHeight:ai,distanceToSticky:aj}
}},{key:"_setBackgroundOffset",value:function E(al){var aj=this.backgroundTransformElements;
var ak=al!==null?-al+"px":"";for(var ai=0,ah=aj.length;ai<ah;ai++){aj[ai].style.top=ak
}}},{key:"_setModalOffset",value:function ad(ak){var ah,ai=this.currentModal.modalContentElements;
var aj="";if(ak!==null){aj="translateY("+-ak+"px)"}ai.style.transform=aj}},{key:"_getLocalNavStuck",value:function G(){return this.localnav.classList.contains("ac-ln-sticking")
}},{key:"_setGlobalnavOffset",value:function Q(ah){if(typeof ah==="undefined"||ah.length===0){this.globalnav.style.transform=""
}else{this.globalnav.style.transform="translateY("+ah+")"}}},{key:"_setLocalnavOffset",value:function C(ah){if(typeof ah==="undefined"||ah.length===0){this.localnav.style.transform=""
}else{this.localnav.style.transform="translateY("+ah+")"}}},{key:"_compositeModalContent",value:function D(ai){var ah=this;
return new Promise(function(ak,aj){if(ai===0){ak();return}ah._compositeElement(ah.backgroundElementsContainer,0,ai,ak)
})}},{key:"_compositeElement",value:function H(ai,ak,aj,al){var ah=this;q(ai);ak++;
if(ak===aj){al();return}g(function(){ah._compositeElement(ai,ak,aj,al);ai=ak=aj=al=null
})}},{key:"_getScaleScrollOffset",value:function L(){var ah=1/this.backgroundContentScale;
var ai=this.contentHeight-this.controller.page.getWindowHeight();var ak=this.backgroundOffset/ai;
var aj=ak*(ah-1)*(ai/ah);if(this.globalnav&&this.closeNavOffset){aj-=this.closeNavOffset.globalnav.height/2
}return aj}},{key:"_getContentHeight",value:function B(){return document.body.scrollHeight
}},{key:"_setSecondPhaseTimeout",value:function I(ah,aj){var ai=this._getTimeoutDuration(ah);
if(ai===null){aj();return}setTimeout(aj,ai)}},{key:"_getTimeoutDuration",value:function W(ai){var ah=p.IN;
var al=f.retina;var ak=this._getWindowSize()/c;var aj=ah.DEFAULT_VALUE;if(ai==="OUT"){ah=p.OUT
}if(t){if(al){aj=ah.SAFARI_DESKTOP_RETINA}else{aj=ah.SAFARI_DESKTOP}}if(aj===null){return aj
}ak=u.clamp(ak,k,o);return ak*aj}},{key:"_getWindowSize",value:function O(){return this.windowDimensions.width*this.windowDimensions.height
}},{key:"_createElement",value:function af(){var ah=document.createElement("div");
ah.className="modal-container";return ah}},{key:"_createAnimationPromises",value:function ac(ai){var ah=this;
this._removeAnimationPromises();this._animationResolveMap={};this._animationPromisesArr=ai.map(function(aj){return new Promise(function(al,ak){ah._animationResolveMap[aj]=al
})});Promise.all(this._animationPromisesArr).then(this._onAllAnimationsComplete)
}},{key:"_removeAnimationPromises",value:function ag(){this._animationPromisesArr=null;
this._animationResolveMap=null}}]);return S}(m);a.exports=new n()},{"./force-repaint":478,"@marcom/ac-event-emitter-micro/EventEmitterMicro":148,"@marcom/ac-raf-emitter/draw":424,"@marcom/ac-raf-emitter/external":425,"@marcom/ac-raf-emitter/update":426,"@marcom/ac-useragent":427,"@marcom/ac-viewport-emitter":433,"@marcom/sm-math-utils":461}],475:[function(d,b,i){var h=d("@marcom/ac-raf-emitter/update");
var l=d("@marcom/ac-raf-emitter/draw");var c=d("@marcom/ac-raf-emitter/cancelDraw");
var a="modal-close-button-animation";var m="modal-close-button-parallax";var g="data-close-button-placeholder";
var f=["containerX","bodyScaleX","copyOpacity","endcapX","circleOpacity","containerOpacity","resetScale"];
var k=["parallaxY"];var o=2;var n=d("@marcom/ac-viewport-emitter");var j=function(){function p(M){_classCallCheck(this,p);
this.modalOpen=false;this.containerEl=document.documentElement.querySelector(".modal-close-button-container");
this.parallaxContainer=this.containerEl.querySelector(".modal-close-button-transform-container");
this.buttonEl=this.containerEl.querySelector("#modal-close-button");this.opacityContainer=this.containerEl.querySelector(".modal-button-opacity");
this.startCapEl=this.buttonEl.querySelector(".modal-button-start-cap");this.copyEl=this.buttonEl.querySelector(".modal-button-copy");
this.scalerEl=this.buttonEl.querySelector(".modal-button-scaler");this.endCapEl=this.buttonEl.querySelector(".modal-button-end-cap");
this.circleEl=this.buttonEl.querySelector(".resetcircle-icon");this.resetEl=this.buttonEl.querySelector(".reset-icon");
this.modalController=M.modalController;this.page=null;this.animSystem=null;this._didRequestDraw=false;
this._copyWidthMultiplier=1;this.vals={};this._didBindUpdate=false;this._updateValues=this._updateValues.bind(this);
this._updateParallaxValues=this._updateParallaxValues.bind(this);this._render=this._render.bind(this);
this._renderParallax=this._renderParallax.bind(this);this.modalController.on("will-open-start",this._onModalWillOpen.bind(this));
this.modalController.on("did-open-end",this._onModalDidOpen.bind(this));this.modalController.on("will-close-start",this._onModalWillClose.bind(this));
this.modalController.on("did-close-end",this._onModalDidClose.bind(this));n.on("change",this._onBreakpointChange.bind(this))
}_createClass(p,[{key:"getModalButtonAnimSystem",value:function v(M){var N=this.modalController.getModalSection(M);
return N.getComponentOfType("AnimSystem")}},{key:"_onModalWillOpen",value:function A(M){this.animSystem=this.getModalButtonAnimSystem(M.name);
this.animElement=this.modalController.getModalSection(M.name).element.querySelector("["+g+"]");
if(!this.animSystem){return}this._bindEvents();this._setInitialAnimValues();this._forceAnimSystemReset()
}},{key:"_onModalDidOpen",value:function I(){this.modalOpen=true;if(!this.animSystem){return
}this._setCopyWidth()}},{key:"_setScalerMaxScale",value:function G(){}},{key:"_onModalWillClose",value:function C(){}},{key:"_onModalDidClose",value:function w(){this.modalOpen=false;
if(!this.animSystem){return}this._forceAnimSystemReset();this.animSystem=null}},{key:"_forceAnimSystemReset",value:function B(){if(!this.animSystem){return
}var M=this.animSystem.isEnabled;this.animSystem.isEnabled=true;this._resetAnimProps();
this.animSystem.isEnabled=M}},{key:"_setInitialAnimValues",value:function F(){var N=void 0;
var M=f.length;for(N=0;N<M;N++){this._setValue(f[N],this._getInitialPropValue(f[N]),0)
}M=k.length;for(N=0;N<M;N++){this._setValue(k[N],this._getInitialPropValue(k[N]),1)
}}},{key:"_getActiveController",value:function r(){return this.animSystem.getControllerForElement(this.animElement)||null
}},{key:"_resetAnimProps",value:function x(){if(!this.animSystem){return}var N=this._getActiveController();
var O=void 0;var M=N._allKeyframes.length;for(O=0;O<M;O++){N._allKeyframes[O].reset(0)
}N.animSystem._onScroll(0)}},{key:"_getInitialPropValue",value:function L(N,M){return this._getActiveController().getAllKeyframesForAttribute(N)[0].animValues[N][0]
}},{key:"_resetPropLocalT",value:function z(O){var M=this._getActiveController();
var N=M.getAllKeyframesForAttribute(O)[0];N.reset(0)}},{key:"_setValue",value:function s(M,O){var N=this.vals[M];
if(N!==O){this.vals[M]=O}}},{key:"_bindEvents",value:function K(){this.animSystem.on(a,this._updateValues);
this.animSystem.on(m,this._updateParallaxValues)}},{key:"_updateValues",value:function J(P){var O=P.animationInfo;
var N=void 0;var M=f.length;for(N=0;N<M;N++){this._setValue(f[N],O[f[N]].current)
}this._render()}},{key:"_updateParallaxValues",value:function E(P){var O=P.animationInfo;
var N=void 0;var M=k.length;for(N=0;N<M;N++){this._setValue(k[N],O[k[N]].current)
}this._renderParallax()}},{key:"_getCopyWidth",value:function D(){var M=this;return new Promise(function(O,N){h(function(){O(M.copyEl.getBoundingClientRect().width)
})})}},{key:"_setCopyWidth",value:function q(){var M=this;return new Promise(function(O,N){M._getCopyWidth().then(function(P){M._copyWidthMultiplier=P/100;
O()})})}},{key:"_onBreakpointChange",value:function H(){var M=this;if(this.modalOpen){this._setCopyWidth().then(function(){l(M._render)
})}}},{key:"_render",value:function u(){this.buttonEl.style.transform="translateX("+this.vals.containerX*this._copyWidthMultiplier+"px)";
this.opacityContainer.style.opacity=this.vals.containerOpacity;this.scalerEl.style.transform="translateX("+-o+"px) scaleX("+(this.vals.bodyScaleX*this._copyWidthMultiplier+o*2)+")";
this.copyEl.style.opacity=this.vals.copyOpacity;this.endCapEl.style.transform="translateX("+this.vals.endcapX*this._copyWidthMultiplier+"px)";
this.circleEl.style.opacity=this.vals.circleOpacity;this.resetEl.style.transform="translateX(-50%) translateY(-50%) scale("+this.vals.resetScale+")"
}},{key:"_renderParallax",value:function t(){this.parallaxContainer.style.transform="translateY("+this.vals.parallaxY+"px)"
}},{key:"_unbindEvents",value:function y(){}}]);return p}();b.exports=j},{"@marcom/ac-raf-emitter/cancelDraw":423,"@marcom/ac-raf-emitter/draw":424,"@marcom/ac-raf-emitter/update":426,"@marcom/ac-viewport-emitter":433}],476:[function(k,a,t){var n=k("./ModalAnimator");
var o=k("./ModalTriggers");var b=k("./ModalCloseButtonAnimator");var m=k("@marcom/ac-event-emitter-micro/EventEmitterMicro");
var f=k("@marcom/ac-jetpack-lib/utils/Page");var j=k("@marcom/ac-raf-emitter/update");
var l=k("@marcom/ac-raf-emitter/draw");var i=null;try{i=k("ac-analytics")}catch(h){}var q=document.querySelector('meta[property="analytics-track"]');
var d=q.getAttribute("content").toLowerCase();var g="data-modal-content";var p={modalWillOpen:"modalWillOpen",modalWillClose:"modalWillClose",modalDidOpen:"modalDidOpen",modalDidClose:"modalDidClose"};
var s={modalContent:"["+g+"]",modalContentElements:"[data-modal-content-elements]",modalNavUnderlay:".modal-nav-underlay",primaryContentSections:"[data-modal-background-content] section"};
var c={ready:"ready",willOpenStart:"will-open-start",willOpenEnd:"will-open-end",didOpenStart:"did-open-start",didOpenEnd:"did-open-end",willCloseStart:"will-close-start",willCloseEnd:"will-close-end",didCloseStart:"did-close-start",didCloseEnd:"did-close-end"};
var r=function(Q){_inherits(aa,Q);function aa(){_classCallCheck(this,aa);var ab=_possibleConstructorReturn(this,(aa.__proto__||Object.getPrototypeOf(aa)).call(this));
ab.EVENTS=c;ab.modalSectionElements=[];ab.modalSections=[];ab.modalSectionsMap={};
ab.isOpen=false;return ab}_createClass(aa,[{key:"initialize",value:function x(ab){var ac=this;
ab=ab||{};this.getModalElements();this.analyticsSectionObservers=ab.analyticsSectionObservers;
if(this.analyticsSectionObservers){this.analyticsSectionTrackers=this.analyticsSectionObservers.section.elementEngagement.elements
}n.on("will-open",this.willOpenModal.bind(this));n.on("will-close",this.willCloseModal.bind(this));
n.on("did-open",this.didOpenModal.bind(this));n.on("did-close",this.didCloseModal.bind(this));
if(!ab.disableTriggers){this.triggers=new o({el:document.body,modalController:this})
}this.modalCloseButtonAnimator=new b({modalController:this});return new Promise(function(ae,ad){n.initialize({controller:ac}).then(function(af){ac.getAnalyticsSections();
ac.modalSectionElements=af;ae()})})}},{key:"getAnalyticsSections",value:function W(){var ab=this;
this.analyticsModalSections={};this.analyticsPrimarySections=Array.from(document.querySelectorAll("[data-modal-background-content] [data-analytics-section-engagement]"));
Object.keys(this.modals).forEach(function(ad){var ac=ab.modals[ad].modalElement;
var ae=ac.querySelectorAll("[data-analytics-section-engagement]");ab.analyticsModalSections[ad]=[];
if(!ae){return}ab.analyticsModalSections[ad]=Array.from(ae)})}},{key:"activateAnalyticTrackersForModal",value:function y(ab){if(!this.analyticsModalSections){return
}var ac=this.analyticsModalSections[ab];if(!ac||!ac.length||!this.analyticsSectionTrackers||!this.analyticsSectionObservers){return
}this.analyticsSectionTrackers.forEach(function(ad){ad.isActive=ac.indexOf(ad.element)>-1
});this.analyticsSectionObservers.section._onScroll();this.analyticsSectionObservers.section._onResize()
}},{key:"activateAnalyticTrackersForPrimaryContent",value:function P(){var ab=this;
if(!this.analyticsSectionTrackers||!this.analyticsSectionObservers){return}this.analyticsSectionTrackers.forEach(function(ac){ac.isActive=ab.analyticsPrimarySections.indexOf(ac.element)>-1
});this.analyticsSectionObservers.section._onScroll();this.analyticsSectionObservers.section._onResize()
}},{key:"disableAllAnalyticsTrackers",value:function B(){if(!this.analyticsSectionTrackers){return
}this.analyticsSectionTrackers.forEach(function(ab){ab.isActive=false})}},{key:"trackAnalyticEvent",value:function N(ab){if(this.analyticsObserver){this.analyticsObserver.track({title:ab,prop3:ab,eVar1:d+" - "+ab})
}}},{key:"trackModalOpen",value:function S(ab){this.trackAnalyticEvent(ab+" - learn more - open")
}},{key:"trackModalClose",value:function I(ab){this.trackAnalyticEvent(ab+" - close")
}},{key:"setPage",value:function K(ae){this.page=ae;var ad=void 0;var ac=void 0;
var af=void 0;var ab=this.modalSectionElements.length;for(ad=0;ad<ab;ad++){af=this.page.addSection(this.modalSectionElements[ad]);
ac=this.modalSectionElements[ad].childNodes[0].getAttribute(g);this.modalSections.push(af);
this.modalSectionsMap[ac]=af}this._primaryContentPageSections=this._getPrimaryContentPageSections();
this._modalContentPageSections=this._getModalContentPageSections();this._resetElementTracking();
this.cacheSubscribers();this.trigger(c.ready)}},{key:"add",value:function O(ab){this.modals[ab.name]=ab
}},{key:"openModal",value:function H(ab,ac){if(!n.mayAnimate||this.isOpen){return false
}this.openTriggerEl=ac;n.initializeOpen(ab,ac)}},{key:"closeModal",value:function F(ab){if(!n.mayAnimate||!this.isOpen){return false
}n.initializeClose(ab)}},{key:"getModalSection",value:function V(ab){return this.modalSectionsMap[ab]||null
}},{key:"willOpenModal",value:function w(ab){var ac=this;this.trigger(c.willOpenStart,ab);
this.disableAllAnalyticsTrackers();this._callSubscriberMethods(p.modalWillOpen,[ab]).then(function(){ac.trigger(c.willOpenEnd,ab);
ab=null;n.animateIn()})}},{key:"willCloseModal",value:function J(ab){var ac=this;
this.trigger(c.willCloseStart,ab);this.disableAllAnalyticsTrackers();this._callSubscriberMethods(p.modalWillClose,[ab]).then(function(){ac.trigger(c.willCloseEnd,ab);
ab=null;n.animateOut()})}},{key:"didOpenModal",value:function E(ab){var ac=this;
this.trigger(c.didOpenStart,ab);this._callSubscriberMethods(p.modalDidOpen,[ab]).then(function(){n.completeOpen();
ac.isOpen=true;j(function(){ac.trackModalOpen(ab.name);ac.activateAnalyticTrackersForModal(ab.name);
ac._resetElementTracking();ac._refreshMetrics();ac.trigger(c.didOpenEnd,ab);var ae=ac.getModalSection(ab.name).element;
var ad=ae.querySelector('[role="dialog"]');l(function(){if(ad){ad.focus()}ab=null
})})})}},{key:"didCloseModal",value:function G(ac){var ab=this;this.trigger(c.didCloseStart,ac);
this._callSubscriberMethods(p.modalDidClose,[ac]).then(function(){n.completeClose();
ab.isOpen=false;j(function(){ab.trackModalClose(ac.name);ab.activateAnalyticTrackersForPrimaryContent();
ab._resetElementTracking();ab._refreshMetrics();ab.trigger(c.didCloseEnd,ac);ac=null;
if(ab.openTriggerEl){l(function(){ab.openTriggerEl.focus();ab.openTriggerEl=null
})}})})}},{key:"cacheSubscribers",value:function A(){var ab=[];var ae;var ac;var ah=this.page._sections;
var ag=ah.length;var af;var ad;for(ae=0;ae<ag;ae++){ab.push(ah[ae]);af=ah[ae]._components;
ad=af.length;for(ac=0;ac<ad;ac++){ab.push(af[ac])}}this._cachedSubscribers=ab}},{key:"getModalElements",value:function C(){var ai=Array.prototype.slice.call(document.querySelectorAll(s.modalContent),0);
var ac={};var ae=null;var af="";var ad=null;var ah=null;var ag=void 0;var ab=ai.length;
for(ag=0;ag<ab;ag++){ae=ai[ag];af=ae.getAttribute(g);if(!af||af.length<1){throw new TypeError("["+g+"] attribute required for ModalComponent instances")
}ad=ae.querySelector(s.modalContentElements);ah=ae.querySelector(s.modalNavUnderlay);
ac[af]={name:af,modalElement:ae,modalContentElements:ad,modalNavUnderlay:ah}}this.modals=ac
}},{key:"_getAllSubscribers",value:function u(){if(!this._cachedSubscribers){this.cacheSubscribers()
}return this._cachedSubscribers}},{key:"_callSubscriberMethods",value:function z(ac,ad){var ab=this;
return new Promise(function(aj,am){ad=ad||[];var af=0;var ah=null;var ak=null;var al=null;
var ai=[];var ae=ab._getAllSubscribers();var ag=ae.length;for(af=0;af<ag;af++){ah=null;
ak=ae[af];ah=ak[ac]||ak.constructor.prototype[ac]||null;if(ah){ai.push(new Promise(function(ao,an){ah.apply(ak,[ao,an].concat(_toConsumableArray(ad)));
ak=ah=null}))}}Promise.all(ai).then(aj)})}},{key:"_refreshMetrics",value:function Y(){f.deepRefreshAllElementMetrics()
}},{key:"_resetElementTracking",value:function M(){var ac=this._primaryContentPageSections;
var ab=this._modalContentPageSections;if(this.isOpen){ac=this._modalContentPageSections;
ab=this._primaryContentPageSections}this._enableElementTracking(ac);this._disableElementTracking(ab)
}},{key:"_getPrimaryContentPageSections",value:function U(){var ab=Array.prototype.slice.call(document.querySelectorAll(s.primaryContentSections),0);
return this._getPageSectionObjects(ab)}},{key:"_getModalContentPageSections",value:function D(){return this._getPageSectionObjects(this.modalSectionElements)
}},{key:"_getPageSectionObjects",value:function Z(ae){var ah=this.page._sections;
var ag=ah.map(function(ai){return ai.element});var ad=ae.length;var af=void 0;var ac=void 0;
var ab=[];for(af=0;af<ad;af++){ac=ag.indexOf(ae[af]);if(ac>-1){ab.push(ah[ac])}}return ab
}},{key:"_disablePrimaryContentElementTracking",value:function L(){this._disableElementTracking(this._primaryContentPageSections)
}},{key:"_disableModalContentElementTracking",value:function T(){this._disableElementTracking(this._modalContentPageSections)
}},{key:"_enableElementTracking",value:function v(ab){ab.forEach(function(ac){ac.trackedElement.isActive=true
})}},{key:"_disableElementTracking",value:function R(ab){ab.forEach(function(ac){ac.trackedElement.isActive=false;
ac.trackedElement.inView=false;ac.trackedElement.percentInView=0;ac.trackedElement.pixelsInView=0
})}},{key:"analyticsObserver",get:function X(){if(!i){return null}if(!this._analyticsObserver){this._analyticsObserver=new i.observer.Event(this)
}return this._analyticsObserver}}]);return aa}(m);a.exports=new r()},{"./ModalAnimator":474,"./ModalCloseButtonAnimator":475,"./ModalTriggers":477,"@marcom/ac-event-emitter-micro/EventEmitterMicro":148,"@marcom/ac-jetpack-lib/utils/Page":207,"@marcom/ac-raf-emitter/draw":424,"@marcom/ac-raf-emitter/update":426,"ac-analytics":undefined}],477:[function(c,d,b){var g=c("@marcom/ac-raf-emitter/update");
var f={open:"data-modal-trigger-open",close:"data-modal-trigger-close"};var a=function(){function i(o){_classCallCheck(this,i);
this.el=o.el;this.modalController=o.modalController;this.setOpenTriggers();this.setCloseTriggers();
this.updateTriggerBounds(this.openTriggers.concat(this.closeTriggers));this.bindEvents()
}_createClass(i,[{key:"setOpenTriggers",value:function m(){this.openTriggers=Array.prototype.slice.call(this.el.querySelectorAll("["+f.open+"]"),0)
}},{key:"setCloseTriggers",value:function k(){this.closeTriggers=Array.prototype.slice.call(this.el.querySelectorAll("["+f.close+"]"),0)
}},{key:"updateTriggerBounds",value:function l(o){o.forEach(function(r){var p=r.parentElement.querySelector(".button.modal-button");
if(!p){return}var s=p.querySelector(".modal-button-copy");if(s){var q=p.offsetWidth+s.offsetWidth;
r.style.width=(q>100?q:100)+"px"}})}},{key:"onOpenClicked",value:function j(o,p,q){q.preventDefault();
if(typeof o==="string"&&o.length>0){this.modalController.openModal(o,p)}}},{key:"onCloseClicked",value:function h(o){o.preventDefault();
this.modalController.closeModal()}},{key:"bindEvents",value:function n(){var o=this;
this.openTriggers.forEach(function(q){var p=q.getAttribute(f.open);q.addEventListener("click",o.onOpenClicked.bind(o,p,q))
});this.closeTriggers.forEach(function(p){p.addEventListener("click",o.onCloseClicked.bind(o))
});window.addEventListener("keyup",function(q){var p=27;if(q.keyCode===p){o.modalController.closeModal()
}})}}]);return i}();d.exports=a;d.exports.DATA_ATTRIBUTES=f},{"@marcom/ac-raf-emitter/update":426}],478:[function(b,c,a){c.exports=function(g){var f=g.style.display;
if(f!=="none"){g.style.display="none"}else{g.style.display="block"}var d=g.offsetHeight;
g.style.display=f}},{}],479:[function(c,f,b){var a=c("@marcom/ac-jetpack-lib/core/BaseSection");
var d=function(j){_inherits(g,j);function g(){_classCallCheck(this,g);return _possibleConstructorReturn(this,(g.__proto__||Object.getPrototypeOf(g)).apply(this,arguments))
}_createClass(g,[{key:"activate",value:function h(){for(var l=0,k=this._components.length;
l<k;l++){if(!this._components[l].isEnabled){continue}this._components[l].activate()
}this.isActive=true;if(!this.hasAnimatedIn){this.animateIn();this.hasAnimatedIn=true
}}},{key:"deactivate",value:function i(){this.isActive=false;for(var l=0,k=this._components.length;
l<k;l++){if(!this._components[l].isEnabled){continue}this._components[l].deactivate()
}}}]);return g}(a);f.exports=d},{"@marcom/ac-jetpack-lib/core/BaseSection":202}],480:[function(c,f,b){var h=c("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var i=c("../../../modal/ModalController");var a={update:c("@marcom/ac-raf-emitter/update"),external:c("@marcom/ac-raf-emitter/external"),draw:c("@marcom/ac-raf-emitter/draw")};
var g=document.title;var d=function(){function r(){_classCallCheck(this,r);this.siteRoot=this.getSiteRoot();
this.searchString=this.sanitizeSearch();this.currentState=this.createState("");
this.setupEvents();var u=this.getModalFrom(window.location.hash);if(u!==null){this.currentState=this.createState(u.name);
a.update(function(){var v={localNav:document.querySelector("#ac-localnav"),globalNav:document.querySelector("#ac-globalnav"),segmentBar:document.querySelector("#ac-gn-segmentbar"),localeSwitcher:document.querySelector("#ac-localeswitcher")};
a.external(function(){for(var w in v){if(v[w]!==null){v[w].classList.add("immediate");
v[w].classList.add("animate-in")}}});i.openModal(u.name)})}}_createClass(r,[{key:"setupEvents",value:function m(){this._handleHashChange=this._handleHashChange.bind(this);
this._handlePopState=this._handlePopState.bind(this);this._handleModalOpen=this._handleModalOpen.bind(this);
this._handleModalDidClose=this._handleModalDidClose.bind(this);window.addEventListener("popstate",this._handlePopState,false);
window.addEventListener("hashchange",this._handleHashChange,false);i.on(i.EVENTS.didOpenEnd,this._handleModalOpen);
i.on(i.EVENTS.didCloseEnd,this._handleModalDidClose)}},{key:"createState",value:function s(u){if(u!==""){u="#"+u
}return{title:g,url:this.siteRoot+this.searchString+u}}},{key:"_handleModalOpen",value:function o(u){this.setHashState(u.name)
}},{key:"_handleModalDidClose",value:function l(u){this.setHashState("")}},{key:"_handleHashChange",value:function j(u){u.preventDefault()
}},{key:"_handlePopState",value:function k(u){u.preventDefault()}},{key:"getSiteRoot",value:function p(){var u=window.location.href.match("(.*.com)([^?|#]*)");
return u[2]}},{key:"sanitizeSearch",value:function t(){var x=window.location.search.match(/([\?|&]([^&]*))/g);
if(x===null){return""}var u="";for(var v=0;v<x.length;v++){var w=x[v].substr(1);
if(!this.getModalFrom(w)){u+=x[v]}}return u}},{key:"setHashState",value:function q(v){var u=this.createState(v);
if(this.currentState.url===u.url){return}this.currentState=u;history.replaceState(this.currentState,this.currentState.title,this.currentState.url)
}},{key:"getModalFrom",value:function n(v){for(var u in i.modals){if(v.indexOf(u)!==-1){return i.modals[u]
}}return null}}]);return r}();f.exports=d},{"../../../modal/ModalController":476,"@marcom/ac-event-emitter-micro":147,"@marcom/ac-raf-emitter/draw":424,"@marcom/ac-raf-emitter/external":425,"@marcom/ac-raf-emitter/update":426}],481:[function(b,c,a){c.exports=function d(f){if(f==="xlarge"){f="large"
}if(f==="xsmall"){f="small"}return f}},{}],482:[function(c,d,b){function a(g){if(!g.large){return null
}if(!g.medium){g.medium=g.large}if(!g.small){g.small=g.medium}return g}function f(m){var l=m.split(/,[\s]*/);
var k={};for(var j=0,g=l.length;j<g;j++){var h=l[j].match(/([^:]+):[\s]*(\d+)x(\d+)/);
if(!h){continue}k[h[1]]={width:parseInt(h[2],10),height:parseInt(h[3],10)}}k=a(k);
return k}d.exports=f},{}],483:[function(b,c,a){c.exports=function d(f){for(var i=arguments.length,g=Array(i>1?i-1:0),h=1;
h<i;h++){g[h-1]=arguments[h]}return function(j){var k=f.slice();g.forEach(function(m,l){k[l]+=j[m]
});return k.join("")}}},{}],484:[function(b,c,a){c.exports=function(){var d=b("@marcom/ac-useragent");
return !d.os.android}},{"@marcom/ac-useragent":427}],485:[function(b,c,a){c.exports={Base:b("@marcom/ac-jetpack-lib/core/BaseComponent"),AnimSystem:b("@marcom/anim-system"),EngagedElement:b("@marcom/ac-jetpack-fuel/components/engaged-element/EngagedElementComponent"),LocalnavThemeChanger:b("@marcom/ac-jetpack-fuel/components/localnav-theme-changer/LocalnavThemeChangerComponent"),ProgressiveImage:b("../../components/ProgressiveImage"),PrimaryContentComponent:b("../../components/PrimaryContentComponent"),ModalContentComponent:b("../../components/ModalContentComponent"),ModalWidthComponent:b("../../components/ModalWidthComponent"),VideoPlayer:b("../../components/VideoPlayer/VideoPlayer"),MediaObject:b("../../components/MediaObject"),HeroComponent:b("../../components/HeroComponent")}
},{"../../components/HeroComponent":465,"../../components/MediaObject":466,"../../components/ModalContentComponent":467,"../../components/ModalWidthComponent":468,"../../components/PrimaryContentComponent":469,"../../components/ProgressiveImage":470,"../../components/VideoPlayer/VideoPlayer":472,"@marcom/ac-jetpack-fuel/components/engaged-element/EngagedElementComponent":187,"@marcom/ac-jetpack-fuel/components/localnav-theme-changer/LocalnavThemeChangerComponent":188,"@marcom/ac-jetpack-lib/core/BaseComponent":200,"@marcom/anim-system":448}],486:[function(b,c,a){c.exports={init:function d(){}}
},{}],487:[function(b,a,c){var f=b("@marcom/ac-cname").cname;var j=b("@marcom/ac-object/clone");
var m=b("@marcom/ac-event-emitter-micro").EventEmitterMicro;var n=b("@marcom/ac-media-object");
var p=b("@marcom/ac-viewport-emitter");var k=b("../helpers/clampViewport");var l=b("../helpers/template");
var d=b("../helpers/parseViewportSizes");var g="us";var o="iphone-8/2017/95d4d604-018c-4bb3-a900-2d84eb37a5d7";
var i=l(_templateObject,"locale","directory","name");var h=function(u){_inherits(v,u);
function v(D){var E=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};
_classCallCheck(this,v);var F=_possibleConstructorReturn(this,(v.__proto__||Object.getPrototypeOf(v)).call(this));
F.container=D;F.name=E.name;F.locale=E.locale||g;F.dimensions=E.dimensions;F.disableRetina=!!E.disableRetina;
F.ignoreViewportShrink=!!E.ignoreViewportShrink;F.mediaObjectOptions=E.mediaObject;
F.useSplitFiles=E.useSplitFiles!==undefined?E.useSplitFiles:true;if(typeof F.dimensions==="string"){F.dimensions=d(F.dimensions)
}window.addEventListener("beforeunload",function(){F.mediaElement.style.display="none"
});window.addEventListener("pageshow",function(){F.mediaElement.style.display=null
});F.handleViewportChange();return F}_createClass(v,[{key:"handleViewportChange",value:function B(){var E=k(p.viewport);
var D=p.retina;var F=this.viewport==="large"||this.viewport==="medium"&&E==="small";
if(F&&this.ignoreViewportShrink){return}if(E===this.viewport&&D===this.isRetinaDisplay){return
}this.viewport=E;this.isRetinaDisplay=D;this.reset()}},{key:"load",value:function A(){return this.mediaObject.load()
}},{key:"play",value:function r(){return this.mediaObject.play()}},{key:"pause",value:function C(){return this.mediaObject.pause()
}},{key:"reset",value:function t(){this.trigger("will-reset");if(this.mediaObject){this._destroyMediaObject();
this._replaceMediaContainer()}this._initializeMediaObject();this.trigger("reset")
}},{key:"destroy",value:function z(){this._destroyMediaObject();for(var D in this){if(this.hasOwnProperty(D)){this[D]=null
}}}},{key:"_initializeMediaObject",value:function s(){var D=j(this.mediaSource);
var E=j(this.mediaObjectOptions);this.mediaObject=n.createVideo(this.container,D,E);
this.mediaElement=this.mediaObject.mediaElement;if(this.width&&this.height){this.mediaElement.style.width=this.width+"px";
this.mediaElement.style.height=this.height+"px"}}},{key:"_destroyMediaObject",value:function x(){this.container.classList.remove("mediaobject-enhanced","mediaobject-destroyed");
this.mediaObject.off()}},{key:"_replaceMediaContainer",value:function w(){var D=this.container.cloneNode(false);
this.container.parentNode.replaceChild(D,this.container);this.container=D}},{key:"mediaBasePath",get:function q(){return i({directory:o,name:this.name,locale:this.locale})
}},{key:"mediaSource",get:function q(){var E={basePath:this.mediaBasePath};var D=this.viewport;
if(this.isRetinaDisplay&&!this.disableRetina){D+="_2x"}if(this.useSplitFiles){E.basePath+="/split_files/"+D
}else{E.basePath+="/";E.filename=D;E.fileFormat="mp4"}E.splitFileLoading=this.useSplitFiles;
E.basePath=f.addPrefix(E.basePath);return E}},{key:"progress",set:function y(D){this.mediaObject.goToPercent(D)
},get:function q(){return this.mediaObject.getCurrentPercent()}},{key:"width",get:function q(){return this.dimensions?this.dimensions[this.viewport].width:null
}},{key:"height",get:function q(){return this.dimensions?this.dimensions[this.viewport].height:null
}}]);return v}(m);a.exports=h},{"../helpers/clampViewport":481,"../helpers/parseViewportSizes":482,"../helpers/template":483,"@marcom/ac-cname":26,"@marcom/ac-event-emitter-micro":147,"@marcom/ac-media-object":326,"@marcom/ac-object/clone":340,"@marcom/ac-viewport-emitter":433}],488:[function(d,b,f){var i=d("@marcom/ac-event-emitter-micro").EventEmitterMicro;
var h=d("@marcom/ac-jetpack-lib/utils/Page");var j=d("@marcom/ac-viewport-emitter");
var k=d("@marcom/ac-useragent");var g=d("./MediaObjectManager");var a={disableRetina:true,ignoreViewportShrink:true,autoplay:false,autoload:true,useSplitFiles:false,mediaObject:{iosInline:true}};
var c=function(t){_inherits(w,t);function w(I,G){var F=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};
_classCallCheck(this,w);var H=_possibleConstructorReturn(this,(w.__proto__||Object.getPrototypeOf(w)).apply(this,arguments));
H._videoElement=G;F.name=I;F.locale=H._videoElement.getAttribute("data-video-locale");
H._options=Object.assign(a,F);H._hasLoadStarted=false;H._ios9=k.os.ios&&k.os.version.major===9;
H._bindEvents();H._initialize();return H}_createClass(w,[{key:"_bindEvents",value:function D(){this._onMediaLoaded=this._onMediaLoaded.bind(this);
this._onMediaEnhanced=this._onMediaEnhanced.bind(this);this._onMediaPlay=this._onMediaPlay.bind(this);
this._onMediaPause=this._onMediaPause.bind(this);this._onTimeUpdate=this._onTimeUpdate.bind(this);
this._onMediaEnded=this._onMediaEnded.bind(this);this._onMediaReset=this._onMediaReset.bind(this);
this._onViewportChange=this._onViewportChange.bind(this)}},{key:"_initialize",value:function B(){this._mediaManager=new g(this._videoElement,this._options);
this._mediaManager.on("reset",this._onMediaReset);j.on("change",this._onViewportChange);
this._setupMediaObjectEvents()}},{key:"_setupMediaObjectEvents",value:function A(){this._mediaManager.mediaObject.once("loaded",this._onMediaLoaded);
this._mediaManager.mediaObject.once("enhanced",this._onMediaEnhanced);this._mediaManager.mediaObject.on("play",this._onMediaPlay);
this._mediaManager.mediaObject.on("pause",this._onMediaPause);this._mediaManager.mediaObject.on("ended",this._onMediaEnded);
if(this._ios9){this._mediaManager.mediaObject.on("timeupdate",this._onTimeUpdate)
}this._checkShouldLoad()}},{key:"_checkShouldLoad",value:function r(){if(this._options.autoload||this._options.autoplay||this._hasLoadStarted){this.load()
}}},{key:"_onMediaReset",value:function n(){this._setupMediaObjectEvents();this.trigger("video_reset")
}},{key:"_onMediaLoaded",value:function l(){this._mediaManager.mediaObject.enhance()
}},{key:"_onMediaEnhanced",value:function C(){h.deepRefreshAllElementMetrics();
this.trigger("video_ready")}},{key:"_onMediaPlay",value:function E(){this.trigger("video_play")
}},{key:"_onMediaPause",value:function u(){this.trigger("video_pause")}},{key:"_onTimeUpdate",value:function m(){if(this._ios9&&this._mediaManager.mediaObject.getCurrentTime()===this._mediaManager.mediaObject.getDuration()){this._mediaManager.mediaObject.trigger("ended")
}}},{key:"_onMediaEnded",value:function v(){this.trigger("video_ended")}},{key:"_onViewportChange",value:function p(){this._mediaManager.handleViewportChange()
}},{key:"load",value:function q(){return new Promise(function(G,F){this._mediaManager.mediaObject.once("loaded",G);
this._mediaManager.load()}.bind(this))}},{key:"play",value:function x(){this._mediaManager.play()
}},{key:"pause",value:function o(){this._mediaManager.pause()}},{key:"reset",value:function z(){this._mediaManager.reset()
}},{key:"isReady",get:function y(){return this._mediaManager.mediaObject.getLoaded()&&this._mediaManager.mediaObject.getEnhanced()
}},{key:"progress",set:function s(F){this._mediaManager.progress=F},get:function y(){return this._mediaManager.progress
}},{key:"mediaManager",get:function y(){return this._mediaManager}}]);return w}(i);
b.exports=c},{"./MediaObjectManager":487,"@marcom/ac-event-emitter-micro":147,"@marcom/ac-jetpack-lib/utils/Page":207,"@marcom/ac-useragent":427,"@marcom/ac-viewport-emitter":433}]},{},[473]);