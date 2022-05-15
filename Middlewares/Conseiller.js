const Conseiller=require('../Models/conseiller');
exports.ConseillerValidator=(req,res,next)=>{
    req.check('email','Invalide email !!').notEmpty().isEmail();
    // req.check('nom','le nom est obligatoire !!').notEmpty();
    // req.check('prenam','le prenam est obligatoire !!').notEmpty();
    // req.check('nbrVisite','le nombre de visite c est obligatoire et doit etre un chiffre !!').notEmpty().isNumerci();
    const errors=req.validationErrors();
    if(errors){
        return res.status(400).json({errors});
    }
    next();
}
exports.getConseiller=(req,res,next,id)=>{
 Conseiller.findById(id,(err,c)=>{
     if(err){
         return res.status(400).json({err});
     }
     req.conseiller=c;
     next();
 });
}