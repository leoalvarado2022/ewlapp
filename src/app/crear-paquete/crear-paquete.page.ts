import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Swiper } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { GlobalProvider } from '../provider/global.provider';
import { PackageProvider } from '../provider/package.provider';
import { ApiResponse } from '../shared/dto/ApiResponse.dto';
import { Distrito } from '../shared/dto/Localizacion.dto';
import { DatosDestinatario, DatosUsuario, PaqueteResponse, Precio, PreciosMembresia } from '../shared/dto/Paquete.dto';
import { User } from '../shared/dto/User.dto';
import { AlertService } from '../shared/services/alert/alert.service';
import { ToastService } from '../shared/services/toast/toast.service';
import { EnviaComponent } from './components/envia/envia.component';
import { RecibeComponent } from './components/recibe/recibe.component';
import { PaqueteData } from './service/paquete-data';

@Component({
  selector: 'app-crear-paquete',
  templateUrl: './crear-paquete.page.html',
  styleUrls: ['./crear-paquete.page.scss'],
})
export class CrearPaquetePage implements OnInit,OnDestroy {
  @ViewChild('swiperR', { static: false }) swiperR?: SwiperComponent; 
  @ViewChild(EnviaComponent) Envia;
  @ViewChild(RecibeComponent) Recibe;
  AllDistritos: Array<Distrito> = [];

  slides: string[];
  swipers: Swiper;
  currentSlide: string;
  isBeginning: boolean = true;
  isEnd: boolean = false;
  validEnviaData: boolean = false;
  validRecibeData: boolean = false;
  dataUsuario: DatosUsuario;
  dataDestinatario: DatosDestinatario;
  UsuarioSubscription: Subscription;
  DestinatarioSubscription: Subscription;
  PrecioPaquete: Precio;
  userData: User;

  constructor(
    private navCtrl: NavController,
    private paquete$: PaqueteData, 
    private alert: AlertService, 
    private _apiGlobal: GlobalProvider,
    private _apiPackage: PackageProvider,
    private toast: ToastService,
    private loadingCtrl: LoadingController
    ) { }

  setSwiperInstance(swiper: Swiper) {
    this.swipers = swiper;
  }

  async calcularPrecio(){
    if(this.dataUsuario.distrito_origen > 0 && this.dataDestinatario.distrito_entrega > 0) {
      
      const precios : Array<PreciosMembresia> = this.userData.plan.plan.precios;
      const _origen = this.dataUsuario.gam ? "GAM" : "RURAL";
      const _destino = this.dataDestinatario.gam ? "GAM" : "RURAL";
      const _precioPaquete = precios.filter( (v) => {
        return (v.origen == _origen) && (v.destino == _destino);
      });
      const IVA = parseFloat((_precioPaquete[0].precio_base * 13 / 100).toFixed(2));
      const precio = parseFloat(_precioPaquete[0].precio_base.toString());
      const total = precio + IVA;
      this.PrecioPaquete = {
        precio: precio,
        IVA: IVA,
        total: total
      }
    }
  }

  async ngOnInit() {
    this.userData = JSON.parse((await Preferences.get({key: "UserData"})).value);
    this.getDistritos();
    this.buildSlides();

    this.UsuarioSubscription = this.paquete$.datosUsuario.subscribe(async (data) => {
      this.dataUsuario = data;
      await this.calcularPrecio();
    });

    this.DestinatarioSubscription = this.paquete$.datosDestinatario.subscribe( async (data) => {
      this.dataDestinatario = data;
      await this.calcularPrecio();
    });
  }

  getDistritos() {
    this._apiGlobal.getAllDistritos({noNumber: 1}).then( distritos => {
      this.AllDistritos = distritos.response.data;
    })
  }

  ngOnDestroy() {
    this.UsuarioSubscription.unsubscribe();
    this.DestinatarioSubscription.unsubscribe();
  }

  async onSlidesChanged() {
    const index = await this.swipers.activeIndex;
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.swipers.isBeginning;
    this.isEnd = await this.swipers.isEnd;
  }

  onBackButtonTouched() {
    this.swiperR.swiperRef.slidePrev(100);
  } 

  validEnviaComponent() {
    this.validEnviaData = false;
    if(this.Envia.checkDatos()) {
      this.validEnviaData = true;
      this.Envia.enviarDatos();
    }
  }

  validRecibeComponent() {
    this.validRecibeData = false;
    if(this.Recibe.checkDatos()) {
      this.validRecibeData = true;
      this.Recibe.enviarDatos();
    }
  }

  async onNextButtonTouched() {
    const index = await this.swipers.activeIndex;

    if(index == 0){
      this.validEnviaComponent();
      if(!this.validEnviaData) {
        await this.alert.infoMessage("Por favor complete los datos de Quien Envia");
        return;
      }
    }

    if(index == 1) {
      this.validRecibeComponent();
      if(!this.validRecibeData) {
        await this.alert.infoMessage("Por favor complete los datos de Quien Recibe");
        return;
      }
    }

    this.swiperR.swiperRef.slideNext(100);
  }  

  buildSlides() {
    const slides = ['Quien Envía', 'Quien Recibe', 'Resumen'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  async realizarPedido() {
    (await this.openLoading()).present();
    const paquete = {
      api_key: this.userData.api_key,
      destinatario: this.dataDestinatario.destinatario,
      direccion_entrega: this.dataDestinatario.direccion_entrega,
      direccion_origen: this.dataUsuario.direccion_origen,
      distrito_entrega: this.dataDestinatario.distrito_entrega,
      distrito_origen: this.dataUsuario.distrito_origen,
      telefono1: this.dataUsuario.telefono1,
      telefono2: this.dataDestinatario.telefono2,
      envia: this.dataUsuario.envia,
      correo_web: this.userData.correo,
      peso: this.dataDestinatario.peso,
    };
    try {
      const resPaquete: any= await this._apiPackage.savePackage(paquete,this.userData.api_key);
      this.navCtrl.navigateRoot("/home");
      await this.toast.successToast(resPaquete.data.msg,2000,"bottom");
    } catch(e) {
      await this.toast.errorToast("Error al guardar el Paquete",2000,"bottom");
    }
  }

  async openLoading() {
    return await this.loadingCtrl.create({
      message: 'Guardando...',
      duration: 2500
    });
  }
}
