import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";


export class FileUploadController {

    constructor(
        private readonly fileUploadService: FileUploadService
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: true, message: error.message });
        }
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    uploadFile = async (req: Request, res: Response) => {
        const type = req.params.type || 'users';
        
        console.log({body: req.body});
        const file = req.body.files.at(0) as UploadedFile;
        const folder = 'uploads';
        const fileSaved = await this.fileUploadService.uploadFile(file, type, folder);
        res.json(fileSaved);
    }

    uploadFiles = async (req: Request, res: Response) => {
        const type = req.params.type || 'users';

        const files = req.body.files;
        const folder = 'uploads';
        const filesSAved = await this.fileUploadService.uploadFiles(files, type, folder)
        res.json(filesSAved);
    }

}
