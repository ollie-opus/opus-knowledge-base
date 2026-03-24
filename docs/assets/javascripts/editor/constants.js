export var PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js';

export var PYTHON_SETUP = [
  'import micropip',
  'await micropip.install(["markdown", "pymdown-extensions"])',
  'import markdown',
  '',
  'EXTENSIONS = [',
  '    "tables", "toc", "abbr", "admonition", "attr_list",',
  '    "def_list", "footnotes", "md_in_html",',
  '    "pymdownx.betterem", "pymdownx.caret", "pymdownx.details",',
  '    "pymdownx.highlight", "pymdownx.inlinehilite", "pymdownx.keys",',
  '    "pymdownx.mark", "pymdownx.smartsymbols", "pymdownx.superfences",',
  '    "pymdownx.tabbed", "pymdownx.tasklist", "pymdownx.tilde",',
  ']',
  'EXT_CONFIGS = {',
  '    "pymdownx.highlight": {"anchor_linenums": True},',
  '    "pymdownx.tabbed": {"alternate_style": True},',
  '    "pymdownx.tasklist": {"custom_checkbox": True},',
  '}',
  '',
  'def render(src):',
  '    md = markdown.Markdown(extensions=EXTENSIONS, extension_configs=EXT_CONFIGS)',
  '    return md.convert(src)',
].join('\n');

export var ADMONITION_TYPES = [
  'note', 'abstract', 'info', 'tip', 'success', 'question',
  'warning', 'failure', 'danger', 'bug', 'example', 'quote',
  'new-addition', 'improvement', 'feature-release',
];

export var CODE_LANGUAGES = [
  'python', 'javascript', 'typescript', 'bash', 'shell', 'html', 'css',
  'json', 'yaml', 'toml', 'sql', 'go', 'rust', 'java', 'c', 'cpp',
  'csharp', 'ruby', 'php', 'swift', 'kotlin', 'markdown', 'xml', 'text',
];

export var DEFAULT_CONTENT = [
  '# Welcome to the Zensical Editor',
  '',
  'Start typing to create content. Use the toolbar above to format text and insert blocks.',
  '',
  '## Features',
  '',
  '- **Bold**, *italic*, ==highlight==, ^^underline^^, ~~strikethrough~~',
  '- `inline code` and fenced code blocks',
  '- ++ctrl+c++ keyboard keys',
  '',
  '!!! tip "Getting Started"',
  '    Click on any block to edit it. Use the toolbar to add new elements.',
  '',
  '??? note "Collapsible Section"',
  '    This content is hidden by default. Click to expand.',
].join('\n');

var _uid = 0;
export function uid() { return 'zb-' + (++_uid); }
