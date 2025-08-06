import { Request, RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { matchedData } from "express-validator";

import { createUser, getUser, getUsers, deleteUser } from "../services/user";
import validateCreateUser from "../validators/signup.validator";

interface userController {
  createUser: RequestHandler;
  getUser: RequestHandler;
  getUsers: RequestHandler;
}

const userController = {
  getUser: asyncHandler(async (req, res) => {
    const { username } = matchedData<{ username: string }>(req, {
      onlyValidData: true,
    });
    const user = await getUser(null, username);
    res.json(user);
  }),
  getUsers: asyncHandler(async (req, res) => {
    const users = await getUsers();
    console.group("getUsers running...");
    console.log("req.accessToken:", req.accessToken);
    console.groupEnd();
    res.json(users);
  }),
  deleteUser: asyncHandler(async (req, res) => {
    const { username } = matchedData<{ username: string }>(req, {
      onlyValidData: true,
    });
    const user = await deleteUser(username);
    res.json(user);
  }),
};

export default userController;
