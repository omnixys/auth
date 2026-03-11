import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'

import type { KeycloakRawOutput } from '@omnixys/contracts';
import { extractUserRoles } from '../utils/extract-roles.util.js'
import { getRequest } from '@omnixys/context'
import { extractBearerToken } from '../utils/token-extractor.util.js'
@Injectable()
export class HeaderAuthGuard implements CanActivate {

  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = getRequest(context)

    const token = extractBearerToken(req)

    if (!token) {
      throw new UnauthorizedException('Missing Bearer token')
    }

    let payload: KeycloakRawOutput

    try {
      payload = await this.jwt.verifyAsync(token)
    } catch {
      throw new UnauthorizedException('Invalid access token')
    }

    const roles = extractUserRoles(payload)

    req.user = {
      id: payload.sub,
      username: payload.preferred_username,
      email: payload.email,
      roles,

      access_token: token,
      refresh_token: '',

      raw: payload,

      sub: payload.sub,
      preferred_username: payload.preferred_username,
      given_name: payload.given_name,
      family_name: payload.family_name,
      realm_access: payload.realm_access,
    }

    return true
  }
}