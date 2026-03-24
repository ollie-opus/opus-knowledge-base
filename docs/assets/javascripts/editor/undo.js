import { editorState } from './state.js';
import { serializeAll, parseMarkdown } from './parser.js';
import { renderAllBlocks } from './blocks.js';

export function pushUndo() {
  editorState.undoStack.push(serializeAll());
  if (editorState.undoStack.length > 100) editorState.undoStack.shift();
  editorState.redoStack = [];
}

export function doUndo(canvas) {
  if (!editorState.undoStack.length) return;
  editorState.redoStack.push(serializeAll());
  var md = editorState.undoStack.pop();
  editorState.blocks = parseMarkdown(md);
  renderAllBlocks(canvas);
}

export function doRedo(canvas) {
  if (!editorState.redoStack.length) return;
  editorState.undoStack.push(serializeAll());
  var md = editorState.redoStack.pop();
  editorState.blocks = parseMarkdown(md);
  renderAllBlocks(canvas);
}
