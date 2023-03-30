import dotenv from "dotenv";

if (process.env.NODE_ENV === "local") {
  dotenv.config({ path: "src/config/.env.local" });
} else if (process.env.NODE_ENV === "prod") {
  dotenv.config({ path: "src/config/.env.prod" });
}
