import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SceAuthGuard, ScePermissionGuard } from 'angular-sce-security';

import { environment } from '../environments/environment';

export const BASE_PATH = new InjectionToken<string>('BASE_PATH');
export function basePathFactory(): string {
  return window['CONFIGURACION'].path;
}

export const EXTERNAL_PATH = new InjectionToken<string>('EXTERNAL_PATH');
export function externalPathFactory(): string {
  return window['CONFIGURACION'].basePathForExternalServices;
}

export const SISPECAN_ENV = new InjectionToken<string>('SISPECAN_ENV');
export function sispecanEnvFactory(): string {
  return window['CONFIGURACION'].env;
}

export const AUTOSERVE_PROPS = new InjectionToken<any>('AUTOSERVE_PROPS');
export function autoServePropsFactory(): any {
  return JSON.parse(window['CONFIGURACION'].autoServeProperties);
}

export const authGuard = new InjectionToken<any>('AuthGuard');
export function authGuardFactory(sceAuthGuard: SceAuthGuard) {
  return environment.routeGuards.authGuard ? sceAuthGuard : (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true;
}
export const authGuardProvider: Provider = { provide: authGuard, deps: [SceAuthGuard], useFactory: authGuardFactory };

export const permissionGuard = new InjectionToken<any>('PermissionGuard');
export function permissionGuardFactory(scePermissionGuard: ScePermissionGuard) {
  return environment.routeGuards.permissionGuard ? scePermissionGuard : (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true;
}
export const permissionGuardProvider = { provide: permissionGuard, deps: [ScePermissionGuard], useFactory: permissionGuardFactory };
