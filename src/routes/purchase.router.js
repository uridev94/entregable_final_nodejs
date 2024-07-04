const { getAll, create } = require('../controllers/purchase.controllers');
const express = require('express');

const routerPurchase = express.Router();

routerPurchase.route('/') //lockedAll
    .get(getAll)
    .post(create)

module.exports = routerPurchase;