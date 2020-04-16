const express = require('express');
const routes = express.Router();
const SellersController = require('./controllers/SellersController');

routes.get('/', (req, res) => {
    return res.send('Hello World Adler!');
});

routes.post('/sellers/auth', SellersController.auth);
routes.post('/sellers', SellersController.store);

module.exports = routes;
