const { login } = require('../controllers/user.controllers.js');
const { getAll, create, remove, update } = require('../controllers/user.controllers.js');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT.js');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt, getAll) //Locked
    .post(create);

routerUser.route('/login')
    .post(login)

routerUser.route('/:id')
    .delete(verifyJwt, remove) //locked
    .put(verifyJwt, update); //locked

module.exports = routerUser;