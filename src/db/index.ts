import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"
import { config } from "dotenv";

config({ path: ".env" });

const sql = neon(process.env.DRIZZLE_DATABASE_URL as string)
export const db = drizzle(sql, { schema })
