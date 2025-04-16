import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { createUser, getUser, getUsers, deleteUser } from "../services/user";

import { UserId } from "../interfaces/user";
import validateCreateUser from "../validators/createUser.validator";

interface userController {
  createUser: RequestHandler;
  getUser: RequestHandler<UserId>;
  getUsers: RequestHandler;
}

const userController = {
  createUser: [
    validateCreateUser(),
    asyncHandler(async (req, res) => {
      const user = await createUser(req.body);
      res.json(user);
    }),
  ],
  getUser: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);
    res.json(user);
  }),
  getUsers: asyncHandler(async (req, res) => {
    const users = await getUsers();
    res.json(users);
  }),
  deleteUser: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await deleteUser(id);
    res.json(user);
  }),
};

export default userController;
