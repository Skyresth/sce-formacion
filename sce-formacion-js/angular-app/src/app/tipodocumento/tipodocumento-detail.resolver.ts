import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { GrowlService } from 'angular-sce-commons';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TipoDocumento } from './tipodocumento';
import { TipoDocumentoService } from './tipodocumento.service';

@Injectable()
export class TipoDocumentoDetailResolver implements Resolve<TipoDocumento> {
  constructor(private tipoDocumentoService: TipoDocumentoService, private growlService: GrowlService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];

    if (id === 'new') {
      return new TipoDocumento();
    } else {
      return this.tipoDocumentoService.getTipoDocumento(id).pipe(
        catchError(error => {
          this.growlService.showError('Error', error);
          this.router.navigate(['/tipos-documento']);
          return throwError(error);
        }),
      );
    }
  }
}
