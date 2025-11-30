import prisma from "../lib/prisma";

export const getTodos = () => {
  return prisma.todo.findMany({
    where: {
      deletedAt: null,
    },
  });
};

export const createTodo = (data: { title: string; description: string; userId?: number }) => {
  return prisma.todo.create({
    data,
  });
};

export const updateTodo = async (id: number, userId: number, data: { title?: string; description?: string; completed?: boolean }) => {
  // First check if todo exists and is not soft-deleted
  const todo = await prisma.todo.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!todo) {
    throw new Error("Todo not found or has been deleted");
  }

  return prisma.todo.update({
    where: { id },
    data,
  });
};

export const deleteTodo = (id: number, userId: number) => {
  return prisma.todo.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
};