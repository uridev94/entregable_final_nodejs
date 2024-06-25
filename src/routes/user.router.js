const { getAll, create, getOne, remove, update } = require('../controllers/user.controllers.js');
const express = require('express');

const routerUser = express.Router();

routerUser.route('/')
    .get(getAll)
    .post(create);

routerUser.route('/:id')
    .delete(remove)
    .put(update);

module.exports = routerUser;