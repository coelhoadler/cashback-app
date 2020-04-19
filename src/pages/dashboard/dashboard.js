const axios = require('../utils/conf');

export default class Dashboard {
  constructor() { }

  static addNewRow(id) {
    return `<tr id="row-${id}">
              <td><input type="text" maxlength="6" placeholder="999999" class="form-control"></td>
              <td><input type="text" maxlength="6" placeholder="99.99" class="form-control money"></td>
              <td><input type="text" maxlength="6" placeholder="99/99/9999" class="form-control date"></td>
              <td>
                <button class="d-flex btn justify-content-center align-items-center rmSale">
                  <span data-id="${id}" class="material-icons">remove</span>
                </button>
              </td>
            </tr>`;
  }

  static removeRow(id) {
    const $elem = document.querySelector(`#row-${id}`);
    if ($elem) {
      $elem.parentNode.removeChild($elem);
    }
  }

  static async saveSales(userId) {
    const arr = [];
    document.querySelectorAll(`#table-body tr`).forEach(row => {
      const code = row.cells[0].querySelector('input').value.toUpperCase();
      const price = row.cells[1].querySelector('input').value;
      const date = row.cells[2].querySelector('input').value;
      if (code && price && date) {
        arr.push({
          code: row.cells[0].querySelector('input').value.toUpperCase(),
          price: row.cells[1].querySelector('input').value,
          date: row.cells[2].querySelector('input').value
        });
      }
    });

    return await axios.put(`/sellers/${userId}`, { sales: arr });
  }
}
