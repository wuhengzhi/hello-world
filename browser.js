(function(mercury){
	//没有与全局"opera"对象对等的概念，mercury可以认为就是window
	if(!mercury || mercury._browserjsran)return;
	mercury._browserjsran=true;
	// variables and utility functions
	var navRestore = {}; // keep original navigator.* values
	var shouldRestore = false;
	var hostname = {
		value:location.hostname, 
		toString:function(){return this.value;},
		valueOf:function(){return this.value;}, 
		indexOf:function(str){return this.value.indexOf(str);},
		match: function(rx){ return this.value.match(rx); },
		contains:function(str){ return this.value.indexOf(str)>-1; },
		endsWith:function(str){ var pos=this.value.indexOf(str);return pos>-1 && this.value.length===pos+str.length; }
	}
	var href = location.href;
	var pathname=location.pathname;
	var fixed = false; // magic fixes need only run once
	if(!mercury.postError)mercury.postError=function(){}; // handling versions w/o error console
	// Storing function references
	var postError = mercury.postError,
	call = Function.prototype.call,
	indexOf=String.prototype.indexOf,
	lastIndexOf=String.prototype.lastIndexOf,
	replace=String.prototype.replace,
	match=String.prototype.match,
	toLowerCase=String.prototype.toLowerCase,
	getAttribute=Element.prototype.getAttribute,
	setAttribute=Element.prototype.setAttribute,
	insertBefore=Node.prototype.insertBefore,
	insertAdjacentHTML=Element.prototype.insertAdjacentHTML,
	defineMagicVariable=mercury.defineMagicVariable,
	defineMagicFunction=mercury.defineMagicFunction,
	version=43; //mercury.version,
	getElementById=Document.prototype.getElementById,
	appendChild=Node.prototype.appendChild,
	removeChild=Node.prototype.removeChild,
	replaceChild=Node.prototype.replaceChild,
	evaluate=Document.prototype.evaluate,
	getElementsByTagName=Document.prototype.getElementsByTagName,
	createElement=Document.prototype.createElement,
	createEvent=Document.prototype.createEvent,
	dispatchEvent=Document.prototype.dispatchEvent,
	initEvent=Event.prototype.initEvent,
	createTextNode=Document.prototype.createTextNode,
	stopPropagation=Event.prototype.stopPropagation,
	preventDefault=Event.prototype.preventDefault,
	getComputedStyle=window.getComputedStyle,
	slice=Array.prototype.slice,
	shift=Array.prototype.shift,
	setTimeout=window.setTimeout,
	removeAttribute=Element.prototype.removeAttribute,
	addEventListener=Document.prototype.addEventListener,
	isNaN=window.isNaN,
	RegExp=window.RegExp,
	unescape=window.unescape,
	func_toString=Function.prototype.toString,
	parseFloat=window.parseFloat,
	random=Math.random;
	var mercury_version = 28; //parseFloat.call(window,mercury.version());
	var tinyMCEVersionInfo={};
	function log(str){
		//if(self==top)postError.call(mercury, 'Opera has modified the JavaScript on '+hostname+' ('+str+'). See browser.js for details');
	}

	function addCssToDocument(cssText, doc, mediaType){
		getElementsByTagName.call=addEventListener.call=createElement.call=createTextNode.call=insertBefore.call=setAttribute.call=appendChild.call=version.call=call;
		doc = doc||document;
		mediaType = mediaType||'';
		addCssToDocument.styleObj=addCssToDocument.styleObj||{};
		var styles = addCssToDocument.styleObj[mediaType];
		if(!styles){
			var head = getElementsByTagName.call(doc, "head")[0];
			if( !head ){
				var docEl = getElementsByTagName.call(doc, "html")[0];
				if(!docEl){
					// :S this shouldn't happen - see if document hasn't loaded
					addEventListener.call(doc, 'DOMContentLoaded', function(){ addCssToDocument(cssText, doc); },false);
					return;
				}
				head = createElement.call(doc, "head");
				if(head) insertBefore.call(docEl, head,docEl.firstChild);
				else head = docEl;
			}
			addCssToDocument.styleObj[mediaType] = styles = createElement.call(doc, "style");
			setAttribute.call(styles, "type","text/css");
			if(mediaType)setAttribute.call(styles, "media", mediaType);
			appendChild.call(styles, createTextNode.call(doc,' '));
			appendChild.call(head, styles)
		}
		styles.firstChild.nodeValue += cssText+"\n";
		return true;
	}

	function forceMobileView(){
	if( document.documentElement ){
		var meta=document.documentElement.appendChild(document.createElement('meta'));
		meta.setAttribute('name', "viewport");
		meta.setAttribute('content', "width=device-width,user-scalable=no");
	}}

	function forceWordWrapping(wrapTargets) {
		var wrapElements = wrapTargets||'div, span, p, li, a, td, th';
		//mercury.postError('Warning: Browser has forced word wrapping for certain elements.');
		addCssToDocument(wrapElements + '{ white-space: -o-pre-wrap !important; }')
	}
	function scaleImagesToScreenWidth(maxWidth) {
		var max = maxWidth || screen.width;
		addCssToDocument('img { max-width: ' + max + 'px !important; height: auto !important; }');
		//mercury.postError('Warning: Image resized to screen width by browser. See browser.js for details.');
	}

	//TODO: need `defineMagicFunction`? but should be able to set to global window obj;

	if(hostname=='www.cnbeta.com'){
		//TEST ONLY
		document.addEventListener('DOMContentLoaded', function(e){
			if(document.body){
				document.body.appendChild(document.createTextNode("Hello World!"));
			}
		}, false);
		addCssToDocument("div.item {line-height: 150% !important;}");
	}
	if(hostname.endsWith('baidu.com')){
		//TEST ONLY
		document.addEventListener('DOMContentLoaded', function(e){
			if(document.body){
				document.body.appendChild(document.createTextNode("Hello World..."));
			}
		}, false);
		addCssToDocument("div.item {line-height: 80% !important;}");
	}
})(window);
