import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import fs from "fs"

if (!fs.existsSync("./certs/ca.pem")) {
  throw new Error(
    "Missing ca.pem. Download the Aiven CA certificate and place it in the project root."
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    ca: fs.readFileSync("./certs/ca.pem", "utf8"),
  },
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
});