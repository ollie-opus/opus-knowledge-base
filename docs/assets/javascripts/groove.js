!function(e,t){if(!e.groove){var i=function(e,t){return Array.prototype.slice.call(e,t)},a={widget:null,loadedWidgets:{},classes:{Shim:null,Embeddable:function(){this._beforeLoadCallQueue=[],this.shim=null,this.finalized=!1;var e=function(e){var t=i(arguments,1);if(this.finalized){if(!this[e])throw new TypeError(e+"() is not a valid widget method");this[e].apply(this,t)}else this._beforeLoadCallQueue.push([e,t])};this.initializeShim=function(){a.classes.Shim&&(this.shim=new a.classes.Shim(this))},this.exec=e,this.init=function(){e.apply(this,["init"].concat(i(arguments,0))),this.initializeShim()},this.onShimScriptLoad=this.initializeShim.bind(this),this.onload=void 0}},scriptLoader:{callbacks:{},states:{},load:function(e,i){if("pending"!==this.states[e]){this.states[e]="pending";var a=t.createElement("script");a.id=e,a.type="text/javascript",a.async=!0,a.src=i;var s=this;a.addEventListener("load",(function(){s.states[e]="completed",(s.callbacks[e]||[]).forEach((function(e){e()}))}),!1);var n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n)}},addListener:function(e,t){"completed"!==this.states[e]?(this.callbacks[e]||(this.callbacks[e]=[]),this.callbacks[e].push(t)):t()}},createEmbeddable:function(){var t=new a.classes.Embeddable;return e.Proxy?new Proxy(t,{get:function(e,t){return e instanceof a.classes.Embeddable?Object.prototype.hasOwnProperty.call(e,t)||"onload"===t?e[t]:function(){e.exec.apply(e,[t].concat(i(arguments,0)))}:e[t]}}):t},createWidget:function(){var e=a.createEmbeddable();return a.scriptLoader.load("groove-script","https://4ac3a72b-1852-4939-a8bf-7c3abd82d633.widget.cluster.groovehq.com/api/loader"),a.scriptLoader.addListener("groove-iframe-shim-loader",e.onShimScriptLoad),e}};e.groove=a}}(window,document);
window.groove.widget = window.groove.createWidget();
window.groove.widget.init('4ac3a72b-1852-4939-a8bf-7c3abd82d633', {});

var grooveOverlay = document.createElement('div');
grooveOverlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.25);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:2147483646;transition:opacity 0.2s ease;';
grooveOverlay.addEventListener('click', function () {
  window.groove.widget.close();
});
document.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(grooveOverlay);
});

// Force transparent background on Groove container/iframe after widget injects them,
// then watch the container for open/close to sync the overlay
new MutationObserver(function(mutations, observer) {
  var container = document.getElementById('groove-container-4ac3a72b-1852-4939-a8bf-7c3abd82d633');
  if (container) {
    container.style.setProperty('background', 'transparent', 'important');
    var iframe = container.querySelector('iframe');
    if (iframe) {
      iframe.style.setProperty('background', 'transparent', 'important');
      iframe.setAttribute('allowtransparency', 'true');
    }
    observer.disconnect();
    new MutationObserver(function () {
      var open = getComputedStyle(container).display !== 'none';
      grooveOverlay.style.display = open ? 'block' : 'none';
    }).observe(container, { attributes: true, attributeFilter: ['style', 'class'] });
  }
}).observe(document.documentElement, { childList: true, subtree: true });

var params = new URLSearchParams(window.location.search);

if (params.get('open-support-form') === 'true') {
  window.groove.widget.open();
}