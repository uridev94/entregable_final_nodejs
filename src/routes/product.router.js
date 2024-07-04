const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerProduct = express.Router();

routerProduct.route('/')
    .get(getAll)
    .post(verifyJwt, create); //locked

routerProduct.route('/:id/images')
.post(verifyJwt, setImages) //locked

routerProduct.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove) //locked
    .put(verifyJwt, update); //locked

module.exports = routerProduct;