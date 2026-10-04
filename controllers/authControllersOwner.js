const ownerModel=require('../models/owner_model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const isLoggedInOwner = require('../middlewares/isLoggedInOwner');
const {generateTokenOwner}=require('../utils/generateTokenOwner')

const ownerLoginSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
    password: joi.string().required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    })
});

module.exports.login=async (req, res) => {
    const { error, value } = ownerLoginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        req.flash("error", error.details[0].message); 
        return res.redirect('/owners/login');
    }

    try {
        const { email, password } = value;

        let owner = await ownerModel.findOne({ email });
        if (!owner) {
            req.flash("error", "Invalid email or password");
            return res.redirect('/owners/login');
        }

        let isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            req.flash("error", "Invalid email or password");
            return res.redirect('/owners/login');
        }

        let token = generateTokenOwner(owner)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        return res.redirect('/owners/admin');

    } catch (err) {
        req.flash("error", "Something went wrong during login");
        return res.redirect('/owners/login');
    }
}

module.exports.logout= (req,res)=>{
    res.cookie("token","")
    res.redirect('/')
}