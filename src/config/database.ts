import mongoose, {Mongoose} from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {conn: null, promise: null};
}

export async function connectDB(): Promise<any> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            minPoolSize: 2,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        }

        cached.promise = mongoose.connect(MONGODB_URI as string, opts)
            .then((mongooseInstance) => {
                console.log("✔ MongoDB connection successful")
                return mongooseInstance;
            }).catch((error) => {
                console.error("MongoDB connection Error:", error);
                cached.promise = null;
                throw error;
            })
    }

    cached.conn = await cached.promise;
    return cached.conn;
}