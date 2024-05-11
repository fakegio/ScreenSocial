const {body} = require('express-validator');
const {validationResult} = require('express-validator');
const { DateTime } = require('luxon');


exports.validateId = (req,res,next) =>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }else{
        return next();
    }
    
};


exports.validateSignUp = 
[body('firstName','First name cannot be empty').notEmpty().trim().escape(),
body('lastName','Last name cannot be empty').notEmpty().trim().escape(),
body('email','Email must not be empty').notEmpty().trim().isEmail().escape().normalizeEmail().withMessage('Email must be a valid email'),
body('password', "Password must not be empty").notEmpty().trim().isLength({min:8, max:64}).withMessage('Password must be at least 8 characters and at most 64 characters')];

exports.validateLogin = 
[body('email','Email must be valid email address').notEmpty().trim().isEmail().escape().normalizeEmail().withMessage('Email must be a valid email'),
body('password', "Password must not be empty").notEmpty().trim().isLength({min:8, max:64}).withMessage('Password must be at least 8 characters and at most 64 characters')];

exports.validateResult = (req,res,next) =>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
        });
        res.redirect('back');
    }else{
        next();
    }
}

exports.validateEvent = 
[body('category','Category cannot be empty').notEmpty().trim().escape().isIn(['Horror','Comedy','Drama','Action','Other']).withMessage('Category must be in Horror,Comedy,Drama,Action, or Other'),
body('title','Title cannot be empty').notEmpty().trim().escape(),
body('start_date','Start date cannot be empty').notEmpty().trim().escape().isISO8601().withMessage('Start date must be a valid ISO 8601 date').isAfter(DateTime.utc().toISO()).withMessage('Start date must be in the future'),
body('end_date','End date cannot be empty').notEmpty().trim().escape().isISO8601().withMessage('End date must be a valid ISO 8601 date').custom((value, {req})=>{
    if(new Date(value) <= new Date(req.body.start_date)){
        throw new Error('End date must be after start date');
    }
    return true;
}),
body('location','Location cannot be empty').notEmpty().trim().escape(),
body('details','Details cannot be empty').notEmpty().trim().escape(),
body('image').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Image is required');
    }
    return true;
  }),
];

exports.validateRsvp =
[body('rsvp_status','Status must be non-empty').notEmpty().trim().isIn(['YES','NO','MAYBE']).withMessage('Status must be in YES, NO, or MAYBE')];