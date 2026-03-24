var _pyodide = null;

export function getPyodide() { return _pyodide; }
export function setPyodide(p) { _pyodide = p; }

export var editorState = {
  blocks: [],
  undoStack: [],
  redoStack: [],
  activeBlock: null,
  dragBlock: null,
};
