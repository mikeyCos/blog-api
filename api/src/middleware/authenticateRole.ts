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
    const { username } = matchedData<{ username: string }>(req);
    const { user } = req;

    // If req.params.username exists and
    //  authenticated username does not match and
    //  does not have certain roles throw an error
    if (username !== user.username) {
      // User must be an admin
    }
    // const userHasRole = user.roles.some(
    //   (role) => role.roleDetails.name === roleName
    // );

    const userHasRole = roles.reduce((accum, currentRole) => {
      return (
        accum ||
        user.roles.some((userRole) => userRole.roleDetails.name === currentRole)
      );
    }, false);

    console.group("_authenticateRoles...");
    console.log("userHasRole:", userHasRole);
    console.groupEnd();
    if (!userHasRole) {
    }
    // If current user does not have roleName throw error
    // if (!userHasRole) throw new InsufficientPermissionsError(roleName);
    next();
  };

  return _authenticateRoles;
};

export default authenticateRoles;
