const axios = require('axios');
const BASE_PATH = 'http://localhost:3000';
export default class Dashboard {
  constructor() { }

  addNewRow(id) {
    return `<tr id="row-${id}">
              <td><input type="text" maxlength="6" placeholder="999999" class="form-control"></td>
              <td><input type="text" maxlength="6" data-mask="0#" placeholder="99.99" class="form-control"></td>
              <td><input type="text" maxlength="6" data-mask="00/00/0000" placeholder="99/99/9999" class="form-control"></td>
              <td><button data-id="${id}" class="rmSale">-</button></td>
            </tr>`;
  }

  removeRow(id) {
    const $elem = document.querySelector(`#row-${id}`);
    if ($elem) {
      $elem.parentNode.removeChild($elem);
    }
  }

  saveSales(userId) {
    console.log(userId);
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
    axios.put(`${BASE_PATH}/sellers/${userId}`, { sales: arr });
  }
}
