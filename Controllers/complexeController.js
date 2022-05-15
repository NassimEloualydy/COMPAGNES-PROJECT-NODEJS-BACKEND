const Complexe=require('../Models/complexe');
exports.createComplexe= async (req,res)=>{
    const {nom,ville}=req.body;
    const c=await Complexe.find()
    .and([{nom},{ville}])
    .count();
    if(c!=0){
        return res.status(400).json({msg:"SVP cet comlexe exist deja !!"});
    }
    const complexe=new Complexe(req.body);
    complexe.save((err,c)=>{
        if(err){
            return res.status(400).json({err});
        }
        res.json({c});
    })
}
exports.deleteComplexe=(req,res)=>{
    const c=req.complexe;
    c.remove((err,c)=>{
     if(err){
         return res.status(400).json({err});
     }
     res.status(200).json({msg:"deleted !!!!"});
    });
}
exports.updateComplexe=async (req,res)=>{
    const complexe=req.complexe;
    const {nom,ville}=req.body;
    const c=await Complexe.find({_id:{$ne:complexe._id}}).and([{nom},{ville}]).count();
    if(c!=0){
        return res.status(400).json({msg:"SVP le nom et la ville exsit deja !! "});
    }
    complexe.nom=req.body.nom;
    complexe.ville=req.body.ville;
    complexe.save((err,complexe)=>{
        if(err){
           return res.ststus(400).json({err});
        }
        res.json({complexe});
    });
}
exports.searchComplexe= async (req,res)=>{
var searchQuery = {};
searchQuery.ville = {$regex: req.body.ville, $options: 'i'};
searchQuery.nom = {$regex: req.body.nom, $options: 'i'};
Complexe.find(searchQuery, function(error, c) {
                if(error || c === null) {
                    return res.status(500).json({error});
                }
                return res.status(200).send(c);
            });
}
exports.getAllComplexes=(req,res)=>{
    Complexe.find().select("-_id").exec((err,complexes)=>{
     if(err){
         return res.status(400).json({err});
     }
     res.json({complexes})
    });
}

