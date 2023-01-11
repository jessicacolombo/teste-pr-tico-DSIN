import "express-async-errors";
import express from "express";
import "reflect-metadata";
import { errorHandler } from "./errors/errorHandler";

const app = express();
app.use(express.json());

app.use(errorHandler);

export default app;
