import { Router } from "express";
// import { AuthController } from "./controller";
import { envs } from "../../config";
import { CategoryController } from "./controller";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {

    static get routes(): Router {
        
        const router = Router();

        const categoryService: CategoryService = new CategoryService();

        const controller = new CategoryController(categoryService);

        router.get("/", controller.getCategories);
        router.get("/:id", controller.getCategoryById);
        router.post("/", controller.storeCategory);
        router.put("/:id", controller.updateCategory);
        router.delete("/:id", controller.destroyCategory);

        return router;
    }

}
