export function headerTemplate(title) {
  return `
    <input type="text" class="excel-header-input" value="${title}">

    <div>
      <button type="button" class="excel-header-btn" data-button="remove">
        <i class="material-icons" data-button="remove">delete</i>
      </button>
      <button type="button" class="excel-header-btn" data-button="exit">
        <i class="material-icons" data-button="exit">exit_to_app</i>
      </button>
    </div>
  `;
}
