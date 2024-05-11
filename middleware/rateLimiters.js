const rateLimit = require('express-rate-limit');

exports.logInLimiter = rateLimit({
    windowMs: 30*1000, //30 second time window
    max:3, // after 4 in total
    //message: 'Too many login requests. Try again later.'
    handler:(req,res,next) =>{
        let err = new Error('Too many login requests. Try again later')
        err.status = 429;
        return next(err);
    }
});