const express=require('express')
const router=express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn')

router.get('/',(req,res)=>{
    let error=req.flash('error')
})

router.get('/shop',isLoggedIn,(req,res)=>{
    res.send('shop e jaite parbo')
})

module.exports= router;