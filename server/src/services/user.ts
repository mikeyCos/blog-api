import prisma from "../config/prisma";
import { Id, User } from "../interfaces/user";

export const createUser = async ({}) => {
  /* const user = await prisma.user.create({
    data: {
      blog: {
        create: {},
      },
    },
  });

  return user; */
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
