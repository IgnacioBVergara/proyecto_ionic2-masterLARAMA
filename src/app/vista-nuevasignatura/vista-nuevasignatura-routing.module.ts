import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VistaNuevasignaturaPage } from './vista-nuevasignatura.page';

const routes: Routes = [
  {
    path: '',
    component: VistaNuevasignaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VistaNuevasignaturaPageRoutingModule {}
