import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService, EmailService } from "../services";
import { envs } from '../../config';

export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    
    const emailService = new EmailService({
      mailerEmail: envs.MAILER_EMAIL,
      mailerSecretKey: envs.MAILER_SECRET_KEY,
      mailerService: envs.MAILER_SERVICE,
    });
    
    const authService: AuthService = new AuthService(emailService);

    const controller = new AuthController(authService);
    
    // Definir las rutas
    router.post('/login', controller.login);
    router.post('/register', controller.register);
    router.get('/validate-email/:token', controller.validateEmail);

    return router;
  }


}

