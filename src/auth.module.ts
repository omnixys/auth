import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CookieAuthGuard } from "./guards/cookie-auth.guard.js";
import { HeaderAuthGuard } from "./guards/header-auth.guard.js";
import { RoleGuard } from "./guards/role.guard.js";
import { JwtStrategy } from "./jwt/jwt.strategy.js";

@Module({
  imports: [JwtModule.register({})],
  providers: [JwtStrategy, HeaderAuthGuard, CookieAuthGuard, RoleGuard],
  exports: [JwtModule, HeaderAuthGuard, CookieAuthGuard, RoleGuard],
})
export class AuthModule {}
