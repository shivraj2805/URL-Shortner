const jwt = require('jsonwebtoken');
const secreteKey = process.env.JWT_SECRET ||"JWT_SECRET_KEY";

function setUser(user){
    return jwt.sign({
        _id: user._id,
        email: user.email,
    },secreteKey);
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secreteKey);
    } catch(err){
        return null;
    }
}

module.exports={setUser,getUser};