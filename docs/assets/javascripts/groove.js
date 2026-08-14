!function(e,t){if(!e.groove){var i=function(e,t){return Array.prototype.slice.call(e,t)},a={widget:null,loadedWidgets:{},classes:{Shim:null,Embeddable:function(){this._beforeLoadCallQueue=[],this.shim=null,this.finalized=!1;var e=function(e){var t=i(arguments,1);if(this.finalized){if(!this[e])throw new TypeError(e+"() is not a valid widget method");this[e].apply(this,t)}else this._beforeLoadCallQueue.push([e,t])};this.initializeShim=function(){a.classes.Shim&&(this.shim=new a.classes.Shim(this))},this.exec=e,this.init=function(){e.apply(this,["init"].concat(i(arguments,0))),this.initializeShim()},this.onShimScriptLoad=this.initializeShim.bind(this),this.onload=void 0}},scriptLoader:{callbacks:{},states:{},load:function(e,i){if("pending"!==this.states[e]){this.states[e]="pending";var a=t.createElement("script");a.id=e,a.type="text/javascript",a.async=!0,a.src=i;var s=this;a.addEventListener("load",(function(){s.states[e]="completed",(s.callbacks[e]||[]).forEach((function(e){e()}))}),!1);var n=t.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n)}},addListener:function(e,t){"completed"!==this.states[e]?(this.callbacks[e]||(this.callbacks[e]=[]),this.callbacks[e].push(t)):t()}},createEmbeddable:function(){var t=new a.classes.Embeddable;return e.Proxy?new Proxy(t,{get:function(e,t){return e instanceof a.classes.Embeddable?Object.prototype.hasOwnProperty.call(e,t)||"onload"===t?e[t]:function(){e.exec.apply(e,[t].concat(i(arguments,0)))}:e[t]}}):t},createWidget:function(){var e=a.createEmbeddable();return a.scriptLoader.load("groove-script","https://4ac3a72b-1852-4939-a8bf-7c3abd82d633.widget.cluster.groovehq.com/api/loader"),a.scriptLoader.addListener("groove-iframe-shim-loader",e.onShimScriptLoad),e}};e.groove=a}}(window,document);
window.groove.widget = window.groove.createWidget();
window.groove.widget.init('4ac3a72b-1852-4939-a8bf-7c3abd82d633', {});

var grooveOverlay = document.createElement('div');
grooveOverlay.style.cssText = 'opacity:0;pointer-events:none;position:fixed;inset:0;background:rgba(0,0,0,0.25);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);z-index:2147483646;transition:opacity 0.3s ease;';
grooveOverlay.addEventListener('click', function () {
  window.groove.widget.close();
});
document.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(grooveOverlay);
});

// Once Groove injects its container, fix transparency then use ResizeObserver on
// the iframe to detect open/close — the iframe expands when the panel opens.
new MutationObserver(function(mutations, outerObs) {
  var container = document.getElementById('groove-container-4ac3a72b-1852-4939-a8bf-7c3abd82d633');
  if (!container) return;
  outerObs.disconnect();
  container.style.setProperty('background', 'transparent', 'important');

  var savedPosition = {
    left:      container.style.left,
    top:       container.style.top,
    right:     container.style.right,
    bottom:    container.style.bottom,
    transform: container.style.transform
  };

  function attachToIframe(iframe) {
    iframe.style.setProperty('background', 'transparent', 'important');
    iframe.setAttribute('allowtransparency', 'true');

    var closedWidth = null;
    var closedHeight = null;
    var didCenter = false;

    new ResizeObserver(function(entries) {
      var rect = entries[0].contentRect;
      if (closedWidth === null) {
        // First observation is the widget at rest — record as closed baseline.
        closedWidth = rect.width;
        closedHeight = rect.height;
        return;
      }
      var isOpen = rect.width > closedWidth + 50 || rect.height > closedHeight + 50;
      // On small viewports Groove stretches the container full-screen via its
      // inset values, so centering (right/bottom: auto) collapses it to a tiny
      // box — leave the container alone there and skip the overlay too.
      var centerPanel = window.matchMedia('(min-width: 768px)').matches;
      grooveOverlay.style.opacity = isOpen && centerPanel ? '1' : '0';
      grooveOverlay.style.pointerEvents = isOpen && centerPanel ? 'auto' : 'none';
      if (isOpen && centerPanel) {
        didCenter = true;
        container.style.setProperty('left',      '50%',                   'important');
        container.style.setProperty('top',       '50%',                   'important');
        container.style.setProperty('right',     'auto',                  'important');
        container.style.setProperty('bottom',    'auto',                  'important');
        container.style.setProperty('transform', 'translate(-50%, -50%)', 'important');
      } else if (didCenter) {
        didCenter = false;
        ['left', 'top', 'right', 'bottom', 'transform'].forEach(function(prop) {
          container.style.setProperty(prop, savedPosition[prop]);
        });
      }
    }).observe(iframe);
  }

  var iframe = container.querySelector('iframe');
  if (iframe) {
    attachToIframe(iframe);
  } else {
    new MutationObserver(function(mutations, iframeObs) {
      var iframe = container.querySelector('iframe');
      if (iframe) {
        iframeObs.disconnect();
        attachToIframe(iframe);
      }
    }).observe(container, { childList: true, subtree: true });
  }
}).observe(document.documentElement, { childList: true, subtree: true });

var params = new URLSearchParams(window.location.search);

if (params.get('open-support-form') === 'true') {
  window.groove.widget.open();
}