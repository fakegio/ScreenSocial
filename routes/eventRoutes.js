const express = require('express');
const controller = require('../controllers/eventController');
const {isLoggedIn,isHost, isNotHost} = require('../middleware/auth');
const {validateId, validateEvent, validateRsvp, validateResult} = require("../middleware/validator");
const {fileUpload} = require('../middleware/fileUpload');
const eventRouter = express.Router();

//GET /events: sends all events to user
eventRouter.get('/', controller.index);

//GET /events/new: send html form for creating a new event
eventRouter.get('/new', isLoggedIn, controller.new);

//POST /events/: create a new event
eventRouter.post('/', isLoggedIn, fileUpload,validateEvent, validateResult, controller.create);

//GET /events/:id : send details of event identified by id
eventRouter.get('/:id', validateId, controller.show);

//GET /events/:id/edit : send html form for editing an existing event
eventRouter.get('/:id/edit', validateId, isLoggedIn, isHost, controller.edit);

//POST /events/:id/rsvp: create/update rsvp
eventRouter.post('/:id/rsvp', validateId,isLoggedIn, isNotHost, validateRsvp, validateResult, controller.rsvp);

//PUT /events/:id : update the event identified by id
eventRouter.put('/:id',validateId, isLoggedIn, isHost,fileUpload, validateEvent, validateResult, controller.update);

//DELETE /events/:id : deletes event by id
eventRouter.delete('/:id', validateId, isLoggedIn, isHost, controller.delete);

module.exports = eventRouter;