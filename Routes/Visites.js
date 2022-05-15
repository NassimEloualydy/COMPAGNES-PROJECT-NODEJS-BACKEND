const express=require('express');
const {getAll,createVisite,deleteVisite,updateVisite,visiteActualiser,searchVisite}=require('../Controllers/VisiteController');
const {visiteValidator,getVisiteById}=require('../Middlewares/Visite');
const router=express.Router();
router.get('/getall',getAll);
router.get('/actualiser',visiteActualiser);
router.post('/create',visiteValidator,createVisite);
router.delete('/delete/:visiteId',deleteVisite);
router.put('/update/:visiteId',visiteValidator,updateVisite);
router.post('/search',searchVisite);
router.param('visiteId',getVisiteById);
module.exports=router;