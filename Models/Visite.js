const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
const visiteSchema=new mongoose.Schema({
    dateVisite:{type:Date,required:true},
    duree:{type:Number,required:true},
    conseiller:{type:ObjectId,ref:"Conseiller",required:true},
    lycee:{type:ObjectId,ref:"Lycee",required:true}
},{timestamps:true});

module.exports=mongoose.model('Visite',visiteSchema);