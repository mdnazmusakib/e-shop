const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.cookies && req.cookies.token) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_KEY);
            return res.redirect('/shop');

        } catch (err) {
            next();
        }
    } else {
        next();
    }
};