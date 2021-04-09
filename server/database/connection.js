const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(
            `mongodb+srv://agam:hello123@cluster0.65b2z.mongodb.net/CRUD?retryWrites=true&w=majority`,
             {
                 useNewUrlParser: true,
                  useUnifiedTopology: true,
                  useCreateIndex: true,
                 useFindAndModify: false,
        
             }
        )

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB