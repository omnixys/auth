/**
 * @license GPL-3.0-or-later
 * Copyright (C) 2025 Caleb Gyamfi - Omnixys Technologies
 *
 * Public API surface for the @omnixys/auth package.
 */

export * from './auth.module.js'

// decorators
export * from './decorators/current-user.decorator.js'
export * from './decorators/public.decorator.js'
export * from './decorators/roles.decorator.js'

// dto
export * from  './dto/kc-rwa.dto.js'

// guards
export * from './guards/cookie-auth.guard.js'
export * from './guards/header-auth.guard.js'
export * from './guards/role.guard.js'

// jwt
export * from './jwt/jwt.strategy.js'
export * from './jwt/jwks.js'

// type
export * from './types/gql-context.js'

// utils
export * from './utils/extract-roles.util.js'
export * from './utils/role-filter.util.js'
export * from './utils/token-extractor.util.js'