exports.ComplexeValidator=(req,res,next)=>{
    req.check('nom','le Nom est obligatoire').notEmpty();
    req.check('ville','la ville est obligatoire !!').notEmpty();
    const errors=req.validationErrors();
    if(errors){
      return  res.status(400).json({errors});
    }
    next();
}