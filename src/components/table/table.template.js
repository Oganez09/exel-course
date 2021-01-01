const CODES = {
  A: 65,
  Z: 90
};

function toCell(_, col) {
  const index = 1;
  return `
    <div class="excel-table-cell" contenteditable="" data-col="${col}" data-row="${index}"></div>
  `;
}

function toColumn(col, index) {
  return `
    <div class="excel-table-column" data-type="resizable" data-col="${index}">${col}<span class="excel-table-column_resize" data-resize="col"></span></div>
  `;
}

function createRow(content, index = '') {
  const resizer = index && '<span class="excel-table-row-info_resize" data-resize="row"></span>';
  return `
    <div class="excel-table-row" data-type="resizable">
      <div class="excel-table-row-info">${index} ${resizer}</div>
      <div class="excel-table-row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));

  for (let i = 1; i <= rowsCount; i++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('');

    rows.push(createRow(cell, i));
  }

  return rows.join('');
}
