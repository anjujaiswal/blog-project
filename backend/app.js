import express from "express";
import dotenv from "dotenv";
import path from "path";
import appRouter from "./src/app.routes.js";

import cors from "cors";

import bodyParser from "body-parser";
import  {logger }from "./src/middleware/logger.js";

const configPath = path.resolve("src", "config", "env", "test.env");
dotenv.config({ path: configPath });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(logger);
app.use("/api", appRouter);

export default app;
