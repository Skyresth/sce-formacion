import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { AlumnoDetailComponent } from './alumno-detail.component';
import { AlumnoListComponent } from './alumno-list.component';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoTableModule } from './table/alumno-table.module';
import { AlumnoService } from './alumno.service';
import { CursoTableModule } from '../curso/table/curso-table.module';

@NgModule({
  imports: [
    SharedModule,
    AlumnoRoutingModule,
    AlumnoTableModule,
    CursoTableModule,
  ],
  declarations: [
    AlumnoDetailComponent,
    AlumnoListComponent,
  ],
  providers: [
    AlumnoService,
  ],
})
export class AlumnoModule {}
