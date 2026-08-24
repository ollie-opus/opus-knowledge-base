/* Anchor links — deep links + copy-link affordances for page content.
 *
 * Two kinds of anchor share the copy/feedback machinery here (styling in
 * anchor-links.css):
 *
 * Admonitions. Every admonition in the source carries a hidden tracking span
 * as the first line of its body (`<span data-uuid="…" style="display:none">
 * </span>`, written by the more-buttons extension). This script surfaces
 * those UUIDs on the published site:
 *
 *   1. Copies each admonition's own UUID onto its container (`<div
 *      class="admonition …">` / `<details class="…">`) as the element `id`, so
 *      `/page/#<uuid>` resolves to the admonition.
 *   2. Handles the arrival: activates any ancestor content tabs, opens the
 *      target and every ancestor `<details>` (the theme bundle only opens the
 *      closest one), scrolls to it with the sticky-header offset, and flashes
 *      a highlight. This must be done here on initial load because the theme
 *      bundle's own hash lookup runs before these ids exist; later
 *      `hashchange` events get the bundle's handling too, but ours also
 *      covers tabs, nested details, and the highlight.
 *   3. Injects an invisible button over the type icon in each title/summary.
 *      Hovering the icon swaps it for a link icon (CSS) and clicking copies
 *      the deep link.
 *
 * Headings. These already have native slug ids (`#august-2026`), which the
 * browser and theme handle on arrival — so headings only get the copy
 * affordance: a link-icon button to the right of the heading text, revealed
 * on hover, that copies the heading's own anchor.
 *
 * Notes:
 *   - An admonition's UUID must go on the container, not the span: the span
 *     is `display:none` (no box to scroll to) and sits inside the body's
 *     first `<p>`. And `navigation.tracking` rewrites `location.hash` to the
 *     nearest heading on scroll, so links are always built from the element
 *     id, never read back from the address bar.
 *   - Every component kind (headings, captures, tables, tabs, grids) uses the
 *     identical span, and admonitions nest — so an admonition's UUID is the
 *     first descendant span whose nearest admonition ancestor is the
 *     admonition itself.
 */
(function () {
  'use strict';

  var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  var COPIED_MS = 1400;   /* how long the post-copy check icon shows */
  var FLASH_MS = 1900;    /* keep >= the mb-anchor-flash animation duration */

  /* The admonition's own uuid: first descendant span whose nearest
     admonition/details ancestor is this container (skips spans belonging to
     nested admonitions and to captures/tables that carry their own span). */
  function ownUuid(container) {
    var spans = container.querySelectorAll('span[data-uuid]');
    for (var i = 0; i < spans.length; i++) {
      var uuid = spans[i].getAttribute('data-uuid');
      if (UUID_RE.test(uuid) &&
          spans[i].closest('.admonition, details') === container) {
        return uuid;
      }
    }
    return null;
  }

  function titleOf(container) {
    return container.tagName === 'DETAILS'
      ? container.querySelector(':scope > summary')
      : container.querySelector(':scope > .admonition-title');
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy') ? resolve() : reject(new Error('copy failed'));
      } catch (err) {
        reject(err);
      } finally {
        ta.remove();
      }
    });
  }

  /* Shared copy button. anchorId builds the link; feedbackEl (the button
     itself when null) gets .mb-anchor-copied for a moment on success — the
     CSS swaps whichever icon that element owns to a check. */
  function makeCopyButton(anchorId, feedbackEl, ariaLabel) {
    var btn = document.createElement('button');
    feedbackEl = feedbackEl || btn;
    btn.type = 'button';
    btn.className = 'mb-anchor-copy';
    btn.title = 'Copy link';
    btn.setAttribute('aria-label', ariaLabel);
    btn.addEventListener('click', function (event) {
      /* preventDefault also stops a <summary> parent from toggling. */
      event.preventDefault();
      event.stopPropagation();
      var url = location.origin + location.pathname + '#' + anchorId;
      copyText(url).then(function () {
        feedbackEl.classList.add('mb-anchor-copied');
        setTimeout(function () { feedbackEl.classList.remove('mb-anchor-copied'); }, COPIED_MS);
      }).catch(function () {
        /* Clipboard unavailable (permissions, ancient browser) — let the
           visitor grab the link by hand. */
        window.prompt('Copy this link:', url);
      });
    });
    return btn;
  }

  function hydrateAdmonitions() {
    document.querySelectorAll('.md-typeset .admonition, .md-typeset details')
      .forEach(function (container) {
        var uuid = ownUuid(container);
        if (!uuid) return;  /* e.g. nav-links' generated <details> */
        if (!container.id) container.id = uuid;
        var title = titleOf(container);
        if (!title) return;
        if (container.classList.contains('blank')) return; /* no icon to hover */
        if (title.querySelector(':scope > .mb-anchor-copy')) return; /* already hydrated */
        /* The button is an invisible overlay on the type icon; the icon-swap
           feedback lives on the title's ::before, so the title takes the
           copied class. */
        title.appendChild(makeCopyButton(uuid, title, 'Copy a link to this admonition'));
      });
  }

  function hydrateHeadings() {
    document.querySelectorAll('.md-typeset :is(h1, h2, h3, h4, h5, h6)[id]')
      .forEach(function (heading) {
        if (heading.querySelector(':scope > .mb-anchor-copy')) return; /* already hydrated */
        /* Headings have no type icon: the button itself is the visible link
           icon (revealed on hover), so it takes the copied class too. */
        var btn = makeCopyButton(heading.id, null, 'Copy a link to this section');
        btn.classList.add('mb-anchor-copy--heading');
        heading.appendChild(btn);
      });
  }

  function revealFromHash() {
    var hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!UUID_RE.test(hash)) return;         /* heading anchors etc. — not ours */
    var el = document.getElementById(hash);
    if (!el) return;

    /* A target inside a non-active content tab is display:none. Tabs are
       radio-driven (pymdownx.tabbed alternate style): .tabbed-set holds one
       <input> per tab followed by .tabbed-content whose .tabbed-block children
       pair up with the inputs by index. Check the radio for each ancestor
       block, innermost outwards — .click() (not .checked) so the theme's
       content.tabs.link syncing and tab-state persistence still run. */
    for (var block = el.closest('.tabbed-block'); block;
         block = block.parentElement && block.parentElement.closest('.tabbed-block')) {
      var content = block.parentElement;
      var set = content && content.closest('.tabbed-set');
      if (!set) continue;
      var index = Array.prototype.indexOf.call(content.children, block);
      var input = set.querySelectorAll(':scope > input')[index];
      if (input && !input.checked) input.click();
    }

    /* Auto-open the target and every collapsed ancestor. */
    var d = el.tagName === 'DETAILS' ? el : el.closest('details');
    while (d) {
      d.open = true;
      d = d.parentElement && d.parentElement.closest('details');
    }

    /* Restart the highlight flash even if the class is still on from a
       previous visit to the same anchor. */
    el.classList.remove('mb-anchor-target');
    void el.offsetWidth; /* force reflow so the animation replays */
    el.classList.add('mb-anchor-target');
    el.scrollIntoView();
    setTimeout(function () { el.classList.remove('mb-anchor-target'); }, FLASH_MS);

    /* Lazy images above the target reflow the page as they load and push the
       target away — re-anchor once everything has settled. */
    if (document.readyState !== 'complete') {
      window.addEventListener('load', function () {
        el.classList.add('mb-anchor-target');
        el.scrollIntoView();
        setTimeout(function () { el.classList.remove('mb-anchor-target'); }, FLASH_MS);
      }, { once: true });
    }
  }

  function hydrate() {
    hydrateAdmonitions();
    hydrateHeadings();
    revealFromHash();
  }

  if (!window.__mbAnchorHashListener) {
    window.__mbAnchorHashListener = true;
    window.addEventListener('hashchange', revealFromHash);
  }

  // Material/Zensical instant navigation swaps page content without a full
  // reload; re-run on each document change. Fall back to a one-shot run
  // otherwise.
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(hydrate);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrate);
  } else {
    hydrate();
  }
})();
