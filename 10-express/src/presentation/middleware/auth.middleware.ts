import {Request, Response, NextFunction} from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
    
    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({msg: 'No token, authorization denied'});
        if (!authorization.startsWith("Bearer")) return res.status(401).json({msg: 'Invalid token'});
        const token = authorization.split(' ').at(1) || '';
        try {
            const payload = await JwtAdapter.validateToken(token);
            if(!payload) return res.status(401).json({msg: 'Invalid token'});
            const {id} = payload as any;
            const user = await UserModel.findById(id); 
            if(!user) return res.status(401).json({msg: 'Invalid token'}); // - User no valid
            if(!user.isVerifyed) return res.status(401).json({msg: 'Invalid token'}); //- user not verified

            req.body.user = UserEntity.toObject(user);
            next();

        } catch(err) {
            console.log(err);
            res.status(500).json({msg: `Internal error: ${err}`});
        }
    }

}
