import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import { readdirSync } from "fs";
import association from "../utils/association.js";
const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT } =
  process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  dialect: "mysql",
  host: MYSQL_HOST,
  port: MYSQL_PORT,
});

const db = { sequelize, Sequelize };
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  await sequelize.authenticate();
  const files = readdirSync(__dirname).filter(
    (file) => file !== path.basename(__filename)
  );

  for await (const file of files) {
    const model = await import("./" + file);
    const namedModel = model.default(db.sequelize, DataTypes);
    db[namedModel.name] = namedModel;
  }
  association(db);
  console.log("connected database");
} catch (err) {
  console.error("occurred error in database connecting", err);
}

export default db;
