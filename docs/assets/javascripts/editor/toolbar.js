import { ADMONITION_TYPES, CODE_LANGUAGES } from './constants.js';
import { editorState } from './state.js';
import { el } from './dom.js';
import { icon } from './icons.js';
import { doUndo, doRedo } from './undo.js';
import { serializeAll } from './parser.js';
import { applyInlineFormat, wrapWithTag, insertTextAtCursor, insertBlock } from './formatting.js';
import { showLinkDialog, showImageDialog, download } from './dialogs.js';

export function buildToolbar(canvas) {
  var toolbar = el('div', { className: 'ze-toolbar' });
  var row = el('div', { className: 'ze-toolbar-row' });

  function tbtn(iconName, title, onClick) {
    var btn = el('button', { className: 'ze-tbtn', title: title, onclick: onClick });
    btn.addEventListener('mousedown', function (e) { e.preventDefault(); });
    btn.appendChild(icon(iconName));
    return btn;
  }

  function cluster(children) {
    var c = el('div', { className: 'ze-cluster' });
    children.forEach(function (child) { c.appendChild(child); });
    return c;
  }

  // ── Cluster 1: Undo / Redo ──
  row.appendChild(cluster([
    tbtn('undo', 'Undo (Ctrl+Z)', function () { doUndo(canvas); }),
    tbtn('redo', 'Redo (Ctrl+Y)', function () { doRedo(canvas); }),
  ]));

  // ── Cluster 2: Inline Formatting ──
  row.appendChild(cluster([
    tbtn('bold', 'Bold (Ctrl+B)', function () { applyInlineFormat('**', '**', 'bold'); }),
    tbtn('italic', 'Italic (Ctrl+I)', function () { applyInlineFormat('*', '*', 'italic'); }),
    tbtn('strikethrough', 'Strikethrough', function () { applyInlineFormat('~~', '~~', 'strikeThrough'); }),
    tbtn('underline', 'Underline (Ctrl+U)', function () { applyInlineFormat('^^', '^^', 'underline'); }),
    tbtn('highlight', 'Highlight', function () { wrapWithTag('mark', '==', '=='); }),
    tbtn('superscript', 'Superscript', function () { applyInlineFormat('^', '^', 'superscript'); }),
    tbtn('subscript', 'Subscript', function () { applyInlineFormat('~', '~', 'subscript'); }),
  ]));

  // ── Cluster 3: Structure (headings, lists) ──
  var headingDrop = buildDropdown('heading', 'Heading', [
    { label: 'Heading 1', action: function () { insertBlock('# Heading 1', canvas); } },
    { label: 'Heading 2', action: function () { insertBlock('## Heading 2', canvas); } },
    { label: 'Heading 3', action: function () { insertBlock('### Heading 3', canvas); } },
    { label: 'Heading 4', action: function () { insertBlock('#### Heading 4', canvas); } },
    { label: 'Heading 5', action: function () { insertBlock('##### Heading 5', canvas); } },
    { label: 'Heading 6', action: function () { insertBlock('###### Heading 6', canvas); } },
  ]);
  row.appendChild(cluster([
    headingDrop,
    tbtn('ul', 'Bullet List', function () {
      insertBlock('- Item 1\n- Item 2\n- Item 3', canvas);
    }),
    tbtn('ol', 'Numbered List', function () {
      insertBlock('1. Item 1\n2. Item 2\n3. Item 3', canvas);
    }),
    tbtn('task', 'Task List', function () {
      insertBlock('- [ ] Task 1\n- [ ] Task 2\n- [x] Done task', canvas);
    }),
  ]));

  // ── Cluster 4: Code, Media & Insert ──
  var codeDrop = buildDropdown('codeBlock', 'Code Block', CODE_LANGUAGES.slice(0, 12).map(function (lang) {
    return {
      label: lang,
      action: function () {
        insertBlock('```' + lang + '\n\n```', canvas);
      },
    };
  }));
  var megaDrop = buildMegaDropdown(canvas);
  row.appendChild(cluster([
    tbtn('code', 'Inline Code', function () { applyInlineFormat('`', '`', null); }),
    codeDrop,
    tbtn('link', 'Insert Link (Ctrl+K)', function () { showLinkDialog(); }),
    tbtn('image', 'Insert Image', function () { showImageDialog(); }),
    tbtn('table', 'Insert Table', function () {
      insertBlock('| Header 1 | Header 2 | Header 3 |\n| --- | --- | --- |\n| Cell 1 | Cell 2 | Cell 3 |', canvas);
    }),
    megaDrop,
  ]));

  // ── Spacer ──
  row.appendChild(el('div', { className: 'ze-spacer' }));

  // ── Status ──
  var status = el('span', { className: 'ze-status', textContent: 'Loading renderer\u2026' });
  row.appendChild(status);

  // ── Download ──
  var dlBtn = el('button', { className: 'ze-btn', disabled: true, onclick: function () { download(serializeAll()); } });
  dlBtn.appendChild(icon('download'));
  dlBtn.appendChild(document.createTextNode(' .md'));
  row.appendChild(dlBtn);

  toolbar.appendChild(row);

  return { toolbar: toolbar, status: status, dlBtn: dlBtn };
}

// ── Mega-dropdown: consolidates all advanced insert options ──
function buildMegaDropdown(canvas) {
  var wrap = el('div', { className: 'ze-dropdown' });

  // Trigger button with plus icon + "Insert" label
  var btn = el('button', { className: 'ze-tbtn ze-tbtn-insert', title: 'Insert block' });
  btn.addEventListener('mousedown', function (e) { e.preventDefault(); });
  btn.appendChild(icon('plus'));
  btn.appendChild(document.createTextNode('Insert'));
  var chevron = icon('chevronDown');
  chevron.style.width = '10px';
  chevron.style.height = '10px';
  chevron.style.marginLeft = '0';
  btn.appendChild(chevron);

  var menu = el('div', { className: 'ze-dropdown-menu ze-mega-menu' });

  function megaSection(label, items) {
    var section = el('div', { className: 'ze-mega-section' });
    section.appendChild(el('div', { className: 'ze-mega-label', textContent: label }));
    items.forEach(function (item) {
      var menuItem = el('button', {
        className: 'ze-dropdown-item',
        textContent: item.label,
        onclick: function (e) {
          e.stopPropagation();
          menu.classList.remove('open');
          item.action();
        },
      });
      menuItem.addEventListener('mousedown', function (e) { e.preventDefault(); });
      section.appendChild(menuItem);
    });
    return section;
  }

  // Callouts section
  menu.appendChild(megaSection('Callouts', ADMONITION_TYPES.map(function (t) {
    return {
      label: t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, ' '),
      action: function () {
        var title = t.charAt(0).toUpperCase() + t.slice(1);
        insertBlock('!!! ' + t + ' "' + title + '"\n    Content here.', canvas);
      },
    };
  })));

  // Layout section
  menu.appendChild(megaSection('Layout', [
    { label: 'Content Tabs', action: function () {
      insertBlock('=== "Tab 1"\n\n    Content for tab 1.\n\n=== "Tab 2"\n\n    Content for tab 2.', canvas);
    }},
    { label: 'Horizontal Rule', action: function () {
      insertBlock('---', canvas);
    }},
  ]));

  // Technical section
  menu.appendChild(megaSection('Technical', [
    { label: 'Inline Math ($\u2026$)', action: function () { applyInlineFormat('$', '$', null); } },
    { label: 'Block Math ($$\u2026$$)', action: function () {
      insertBlock('$$\nE = mc^2\n$$', canvas);
    }},
    { label: 'Mermaid Diagram', action: function () {
      insertBlock('```mermaid\ngraph LR\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Success]\n    B -->|No| D[Failure]\n```', canvas);
    }},
    { label: 'Keyboard Keys', action: function () { applyInlineFormat('++', '++', null); } },
  ]));

  // Reference section
  var refSection = el('div', { className: 'ze-mega-section' });
  refSection.appendChild(el('div', { className: 'ze-mega-label', textContent: 'Reference' }));

  var footnoteItem = el('button', {
    className: 'ze-dropdown-item',
    textContent: 'Footnote',
    onclick: function (e) {
      e.stopPropagation();
      menu.classList.remove('open');
      var fnNum = editorState.blocks.filter(function (b) { return /^\[\^/.test(b.markdown.trim()); }).length + 1;
      insertBlock('[^' + fnNum + ']: Footnote text', canvas);
    },
  });
  footnoteItem.addEventListener('mousedown', function (e) { e.preventDefault(); });
  refSection.appendChild(footnoteItem);

  // Emoji sub-section
  refSection.appendChild(el('div', { className: 'ze-mega-label', textContent: 'Emoji', style: { marginTop: '4px' } }));
  var emojis = [
    '\u{1f600}','\u{1f603}','\u{1f604}','\u{1f601}','\u{1f606}','\u{1f605}','\u{1f602}','\u{1f923}',
    '\u{1f60a}','\u{1f607}','\u{1f642}','\u{1f643}','\u{1f609}','\u{1f60c}','\u{1f60d}','\u{1f618}',
    '\u{1f44d}','\u{1f44e}','\u{1f44f}','\u{1f64c}','\u{1f4aa}','\u{2764}','\u{1f525}','\u{2b50}',
    '\u{2705}','\u{274c}','\u{26a0}','\u{1f4a1}','\u{1f389}','\u{1f680}','\u{1f41b}','\u{1f510}',
    '\u{2728}','\u{1f4dd}','\u{1f4e6}','\u{1f527}','\u{1f6e0}','\u{1f4ca}','\u{1f4c8}','\u{1f3af}',
  ];
  var grid = el('div', { className: 'ze-emoji-grid' });
  emojis.forEach(function (em) {
    var emojiBtn = el('button', {
      className: 'ze-emoji-btn',
      textContent: em,
      onclick: function (e) {
        e.stopPropagation();
        insertTextAtCursor(em);
        menu.classList.remove('open');
      },
    });
    emojiBtn.addEventListener('mousedown', function (e) { e.preventDefault(); });
    grid.appendChild(emojiBtn);
  });
  refSection.appendChild(grid);
  menu.appendChild(refSection);

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    document.querySelectorAll('.ze-dropdown-menu.open').forEach(function (m) {
      if (m !== menu) m.classList.remove('open');
    });
    menu.classList.toggle('open');
  });

  wrap.appendChild(btn);
  wrap.appendChild(menu);
  return wrap;
}

export function buildDropdown(iconName, title, items) {
  var wrap = el('div', { className: 'ze-dropdown' });
  var btn = el('button', { className: 'ze-tbtn', title: title });
  btn.addEventListener('mousedown', function (e) { e.preventDefault(); });
  btn.appendChild(icon(iconName));

  var chevron = icon('chevronDown');
  chevron.style.width = '10px';
  chevron.style.height = '10px';
  chevron.style.marginLeft = '-2px';
  btn.appendChild(chevron);

  var menu = el('div', { className: 'ze-dropdown-menu' });
  items.forEach(function (item) {
    var menuItem = el('button', {
      className: 'ze-dropdown-item',
      textContent: item.label,
      onclick: function (e) {
        e.stopPropagation();
        menu.classList.remove('open');
        item.action();
      },
    });
    menuItem.addEventListener('mousedown', function (e) { e.preventDefault(); });
    menu.appendChild(menuItem);
  });

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    document.querySelectorAll('.ze-dropdown-menu.open').forEach(function (m) {
      if (m !== menu) m.classList.remove('open');
    });
    menu.classList.toggle('open');
  });

  wrap.appendChild(btn);
  wrap.appendChild(menu);
  return wrap;
}

// buildEmojiPicker is no longer needed — emoji is embedded in the mega-dropdown
