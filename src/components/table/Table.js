import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { isCell, matrix, nextSelector, shouldResize } from './table.functions';
import { resizeHandler } from './table.resizer';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';


export class Table extends ExcelComponent {
  static className = 'excel-table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find(`[data-id="0:0"]`);
    this.selectCell($cell);

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:value', $cell.text());
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));

      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text());
  }
}
