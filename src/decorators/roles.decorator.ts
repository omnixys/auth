import { SetMetadata } from '@nestjs/common'
import type { RealmRole } from '@omnixys/contracts'

export const ROLES_KEY = Symbol('roles')

export type Role = RealmRole

export function Roles(...roles: Role[]): MethodDecorator & ClassDecorator {
  return SetMetadata(ROLES_KEY, roles)
}