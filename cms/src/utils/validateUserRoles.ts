import { Role, RoleName } from "../interfaces/user";

// Return boolean based on if queryRoles exist in userRoles
const validateUserRoles = (userRoles: Role[], requiredRoles: RoleName[]) => {
  console.group("validateUserRoles running...");
  const userRolesSet = new Set(userRoles.map((role) => role.roleDetails.name));
  const hasRoles = requiredRoles.reduce((accum, currentRole) => {
    return userRolesSet.has(currentRole);
  }, false);

  console.log("!hasRoles:", !hasRoles);
  console.groupEnd();
  if (!hasRoles) {
    // Throw insufficient permissions error
    throw new Error("You do not have permission(s) to view this content");
  }
};

export default validateUserRoles;
/* 
{
    "assignedAt": "2025-07-02T17:30:53.742Z",
    "roleDetails": {
        "id": "4ae69d20-da61-40aa-9c05-ff6f7458e857",
        "name": "ADMIN"
    }
} 
*/
