const Visite=require('../Models/Visite');
exports.getAll=(req,res)=>{
    Visite.find().select().exec((err,visites)=>{
        if(err){
            return res.status(400).json({err});
        }
        res.status(200).json({visites});
    })
}
exports.createVisite=async(req,res)=>{
const {dateVisite,duree,conseiller,lycee}=req.body;
    c=await Visite.find().select().and([{dateVisite},{conseiller},{lycee}]).count();
    if(c!=0){
        return res.status(400).json({msg:"SVP la visite exist deja !!!"});
    }
    
    const visite=new Visite(req.body);
    visite.save((err,v)=>{
        if(err){
            return res.status(400).json({err});
        }
        res.json({v});
    })
}
exports.deleteVisite=(req,res)=>{
    const visite=req.visite;
    visite.remove((err,v)=>{
     if(err){
         return res.status(400).json({err});
     }
     res.json({msg:"deleted !!"});

    });
}
exports.updateVisite= async (req,res)=>{
    const {dateVisite,duree,conseiller,lycee}=req.body;
    c=await Visite.find({_id:{$ne:req.visite._id}}).select().and([{dateVisite},{conseiller},{lycee}]).count();
    if(c!=0){
        return res.status(400).json({msg:"SVP la visite exist deja !!!"});
    }
    const visite=req.visite;
    visite.dateVisite=dateVisite; 
    visite.duree=duree; 
    visite.conseiller=conseiller; 
    visite.lycee=lycee; 
    visite.save((err,visite)=>{
      if(err){
          return res.status(400).json({err});
      }
      res.json({msg:"updated"});
    });
    
}
const query=[{
    path:'conseiller',
    select:['nom','prenom']
},{
    path:"lycee",
    select:['nom','ville','adresse']
}];
exports.visiteActualiser=(req,res)=>{
    Visite.find().select().
    populate([query]).
    exec((err,visites)=>{
        if(err){
            return res.status(400).json({msg:`error of ${err}`});
        }
        res.json({visites});
    })
    ;
}
exports.searchVisite=(req,res)=>{
    var QureyFind={};
    QureyFind.dateVisite={$gt:req.body.dateVisite};
    QureyFind.duree={$gte:req.body.gteDuree,$lte:req.body.lteDuree};
    var queryPoulate=[
        {
            path:'conseiller',
            model:'Conseiller',
            select:['nom','prenom'],
            match:{
                nom:{$regex:'.*'+req.body.nomConseiller+'.*',$options:'i'},
                prenom:{$regex:'.*'+req.body.prenomConseiller+'.*',$options:'i'}
            }
        },{
            path:"lycee",
            model:"lycee",
            select:['nom','ville','adresse'],
            match:{
                nom:{$regex:'.*'+req.body.nomLycee+'.*',$options:'i'},
                ville:{$regex:'.*'+req.body.villeLycee+'.*',$options:'i'},
                adresse:{$regex:'.*'+req.body.adresseLycee+'.*',$options:'i'}
            }
        }
    ];
    Visite.find(QureyFind).select().populate(queryPoulate).exec((err,visites)=>{
        if(err){
            return res.status(400).json({err:`erro ${err}`});
        }
        res.json({visites});
    })
}