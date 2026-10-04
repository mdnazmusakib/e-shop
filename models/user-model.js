const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    fullname: {
        type: String,
        minlength: 3,
        trim: true
    },
    email: String,
    password: String,
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        qunatity: Number,
        ref: 'product',
    }],
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }],
    contact: Number,
    picture: String,

});

module.exports=mongoose.model('user',userSchema);

// future scope->
// cart: [
//         {
//             product: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'product',
//                 required: true
//             },
//             quantity: {
//                 type: Number,
//                 default: 1,
//                 min: 1
//             }
//         }
//     ]