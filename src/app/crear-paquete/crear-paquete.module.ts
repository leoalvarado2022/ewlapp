import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { CrearPaquetePageRoutingModule } from './crear-paquete-routing.module';

import { CrearPaquetePage } from './crear-paquete.page';
import { EnviaComponent } from './components/envia/envia.component';
import { RecibeComponent } from './components/recibe/recibe.component';
import { TotalComponent } from './components/total/total.component';
import { SinpeComponent } from '../shared/pagos/sinpe/sinpe.component';
import { EvertecComponent } from '../shared/pagos/evertec/evertec.component';
import { MenuToolbarComponent } from '../shared/menu-toolbar/menu-toolbar.component';
import { BuscadorComponent } from '../shared/buscador/buscador.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SwiperModule,
    CrearPaquetePageRoutingModule
  ],
  declarations: [
    CrearPaquetePage,
    MenuToolbarComponent,
    EnviaComponent,
    RecibeComponent,
    TotalComponent,
    SinpeComponent,
    EvertecComponent,
    BuscadorComponent
  ]
})
export class CrearPaquetePageModule {}
