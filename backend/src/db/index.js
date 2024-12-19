import mongoose from 'mongoose';


const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.MONGO_DB_NAME}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message} || from db/index.js`);
        process.exit(1);
    }
};

export { connectDB };