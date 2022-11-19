import { NgModule } from '@angular/core';

import { SwiperModule } from 'swiper/angular';
import { CrearPaquetePageRoutingModule } from './crear-paquete-routing.module';

import { CrearPaquetePage } from './crear-paquete.page';
import { EnviaComponent } from './components/envia/envia.component';
import { RecibeComponent } from './components/recibe/recibe.component';
import { TotalComponent } from './components/total/total.component';
import { SinpeComponent } from '../shared/pagos/sinpe/sinpe.component';
import { EvertecComponent } from '../shared/pagos/evertec/evertec.component';
import { BuscadorComponent } from '../shared/buscador/buscador.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    SwiperModule,
    CrearPaquetePageRoutingModule
  ],
  declarations: [
    CrearPaquetePage,
    EnviaComponent,
    RecibeComponent,
    TotalComponent,
    SinpeComponent,
    EvertecComponent,
    BuscadorComponent
  ]
})
export class CrearPaquetePageModule {}
