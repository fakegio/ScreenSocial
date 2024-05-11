const model = require('../models/event');
const rsvpModel = require('../models/rsvp');
const { DateTime } = require('luxon');


//GET /events: sends all events to user
exports.index = (req,res, next)=>{
    model.find()
    .then(events => {
        return model.distinct('category').exec()
        .then(categories =>{
            if(events.length === 0 || categories.length === 0){
                categories = null;
            }
            return res.render('./event/index',{events, categories});
        })
    })
    .catch(err=>next(err));
};

//GET /events/new: send html form for creating a new event
exports.new = (req,res)=>{
   res.render('./event/newEvent');
};

//POST /events/: create a new event
exports.create = (req,res, next)=>{
    req_event = req.body;
    const image = req.file.filename;
    req_event.image = image;
    req_event.host_name = req.session.user._id;
    let event = new model(req_event);//create a new event document
    event.save() // insert the document to the database
    .then((event) => {
        req.flash("success", "Event created successfully");
        res.redirect('/events');
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err)
    });
 };

//GET /events/:id : send details of event identified by id
exports.show = (req,res, next) =>{
    let id = req.params.id;
    
    model.findById(id).populate('host_name', 'firstName lastName')
    .then(event => {
        if(event) {
            rsvpModel.find({event: id})
            .then(rsvp =>{
                let yes_count = 0;
                rsvp.forEach(rsvp=>{
                    if(rsvp.status === 'YES'){
                        yes_count++;
                    }
                });
                return res.render('./event/showEvent', {event, yes_count});
            })
            .catch(err=> next(err));
        } else {
            let err = new Error('Cannot find an event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> next(err));
};

//GET /events/:id/edit : send html form for editing an existing event
exports.edit = (req,res,next) =>{
    let id = req.params.id;
    
    model.findById(id).lean()
    .then(event =>{
        if(event){
            let start = DateTime.fromJSDate(event.start_date).toISO({ includeOffset: false, suppressMilliseconds: true });
            let end = DateTime.fromJSDate(event.end_date).toISO({ includeOffset: false, suppressMilliseconds: true });
            event.start_date = start;
            event.end_date = end;
            res.render('./event/edit',{event});
        }else{
            let err = new Error('Cannot find event with id '+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

//POST /events/:id/rsvp: create/update rsvp
exports.rsvp = (req,res,next) =>{
    user_id = req.session.user._id;
    event_id = req.params.id;
    req_status = req.body.rsvp_status;
    
    model.findById(event_id)
    .then(event =>{
        rsvp_title = event.title;
        rsvpModel.findOneAndUpdate({user: user_id, event: event_id, title: rsvp_title},{status:req_status},{upsert:true})
        .then(rsvp_doc => {
            if(rsvp_doc){
                req.flash("success", "RSVP updated successfully");
            }else{
                req.flash("success", "RSVP created successfully");
            }
            res.redirect('/users/profile');
        })
        .catch(err=>next(err));
    })
    .catch(err=> next(err));

};

//PUT /events/:id : update the event identified by id
exports.update = (req,res,next) =>{
    let event = req.body;
    let id = req.params.id;

    if(req.file){
        const image = req.file.filename
        event.image = image;
    }else{
            let err = new Error('Cannot find event with id '+id);
            err.status = 404;
            next(err); 
    }
    
    model.findByIdAndUpdate(id, event, {useFindAndModify:false, runValidators:true})
    .then(event =>{
        if(event){
            req.flash("success", "Event updated successfully");
            return res.redirect('/events/'+id);
        }
        else{
            let err = new Error('Cannot find event with id '+id);
            err.status = 404;
            next(err);    
        }
    })
    .catch(err =>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err)
    });
};

//DELETE /events/:id : delete event by id
exports.delete = (req,res,next) =>{
    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{
        if(event){
            rsvpModel.deleteMany({event: id})
            .then(rsvp => {
                req.flash("success", "Event deleted successfully");
                res.redirect('/events');
            })
            .catch(err => next(err));
        }else{
            let err = new Error('Cannot find event with id '+id);
            err.status = 404;
            next(err);    
        }
    })
    .catch(err => next(err));
};