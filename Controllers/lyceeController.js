const Lycee=require('../Models/lycee');
exports.hellow=(req,res)=>{
    res.json("hellow lycce");
}
exports.creatLycee=async (req,res)=>{
const {nom,ville,adresse}=req.body;
var c= await Lycee.find().and([{nom},{ville},{adresse}]).count();
if(c!=0){
    return res.status(400).json({msg:"cet lycee exist deja !!"});
}
const lycee=new Lycee({nom,ville,adresse});
lycee.save((err,lycee)=>{
    if(err){
        return res.status(400).json({err});
    }
    res.json({lycee});
});
}
exports.deleteLycee=(req,res)=>{
    const lycee=req.lycee;
    lycee.remove((err,l)=>{
        if(err){
            return res.status(400).json({err});
        }
        res.json({msg:"deleted !!"});
    })
}
exports.updateLycee= async (req,res)=>{
    const lycee=req.lycee;
    const {nom,ville,adresse}=req.body;
    var count= await Lycee.find({_id:{$ne:lycee._id}}).and([{nom:nom},{adresse:adresse},{ville:ville}]).count();
    if(count==1){
        return res.status(400).json({msg:"svp cet lycee exist deja !!"});
    }
    lycee.nom=nom;
    lycee.ville=ville;
    lycee.adresse=adresse;
    lycee.save((err,lycee)=>{
        if(err){
            return res.status(400).json({err});
        }
        res.json({lycee});
    })
}
exports.chercherLycee=(req,res)=>{
    var Filters={};
    Filters.nom={$regex:'.*'+req.body.nom+'.*',$options:'i'};
    Filters.ville={$regex:'.*'+req.body.ville+'.*',$options:'i'};
    Filters.adresse={$regex:'.*'+req.body.adresse+'.*',$options:'i'};

    Lycee.find(Filters).select().exec((err,lycees)=>{
        if(err){
            return res.status(400).json({err});
        }
        res.json({lycees});
    })
}
exports.getAllLycee=(req,res)=>{
    Lycee.find().select(["nom","ville","adresse"]).exec((err,lycees)=>{
     if(err){
         return res.status(400).json({err});
    }
    res.json({lycees});
});
}