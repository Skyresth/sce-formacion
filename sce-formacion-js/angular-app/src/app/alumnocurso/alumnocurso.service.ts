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

import { AlumnoCurso } from './alumnocurso';

@Injectable()
export class AlumnoCursoService extends HttpResponseHandler {
  private baseApiUrl: string;
  private alumnosCursosUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(BASE_PATH) basePath: string,
    private queryService: QueryService,
  ) {
    super();
    this.baseApiUrl = `${basePath}api/v1.0`;
    this.alumnosCursosUrl = `${this.baseApiUrl}/alumnos-cursos`;
  }

  query(filters?: Filters, pageable?: Pageable) {
    const options = { params: this.queryService.buildQueryParams(filters, pageable) };

    return this.http.get<ResponseBody<ResponseList<AlumnoCurso>>>(this.alumnosCursosUrl, options).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  getAlumnoCurso(idAlumnoCurso: number | string) {
    const url = `${this.alumnosCursosUrl}/${idAlumnoCurso}`;

    return this.http.get<ResponseBody<AlumnoCurso>>(url).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  save(alumnoCurso: AlumnoCurso) {
    if (alumnoCurso.idAlumnoCurso) {
      return this.put(alumnoCurso);
    }

    return this.post(alumnoCurso);
  }

  delete(idAlumnoCurso: number) {
    const url = `${this.alumnosCursosUrl}/${idAlumnoCurso}`;

    return this.http.delete<any>(url).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private post(alumnoCurso: AlumnoCurso) {
    return this.http.post<ResponseBody<AlumnoCurso>>(this.alumnosCursosUrl, alumnoCurso).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  private put(alumnoCurso: AlumnoCurso) {
    const url = `${this.alumnosCursosUrl}/${alumnoCurso.idAlumnoCurso}`;

    return this.http.put<ResponseBody<AlumnoCurso>>(url, alumnoCurso).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

}
