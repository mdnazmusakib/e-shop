const express=require('express')
const router=express.Router()
const ownerModel=require('../models/owner_model')

if(process.env.NODE_ENV==="development"){
    router.post('/create',async (req,res)=>{
        let owners= await ownerModel.find()
        if(owners.length>0){
            return res
                .status(504)
                .send('You dont have permission to create a new owner')
        }
        let {fullname,email,password}=req.body
        let createdOwner=await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwner)
    })
}

// etar jnno  middleware lagbe..ar admin login er ekta route and page lagbe i think

router.get('/admin',(req,res)=>{
    let success=req.flash("success");
    res.render('createproducts',{success})
})


module.exports= router;