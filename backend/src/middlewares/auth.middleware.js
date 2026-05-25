const foodPartnerModel = require('../models/foodPartner.model.js');
const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');


// middleware always has 3 parameters
async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ 
            message: 'login first' 
        });
    }

    // we use try and catch because if the token is invalid, jwt.verify will throw an error which is handled in catch block
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner;
        next();
    } catch(err) {
        return res.status(401).json({ 
            message: 'invalid token' 
        });
    }
}

async function authUserMiddleware(req, res, next) {
        const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ 
            message: 'login first' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    } catch(err) {
        return res.status(401).json({ 
            message: 'invalid token' 
        });
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}