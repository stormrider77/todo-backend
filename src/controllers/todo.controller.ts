import { Request, Response } from "express";
import * as todoService from "../services/todo.service";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await todoService.getTodos();
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const todo = await todoService.createTodo(req.body);
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const todo = await todoService.updateTodo(parseInt(id), userId, req.body);
    res.json(todo);
  } catch (error: any) {
    if (error.message === "Todo not found or has been deleted") {
      return res.status(404).json({ error: error.message });
    }
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const todo = await todoService.deleteTodo(parseInt(id), userId);
    res.status(200).json({ 
      message: "Todo deleted successfully",
      todo 
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(500).json({ error: error.message });
  }
};