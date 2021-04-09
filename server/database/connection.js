const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async ()=>{
    try{
    //MOngoDB Connection String
    const con = await mongoose.connect(`mongodb+srv://agam:hello123@cluster0.65b2z.mongodb.net/CRUD?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })

    console.log(`Database connected : ${con.connection.host} `);
    }catch(err){
        console.log(err);
        process.exit(1);
         
    }

    
}
module.exports = connectDB;