const express=require('express');
const mongoose=require('mongoose');
const complexRouter=require('./Routes/Complexes');
const conseillerRouter=require('./Routes/Conseilles');
const expressValidator=require('express-validator');
const lyceeRouter=require('./Routes/lycee');
const visiteRouter=require('./Routes/Visites');
const adminRouter=require('./Routes/Admin');
const cookieParser=require('cookie-parser')
require('dotenv').config();
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/api/complexe',complexRouter);
app.use('/api/conseiller',conseillerRouter);
app.use('/api/lycee',lyceeRouter);
app.use('/api/visite',visiteRouter);
app.use('/api/admin',adminRouter);
const PORT=process.env.PORT;
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).
then(()=>console.log("connect ..")).
catch((err)=>console.log(err));
app.listen(PORT,()=>{
    console.log(`server start on port ${PORT}`);
})
