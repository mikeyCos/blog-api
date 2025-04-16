import prisma from "../config/prisma";
import { Id, User } from "../interfaces/user";

interface NewUser {
  username: string;
  password: string;
}

// How can I throw error from services to endpoint?
export const createUser = async ({ username, password }: NewUser) => {
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

export const getUser = async (id: Id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const deleteUser = async (id: Id) => {
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return user;
};

export const deleteUsers = async () => {
  await prisma.user.deleteMany();
};
