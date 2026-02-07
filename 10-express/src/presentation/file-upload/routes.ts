import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";

export class FileUploadRoutes {

    static get routes(): Router {
        
        const router = Router();

        const controller = new FileUploadController(new FileUploadService());

        router.post("/one/:type", controller.uploadFile);
        router.post("/many/:type", controller.uploadFiles);

        return router;
    }

}
