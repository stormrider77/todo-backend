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
