import { ExcelComponent } from '../../core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel-header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    });
  }

  toHTML() {
    return `
      <input type="text" class="excel-header-input" value="Новая таблица">

      <div>
        <button type="button" class="excel-header-btn"><i class="material-icons">delete</i></button>
        <button type="button" class="excel-header-btn"><i class="material-icons">exit_to_app</i></button>
      </div>
    `;
  }
}
