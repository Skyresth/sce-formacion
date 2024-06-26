import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GrowlService, ResponseList } from 'angular-sce-commons';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TipoDocumento } from './tipodocumento';
import { TipoDocumentoService } from './tipodocumento.service';

@Injectable()
export class TipoDocumentoListResolver implements Resolve<ResponseList<TipoDocumento>> {
  constructor(private tipoDocumentoService: TipoDocumentoService, private growlService: GrowlService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.tipoDocumentoService.query().pipe(
      catchError(error => {
        this.growlService.showError('Error', error);
        return throwError(error);
      }),
    );
  }
}
