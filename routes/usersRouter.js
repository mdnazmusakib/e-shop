const express=require('express')
const router=express.Router()
const {registerUser}=require('../controllers/authControllers')


router.get('/',(req,res)=>{
    res.send('hey!!!its working..i am user')
})


router.post('/register',registerUser)

module.exports= router;