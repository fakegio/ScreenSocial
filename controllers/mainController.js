

//GET /: sends the home page
exports.index = (req,res)=>{
    res.render('index');
};

//GET /about: sends the about page
exports.about = (req,res)=>{
    res.render('about');
};

//GET /contact: sends the contact page
exports.contact = (req,res)=>{
    res.render('contact');
};