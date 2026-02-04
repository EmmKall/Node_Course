import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../../domain';
import { VerifyUserDto } from '../../domain';

export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json({ error: true, message: error.message });
        }
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    register = (req: Request, res: Response) => {
        const [error, registerData] = RegisterUserDto.create(req.body);
        if (error) return res.status(400).json({ error });
        this.authService.register(registerData!)
        .then(user => res.status(201).json({ error: false, data: user }))
        .catch(err => this.handleError(err, res));
    }
    
    login = (req: Request, res: Response) => {
        const [ error, loginData ] = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });

        this.authService.login( loginData! )
        .then( user => res.status(200).json({ error: false, data: user }) )
        .catch( err => this.handleError(err, res) );
    }

    validateEmail = (req: Request, res: Response) => {
        const [error, verifyUserDto] = VerifyUserDto.create(req.params);
        if( error ) return res.status(400).json({ error });
        const {token} = VerifyUserDto.fromObject(verifyUserDto!);
        this.authService.validateEmail(token)
        .then( () => res.status(200).json({ error: false, msg: 'Email validated successfully' }) )
        .catch( err => this.handleError(err, res) );
    }

}