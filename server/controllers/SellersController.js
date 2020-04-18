const Seller = require('./../models/Seller.js');

module.exports = {
  async show(req, res) {
    const { id } = req.params;
    const seller = await Seller.findOne({ _id: id });
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
      const { name, email, document, _id } = seller;
      return res.json({
        id: _id,
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
    const { name, email, password, document } = req.body;
    const sellerExists = await Seller.findOne({ document });

    if (sellerExists) {
      return res.json({
        success: false,
        message: `O documento ${document} já consta no sistema.`
      });
    }

    try {
      await Seller.create({
        name,
        email,
        password,
        document
      });

      return res.json({
        success: true,
        message: 'Vendedor cadastrado com sucesso!'
      });
    } catch ($y) {
      return res.json({
        success: false,
        message: 'Preencha corretamente todos os campos corretamente.'
      });
    }
  },
  async update(req, res) {
    const { id } = req.params;
    const { sales } = req.body;
    const seller = await Seller.findOne({ _id: id });
    sales.forEach(sale => seller.sales.push(sale));

    if (seller) {
      seller.save();

      return res.json(seller);
    } else {
      return res.json({
        success: false,
        message: 'Vendedor não encontrado.'
      })
    }
  },
  async getSales(req, res) {
    const { id } = req.params;
    const seller = await Seller.findOne({ _id: id });
    if (seller) {
      return res.json(seller.sales);
    } else {
      return res.json({
        success: false,
        message: 'Vendedor não encontrado.'
      })
    }
  },
  async updateSales(req, res) {
    const { id, saleId } = req.params;
    const seller = await Seller.findOne({ _id: id });
    if (seller) {
      const newSales = seller.sales.filter(sale => sale._id == saleId);

      seller.sales = newSales;
      seller.save();

      return res.json(newSales);
    } else {
      return res.json({
        success: false,
        message: 'Vendedor não encontrado.'
      })
    }
  },
  async deleteSale(req, res) {
    const { id, saleId } = req.params;
    const seller = await Seller.findOne({ _id: id });
    if (seller) {
      const newSales = seller.sales.filter(sale => sale._id != saleId);

      seller.sales = newSales;
      seller.save();

      return res.json(newSales);
    } else {
      return res.json({
        success: false,
        message: 'Vendedor não encontrado.'
      })
    }
  }
}
