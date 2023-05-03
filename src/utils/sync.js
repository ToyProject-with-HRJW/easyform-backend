import "./config.js";
import db from "../models/index.js";

await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

await db.manage_sns_platform.sync({ force: true });
await db.user.sync({ force: true });
await db.survey.sync({ force: true });

await db.manage_sns_platform.bulkCreate([
  { name: "google" },
  { name: "kakao" },
  { name: "naver" },
]);

await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

db.sequelize.close();
