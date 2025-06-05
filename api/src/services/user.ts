import prisma from "../config/prisma";
import { UserNotFoundError } from "../errors/customErrors";
import { User, UserId, Username, CreateUser } from "../interfaces/user";
import { Prisma } from "../prisma/generated/prisma";

// How can I throw error from services to endpoint?
export const createUser = async ({ username, email, password }: CreateUser) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      blog: {
        create: {},
      },
    },
  });

  return user;
};

interface GetUser {
  (userId: UserId | null, username?: Username): Promise<User>;
}

// Should I throw error if both arguments are falsy values?
export const getUser: GetUser = async (userId, username) => {
  if (!userId && !username) {
    throw new Error("Failed to execute 'getUser' 1 argument required.");
  }

  /* Non-null Assertion Operator (Postfix !)
   * https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-
   */
  const filter: Prisma.UserWhereUniqueInput = username
    ? { username: username }
    : { id: userId! };

  // TODO
  // What to include on user object?
  const user = await prisma.user.findUnique({
    where: filter,
    include: {
      blog: true,
      posts: true,
      comments: true,
    },
  });

  if (!user) {
    const identifier = userId || username;
    const isId = !!userId;
    throw new UserNotFoundError(identifier!, isId);
  }

  return user;
};

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: { blog: true, posts: true, comments: true },
  });

  return users;
};

export const deleteUser = async (userId: UserId) => {
  if (!userId)
    throw new Error("Failed to execute 'deleteUser' 1 argument required.");
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
