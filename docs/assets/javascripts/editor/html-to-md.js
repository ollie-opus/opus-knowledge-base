export function htmlToInlineMarkdown(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return walkNodes(div);
}

export function walkNodes(node) {
  var result = '';
  node.childNodes.forEach(function (child) {
    if (child.nodeType === 3) { // text
      result += child.textContent;
      return;
    }
    if (child.nodeType !== 1) return;
    var tag = child.tagName.toLowerCase();
    var inner = walkNodes(child);
    switch (tag) {
      case 'strong': case 'b': result += '**' + inner + '**'; break;
      case 'em': case 'i': result += '*' + inner + '*'; break;
      case 'del': case 's': result += '~~' + inner + '~~'; break;
      case 'ins': case 'u': result += '^^' + inner + '^^'; break;
      case 'mark': result += '==' + inner + '=='; break;
      case 'sup': result += '^' + inner + '^'; break;
      case 'sub': result += '~' + inner + '~'; break;
      case 'code': result += '`' + inner + '`'; break;
      case 'kbd': result += '++' + inner + '++'; break;
      case 'a':
        // Skip headerlink/permalink anchors
        if (child.classList.contains('headerlink')) break;
        result += '[' + inner + '](' + (child.getAttribute('href') || '') + ')';
        break;
      case 'img': result += '![' + (child.getAttribute('alt') || '') + '](' + (child.getAttribute('src') || '') + ')'; break;
      case 'br': result += '\n'; break;
      case 'p': result += (result ? '\n' : '') + inner; break;
      default: result += inner;
    }
  });
  return result;
}

export function htmlTableToMarkdown(table) {
  var headerCells = [];
  var thead = table.querySelector('thead');
  if (thead) {
    thead.querySelectorAll('th').forEach(function (th) {
      headerCells.push(walkNodes(th).trim().replace(/\|/g, '\\|'));
    });
  }

  var bodyRows = [];
  var tbody = table.querySelector('tbody') || table;
  tbody.querySelectorAll('tr').forEach(function (tr) {
    // Skip rows inside thead
    if (tr.closest('thead')) return;
    var cells = [];
    tr.querySelectorAll('td').forEach(function (td) {
      cells.push(walkNodes(td).trim().replace(/\|/g, '\\|'));
    });
    bodyRows.push(cells);
  });

  var colCount = Math.max(headerCells.length, bodyRows.length > 0 ? bodyRows[0].length : 0);
  if (colCount === 0) return '';

  // Pad arrays to colCount
  while (headerCells.length < colCount) headerCells.push(' ');
  bodyRows.forEach(function (row) {
    while (row.length < colCount) row.push(' ');
  });

  var lines = [];
  lines.push('| ' + headerCells.map(function (c) { return c || ' '; }).join(' | ') + ' |');
  lines.push('| ' + headerCells.map(function () { return '---'; }).join(' | ') + ' |');
  bodyRows.forEach(function (row) {
    lines.push('| ' + row.map(function (c) { return c || ' '; }).join(' | ') + ' |');
  });
  return lines.join('\n');
}

export function htmlListToMarkdown(container) {
  var lines = [];
  function walkList(node, indent, ordered) {
    var idx = 1;
    node.childNodes.forEach(function (li) {
      if (li.tagName && li.tagName.toLowerCase() === 'li') {
        var prefix = ordered ? (idx++ + '. ') : '- ';
        var checkbox = li.querySelector('input[type="checkbox"]');
        var text = '';
        li.childNodes.forEach(function (c) {
          if (c.tagName && (c.tagName.toLowerCase() === 'ul' || c.tagName.toLowerCase() === 'ol')) return;
          if (c.tagName && c.tagName.toLowerCase() === 'input') return;
          if (c.nodeType === 3) text += c.textContent;
          else if (c.nodeType === 1) text += walkNodes(c);
        });
        if (checkbox) {
          prefix = '- [' + (checkbox.checked ? 'x' : ' ') + '] ';
        }
        lines.push(indent + prefix + text.trim());
        li.childNodes.forEach(function (c) {
          if (c.tagName && c.tagName.toLowerCase() === 'ul') walkList(c, indent + '  ', false);
          if (c.tagName && c.tagName.toLowerCase() === 'ol') walkList(c, indent + '  ', true);
        });
      }
    });
  }
  var list = container.querySelector('ul, ol');
  if (list) {
    walkList(list, '', list.tagName.toLowerCase() === 'ol');
  } else {
    return container.textContent;
  }
  return lines.join('\n');
}
