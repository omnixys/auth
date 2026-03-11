import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import type { Reflector } from '@nestjs/core'


import { ROLES_KEY } from '../decorators/roles.decorator.js'
import { getRequest } from '@omnixys/context'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? []

    if (requiredRoles.length === 0) {
      return true
    }

    const req = getRequest(context)

    const event = req.user

    if (!event) {
      throw new ForbiddenException('User not authenticated')
    }

    const roles = event.roles ?? []

    const allowed = requiredRoles.some(role =>
      roles.includes(role),
    )

    if (!allowed) {
      throw new ForbiddenException('Insufficient permissions')
    }

    return true
  }
}