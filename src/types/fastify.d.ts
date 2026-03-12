import 'fastify';
import '@fastify/cookie'
import type { AuthUser } from './auth-user.type.js'

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