/**
 * nav-links.js — fills "Nav links" component placeholders with a live set of
 * page links.
 *
 * Two placeholder flavours, authored into pages by the more-buttons extension:
 *
 *   <div class="mb-nav-links" data-nav-path="guides/employees"></div>
 *   <div class="mb-nav-links" data-nav-tag="System" data-nav-layout="flat"></div>
 *
 * Rendered output is an unboxed typographic tree: pages become full-width slim
 * stone buttons with a trailing arrow icon, and sections become small
 * uppercase headings (styled in nav-links.css) — the top-level section as a
 * static group (div.mb-nav-group--top), every deeper section as an open
 * collapsible (details.mb-nav-group--sub). Path mode renders the matched
 * section itself as the static group (e.g. "guides/contractors" → a
 * "CONTRACTORS" heading over its buttons), tag mode "grouped" the nav
 * hierarchy filtered to tagged pages (only branches containing a match
 * survive), and tag mode "flat" a bare button stack with no group heading.
 *
 * The full nav tree is baked into every page as a hidden
 * `<template id="__mb-nav-tree">` by overrides/main.html (derived from
 * zensical.toml + page frontmatter at build time; page tags ride along as a
 * data-tags attribute). Because the page stores only the path/tag, editing the
 * toml or frontmatter + rebuilding updates every list without re-editing any
 * page. A placeholder that ends up with no links renders a visible error line
 * instead of silently staying blank.
 */
(function () {
  'use strict';

  var ERROR_TEXT = "Nav link error: No pages found. Please contact Opus support if you're seeing this.";

  // Same markup the emoji extension inlines for :lucide-arrow-up-right:
  // (copied from zensical's packaged templates/.icons/lucide/arrow-up-right.svg).
  var ARROW_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="lucide lucide-arrow-up-right" viewBox="0 0 24 24"><path d="M7 7h10v10M7 17 17 7"/></svg>';

  // MUST match the extension's navToml.js slugify so paths resolve identically.
  function slugify(title) {
    return String(title)
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // The first direct-child <ul> of an <li> (a section's children), or null.
  function directChildUl(li) {
    for (var k = 0; k < li.children.length; k++) {
      if (li.children[k].tagName === 'UL') return li.children[k];
    }
    return null;
  }

  // Walk the hidden tree's <ul> to the <li> SECTION named by the slug path, or
  // null. Each segment must match a section (an <li> that has its own <ul>).
  function findSection(rootUl, path) {
    var segs = String(path || '').split('/').map(slugify).filter(Boolean);
    if (!segs.length || !rootUl) return null;
    var level = rootUl;
    var match = null;
    for (var i = 0; i < segs.length; i++) {
      match = null;
      for (var j = 0; j < level.children.length; j++) {
        var li = level.children[j];
        if (li.tagName !== 'LI') continue;
        if (!directChildUl(li)) continue; // only sections can be descended
        if (slugify(li.getAttribute('data-title') || '') === segs[i]) { match = li; break; }
      }
      if (!match) return null;
      level = directChildUl(match);
      if (!level) return null;
    }
    return match;
  }

  // A hidden-tree page <li> carries the tag iff data-tags (comma-separated,
  // from page frontmatter) contains it — trimmed, case-insensitive.
  function hasTag(src, tag) {
    var raw = src.getAttribute('data-tags');
    if (!raw) return false;
    var want = String(tag).trim().toLowerCase();
    var tags = raw.split(',');
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].trim().toLowerCase() === want) return true;
    }
    return false;
  }

  // Render one hidden-tree page <li> as a p-wrapped slim-button link, matching
  // what the markdown pipeline emits for
  //   [Title :lucide-arrow-up-right:](url){ .md-button .custom-button-stone
  //   .custom-button--slim target="_blank" rel="noopener" }
  // Label first / icon last: slim's space-between flex pins them to the edges.
  function renderButton(src) {
    var p = document.createElement('p');
    var a = document.createElement('a');
    a.className = 'md-button custom-button-stone custom-button--slim';
    a.href = src.getAttribute('data-url');
    a.target = '_blank';
    a.rel = 'noopener';
    var title = src.getAttribute('data-title') || '';
    if (src.getAttribute('data-current')) {
      // Label + marker share one span so they stay one flex item together.
      var label = document.createElement('span');
      label.appendChild(document.createTextNode(title));
      var marker = document.createElement('em');
      marker.className = 'mb-nav-links__current';
      marker.textContent = ' (current page)';
      label.appendChild(marker);
      a.appendChild(label);
      a.appendChild(document.createTextNode(' '));
    } else {
      a.appendChild(document.createTextNode(title + ' '));
    }
    var icon = document.createElement('span');
    icon.className = 'twemoji';
    icon.innerHTML = ARROW_ICON_SVG;
    a.appendChild(icon);
    p.appendChild(a);
    return p;
  }

  // A section group: an unboxed typographic heading over its children — a
  // static div when top-level, an open collapsible (details[open]) below. The
  // heading is plain text; nav-links.css uppercases and sizes it per level.
  function renderSectionContainer(title, isTop) {
    var box, heading;
    if (isTop) {
      box = document.createElement('div');
      box.className = 'mb-nav-group mb-nav-group--top';
      heading = document.createElement('p');
    } else {
      box = document.createElement('details');
      box.className = 'mb-nav-group mb-nav-group--sub';
      box.open = true;
      heading = document.createElement('summary');
    }
    heading.className = 'mb-nav-group__title';
    heading.textContent = title;
    box.appendChild(heading);
    return box;
  }

  // Render a section's hidden-tree <ul> into its group: pages → buttons,
  // subsections → nested open collapsibles.
  function renderSection(title, srcUl, isTop) {
    var box = renderSectionContainer(title, isTop);
    for (var i = 0; i < srcUl.children.length; i++) {
      var src = srcUl.children[i];
      if (src.tagName !== 'LI') continue;
      var childUl = directChildUl(src);
      if (src.getAttribute('data-url')) {
        box.appendChild(renderButton(src));
      } else if (childUl) {
        box.appendChild(renderSection(src.getAttribute('data-title') || '', childUl, false));
      }
    }
    return box;
  }

  // Flat tag list: every tagged page in nav order as one bare button stack.
  function renderTagFlat(srcUl, tag) {
    var frag = document.createDocumentFragment();
    (function walk(level) {
      for (var i = 0; i < level.children.length; i++) {
        var src = level.children[i];
        if (src.tagName !== 'LI') continue;
        if (src.getAttribute('data-url') && hasTag(src, tag)) frag.appendChild(renderButton(src));
        var childUl = directChildUl(src);
        if (childUl) walk(childUl);
      }
    })(srcUl);
    return frag.childNodes.length ? frag : null;
  }

  // Grouped tag list: the nav hierarchy filtered down to tagged pages — a
  // section survives iff its subtree contains a match. Surviving top-level
  // sections render as static groups, deeper ones as open collapsibles.
  // Returns null when empty.
  function renderTagGrouped(srcUl, tag, isTop) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < srcUl.children.length; i++) {
      var src = srcUl.children[i];
      if (src.tagName !== 'LI') continue;
      var childUl = directChildUl(src);
      if (src.getAttribute('data-url')) {
        if (hasTag(src, tag)) frag.appendChild(renderButton(src));
      } else if (childUl) {
        var inner = renderTagGrouped(childUl, tag, false);
        if (inner) {
          var box = renderSectionContainer(src.getAttribute('data-title') || '', isTop);
          box.appendChild(inner);
          frag.appendChild(box);
        }
      }
    }
    return frag.childNodes.length ? frag : null;
  }

  function showError(ph) {
    var p = document.createElement('p');
    p.className = 'mb-nav-links__error';
    p.textContent = ERROR_TEXT;
    ph.appendChild(p);
  }

  function hydrate() {
    var placeholders = document.querySelectorAll('.mb-nav-links[data-nav-path], .mb-nav-links[data-nav-tag]');
    if (!placeholders.length) return;
    var tpl = document.getElementById('__mb-nav-tree');
    var root = tpl ? (tpl.content || tpl).querySelector('ul') : null;
    for (var i = 0; i < placeholders.length; i++) {
      var ph = placeholders[i];
      ph.innerHTML = ''; // idempotent: clear before (re)injecting
      if (root) {
        var tag = ph.getAttribute('data-nav-tag');
        if (tag != null) {
          var grouped = ph.getAttribute('data-nav-layout') === 'grouped';
          var list = grouped ? renderTagGrouped(root, tag, true) : renderTagFlat(root, tag);
          if (list) ph.appendChild(list);
        } else {
          var section = findSection(root, ph.getAttribute('data-nav-path'));
          var sub = section && directChildUl(section);
          if (sub && sub.children.length) {
            ph.appendChild(renderSection(section.getAttribute('data-title') || '', sub, true));
          }
        }
      }
      if (!ph.firstChild) showError(ph); // unresolved path/tag, empty section, or missing tree
    }
  }

  // Material/Zensical instant navigation swaps page content without a full reload;
  // re-run on each document change. Fall back to a one-shot run otherwise.
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(hydrate);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrate);
  } else {
    hydrate();
  }
})();
