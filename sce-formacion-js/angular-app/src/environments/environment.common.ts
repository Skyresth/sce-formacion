import { AuthMode, SceAuthGuard, ScePermissionGuard } from 'angular-sce-security';

// Valores de la aplicación de ejemplo. Sustituir por los de la aplicación final.
const securityConfig = {
  nombreAplicacion: 'org.sce.sampleapp',
  authMode: [
    AuthMode.user,
    AuthMode.cookie,
  ],
};

const routeGuards = { authGuard: null, permissionGuard: null };
if (!securityConfig.authMode.includes(AuthMode.noAuth)) {
  routeGuards.authGuard = SceAuthGuard;
  if ((securityConfig.authMode.includes(AuthMode.cookie) || securityConfig.authMode.includes(AuthMode.user)) && (securityConfig as any).initPermissions !== false) {
    routeGuards.permissionGuard = ScePermissionGuard;
  }
}

export const environmentCommon = {
  nombreAplicacion: securityConfig.nombreAplicacion,
  prefijoPermisos: 'Sampleapp',
  perfilAdmin: 'SAMPLEAPP.ADMIN',
  securityConfig: securityConfig,
  routeGuards: routeGuards,
  rowsPerPage: 10,
};
