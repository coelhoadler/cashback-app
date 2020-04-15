const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect("mongodb+srv://adler:tkS8e0eI888H1Px7@cluster0-4zgaf.mongodb.net/cashback-app?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const routes = require('./routes');
const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3000);
