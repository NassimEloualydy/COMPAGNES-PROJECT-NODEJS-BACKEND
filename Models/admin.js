const mongoose=require('mongoose');
const crypto=require('crypto');
const adminSchema=new mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    login:{type:String,required:true},
    hashed_pw:{type:String,required:true}
},{timestamps:true});
adminSchema.virtual('pw').set(function(pw){
 this._pw=pw;
 this.hashed_pw=this.cryptPw(pw);
});
adminSchema.methods={
    cryptPw:function(pw){
        if(!pw) return '';
        try{
            return crypto.createHmac('sha1',this.nom+this.prenom).
            update(pw).
            digest('hex');
        }catch(err){
            return '';
        }
    }
}
module.exports=mongoose.model('Admin',adminSchema);
