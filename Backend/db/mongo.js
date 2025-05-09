import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.set('debug', true);

export async function main() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI not defined in .env file");
    }

    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

main()
    .then(() => {
        console.log('MongoDB connected successfully!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
