import { defaultTitle } from '../../constants';
import { ExcelComponent } from '../../core/ExcelComponent';
import { debounce } from '../../core/utils';
import { changeTitle } from '../../redux/actions';
import { headerTemplate } from './header.template';

export class Header extends ExcelComponent {
  static className = 'excel-header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['currentTitle'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return headerTemplate(title);
  }

  onInput(event) {
    const value = event.target.value;
    this.$dispatch(changeTitle(value));
  }
}
