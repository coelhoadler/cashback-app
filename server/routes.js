const express = require('express');
const routes = express.Router();

const BoticarioController = require('./controllers/BoticarioController');
const SellersController = require('./controllers/SellersController');

routes.get('/', (req, res) => {
    return res.send('Hello World Adler Coelho Santos!');
});

routes.get('/cashback', BoticarioController.show);

routes.get('/sellers/:id', SellersController.getSales);
routes.post('/sellers/auth', SellersController.auth);
routes.post('/sellers', SellersController.store);
routes.put('/sellers/:id', SellersController.update);

module.exports = routes;
