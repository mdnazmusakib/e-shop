const express=require('express')
const router=express.Router()
const ownerModel=require('../models/owner_model')
const bcrypt = require('bcrypt');
const joi = require('joi');
const isLoggedInOwner = require('../middlewares/isLoggedInOwner');
const {login,logout}=require('../controllers/authControllersOwner')
const productModel =require('../models/product-model')

const ownerCreateSchema = joi.object({
    fullname: joi.string().min(3).trim().required().messages({
        'string.empty': 'Fullname is required',
        'string.min': 'Fullname must be at least 3 characters long',
        'any.required': 'Fullname is a required field'
    }),
    email: joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
});


if(process.env.NODE_ENV==="development"){
    router.post('/create',async (req,res)=>{

        const { error, value } = ownerCreateSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ 
                success: false, 
                errors: errorMessages 
            });
        }

        let owners= await ownerModel.find()
        if(owners.length>0){
            return res
                .status(403)
                .send('You dont have permission to create a new owner')
        }
        let {fullname,email,password}=req.body

        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(password, salt,async(err, hash)=> {
                if(err) return res.send(err.message);
                else{
                    let createdOwner=await ownerModel.create({
                        fullname,
                        email,
                        password:hash
                    })
                    res.status(201).send(createdOwner)
                }
            });
        });
    })
}

router.get('/login', (req, res) => {
    let error = req.flash("error");
    res.render('owner-login', { error });
});


router.post('/login', login);
router.get('/logout', logout)

router.get('/shop',isLoggedInOwner,async(req,res)=>{
    let products=await productModel.find()
    res.render('shop',{products})
})

router.get('/admin',isLoggedInOwner,(req,res)=>{
    let success=req.flash("success");
    res.render('createproducts',{success})
})


module.exports= router;