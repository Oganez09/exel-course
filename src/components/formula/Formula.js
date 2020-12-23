import { ExcelComponent } from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel-formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }

  toHTML() {
    return `
      <div class="excel-formula-info">fx</div>
      <div class="excel-formula-input" contenteditable="" spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log('Formula: onInput', event);
  }

  onClick() {
    console.log('Formula: onClick');
  }
}
