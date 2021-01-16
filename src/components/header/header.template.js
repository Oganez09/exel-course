export function headerTemplate(title) {
  return `
    <input type="text" class="excel-header-input" value="${title}">

    <div>
      <button type="button" class="excel-header-btn"><i class="material-icons">delete</i></button>
      <button type="button" class="excel-header-btn"><i class="material-icons">exit_to_app</i></button>
    </div>
  `;
}
