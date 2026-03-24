import { el } from './dom.js';
import { insertTextAtCursor } from './formatting.js';
import { serializeAll } from './parser.js';

export function showLinkDialog() {
  var sel = window.getSelection();
  var selectedText = sel ? sel.toString() : '';
  var overlay = el('div', { className: 'ze-dialog-overlay' });
  var dialog = el('div', { className: 'ze-dialog' });
  dialog.appendChild(el('h3', {}, ['Insert Link']));

  dialog.appendChild(el('label', { className: 'ze-dialog-label' }, ['Link text']));
  var textInput = el('input', { type: 'text', placeholder: 'Display text', value: selectedText });
  dialog.appendChild(textInput);

  dialog.appendChild(el('label', { className: 'ze-dialog-label' }, ['URL']));
  var urlInput = el('input', { type: 'text', placeholder: 'https://...' });
  dialog.appendChild(urlInput);

  var btns = el('div', { className: 'ze-dialog-btns' }, [
    el('button', { className: 'ze-btn ze-btn-ghost', textContent: 'Cancel', onclick: function () { overlay.remove(); } }),
    el('button', { className: 'ze-btn', textContent: 'Insert', onclick: function () {
      var md = '[' + (textInput.value || 'link') + '](' + urlInput.value + ')';
      insertTextAtCursor(md);
      overlay.remove();
    }}),
  ]);
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

  dialog.appendChild(el('label', { className: 'ze-dialog-label' }, ['Alt text']));
  var altInput = el('input', { type: 'text', placeholder: 'Describe the image' });
  dialog.appendChild(altInput);

  dialog.appendChild(el('label', { className: 'ze-dialog-label' }, ['Image URL']));
  var urlInput = el('input', { type: 'text', placeholder: 'https://...' });
  dialog.appendChild(urlInput);

  var btns = el('div', { className: 'ze-dialog-btns' }, [
    el('button', { className: 'ze-btn ze-btn-ghost', textContent: 'Cancel', onclick: function () { overlay.remove(); } }),
    el('button', { className: 'ze-btn', textContent: 'Insert', onclick: function () {
      var md = '![' + (altInput.value || 'image') + '](' + urlInput.value + ')';
      insertTextAtCursor(md);
      overlay.remove();
    }}),
  ]);
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
