import { userRoutes } from "./routes/users.routes";
import { sessionRoutes } from "./routes/session.routes";
import "express-async-errors";
import express from "express";
import "reflect-metadata";
import { errorHandler } from "./errors/errorHandler";

const app = express();
app.use(express.json());

app.use(errorHandler);
app.use("/login", sessionRoutes);
app.use("/users", userRoutes);

export default app;
