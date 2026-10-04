const express=require('express')
const router=express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn');
const isLoggedInRedirect=require('../middlewares/isLoggedInRedirect');
const productModel = require('../models/product-model');
const userModel=require('../models/user-model')

router.get('/',isLoggedInRedirect,(req,res)=>{
    let error=req.flash('error')
    res.render('index',{error})
})

router.get('/shop',isLoggedIn,async(req,res)=>{
    let products=await productModel.find()
    let success=req.flash("success")
    res.render('shop',{products,success})
})

router.get('/addtocart/:productid',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success",'Added to cart');
    res.redirect('/shop')
})

router.get('/cart',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email}).populate("cart");
    let success=req.flash("success")
    res.render('cart',{user,success})
})

router.post('/buy', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({
            email: req.user.email
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (user.cart.length === 0) {
            return res.redirect('/users/cart');
        }
        user.orders.push(...user.cart);
        user.cart = [];
        await user.save();
        req.flash("success", "Order placed successfully");
        res.redirect('/cart');
    } catch (err) {
        // console.log(err);
        res.status(500).send("Something went wrong while placing order");
    }
});

router.get('/account', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel
            .findOne({ email: req.user.email })
            .populate('orders');
        if (!user) {
            return res.status(404).send("User not found");
        }
        let success = req.flash("success");
        res.render('account', {user,success});
    } catch (err) {
        // console.log(err);
        res.status(500).send("Something went wrong");
    }
});

router.get('/cart/delete/:productId', isLoggedIn, async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await userModel.findOne({
            email: req.user.email
        });
        if (!user) {
            return res.status(404).send("User not found");
        }
        const index = user.cart.indexOf(productId);
        if (index !== -1) {
            user.cart.splice(index, 1);
        }
        await user.save();
        req.flash("success", "Product removed from cart");
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

router.get('/cart/add/:productid',isLoggedIn,async(req,res)=>{
    let user=await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success",'Added to cart');
    res.redirect('/cart')
})


router.get('/logout',isLoggedIn,async(req,res)=>{
    let products=await productModel.find()
    res.render('shop',{products})
})

module.exports= router;