import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        mongoose.connection.on('connected', () => {
            console.log('DB Connected');
        });
    } catch (error) {
        console.error('DB Connection Error:', error);
    }
};

export default connectToDb;
