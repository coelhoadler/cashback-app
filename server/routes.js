const express = require('express');
const routes = express.Router();

const BoticarioController = require('./controllers/BoticarioController');
const SellersController = require('./controllers/SellersController');

routes.get('/', (req, res) => {
    return res.send('Hello World Adler Coelho Santos!');
});

routes.get('/cashback', BoticarioController.show);

routes.post('/sellers/auth', SellersController.auth);
routes.post('/sellers', SellersController.store);
routes.get('/sellers/:id', SellersController.getSales);
routes.put('/sellers/:id', SellersController.update);
routes.put('/sellers/:id/:saleId', SellersController.updateSales);
routes.delete('/sellers/:id/:saleId', SellersController.deleteSale);

routes.delete('/cypress/:userEmail/:userPassword', SellersController.deleteUser);

module.exports = routes;
