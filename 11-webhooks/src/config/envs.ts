import 'dotenv/config';
import{get} from  'env-var';

import { env } from "node:process";

export const Envs = {
    PORT: get('PORT').required().asPortNumber(),
    DISCORD_WEBHOOK_URL: get('DISCORD_WEBHOOK_URL').required().asString(),
    SECRET_TOKEN: get('SECRET_TOKEN').required().asString(),

}
