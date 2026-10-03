const mongoose=require('mongoose')

const ownerSchema=mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    isadmin: Boolean,
    products:[],
    contact: Number,
    picture: String,
    gstin: String,
});

module.exports=mongoose.model('owner',ownerSchema);