import { SetMetadata } from "@nestjs/common";
import type { RealmRole } from "@omnixys/contracts";

export const ROLES_KEY = Symbol("roles");

export function Roles(...roles: RealmRole[]): MethodDecorator & ClassDecorator {
  return SetMetadata(ROLES_KEY, roles);
}
