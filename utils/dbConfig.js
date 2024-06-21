import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from '@/utils/schema'

config({ path: ".env" });

const sql = neon("postgresql://expensetrackerdb_owner:f5wihPZUOeJ3@ep-calm-lab-a5nbfu0c.us-east-2.aws.neon.tech/expensetrackerdb?sslmode=require");
export const db = drizzle(sql,schema);
