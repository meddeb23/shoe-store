const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req,res,next)  => {
    try {
        const { token } = req.cookies;
        if (token) {
            const decode = jwt.verify(token, JWT_SECRET);
            if (!decode)  return res.status(401).json({msg:"Access Deneied"});
            const user = await User.findById(decode._id)
            if(!user) res.status(401).json({msg:"Access Deneied"});
            req.body = {
                ...req.body,
                user
            };
            next();
            }
        else{
            res.status(401).json({msg:"Access Deneied"});
        }
    } catch (error) {
        throw (error)
    }
}
const isAdmin = async (req,res, next) => {
    try {
        const { token } = req.cookies;
        if (token) {
            const decode = jwt.verify(token, JWT_SECRET);
            if (!decode)  return res.status(401).json({msg:"Access Deneied"});
            
            const user = await User.findById(decode._id)
            if(!user) res.status(401).json({msg:"Access Deneied"});

            if( user.isAdmin){
                req.body = {
                    ...req.body,
                    user: decode._id,
                };
                next();
            }
            
            
            else{
                res.status(403).json({msg:"Access Forbidden"});
            }
            
            }
        else{
            res.status(401).json({msg:"Access Deneied"});
        }
    } catch (error) {
        throw (error)
    }
}

module.exports = {auth, isAdmin}