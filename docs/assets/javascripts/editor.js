(() => {
  // docs/assets/javascripts/editor/constants.js
  var PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js";
  var PYTHON_SETUP = [
    "import micropip",
    'await micropip.install(["markdown", "pymdown-extensions"])',
    "import markdown",
    "",
    "EXTENSIONS = [",
    '    "tables", "toc", "abbr", "admonition", "attr_list",',
    '    "def_list", "footnotes", "md_in_html",',
    '    "pymdownx.betterem", "pymdownx.caret", "pymdownx.details",',
    '    "pymdownx.highlight", "pymdownx.inlinehilite", "pymdownx.keys",',
    '    "pymdownx.mark", "pymdownx.smartsymbols", "pymdownx.superfences",',
    '    "pymdownx.tabbed", "pymdownx.tasklist", "pymdownx.tilde",',
    "]",
    "EXT_CONFIGS = {",
    '    "pymdownx.highlight": {"anchor_linenums": True},',
    '    "pymdownx.tabbed": {"alternate_style": True},',
    '    "pymdownx.tasklist": {"custom_checkbox": True},',
    "}",
    "",
    "def render(src):",
    "    md = markdown.Markdown(extensions=EXTENSIONS, extension_configs=EXT_CONFIGS)",
    "    return md.convert(src)"
  ].join("\n");
  var ADMONITION_TYPES = [
    "note",
    "abstract",
    "info",
    "tip",
    "success",
    "question",
    "warning",
    "failure",
    "danger",
    "bug",
    "example",
    "quote",
    "new-addition",
    "improvement",
    "feature-release"
  ];
  var CODE_LANGUAGES = [
    "python",
    "javascript",
    "typescript",
    "bash",
    "shell",
    "html",
    "css",
    "json",
    "yaml",
    "toml",
    "sql",
    "go",
    "rust",
    "java",
    "c",
    "cpp",
    "csharp",
    "ruby",
    "php",
    "swift",
    "kotlin",
    "markdown",
    "xml",
    "text"
  ];
  var DEFAULT_CONTENT = [
    "# Welcome to the Zensical Editor",
    "",
    "Start typing to create content. Use the toolbar above to format text and insert blocks.",
    "",
    "## Features",
    "",
    "- **Bold**, *italic*, ==highlight==, ^^underline^^, ~~strikethrough~~",
    "- `inline code` and fenced code blocks",
    "- ++ctrl+c++ keyboard keys",
    "",
    '!!! tip "Getting Started"',
    "    Click on any block to edit it. Use the toolbar to add new elements.",
    "",
    '??? note "Collapsible Section"',
    "    This content is hidden by default. Click to expand."
  ].join("\n");
  var _uid = 0;
  function uid() {
    return "zb-" + ++_uid;
  }

  // docs/assets/javascripts/editor/state.js
  var _pyodide = null;
  function getPyodide() {
    return _pyodide;
  }
  function setPyodide(p) {
    _pyodide = p;
  }
  var editorState = {
    blocks: [],
    undoStack: [],
    redoStack: [],
    activeBlock: null,
    dragBlock: null
  };

  // docs/assets/javascripts/editor/dom.js
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(k) {
        if (k === "className") node.className = attrs[k];
        else if (k === "style" && typeof attrs[k] === "object") {
          Object.assign(node.style, attrs[k]);
        } else if (k.startsWith("on")) {
          node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        } else if (k === "dataset") {
          Object.keys(attrs[k]).forEach(function(dk) {
            node.dataset[dk] = attrs[k][dk];
          });
        } else node[k] = attrs[k];
      });
    }
    if (children) {
      children.forEach(function(c) {
        if (!c) return;
        if (typeof c === "string") node.appendChild(document.createTextNode(c));
        else node.appendChild(c);
      });
    }
    return node;
  }
  function svg(paths, vbox, cls) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", vbox || "0 0 24 24");
    s.setAttribute("width", "16");
    s.setAttribute("height", "16");
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "2");
    s.setAttribute("stroke-linecap", "round");
    s.setAttribute("stroke-linejoin", "round");
    if (cls) s.setAttribute("class", cls);
    if (typeof paths === "string") paths = [paths];
    paths.forEach(function(d) {
      if (d.startsWith("<")) {
        s.innerHTML += d;
        return;
      }
      var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", d);
      s.appendChild(p);
    });
    return s;
  }

  // docs/assets/javascripts/editor/styles.js
  var STYLES = [
    "#zensical-editor { display:flex; flex-direction:column; min-height:calc(100vh - 60px); font-family:inherit; }",
    /* ── Toolbar ── */
    ".ze-toolbar { display:flex; flex-direction:column; border-bottom:1px solid var(--md-default-fg-color--lightest,#e0e0e0); flex-shrink:0; background:var(--md-default-bg-color,#fff); backdrop-filter:blur(8px); position:sticky; top:0; z-index:100; }",
    ".ze-toolbar-row { display:flex; align-items:center; padding:4px 10px; gap:4px; flex-wrap:wrap; }",
    ".ze-toolbar-row:first-child { border-bottom:1px solid var(--md-default-fg-color--lightest,#e0e0e0); }",
    ".ze-sep { width:1px; height:20px; background:var(--md-default-fg-color--lightest,#ddd); margin:0 4px; flex-shrink:0; }",
    ".ze-spacer { flex:1; }",
    /* ── Toolbar buttons ── */
    ".ze-tbtn { display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border:none; border-radius:6px; cursor:pointer; background:transparent; color:var(--md-default-fg-color,#333); transition:all .15s; position:relative; }",
    ".ze-tbtn:hover { background:var(--md-default-fg-color--lightest,#eee); }",
    ".ze-tbtn.active { background:var(--md-primary-fg-color,#1976d2); color:var(--md-primary-bg-color,#fff); }",
    ".ze-tbtn:disabled { opacity:.3; cursor:default; }",
    ".ze-tbtn svg { width:16px; height:16px; pointer-events:none; }",
    ".ze-tbtn-label { font-size:.75rem; font-weight:600; min-width:30px; width:auto; padding:0 6px; }",
    /* ── Dropdown ── */
    ".ze-dropdown { position:relative; display:inline-flex; }",
    ".ze-dropdown-menu { position:absolute; top:100%; left:0; min-width:160px; background:var(--md-default-bg-color,#fff); border:1px solid var(--md-default-fg-color--lightest,#ddd); border-radius:8px; box-shadow:0 8px 24px rgba(0,0,0,.12); z-index:200; padding:4px; display:none; backdrop-filter:blur(12px); max-height:320px; overflow-y:auto; }",
    ".ze-dropdown-menu.open { display:block; }",
    ".ze-dropdown-item { display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius:6px; cursor:pointer; font-size:.82rem; color:var(--md-default-fg-color,#333); border:none; background:none; width:100%; text-align:left; }",
    ".ze-dropdown-item:hover { background:var(--md-default-fg-color--lightest,#eee); }",
    ".ze-dropdown-item.active { background:var(--md-primary-fg-color,#1976d2); color:#fff; }",
    /* ── Status ── */
    ".ze-status { font-size:.72rem; padding:2px 8px; border-radius:10px; background:var(--md-default-fg-color--lightest,#e0e0e0); opacity:.7; white-space:nowrap; }",
    ".ze-status.ready { background:#c8e6c9; color:#2e7d32; opacity:1; }",
    ".ze-status.error { background:#ffcdd2; color:#c62828; opacity:1; }",
    /* ── Download button ── */
    ".ze-btn { display:inline-flex; align-items:center; gap:4px; padding:4px 12px; border-radius:6px; border:none; cursor:pointer; font-size:.78rem; font-weight:500; background:var(--md-primary-fg-color,#1976d2); color:var(--md-primary-bg-color,#fff); transition:opacity .15s; }",
    ".ze-btn:hover { opacity:.85; }",
    ".ze-btn:disabled { opacity:.35; cursor:default; }",
    ".ze-btn svg { width:14px; height:14px; }",
    /* ── Canvas (editing area) ── */
    ".ze-canvas { padding:24px 48px 120px; max-width:900px; margin:0 auto; width:100%; box-sizing:border-box; }",
    /* ── Block wrapper ── */
    ".ze-block { position:relative; margin:2px 0; border-radius:6px; transition:box-shadow .15s; min-height:1.6em; }",
    ".ze-block:hover { box-shadow:0 0 0 1px rgba(128,128,128,.25); }",
    ".ze-block.active { box-shadow:0 0 0 2px var(--md-primary-fg-color,#1976d2); }",
    ".ze-block.drag-over-top { box-shadow:0 -2px 0 0 var(--md-primary-fg-color,#1976d2); }",
    ".ze-block.drag-over-bottom { box-shadow:0 2px 0 0 var(--md-primary-fg-color,#1976d2); }",
    /* ── Drag handle ── */
    ".ze-drag { position:absolute; left:-28px; top:4px; width:20px; height:20px; cursor:grab; opacity:0; transition:opacity .15s; display:flex; align-items:center; justify-content:center; border-radius:4px; color:var(--md-default-fg-color,#999); }",
    ".ze-block:hover .ze-drag { opacity:.5; }",
    ".ze-drag:hover { opacity:1 !important; background:var(--md-default-fg-color--lightest,#eee); }",
    ".ze-drag svg { width:14px; height:14px; }",
    /* ── Rendered content (Pyodide output, inherits Zensical CSS) ── */
    ".ze-rendered { padding:4px 8px; min-height:1.4em; word-break:break-word; line-height:1.7; }",
    '.ze-rendered:empty::before { content:"Click to edit\\2026"; color:var(--md-default-fg-color--lightest,#aaa); pointer-events:none; }',
    ".ze-rendered[contenteditable=true] { outline:none; cursor:text; }",
    ".ze-rendered[contenteditable=true]:focus { background:rgba(128,128,128,.04); border-radius:4px; }",
    /* ── Edit textarea (raw markdown for complex blocks) ── */
    '.ze-edit-textarea { width:100%; min-height:60px; border:none; padding:10px; font-family:"JetBrains Mono","Fira Code",monospace; font-size:.85rem; line-height:1.6; background:var(--md-code-bg-color,#f5f5f5); color:var(--md-default-fg-color,#333); outline:none; resize:none; box-sizing:border-box; tab-size:4; border-radius:6px; display:block; }',
    /* ── Settings gear (block properties) ── */
    ".ze-settings-gear { position:absolute; right:-28px; top:4px; width:20px; height:20px; cursor:pointer; opacity:0; transition:opacity .15s; display:flex; align-items:center; justify-content:center; border-radius:4px; color:var(--md-default-fg-color,#999); z-index:10; }",
    ".ze-block:hover .ze-settings-gear { opacity:.5; }",
    ".ze-settings-gear:hover { opacity:1 !important; background:var(--md-default-fg-color--lightest,#eee); }",
    ".ze-settings-gear.open { opacity:1 !important; z-index:160; }",
    ".ze-settings-gear svg { width:14px; height:14px; }",
    /* ── Properties popover (Notion-style) ── */
    ".ze-props { position:absolute; top:0; right:-8px; transform:translateX(100%); width:240px; background:var(--md-default-bg-color,#fff); border:1px solid var(--md-default-fg-color--lightest,#e0e0e0); border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.06); z-index:150; overflow:hidden; }",
    ".ze-props-header { padding:8px 12px 8px 28px; font-size:.75rem; font-weight:600; color:var(--md-default-fg-color--light,#888); border-bottom:1px solid var(--md-default-fg-color--lightest,#eee); }",
    ".ze-props-body { padding:8px 12px; }",
    ".ze-props-body label { display:block; font-size:.75rem; font-weight:500; margin:8px 0 3px; color:var(--md-default-fg-color--light,#666); }",
    ".ze-props-body label:first-child { margin-top:0; }",
    ".ze-props-body select,.ze-props-body input[type=text] { width:100%; padding:5px 8px; border:1px solid var(--md-default-fg-color--lightest,#e0e0e0); border-radius:6px; font-size:.8rem; background:var(--md-default-bg-color,#fff); color:var(--md-default-fg-color,#333); outline:none; box-sizing:border-box; transition:border-color .15s; }",
    ".ze-props-body select:focus,.ze-props-body input:focus { border-color:var(--md-primary-fg-color,#1976d2); }",
    ".ze-props-row { display:flex; align-items:center; justify-content:space-between; margin:8px 0; }",
    ".ze-props-row label { margin:0 !important; }",
    ".ze-props-footer { padding:8px 12px; border-top:1px solid var(--md-default-fg-color--lightest,#eee); }",
    ".ze-toggle { position:relative; width:36px; height:20px; background:var(--md-default-fg-color--lightest,#ccc); border-radius:10px; cursor:pointer; transition:background .2s; flex-shrink:0; }",
    ".ze-toggle.on { background:var(--md-primary-fg-color,#1976d2); }",
    '.ze-toggle::after { content:""; position:absolute; top:2px; left:2px; width:16px; height:16px; background:#fff; border-radius:50%; transition:transform .2s; }',
    ".ze-toggle.on::after { transform:translateX(16px); }",
    /* ── Emoji picker ── */
    ".ze-emoji-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:2px; padding:4px; max-height:200px; overflow-y:auto; }",
    ".ze-emoji-btn { padding:4px; border:none; background:none; cursor:pointer; font-size:1.2rem; border-radius:4px; }",
    ".ze-emoji-btn:hover { background:var(--md-default-fg-color--lightest,#eee); }",
    /* ── Link / Image dialog ── */
    ".ze-dialog-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,.3); z-index:300; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(2px); }",
    ".ze-dialog { background:var(--md-default-bg-color,#fff); border-radius:12px; padding:20px; min-width:360px; max-width:480px; box-shadow:0 12px 40px rgba(0,0,0,.15); }",
    ".ze-dialog h3 { margin:0 0 12px; font-size:.95rem; }",
    ".ze-dialog input { width:100%; padding:8px 10px; border:1px solid var(--md-default-fg-color--lightest,#ddd); border-radius:6px; font-size:.85rem; margin-bottom:8px; outline:none; box-sizing:border-box; background:var(--md-default-bg-color,#fff); color:var(--md-default-fg-color,#333); }",
    ".ze-dialog input:focus { border-color:var(--md-primary-fg-color,#1976d2); }",
    ".ze-dialog-btns { display:flex; gap:8px; justify-content:flex-end; margin-top:12px; }",
    /* ── Tooltip ── */
    ".ze-tbtn[title] { position:relative; }",
    /* ── WYSIWYG Admonition body ── */
    ".ze-admonition-body { outline:none; cursor:text; min-height:1.4em; }",
    ".ze-admonition-body:focus { background:rgba(128,128,128,.04); border-radius:4px; }",
    '.ze-admonition-body:empty::before { content:"Type admonition content\\2026"; color:var(--md-default-fg-color--lightest,#aaa); pointer-events:none; }',
    /* ── WYSIWYG Table cells ── */
    ".ze-table-wrap th[contenteditable],.ze-table-wrap td[contenteditable] { outline:none; cursor:text; min-width:40px; }",
    ".ze-table-wrap th[contenteditable]:focus,.ze-table-wrap td[contenteditable]:focus { background:rgba(128,128,128,.08); box-shadow:inset 0 0 0 1px var(--md-primary-fg-color,#1976d2); }",
    ".ze-table-actions { display:flex; gap:4px; margin-top:4px; opacity:0; transition:opacity .15s; }",
    ".ze-block:hover .ze-table-actions { opacity:1; }",
    ".ze-table-action-btn { font-size:.72rem; padding:2px 8px; border:1px solid var(--md-default-fg-color--lightest,#ddd); border-radius:4px; background:var(--md-default-bg-color,#fff); cursor:pointer; color:var(--md-default-fg-color,#666); }",
    ".ze-table-action-btn:hover { background:var(--md-default-fg-color--lightest,#eee); }"
  ].join("\n");

  // docs/assets/javascripts/editor/parser.js
  function parseMarkdown(src) {
    var lines = src.split("\n");
    var blocks = [];
    var i = 0;
    while (i < lines.length) {
      var line = lines[i];
      var trimmed = line.trim();
      if (trimmed === "") {
        i++;
        continue;
      }
      if (/^#{1,6}\s+/.test(trimmed)) {
        blocks.push({ id: uid(), markdown: trimmed });
        i++;
        continue;
      }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        blocks.push({ id: uid(), markdown: trimmed });
        i++;
        continue;
      }
      var codeMatch = trimmed.match(/^(`{3,}|~{3,})/);
      if (codeMatch) {
        var fence = codeMatch[1];
        var blockLines = [line];
        i++;
        while (i < lines.length) {
          blockLines.push(lines[i]);
          if (lines[i].trim() === fence || lines[i].trim().startsWith(fence.charAt(0).repeat(fence.length))) {
            i++;
            break;
          }
          i++;
        }
        blocks.push({ id: uid(), markdown: blockLines.join("\n") });
        continue;
      }
      if (trimmed === "$$") {
        var blockLines = [line];
        i++;
        while (i < lines.length) {
          blockLines.push(lines[i]);
          if (lines[i].trim() === "$$") {
            i++;
            break;
          }
          i++;
        }
        blocks.push({ id: uid(), markdown: blockLines.join("\n") });
        continue;
      }
      if (/^(!{3}|\?{3}\+?)\s/.test(trimmed)) {
        var blockLines = [line];
        i++;
        while (i < lines.length) {
          var ll = lines[i];
          if (ll.trim() === "") {
            var j = i + 1;
            while (j < lines.length && lines[j].trim() === "") j++;
            if (j < lines.length && lines[j].search(/\S/) >= 4) {
              blockLines.push(ll);
              i++;
              continue;
            }
            break;
          }
          if (ll.search(/\S/) >= 4) {
            blockLines.push(ll);
            i++;
          } else break;
        }
        blocks.push({ id: uid(), markdown: blockLines.join("\n") });
        continue;
      }
      if (/^===\s+"/.test(trimmed)) {
        var blockLines = [line];
        i++;
        while (i < lines.length) {
          var ll = lines[i];
          if (ll.trim() === "") {
            var j = i + 1;
            while (j < lines.length && lines[j].trim() === "") j++;
            if (j < lines.length && (lines[j].search(/\S/) >= 4 || /^===\s+"/.test(lines[j].trim()))) {
              blockLines.push(ll);
              i++;
              continue;
            }
            break;
          }
          if (ll.search(/\S/) >= 4 || /^===\s+"/.test(ll.trim())) {
            blockLines.push(ll);
            i++;
          } else break;
        }
        blocks.push({ id: uid(), markdown: blockLines.join("\n") });
        continue;
      }
      if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
        var blockLines = [line];
        i++;
        while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
          blockLines.push(lines[i]);
          i++;
        }
        blocks.push({ id: uid(), markdown: blockLines.join("\n") });
        continue;
      }
      if (/^(\s*)([-*+]|\d+\.)\s/.test(trimmed)) {
        var blockLines = [line];
        i++;
        while (i < lines.length) {
          var ll = lines[i];
          var llt = ll.trim();
          if (llt === "") {
            if (i + 1 < lines.length && (/^\s*([-*+]|\d+\.)\s/.test(lines[i + 1]) || /^\s{2,}/.test(lines[i + 1]))) {
              blockLines.push(ll);
              i++;
              continue;
            }
            break;
          }
          if (/^([-*+]|\d+\.)\s/.test(llt) || /^\s{2,}/.test(ll)) {
            blockLines.push(ll);
            i++;
          } else break;
        }
        blocks.push({ id: uid(), markdown: blockLines.join("\n") });
        continue;
      }
      if (/^\[\^\w+\]:/.test(trimmed)) {
        var blockLines = [line];
        i++;
        while (i < lines.length) {
          var ll = lines[i];
          if (ll.trim() === "") {
            var j = i + 1;
            while (j < lines.length && lines[j].trim() === "") j++;
            if (j < lines.length && lines[j].search(/\S/) >= 4) {
              blockLines.push(ll);
              i++;
              continue;
            }
            break;
          }
          if (ll.search(/\S/) >= 4) {
            blockLines.push(ll);
            i++;
          } else break;
        }
        blocks.push({ id: uid(), markdown: blockLines.join("\n") });
        continue;
      }
      var blockLines = [line];
      i++;
      while (i < lines.length && lines[i].trim() !== "") {
        var pl = lines[i].trim();
        if (/^#{1,6}\s/.test(pl) || /^(`{3,}|~{3,})/.test(pl) || /^(!{3}|\?{3})/.test(pl) || /^===\s+"/.test(pl) || pl === "$$" || /^(-{3,}|\*{3,}|_{3,})$/.test(pl) || pl.startsWith("|") && pl.endsWith("|") || /^\[\^\w+\]:/.test(pl)) break;
        blockLines.push(lines[i]);
        i++;
      }
      blocks.push({ id: uid(), markdown: blockLines.join("\n") });
    }
    return blocks;
  }
  function serializeAll() {
    return editorState.blocks.map(function(b) {
      return b.markdown;
    }).join("\n\n");
  }

  // docs/assets/javascripts/editor/icons.js
  var ICONS = {
    bold: "M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6zM6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z",
    italic: ["M19 4h-9", "M14 20H5", "M15 4L9 20"],
    strikethrough: ["M16 4l-4.2 11.3", "M8 20l2.1-5.6", "M4 12h16"],
    underline: ["M6 3v7a6 6 0 0 0 12 0V3", "M4 21h16"],
    highlight: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"],
    superscript: ["M4 19l7-13", "M11 19l-3.5-6.5", '<text x="16" y="10" font-size="10" fill="currentColor" stroke="none">A</text><text x="20" y="7" font-size="6" fill="currentColor" stroke="none">2</text>'],
    subscript: ["M4 19l7-13", "M11 19l-3.5-6.5", '<text x="16" y="14" font-size="10" fill="currentColor" stroke="none">A</text><text x="20" y="19" font-size="6" fill="currentColor" stroke="none">2</text>'],
    heading: ["M6 4v16", "M18 4v16", "M6 12h12"],
    ul: ["M9 6h11", "M9 12h11", "M9 18h11", '<circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none"/>', '<circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none"/>', '<circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none"/>'],
    ol: ["M10 6h10", "M10 12h10", "M10 18h10", '<text x="2" y="8" font-size="7" fill="currentColor" stroke="none">1.</text>', '<text x="2" y="14" font-size="7" fill="currentColor" stroke="none">2.</text>', '<text x="2" y="20" font-size="7" fill="currentColor" stroke="none">3.</text>'],
    task: ["M9 11l3 3L22 4", "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"],
    code: ["M16 18l6-6-6-6", "M8 6l-6 6 6 6"],
    codeBlock: ["M4 5h16v14H4z", "M8 9l2 2-2 2", "M14 9h2"],
    link: ["M10 13a5 5 0 0 0 7.5.5l.5-.5a5 5 0 0 0-7.5-6.5l-1 1", "M14 11a5 5 0 0 0-7.5-.5l-.5.5a5 5 0 0 0 7.5 6.5l1-1"],
    image: ["M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z", "M21 15l-5-5L5 21"],
    table: ["M3 3h18v18H3z", "M3 9h18", "M3 15h18", "M9 3v18", "M15 3v18"],
    admonition: ["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
    tabs: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M2 8h20", "M8 4v4", "M14 4v4"],
    math: '<text x="3" y="18" font-size="16" fill="currentColor" stroke="none" font-style="italic">f(x)</text>',
    mermaid: ["M5 3v18", "M5 12h6a4 4 0 0 0 4-4V3", "M5 16h6a4 4 0 0 1 4 4v0"],
    keyboard: ["M2 6h20v12H2z", "M6 10h0", "M10 10h0", "M14 10h0", "M18 10h0", "M8 14h8"],
    hr: ["M2 12h20"],
    footnote: ['<text x="2" y="16" font-size="14" fill="currentColor" stroke="none">F</text>', '<text x="14" y="10" font-size="8" fill="currentColor" stroke="none">1</text>'],
    emoji: ['<circle cx="12" cy="12" r="10"/>', "M8 14s1.5 2 4 2 4-2 4-2", "M9 9h.01", "M15 9h.01"],
    undo: ["M3 7v6h6", "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6.7 3L3 13"],
    redo: ["M21 7v6h-6", "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6.7 3L21 13"],
    download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
    grip: ['<circle cx="9" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="9" cy="19" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="19" r="1" fill="currentColor" stroke="none"/>'],
    chevronDown: "M6 9l6 6 6-6",
    close: ["M18 6L6 18", "M6 6l12 12"],
    plus: ["M12 5v14", "M5 12h14"],
    trash: ["M3 6h18", "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6", "M10 11v6", "M14 11v6"],
    settings: ['<circle cx="12" cy="12" r="3"/>', "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"]
  };
  function icon(name) {
    return svg(ICONS[name]);
  }

  // docs/assets/javascripts/editor/undo.js
  function pushUndo() {
    editorState.undoStack.push(serializeAll());
    if (editorState.undoStack.length > 100) editorState.undoStack.shift();
    editorState.redoStack = [];
  }
  function doUndo(canvas) {
    if (!editorState.undoStack.length) return;
    editorState.redoStack.push(serializeAll());
    var md = editorState.undoStack.pop();
    editorState.blocks = parseMarkdown(md);
    renderAllBlocks(canvas);
  }
  function doRedo(canvas) {
    if (!editorState.redoStack.length) return;
    editorState.undoStack.push(serializeAll());
    var md = editorState.redoStack.pop();
    editorState.blocks = parseMarkdown(md);
    renderAllBlocks(canvas);
  }

  // docs/assets/javascripts/editor/pyodide-render.js
  function pyodideRender(markdown) {
    var p = getPyodide();
    if (!p || !markdown) return null;
    try {
      p.globals.set("_src", markdown);
      return p.runPython("render(_src)");
    } catch (e) {
      return null;
    }
  }
  async function initRenderer(ui) {
    try {
      var p = await loadPyodide();
      await p.loadPackage("micropip");
      await p.runPythonAsync(PYTHON_SETUP);
      setPyodide(p);
      ui.status.textContent = "Renderer ready";
      ui.status.className = "ze-status ready";
      ui.dlBtn.disabled = false;
      editorState.blocks = parseMarkdown(DEFAULT_CONTENT);
      renderAllBlocks(ui.canvas);
    } catch (e) {
      ui.status.textContent = "Renderer failed";
      ui.status.className = "ze-status error";
      console.error("Pyodide init error:", e);
      editorState.blocks = parseMarkdown(DEFAULT_CONTENT);
      renderAllBlocks(ui.canvas);
    }
  }

  // docs/assets/javascripts/editor/html-to-md.js
  function htmlToInlineMarkdown(html) {
    var div = document.createElement("div");
    div.innerHTML = html;
    return walkNodes(div);
  }
  function walkNodes(node) {
    var result = "";
    node.childNodes.forEach(function(child) {
      if (child.nodeType === 3) {
        result += child.textContent;
        return;
      }
      if (child.nodeType !== 1) return;
      var tag = child.tagName.toLowerCase();
      var inner = walkNodes(child);
      switch (tag) {
        case "strong":
        case "b":
          result += "**" + inner + "**";
          break;
        case "em":
        case "i":
          result += "*" + inner + "*";
          break;
        case "del":
        case "s":
          result += "~~" + inner + "~~";
          break;
        case "ins":
        case "u":
          result += "^^" + inner + "^^";
          break;
        case "mark":
          result += "==" + inner + "==";
          break;
        case "sup":
          result += "^" + inner + "^";
          break;
        case "sub":
          result += "~" + inner + "~";
          break;
        case "code":
          result += "`" + inner + "`";
          break;
        case "kbd":
          result += "++" + inner + "++";
          break;
        case "a":
          if (child.classList.contains("headerlink")) break;
          result += "[" + inner + "](" + (child.getAttribute("href") || "") + ")";
          break;
        case "img":
          result += "![" + (child.getAttribute("alt") || "") + "](" + (child.getAttribute("src") || "") + ")";
          break;
        case "br":
          result += "\n";
          break;
        case "p":
          result += (result ? "\n" : "") + inner;
          break;
        default:
          result += inner;
      }
    });
    return result;
  }
  function htmlTableToMarkdown(table) {
    var headerCells = [];
    var thead = table.querySelector("thead");
    if (thead) {
      thead.querySelectorAll("th").forEach(function(th) {
        headerCells.push(walkNodes(th).trim().replace(/\|/g, "\\|"));
      });
    }
    var bodyRows = [];
    var tbody = table.querySelector("tbody") || table;
    tbody.querySelectorAll("tr").forEach(function(tr) {
      if (tr.closest("thead")) return;
      var cells = [];
      tr.querySelectorAll("td").forEach(function(td) {
        cells.push(walkNodes(td).trim().replace(/\|/g, "\\|"));
      });
      bodyRows.push(cells);
    });
    var colCount = Math.max(headerCells.length, bodyRows.length > 0 ? bodyRows[0].length : 0);
    if (colCount === 0) return "";
    while (headerCells.length < colCount) headerCells.push(" ");
    bodyRows.forEach(function(row) {
      while (row.length < colCount) row.push(" ");
    });
    var lines = [];
    lines.push("| " + headerCells.map(function(c) {
      return c || " ";
    }).join(" | ") + " |");
    lines.push("| " + headerCells.map(function() {
      return "---";
    }).join(" | ") + " |");
    bodyRows.forEach(function(row) {
      lines.push("| " + row.map(function(c) {
        return c || " ";
      }).join(" | ") + " |");
    });
    return lines.join("\n");
  }
  function htmlListToMarkdown(container) {
    var lines = [];
    function walkList(node, indent, ordered) {
      var idx = 1;
      node.childNodes.forEach(function(li) {
        if (li.tagName && li.tagName.toLowerCase() === "li") {
          var prefix = ordered ? idx++ + ". " : "- ";
          var checkbox = li.querySelector('input[type="checkbox"]');
          var text = "";
          li.childNodes.forEach(function(c) {
            if (c.tagName && (c.tagName.toLowerCase() === "ul" || c.tagName.toLowerCase() === "ol")) return;
            if (c.tagName && c.tagName.toLowerCase() === "input") return;
            if (c.nodeType === 3) text += c.textContent;
            else if (c.nodeType === 1) text += walkNodes(c);
          });
          if (checkbox) {
            prefix = "- [" + (checkbox.checked ? "x" : " ") + "] ";
          }
          lines.push(indent + prefix + text.trim());
          li.childNodes.forEach(function(c) {
            if (c.tagName && c.tagName.toLowerCase() === "ul") walkList(c, indent + "  ", false);
            if (c.tagName && c.tagName.toLowerCase() === "ol") walkList(c, indent + "  ", true);
          });
        }
      });
    }
    var list = container.querySelector("ul, ol");
    if (list) {
      walkList(list, "", list.tagName.toLowerCase() === "ol");
    } else {
      return container.textContent;
    }
    return lines.join("\n");
  }

  // docs/assets/javascripts/editor/block-edit.js
  function getBlockEditMode(markdown) {
    var trimmed = (markdown || "").trim();
    if (!trimmed) return "inline";
    if (/^#{1,6}\s/.test(trimmed)) return "inline";
    if (/^(\s*)([-*+]|\d+\.)\s/.test(trimmed)) return "inline";
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) return "none";
    if (/^(`{3,}|~{3,})/.test(trimmed)) return "textarea";
    if (trimmed === "$$" || trimmed.startsWith("$$")) return "textarea";
    if (/^===\s+"/.test(trimmed)) return "textarea";
    if (/^\[\^\w+\]:/.test(trimmed)) return "textarea";
    if (/^(!{3}|\?{3}\+?)\s/.test(trimmed)) return "admonition";
    if (trimmed.startsWith("|") && trimmed.includes("|")) return "table";
    return "inline";
  }
  function getHeadingLevel(markdown) {
    var match = (markdown || "").trim().match(/^(#{1,6})\s/);
    return match ? match[1].length : 0;
  }
  function handleInlineBlockKeydown(e, block, canvas) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      pushUndo();
      var rendered = e.target;
      var headingLevel = getHeadingLevel(block.markdown);
      if (headingLevel > 0) {
        block.markdown = "#".repeat(headingLevel) + " " + htmlToInlineMarkdown(rendered.innerHTML);
      } else if (/^(\s*)([-*+]|\d+\.)\s/.test(block.markdown.trim())) {
        block.markdown = htmlListToMarkdown(rendered);
      } else {
        block.markdown = htmlToInlineMarkdown(rendered.innerHTML);
      }
      var idx = editorState.blocks.findIndex(function(b) {
        return b.id === block.id;
      });
      var newBlock = { id: uid(), markdown: "" };
      editorState.blocks.splice(idx + 1, 0, newBlock);
      renderAllBlocks(canvas);
      var newEl = canvas.querySelector('[data-block-id="' + newBlock.id + '"] .ze-rendered');
      if (newEl) newEl.focus();
    }
    if (e.key === "Backspace") {
      var sel = window.getSelection();
      var atStart = sel && sel.isCollapsed && sel.anchorOffset === 0;
      var isEmpty = !block.markdown || block.markdown.trim() === "";
      if (atStart || isEmpty) {
        var idx = editorState.blocks.findIndex(function(b) {
          return b.id === block.id;
        });
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

  // docs/assets/javascripts/editor/admonition.js
  function parseAdmonitionHeader(markdown) {
    var lines = markdown.split("\n");
    var firstLine = lines[0].trim();
    var match = firstLine.match(/^(!{3}|\?{3}\+?)\s+(\S+)/);
    if (!match) return null;
    var marker = match[1];
    var type = match[2];
    var rest = firstLine.slice(match[0].length);
    var inlinePos = "";
    if (rest.includes("inline end")) inlinePos = "end";
    else if (rest.includes("inline")) inlinePos = "start";
    var titleMatch = rest.match(/"([^"]*)"/);
    var title = titleMatch ? titleMatch[1] : type.charAt(0).toUpperCase() + type.slice(1);
    return {
      collapsible: marker.startsWith("???"),
      defaultOpen: marker === "???+",
      type,
      title,
      inline: inlinePos,
      bodyLines: lines.slice(1)
    };
  }
  function rebuildAdmonitionMarkdown(props, bodyLines) {
    var marker = props.collapsible ? props.defaultOpen ? "???+" : "???" : "!!!";
    var inlinePart = props.inline === "start" ? " inline" : props.inline === "end" ? " inline end" : "";
    var titlePart = ' "' + props.title + '"';
    var header = marker + " " + props.type + inlinePart + titlePart;
    return header + (bodyLines.length ? "\n" + bodyLines.join("\n") : "\n    ");
  }
  function buildAdmonitionProps(panel, block, canvas) {
    var parsed = parseAdmonitionHeader(block.markdown);
    if (!parsed) return;
    panel.appendChild(el("label", {}, ["Type"]));
    var typeSelect = el("select");
    ADMONITION_TYPES.forEach(function(t) {
      var opt = el("option", { value: t, textContent: t });
      if (t === parsed.type) opt.selected = true;
      typeSelect.appendChild(opt);
    });
    typeSelect.addEventListener("change", function() {
      pushUndo();
      parsed.type = typeSelect.value;
      block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
      renderAllBlocks(canvas);
    });
    panel.appendChild(typeSelect);
    panel.appendChild(el("label", {}, ["Title"]));
    var titleInput = el("input", { type: "text", value: parsed.title || "" });
    titleInput.addEventListener("input", function() {
      parsed.title = titleInput.value;
    });
    titleInput.addEventListener("blur", function() {
      pushUndo();
      block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
      renderAllBlocks(canvas);
    });
    panel.appendChild(titleInput);
    var collRow = el("div", { className: "ze-props-row" }, [
      el("label", { style: { margin: "0" } }, ["Collapsible"])
    ]);
    var collToggle = el("div", {
      className: "ze-toggle" + (parsed.collapsible ? " on" : ""),
      onclick: function() {
        pushUndo();
        parsed.collapsible = !parsed.collapsible;
        if (!parsed.collapsible) parsed.defaultOpen = false;
        collToggle.classList.toggle("on");
        block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
        renderAllBlocks(canvas);
      }
    });
    collRow.appendChild(collToggle);
    panel.appendChild(collRow);
    if (parsed.collapsible) {
      var openRow = el("div", { className: "ze-props-row" }, [
        el("label", { style: { margin: "0" } }, ["Open by default"])
      ]);
      var openToggle = el("div", {
        className: "ze-toggle" + (parsed.defaultOpen ? " on" : ""),
        onclick: function() {
          pushUndo();
          parsed.defaultOpen = !parsed.defaultOpen;
          openToggle.classList.toggle("on");
          block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
          renderAllBlocks(canvas);
        }
      });
      openRow.appendChild(openToggle);
      panel.appendChild(openRow);
    }
    panel.appendChild(el("label", {}, ["Inline Position"]));
    var inlineSelect = el("select");
    [{ v: "", t: "None" }, { v: "start", t: "Left (inline)" }, { v: "end", t: "Right (inline end)" }].forEach(function(opt) {
      var o = el("option", { value: opt.v, textContent: opt.t });
      if (opt.v === (parsed.inline || "")) o.selected = true;
      inlineSelect.appendChild(o);
    });
    inlineSelect.addEventListener("change", function() {
      pushUndo();
      parsed.inline = inlineSelect.value;
      block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
      renderAllBlocks(canvas);
    });
    panel.appendChild(inlineSelect);
  }

  // docs/assets/javascripts/editor/blocks.js
  function autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = Math.max(60, textarea.scrollHeight) + "px";
  }
  function renderBlockDOM(block, canvas) {
    var wrap = el("div", { className: "ze-block", dataset: { blockId: block.id } });
    var editMode = getBlockEditMode(block.markdown);
    var dragHandle = el("div", { className: "ze-drag", draggable: true });
    dragHandle.appendChild(icon("grip"));
    wrap.appendChild(dragHandle);
    dragHandle.addEventListener("dragstart", function(e) {
      editorState.dragBlock = block.id;
      wrap.style.opacity = "0.4";
      e.dataTransfer.effectAllowed = "move";
    });
    dragHandle.addEventListener("dragend", function() {
      editorState.dragBlock = null;
      wrap.style.opacity = "";
      document.querySelectorAll(".ze-block").forEach(function(b) {
        b.classList.remove("drag-over-top", "drag-over-bottom");
      });
    });
    wrap.addEventListener("dragover", function(e) {
      if (!editorState.dragBlock || editorState.dragBlock === block.id) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      var rect = wrap.getBoundingClientRect();
      var mid = rect.top + rect.height / 2;
      wrap.classList.remove("drag-over-top", "drag-over-bottom");
      wrap.classList.add(e.clientY < mid ? "drag-over-top" : "drag-over-bottom");
    });
    wrap.addEventListener("dragleave", function() {
      wrap.classList.remove("drag-over-top", "drag-over-bottom");
    });
    wrap.addEventListener("drop", function(e) {
      e.preventDefault();
      wrap.classList.remove("drag-over-top", "drag-over-bottom");
      if (!editorState.dragBlock) return;
      var fromIdx = editorState.blocks.findIndex(function(b) {
        return b.id === editorState.dragBlock;
      });
      var toIdx = editorState.blocks.findIndex(function(b) {
        return b.id === block.id;
      });
      if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return;
      var rect = wrap.getBoundingClientRect();
      var insertAfter = e.clientY >= rect.top + rect.height / 2;
      pushUndo();
      var moved = editorState.blocks.splice(fromIdx, 1)[0];
      var newIdx = editorState.blocks.findIndex(function(b) {
        return b.id === block.id;
      });
      if (insertAfter) newIdx++;
      editorState.blocks.splice(newIdx, 0, moved);
      renderAllBlocks(canvas);
    });
    if (editMode === "inline") {
      var rendered = el("div", { className: "ze-rendered", contentEditable: "true" });
      renderInlineBlockContent(block, rendered);
      rendered.addEventListener("focus", function() {
        setActiveBlock(block.id, canvas);
      });
      rendered.addEventListener("blur", function() {
        pushUndo();
        var headingLevel = getHeadingLevel(block.markdown);
        if (headingLevel > 0) {
          block.markdown = "#".repeat(headingLevel) + " " + htmlToInlineMarkdown(rendered.innerHTML);
        } else if (/^(\s*)([-*+]|\d+\.)\s/.test(block.markdown.trim())) {
          block.markdown = htmlListToMarkdown(rendered);
        } else {
          block.markdown = htmlToInlineMarkdown(rendered.innerHTML);
        }
      });
      rendered.addEventListener("keydown", function(e) {
        handleInlineBlockKeydown(e, block, canvas);
      });
      wrap.appendChild(rendered);
    } else if (editMode === "textarea") {
      var rendered = el("div", { className: "ze-rendered" });
      renderBlockContent(block, rendered);
      var textarea = el("textarea", {
        className: "ze-edit-textarea",
        spellcheck: false
      });
      textarea.style.display = "none";
      rendered.addEventListener("click", function(e) {
        if (e.target.closest(".ze-props") || e.target.closest(".ze-settings-gear")) return;
        setActiveBlock(block.id, canvas);
        rendered.style.display = "none";
        textarea.style.display = "block";
        textarea.value = block.markdown;
        autoResize(textarea);
        textarea.focus();
      });
      textarea.addEventListener("blur", function() {
        pushUndo();
        block.markdown = textarea.value;
        textarea.style.display = "none";
        rendered.style.display = "";
        renderBlockContent(block, rendered);
      });
      textarea.addEventListener("keydown", function(e) {
        if (e.key === "Tab") {
          e.preventDefault();
          var start = textarea.selectionStart;
          textarea.value = textarea.value.substring(0, start) + "    " + textarea.value.substring(textarea.selectionEnd);
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }
        if (e.key === "Escape") {
          textarea.blur();
        }
      });
      textarea.addEventListener("input", function() {
        autoResize(textarea);
      });
      wrap.appendChild(rendered);
      wrap.appendChild(textarea);
    } else if (editMode === "admonition") {
      var rendered = el("div", { className: "ze-rendered" });
      renderAdmonitionWYSIWYG(block, rendered, canvas);
      wrap.appendChild(rendered);
    } else if (editMode === "table") {
      var rendered = el("div", { className: "ze-rendered ze-table-wrap" });
      renderTableWYSIWYG(block, rendered, canvas);
      wrap.appendChild(rendered);
    } else {
      var rendered = el("div", { className: "ze-rendered" });
      renderBlockContent(block, rendered);
      wrap.appendChild(rendered);
    }
    var gear = el("div", { className: "ze-settings-gear" });
    gear.appendChild(icon("settings"));
    gear.addEventListener("click", function(e) {
      e.stopPropagation();
      setActiveBlock(block.id, canvas);
      toggleBlockProps(block, editMode, wrap, canvas);
    });
    wrap.appendChild(gear);
    wrap.addEventListener("click", function(e) {
      if (e.target.closest(".ze-props") || e.target.closest(".ze-drag") || e.target.closest(".ze-settings-gear")) return;
      setActiveBlock(block.id, canvas);
    });
    return wrap;
  }
  function renderInlineBlockContent(block, container) {
    container.innerHTML = "";
    if (!block.markdown) return;
    var html = pyodideRender(block.markdown);
    if (html) {
      container.innerHTML = html;
      container.querySelectorAll("a.headerlink").forEach(function(a) {
        a.remove();
      });
      if (container.children.length === 1 && container.children[0].tagName === "P") {
        container.innerHTML = container.children[0].innerHTML;
      }
    } else {
      container.textContent = block.markdown;
    }
  }
  function renderBlockContent(block, container) {
    container.innerHTML = "";
    if (!block.markdown) return;
    var html = pyodideRender(block.markdown);
    if (html) {
      container.innerHTML = html;
    } else {
      container.textContent = block.markdown;
    }
  }
  function toggleBlockProps(block, editMode, blockEl, canvas) {
    var gearEl = blockEl.querySelector(".ze-settings-gear");
    var existing = blockEl.querySelector(".ze-props");
    if (existing) {
      existing.remove();
      gearEl.classList.remove("open");
      return;
    }
    var panel = el("div", { className: "ze-props", dataset: { forBlock: block.id } });
    panel.appendChild(el("div", { className: "ze-props-header" }, ["Properties"]));
    var body = el("div", { className: "ze-props-body" });
    if (editMode === "admonition") {
      buildAdmonitionProps(body, block, canvas);
    }
    if (body.children.length > 0) {
      panel.appendChild(body);
    }
    var footer = el("div", { className: "ze-props-footer" });
    footer.appendChild(el("button", {
      className: "ze-btn",
      style: { background: "#f44336", width: "100%", justifyContent: "center" },
      onclick: function() {
        pushUndo();
        editorState.blocks = editorState.blocks.filter(function(b) {
          return b.id !== block.id;
        });
        renderAllBlocks(canvas);
      }
    }, [icon("trash"), " Delete Block"]));
    panel.appendChild(footer);
    panel.addEventListener("click", function(e) {
      e.stopPropagation();
    });
    blockEl.appendChild(panel);
    gearEl.classList.add("open");
  }
  function renderAdmonitionWYSIWYG(block, container, canvas) {
    container.innerHTML = "";
    var html = pyodideRender(block.markdown);
    if (!html) {
      container.textContent = block.markdown;
      return;
    }
    container.innerHTML = html;
    var adm = container.querySelector(".admonition, details");
    if (!adm) return;
    var titleEl = adm.querySelector(".admonition-title, summary");
    var bodyNodes = [];
    var sibling = titleEl ? titleEl.nextSibling : adm.firstChild;
    while (sibling) {
      bodyNodes.push(sibling);
      sibling = sibling.nextSibling;
    }
    var editableBody = el("div", { className: "ze-admonition-body", contentEditable: "true" });
    bodyNodes.forEach(function(node) {
      editableBody.appendChild(node);
    });
    adm.appendChild(editableBody);
    editableBody.addEventListener("focus", function() {
      setActiveBlock(block.id, canvas);
    });
    editableBody.addEventListener("blur", function(e) {
      if (e.relatedTarget && (e.relatedTarget.closest(".ze-props") || e.relatedTarget.closest(".ze-settings-gear"))) return;
      pushUndo();
      var parsed = parseAdmonitionHeader(block.markdown);
      if (!parsed) return;
      var bodyMd = htmlToInlineMarkdown(editableBody.innerHTML);
      var bodyLines = bodyMd.split("\n").map(function(line) {
        return line.trim() === "" ? "" : "    " + line;
      });
      block.markdown = rebuildAdmonitionMarkdown(parsed, bodyLines);
    });
    editableBody.addEventListener("keydown", function(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        document.execCommand("insertParagraph", false, null);
      }
    });
  }
  function renderTableWYSIWYG(block, container, canvas) {
    container.innerHTML = "";
    var html = pyodideRender(block.markdown);
    if (!html) {
      container.textContent = block.markdown;
      return;
    }
    container.innerHTML = html;
    var table = container.querySelector("table");
    if (!table) return;
    table.querySelectorAll("th, td").forEach(function(cell) {
      cell.contentEditable = "true";
      cell.addEventListener("keydown", function(e) {
        if (e.key === "Tab") {
          e.preventDefault();
          var cells = Array.from(table.querySelectorAll("th, td"));
          var idx = cells.indexOf(cell);
          var next = e.shiftKey ? cells[idx - 1] : cells[idx + 1];
          if (next) next.focus();
        }
        if (e.key === "Enter") {
          e.preventDefault();
        }
      });
    });
    container.addEventListener("focusout", function(e) {
      if (container.contains(e.relatedTarget)) return;
      pushUndo();
      block.markdown = htmlTableToMarkdown(table);
    });
    container.addEventListener("focusin", function() {
      setActiveBlock(block.id, canvas);
    });
    var actions = el("div", { className: "ze-table-actions" });
    actions.appendChild(el("button", {
      className: "ze-table-action-btn",
      textContent: "+ Row",
      onclick: function() {
        pushUndo();
        var tbody = table.querySelector("tbody") || table;
        var lastRow = tbody.querySelector("tr:last-child");
        var colCount = lastRow ? lastRow.cells.length : 1;
        var newRow = tbody.insertRow();
        for (var i = 0; i < colCount; i++) {
          var td = newRow.insertCell();
          td.contentEditable = "true";
          td.innerHTML = "&nbsp;";
          td.addEventListener("keydown", function(e) {
            if (e.key === "Tab") {
              e.preventDefault();
              var cells = Array.from(table.querySelectorAll("th, td"));
              var idx = cells.indexOf(e.target);
              var next = e.shiftKey ? cells[idx - 1] : cells[idx + 1];
              if (next) next.focus();
            }
            if (e.key === "Enter") e.preventDefault();
          });
        }
        block.markdown = htmlTableToMarkdown(table);
      }
    }));
    actions.appendChild(el("button", {
      className: "ze-table-action-btn",
      textContent: "+ Column",
      onclick: function() {
        pushUndo();
        table.querySelectorAll("tr").forEach(function(row, rowIdx) {
          var cell = rowIdx === 0 && row.closest("thead") ? document.createElement("th") : document.createElement("td");
          cell.contentEditable = "true";
          cell.innerHTML = "&nbsp;";
          cell.addEventListener("keydown", function(e) {
            if (e.key === "Tab") {
              e.preventDefault();
              var cells = Array.from(table.querySelectorAll("th, td"));
              var idx = cells.indexOf(e.target);
              var next = e.shiftKey ? cells[idx - 1] : cells[idx + 1];
              if (next) next.focus();
            }
            if (e.key === "Enter") e.preventDefault();
          });
          row.appendChild(cell);
        });
        block.markdown = htmlTableToMarkdown(table);
      }
    }));
    container.appendChild(actions);
  }
  function renderAllBlocks(canvas) {
    canvas.innerHTML = "";
    editorState.blocks.forEach(function(block) {
      canvas.appendChild(renderBlockDOM(block, canvas));
    });
    var addBtn = el("div", {
      className: "ze-block",
      style: { opacity: "0.4", cursor: "pointer", textAlign: "center", padding: "16px", fontSize: ".85rem" },
      onclick: function() {
        pushUndo();
        var newBlock = { id: uid(), markdown: "" };
        editorState.blocks.push(newBlock);
        renderAllBlocks(canvas);
        var newEl = canvas.querySelector('[data-block-id="' + newBlock.id + '"] .ze-rendered');
        if (newEl) newEl.focus();
      }
    }, ["+ Click to add a new block"]);
    canvas.appendChild(addBtn);
  }
  function setActiveBlock(blockId, canvas) {
    editorState.activeBlock = blockId;
    canvas.querySelectorAll(".ze-block").forEach(function(b) {
      b.classList.toggle("active", b.dataset.blockId === blockId);
    });
    var existing = canvas.querySelector(".ze-props");
    if (existing && existing.dataset.forBlock !== blockId) {
      var blockWrap = existing.closest(".ze-block");
      if (blockWrap) {
        var gear = blockWrap.querySelector(".ze-settings-gear");
        if (gear) gear.classList.remove("open");
      }
      existing.remove();
    }
  }

  // docs/assets/javascripts/editor/formatting.js
  function getActiveEditable() {
    var active = document.activeElement;
    if (active && active.classList.contains("ze-rendered") && active.contentEditable === "true") {
      return active;
    }
    return null;
  }
  function getActiveTextarea() {
    var active = document.querySelector(".ze-block.active .ze-edit-textarea");
    if (active && active.style.display !== "none") return active;
    return null;
  }
  function applyInlineFormat(mdBefore, mdAfter, execCmd) {
    var editable = getActiveEditable();
    if (editable) {
      if (execCmd) {
        document.execCommand(execCmd, false, null);
      } else {
        var sel = window.getSelection();
        if (!sel.rangeCount) return;
        var text = sel.toString() || "text";
        document.execCommand("insertText", false, mdBefore + text + mdAfter);
      }
      return;
    }
    var textarea = getActiveTextarea();
    if (!textarea) return;
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var val = textarea.value;
    var selected = val.substring(start, end) || "text";
    textarea.value = val.substring(0, start) + mdBefore + selected + mdAfter + val.substring(end);
    textarea.selectionStart = start + mdBefore.length;
    textarea.selectionEnd = start + mdBefore.length + selected.length;
    textarea.focus();
  }
  function wrapWithTag(tag, mdBefore, mdAfter) {
    var editable = getActiveEditable();
    if (editable) {
      var sel = window.getSelection();
      if (!sel.rangeCount) return;
      var text = sel.toString() || "text";
      document.execCommand("insertHTML", false, "<" + tag + ">" + text + "</" + tag + ">");
      return;
    }
    applyInlineFormat(mdBefore, mdAfter, null);
  }
  function insertTextAtCursor(text) {
    var editable = getActiveEditable();
    if (editable) {
      document.execCommand("insertText", false, text);
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
  function insertBlock(markdown, canvas) {
    pushUndo();
    var newBlock = { id: uid(), markdown };
    var idx = -1;
    if (editorState.activeBlock) {
      idx = editorState.blocks.findIndex(function(b) {
        return b.id === editorState.activeBlock;
      });
    }
    if (idx >= 0) {
      editorState.blocks.splice(idx + 1, 0, newBlock);
    } else {
      editorState.blocks.push(newBlock);
    }
    renderAllBlocks(canvas);
    var newWrap = canvas.querySelector('[data-block-id="' + newBlock.id + '"]');
    if (newWrap) {
      var editable = newWrap.querySelector(".ze-rendered[contenteditable=true]");
      if (editable) {
        editable.focus();
      } else {
        var r = newWrap.querySelector(".ze-rendered");
        var t = newWrap.querySelector(".ze-edit-textarea");
        if (r && t) {
          r.style.display = "none";
          t.style.display = "block";
          t.value = newBlock.markdown;
          autoResize(t);
          t.focus();
        }
      }
    }
  }

  // docs/assets/javascripts/editor/dialogs.js
  function showLinkDialog() {
    var sel = window.getSelection();
    var selectedText = sel ? sel.toString() : "";
    var overlay = el("div", { className: "ze-dialog-overlay" });
    var dialog = el("div", { className: "ze-dialog" });
    dialog.appendChild(el("h3", {}, ["Insert Link"]));
    var textInput = el("input", { type: "text", placeholder: "Link text", value: selectedText });
    var urlInput = el("input", { type: "text", placeholder: "URL (https://...)" });
    var btns = el("div", { className: "ze-dialog-btns" }, [
      el("button", { className: "ze-btn", style: { background: "#999" }, textContent: "Cancel", onclick: function() {
        overlay.remove();
      } }),
      el("button", { className: "ze-btn", textContent: "Insert", onclick: function() {
        var md = "[" + (textInput.value || "link") + "](" + urlInput.value + ")";
        insertTextAtCursor(md);
        overlay.remove();
      } })
    ]);
    dialog.appendChild(textInput);
    dialog.appendChild(urlInput);
    dialog.appendChild(btns);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    overlay.addEventListener("click", function(e) {
      if (e.target === overlay) overlay.remove();
    });
    setTimeout(function() {
      urlInput.focus();
    }, 50);
  }
  function showImageDialog() {
    var overlay = el("div", { className: "ze-dialog-overlay" });
    var dialog = el("div", { className: "ze-dialog" });
    dialog.appendChild(el("h3", {}, ["Insert Image"]));
    var altInput = el("input", { type: "text", placeholder: "Alt text" });
    var urlInput = el("input", { type: "text", placeholder: "Image URL" });
    var btns = el("div", { className: "ze-dialog-btns" }, [
      el("button", { className: "ze-btn", style: { background: "#999" }, textContent: "Cancel", onclick: function() {
        overlay.remove();
      } }),
      el("button", { className: "ze-btn", textContent: "Insert", onclick: function() {
        var md = "![" + (altInput.value || "image") + "](" + urlInput.value + ")";
        insertTextAtCursor(md);
        overlay.remove();
      } })
    ]);
    dialog.appendChild(altInput);
    dialog.appendChild(urlInput);
    dialog.appendChild(btns);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    overlay.addEventListener("click", function(e) {
      if (e.target === overlay) overlay.remove();
    });
    setTimeout(function() {
      urlInput.focus();
    }, 50);
  }
  function download(content) {
    var blob = new Blob([content], { type: "text/markdown" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "export.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  // docs/assets/javascripts/editor/toolbar.js
  function buildToolbar(canvas) {
    var toolbar = el("div", { className: "ze-toolbar" });
    var row1 = el("div", { className: "ze-toolbar-row" });
    var row2 = el("div", { className: "ze-toolbar-row" });
    function tbtn(iconName, title, onClick) {
      var btn = el("button", { className: "ze-tbtn", title, onclick: onClick });
      btn.addEventListener("mousedown", function(e) {
        e.preventDefault();
      });
      btn.appendChild(icon(iconName));
      return btn;
    }
    function sep() {
      return el("div", { className: "ze-sep" });
    }
    row1.appendChild(tbtn("undo", "Undo (Ctrl+Z)", function() {
      doUndo(canvas);
    }));
    row1.appendChild(tbtn("redo", "Redo (Ctrl+Y)", function() {
      doRedo(canvas);
    }));
    row1.appendChild(sep());
    row1.appendChild(tbtn("bold", "Bold (Ctrl+B)", function() {
      applyInlineFormat("**", "**", "bold");
    }));
    row1.appendChild(tbtn("italic", "Italic (Ctrl+I)", function() {
      applyInlineFormat("*", "*", "italic");
    }));
    row1.appendChild(tbtn("strikethrough", "Strikethrough", function() {
      applyInlineFormat("~~", "~~", "strikeThrough");
    }));
    row1.appendChild(tbtn("underline", "Underline (Ctrl+U)", function() {
      applyInlineFormat("^^", "^^", "underline");
    }));
    row1.appendChild(tbtn("highlight", "Highlight", function() {
      wrapWithTag("mark", "==", "==");
    }));
    row1.appendChild(tbtn("superscript", "Superscript", function() {
      applyInlineFormat("^", "^", "superscript");
    }));
    row1.appendChild(tbtn("subscript", "Subscript", function() {
      applyInlineFormat("~", "~", "subscript");
    }));
    row1.appendChild(sep());
    var headingDrop = buildDropdown("heading", "Heading", [
      { label: "Heading 1", action: function() {
        insertBlock("# Heading 1", canvas);
      } },
      { label: "Heading 2", action: function() {
        insertBlock("## Heading 2", canvas);
      } },
      { label: "Heading 3", action: function() {
        insertBlock("### Heading 3", canvas);
      } },
      { label: "Heading 4", action: function() {
        insertBlock("#### Heading 4", canvas);
      } },
      { label: "Heading 5", action: function() {
        insertBlock("##### Heading 5", canvas);
      } },
      { label: "Heading 6", action: function() {
        insertBlock("###### Heading 6", canvas);
      } }
    ]);
    row1.appendChild(headingDrop);
    row1.appendChild(sep());
    row1.appendChild(tbtn("ul", "Bullet List", function() {
      insertBlock("- Item 1\n- Item 2\n- Item 3", canvas);
    }));
    row1.appendChild(tbtn("ol", "Numbered List", function() {
      insertBlock("1. Item 1\n2. Item 2\n3. Item 3", canvas);
    }));
    row1.appendChild(tbtn("task", "Task List", function() {
      insertBlock("- [ ] Task 1\n- [ ] Task 2\n- [x] Done task", canvas);
    }));
    row1.appendChild(sep());
    row1.appendChild(tbtn("code", "Inline Code", function() {
      applyInlineFormat("`", "`", null);
    }));
    var codeDrop = buildDropdown("codeBlock", "Code Block", CODE_LANGUAGES.slice(0, 12).map(function(lang) {
      return {
        label: lang,
        action: function() {
          insertBlock("```" + lang + "\n\n```", canvas);
        }
      };
    }));
    row1.appendChild(codeDrop);
    row1.appendChild(sep());
    row1.appendChild(tbtn("link", "Insert Link (Ctrl+K)", function() {
      showLinkDialog();
    }));
    row1.appendChild(tbtn("image", "Insert Image", function() {
      showImageDialog();
    }));
    row1.appendChild(sep());
    row1.appendChild(tbtn("table", "Insert Table", function() {
      insertBlock("| Header 1 | Header 2 | Header 3 |\n| --- | --- | --- |\n| Cell 1 | Cell 2 | Cell 3 |", canvas);
    }));
    var admDrop = buildDropdown("admonition", "Admonition", ADMONITION_TYPES.map(function(t) {
      return {
        label: t,
        action: function() {
          var title = t.charAt(0).toUpperCase() + t.slice(1);
          insertBlock("!!! " + t + ' "' + title + '"\n    Content here.', canvas);
        }
      };
    }));
    row2.appendChild(admDrop);
    row2.appendChild(tbtn("tabs", "Content Tabs", function() {
      insertBlock('=== "Tab 1"\n\n    Content for tab 1.\n\n=== "Tab 2"\n\n    Content for tab 2.', canvas);
    }));
    var mathDrop = buildDropdown("math", "Math", [
      { label: "Inline ($...$)", action: function() {
        applyInlineFormat("$", "$", null);
      } },
      { label: "Block ($$...$$)", action: function() {
        insertBlock("$$\nE = mc^2\n$$", canvas);
      } }
    ]);
    row2.appendChild(mathDrop);
    row2.appendChild(tbtn("mermaid", "Mermaid Diagram", function() {
      insertBlock("```mermaid\ngraph LR\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Success]\n    B -->|No| D[Failure]\n```", canvas);
    }));
    row2.appendChild(tbtn("keyboard", "Keyboard Keys", function() {
      applyInlineFormat("++", "++", null);
    }));
    row2.appendChild(tbtn("hr", "Horizontal Rule", function() {
      insertBlock("---", canvas);
    }));
    row2.appendChild(tbtn("footnote", "Footnote", function() {
      var fnNum = editorState.blocks.filter(function(b) {
        return /^\[\^/.test(b.markdown.trim());
      }).length + 1;
      insertBlock("[^" + fnNum + "]: Footnote text", canvas);
    }));
    var emojiDrop = buildEmojiPicker();
    row2.appendChild(emojiDrop);
    row2.appendChild(el("div", { className: "ze-spacer" }));
    var status = el("span", { className: "ze-status", textContent: "Loading renderer\u2026" });
    row2.appendChild(status);
    var dlBtn = el("button", { className: "ze-btn", disabled: true, onclick: function() {
      download(serializeAll());
    } });
    dlBtn.appendChild(icon("download"));
    dlBtn.appendChild(document.createTextNode(" Download .md"));
    row2.appendChild(dlBtn);
    toolbar.appendChild(row1);
    toolbar.appendChild(row2);
    return { toolbar, status, dlBtn };
  }
  function buildDropdown(iconName, title, items) {
    var wrap = el("div", { className: "ze-dropdown" });
    var btn = el("button", { className: "ze-tbtn", title });
    btn.addEventListener("mousedown", function(e) {
      e.preventDefault();
    });
    btn.appendChild(icon(iconName));
    var chevron = icon("chevronDown");
    chevron.style.width = "10px";
    chevron.style.height = "10px";
    chevron.style.marginLeft = "-2px";
    btn.appendChild(chevron);
    var menu = el("div", { className: "ze-dropdown-menu" });
    items.forEach(function(item) {
      var menuItem = el("button", {
        className: "ze-dropdown-item",
        textContent: item.label,
        onclick: function(e) {
          e.stopPropagation();
          menu.classList.remove("open");
          item.action();
        }
      });
      menuItem.addEventListener("mousedown", function(e) {
        e.preventDefault();
      });
      menu.appendChild(menuItem);
    });
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      document.querySelectorAll(".ze-dropdown-menu.open").forEach(function(m) {
        if (m !== menu) m.classList.remove("open");
      });
      menu.classList.toggle("open");
    });
    wrap.appendChild(btn);
    wrap.appendChild(menu);
    return wrap;
  }
  function buildEmojiPicker() {
    var emojis = [
      "\u{1F600}",
      "\u{1F603}",
      "\u{1F604}",
      "\u{1F601}",
      "\u{1F606}",
      "\u{1F605}",
      "\u{1F602}",
      "\u{1F923}",
      "\u{1F60A}",
      "\u{1F607}",
      "\u{1F642}",
      "\u{1F643}",
      "\u{1F609}",
      "\u{1F60C}",
      "\u{1F60D}",
      "\u{1F618}",
      "\u{1F44D}",
      "\u{1F44E}",
      "\u{1F44F}",
      "\u{1F64C}",
      "\u{1F4AA}",
      "\u2764",
      "\u{1F525}",
      "\u2B50",
      "\u2705",
      "\u274C",
      "\u26A0",
      "\u{1F4A1}",
      "\u{1F389}",
      "\u{1F680}",
      "\u{1F41B}",
      "\u{1F510}",
      "\u2728",
      "\u{1F4DD}",
      "\u{1F4E6}",
      "\u{1F527}",
      "\u{1F6E0}",
      "\u{1F4CA}",
      "\u{1F4C8}",
      "\u{1F3AF}"
    ];
    var wrap = el("div", { className: "ze-dropdown" });
    var btn = el("button", { className: "ze-tbtn", title: "Emoji" });
    btn.addEventListener("mousedown", function(e) {
      e.preventDefault();
    });
    btn.appendChild(icon("emoji"));
    var menu = el("div", { className: "ze-dropdown-menu", style: { minWidth: "240px" } });
    var grid = el("div", { className: "ze-emoji-grid" });
    emojis.forEach(function(em) {
      var emojiBtn = el("button", {
        className: "ze-emoji-btn",
        textContent: em,
        onclick: function(e) {
          e.stopPropagation();
          insertTextAtCursor(em);
          menu.classList.remove("open");
        }
      });
      emojiBtn.addEventListener("mousedown", function(e) {
        e.preventDefault();
      });
      grid.appendChild(emojiBtn);
    });
    menu.appendChild(grid);
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      document.querySelectorAll(".ze-dropdown-menu.open").forEach(function(m) {
        if (m !== menu) m.classList.remove("open");
      });
      menu.classList.toggle("open");
    });
    wrap.appendChild(btn);
    wrap.appendChild(menu);
    return wrap;
  }

  // docs/assets/javascripts/editor/shortcuts.js
  function setupKeyboardShortcuts(canvas) {
    document.addEventListener("keydown", function(e) {
      if (!document.getElementById("zensical-editor")) return;
      var mod = e.ctrlKey || e.metaKey;
      if (mod && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        doUndo(canvas);
      }
      if (mod && (e.key === "y" || e.key === "z" && e.shiftKey)) {
        e.preventDefault();
        doRedo(canvas);
      }
      if (mod && e.key === "b") {
        e.preventDefault();
        applyInlineFormat("**", "**", "bold");
      }
      if (mod && e.key === "i") {
        e.preventDefault();
        applyInlineFormat("*", "*", "italic");
      }
      if (mod && e.key === "u") {
        e.preventDefault();
        applyInlineFormat("^^", "^^", "underline");
      }
      if (mod && e.key === "k") {
        e.preventDefault();
        showLinkDialog();
      }
    });
    canvas.addEventListener("paste", function(e) {
      var text = (e.clipboardData || window.clipboardData).getData("text/plain");
      if (!text) return;
      var target = e.target;
      var isInline = target.contentEditable === "true" && target.classList.contains("ze-rendered");
      var hasBlocks = /\n\s*\n/.test(text) || /^(#{1,6}\s|```|~~~|\$\$|!{3}\s|\?{3}|===\s+"|---|\*{3}|_{3}|\|.*\|)/.test(text.trim());
      if (isInline && !hasBlocks) return;
      e.preventDefault();
      pushUndo();
      var newBlocks = parseMarkdown(text);
      if (newBlocks.length === 0) return;
      var insertIdx = editorState.blocks.length;
      if (editorState.activeBlock) {
        var activeIdx = editorState.blocks.findIndex(function(b) {
          return b.id === editorState.activeBlock;
        });
        if (activeIdx >= 0) insertIdx = activeIdx + 1;
      }
      for (var i = 0; i < newBlocks.length; i++) {
        editorState.blocks.splice(insertIdx + i, 0, newBlocks[i]);
      }
      renderAllBlocks(canvas);
      var lastBlock = newBlocks[newBlocks.length - 1];
      var lastEl = canvas.querySelector('[data-block-id="' + lastBlock.id + '"] .ze-rendered');
      if (lastEl) lastEl.focus();
    });
  }
  function setupDropdownClose() {
    document.addEventListener("click", function() {
      document.querySelectorAll(".ze-dropdown-menu.open").forEach(function(m) {
        m.classList.remove("open");
      });
    });
  }

  // docs/assets/javascripts/editor/index.js
  function buildUI(root) {
    var style = document.createElement("style");
    style.textContent = STYLES;
    document.head.appendChild(style);
    var canvas = el("div", { className: "ze-canvas" });
    var toolbarResult = buildToolbar(canvas);
    root.appendChild(toolbarResult.toolbar);
    root.appendChild(canvas);
    setupKeyboardShortcuts(canvas);
    setupDropdownClose();
    return { canvas, status: toolbarResult.status, dlBtn: toolbarResult.dlBtn };
  }
  function bootstrap() {
    var root = document.getElementById("zensical-editor");
    if (!root) return;
    var ui = buildUI(root);
    var script = document.createElement("script");
    script.src = PYODIDE_CDN;
    script.onload = function() {
      initRenderer(ui);
    };
    script.onerror = function() {
      ui.status.textContent = "Failed to load renderer";
      ui.status.className = "ze-status error";
      editorState.blocks = parseMarkdown(DEFAULT_CONTENT);
      renderAllBlocks(ui.canvas);
    };
    document.head.appendChild(script);
  }
  document.addEventListener("DOMContentLoaded", bootstrap);
  document.addEventListener("DOMContentSwitch", function() {
    var root = document.getElementById("zensical-editor");
    if (root && root.children.length === 0) bootstrap();
  });
})();
