import express from "express";
import todoRoutes from "./routes/todo.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;
