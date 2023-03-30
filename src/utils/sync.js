import db from "../models/index.js";

await db.users.sync({ force: true });

await db.sequelize.close();