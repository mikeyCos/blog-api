import { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { getUser, getUsers, deleteUser } from "../services/user";

import { UserId } from "../interfaces/user";

interface userController {
  getUser: RequestHandler<UserId>;
  getUsers: RequestHandler;
}

const userController = {
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
