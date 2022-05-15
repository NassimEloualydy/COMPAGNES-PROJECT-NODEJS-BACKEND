const Admin=require('../Models/admin');
const formidable=require('formidable');
const fs=require('fs');
const joi=require('joi');
const jwt=require('jsonwebtoken');
exports.signup= async (req,res)=>{
let form =new formidable.IncomingForm();
form.keepExtensions=true;
form.parse(req,async(err,fields,files)=>{
    const {nom,prenom,login,pw}=fields;
    var c=await Admin.find().select().and([{nom},{prenom}]).count();
    if(c!=0){
        return res.status(400).json({msg:"SVP le nom et le prenom exist deja !!"});
    }
     c=await Admin.find().select().and([{login},{pw}]).count();
    if(c!=0){
        return res.status(400).json({msg:"svp le login et le mot de passe exist deja !!"});
    } 
    if(err){
        return res.status(400).json({err:`error ${err}`});

    }   
    let a=new Admin(fields);
    if(files.photo){
        a.photo.data=fs.readFileSync(files.photo.path);
        a.photo.contentType=files.photo.type;
    }
  a.save((err,a)=>{
 if(err){
     return res.status(400).json({err});
 }
 res.json({a});
});
})
}
exports.signin= async (req,res)=>{
    const schema=new joi.object({
        login:joi.string().required(),
        pw:joi.string().required()
    });
    
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({msg:error.details[0].message});
    }
    const {login,pw}=req.body;
    var c =await Admin.find().select().and([{login},{pw}]).count();
    if(c!=1){
        return res.status(400).json({msg:"svp login au mot de pass et introuvable !!"}); 
    }
    Admin.find().select().and([{login,pw}]).exec((err,a)=>{
        if(err || !a){
            return res.status(400).json({err});
        }
       const token =jwt.sign({_id:a[0]._id},process.env.JWT_SECRET);
       res.cookie('token',token,{expire:new Date()+80000000000});
       const {_id,nom,prenom}=a[0];
      return res.json({
           token,admin:{_id,nom,prenom}
       })
    })
}
exports.signout=(req,res)=>{
    res.clearCookie('token');
    res.json({msg:"sign out !!"});
}
exports.getAdmin=(req,res)=>{
    res.json({_id:req.auth});
}