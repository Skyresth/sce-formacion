import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { AlumnoTableComponent } from './alumno-table.component';

@NgModule({
  imports: [SharedModule],
  exports: [AlumnoTableComponent],
  declarations: [AlumnoTableComponent]
})
export class AlumnoTableModule {}
