// import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
// // biome-ignore lint/style/useImportType: class
// import { JwtService } from '@nestjs/jwt'

// import type { KeycloakRawOutput } from '@omnixys/contracts';
// import { extractUserRoles } from '../utils/extract-roles.util.js'
// import { getRequest } from '@omnixys/context'
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class CookieAuthGuard implements CanActivate {

//   constructor(private readonly jwt: JwtService) {
//     console.log('HeaderAuthGuard created')
// }

//   async canActivate(context: ExecutionContext): Promise<boolean> {

//     const req = getRequest(context)

//     const accessToken = req.cookies?.access_token
//     const refreshToken = req.cookies?.refresh_token

//     if (!accessToken) {
//       console.error('Missing access_token cookie')
//       throw new UnauthorizedException('Missing access_token cookie')
//     }

//     let payload: KeycloakRawOutput

//     try {
//       payload = await this.jwt.verifyAsync(accessToken)
//     } catch(e) {
//       console.error('Invalid access token');
//        console.log('Invalid access token');
//         console.log({e});
//       throw new UnauthorizedException('Invalid access token')
//     } finally {
//          payload = await this.jwt.verifyAsync(accessToken)
//       console.log({accessToken, payload })
//     }

//     const roles = extractUserRoles(payload)

//     req.user = {
//       id: payload.sub,
//       username: payload.preferred_username,
//       email: payload.email,
//       roles,

//       access_token: accessToken,
//       refresh_token: refreshToken ?? '',

//       raw: payload,

//       sub: payload.sub,
//       preferred_username: payload.preferred_username,
//       given_name: payload.given_name,
//       family_name: payload.family_name,
//       realm_access: payload.realm_access,
//     }

//     return true
//   }
// }