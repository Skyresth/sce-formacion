import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseList } from 'angular-sce-commons';

import { TipoDocumento } from '../tipodocumento';

@Component({
  templateUrl: './alumno-list.component.html'
})
export class AlumnoListComponent implements OnInit {
  tiposDocumento: TipoDocumento[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.goToDetail = this.goToDetail.bind(this);
    this.add = this.add.bind(this);

    this.route.data.forEach((response: {
        tiposDocumento: ResponseList<TipoDocumento>,
      }) => {
        this.tiposDocumento = response.tiposDocumento.data;
      }
    );
  }

  goToDetail(rowData: any) {
    this.router.navigate(['/alumnos', rowData.idAlumno]);
  }

  add() {
    this.router.navigate(['/alumnos', 'new']);
  }
}
