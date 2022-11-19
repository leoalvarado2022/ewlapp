import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Services } from 'src/app/shared/dto/Services.dto';
import { TrackingPreview } from 'src/app/shared/dto/TrackingPreview.dto';
import { TrackingComponent } from 'src/app/shared/tracking/tracking.component';
import * as C from 'src/app/shared/constants';
import { PaqueteTracking } from '../shared/dto/PaqueteTracking.dto';
import { Paquete } from '../shared/dto/Paquete.dto';
import { Tracking } from '../shared/dto/Tracking.dto';
import { ApiResponse } from '../shared/dto/ApiResponse.dto';
import { PackageProvider } from '../provider/package.provider';
import { User } from '../shared/dto/User.dto';
import { UserProvider } from '../provider/user.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  UserData: User;
  slidesOpts = {
    initialSlide: 0,
    slidesPerView: 2.1,
    spaceBetween: -20
  }

  slidesTrack = {
    slidesPerView: 1.1,
    spaceBetween: -20
  }

  services: Array<Services>;
  Recents: Array<TrackingPreview>;
  tracking: string = '';

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private packProvider: PackageProvider,
    private userProvider: UserProvider,
    private router: Router
    ) {
      
    }

  async getUserData() {
    
      this.userProvider.currentUserData.subscribe( async (data: User) => {
        this.UserData = data;
        if(!!data) {
          await this.obtenerNoEntregados(data.api_key);
        }
      });
    
  }

  async obtenerNoEntregados(api_key) {
    try{
      const NoEntregados = await this.packProvider.getNoEntregados(api_key);
      this.Recents = NoEntregados.data;
    } catch(e) {
      this.Recents = [];
    }
  }

  async ngOnInit() {
    await this.getUserData();
    
    this.services = [
      {
        icon: "cube-outline",
        text: "Crear Paquete",
        link: '/crear-paquete'
      },
      {
        icon: "document-text-outline",
        text: "Inventario",
        link: '#'
      },
      {
        icon: "stats-chart-outline",
        text: "Reportes",
        link: '#'
      }
    ];
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

  goTracking(tracking: string) {
    this.tracking = tracking;
    this.openTrackingModal();
  }

  async openLoading() {
    return await this.loadingCtrl.create({
      message: 'Buscando Información...',
      duration: 3000
    });
  }

  async openAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      message: msg,
      header: C.APP_NAME,
      buttons: [C.OK_ALERT_BUTTON],
    });
    await alert.present();
  }

  checkTracking(tracking: string) : Promise<ApiResponse<PaqueteTracking<Paquete,Tracking>>> {
    return this.packProvider.getTracking(tracking);
  }

  async openTrackingModal() {
    const loading = this.openLoading();
    (await loading).present();
    const dataTracking = await this.checkTracking(this.tracking);
    
    if(dataTracking.code!="P002") {
      this.openAlert("Error, el nro de tracking no existe");
      this.tracking = '';
      (await loading).dismiss();
      return;
    }
    (await loading).dismiss();
    const trackingModal = await this.modalCtrl.create({
      component: TrackingComponent,
      componentProps: {
        tracking: this.tracking,
        data: dataTracking
      }
    });
    this.tracking = '';
    return await trackingModal.present();
  }
}
