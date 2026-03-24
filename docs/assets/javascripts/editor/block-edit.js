import { editorState } from './state.js';
import { uid } from './constants.js';
import { htmlToInlineMarkdown, htmlListToMarkdown } from './html-to-md.js';
import { pushUndo } from './undo.js';
import { renderAllBlocks } from './blocks.js';

// Returns 'inline' (contentEditable WYSIWYG), 'textarea' (raw markdown),
// 'admonition' (WYSIWYG admonition), 'table' (WYSIWYG table), or 'none' (no editing)
export function getBlockEditMode(markdown) {
  var trimmed = (markdown || '').trim();
  if (!trimmed) return 'inline';
  if (/^#{1,6}\s/.test(trimmed)) return 'inline';
  if (/^(\s*)([-*+]|\d+\.)\s/.test(trimmed)) return 'inline';
  if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) return 'none';

  // Code-like blocks stay as textarea
  if (/^(`{3,}|~{3,})/.test(trimmed)) return 'textarea';
  if (trimmed === '$$' || trimmed.startsWith('$$')) return 'textarea';
  if (/^===\s+"/.test(trimmed)) return 'textarea';
  if (/^\[\^\w+\]:/.test(trimmed)) return 'textarea';

  // Admonitions & tables get special WYSIWYG modes
  if (/^(!{3}|\?{3}\+?)\s/.test(trimmed)) return 'admonition';
  if (trimmed.startsWith('|') && trimmed.includes('|')) return 'table';

  // Everything else (paragraphs, etc.) → inline WYSIWYG
  return 'inline';
}

export function getHeadingLevel(markdown) {
  var match = (markdown || '').trim().match(/^(#{1,6})\s/);
  return match ? match[1].length : 0;
}

export function handleInlineBlockKeydown(e, block, canvas) {
  // Enter at end → new paragraph
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    pushUndo();
    // Sync current block content before creating new one
    var rendered = e.target;
    var headingLevel = getHeadingLevel(block.markdown);
    if (headingLevel > 0) {
      block.markdown = '#'.repeat(headingLevel) + ' ' + htmlToInlineMarkdown(rendered.innerHTML);
    } else if (/^(\s*)([-*+]|\d+\.)\s/.test(block.markdown.trim())) {
      block.markdown = htmlListToMarkdown(rendered);
    } else {
      block.markdown = htmlToInlineMarkdown(rendered.innerHTML);
    }
    var idx = editorState.blocks.findIndex(function (b) { return b.id === block.id; });
    var newBlock = { id: uid(), markdown: '' };
    editorState.blocks.splice(idx + 1, 0, newBlock);
    renderAllBlocks(canvas);
    var newEl = canvas.querySelector('[data-block-id="' + newBlock.id + '"] .ze-rendered');
    if (newEl) newEl.focus();
  }
  // Backspace at start of empty block → delete it
  if (e.key === 'Backspace') {
    var sel = window.getSelection();
    var atStart = sel && sel.isCollapsed && sel.anchorOffset === 0;
    var isEmpty = !block.markdown || block.markdown.trim() === '';
    if (atStart || isEmpty) {
      var idx = editorState.blocks.findIndex(function (b) { return b.id === block.id; });
      if (idx > 0 && (isEmpty || atStart)) {
        e.preventDefault();
        if (isEmpty) {
          pushUndo();
          editorState.blocks.splice(idx, 1);
          renderAllBlocks(canvas);
          var prev = editorState.blocks[idx - 1];
          if (prev) {
            var prevEl = canvas.querySelector('[data-block-id="' + prev.id + '"] .ze-rendered, [data-block-id="' + prev.id + '"] .ze-edit-textarea');
            if (prevEl) prevEl.focus();
          }
        }
      }
    }
  }
}
