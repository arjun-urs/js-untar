!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.untar=t()}(this,function(){"use strict";function e(e){function t(e){for(var t=0,i=r.length;i>t;++t)r[t](e);n.push(e)}if("function"!=typeof Promise)throw new Error("Promise implementation not available in this environment.");var r=[],n=[],i=new Promise(function(r,n){e(r,n,t)});i.progress=function(e){if("function"!=typeof e)throw new Error("cb is not a function.");for(var t=0,o=n.length;o>t;++t)e(n[t]);return r.push(e),i};var o=i.then;return i.then=function(e,t,r){return o.call(i,e,t),void 0!==r&&i.progress(r),i},i}function t(t){if(!(t instanceof ArrayBuffer))throw new TypeError("arrayBuffer is not an instance of ArrayBuffer.");if(!window.Worker)throw new Error("Worker implementation not available in this environment.");return new e(function(e,i,o){var a=new Worker(n),s=[];a.onerror=function(e){i(e)},a.onmessage=function(t){switch(t=t.data,t.type){case"log":console[t.data.level]("Worker: "+t.data.msg);break;case"extract":var n=r(t.data);s.push(n),o(n);break;case"complete":e(s);break;case"error":i(new Error(t.data.message));break;default:i(new Error("Unknown message from worker: "+t.type))}},a.postMessage({type:"extract",buffer:t},[t])})}function r(e){return Object.defineProperties(e,o),e}var n,i=window.URL||window.webkitURL,o={blob:{get:function(){return this._blob||(this._blob=new Blob([this.buffer]))}},getBlobUrl:{value:function(){return this._blobUrl||(this._blobUrl=i.createObjectURL(this.blob))}},readAsString:{value:function(){for(var e=this.buffer,t=e.byteLength,r=1,n=new DataView(e),i=[],o=0;t>o;++o){var a=n.getUint8(o*r,!0);i.push(a)}return this._string=String.fromCharCode.apply(null,i)}},readAsJSON:{value:function(){return JSON.parse(this.readAsString())}}};return n=i.createObjectURL(new Blob(['"use strict";function UntarWorker(){}function TarFile(){}function UntarStream(e){this._bufferView=new DataView(e),this._position=0}function UntarFileStream(e){this._stream=new UntarStream(e)}if(UntarWorker.prototype={onmessage:function(e){try{if("extract"!==e.data.type)throw new Error("Unknown message type: "+e.data.type);this.untarBuffer(e.data.buffer)}catch(t){this.postError(t)}},postError:function(e){this.postMessage({type:"error",data:{message:e.message}})},postLog:function(e,t){console.info("postLog"),this.postMessage({type:"log",data:{level:e,msg:t}})},untarBuffer:function(e){try{for(var t=new UntarFileStream(e);t.hasNext();){var r=t.next();this.postMessage({type:"extract",data:r},[r.buffer])}this.postMessage({type:"complete"})}catch(i){this.postError(i)}},postMessage:function(e,t){console.info("postMessage("+e+", "+JSON.stringify(t)+")"),self.postMessage(e,t)}},"undefined"!=typeof self){var worker=new UntarWorker;self.onmessage=function(e){worker.onmessage(e)}}UntarStream.prototype={readString:function(e){for(var t=1,r=e*t,i=[],n=0;e>n;++n){var s=this._bufferView.getUint8(this.position()+n*t,!0);if(0===s)break;i.push(s)}return this.seek(r),String.fromCharCode.apply(null,i)},readBuffer:function(e){var t;if("function"==typeof ArrayBuffer.prototype.slice)t=this._bufferView.buffer.slice(this.position(),this.position()+e);else{t=new ArrayBuffer(e);var r=new Uint8Array(t),i=new Uint8Array(this._bufferView.buffer,this.position(),e);r.set(i)}return this.seek(e),t},seek:function(e){this._position+=e},peekUint32:function(){return this._bufferView.getUint32(this.position(),!0)},position:function(e){return void 0===e?this._position:void(this._position=e)},size:function(){return this._bufferView.byteLength}},UntarFileStream.prototype={hasNext:function(){return this._stream.position()+4<this._stream.size()&&0!==this._stream.peekUint32()},next:function(){var e=this._stream,t=new TarFile,r=e.position(),i=r+512;t.name=e.readString(100),t.mode=e.readString(8),t.uid=e.readString(8),t.gid=e.readString(8),t.size=parseInt(e.readString(12),8),t.modificationTime=parseInt(e.readString(12),8),t.checksum=e.readString(8),t.type=e.readString(1),t.linkname=e.readString(1),t.ustarFormat=e.readString(6),"ustar"===t.ustarFormat&&(t.version=e.readString(2),t.uname=e.readString(32),t.gname=e.readString(32),t.devmajor=e.readString(8),t.devminor=e.readString(8),t.namePrefix=e.readString(155),t.namePrefix.length>0&&(t.name=t.namePrefix+t.name)),e.position(i),"0"===t.type||"\x00"===t.type?t.buffer=e.readBuffer(t.size):5==t.type,void 0===t.buffer&&(t.buffer=new ArrayBuffer(0));var n=i+(t.size>0?t.size+(512-t.size%512):0);return e.position(n),t}};'])),t});