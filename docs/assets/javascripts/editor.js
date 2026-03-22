(function () {
  'use strict';

  // ─── Constants ───────────────────────────────────────────────────────────────

  var PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js';

  var PYTHON_SETUP = `
import micropip
await micropip.install(['markdown', 'pymdown-extensions'])
import markdown

EXTENSIONS = [
    'tables', 'toc', 'abbr', 'admonition', 'attr_list',
    'def_list', 'footnotes', 'md_in_html',
    'pymdownx.betterem', 'pymdownx.caret', 'pymdownx.details',
    'pymdownx.highlight', 'pymdownx.inlinehilite', 'pymdownx.keys',
    'pymdownx.mark', 'pymdownx.smartsymbols', 'pymdownx.superfences',
    'pymdownx.tabbed', 'pymdownx.tasklist', 'pymdownx.tilde',
]
EXT_CONFIGS = {
    'pymdownx.highlight': {'anchor_linenums': True},
    'pymdownx.tabbed': {'alternate_style': True},
    'pymdownx.tasklist': {'custom_checkbox': True},
}

def render(src):
    md = markdown.Markdown(extensions=EXTENSIONS, extension_configs=EXT_CONFIGS)
    return md.convert(src)
`;

  var PLACEHOLDER = `# Welcome to the Zensical Editor

Paste or type your markdown here. The preview updates live.

## Features supported

- **Bold**, *italic*, ==highlight==, ^^underline^^, ~~strikethrough~~
- \`inline code\` and \`\`\`fenced code blocks\`\`\`
- ++ctrl+c++ keyboard keys
- H~2~O subscript, E=mc^2^ superscript

## Admonitions

!!! note "This is a note"
    Admonitions are fully supported.

??? tip "Collapsible tip"
    Click to expand.

## Content tabs

=== "Tab One"
    Content for tab one.

=== "Tab Two"
    Content for tab two.

## Task list

- [x] Completed item
- [ ] Pending item
`;

  // ─── Styles ──────────────────────────────────────────────────────────────────

  var STYLES = `
#zensical-editor {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  font-family: inherit;
}

.ze-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--md-default-fg-color--lightest, #e0e0e0);
  flex-shrink: 0;
  gap: 12px;
}

.ze-toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ze-title {
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
}

.ze-status {
  font-size: 0.78rem;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--md-default-fg-color--lightest, #e0e0e0);
  opacity: 0.7;
}

.ze-status.ready {
  background: #c8e6c9;
  color: #2e7d32;
  opacity: 1;
}

.ze-status.error {
  background: #ffcdd2;
  color: #c62828;
  opacity: 1;
}

.ze-btn {
  padding: 5px 14px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 500;
  background: var(--md-primary-fg-color, #1976d2);
  color: var(--md-primary-bg-color, #fff);
  transition: opacity 0.15s;
}

.ze-btn:hover { opacity: 0.85; }
.ze-btn:disabled { opacity: 0.4; cursor: default; }

.ze-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.ze-input {
  flex: 1;
  resize: none;
  border: none;
  border-right: 1px solid var(--md-default-fg-color--lightest, #e0e0e0);
  padding: 16px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.85rem;
  line-height: 1.6;
  background: var(--md-code-bg-color, #f5f5f5);
  color: var(--md-default-fg-color, #333);
  outline: none;
  overflow-y: auto;
}

.ze-preview {
  flex: 1;
  padding: 16px 24px;
  overflow-y: auto;
  line-height: 1.7;
}

/* Prevent the preview inheriting full-page article width constraints */
.ze-preview > * { max-width: 100%; }
`;

  // ─── State ───────────────────────────────────────────────────────────────────

  var pyodide = null;
  var debounceTimer = null;

  // ─── DOM helpers ─────────────────────────────────────────────────────────────

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.assign(node, attrs);
    if (children) children.forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function text(str) { return document.createTextNode(str); }

  // ─── Build UI ────────────────────────────────────────────────────────────────

  function buildUI(root) {
    // Inject styles
    var style = document.createElement('style');
    style.textContent = STYLES;
    document.head.appendChild(style);

    // Status indicator
    var status = el('span', { className: 'ze-status', textContent: 'Loading renderer\u2026' });

    // Download button
    var dlBtn = el('button', { className: 'ze-btn', textContent: 'Download .md', disabled: true });

    // Toolbar
    var toolbar = el('div', { className: 'ze-toolbar' }, [
      el('div', { className: 'ze-toolbar-left' }, [
        el('span', { className: 'ze-title', textContent: 'Zensical Editor' }),
        status,
      ]),
      dlBtn,
    ]);

    // Input
    var input = el('textarea', {
      className: 'ze-input',
      placeholder: 'Paste or type markdown\u2026',
      spellcheck: false,
      value: PLACEHOLDER,
    });

    // Preview
    var preview = el('div', { className: 'ze-preview' });

    // Body
    var body = el('div', { className: 'ze-body' }, [input, preview]);

    root.appendChild(toolbar);
    root.appendChild(body);

    return { status: status, input: input, preview: preview, dlBtn: dlBtn };
  }

  // ─── Renderer ────────────────────────────────────────────────────────────────

  function renderMarkdown(src) {
    if (!pyodide) return;
    pyodide.globals.set('_src', src);
    var html = pyodide.runPython('render(_src)');
    return html;
  }

  function scheduleRender(input, preview) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      try {
        var html = renderMarkdown(input.value);
        if (html !== undefined) preview.innerHTML = html;
      } catch (e) {
        console.error('Render error:', e);
      }
    }, 300);
  }

  // ─── Download ────────────────────────────────────────────────────────────────

  function download(content) {
    var blob = new Blob([content], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'export.md';
    a.click();
    URL.revokeObjectURL(url);
  }

  // ─── Pyodide init ────────────────────────────────────────────────────────────

  async function initRenderer(ui) {
    try {
      pyodide = await loadPyodide();
      await pyodide.loadPackage('micropip');
      await pyodide.runPythonAsync(PYTHON_SETUP);

      ui.status.textContent = 'Renderer ready';
      ui.status.className = 'ze-status ready';
      ui.dlBtn.disabled = false;

      // Initial render
      var html = renderMarkdown(ui.input.value);
      if (html) ui.preview.innerHTML = html;

      // Wire up live updates
      ui.input.addEventListener('input', function () {
        scheduleRender(ui.input, ui.preview);
      });

      // Wire up download
      ui.dlBtn.addEventListener('click', function () {
        download(ui.input.value);
      });
    } catch (e) {
      ui.status.textContent = 'Renderer failed';
      ui.status.className = 'ze-status error';
      console.error('Pyodide init error:', e);
    }
  }

  // ─── Bootstrap ───────────────────────────────────────────────────────────────

  function bootstrap() {
    var root = document.getElementById('zensical-editor');
    if (!root) return;

    var ui = buildUI(root);

    // Dynamically load Pyodide (too large to bundle)
    var script = document.createElement('script');
    script.src = PYODIDE_CDN;
    script.onload = function () { initRenderer(ui); };
    script.onerror = function () {
      ui.status.textContent = 'Failed to load renderer';
      ui.status.className = 'ze-status error';
    };
    document.head.appendChild(script);
  }

  document.addEventListener('DOMContentLoaded', bootstrap);

  // Handle MkDocs instant navigation — re-init if editor page loaded via SPA nav
  document.addEventListener('DOMContentSwitch', function () {
    var root = document.getElementById('zensical-editor');
    if (root && root.children.length === 0) bootstrap();
  });
}());
