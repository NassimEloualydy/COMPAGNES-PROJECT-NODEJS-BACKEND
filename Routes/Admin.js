const express=require('express');
const router=express.Router();
const {hellow,updateAdmin,getProfile}=require('../Controllers/adminController');
const {signup,signin,signout,getAdmin}=require('../Controllers/auth');
const {authValidator,requireSignin}=require('../Middlewares/auth');
router.get('/hellow',requireSignin,hellow);
router.post('/signup',authValidator,signup);
router.post('/signin',signin);
router.get('/signout',signout);
router.get('/getAdmin',requireSignin,getAdmin);
router.put('/update',requireSignin,updateAdmin);
router.get('/getProfile',requireSignin,getProfile)
module.exports=router;
