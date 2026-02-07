import { UploadedFile } from "express-fileupload";
import { getUUID } from "../../config";
import { CustomError } from "../../domain";
import path from "path";
import fs from "fs";

export class FileUploadService {

    private readonly validTypes = ['users', 'products', 'categories'];

    constructor() {

    }

    private checkFolder(filePath: string ) {
        if(!fs.existsSync(path.resolve(filePath))){
            fs.mkdirSync(filePath);
        }
    }

    public async uploadFile(file: UploadedFile, type: string, folder: string = 'uploads') {

        try {
            if (!this.isValidType(type)) { return {error: true, message: `Invalid type: ${type}, valid types: ${this.validTypes.join(', ')}`} }
            
            const fileName = await this.saveFile(file, folder, type);
            return {error: false, message: 'File saved', fileName};
        }catch(err){
            return {error: true, message: `Error uploading file: ${err}`};
        }
    }

    public async uploadFiles(files: UploadedFile[], type: string, folder: string = 'uploads') {
        if (!this.isValidType(type)) { return {error: true, message: `Invalid type: ${type}, valid types: ${this.validTypes.join(', ')}`} }
        try{
        
            const filesName: string[] = await Promise.all(
                    files.map(file => this.saveFile(file, folder, type))
            );
             return {error: false, message: 'Files saved', filesName};
        }catch(err){
            return {error: true, message: `Error uploading file: ${err}`};
        }
    }
    
    private isValidType(type: string): boolean {
        return this.validTypes.includes(type);
    }

    private async saveFile(file: UploadedFile, folder: string, type: string) {
        const fileExtension = file.mimetype.split('/').at(1) ?? '';
        const fileName = `${getUUID()}.${fileExtension}`;
        const destination = path.resolve(__dirname, '../../../', folder, type);
        this.checkFolder(destination);
            
        await file.mv(`${destination}/${fileName}`);
        return fileName;
    }

}
