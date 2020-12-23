const CODES = {
  A: 65,
  Z: 90
};

function toCell() {
  return `
    <div class="excel-table-cell" contenteditable=""></div>
  `;
}

function toColumn(col) {
  return `
    <div class="excel-table-column">${col}</div>
  `;
}

function createRow(content, index = '') {
  return `
    <div class="excel-table-row">
      <div class="excel-table-row-info">${index}</div>
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

  const cell = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');

  rows.push(createRow(cols));

  for (let i = 1; i <= rowsCount; i++) {
    rows.push(createRow(cell, i));
  }

  return rows.join('');
}
