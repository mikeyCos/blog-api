import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  databaseURL: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  databaseURL: process.env.DATABASE_URL || "",
};

export default config;
