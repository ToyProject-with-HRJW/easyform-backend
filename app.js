import express from "express";
import "./src/utils/config.js";
import authRouter from "./src/routes/auth.js";
import "./src/models/index.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load("src/swagger/swagger.yaml"))
);

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(4000, function () {
  console.log("server has started on port 4000");
});
