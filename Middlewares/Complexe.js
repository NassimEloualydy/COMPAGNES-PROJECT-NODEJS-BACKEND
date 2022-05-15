const Complexe=require('../Models/complexe');
exports.complexeById=(req,res,next,id)=>{
 Complexe.findById(id).exec((err,complexe)=>{
     if(err){
         return res.status(404).json({err});
     }
     req.complexe=complexe;
     next();
 });
}