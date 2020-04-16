const axios = require('axios');
const BASE_PATH = 'http://localhost:3000';

export default class Cadastro {

  constructor() { }

  async post(payload) {
    const newSeller = await axios.post(`${BASE_PATH}/sellers`, payload);
    return newSeller;
  }

  async login(payload) {
    console.log('payload', payload)
    const seller = await axios.post(`${BASE_PATH}/sellers/auth`, payload);
    return seller;
  }
}
