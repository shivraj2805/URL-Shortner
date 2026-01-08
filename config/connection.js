const mongoose=require('mongoose');

async function connectMongoDB(){
    try{
        await mongoose.connect('mongodb://localhost:27017/shorturl');
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('Could not connect to MongoDB', err);
    }   
}

module.exports=connectMongoDB;