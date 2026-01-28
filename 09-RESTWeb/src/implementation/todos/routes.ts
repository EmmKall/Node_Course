import { Router } from "express";
import { TodoController } from "./controller";

export class TodoRoutes {

    constructor() {}

    static get routes(): Router {
        const router = Router();
        const todoController = new TodoController();
        router.get('/test', todoController.getTest);
        router.get('/', todoController.getData);
        router.get('/:id', todoController.getById);
        router.post('/', todoController.create);
        router.put('/:id', todoController.update);
        router.put("/complete/:id", todoController.complete);
        router.delete('/:id', todoController.delete);
        return router;
    }

}
