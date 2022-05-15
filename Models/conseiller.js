const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
const conseillerSchema=new mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    nom:{type:String,required:true,trim:true},
    prenom:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    nbrVisite:{type:Number,required:true,trim:true},
    complexe:{type:ObjectId,ref:"Complexe",require:true}
},{timestamps:true});
module.exports=mongoose.model('Conseiller',conseillerSchema);
