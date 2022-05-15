const Lycee=require('../Models/lycee');
exports.lyceeValidatore=(req,res,next)=>{
    req.check('nom','nom est obligatoire !!').notEmpty();
    req.check('ville','ville est obligatoire !!').notEmpty();
    req.check('adresse','la ville est obligatoire !!').notEmpty();
    const error=req.validationErrors();
    if(error){
       return res.status(400).json({error});
    }
    next();
}
exports.getLycee=(req,res,next,id)=>{
Lycee.findById(id).exec((err,lycee)=>{
    if(err || !lycee){
        return res.status(400).json({err});
    }
    req.lycee=lycee;
    next();
});
}