const mongoose=require('mongoose');
const crypto=require('crypto');
const {v4:uuidv4}=require('uuid');
const complexeSchema=new mongoose.Schema({
    nom:{type:String,required:true},
    ville:{type:String,required:true}
},{timestamps:true})
module.exports=mongoose.model('Complexe',complexeSchema);