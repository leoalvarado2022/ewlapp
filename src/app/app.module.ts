import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { Functions } from './service/functions';
import { UserProvider } from './provider/user.provider';
import { PackageProvider } from './provider/package.provider';
import { AlertService } from './shared/services/alert/alert.service';
import { GlobalProvider } from './provider/global.provider';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    SharedModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [
    Functions,
    AlertService,
    UserProvider,
    PackageProvider,
    GlobalProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
