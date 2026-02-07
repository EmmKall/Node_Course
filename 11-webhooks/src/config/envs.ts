import 'dotenv/config';
import{get} from  'env-var';

import { env } from "node:process";

export const Envs = {
    PORT: get('PORT').required().asPortNumber(),
}
