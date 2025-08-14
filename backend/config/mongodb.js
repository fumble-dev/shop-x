import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('db connected')
    } catch (error) {
        console.error('DB Connection Error:', error);
    }
};

export default connectToDb;
