import mongoose from "mongoose";

export class Validators {


    static isMongoID(id: string) {
        return mongoose.isValidObjectId(id);
        //return /^[0-9a-fA-F]{24}$/.test(String(id));
    }

}
