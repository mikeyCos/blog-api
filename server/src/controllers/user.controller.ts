import { Request, RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { matchedData } from "express-validator";

import { createUser, getUser, getUsers, deleteUser } from "../services/user";
import { UserIdParams } from "../interfaces/user";
import validateCreateUser from "../validators/signup.validator";

interface userController {
  createUser: RequestHandler;
  getUser: RequestHandler;
  getUsers: RequestHandler;
}

const userController = {
  getUser: asyncHandler(async (req, res) => {
    const { userId } = matchedData<UserIdParams>(req, {
      onlyValidData: true,
    });
    const user = await getUser(userId);
    res.json(user);
  }),
  getUsers: asyncHandler(async (req, res) => {
    const users = await getUsers();
    res.json(users);
  }),
  deleteUser: asyncHandler(async (req, res) => {
    const { userId } = matchedData<UserIdParams>(req, {
      onlyValidData: true,
    });
    const user = await deleteUser(userId);
    res.json(user);
  }),
};

export default userController;
