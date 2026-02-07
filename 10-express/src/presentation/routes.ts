import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './product/routes';
import { AuthMiddleware } from './middleware/auth.middleware';
import { FileUploadRoutes } from './file-upload/routes';
import { FileUploadMiddleware } from './middleware/file-upload.middlewate';
import { ImagesRoutes } from './images/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/category', [AuthMiddleware.validateJWT], CategoryRoutes.routes );
    router.use("/api/product", [AuthMiddleware.validateJWT], ProductRoutes.routes);
    router.use("/api/files", [AuthMiddleware.validateJWT, FileUploadMiddleware.containFiles], FileUploadRoutes.routes);
    router.use("/api/images", [AuthMiddleware.validateJWT], ImagesRoutes.routes);

    return router;
  }


}
