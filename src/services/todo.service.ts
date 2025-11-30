import prisma from "../lib/prisma";

export const getTodos = () => {
  return prisma.todo.findMany();
};

export const createTodo = (data: { title: string }) => {
  return prisma.todo.create({
    data,
  });
};
