const Conseiller=require('../Models/conseiller');
const formidable=require('formidable');
const fs=require('fs');
const { string } = require('joi');
exports.createConseiller=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req, async (err,fields,files)=>{
      const {nom,prenom,email}=fields;
           var c= await Conseiller.find().select("-photo").and([{nom},{prenom}]).count();
    if(c!=0){
        return res.status(400).json({msg:"le nom et le prenom existe deja !!"});
    }

    c=await Conseiller.find({email:email}).select("-photo").count();
    if(c!=0){
        return res.status(400).json({msg:"cet email existe deja !!"});
    }
     if(err){
         return res.status(400).json({err:"image not uploade !!"});
     }
     let conseiller=new Conseiller(fields);
     if(files.photo){
        conseiller.photo.data=fs.readFileSync(files.photo.path);
        conseiller.photo.contentType=files.photo.type;
     }
     conseiller.save((err,c)=>{
        if(err){
            res.status(400).json({err});
        }
        res.json({c});
     });
    });
}
exports.deleteConseiller=(req,res)=>{
    const c=req.conseiller;
    c.remove((err,c)=>{
        if(err){
            return res.status(400).json({err});
        }
        res.json({msg:"deleted"});
    })
}
exports.getPhotoConseiller=(req,res)=>{
  const {data,contentType}=req.conseiller.photo;
  if(req.conseiller.photo.data){
      res.set('Content-Type',contentType);
      return res.send(data);
  }  
}
exports.updateConseiller=(req,res)=>{
    let form=new formidable.IncomingForm();
    let conseiller=req.conseiller;
    form.keepExtensions=true;
    form.parse(req,async (err,fields,files)=>{
     const {nom,prenom,email}=fields;
     var c= await Conseiller.find({_id:{$ne:req.conseiller._id}}).select("-photo").and([{nom},{prenom}]).count();
     if(c!=0){
         return res.status(200).json({msg:"le nom et le prenom exist deja !!"});
     }
     c=await Conseiller.find().select("-photo").and([{_id:{$ne:req.conseiller._id}},{email:email}]).count();
     if(c!=0){
        return res.status(200).json({msg:"cet email exist deja !!"});
    }
    conseiller.nom=fields.nom;
    conseiller.prenom=fields.prenom;
    conseiller.email=fields.email;

    if(files.photo){
        conseiller.photo.data=fs.readFileSync(files.photo.path);
        conseiller.photo.contentType=files.photo.type;
    }
    conseiller.save((err,c)=>{
      if(err){
          return res.status(400).json({err});
      }
      res.json({c});
    });
    });
}
exports.searchConseiller=(req,res)=>{
var searchQuery = {};
searchQuery.nom = {$regex: '.*'+req.body.nom+'.*',$options:'i'};
searchQuery.prenom = {$regex: '.*'+req.body.prenom+'.*',$options:'i'};
searchQuery.email = {$regex: '.*'+req.body.email+'.*',$options:'i'};
searchQuery.nbrVisite ={$gte:req.body.gte,$lte:req.body.lte};
Conseiller.find(searchQuery).
           select("-photo").
           populate(
                {
                    path:'complexe',
                    model:'Complexe',
                    select:['nom','ville'],
                    match:
                    {
                        nom:{
                            $regex: '.*'+req.body.nomComplexe+'.*',$options:'i'
                        }
                        ,
                        ville:{
                            $regex: '.*'+req.body.villeComplexe+'.*',$options:'i'
                        }
                    }
                }).
exec((err,Conseillers)=>{
    if(err){
        return res.status(400).json({err});
    }
    res.json({Conseillers});
});
}