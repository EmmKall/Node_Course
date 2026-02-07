import {Request, Response, NextFunction} from "express";
import { CustomError } from "../../domain";
import { UploadedFile } from "express-fileupload";



export class FileUploadMiddleware {

    

    static containFiles(req: Request, res: Response, next: NextFunction){

        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json(CustomError.badRequest('No files were uploaded.'));
        }
        
        if(!Array.isArray(req.files.file)) req.body.files = [req.files.file];
        else  req.body.files = req.files.file;

        const validExtensions: string[] = ['png', 'jpg', 'jpeg', 'git', 'webp'];

        req.body.files.forEach((file: UploadedFile) => {
            const fileExtension = file.mimetype.split('/').at(1) ?? '';
            if(!validExtensions.includes(fileExtension)) res.json(CustomError.badRequest(`Invalid extension: ${fileExtension}, valid extensions: ${validExtensions.join(', ')}`));
        });
        

        next();
    }

}
