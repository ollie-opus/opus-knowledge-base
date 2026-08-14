/* System Status page — client-side time reconciliation.
 *
 * The status markdown is only reconciled when the more-buttons extension next
 * pushes, and the site only rebuilds on pushes — so between commits this
 * script makes the rendered page track the clock on its own:
 *
 *   1. Maintenance event cards move between Upcoming / Active / Past as their
 *      window (data-mb-start / data-mb-end on the hidden span, ISO with UTC
 *      offset) starts and ends, and their `Current Status` text follows.
 *      Forward-only, mirroring the extension's reconciliation sweep.
 *   2. Service tiles named by an in-progress window flip to MAINTENANCE —
 *      but only tiles currently Available: incident statuses (disruption /
 *      outage) always outrank maintenance. Stale maintenance tiles with no
 *      live window flip back to Available.
 *
 * Loaded only on pages with `status-page: true` frontmatter (overrides/main.html). */
(function () {
  'use strict';

  var RANK = { 'upcoming': 0, 'in progress': 1, 'completed': 2 };
  var LABEL = { 'upcoming': 'Upcoming', 'in progress': 'In progress', 'completed': 'Completed' };
  var timer = null;

  function headingByText(text) {
    var headings = document.querySelectorAll('.md-typeset h2');
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].textContent.replace(/¶/g, '').trim() === text) return headings[i];
    }
    return null;
  }

  function phaseOf(el, now) {
    var span = el.querySelector('span[data-mb-start]');
    if (!span) return null;
    var start = Date.parse(span.getAttribute('data-mb-start') || '');
    var end = Date.parse(span.getAttribute('data-mb-end') || '');
    if (!isNaN(end) && now >= end) return 'completed';
    if (!isNaN(start) && now >= start) return 'in progress';
    return 'upcoming';
  }

  function storedStatusOf(el) {
    var codes = el.querySelectorAll('code');
    for (var i = 0; i < codes.length; i++) {
      var host = codes[i].closest('li, p');
      if (host && host.textContent.indexOf('Current Status') !== -1) {
        return (codes[i].textContent || '').trim().toLowerCase();
      }
    }
    return 'upcoming';
  }

  function setStoredStatus(el, status) {
    var codes = el.querySelectorAll('code');
    for (var i = 0; i < codes.length; i++) {
      var host = codes[i].closest('li, p');
      if (host && host.textContent.indexOf('Current Status') !== -1) {
        codes[i].textContent = LABEL[status] || status;
        return;
      }
    }
  }

  function titleOf(el) {
    var title = el.querySelector('.admonition-title, summary');
    return title ? title.textContent.replace(/¶/g, '').trim() : '';
  }

  function placementOf(el, pastDetails, activeHeading) {
    if (pastDetails && pastDetails.contains(el)) return 'past';
    if (activeHeading && (el.compareDocumentPosition(activeHeading) & Node.DOCUMENT_POSITION_PRECEDING)) return 'active';
    return 'upcoming';
  }

  function update() {
    var now = Date.now();
    var activeHeading = headingByText('Active Events');
    var pastHeading = headingByText('Past Events');
    var pastDetails = null;
    if (pastHeading) {
      var walk = pastHeading.nextElementSibling;
      while (walk && !pastDetails) {
        if (walk.matches && walk.matches('details.outline')) pastDetails = walk;
        walk = walk.nextElementSibling;
      }
    }

    // 1. Move maintenance event cards whose phase has outrun their placement.
    var inProgressServices = [];
    var cards = document.querySelectorAll('.md-typeset .admonition.status-maintenance, .md-typeset details.status-maintenance');
    for (var i = 0; i < cards.length; i++) {
      var el = cards[i];
      if (el.closest('.grid')) continue; // service tile, handled below
      var phase = phaseOf(el, now);
      if (!phase) continue;
      var stored = storedStatusOf(el);
      var shown = (RANK[phase] || 0) > (RANK[stored] || 0) ? phase : stored; // forward-only
      if (shown !== stored) setStoredStatus(el, shown);

      var placement = placementOf(el, pastDetails, activeHeading);
      if (shown === 'in progress') {
        inProgressServices = inProgressServices.concat(titleOf(el).split(','));
        if (placement !== 'active' && activeHeading) activeHeading.insertAdjacentElement('afterend', el);
      } else if (shown === 'completed' && placement !== 'past' && pastDetails) {
        var summary = pastDetails.querySelector('summary');
        if (summary) summary.insertAdjacentElement('afterend', el);
      }
    }
    var underMaintenance = {};
    for (var s = 0; s < inProgressServices.length; s++) {
      var name = inProgressServices[s].trim();
      if (name) underMaintenance[name] = true;
    }

    // 2. Re-skin service tiles: Available ↔ Maintenance only — incident
    //    statuses on a tile always win and are never touched.
    var tiles = document.querySelectorAll('.md-typeset .grid .admonition');
    for (var t = 0; t < tiles.length; t++) {
      var tile = tiles[t];
      var tileName = titleOf(tile);
      var wanted = underMaintenance[tileName];
      if (wanted && tile.classList.contains('status-available')) {
        tile.classList.remove('status-available');
        tile.classList.add('status-maintenance');
        setTileStatusText(tile, 'MAINTENANCE');
      } else if (!wanted && tile.classList.contains('status-maintenance')) {
        tile.classList.remove('status-maintenance');
        tile.classList.add('status-available');
        setTileStatusText(tile, 'AVAILABLE');
      }
    }
  }

  function setTileStatusText(tile, value) {
    var strongs = tile.querySelectorAll('strong');
    for (var i = 0; i < strongs.length; i++) {
      if (strongs[i].textContent.indexOf('Status') !== -1) {
        var node = strongs[i].nextSibling;
        if (node && node.nodeType === Node.TEXT_NODE) node.textContent = ' ' + value;
        else strongs[i].insertAdjacentText('afterend', ' ' + value);
        return;
      }
    }
  }

  function start() {
    update();
    if (timer) clearInterval(timer);
    timer = setInterval(update, 60 * 1000);
  }

  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(start);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
