/**
 * nav-links.js — fills "Nav links" component placeholders with a live list of
 * page links.
 *
 * Two placeholder flavours, authored into pages by the more-buttons extension:
 *
 *   <div class="mb-nav-links" data-nav-path="guides/employees"></div>
 *   <div class="mb-nav-links" data-nav-tag="System" data-nav-layout="flat"></div>
 *
 * Path mode renders the nested list of every page under that part of the site
 * nav. Tag mode renders every page whose frontmatter carries the tag — layout
 * "flat" as one plain list, "grouped" spliced into the nav-section hierarchy
 * (only branches containing a match survive).
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

  // Render one hidden-tree page <li> as a rendered <li> with a new-tab link.
  function renderPageLi(src) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = src.getAttribute('data-url');
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = src.getAttribute('data-title') || '';
    li.appendChild(a);
    if (src.getAttribute('data-current')) {
      var marker = document.createElement('em');
      marker.className = 'mb-nav-links__current';
      marker.textContent = ' (current page)';
      li.appendChild(marker);
    }
    return li;
  }

  // Clone a hidden-tree <ul> into a rendered nested list: pages → new-tab links,
  // sections → a heading span plus their own nested list.
  function renderList(srcUl) {
    var ul = document.createElement('ul');
    ul.className = 'mb-nav-links__list';
    for (var i = 0; i < srcUl.children.length; i++) {
      var src = srcUl.children[i];
      if (src.tagName !== 'LI') continue;
      var li;
      if (src.getAttribute('data-url')) {
        li = renderPageLi(src);
      } else {
        li = document.createElement('li');
        var span = document.createElement('span');
        span.className = 'mb-nav-links__section';
        span.textContent = src.getAttribute('data-title') || '';
        li.appendChild(span);
      }
      var childUl = directChildUl(src);
      if (childUl) li.appendChild(renderList(childUl));
      ul.appendChild(li);
    }
    return ul;
  }

  // Flat tag list: every tagged page in nav order, one plain list.
  function renderTagFlat(srcUl, tag) {
    var ul = document.createElement('ul');
    ul.className = 'mb-nav-links__list';
    (function walk(level) {
      for (var i = 0; i < level.children.length; i++) {
        var src = level.children[i];
        if (src.tagName !== 'LI') continue;
        if (src.getAttribute('data-url') && hasTag(src, tag)) ul.appendChild(renderPageLi(src));
        var childUl = directChildUl(src);
        if (childUl) walk(childUl);
      }
    })(srcUl);
    return ul.children.length ? ul : null;
  }

  // Grouped tag list: the nav hierarchy filtered down to tagged pages — a
  // section survives iff its subtree contains a match. Returns null when empty.
  function renderTagGrouped(srcUl, tag) {
    var ul = document.createElement('ul');
    ul.className = 'mb-nav-links__list';
    for (var i = 0; i < srcUl.children.length; i++) {
      var src = srcUl.children[i];
      if (src.tagName !== 'LI') continue;
      var childUl = directChildUl(src);
      if (src.getAttribute('data-url')) {
        if (hasTag(src, tag)) ul.appendChild(renderPageLi(src));
      } else if (childUl) {
        var filtered = renderTagGrouped(childUl, tag);
        if (filtered) {
          var li = document.createElement('li');
          var span = document.createElement('span');
          span.className = 'mb-nav-links__section';
          span.textContent = src.getAttribute('data-title') || '';
          li.appendChild(span);
          li.appendChild(filtered);
          ul.appendChild(li);
        }
      }
    }
    return ul.children.length ? ul : null;
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
          var list = grouped ? renderTagGrouped(root, tag) : renderTagFlat(root, tag);
          if (list) ph.appendChild(list);
        } else {
          var section = findSection(root, ph.getAttribute('data-nav-path'));
          var sub = section && directChildUl(section);
          if (sub && sub.children.length) ph.appendChild(renderList(sub));
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
