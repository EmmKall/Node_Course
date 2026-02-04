import { Router } from "express";
// import { AuthController } from "./controller";
import { envs } from "../../config";
import { ProductController } from "./controller";
import { ProductService } from "../services/product.service";

export class ProductRoutes {

    static get routes(): Router {
        
        const router = Router();

        const productService: ProductService = new ProductService();

        const controller = new ProductController(productService);

        router.get("/", controller.getProducts);
        router.get("/:id", controller.getById);
        router.post("/", controller.storeProduct);
        router.put("/:id", controller.updateProduct);
        router.delete("/:id", controller.destroyProduct);

        return router;
    }

}
