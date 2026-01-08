const jwt = require('jsonwebtoken');
const secreteKey = "your_secret_key";

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