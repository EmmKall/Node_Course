import fs from 'fs';
import path from 'path';
import { CustomError } from '../../domain';

export class ImagesService {

    constructor() {}

    public async getImage(type: string, filename: string) {
        const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${filename}`);
        if(!fs.existsSync(imagePath) ) return CustomError.badRequest(`File: ${filename} of type: ${type} no exist`);
        const image = await fs.readFileSync(imagePath);
        return {error: false, imagePath, image };
    }

}
