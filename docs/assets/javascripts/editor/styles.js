export var STYLES = [
'#zensical-editor { display:flex; flex-direction:column; min-height:calc(100vh - 60px); font-family:inherit; }',

/* ── Animation keyframes ── */
'@keyframes ze-fade-in { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }',
'@keyframes ze-props-in { from { opacity:0; } to { opacity:1; } }',

/* ── Toolbar ── */
'.ze-toolbar { display:flex; flex-direction:column; border-bottom:1px solid var(--md-default-fg-color--lightest,#e0e0e0); flex-shrink:0; background:var(--md-default-bg-color,#fff); backdrop-filter:blur(8px); position:sticky; top:var(--ze-header-height,0px); z-index:100; }',
'.ze-toolbar-row { display:flex; align-items:center; padding:6px 12px; gap:6px; flex-wrap:wrap; }',
'.ze-spacer { flex:1; }',

/* ── Button clusters ── */
'.ze-cluster { display:inline-flex; align-items:center; gap:2px; padding:2px; background:var(--md-default-fg-color--lightest,rgba(0,0,0,.04)); border-radius:8px; flex-shrink:0; }',

/* ── Toolbar buttons ── */
'.ze-tbtn { display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border:none; border-radius:6px; cursor:pointer; background:transparent; color:var(--md-default-fg-color,#333); transition:background .15s,color .15s,box-shadow .15s; position:relative; }',
'.ze-tbtn:hover { background:var(--md-default-fg-color--lightest,rgba(0,0,0,.08)); }',
'.ze-tbtn.active { background:var(--md-primary-fg-color,#1976d2); color:var(--md-primary-bg-color,#fff); }',
'.ze-tbtn:disabled { opacity:.3; cursor:default; pointer-events:none; }',
'.ze-tbtn svg { width:16px; height:16px; pointer-events:none; }',
'.ze-tbtn-insert { width:auto; padding:0 10px; gap:4px; font-size:.72rem; font-weight:600; }',

/* ── Dropdown ── */
'.ze-dropdown { position:relative; display:inline-flex; }',
'.ze-dropdown-menu { position:absolute; top:100%; left:0; min-width:160px; background:var(--md-default-bg-color,#fff); border:1px solid var(--md-default-fg-color--lightest,#ddd); border-radius:10px; box-shadow:0 4px 6px -1px rgba(0,0,0,.07),0 12px 24px -4px rgba(0,0,0,.1); z-index:300; padding:4px; display:none; backdrop-filter:blur(12px); max-height:320px; overflow-y:auto; }',
'.ze-dropdown-menu.open { display:block; animation:ze-fade-in .12s ease-out; }',
'.ze-dropdown-item { display:flex; align-items:center; gap:8px; padding:7px 12px; border-radius:6px; cursor:pointer; font-size:.8rem; color:var(--md-default-fg-color,#333); border:none; background:none; width:100%; text-align:left; transition:background .1s; }',
'.ze-dropdown-item:hover { background:var(--md-default-fg-color--lightest,#eee); }',
'.ze-dropdown-item.active { background:var(--md-primary-fg-color,#1976d2); color:#fff; }',

/* ── Mega-dropdown (Insert menu) ── */
'.ze-mega-menu { min-width:300px; max-height:420px; padding:6px; right:0; left:auto; }',
'.ze-mega-section { padding:4px 0; }',
'.ze-mega-section + .ze-mega-section { border-top:1px solid var(--md-default-fg-color--lightest,#eee); margin-top:2px; padding-top:6px; }',
'.ze-mega-label { font-size:.62rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--md-default-fg-color--light,#888); padding:4px 10px 2px; user-select:none; }',

/* ── Status ── */
'.ze-status { font-size:.7rem; padding:3px 10px; border-radius:12px; background:var(--md-default-fg-color--lightest,#e0e0e0); opacity:.7; white-space:nowrap; font-weight:500; letter-spacing:.01em; flex-shrink:0; }',
'.ze-status.ready { background:#c8e6c9; color:#2e7d32; opacity:1; border:1px solid rgba(46,125,50,.12); }',
'.ze-status.error { background:#ffcdd2; color:#c62828; opacity:1; border:1px solid rgba(198,40,40,.12); }',

/* ── Primary button (download, etc.) ── */
'.ze-btn { display:inline-flex; align-items:center; gap:4px; padding:5px 14px; border-radius:8px; border:none; cursor:pointer; font-size:.78rem; font-weight:600; background:var(--md-primary-fg-color,#1976d2); color:var(--md-primary-bg-color,#fff); transition:opacity .15s,box-shadow .15s; flex-shrink:0; }',
'.ze-btn:hover { opacity:.9; box-shadow:0 2px 8px rgba(0,0,0,.1); }',
'.ze-btn:disabled { opacity:.35; cursor:default; pointer-events:none; }',
'.ze-btn svg { width:14px; height:14px; }',

/* ── Ghost button (cancel, secondary) ── */
'.ze-btn-ghost { background:transparent !important; color:var(--md-default-fg-color,#333) !important; border:1px solid var(--md-default-fg-color--lightest,#ddd); }',
'.ze-btn-ghost:hover { background:var(--md-default-fg-color--lightest,rgba(0,0,0,.06)) !important; opacity:1; }',

/* ── Canvas (editing area) ── */
'.ze-canvas { padding:32px 48px 120px; max-width:960px; margin:0 auto; width:100%; box-sizing:border-box; }',

/* ── Block wrapper — Subtle & Airy ── */
'.ze-block { position:relative; margin:2px 0; border-radius:8px; border:1px solid transparent; transition:border-color .2s,box-shadow .25s; min-height:1.6em; }',
'.ze-block:hover { border-color:var(--md-default-fg-color--lightest,rgba(128,128,128,.15)); }',
'.ze-block.active { border-color:transparent; box-shadow:0 0 0 2px rgba(41,182,246,.5),0 0 20px -4px rgba(41,182,246,.25); }',
'.ze-block.drag-over-top { box-shadow:inset 0 2px 0 0 var(--md-primary-fg-color,#1976d2); }',
'.ze-block.drag-over-bottom { box-shadow:inset 0 -2px 0 0 var(--md-primary-fg-color,#1976d2); }',

/* ── Drag handle ── */
'.ze-drag { position:absolute; left:-30px; top:6px; width:22px; height:22px; cursor:grab; opacity:0; transition:opacity .2s; display:flex; align-items:center; justify-content:center; border-radius:6px; color:var(--md-default-fg-color--light,#999); }',
'.ze-block:hover .ze-drag { opacity:.6; }',
'.ze-drag:hover { opacity:1 !important; background:var(--md-default-fg-color--lightest,rgba(0,0,0,.06)); color:var(--md-default-fg-color,#333); }',
'.ze-drag svg { width:14px; height:14px; }',

/* ── Rendered content (Pyodide output, inherits Zensical CSS) ── */
'.ze-rendered { padding:6px 10px; min-height:1.4em; word-break:break-word; line-height:1.7; }',
'.ze-rendered:empty::before { content:"Click to edit\\2026"; color:var(--md-default-fg-color--lightest,#bbb); pointer-events:none; font-style:italic; }',
'.ze-rendered[contenteditable=true] { outline:none; cursor:text; }',
'.ze-rendered[contenteditable=true]:focus { background:rgba(128,128,128,.03); border-radius:6px; }',

/* ── Edit textarea (raw markdown for complex blocks) ── */
'.ze-edit-textarea { width:100%; min-height:60px; border:1px solid var(--md-default-fg-color--lightest,#e0e0e0); padding:10px 12px; font-family:"JetBrains Mono","Fira Code",monospace; font-size:.85rem; line-height:1.6; background:var(--md-code-bg-color,#f5f5f5); color:var(--md-default-fg-color,#333); outline:none; resize:none; box-sizing:border-box; tab-size:4; border-radius:8px; display:block; transition:border-color .15s,box-shadow .15s; }',
'.ze-edit-textarea:focus { border-color:var(--md-primary-fg-color,#1976d2); box-shadow:0 0 0 3px rgba(41,182,246,.08); }',

/* ── Settings gear (block properties) ── */
'.ze-settings-gear { position:absolute; right:-30px; top:6px; width:22px; height:22px; cursor:pointer; opacity:0; transition:opacity .2s; display:flex; align-items:center; justify-content:center; border-radius:6px; color:var(--md-default-fg-color--light,#999); z-index:10; }',
'.ze-block:hover .ze-settings-gear { opacity:.6; }',
'.ze-settings-gear:hover { opacity:1 !important; background:var(--md-default-fg-color--lightest,rgba(0,0,0,.06)); color:var(--md-default-fg-color,#333); }',
'.ze-settings-gear.open { opacity:0 !important; pointer-events:none; }',
'.ze-settings-gear svg { width:14px; height:14px; }',

/* ── Properties popover ── */
'.ze-props { position:absolute; top:0; right:-8px; transform:translateX(100%); width:260px; background:var(--md-default-bg-color,#fff); border:1px solid var(--md-default-fg-color--lightest,#e0e0e0); border-radius:10px; box-shadow:0 4px 6px -1px rgba(0,0,0,.05),0 12px 28px -4px rgba(0,0,0,.1); z-index:150; overflow:hidden; animation:ze-props-in .15s ease-out; }',
'.ze-props-header { display:flex; align-items:center; justify-content:space-between; padding:8px 12px; font-size:.7rem; font-weight:700; text-transform:uppercase; letter-spacing:.04em; color:var(--md-default-fg-color--light,#888); border-bottom:1px solid var(--md-default-fg-color--lightest,#eee); }',
'.ze-props-header .ze-tbtn { width:22px; height:22px; }',
'.ze-props-header .ze-tbtn svg { width:12px; height:12px; }',
'.ze-props-body { padding:8px 12px; }',
'.ze-props-body label { display:block; font-size:.75rem; font-weight:500; margin:8px 0 3px; color:var(--md-default-fg-color--light,#666); }',
'.ze-props-body label:first-child { margin-top:0; }',
'.ze-props-body select,.ze-props-body input[type=text] { width:100%; padding:6px 8px; border:1px solid var(--md-default-fg-color--lightest,#e0e0e0); border-radius:6px; font-size:.8rem; background:var(--md-default-bg-color,#fff); color:var(--md-default-fg-color,#333); outline:none; box-sizing:border-box; transition:border-color .15s,box-shadow .15s; }',
'.ze-props-body select:focus,.ze-props-body input:focus { border-color:var(--md-primary-fg-color,#1976d2); box-shadow:0 0 0 3px rgba(41,182,246,.08); }',
'.ze-props-row { display:flex; align-items:center; justify-content:space-between; margin:8px 0; }',
'.ze-props-row label { margin:0 !important; }',
'.ze-props-footer { padding:8px 12px; border-top:1px solid var(--md-default-fg-color--lightest,#eee); }',
'.ze-toggle { position:relative; width:36px; height:20px; background:var(--md-default-fg-color--lightest,#ccc); border-radius:10px; cursor:pointer; transition:background .2s; flex-shrink:0; }',
'.ze-toggle.on { background:var(--md-primary-fg-color,#1976d2); }',
'.ze-toggle::after { content:""; position:absolute; top:2px; left:2px; width:16px; height:16px; background:#fff; border-radius:50%; transition:transform .2s; box-shadow:0 1px 3px rgba(0,0,0,.15); }',
'.ze-toggle.on::after { transform:translateX(16px); }',

/* ── Emoji picker ── */
'.ze-emoji-grid { display:grid; grid-template-columns:repeat(8,1fr); gap:2px; padding:4px; max-height:200px; overflow-y:auto; }',
'.ze-emoji-btn { padding:4px; border:none; background:none; cursor:pointer; font-size:1.2rem; border-radius:6px; transition:background .1s; }',
'.ze-emoji-btn:hover { background:var(--md-default-fg-color--lightest,#eee); }',

/* ── Link / Image dialog ── */
'.ze-dialog-overlay { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,.35); z-index:300; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(3px); animation:ze-fade-in .15s ease-out; }',
'.ze-dialog { background:var(--md-default-bg-color,#fff); border-radius:14px; padding:24px; min-width:360px; max-width:440px; box-shadow:0 16px 48px rgba(0,0,0,.18),0 4px 12px rgba(0,0,0,.06); }',
'.ze-dialog h3 { margin:0 0 16px; font-size:1rem; font-weight:600; }',
'.ze-dialog-label { display:block; font-size:.72rem; font-weight:600; color:var(--md-default-fg-color--light,#666); margin-bottom:4px; margin-top:12px; }',
'.ze-dialog-label:first-of-type { margin-top:0; }',
'.ze-dialog input { width:100%; padding:10px 12px; border:1px solid var(--md-default-fg-color--lightest,#ddd); border-radius:8px; font-size:.85rem; margin-bottom:0; outline:none; box-sizing:border-box; background:var(--md-default-bg-color,#fff); color:var(--md-default-fg-color,#333); transition:border-color .15s,box-shadow .15s; }',
'.ze-dialog input:focus { border-color:var(--md-primary-fg-color,#1976d2); box-shadow:0 0 0 3px rgba(41,182,246,.08); }',
'.ze-dialog-btns { display:flex; gap:10px; justify-content:flex-end; margin-top:20px; }',

/* ── Tooltip ── */
'.ze-tbtn[title] { position:relative; }',

/* ── WYSIWYG Admonition body ── */
'.ze-admonition-body { outline:none; cursor:text; min-height:1.4em; }',
'.ze-admonition-body:focus { background:rgba(128,128,128,.03); border-radius:6px; }',
'.ze-admonition-body:empty::before { content:"Type admonition content\\2026"; color:var(--md-default-fg-color--lightest,#bbb); pointer-events:none; font-style:italic; }',

/* ── WYSIWYG Table cells ── */
'.ze-table-wrap th[contenteditable],.ze-table-wrap td[contenteditable] { outline:none; cursor:text; min-width:40px; }',
'.ze-table-wrap th[contenteditable]:focus,.ze-table-wrap td[contenteditable]:focus { background:rgba(128,128,128,.06); box-shadow:inset 0 0 0 1px var(--md-primary-fg-color,#1976d2); }',
'.ze-table-actions { display:flex; gap:4px; margin-top:6px; opacity:0; transition:opacity .15s; }',
'.ze-block:hover .ze-table-actions { opacity:1; }',
'.ze-table-action-btn { font-size:.72rem; padding:3px 10px; border:1px solid var(--md-default-fg-color--lightest,#ddd); border-radius:6px; background:var(--md-default-bg-color,#fff); cursor:pointer; color:var(--md-default-fg-color--light,#666); transition:background .1s,border-color .1s; }',
'.ze-table-action-btn:hover { background:var(--md-default-fg-color--lightest,#eee); border-color:var(--md-default-fg-color--light,#ccc); }',

/* ── Add block button ── */
'.ze-add-block { margin:8px 0; padding:14px; border:1.5px dashed var(--md-default-fg-color--lightest,rgba(0,0,0,.1)); border-radius:10px; text-align:center; font-size:.8rem; color:var(--md-default-fg-color--light,#999); cursor:pointer; transition:border-color .15s,color .15s,background .15s; opacity:0; display:flex; align-items:center; justify-content:center; gap:6px; }',
'.ze-canvas:hover .ze-add-block { opacity:1; }',
'.ze-add-block:hover { border-color:var(--md-primary-fg-color,#1976d2); color:var(--md-primary-fg-color,#1976d2); background:rgba(41,182,246,.03); }',
'.ze-add-block svg { width:14px; height:14px; }',

/* ── Responsive ── */
'@media (max-width:768px) { .ze-canvas { padding:16px 16px 80px; } .ze-cluster { gap:1px; padding:1px; } .ze-tbtn { width:28px; height:28px; } .ze-tbtn-insert { padding:0 6px; } }',
].join('\n');
