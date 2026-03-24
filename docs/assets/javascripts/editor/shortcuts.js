import { doUndo, doRedo } from './undo.js';
import { pushUndo } from './undo.js';
import { applyInlineFormat } from './formatting.js';
import { showLinkDialog } from './dialogs.js';
import { editorState } from './state.js';
import { parseMarkdown } from './parser.js';
import { renderAllBlocks } from './blocks.js';

export function setupKeyboardShortcuts(canvas) {
  document.addEventListener('keydown', function (e) {
    if (!document.getElementById('zensical-editor')) return;
    var mod = e.ctrlKey || e.metaKey;
    if (mod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); doUndo(canvas); }
    if (mod && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); doRedo(canvas); }
    if (mod && e.key === 'b') { e.preventDefault(); applyInlineFormat('**', '**', 'bold'); }
    if (mod && e.key === 'i') { e.preventDefault(); applyInlineFormat('*', '*', 'italic'); }
    if (mod && e.key === 'u') { e.preventDefault(); applyInlineFormat('^^', '^^', 'underline'); }
    if (mod && e.key === 'k') { e.preventDefault(); showLinkDialog(); }
  });

  // Paste markdown: intercept paste on the canvas and parse as markdown blocks
  canvas.addEventListener('paste', function (e) {
    var text = (e.clipboardData || window.clipboardData).getData('text/plain');
    if (!text) return;

    // If pasting inside an inline contentEditable and the text has no block-level
    // markdown (just a short snippet), let the browser handle it natively
    var target = e.target;
    var isInline = target.contentEditable === 'true' && target.classList.contains('ze-rendered');
    var hasBlocks = /\n\s*\n/.test(text) || /^(#{1,6}\s|```|~~~|\$\$|!{3}\s|\?{3}|===\s+"|---|\*{3}|_{3}|\|.*\|)/.test(text.trim());
    if (isInline && !hasBlocks) return; // let browser paste inline text normally

    e.preventDefault();
    pushUndo();

    var newBlocks = parseMarkdown(text);
    if (newBlocks.length === 0) return;

    // Find insertion point: after active block, or at the end
    var insertIdx = editorState.blocks.length;
    if (editorState.activeBlock) {
      var activeIdx = editorState.blocks.findIndex(function (b) { return b.id === editorState.activeBlock; });
      if (activeIdx >= 0) insertIdx = activeIdx + 1;
    }

    // Splice new blocks in
    for (var i = 0; i < newBlocks.length; i++) {
      editorState.blocks.splice(insertIdx + i, 0, newBlocks[i]);
    }

    renderAllBlocks(canvas);

    // Focus the last pasted block
    var lastBlock = newBlocks[newBlocks.length - 1];
    var lastEl = canvas.querySelector('[data-block-id="' + lastBlock.id + '"] .ze-rendered');
    if (lastEl) lastEl.focus();
  });
}

// Close dropdowns on click outside
export function setupDropdownClose() {
  document.addEventListener('click', function () {
    document.querySelectorAll('.ze-dropdown-menu.open').forEach(function (m) {
      m.classList.remove('open');
    });
  });
}
