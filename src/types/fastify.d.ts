import "fastify";
import type { KeycloakRawOutput } from "../dto/kc-rwa.dto.js";

export interface AuthUser {
  id: string;
  username: string;
  email: string;

  roles: string[];

  raw: KeycloakRawOutput;

  sub: string;
  preferred_username: string;
  given_name: string;
  family_name: string;

  realm_access: {
    roles: string[];
  };

  access_token: string;
  refresh_token: string;
}

declare module "fastify" {
  interface FastifyRequest {
    user?: AuthUser;

    cookies: {
      access_token?: string;
      refresh_token?: string;
      [key: string]: string | undefined;
    };
  }
}
