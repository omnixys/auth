# @omnixys/auth

Authentication and authorization utilities for Omnixys backend services.

This package provides reusable building blocks for implementing authentication
and role-based authorization in NestJS services using Keycloak JWT tokens.

It includes:

- Authentication decorators
- Role-based access control
- Token extraction utilities
- Keycloak role parsing helpers

The package is designed for **NestJS + Fastify + GraphQL** services within the
Omnixys platform.

---

# Purpose

All Omnixys backend services require consistent authentication behavior.

Instead of duplicating authentication logic across microservices,
`@omnixys/auth` centralizes:

- JWT token extraction
- user context parsing
- role resolution
- role-based access control decorators

This package works together with:

```

@omnixys/context
@omnixys/contracts

````

---

# Features

- Keycloak JWT compatible
- Realm + Resource role support
- Role-based authorization
- HTTP + GraphQL compatible
- Typed user context
- Lightweight and framework-aligned

---

# Installation

Inside the Omnixys monorepo:

```ts
import { CurrentUser } from '@omnixys/auth'
````

If used as a published package:

```

pnpm add @omnixys/auth

```

---

# Dependencies

This package assumes the following environment:

* NestJS
* Fastify adapter
* Keycloak
* JWT authentication
* `@omnixys/context`
* `@omnixys/contracts`

---

# Authentication Flow

Typical request flow:

```

Client
↓
Authorization Header / Cookie
↓
JWT Validation (Auth Guard)
↓
req.user populated
↓
@CurrentUser() decorator
↓
Controller / Resolver

```

---

# Decorators

Decorators provide convenient access to authentication and authorization data.

---

# @CurrentUser()

Returns the authenticated user extracted from the Keycloak JWT.

```

import { CurrentUser } from '@omnixys/auth'

@Get('profile')
getProfile(@CurrentUser() user) {
return user
}

```

Returned user object:

```

{
id: string
username: string
email: string
firstName: string
lastName: string
roles: string[]
access_token?: string
refresh_token?: string
}

```

---

# @Roles()

Defines required roles for accessing a route.

```

import { Roles } from '@omnixys/auth'

@Roles('ADMIN')
@Get()
getAdminData() {
return 'restricted'
}

```

The roles are validated inside a `RolesGuard`.

---

# @Public()

Marks an endpoint as publicly accessible.

```

import { Public } from '@omnixys/auth'

@Public()
@Get('health')
healthCheck() {
return 'ok'
}

```

This decorator allows skipping authentication guards.

---

# Token Utilities

Utilities for extracting authentication tokens from requests.

Supported token sources:

* Authorization header
* access token cookie
* refresh token cookie

---

# extractBearerToken

Extracts a Bearer token from the Authorization header.

```

import { extractBearerToken } from '@omnixys/auth'

const token = extractBearerToken(req)

```

Example header:

```

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

```

---

# extractAccessTokenCookie

Extracts the access token from cookies.

```

const token = extractAccessTokenCookie(req)

```

Cookie name:

```

access_token

```

---

# extractRefreshTokenCookie

Extracts the refresh token from cookies.

```

const refreshToken = extractRefreshTokenCookie(req)

```

Cookie name:

```

refresh_token

```

---

# extractToken

Unified token resolver.

Checks:

1. Authorization header
2. access_token cookie

```

const token = extractToken(req)

```

---

# Role Utilities

Keycloak tokens contain roles in multiple locations.

Example token structure:

```

realm_access.roles
resource_access.\*.roles

```

This package provides helpers to normalize them.

---

# extractUserRoles

Extracts roles from the Keycloak JWT payload.

```

import { extractUserRoles } from '@omnixys/auth'

const roles = extractUserRoles(jwtPayload)

```

---

# filterRelevantRoles

Removes Keycloak technical roles.

Ignored roles include:

```

offline_access
uma_authorization
default-roles-master
default-roles-omnixys

```

This ensures only **business roles** remain.

---

# Example — Controller

```

import { Controller, Get } from '@nestjs/common'
import { CurrentUser, Roles } from '@omnixys/auth'

@Controller('users')
export class UserController {

@Get('me')
getCurrentUser(@CurrentUser() user) {
return user
}

@Roles('ADMIN')
@Get('admin')
getAdminData() {
return 'restricted'
}

}

```

---

# Example — GraphQL Resolver

```

import { Resolver, Query } from '@nestjs/graphql'
import { CurrentUser } from '@omnixys/auth'

@Resolver()
export class UserResolver {

@Query(() => String)
me(@CurrentUser() user) {
return user.email
}

}

```

---

# Best Practices

### Use decorators instead of accessing req.user manually

Preferred:

```

@CurrentUser() user

```

Avoid:

```

req.user

```

---

### Define roles using enums

Roles should be defined inside:

```

@omnixys/contracts

```

Example:

```

enum RealmRole {
ADMIN
USER
SECURITY
}

```

---

### Use Guards for Authorization

Decorators only define metadata.

Actual enforcement should happen in:

```

RolesGuard
JwtAuthGuard

```

---

# Architecture

```

@omnixys/auth
│
├─ decorators
│ ├─ current-user.decorator.ts
│ ├─ roles.decorator.ts
│ └─ public.decorator.ts
│
├─ utils
│ ├─ token-extractor.util.ts
│ ├─ extract-user-roles.util.ts
│ └─ role-filter.util.ts
│
└─ types
├─ current-user.interface.ts
└─ keycloak-payload.interface.ts

```

---

# When to use this package

Use this package whenever a service needs:

* authenticated user information
* role-based authorization
* token extraction
* Keycloak role parsing

All Omnixys backend services should rely on this package for
authentication behavior.

---

# License

GPL-3.0-or-later

Copyright (C) Omnixys Technologies
