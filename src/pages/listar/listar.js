const axios = require('../utils/conf');

export default class Listar {

  constructor() { }

  static async getSales(userId) {
    const cashBackArr = await this._getCashback();
    const sales = await axios.get(`/sellers/${userId}`);
    const salesData = sales.data;

    let html = '';

    salesData.forEach(element => {
      const current_cashback = cashBackArr.data.find(c => c.code === element.code);
      let percent = 0;
      let cashback_value = 0;

      if (current_cashback) {
        percent = current_cashback.cashback_percent;
        cashback_value = percent * parseFloat(element.price.replace(',', '.'));
      }

      const fakeStatus = this._getStatus();

      html += `<tr id="row-${element._id}">
                <td><input type="text" maxlength="6" readonly placeholder="999999" class="form-control" value="${element.code}"></td>
                <td><input type="text" readonly placeholder="99.99" class="form-control money" value="${element.price}"></td>
                <td><input type="text" readonly placeholder="99/99/9999" class="form-control date" value="${element.date}"></td>
                <td class="text-center font-cashback pt-3"><span class="cashback">R$ ${cashback_value.toFixed(1)}</span> (${percent * 100}%)</td>
                <td class="text-center badge-${fakeStatus.classy}">${fakeStatus.label}</td>
                <td class="d-flex">
                  <button class="btnDeleteSale d-flex btn justify-content-center align-items-center" title="Remover">
                    <span data-id="${element._id}" class="material-icons">remove</span>
                  </button>
                  ${fakeStatus.status === 1 ? `<button class="btnEditSale d-flex btn justify-content-center align-items-center" title="Editar">
                    <span data-id="${element._id}" class="material-icons">edit</span>
                  </button>` : `` }
                </td>
              </tr>`;
    });

    return html;
  }

  static async updateSales(userId, saleId) {
    return await axios.put(`/sellers/${userId}/${saleId}`);
  }

  static async deleteSale(userId, saleId) {
    return await axios.delete(`/sellers/${userId}/${saleId}`);
  }

  static _getCashback() {
    return axios.get(`/cashback`);
  }

  static _getStatus() {
    const status = Math.round(Math.random() * (3 - 1) + 1);
    let label = 'Em validacão';
    let classy = 'warning';

    switch (status) {
      case 2:
        label = 'Reprovado';
        classy = 'danger';
        break;
        case 3:
          label = 'Aprovado';
          classy = 'success';
          break;
    }

    return {
      status,
      label,
      classy
    }

  }

}
