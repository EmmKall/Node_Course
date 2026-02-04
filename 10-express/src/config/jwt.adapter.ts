import jwt, { SignOptions } from "jsonwebtoken";
import { envs } from "./envs";

const SEED_JWT = envs.JWT_SEED || "default_secret";

export class JwtAdapter {


    static async generateToken(payload: object, expiresIn: string = '2h'): Promise<string> {
        return new Promise((resolve) => {
            jwt.sign(payload, SEED_JWT, { expiresIn } as SignOptions, (err, token) => {
                if (err) return resolve("");
                resolve(token!);
              },
            );
        });
    }

    static validateToken<T>(token: string): Promise<T|null>  {
        return new Promise( (resolve) => {
            jwt.verify(token, SEED_JWT, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            })
        })
    }

}
