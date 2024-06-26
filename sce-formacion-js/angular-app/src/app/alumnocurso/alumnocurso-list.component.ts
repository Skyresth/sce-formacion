import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './alumnocurso-list.component.html'
})
export class AlumnoCursoListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.goToDetail = this.goToDetail.bind(this);
    this.add = this.add.bind(this);

    this.route.data.forEach((response: {
      }) => {
      }
    );
  }

  goToDetail(rowData: any) {
    this.router.navigate(['/alumnos-cursos', rowData.idAlumnoCurso]);
  }

  add() {
    this.router.navigate(['/alumnos-cursos', 'new']);
  }
}
