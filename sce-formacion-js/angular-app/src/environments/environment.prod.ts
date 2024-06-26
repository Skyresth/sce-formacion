import { environmentCommon } from './environment.common';

export const environment = {
  production: true,
  nombreAplicacion: environmentCommon.securityConfig.nombreAplicacion,
  prefijoPermisos: environmentCommon.prefijoPermisos,
  perfilAdmin: environmentCommon.perfilAdmin,
  securityConfig: environmentCommon.securityConfig,
  routeGuards: environmentCommon.routeGuards,
  rowsPerPage: environmentCommon.rowsPerPage,
};

// En AoT no es posible usar object spread de momento. https://github.com/angular/angular/issues/28078
