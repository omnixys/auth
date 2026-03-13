import 'fastify';
import '@fastify/cookie'
import type { AuthUser } from "@omnixys/context";

declare module 'fastify' {
  interface FastifyRequest {
    user?: AuthUser;

    cookies: {
      access_token?: string;
      refresh_token?: string;
      [key: string]: string | undefined;
    };
  }
}