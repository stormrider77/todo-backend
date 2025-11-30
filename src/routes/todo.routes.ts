import { Router } from "express";
import * as todoController from "../controllers/todo.controller";

const router = Router();

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);

export default router;
