import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';
import { toInlineStyles } from '../../core/utils';

const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(state.colState, col);
    const data = state.dataState[id];
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]});
    return `
      <div
        class="excel-table-cell"
        contenteditable=""
        data-col="${col}"
        data-type="cell"
        data-id="${id}"
        data-value="${data || ''}"
        style="${styles};width: ${width}"
      >${parse(data || '')}</div>
    `;
  };
}

function toColumn({col, index, width}) {
  return `
    <div class="excel-table-column" data-type="resizable" data-col="${index}" style="width: ${width};">${col}<span class="excel-table-column_resize" data-resize="col"></span></div>
  `;
}

function createRow(content, index = '', state) {
  const resizer = index ? '<span class="excel-table-row-info_resize" data-resize="row"></span>' : '';
  const height = getHeight(state, index);
  return `
    <div class="excel-table-row" data-type="resizable" data-row="${index}" style="height: ${height};">
      <div class="excel-table-row-info">${index} ${resizer}</div>
      <div class="excel-table-row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(cols, '', {}));

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');

    rows.push(createRow(cell, row + 1, state.rowState));
  }

  return rows.join('');
}
