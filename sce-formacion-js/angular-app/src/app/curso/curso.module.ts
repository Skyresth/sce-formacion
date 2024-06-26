import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { CursoDetailComponent } from './curso-detail.component';
import { CursoListComponent } from './curso-list.component';
import { CursoRoutingModule } from './curso-routing.module';
import { CursoTableModule } from './table/curso-table.module';
import { CursoService } from './curso.service';
import { AlumnoTableModule } from '../alumno/table/alumno-table.module';

@NgModule({
  imports: [
    SharedModule,
    CursoRoutingModule,
    CursoTableModule,
    AlumnoTableModule,
  ],
  declarations: [
    CursoDetailComponent,
    CursoListComponent,
  ],
  providers: [
    CursoService,
  ],
})
export class CursoModule {}
