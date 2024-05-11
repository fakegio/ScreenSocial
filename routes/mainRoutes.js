const express = require('express');
const mainRouter = express.Router();

const controller = require('../controllers/mainController');

//GET /: sends the home page
mainRouter.get('/', controller.index);

//GET /about: sends the about page
mainRouter.get('/about', controller.about);

//GET /contact: sends the contact page
mainRouter.get('/contact', controller.contact);

module.exports = mainRouter;