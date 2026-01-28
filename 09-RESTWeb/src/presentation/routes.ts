import { Router } from "express";
import { TodoRoutes } from "../implementation/todos/routes";

export class AppRoutes {

    constructor() {}

    static get routes(): Router {
        const router = Router();
        router.use('/todo', TodoRoutes.routes);
        router.use('/auth', TodoRoutes.routes);
        router.use('/user', TodoRoutes.routes);
        router.use('/products', TodoRoutes.routes);
        return router;
    }

}
