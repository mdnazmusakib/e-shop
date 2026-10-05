const userModel=require('../models/user-model')
const joi=require('joi')
const dbgr=require('debug')('development:userRouter')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {generateToken}= require('../utils/generateToken')

const registerSchema = joi.object({
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

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    })
});


module.exports.registerUser = async(req,res)=>{
    const { error, value } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        req.flash("error", errorMessages);

        return res.redirect('/');

    }
    try{
        let{fullname,email,password}=req.body;
        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            req.flash(
                "error",
                "Unable to process registration with this email. Please try logging in."
            );
            return res.redirect('/');
        }

        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(password, salt,async(err, hash)=> {
                if(err){
                    req.flash("error", "Something went wrong. Please try again.");
                    return res.redirect('/');
                } 
                else{
                    let createdUser=await userModel.create({
                        fullname,
                        email,
                        password:hash,
                    })

                    let token= generateToken(createdUser)
                    res.cookie("token",token);

                    res.redirect('/shop')
                }
            });
        });
    }
    catch(err){
        dbgr(err.message)
        req.flash("error", "Something went wrong. Please try again.");

        res.redirect('/');
    }
}

module.exports.loginUser= async(req,res)=>{
    const { error, value } = loginSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        req.flash("error", errorMessages);

        return res.redirect('/');
    }
    let{email,password}=req.body
    let user=await userModel.findOne({email})
    if(!user){
        req.flash("error", "Email or Password incorrect");

        return res.redirect('/');
    }
    
    bcrypt.compare(password,user.password,(err,result)=>{
        if (err) {
                req.flash("error", "Something went wrong. Please try again.");
                return res.redirect('/');
            }
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                return res.redirect('/shop');

            } else {
                req.flash("error", "Email or Password incorrect");
                return res.redirect('/');
            }
    })
}

module.exports.logout= (req,res)=>{
    res.cookie("token","")
    res.redirect('/')
}