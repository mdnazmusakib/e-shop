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


module.exports.registerUser = async(req,res)=>{
    const { error, value } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ 
            success: false, 
            errors: errorMessages 
        });
    }
    try{
        let{fullname,email,password}=req.body;
        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Unable to process registration with this email. Please try logging in.'
            });
        }

        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(password, salt,async(err, hash)=> {
                if(err) return res.send(err.message);
                else{
                    let createdUser=await userModel.create({
                        fullname,
                        email,
                        password:hash,
                    })

                    let token= generateToken(createdUser)
                    res.cookie("token",token);

                    res.status(201).send(createdUser);
                }
            });
        });
    }
    catch(err){
        dbgr(err.message)
        res.status(400).send(err.message);
    }
}