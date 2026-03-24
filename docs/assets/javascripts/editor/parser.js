import { uid } from './constants.js';
import { editorState } from './state.js';

export function parseMarkdown(src) {
  var lines = src.split('\n');
  var blocks = [];
  var i = 0;

  while (i < lines.length) {
    var line = lines[i];
    var trimmed = line.trim();

    // Skip blank lines between blocks
    if (trimmed === '') { i++; continue; }

    // ── Heading (single line) ──
    if (/^#{1,6}\s+/.test(trimmed)) {
      blocks.push({ id: uid(), markdown: trimmed });
      i++; continue;
    }

    // ── HR ──
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push({ id: uid(), markdown: trimmed });
      i++; continue;
    }

    // ── Fenced code block ──
    var codeMatch = trimmed.match(/^(`{3,}|~{3,})/);
    if (codeMatch) {
      var fence = codeMatch[1];
      var blockLines = [line];
      i++;
      while (i < lines.length) {
        blockLines.push(lines[i]);
        if (lines[i].trim() === fence || lines[i].trim().startsWith(fence.charAt(0).repeat(fence.length))) {
          i++; break;
        }
        i++;
      }
      blocks.push({ id: uid(), markdown: blockLines.join('\n') });
      continue;
    }

    // ── Math block ($$) ──
    if (trimmed === '$$') {
      var blockLines = [line];
      i++;
      while (i < lines.length) {
        blockLines.push(lines[i]);
        if (lines[i].trim() === '$$') { i++; break; }
        i++;
      }
      blocks.push({ id: uid(), markdown: blockLines.join('\n') });
      continue;
    }

    // ── Admonition (!!!, ???, ???+) ──
    if (/^(!{3}|\?{3}\+?)\s/.test(trimmed)) {
      var blockLines = [line];
      i++;
      while (i < lines.length) {
        var ll = lines[i];
        if (ll.trim() === '') {
          var j = i + 1;
          while (j < lines.length && lines[j].trim() === '') j++;
          if (j < lines.length && lines[j].search(/\S/) >= 4) {
            blockLines.push(ll);
            i++; continue;
          }
          break;
        }
        if (ll.search(/\S/) >= 4) {
          blockLines.push(ll);
          i++;
        } else break;
      }
      blocks.push({ id: uid(), markdown: blockLines.join('\n') });
      continue;
    }

    // ── Content tabs (=== "Tab") ──
    if (/^===\s+"/.test(trimmed)) {
      var blockLines = [line];
      i++;
      while (i < lines.length) {
        var ll = lines[i];
        if (ll.trim() === '') {
          var j = i + 1;
          while (j < lines.length && lines[j].trim() === '') j++;
          if (j < lines.length && (lines[j].search(/\S/) >= 4 || /^===\s+"/.test(lines[j].trim()))) {
            blockLines.push(ll);
            i++; continue;
          }
          break;
        }
        if (ll.search(/\S/) >= 4 || /^===\s+"/.test(ll.trim())) {
          blockLines.push(ll);
          i++;
        } else break;
      }
      blocks.push({ id: uid(), markdown: blockLines.join('\n') });
      continue;
    }

    // ── Table (consecutive | lines) ──
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      var blockLines = [line];
      i++;
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        blockLines.push(lines[i]);
        i++;
      }
      blocks.push({ id: uid(), markdown: blockLines.join('\n') });
      continue;
    }

    // ── List ──
    if (/^(\s*)([-*+]|\d+\.)\s/.test(trimmed)) {
      var blockLines = [line];
      i++;
      while (i < lines.length) {
        var ll = lines[i];
        var llt = ll.trim();
        if (llt === '') {
          if (i + 1 < lines.length && (/^\s*([-*+]|\d+\.)\s/.test(lines[i + 1]) || /^\s{2,}/.test(lines[i + 1]))) {
            blockLines.push(ll);
            i++; continue;
          }
          break;
        }
        if (/^([-*+]|\d+\.)\s/.test(llt) || /^\s{2,}/.test(ll)) {
          blockLines.push(ll);
          i++;
        } else break;
      }
      blocks.push({ id: uid(), markdown: blockLines.join('\n') });
      continue;
    }

    // ── Footnote definition ──
    if (/^\[\^\w+\]:/.test(trimmed)) {
      var blockLines = [line];
      i++;
      while (i < lines.length) {
        var ll = lines[i];
        if (ll.trim() === '') {
          var j = i + 1;
          while (j < lines.length && lines[j].trim() === '') j++;
          if (j < lines.length && lines[j].search(/\S/) >= 4) {
            blockLines.push(ll);
            i++; continue;
          }
          break;
        }
        if (ll.search(/\S/) >= 4) {
          blockLines.push(ll);
          i++;
        } else break;
      }
      blocks.push({ id: uid(), markdown: blockLines.join('\n') });
      continue;
    }

    // ── Paragraph (default) ──
    var blockLines = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== '') {
      var pl = lines[i].trim();
      if (/^#{1,6}\s/.test(pl) || /^(`{3,}|~{3,})/.test(pl) || /^(!{3}|\?{3})/.test(pl) || /^===\s+"/.test(pl) || pl === '$$' || /^(-{3,}|\*{3,}|_{3,})$/.test(pl) || (pl.startsWith('|') && pl.endsWith('|')) || /^\[\^\w+\]:/.test(pl)) break;
      blockLines.push(lines[i]);
      i++;
    }
    blocks.push({ id: uid(), markdown: blockLines.join('\n') });
  }

  return blocks;
}

export function serializeAll() {
  return editorState.blocks.map(function (b) { return b.markdown; }).join('\n\n');
}
