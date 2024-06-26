import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { AlumnoCursoDetailComponent } from './alumnocurso-detail.component';
import { AlumnoCursoListComponent } from './alumnocurso-list.component';
import { AlumnoCursoRoutingModule } from './alumnocurso-routing.module';
import { AlumnoCursoTableModule } from './table/alumnocurso-table.module';
import { AlumnoCursoService } from './alumnocurso.service';

@NgModule({
  imports: [
    SharedModule,
    AlumnoCursoRoutingModule,
    AlumnoCursoTableModule,
  ],
  declarations: [
    AlumnoCursoDetailComponent,
    AlumnoCursoListComponent,
  ],
  providers: [
    AlumnoCursoService,
  ],
})
export class AlumnoCursoModule {}
