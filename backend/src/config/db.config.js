import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.NODE_ENV.MONGO_URI);
        console.log("Database Connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;