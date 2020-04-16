const axios = require('axios');
const Seller = require('./../models/Seller.js');

module.exports = {
  async show(req, res) {
    const { email } = req.params;
    const seller = await Seller.findOne({ email });
    if (seller) {
      return res.json(seller);
    } else {
      return res.json({
        success: false,
        message: 'Vendedor não encontrado.'
      })
    }
  },
  async auth(req, res) {
    const { email, password } = req.body;
    const seller = await Seller.findOne({
      $and: [
        { email: { $eq: email } },
        { password: { $eq: password }}
      ]
    });

    if (seller) {
      const { name, email, document } = seller;
      return res.json({
        name,
        email,
        document
      });
    } else {
      return res.json({
        success: false,
        message: 'Verifique seu e-mail ou senha.'
      })
    }

  },
  async store(req, res) {
    console.log('Cadastra novo vendedor!');

    const { name, email, password, document } = req.body;
    const sellerExists = await Seller.findOne({ document });

    if (sellerExists) {
      return res.json({
        success: false,
        message: `O documento ${document} já consta no sistema.`
      });
    }

    const seller = await Seller.create({
      name,
      email,
      password,
      document
    });

    return res.json({
      success: true,
      message: 'Vendedor cadastrado com sucesso!'
    });

  }
}
