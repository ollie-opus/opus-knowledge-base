import { el } from './dom.js';
import { insertTextAtCursor } from './formatting.js';
import { serializeAll } from './parser.js';

export function showLinkDialog() {
  var sel = window.getSelection();
  var selectedText = sel ? sel.toString() : '';
  var overlay = el('div', { className: 'ze-dialog-overlay' });
  var dialog = el('div', { className: 'ze-dialog' });
  dialog.appendChild(el('h3', {}, ['Insert Link']));
  var textInput = el('input', { type: 'text', placeholder: 'Link text', value: selectedText });
  var urlInput = el('input', { type: 'text', placeholder: 'URL (https://...)' });
  var btns = el('div', { className: 'ze-dialog-btns' }, [
    el('button', { className: 'ze-btn', style: { background: '#999' }, textContent: 'Cancel', onclick: function () { overlay.remove(); } }),
    el('button', { className: 'ze-btn', textContent: 'Insert', onclick: function () {
      var md = '[' + (textInput.value || 'link') + '](' + urlInput.value + ')';
      insertTextAtCursor(md);
      overlay.remove();
    }}),
  ]);
  dialog.appendChild(textInput);
  dialog.appendChild(urlInput);
  dialog.appendChild(btns);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  setTimeout(function () { urlInput.focus(); }, 50);
}

export function showImageDialog() {
  var overlay = el('div', { className: 'ze-dialog-overlay' });
  var dialog = el('div', { className: 'ze-dialog' });
  dialog.appendChild(el('h3', {}, ['Insert Image']));
  var altInput = el('input', { type: 'text', placeholder: 'Alt text' });
  var urlInput = el('input', { type: 'text', placeholder: 'Image URL' });
  var btns = el('div', { className: 'ze-dialog-btns' }, [
    el('button', { className: 'ze-btn', style: { background: '#999' }, textContent: 'Cancel', onclick: function () { overlay.remove(); } }),
    el('button', { className: 'ze-btn', textContent: 'Insert', onclick: function () {
      var md = '![' + (altInput.value || 'image') + '](' + urlInput.value + ')';
      insertTextAtCursor(md);
      overlay.remove();
    }}),
  ]);
  dialog.appendChild(altInput);
  dialog.appendChild(urlInput);
  dialog.appendChild(btns);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  setTimeout(function () { urlInput.focus(); }, 50);
}

export function download(content) {
  var blob = new Blob([content], { type: 'text/markdown' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'export.md';
  a.click();
  URL.revokeObjectURL(url);
}
