const Admin=require('../Models/admin');
const formidable=require('formidable');
const fs=require('fs');
exports.hellow=(req,res)=>{
    res.json({msg:"hellow"});
}
exports.updateAdmin=async (req,res)=>{
    const _id=req.auth._id;
   admin=Admin.findById(_id).exec((err,a)=>{
     if(err){
         return res.status(400).json({err})
     }
let form=new formidable.IncomingForm();
form.keepExtensions=true;
form.parse(req,async (err,filds,files)=>{ 
     
    const {nom,prenom,login,pw}=filds;
    var c=await Admin.find({_id:{$ne:_id}}).select().and([{nom},{prenom}]).count();
    if(c!=0){
        return res.status(400).json({msg:"SVP le nom et le prenom exist deja !!"});

    }
    c=await Admin.find({_id:{$ne:_id}}).select().and([{login},{pw}]);
    if(c!=0){
        return res.status(400).json({msg:"SVP le login et le mot de passe exist deja !!"});
    }
    a.nom=filds.nom;
    a.prenom=filds.prenom;
    a.login=filds.login;
    a.pw=filds.pw;
    if(files.photo){
     a.photo.data=fs.readFileSync(files.photo.path);
     a.photo.contentType=files.photo.type;      
    }
    a.save((err,admin)=>{
      if(err){
          return res.status(400).json({er})
      }
      res.json({admin});
    })
});

    });
}
exports.getProfile=(req,res)=>{
const _id=req.auth._id;
Admin.findById(_id).exec((err,admin)=>{
 if(err){
   return res.status(400).json(err);
 }
 res.json({admin});
});
}
