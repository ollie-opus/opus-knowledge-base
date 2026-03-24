import { PYODIDE_CDN, DEFAULT_CONTENT } from './constants.js';
import { editorState } from './state.js';
import { el } from './dom.js';
import { STYLES } from './styles.js';
import { parseMarkdown } from './parser.js';
import { renderAllBlocks } from './blocks.js';
import { buildToolbar } from './toolbar.js';
import { setupKeyboardShortcuts, setupDropdownClose } from './shortcuts.js';
import { initRenderer } from './pyodide-render.js';

function buildUI(root) {
  // Measure the site header so the sticky toolbar sits flush below it
  var siteHeader = document.querySelector('.md-header');
  if (siteHeader) {
    root.style.setProperty('--ze-header-height', siteHeader.offsetHeight + 'px');
  }

  var style = document.createElement('style');
  style.textContent = STYLES;
  document.head.appendChild(style);

  var canvas = el('div', { className: 'ze-canvas' });
  var toolbarResult = buildToolbar(canvas);

  root.appendChild(toolbarResult.toolbar);
  root.appendChild(canvas);

  setupKeyboardShortcuts(canvas);
  setupDropdownClose();

  return { canvas: canvas, status: toolbarResult.status, dlBtn: toolbarResult.dlBtn };
}

function bootstrap() {
  var root = document.getElementById('zensical-editor');
  if (!root) return;

  var ui = buildUI(root);

  var script = document.createElement('script');
  script.src = PYODIDE_CDN;
  script.onload = function () { initRenderer(ui); };
  script.onerror = function () {
    ui.status.textContent = 'Failed to load renderer';
    ui.status.className = 'ze-status error';
    editorState.blocks = parseMarkdown(DEFAULT_CONTENT);
    renderAllBlocks(ui.canvas);
  };
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', bootstrap);

document.addEventListener('DOMContentSwitch', function () {
  var root = document.getElementById('zensical-editor');
  if (root && root.children.length === 0) bootstrap();
});
