import { $ } from '../core/dom';
import { Page } from '../core/Page';
import { createRecordsTable } from './dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'db').html(`
      <div class="db-header">
        <h1>Excel Панель Управления</h1>
      </div>
      <div class="db-new">
        <div class="db-box">
          <a href="#excel/${now}" class="db-new-create">Новая <br>таблица</a>
        </div>
      </div>
      <div class="db-table">
        ${ createRecordsTable() }
      </div>
    `);
  }
}
