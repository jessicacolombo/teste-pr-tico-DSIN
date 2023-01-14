import "express-async-errors";
import express from "express";
import "reflect-metadata";
import { schedulesRoutes } from "./routes/schedules.routes";
import { userRoutes } from "./routes/users.routes";
import { sessionRoutes } from "./routes/session.routes";
import { errorHandler } from "./errors/errorHandler";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    allowedHeaders: [
      "sessionId",
      "Content-Type",
      "Authorization",
      "authorization",
    ],
    origin: ["http://localhost:3000"],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  })
);
app.use("/login", sessionRoutes);
app.use("/users", userRoutes);
app.use("/schedules", schedulesRoutes);
app.use(errorHandler);

export default app;
