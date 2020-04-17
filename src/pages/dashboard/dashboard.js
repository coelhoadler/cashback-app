export default class Dashboard {
  constructor() { }

  addNewRow(id) {
    return `<tr id="row-${id}">
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><button data-id="${id}" class="rmSale">-</button></td>
            </tr>`;
  }

  removeRow(id) {
    const $elem = document.querySelector(`#row-${id}`);
    if ($elem) {
      $elem.parentNode.removeChild($elem);
    }
  }

  saveSales() {
    const arr = [];
    document.querySelectorAll(`#table-body tr`).forEach(row => {
      arr.push({
        code: row.cells[0].querySelector('input').value,
        price: row.cells[1].querySelector('input').value,
        date: row.cells[2].querySelector('input').value
      });
    });
    console.log('obj', arr);
    // TODO: Salvar objeto
  }
}

function removeRow(id) {
  console.log(id)
}
