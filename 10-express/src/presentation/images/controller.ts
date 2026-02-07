import { Request, Response } from "express";
import { CustomError } from "../../domain";
import { ImagesService } from "../services";

export class ImagesController {

    constructor(
        private readonly imagesService: ImagesService,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: true, message: error.message });
        }
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    getImage = async (req: Request, res: Response) => {
        const {type = '', filename = ''} = req.params;
        if(!type || type === '' || !filename || filename == '') this.handleError({statusCode: 400, message: 'Type and filename are required'}, res);

        const response = await this.imagesService.getImage(type, filename);
        res.status(200).json(response);
    }

}
