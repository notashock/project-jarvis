import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", taskRoutes);

export default app;
