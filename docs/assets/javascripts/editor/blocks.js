import { uid } from './constants.js';
import { editorState } from './state.js';
import { el } from './dom.js';
import { icon } from './icons.js';
import { pushUndo } from './undo.js';
import { pyodideRender } from './pyodide-render.js';
import { htmlToInlineMarkdown, htmlListToMarkdown, htmlTableToMarkdown } from './html-to-md.js';
import { getBlockEditMode, getHeadingLevel, handleInlineBlockKeydown } from './block-edit.js';
import { parseAdmonitionHeader, rebuildAdmonitionMarkdown, buildAdmonitionProps } from './admonition.js';

export function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.max(60, textarea.scrollHeight) + 'px';
}

export function renderBlockDOM(block, canvas) {
  var wrap = el('div', { className: 'ze-block', dataset: { blockId: block.id } });
  var editMode = getBlockEditMode(block.markdown);

  // Drag handle
  var dragHandle = el('div', { className: 'ze-drag', draggable: true });
  dragHandle.appendChild(icon('grip'));
  wrap.appendChild(dragHandle);

  // Drag events
  dragHandle.addEventListener('dragstart', function (e) {
    editorState.dragBlock = block.id;
    wrap.style.opacity = '0.4';
    e.dataTransfer.effectAllowed = 'move';
  });
  dragHandle.addEventListener('dragend', function () {
    editorState.dragBlock = null;
    wrap.style.opacity = '';
    document.querySelectorAll('.ze-block').forEach(function (b) {
      b.classList.remove('drag-over-top', 'drag-over-bottom');
    });
  });

  wrap.addEventListener('dragover', function (e) {
    if (!editorState.dragBlock || editorState.dragBlock === block.id) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    var rect = wrap.getBoundingClientRect();
    var mid = rect.top + rect.height / 2;
    wrap.classList.remove('drag-over-top', 'drag-over-bottom');
    wrap.classList.add(e.clientY < mid ? 'drag-over-top' : 'drag-over-bottom');
  });

  wrap.addEventListener('dragleave', function () {
    wrap.classList.remove('drag-over-top', 'drag-over-bottom');
  });

  wrap.addEventListener('drop', function (e) {
    e.preventDefault();
    wrap.classList.remove('drag-over-top', 'drag-over-bottom');
    if (!editorState.dragBlock) return;
    var fromIdx = editorState.blocks.findIndex(function (b) { return b.id === editorState.dragBlock; });
    var toIdx = editorState.blocks.findIndex(function (b) { return b.id === block.id; });
    if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return;
    var rect = wrap.getBoundingClientRect();
    var insertAfter = e.clientY >= rect.top + rect.height / 2;
    pushUndo();
    var moved = editorState.blocks.splice(fromIdx, 1)[0];
    var newIdx = editorState.blocks.findIndex(function (b) { return b.id === block.id; });
    if (insertAfter) newIdx++;
    editorState.blocks.splice(newIdx, 0, moved);
    renderAllBlocks(canvas);
  });

  // ── Render content based on edit mode ──
  if (editMode === 'inline') {
    // WYSIWYG: contentEditable on Pyodide-rendered HTML
    var rendered = el('div', { className: 'ze-rendered', contentEditable: 'true' });
    renderInlineBlockContent(block, rendered);

    rendered.addEventListener('focus', function () {
      setActiveBlock(block.id, canvas);
    });

    rendered.addEventListener('blur', function () {
      pushUndo();
      // Convert edited HTML back to markdown
      var headingLevel = getHeadingLevel(block.markdown);
      if (headingLevel > 0) {
        // Heading: reconstruct with level prefix
        block.markdown = '#'.repeat(headingLevel) + ' ' + htmlToInlineMarkdown(rendered.innerHTML);
      } else if (/^(\s*)([-*+]|\d+\.)\s/.test(block.markdown.trim())) {
        // List: convert HTML list back to markdown
        block.markdown = htmlListToMarkdown(rendered);
      } else {
        // Paragraph: convert inline HTML to markdown
        block.markdown = htmlToInlineMarkdown(rendered.innerHTML);
      }
    });

    rendered.addEventListener('keydown', function (e) {
      handleInlineBlockKeydown(e, block, canvas);
    });

    wrap.appendChild(rendered);

  } else if (editMode === 'textarea') {
    // Complex blocks: Pyodide-rendered display + click-to-edit textarea
    var rendered = el('div', { className: 'ze-rendered' });
    renderBlockContent(block, rendered);

    var textarea = el('textarea', {
      className: 'ze-edit-textarea',
      spellcheck: false,
    });
    textarea.style.display = 'none';

    rendered.addEventListener('click', function (e) {
      if (e.target.closest('.ze-props') || e.target.closest('.ze-settings-gear')) return;
      setActiveBlock(block.id, canvas);
      rendered.style.display = 'none';
      textarea.style.display = 'block';
      textarea.value = block.markdown;
      autoResize(textarea);
      textarea.focus();
    });

    textarea.addEventListener('blur', function () {
      pushUndo();
      block.markdown = textarea.value;
      textarea.style.display = 'none';
      rendered.style.display = '';
      renderBlockContent(block, rendered);
    });

    textarea.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        var start = textarea.selectionStart;
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(textarea.selectionEnd);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }
      if (e.key === 'Escape') { textarea.blur(); }
    });

    textarea.addEventListener('input', function () { autoResize(textarea); });

    wrap.appendChild(rendered);
    wrap.appendChild(textarea);

  } else if (editMode === 'admonition') {
    // WYSIWYG admonition: render the admonition box, make body contentEditable
    var rendered = el('div', { className: 'ze-rendered' });
    renderAdmonitionWYSIWYG(block, rendered, canvas);
    wrap.appendChild(rendered);

  } else if (editMode === 'table') {
    // WYSIWYG table: render table, make cells contentEditable
    var rendered = el('div', { className: 'ze-rendered ze-table-wrap' });
    renderTableWYSIWYG(block, rendered, canvas);
    wrap.appendChild(rendered);

  } else {
    // 'none' mode (HR): just render, click to select
    var rendered = el('div', { className: 'ze-rendered' });
    renderBlockContent(block, rendered);
    wrap.appendChild(rendered);
  }

  // ── Settings gear for all blocks ──
  var gear = el('div', { className: 'ze-settings-gear' });
  gear.appendChild(icon('settings'));
  gear.addEventListener('click', function (e) {
    e.stopPropagation();
    setActiveBlock(block.id, canvas);
    toggleBlockProps(block, editMode, wrap, canvas);
  });
  wrap.appendChild(gear);

  // Click block wrapper to set active
  wrap.addEventListener('click', function (e) {
    if (e.target.closest('.ze-props') || e.target.closest('.ze-drag') || e.target.closest('.ze-settings-gear')) return;
    setActiveBlock(block.id, canvas);
  });

  return wrap;
}

// Render inline-editable block (paragraph/heading/list) with Pyodide,
// then strip non-editable elements (headerlinks, etc.)
export function renderInlineBlockContent(block, container) {
  container.innerHTML = '';
  if (!block.markdown) return;
  var html = pyodideRender(block.markdown);
  if (html) {
    container.innerHTML = html;
    // Strip headerlink anchors added by toc extension
    container.querySelectorAll('a.headerlink').forEach(function (a) { a.remove(); });
    // Strip wrapping paragraph tag for single paragraphs to avoid extra spacing
    if (container.children.length === 1 && container.children[0].tagName === 'P') {
      container.innerHTML = container.children[0].innerHTML;
    }
  } else {
    container.textContent = block.markdown;
  }
}

// Render complex block with Pyodide (read-only display)
export function renderBlockContent(block, container) {
  container.innerHTML = '';
  if (!block.markdown) return;
  var html = pyodideRender(block.markdown);
  if (html) {
    container.innerHTML = html;
  } else {
    container.textContent = block.markdown;
  }
}

// ── Generic block properties panel ──
function toggleBlockProps(block, editMode, blockEl, canvas) {
  var gearEl = blockEl.querySelector('.ze-settings-gear');
  var existing = blockEl.querySelector('.ze-props');
  if (existing) {
    existing.remove();
    gearEl.classList.remove('open');
    return;
  }

  var panel = el('div', { className: 'ze-props', dataset: { forBlock: block.id } });

  // Header
  panel.appendChild(el('div', { className: 'ze-props-header' }, ['Properties']));

  // Body — block-type-specific properties
  var body = el('div', { className: 'ze-props-body' });
  if (editMode === 'admonition') {
    buildAdmonitionProps(body, block, canvas);
  }
  if (body.children.length > 0) {
    panel.appendChild(body);
  }

  // Footer — delete button (always present)
  var footer = el('div', { className: 'ze-props-footer' });
  footer.appendChild(el('button', {
    className: 'ze-btn',
    style: { background: '#f44336', width: '100%', justifyContent: 'center' },
    onclick: function () {
      pushUndo();
      editorState.blocks = editorState.blocks.filter(function (b) { return b.id !== block.id; });
      renderAllBlocks(canvas);
    },
  }, [icon('trash'), ' Delete Block']));
  panel.appendChild(footer);

  // Stop clicks inside panel from toggling the gear
  panel.addEventListener('click', function (e) { e.stopPropagation(); });

  blockEl.appendChild(panel);
  gearEl.classList.add('open');
}

// ── WYSIWYG Admonition ──
function renderAdmonitionWYSIWYG(block, container, canvas) {
  container.innerHTML = '';
  var html = pyodideRender(block.markdown);
  if (!html) { container.textContent = block.markdown; return; }
  container.innerHTML = html;

  // Find the admonition or details element
  var adm = container.querySelector('.admonition, details');
  if (!adm) return;

  // Find title element (admonition-title paragraph or summary)
  var titleEl = adm.querySelector('.admonition-title, summary');

  // Collect body nodes (everything after the title)
  var bodyNodes = [];
  var sibling = titleEl ? titleEl.nextSibling : adm.firstChild;
  while (sibling) {
    bodyNodes.push(sibling);
    sibling = sibling.nextSibling;
  }

  // Create editable body container
  var editableBody = el('div', { className: 'ze-admonition-body', contentEditable: 'true' });
  bodyNodes.forEach(function (node) { editableBody.appendChild(node); });
  adm.appendChild(editableBody);

  editableBody.addEventListener('focus', function () {
    setActiveBlock(block.id, canvas);
  });

  editableBody.addEventListener('blur', function (e) {
    // Don't save if focus moved to settings gear or props panel
    if (e.relatedTarget && (e.relatedTarget.closest('.ze-props') || e.relatedTarget.closest('.ze-settings-gear'))) return;
    pushUndo();
    var parsed = parseAdmonitionHeader(block.markdown);
    if (!parsed) return;
    var bodyMd = htmlToInlineMarkdown(editableBody.innerHTML);
    var bodyLines = bodyMd.split('\n').map(function (line) {
      return line.trim() === '' ? '' : '    ' + line;
    });
    block.markdown = rebuildAdmonitionMarkdown(parsed, bodyLines);
  });

  editableBody.addEventListener('keydown', function (e) {
    // Enter creates a new line within the admonition, not a new block
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.execCommand('insertParagraph', false, null);
    }
  });
}

// ── WYSIWYG Table ──
function renderTableWYSIWYG(block, container, canvas) {
  container.innerHTML = '';
  var html = pyodideRender(block.markdown);
  if (!html) { container.textContent = block.markdown; return; }
  container.innerHTML = html;

  var table = container.querySelector('table');
  if (!table) return;

  // Make all cells editable
  table.querySelectorAll('th, td').forEach(function (cell) {
    cell.contentEditable = 'true';

    cell.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        var cells = Array.from(table.querySelectorAll('th, td'));
        var idx = cells.indexOf(cell);
        var next = e.shiftKey ? cells[idx - 1] : cells[idx + 1];
        if (next) next.focus();
      }
      if (e.key === 'Enter') {
        e.preventDefault(); // prevent new line in cell
      }
    });
  });

  // Save when focus leaves the table entirely
  container.addEventListener('focusout', function (e) {
    if (container.contains(e.relatedTarget)) return;
    pushUndo();
    block.markdown = htmlTableToMarkdown(table);
  });

  container.addEventListener('focusin', function () {
    setActiveBlock(block.id, canvas);
  });

  // Add row/column action buttons
  var actions = el('div', { className: 'ze-table-actions' });
  actions.appendChild(el('button', {
    className: 'ze-table-action-btn',
    textContent: '+ Row',
    onclick: function () {
      pushUndo();
      var tbody = table.querySelector('tbody') || table;
      var lastRow = tbody.querySelector('tr:last-child');
      var colCount = lastRow ? lastRow.cells.length : 1;
      var newRow = tbody.insertRow();
      for (var i = 0; i < colCount; i++) {
        var td = newRow.insertCell();
        td.contentEditable = 'true';
        td.innerHTML = '&nbsp;';
        td.addEventListener('keydown', function (e) {
          if (e.key === 'Tab') {
            e.preventDefault();
            var cells = Array.from(table.querySelectorAll('th, td'));
            var idx = cells.indexOf(e.target);
            var next = e.shiftKey ? cells[idx - 1] : cells[idx + 1];
            if (next) next.focus();
          }
          if (e.key === 'Enter') e.preventDefault();
        });
      }
      // Save immediately
      block.markdown = htmlTableToMarkdown(table);
    },
  }));
  actions.appendChild(el('button', {
    className: 'ze-table-action-btn',
    textContent: '+ Column',
    onclick: function () {
      pushUndo();
      table.querySelectorAll('tr').forEach(function (row, rowIdx) {
        var cell = rowIdx === 0 && row.closest('thead')
          ? document.createElement('th')
          : document.createElement('td');
        cell.contentEditable = 'true';
        cell.innerHTML = '&nbsp;';
        cell.addEventListener('keydown', function (e) {
          if (e.key === 'Tab') {
            e.preventDefault();
            var cells = Array.from(table.querySelectorAll('th, td'));
            var idx = cells.indexOf(e.target);
            var next = e.shiftKey ? cells[idx - 1] : cells[idx + 1];
            if (next) next.focus();
          }
          if (e.key === 'Enter') e.preventDefault();
        });
        row.appendChild(cell);
      });
      block.markdown = htmlTableToMarkdown(table);
    },
  }));
  container.appendChild(actions);
}

export function renderAllBlocks(canvas) {
  canvas.innerHTML = '';
  editorState.blocks.forEach(function (block) {
    canvas.appendChild(renderBlockDOM(block, canvas));
  });
  // Add empty block placeholder at end
  var addBtn = el('div', {
    className: 'ze-block',
    style: { opacity: '0.4', cursor: 'pointer', textAlign: 'center', padding: '16px', fontSize: '.85rem' },
    onclick: function () {
      pushUndo();
      var newBlock = { id: uid(), markdown: '' };
      editorState.blocks.push(newBlock);
      renderAllBlocks(canvas);
      var newEl = canvas.querySelector('[data-block-id="' + newBlock.id + '"] .ze-rendered');
      if (newEl) newEl.focus();
    },
  }, ['+ Click to add a new block']);
  canvas.appendChild(addBtn);
}

export function setActiveBlock(blockId, canvas) {
  editorState.activeBlock = blockId;
  canvas.querySelectorAll('.ze-block').forEach(function (b) {
    b.classList.toggle('active', b.dataset.blockId === blockId);
  });
  var existing = canvas.querySelector('.ze-props');
  if (existing && existing.dataset.forBlock !== blockId) {
    var blockWrap = existing.closest('.ze-block');
    if (blockWrap) {
      var gear = blockWrap.querySelector('.ze-settings-gear');
      if (gear) gear.classList.remove('open');
    }
    existing.remove();
  }
}
