import prisma from "../config/prisma";
import { User, userId, CreateUser } from "../interfaces/user";

// How can I throw error from services to endpoint?
export const createUser = async ({ username, password }: CreateUser) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      blog: {
        create: {},
      },
    },
  });

  return user;
};

export const getUser = async (userId: userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const deleteUser = async (userId: userId) => {
  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return user;
};

export const deleteUsers = async () => {
  await prisma.user.deleteMany();
};
