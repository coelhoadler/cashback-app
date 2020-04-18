const axios = require('../utils/conf');

export default class Cadastro {

  constructor() { }

  async post(payload) {
    const newSeller = await axios.post(`/sellers`, payload);
    return newSeller;
  }

  async login(payload) {
    const seller = await axios.post(`/sellers/auth`, payload);
    return seller;
  }
}
