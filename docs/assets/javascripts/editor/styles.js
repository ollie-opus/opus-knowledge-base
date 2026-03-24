export var STYLES = [
'#zensical-editor { display:flex; flex-direction:column; min-height:calc(100vh - 60px); font-family:inherit; }',

/* ── Toolbar ── */
'.ze-toolbar { display:flex; flex-direction:column; border-bottom:1px solid var(--md-default-fg-color--lightest,#e0e0e0); flex-shrink:0; background:var(--md-default-bg-color,#fff); backdrop-filter:blur(8px); position:sticky; top:0; z-index:100; }',
'.ze-toolbar-row { display:flex; align-items:center; padding:4px 10px; gap:4px; flex-wrap:wrap; }',
'.ze-toolbar-row:first-child { border-bottom:1px solid var(--md-default-fg-color--lightest,#e0e0e0); }',
'.ze-sep { width:1px; height:20px; background:var(--md-default-fg-color--lightest,#ddd); margin:0 4px; flex-shrink:0; }',
'.ze-spacer { flex:1; }',

/* ── Toolbar buttons ── */
'.ze-tbtn { display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border:none; border-radius:6px; cursor:pointer; background:transparent; color:var(--md-default-fg-color,#333); transition:all .15s; position:relative; }',
'.ze-tbtn:hover { background:var(--md-default-fg-color--lightest,#eee); }',
'.ze-tbtn.active { background:var(--md-primary-fg-color,#1976d2); color:var(--md-primary-bg-color,#fff); }',
'.ze-tbtn:disabled { opacity:.3; cursor:default; }',
'.ze-tbtn svg { width:16px; height:16px; pointer-events:none; }',
'.ze-tbtn-label { font-size:.75rem; font-weight:600; min-width:30px; width:auto; padding:0 6px; }',

/* ── Dropdown ── */
'.ze-dropdown { position:relative; display:inline-flex; }',
'.ze-dropdown-menu { position:absolute; top:100%; left:0; min-width:160px; background:var(--md-default-bg-color,#fff); border:1px solid var(--md-default-fg-color--lightest,#ddd); border-radius:8px; box-shadow:0 8px 24px rgba(0,0,0,.12); z-index:200; padding:4px; display:none; backdrop-filter:blur(12px); max-height:320px; overflow-y:auto; }',
'.ze-dropdown-menu.open { display:block; }',
'.ze-dropdown-item { display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius:6px; cursor:pointer; font-size:.82rem; color:var(--md-default-fg-color,#333); border:none; background:none; width:100%; text-align:left; }',
'.ze-dropdown-item:hover { background:var(--md-default-fg-color--lightest,#eee); }',
'.ze-dropdown-item.active { background:var(--md-primary-fg-color,#1976d2); color:#fff; }',

/* ── Status ── */
'.ze-status { font-size:.72rem; padding:2px 8px; border-radius:10px; background:var(--md-default-fg-color--lightest,#e0e0e0); opacity:.7; white-space:nowrap; }',
'.ze-status.ready { background:#c8e6c9; color:#2e7d32; opacity:1; }',
'.ze-status.error { background:#ffcdd2; color:#c62828; opacity:1; }',

/* ── Download button ── */
'.ze-btn { display:inline-flex; align-items:center; gap:4px; padding:4px 12px; border-radius:6px; border:none; cursor:pointer; font-size:.78rem; font-weight:500; background:var(--md-primary-fg-color,#1976d2); color:var(--md-primary-bg-color,#fff); transition:opacity .15s; }',
'.ze-btn:hover { opacity:.85; }',
'.ze-btn:disabled { opacity:.35; cursor:default; }',
'.ze-btn svg { width:14px; height:14px; }',

/* ── Canvas (editing area) ── */
'.ze-canvas { padding:24px 48px 120px; max-width:900px; margin:0 auto; width:100%; box-sizing:border-box; }',

/* ── Block wrapper ── */
'.ze-block { position:relative; margin:2px 0; border-radius:6px; transition:box-shadow .15s; min-height:1.6em; }',
'.ze-block:hover { box-shadow:0 0 0 1px rgba(128,128,128,.25); }',
'.ze-block.active { box-shadow:0 0 0 2px var(--md-primary-fg-color,#1976d2); }',
'.ze-block.drag-over-top { box-shadow:0 -2px 0 0 var(--md-primary-fg-color,#1976d2); }',
'.ze-block.drag-over-bottom { box-shadow:0 2px 0 0 var(--md-primary-fg-color,#1976d2); }',

/* ── Drag handle ── */
'.ze-drag { position:absolute; left:-28px; top:4px; width:20px; height:20px; cursor:grab; opacity:0; transition:opacity .15s; display:flex; align-items:center; justify-content:center; border-radius:4px; color:var(--md-default-fg-color,#999); }',
'.ze-block:hover .ze-drag { opacity:.5; }',
'.ze-drag:hover { opacity:1 !important; background:var(--md-default-fg-color--lightest,#eee); }',
'.ze-drag svg { width:14px; height:14px; }',

/* ── Rendered content (Pyodide output, inherits Zensical CSS) ── */
'.ze-rendered { padding:4px 8px; min-height:1.4em; word-break:break-word; line-height:1.7; }',
'.ze-rendered:empty::before { content:"Click to edit\\2026"; color:var(--md-default-fg-color--lightest,#aaa); pointer-events:none; }',
'.ze-rendered[contenteditable=true] { outline:none; cursor:text; }',
'.ze-rendered[contenteditable=true]:focus { background:rgba(128,128,128,.04); border-radius:4px; }',

/* ── Edit textarea (raw markdown for complex blocks) ── */
'.ze-edit-textarea { width:100%; min-height:60px; border:none; padding:10px; font-family:"JetBrains Mono","Fira Code",monospace; font-size:.85rem; line-height:1.6; background:var(--md-code-bg-color,#f5f5f5); color:var(--md-default-fg-color,#333); outline:none; resize:none; box-sizing:border-box; tab-size:4; border-radius:6px; display:block; }',

/* ── Settings gear (block properties) ── */
'.ze-settings-gear { position:absolute; right:-28px; top:4px; width:20px; height:20px; cursor:pointer; opacity:0; transition:opacity .15s; display:flex; align-items:center; justify-content:center; border-radius:4px; color:var(--md-default-fg-color,#999); z-index:10; }',
'.ze-block:hover .ze-settings-gear { opacity:.5; }',
'.ze-settings-gear:hover { opacity:1 !important; background:var(--md-default-fg-color--lightest,#eee); }',
'.ze-settings-gear.open { opacity:1 !important; z-index:160; }',
'.ze-settings-gear svg { width:14px; height:14px; }',

/* ── Properties popover (Notion-style) ── */
'.ze-props { position:absolute; top:0; right:-8px; transform:translateX(100%); width:240px; background:var(--md-default-bg-color,#fff); border:1px solid var(--md-default-fg-color--lightest,#e0e0e0); border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,.08),0 1px 3px rgba(0,0,0,.06); z-index:150; overflow:hidden; }',
'.ze-props-header { padding:8px 12px 8px 28px; font-size:.75rem; font-weight:600; color:var(--md-default-fg-color--light,#888); border-bottom:1px solid var(--md-default-fg-color--lightest,#eee); }',
'.ze-props-body { padding:8px 12px; }',
'.ze-props-body label { display:block; font-size:.75rem; font-weight:500; margin:8px 0 3px; color:var(--md-default-fg-color--light,#666); }',
'.ze-props-body label:first-child { margin-top:0; }',
'.ze-props-body select,.ze-props-body input[type=text] { width:100%; padding:5px 8px; border:1px solid var(--md-default-fg-color--lightest,#e0e0e0); border-radius:6px; font-size:.8rem; background:var(--md-default-bg-color,#fff); color:var(--md-default-fg-color,#333); outline:none; box-sizing:border-box; transition:border-color .15s; }',
'.ze-props-body select:focus,.ze-props-body input:focus { border-color:var(--md-primary-fg-color,#1976d2); }',
'.ze-props-row { display:flex; align-items:center; justify-content:space-between; margin:8px 0; }',
'.ze-props-row label { margin:0 !important; }',
'.ze-props-footer { padding:8px 12px; border-top:1px solid var(--md-default-fg-color--lightest,#eee); }',
'.ze-toggle { position:relative; width:36px; height:20px; background:var(--md-default-fg-color--lightest,#ccc); border-radius:10px; cursor:pointer; transition:background .2s; flex-shrink:0; }',
'.ze-toggle.on { background:var(--md-primary-fg-color,#1976d2); }',
'.ze-toggle::after { content:""; position:absolute; top:2px; left:2px; width:16px; height:16px; background:#fff; border-radius:50%; transition:transform .2s; }',
'.ze-toggle.on::after { transform:translateX(16px); }',

/* ── Emoji picker ── */
'.ze-emoji-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:2px; padding:4px; max-height:200px; overflow-y:auto; }',
'.ze-emoji-btn { padding:4px; border:none; background:none; cursor:pointer; font-size:1.2rem; border-radius:4px; }',
'.ze-emoji-btn:hover { background:var(--md-default-fg-color--lightest,#eee); }',

/* ── Link / Image dialog ── */
'.ze-dialog-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,.3); z-index:300; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(2px); }',
'.ze-dialog { background:var(--md-default-bg-color,#fff); border-radius:12px; padding:20px; min-width:360px; max-width:480px; box-shadow:0 12px 40px rgba(0,0,0,.15); }',
'.ze-dialog h3 { margin:0 0 12px; font-size:.95rem; }',
'.ze-dialog input { width:100%; padding:8px 10px; border:1px solid var(--md-default-fg-color--lightest,#ddd); border-radius:6px; font-size:.85rem; margin-bottom:8px; outline:none; box-sizing:border-box; background:var(--md-default-bg-color,#fff); color:var(--md-default-fg-color,#333); }',
'.ze-dialog input:focus { border-color:var(--md-primary-fg-color,#1976d2); }',
'.ze-dialog-btns { display:flex; gap:8px; justify-content:flex-end; margin-top:12px; }',

/* ── Tooltip ── */
'.ze-tbtn[title] { position:relative; }',

/* ── WYSIWYG Admonition body ── */
'.ze-admonition-body { outline:none; cursor:text; min-height:1.4em; }',
'.ze-admonition-body:focus { background:rgba(128,128,128,.04); border-radius:4px; }',
'.ze-admonition-body:empty::before { content:"Type admonition content\\2026"; color:var(--md-default-fg-color--lightest,#aaa); pointer-events:none; }',

/* ── WYSIWYG Table cells ── */
'.ze-table-wrap th[contenteditable],.ze-table-wrap td[contenteditable] { outline:none; cursor:text; min-width:40px; }',
'.ze-table-wrap th[contenteditable]:focus,.ze-table-wrap td[contenteditable]:focus { background:rgba(128,128,128,.08); box-shadow:inset 0 0 0 1px var(--md-primary-fg-color,#1976d2); }',
'.ze-table-actions { display:flex; gap:4px; margin-top:4px; opacity:0; transition:opacity .15s; }',
'.ze-block:hover .ze-table-actions { opacity:1; }',
'.ze-table-action-btn { font-size:.72rem; padding:2px 8px; border:1px solid var(--md-default-fg-color--lightest,#ddd); border-radius:4px; background:var(--md-default-bg-color,#fff); cursor:pointer; color:var(--md-default-fg-color,#666); }',
'.ze-table-action-btn:hover { background:var(--md-default-fg-color--lightest,#eee); }',
].join('\n');
