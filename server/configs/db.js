 // config file for database connection
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
    try {
        const conn = await mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        });
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;
