import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'

import type { KeycloakRawOutput } from '@omnixys/contracts';
import { extractUserRoles } from '../utils/extract-roles.util.js'
import { getRequest } from '@omnixys/context'

@Injectable()
export class CookieAuthGuard implements CanActivate {

  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = getRequest(context)

    const accessToken = req.cookies?.access_token
    const refreshToken = req.cookies?.refresh_token

    if (!accessToken) {
      throw new UnauthorizedException('Missing access_token cookie')
    }

    let payload: KeycloakRawOutput

    try {
      payload = await this.jwt.verifyAsync(accessToken)
    } catch {
      throw new UnauthorizedException('Invalid access token')
    }

    const roles = extractUserRoles(payload)

    console.debug({payload})
console.log({roles})

    req.user = {
      id: payload.sub,
      username: payload.preferred_username,
      email: payload.email,
      roles,

      access_token: accessToken,
      refresh_token: refreshToken ?? '',

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