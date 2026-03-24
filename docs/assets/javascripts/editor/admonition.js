import { ADMONITION_TYPES } from './constants.js';
import { editorState } from './state.js';
import { el } from './dom.js';
import { icon } from './icons.js';
import { pushUndo } from './undo.js';
import { renderAndReopenProps } from './blocks.js';

export function parseAdmonitionHeader(markdown) {
  var lines = markdown.split('\n');
  var firstLine = lines[0].trim();
  var match = firstLine.match(/^(!{3}|\?{3}\+?)\s+(\S+)/);
  if (!match) return null;

  var marker = match[1];
  var type = match[2];
  var rest = firstLine.slice(match[0].length);

  var inlinePos = '';
  if (rest.includes('inline end')) inlinePos = 'end';
  else if (rest.includes('inline')) inlinePos = 'start';

  var titleMatch = rest.match(/"([^"]*)"/);
  var title = titleMatch ? titleMatch[1] : type.charAt(0).toUpperCase() + type.slice(1);

  return {
    collapsible: marker.startsWith('???'),
    defaultOpen: marker === '???+',
    type: type,
    title: title,
    inline: inlinePos,
    bodyLines: lines.slice(1),
  };
}

export function rebuildAdmonitionMarkdown(props, bodyLines) {
  var marker = props.collapsible ? (props.defaultOpen ? '???+' : '???') : '!!!';
  var inlinePart = props.inline === 'start' ? ' inline' : props.inline === 'end' ? ' inline end' : '';
  var titlePart = ' "' + props.title + '"';
  var header = marker + ' ' + props.type + inlinePart + titlePart;
  return header + (bodyLines.length ? '\n' + bodyLines.join('\n') : '\n    ');
}

// Appends admonition-specific property controls to an existing panel element
export function buildAdmonitionProps(panel, block, canvas) {
  var parsed = parseAdmonitionHeader(block.markdown);
  if (!parsed) return;

  // Type selector
  panel.appendChild(el('label', {}, ['Type']));
  var typeSelect = el('select');
  ADMONITION_TYPES.forEach(function (t) {
    var opt = el('option', { value: t, textContent: t });
    if (t === parsed.type) opt.selected = true;
    typeSelect.appendChild(opt);
  });
  typeSelect.addEventListener('change', function () {
    pushUndo();
    parsed.type = typeSelect.value;
    block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
    renderAndReopenProps(block.id, canvas);
  });
  panel.appendChild(typeSelect);

  // Title
  panel.appendChild(el('label', {}, ['Title']));
  var titleInput = el('input', { type: 'text', value: parsed.title || '' });
  titleInput.addEventListener('input', function () {
    parsed.title = titleInput.value;
  });
  titleInput.addEventListener('blur', function () {
    pushUndo();
    block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
    renderAndReopenProps(block.id, canvas);
  });
  panel.appendChild(titleInput);

  // Collapsible toggle
  var collRow = el('div', { className: 'ze-props-row' }, [
    el('label', { style: { margin: '0' } }, ['Collapsible']),
  ]);
  var collToggle = el('div', {
    className: 'ze-toggle' + (parsed.collapsible ? ' on' : ''),
    onclick: function () {
      pushUndo();
      parsed.collapsible = !parsed.collapsible;
      if (!parsed.collapsible) parsed.defaultOpen = false;
      collToggle.classList.toggle('on');
      block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
      renderAndReopenProps(block.id, canvas);
    },
  });
  collRow.appendChild(collToggle);
  panel.appendChild(collRow);

  // Default open (only if collapsible)
  if (parsed.collapsible) {
    var openRow = el('div', { className: 'ze-props-row' }, [
      el('label', { style: { margin: '0' } }, ['Open by default']),
    ]);
    var openToggle = el('div', {
      className: 'ze-toggle' + (parsed.defaultOpen ? ' on' : ''),
      onclick: function () {
        pushUndo();
        parsed.defaultOpen = !parsed.defaultOpen;
        openToggle.classList.toggle('on');
        block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
        renderAndReopenProps(block.id, canvas);
      },
    });
    openRow.appendChild(openToggle);
    panel.appendChild(openRow);
  }

  // Inline position
  panel.appendChild(el('label', {}, ['Inline Position']));
  var inlineSelect = el('select');
  [{ v: '', t: 'None' }, { v: 'start', t: 'Left (inline)' }, { v: 'end', t: 'Right (inline end)' }].forEach(function (opt) {
    var o = el('option', { value: opt.v, textContent: opt.t });
    if (opt.v === (parsed.inline || '')) o.selected = true;
    inlineSelect.appendChild(o);
  });
  inlineSelect.addEventListener('change', function () {
    pushUndo();
    parsed.inline = inlineSelect.value;
    block.markdown = rebuildAdmonitionMarkdown(parsed, parsed.bodyLines);
    renderAndReopenProps(block.id, canvas);
  });
  panel.appendChild(inlineSelect);
}
