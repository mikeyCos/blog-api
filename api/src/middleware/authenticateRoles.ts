import { RequestHandler } from "express";
import { matchedData } from "express-validator";
import { InsufficientPermissionsError } from "../errors/customErrors";
import { RoleName } from "../interfaces/user";
import asyncHandler from "express-async-handler";

const authenticateRoles = (requiredRoles: RoleName[]) => {
  const _authenticateRoles: RequestHandler = asyncHandler(
    async (req, res, next) => {
      const { username } = matchedData<{ username: string }>(req, {
        onlyValidData: true,
      });
      const { user } = req;

      console.group("_authenticateRoles running...");
      console.log("req.params:", req.params);
      console.log("username:", username);
      console.log("user:", user);
      console.groupEnd();
      // If req.params.username exists and
      // authenticated username does not match
      //  check if authenticated user has any of the required roles
      //  otherwise, throw an insufficient permissions error
      /* if (username !== user.username) {
      const userRolesSet = new Set(
        user.roles.map((role) => role.roleDetails.name)
      );
      const userHasRoles = requiredRoles.reduce((accumulator, currentRole) => {
        return accumulator ?? userRolesSet.has(currentRole);
      }, false);

      if (!userHasRoles) {
        next(new InsufficientPermissionsError("test"));
      }
    } */
      return next();
    }
  );

  return _authenticateRoles;
};

export default authenticateRoles;
