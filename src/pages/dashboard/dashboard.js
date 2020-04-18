const axios = require('../utils/conf');

export default class Dashboard {
  constructor() { }

  addNewRow(id) {
    return `<tr id="row-${id}">
              <td><input type="text" maxlength="6" placeholder="999999" class="form-control"></td>
              <td><input type="text" maxlength="6" placeholder="99.99" class="form-control money"></td>
              <td><input type="text" maxlength="6" placeholder="99/99/9999" class="form-control date"></td>
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
    const arr = [];
    document.querySelectorAll(`#table-body tr`).forEach(row => {
      arr.push({
        code: row.cells[0].querySelector('input').value.toUpperCase(),
        price: row.cells[1].querySelector('input').value,
        date: row.cells[2].querySelector('input').value
      });
    });

    return axios.put(`/sellers/${userId}`, { sales: arr });
  }
}
