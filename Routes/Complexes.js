const express=require('express');
const Router=express.Router();
const {complexeById}=require('../Middlewares/Complexe');
const {ComplexeValidator}=require('../Middlewares/ComplexeVlaidator');
const {createComplexe,deleteComplexe,updateComplexe,searchComplexe,getAllComplexes}=require('../Controllers/complexeController');
Router.post('/create',ComplexeValidator,createComplexe);
Router.delete('/delete/:complexeId',deleteComplexe);
Router.put('/update/:complexeId',ComplexeValidator,updateComplexe);
Router.post('/search',searchComplexe);
Router.get('/getAll',getAllComplexes);
Router.param('complexeId',complexeById)
module.exports=Router;