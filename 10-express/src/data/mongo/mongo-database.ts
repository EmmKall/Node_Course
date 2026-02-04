import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {

    static async connect(options: ConnectionOptions): Promise<boolean> {
        const { mongoUrl, dbName } = options;
        try {
            await mongoose.connect(mongoUrl, { dbName });
            // console.log('Connected to MongoDB');
            return true;
        }catch(err) {
            console.error('Error connecting to MongoDB:', err);
            throw err;
        }
    }

    static async disconnect() {
        await mongoose.disconnect();
    }

}

