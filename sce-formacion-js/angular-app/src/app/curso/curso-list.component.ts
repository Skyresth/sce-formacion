import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './curso-list.component.html'
})
export class CursoListComponent implements OnInit {

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
    this.router.navigate(['/cursos', rowData.idCurso]);
  }

  add() {
    this.router.navigate(['/cursos', 'new']);
  }
}
