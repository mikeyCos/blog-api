import { RequestHandler } from "express";
import { matchedData } from "express-validator";
import { InsufficientPermissionsError } from "../errors/customErrors";
import { RoleName } from "../interfaces/user";

/* const authenticateRole: RequestHandler = async (req, res, next) => {
  const { roleName } = matchedData<{ roleName: string }>(req, {
    onlyValidData: true,
  });
  const { user } = req;

  const userHasRole = user.roles.some(
    (role) => role.roleDetails.name === roleName
  );
  if (!userHasRole) throw new InsufficientPermissionsError(roleName);
  // If current user has roleName throw error
  next();
}; */

const authenticateRoles = (roles: RoleName[]) => {
  // Unsure if a returned named function can start with an underscore
  // Returns a requestHandler based on an array of role names
  const _authenticateRoles: RequestHandler = async (req, res, next) => {
    const { user } = req;

    // const userHasRole = user.roles.some(
    //   (role) => role.roleDetails.name === roleName
    // );

    // if (!userHasRole) throw new InsufficientPermissionsError(roleName);
    // If current user has roleName throw error
    next();
  };

  return _authenticateRoles;
};

export default authenticateRoles;
