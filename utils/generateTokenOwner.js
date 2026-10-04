const jwt=require('jsonwebtoken')

const generateTokenOwner=(owner)=>{
    return jwt.sign(
            { email: owner.email, id: owner._id, role: 'owner' },
            process.env.JWT_KEY,
            { expiresIn: '1d' }
        );
}

module.exports.generateTokenOwner= generateTokenOwner