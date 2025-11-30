import prisma from "../lib/prisma";

export const getTodos = () => {
  return prisma.todo.findMany();
};

export const createTodo = (data: { title: string }) => {
  return prisma.todo.create({
    data,
  });
};

export const updateTodo = (id: number, data: { title?: string; description?: string; completed?: boolean }) => {
  return prisma.todo.update({
    where: { id },
    data,
  });
};

export const deleteTodo = (id: number) => {
  return prisma.todo.delete({
    where: { id },
  });
};