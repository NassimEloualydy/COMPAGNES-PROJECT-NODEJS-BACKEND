const joi=require('joi');
const formidable=require('formidable');
const expressJWT=require('express-jwt');
require('dotenv').config();
exports.authValidator=(req,res,next)=>{
    let form =new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{
        const schema=new joi.object({
            nom:joi.string().required().trim(),
            prenom:joi.string().required().trim(),
            login:joi.string().required().trim(),
            pw:joi.string().required().trim(),
           });
           const {error}=schema.validate(fields);
           if(error){
              return res.status(400).json({err:error.details[0].message});
           }
           if(err){
               return res.status(400).json({msg:`error ${err}`});
           }
           
    });
    next();
       
}
exports.requireSignin=expressJWT(
    {
        secret:process.env.JWT_SECRET,
        algorithms:["HS256"],
        userProperty:'auth'
    }
);