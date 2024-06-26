import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { CursoTableComponent } from './curso-table.component';

@NgModule({
  imports: [SharedModule],
  exports: [CursoTableComponent],
  declarations: [CursoTableComponent]
})
export class CursoTableModule {}
