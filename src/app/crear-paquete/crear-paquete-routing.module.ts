import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPaquetePage } from './crear-paquete.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPaquetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPaquetePageRoutingModule {}
