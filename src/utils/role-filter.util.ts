/**
 * Keycloak technical roles that should be ignored.
 */
const IGNORED_KEYCLOAK_ROLES = new Set([
  'offline_access',
  'uma_authorization',
  'default-roles-omnixys',
  'default-roles-master',
])

/**
 * Filters Keycloak technical roles and returns only business-relevant roles.
 *
 * @param roles All roles from Keycloak (realm_access.roles + resource_access roles)
 * @returns Clean business roles (e.g., ADMIN, USER, SECURITY)
 */
export function filterRelevantRoles(roles: string[]): string[] {
  if (!roles?.length) {
    return []
  }

  const filtered = roles.filter(role => !IGNORED_KEYCLOAK_ROLES.has(role.toLowerCase()))

  // remove duplicates
  return [...new Set(filtered)]
}