import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Filters,
  HttpResponseHandler,
  Pageable,
  QueryService,
  ResponseBody,
  ResponseList,
} from 'angular-sce-commons';
import { catchError, map } from 'rxjs/operators';

import { BASE_PATH } from '../app.constants';

import { TipoDocumento } from './tipodocumento';

@Injectable()
export class TipoDocumentoService extends HttpResponseHandler {
  private baseApiUrl: string;
  private tiposDocumentoUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(BASE_PATH) basePath: string,
    private queryService: QueryService,
  ) {
    super();
    this.baseApiUrl = `${basePath}api/v1.0`;
    this.tiposDocumentoUrl = `${this.baseApiUrl}/tipos-documento`;
  }

  query(filters?: Filters, pageable?: Pageable) {
    const options = { params: this.queryService.buildQueryParams(filters, pageable) };

    return this.http.get<ResponseBody<ResponseList<TipoDocumento>>>(this.tiposDocumentoUrl, options).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  getTipoDocumento(idTipoDocumento: number | string) {
    const url = `${this.tiposDocumentoUrl}/${idTipoDocumento}`;

    return this.http.get<ResponseBody<TipoDocumento>>(url).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  save(tipoDocumento: TipoDocumento) {
    if (tipoDocumento.idTipoDocumento) {
      return this.put(tipoDocumento);
    }

    return this.post(tipoDocumento);
  }

  delete(idTipoDocumento: number) {
    const url = `${this.tiposDocumentoUrl}/${idTipoDocumento}`;

    return this.http.delete<any>(url).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private post(tipoDocumento: TipoDocumento) {
    return this.http.post<ResponseBody<TipoDocumento>>(this.tiposDocumentoUrl, tipoDocumento).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  private put(tipoDocumento: TipoDocumento) {
    const url = `${this.tiposDocumentoUrl}/${tipoDocumento.idTipoDocumento}`;

    return this.http.put<ResponseBody<TipoDocumento>>(url, tipoDocumento).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

}
