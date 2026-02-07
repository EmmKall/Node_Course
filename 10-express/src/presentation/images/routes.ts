import { Router } from "express";
import { ImagesController } from "./controller";
import { ImagesService } from "../services";

export class ImagesRoutes {

    static get routes(): Router {
        const router = Router();

        const controller = new ImagesController(new ImagesService());

        router.get("/:type/:filename", controller.getImage);

        return router;
    }

}
