import { getPyodide, setPyodide } from './state.js';
import { editorState } from './state.js';
import { PYTHON_SETUP, DEFAULT_CONTENT } from './constants.js';
import { parseMarkdown } from './parser.js';
import { renderAllBlocks } from './blocks.js';

export function pyodideRender(markdown) {
  var p = getPyodide();
  if (!p || !markdown) return null;
  try {
    p.globals.set('_src', markdown);
    return p.runPython('render(_src)');
  } catch (e) {
    return null;
  }
}

export async function initRenderer(ui) {
  try {
    var p = await loadPyodide();
    await p.loadPackage('micropip');
    await p.runPythonAsync(PYTHON_SETUP);
    setPyodide(p);

    ui.status.textContent = 'Renderer ready';
    ui.status.className = 'ze-status ready';
    ui.dlBtn.disabled = false;

    editorState.blocks = parseMarkdown(DEFAULT_CONTENT);
    renderAllBlocks(ui.canvas);
  } catch (e) {
    ui.status.textContent = 'Renderer failed';
    ui.status.className = 'ze-status error';
    console.error('Pyodide init error:', e);

    editorState.blocks = parseMarkdown(DEFAULT_CONTENT);
    renderAllBlocks(ui.canvas);
  }
}
