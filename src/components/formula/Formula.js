import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel-formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  toHTML() {
    return `
      <div class="excel-formula-info">fx</div>
      <div class="excel-formula-input" id="formula" contenteditable="" spellcheck="false"></div>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    this.$on('table:value', value => {
      this.$formula.text(value);
    });

    this.$on('table:input', value => {
      this.$formula.text(value);
    });
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();

      this.$emit('formula:done');
    }
  }
}
