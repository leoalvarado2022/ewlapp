import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { TrackingComponent } from 'src/app/shared/tracking/tracking.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, TrackingComponent]
})
export class HomePageModule {}
