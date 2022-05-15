const express=require('express');
const router=express.Router();
const {hellow,creatLycee,deleteLycee,updateLycee,chercherLycee,getAllLycee}=require('../Controllers/lyceeController');
const {lyceeValidatore,getLycee}=require('../Middlewares/lycee');
router.get('/',hellow);
router.post('/create',lyceeValidatore,creatLycee);
router.delete('/delete/:lyceeId',deleteLycee);
router.put('/update/:lyceeId',lyceeValidatore,updateLycee);
router.post('/chercher',chercherLycee);
router.get('/getall',getAllLycee);
router.param('lyceeId',getLycee);
module.exports=router;