import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import { readdirSync } from "fs";

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  dialect: "mysql",
  host: MYSQL_HOST,
  port: 3306,
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
  console.log("connected database");

  // await db.users.sync({ force: true });
} catch (err) {
  console.error("occurred error in database connecting", err);
}

export default db;
