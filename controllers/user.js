const User=require('../models/user');
const {v4:uuidv4}=require('uuid');
const {setUser,getUser}=require('../service/auth');

async function handleUserSignup(req,res) {
    const {username, email, password} = req.body;
    // Logic to handle user signup
    await User.create({username, email, password});
    return res.render('home')
}

async function handleUserLogin(req,res) {
    const {email, password} = req.body;
   
    const user=await User.findOne({email,password});
    if(!user){
        return res.render('login',{message:"Invalid Credentials"});
    }

    
    const token=setUser(user);
    res.cookie('uid',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production'
    });
    return res.redirect('/')
}

module.exports={handleUserSignup,handleUserLogin};