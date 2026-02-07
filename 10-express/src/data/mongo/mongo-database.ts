import mongoose from "mongoose";
import { CustomError } from "../../domain";

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
            throw CustomError.internalError(`Error connection to MongoDB: ${err}`);
        }
    }

    static async disconnect() {
        await mongoose.disconnect();
    }

}

