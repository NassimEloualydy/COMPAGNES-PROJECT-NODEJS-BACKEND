const Visite = require("../Models/Visite");
const Conseiller=require("../Models/conseiller");
const Lycee= require("../Models/lycee");
const joi =require('joi');
joi.objectId = require('joi-objectid')(joi)
const mongoose= require('mongoose')
const {ObjectId}=mongoose.Schema;
exports.visiteValidator= async (req,res,next)=>{
    const schema=joi.object({
        dateVisite:joi.string().pattern(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/).required(),
        duree:joi.number().required(),
        conseiller:joi.objectId().required(),
        lycee:joi.objectId().required()
      });
const {error}=schema.validate(req.body);
if(error){
    return res.status(400).json({msg:error.details[0].message});
}      
const {dateVisite,duree,conseiller,lycee}=req.body;
var c=await Lycee.findById(lycee).select().count();
if(c==0){
    return res.status(400).json({msg:"lycee n'exist pas !!"});
}
c=await Conseiller.findById(conseiller).select("-photo").count();
if(c==0){
    return res.status(400).json({msg:"conseiller n'exist pas !!"})
}
next();
}
exports.getVisiteById=(req,res,next,id)=>{
    Visite.findById(id).exec((err,visite)=>{
      if(err || !visite){
        return  res.status(400).json({msg:"SVP cet visite n'exist pas !!!"});
      }
      req.visite=visite;
      next();
    });
}