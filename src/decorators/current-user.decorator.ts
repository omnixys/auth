import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { getRequest } from "@omnixys/context";
import type { AuthUser } from "../types/fastify.js";
import { extractUserRoles } from "../utils/extract-roles.util.js";

export interface CurrentUserData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];

  access_token?: string;
  refresh_token?: string;

  // raw: KeycloakRawOutput
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): CurrentUserData | null => {
    const req = getRequest(context);

    if (!req || !req?.user) {
      return null;
    }

    const user: AuthUser = req.user;

    return {
      id: user.sub,
      username: user.preferred_username,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      roles: extractUserRoles(user.raw),
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      // raw: user,
    };
  },
);
