module.exports = {
  show(req, res) {
    const api = require('../mock/cashback-api');
    return res.json(api);
  }
}
