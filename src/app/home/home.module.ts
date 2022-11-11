import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MenuToolbarComponent } from 'src/app/shared/menu-toolbar/menu-toolbar.component';
import { TrackingComponent } from 'src/app/shared/tracking/tracking.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, MenuToolbarComponent, TrackingComponent]
})
export class HomePageModule {}
