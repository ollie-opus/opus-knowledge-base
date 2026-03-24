import { uid } from './constants.js';
import { editorState } from './state.js';
import { pushUndo } from './undo.js';
import { renderAllBlocks, autoResize } from './blocks.js';

export function getActiveEditable() {
  // Check if a contentEditable .ze-rendered is focused
  var active = document.activeElement;
  if (active && active.classList.contains('ze-rendered') && active.contentEditable === 'true') {
    return active;
  }
  return null;
}

export function getActiveTextarea() {
  var active = document.querySelector('.ze-block.active .ze-edit-textarea');
  if (active && active.style.display !== 'none') return active;
  return null;
}

export function applyInlineFormat(mdBefore, mdAfter, execCmd) {
  // Try contentEditable first
  var editable = getActiveEditable();
  if (editable) {
    if (execCmd) {
      document.execCommand(execCmd, false, null);
    } else {
      // No execCommand — wrap selection manually with markdown
      var sel = window.getSelection();
      if (!sel.rangeCount) return;
      var text = sel.toString() || 'text';
      document.execCommand('insertText', false, mdBefore + text + mdAfter);
    }
    return;
  }
  // Fall back to textarea
  var textarea = getActiveTextarea();
  if (!textarea) return;
  var start = textarea.selectionStart;
  var end = textarea.selectionEnd;
  var val = textarea.value;
  var selected = val.substring(start, end) || 'text';
  textarea.value = val.substring(0, start) + mdBefore + selected + mdAfter + val.substring(end);
  textarea.selectionStart = start + mdBefore.length;
  textarea.selectionEnd = start + mdBefore.length + selected.length;
  textarea.focus();
}

export function wrapWithTag(tag, mdBefore, mdAfter) {
  var editable = getActiveEditable();
  if (editable) {
    var sel = window.getSelection();
    if (!sel.rangeCount) return;
    var text = sel.toString() || 'text';
    document.execCommand('insertHTML', false, '<' + tag + '>' + text + '</' + tag + '>');
    return;
  }
  // Fall back to textarea
  applyInlineFormat(mdBefore, mdAfter, null);
}

export function insertTextAtCursor(text) {
  var editable = getActiveEditable();
  if (editable) {
    document.execCommand('insertText', false, text);
    return;
  }
  var textarea = getActiveTextarea();
  if (!textarea) return;
  var start = textarea.selectionStart;
  var end = textarea.selectionEnd;
  textarea.value = textarea.value.substring(0, start) + text + textarea.value.substring(end);
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
  textarea.focus();
  autoResize(textarea);
}

export function insertBlock(markdown, canvas) {
  pushUndo();
  var newBlock = { id: uid(), markdown: markdown };

  var idx = -1;
  if (editorState.activeBlock) {
    idx = editorState.blocks.findIndex(function (b) { return b.id === editorState.activeBlock; });
  }
  if (idx >= 0) {
    editorState.blocks.splice(idx + 1, 0, newBlock);
  } else {
    editorState.blocks.push(newBlock);
  }
  renderAllBlocks(canvas);

  // Focus the new block
  var newWrap = canvas.querySelector('[data-block-id="' + newBlock.id + '"]');
  if (newWrap) {
    var editable = newWrap.querySelector('.ze-rendered[contenteditable=true]');
    if (editable) {
      editable.focus();
    } else {
      // Complex block: enter textarea edit mode
      var r = newWrap.querySelector('.ze-rendered');
      var t = newWrap.querySelector('.ze-edit-textarea');
      if (r && t) {
        r.style.display = 'none';
        t.style.display = 'block';
        t.value = newBlock.markdown;
        autoResize(t);
        t.focus();
      }
    }
  }
}
