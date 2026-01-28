import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { envs } from "../../config/envs.js";

const db = drizzle(envs.POSTGRES_URL);