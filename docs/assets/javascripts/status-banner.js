/* Maintenance announcement bar — client-side time gate.
 *
 * overrides/main.html bakes the next maintenance window into a HIDDEN
 * .mb-status-banner--maintenance span (data-mb-start / data-mb-end are local
 * ISO datetimes with explicit UTC offsets, written by the more-buttons
 * extension). The site is static and only rebuilds on pushes, so showing the
 * bar "from 7 days before the window" has to happen in the visitor's browser:
 * this script reveals the bar inside [start − 7 days, end), swaps the copy to
 * "in progress" during the window, and re-hides it after the end. Incident
 * banners always win — main.html only emits the maintenance markup when no
 * incident banner is active. */
(function () {
  'use strict';

  var LEAD_MS = 7 * 24 * 60 * 60 * 1000; // announce 7 days ahead
  var timer = null;

  function fmtWindow(startMs, endMs) {
    var start = new Date(startMs);
    var end = new Date(endMs);
    var day = new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short' });
    var time = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' });
    var sameDay = day.format(start) === day.format(end);
    return sameDay
      ? day.format(start) + ', ' + time.format(start) + ' – ' + time.format(end)
      : day.format(start) + ', ' + time.format(start) + ' – ' + day.format(end) + ', ' + time.format(end);
  }

  function update() {
    var banner = document.querySelector('.mb-status-banner--maintenance');
    if (!banner) return;

    var startMs = Date.parse(banner.getAttribute('data-mb-start') || '');
    var endMs = Date.parse(banner.getAttribute('data-mb-end') || '');
    if (isNaN(startMs) || isNaN(endMs)) { banner.hidden = true; return; }

    var now = Date.now();
    var textEl = banner.querySelector('.mb-status-banner__text');
    var windowEl = banner.querySelector('.mb-status-banner__window');

    if (now < startMs - LEAD_MS || now >= endMs) {
      banner.hidden = true;
      return;
    }
    /* Lead sentence and the date/time window live in separate spans so the
       window (grouped with the Read more button in main.html) wraps to its own
       line on narrow screens instead of splitting mid-range. */
    if (textEl) {
      textEl.textContent = now < startMs
        ? 'Opus Compliance Cloud planned maintenance:'
        : 'Opus Compliance Cloud planned maintenance is in progress';
    }
    if (windowEl) {
      windowEl.textContent = now < startMs ? fmtWindow(startMs, endMs) : '';
    }
    banner.hidden = false;
  }

  function start() {
    update();
    if (timer) clearInterval(timer);
    timer = setInterval(update, 60 * 1000); // catch boundary crossings while the tab stays open
  }

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(start);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
