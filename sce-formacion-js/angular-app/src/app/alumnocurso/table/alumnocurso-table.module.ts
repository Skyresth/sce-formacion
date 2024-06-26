import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { AlumnoCursoTableComponent } from './alumnocurso-table.component';

@NgModule({
  imports: [SharedModule],
  exports: [AlumnoCursoTableComponent],
  declarations: [AlumnoCursoTableComponent]
})
export class AlumnoCursoTableModule {}
