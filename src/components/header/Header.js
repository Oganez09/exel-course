import { defaultTitle } from '../../constants';
import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { ActiveRoute } from '../../core/routes/ActiveRoute';
import { debounce } from '../../core/utils';
import { changeTitle } from '../../redux/actions';
import { headerTemplate } from './header.template';

export class Header extends ExcelComponent {
  static className = 'excel-header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?');
      if (decision) {
        const param = ActiveRoute.param;
        localStorage.removeItem(`excel:${param}`);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
