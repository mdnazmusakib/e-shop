const express=require('express')
const router=express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel=require('../models/user-model')

router.get('/',(req,res)=>{
    let error=req.flash('error')
    res.render('index',{error})
})

router.get('/shop',isLoggedIn,async(req,res)=>{
    let products=await productModel.find()
    let success=req.flash("success",)
    res.render('shop',{products,success})
})

router.get('/addtocart/:productid',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid);
    user.save();
    req.flash("success",'Added to cart');
    res.redirect('/shop')
})

router.get('/cart',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate("cart");
    res.render('cart',{user})
})


router.get('/logout',isLoggedIn,async(req,res)=>{
    let products=await productModel.find()
    res.render('shop',{products})
})

module.exports= router;