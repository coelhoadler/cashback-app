const axios = require('axios');
const BASE_PATH = 'http://localhost:3000';

export default class Listar {

  constructor() { }

  static async getSales(userId) {
    const sales = await axios.get(`${BASE_PATH}/sellers/${userId}`);
    const salesData = sales.data;

    let html = '';
    salesData.forEach(element => {
      html += `<tr id="row-${userId}">
                <td><input type="text" maxlength="6" readonly placeholder="999999" class="form-control" value="${element.code}"></td>
                <td><input type="text" readonly placeholder="99.99" class="form-control money" value="${element.price}"></td>
                <td><input type="text" readonly placeholder="99/99/9999" class="form-control date" value="${element.date}"></td>
                <td class="text-center">1</td>
                <td>
                  <button>editar</button>
                  <button>deletar</button>
                </td>
              </tr>`;
    });

    return html;
  }

}
