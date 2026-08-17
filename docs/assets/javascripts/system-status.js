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

  // Sentinel `Services Affected` value meaning every service tile. Keep in step
  // with ALL_SERVICES in the extension's scripts/statusEvents.js.
  var ALL_SERVICES = 'All Services';
  var RANK = { 'upcoming': 0, 'in progress': 1, 'completed': 2 };
  var LABEL = { 'upcoming': 'Upcoming', 'in progress': 'In progress', 'completed': 'Completed' };
  // Status values render as label pills; the colour class follows the status.
  var STATUS_SLUG = { 'upcoming': 'orange', 'in progress': 'amber', 'completed': 'green' };
  // Each pill leads with a lucide icon, authored in the markdown as a
  // `:lucide-*:` shortcode. Shortcodes are resolved at BUILD time, so a status
  // this script advances client-side has to carry its own icon markup — these
  // are the icon files zensical inlines, verbatim (templates/.icons/lucide/).
  // Keep in step with STATUS_ICON in the extension's scripts/statusEvents.js.
  var SVG_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"' +
    ' stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="lucide lucide-';
  var STATUS_ICON = {
    'upcoming': SVG_OPEN + 'fast-forward" viewBox="0 0 24 24">' +
      '<path d="M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z"/>' +
      '<path d="M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z"/></svg>',
    'in progress': SVG_OPEN + 'refresh-cw" viewBox="0 0 24 24">' +
      '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>' +
      '<path d="M21 3v5h-5M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>' +
      '<path d="M8 16H3v5"/></svg>',
    'completed': SVG_OPEN + 'check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
  };
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

  // The Current Status value is a label pill (`.mb-label`); legacy markup used
  // a backticked value, which renders as <code> — kept as a read fallback for
  // stale-cached pages.
  function statusValueEl(el) {
    var values = el.querySelectorAll('.mb-label, code');
    for (var i = 0; i < values.length; i++) {
      var host = values[i].closest('li, p');
      if (host && host.textContent.indexOf('Current Status') !== -1) return values[i];
    }
    return null;
  }

  function storedStatusOf(el) {
    var value = statusValueEl(el);
    return value ? (value.textContent || '').trim().toLowerCase() : 'upcoming';
  }

  function setStoredStatus(el, status) {
    var value = statusValueEl(el);
    if (!value) return;
    var label = LABEL[status] || status;
    // The pill's icon is a build-time-rendered SVG: writing textContent would
    // destroy it, so re-emit icon + label together. Legacy backticked values
    // (<code>, no icon) keep the plain-text path.
    var icon = value.classList.contains('mb-label') ? STATUS_ICON[status] : null;
    if (icon) value.innerHTML = '<span class="twemoji">' + icon + '</span> ' + label;
    else value.textContent = label;
    // Keep the pill colour in step with the status it shows.
    if (value.classList.contains('mb-label')) {
      value.className = 'mb-label mb-label-' + (STATUS_SLUG[status] || 'orange');
    }
  }

  function titleOf(el) {
    var title = el.querySelector('.admonition-title, summary');
    return title ? title.textContent.replace(/¶/g, '').trim() : '';
  }

  // Event cards list their services in a `Services Affected` field (the card
  // title is the event kind pill); legacy cards carried them in the title.
  function servicesOf(el) {
    var strongs = el.querySelectorAll('strong');
    for (var i = 0; i < strongs.length; i++) {
      if (strongs[i].textContent.indexOf('Services Affected') === 0) {
        var host = strongs[i].closest('li, p');
        var text = host ? host.textContent : '';
        return text.slice(text.indexOf(':') + 1);
      }
    }
    return titleOf(el);
  }

  // The markdown's timestamp lines (Scheduled Start/End on maintenance,
  // Reported/Resolved on incidents) are the AUTHOR's local wall-clock with no
  // zone label — ambiguous for visitors in other timezones. The hidden span
  // carries the true instants (ISO with UTC offset), so rewrite each line into
  // the visitor's own local time, labelled with their zone (e.g. "BST",
  // "GMT-4"). Idempotent: same output every tick.
  var scheduleFmt = new Intl.DateTimeFormat(undefined, {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  function localizeScheduleLines(el) {
    var span = el.querySelector('span[data-mb-start], span[data-mb-reported]');
    if (!span) return;
    var instants = {
      'Scheduled Start': Date.parse(span.getAttribute('data-mb-start') || ''),
      'Scheduled End': Date.parse(span.getAttribute('data-mb-end') || ''),
      'Reported': Date.parse(span.getAttribute('data-mb-reported') || ''),
      'Resolved': Date.parse(span.getAttribute('data-mb-resolved') || ''),
    };
    var strongs = el.querySelectorAll('strong');
    for (var i = 0; i < strongs.length; i++) {
      var label = strongs[i].textContent.replace(/:\s*$/, '');
      var ms = instants[label];
      if (ms === undefined || isNaN(ms)) continue;
      var text = scheduleFmt.format(new Date(ms));
      var pill = strongs[i].nextElementSibling;
      if (pill && pill.classList && pill.classList.contains('mb-label')) {
        // Timestamp sits inside a slate pill — replace the pill's text, never
        // append beside it (nextSibling is whitespace, not the value).
        pill.textContent = text;
      } else {
        // Legacy markup: bare text node after the <strong>.
        var node = strongs[i].nextSibling;
        if (node && node.nodeType === Node.TEXT_NODE) node.textContent = ' ' + text;
        else strongs[i].insertAdjacentText('afterend', ' ' + text);
      }
    }
  }

  /* Which section a card currently sits in — the nearest h2 ABOVE it, not a
     single comparison against one heading: the page orders Active before
     Upcoming, so "after the Active heading" is true of both sections. */
  function placementOf(el, pastDetails, headings) {
    if (pastDetails && pastDetails.contains(el)) return 'past';
    var placement = 'upcoming';
    for (var i = 0; i < headings.length; i++) {
      var heading = headings[i].el;
      // PRECEDING = the heading comes before the card in document order.
      if (heading && (el.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_PRECEDING)) {
        placement = headings[i].name;
      }
    }
    return placement;
  }

  function update() {
    var now = Date.now();
    var activeHeading = headingByText('Active Events');
    // Section headings in document order, so placementOf can take the last one
    // above a card. Order-agnostic: the page has changed it once already.
    var sectionHeadings = [
      { name: 'upcoming', el: headingByText('Upcoming Events') },
      { name: 'active', el: activeHeading },
    ].filter(function (h) { return !!h.el; }).sort(function (a, b) {
      return (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
    });
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
      localizeScheduleLines(el);
      var phase = phaseOf(el, now);
      if (!phase) continue;
      var stored = storedStatusOf(el);
      var shown = (RANK[phase] || 0) > (RANK[stored] || 0) ? phase : stored; // forward-only
      if (shown !== stored) setStoredStatus(el, shown);

      var placement = placementOf(el, pastDetails, sectionHeadings);
      if (shown === 'in progress') {
        inProgressServices = inProgressServices.concat(servicesOf(el).split(','));
        if (placement !== 'active' && activeHeading) activeHeading.insertAdjacentElement('afterend', el);
      } else if (shown === 'completed' && placement !== 'past' && pastDetails) {
        var summary = pastDetails.querySelector('summary');
        if (summary) summary.insertAdjacentElement('afterend', el);
      }
    }
    var underMaintenance = {};
    var allUnderMaintenance = false;
    for (var s = 0; s < inProgressServices.length; s++) {
      var name = inProgressServices[s].trim();
      // The `All Services` sentinel covers every tile, whatever they are — the
      // card deliberately stores it instead of an expanded list.
      if (name.toLowerCase() === ALL_SERVICES.toLowerCase()) allUnderMaintenance = true;
      else if (name) underMaintenance[name] = true;
    }

    // Incident cards only need their Reported/Resolved timestamps localized —
    // they never move sections or change status client-side.
    var incidents = document.querySelectorAll(
      '.md-typeset .admonition.status-outage, .md-typeset details.status-outage, ' +
      '.md-typeset .admonition.status-disruption, .md-typeset details.status-disruption');
    for (var n = 0; n < incidents.length; n++) {
      if (incidents[n].closest('.grid')) continue; // service tile
      localizeScheduleLines(incidents[n]);
    }

    // 2. Re-skin service tiles: Available ↔ Maintenance only — incident
    //    statuses on a tile always win and are never touched.
    var tiles = document.querySelectorAll('.md-typeset .grid .admonition');
    for (var t = 0; t < tiles.length; t++) {
      var tile = tiles[t];
      var tileName = titleOf(tile);
      var wanted = allUnderMaintenance || underMaintenance[tileName];
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
