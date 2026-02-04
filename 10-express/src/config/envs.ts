import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  API_URL: get("API_URL").required().asString(),
  PORT: get("PORT").required().asPortNumber(),
  MONGODB_NAME: get("MONGODB_NAME").required().asString(),
  MONGODB_URL: get("MONGODB_URL").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
};



