const mongoose=require('mongoose');
const lyceeSchema=new mongoose.Schema({
    nom:{type:String,required:true,trim:true},
    adresse:{type:String,required:true,trim:true},
    ville:{type:String,required:true,trim:true}
},{timestamps:true});
module.exports=mongoose.model('lycee',lyceeSchema);