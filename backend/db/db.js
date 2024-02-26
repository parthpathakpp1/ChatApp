import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(
            'Connected to MongoDB '
        );
    } catch (error) {
        console.log(`Error in Mongodb ${error}`);
    }
};

export default connectDB;