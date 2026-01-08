const mongoose=require('mongoose');

async function connectMongoDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('Could not connect to MongoDB', err);
    }   
}

module.exports=connectMongoDB;