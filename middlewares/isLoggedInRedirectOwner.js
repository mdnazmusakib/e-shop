const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.cookies && req.cookies.tokenOwner) {
        try {
            jwt.verify(req.cookies.tokenOwner, process.env.JWT_KEY);
            return res.redirect('/owners/admin');

        } catch (err) {
            next();
        }
    } else {
        next();
    }
};