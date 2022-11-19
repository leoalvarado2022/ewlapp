import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Swiper } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { GlobalProvider } from '../provider/global.provider';
import { Distrito } from '../shared/dto/Localizacion.dto';
import { DatosDestinatario, DatosUsuario } from '../shared/dto/Paquete.dto';
import { AlertService } from '../shared/services/alert/alert.service';
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

  constructor(private paquete$: PaqueteData, private alert: AlertService, private _apiGlobal: GlobalProvider) { }

  setSwiperInstance(swiper: Swiper) {
    this.swipers = swiper;
  }

  async ngOnInit() {
    this.getDistritos();
    this.buildSlides();

    this.UsuarioSubscription = this.paquete$.datosUsuario.subscribe(data => {
      this.dataUsuario = data;
    });

    this.DestinatarioSubscription = this.paquete$.datosDestinatario.subscribe(data => {
      this.dataDestinatario = data;
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

  async realizarPedido(){
    console.log("this.dataUsuario::> ",this.dataUsuario);
    console.log("this.dataDestinatario::> ",this.dataDestinatario); 
  }
}
