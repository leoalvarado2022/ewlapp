import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaqueteData } from '../../service/paquete-data';
import { Preferences } from '@capacitor/preferences';
import { Distrito } from 'src/app/shared/dto/Localizacion.dto';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/shared/dto/User.dto';
import { BuscadorComponent } from 'src/app/shared/buscador/buscador.component';

@Component({
  selector: 'paquete-envia',
  templateUrl: './envia.component.html',
  styleUrls: ['./envia.component.scss'],
})
export class EnviaComponent implements OnInit {
  formulario: FormGroup;

  @Input() distritos: Array<Distrito>;
  getSearched: Distrito = {nombre: '', cod_distrito: 0};
  UserData: User;
  constructor(
    private paquete$ : PaqueteData, 
    private fb: FormBuilder, 
    private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.UserData = JSON.parse((await Preferences.get({key: "UserData"})).value);
    this.getSearched = {
      cod_distrito: this.UserData.distrito,
      nombre: this.UserData.nombre_distrito
    }
    this.formulario = this.fb.group({
			envia: [this.UserData.nombre+" "+this.UserData.apellido, [Validators.required]],
			telefono1: [this.UserData.telefono_movil, [Validators.required]],
			direccion_origen: [this.UserData.direccion_completa, [Validators.required]],
		});
  }

  get envia(){
    return this.formulario.get("envia");
  }

  get telefono1(){
    return this.formulario.get("telefono1");
  }

  get direccion_origen(){
    return this.formulario.get("direccion_origen");
  }

  async enviarDatos() {
    this.paquete$.setDatosUsuario({
      cod_cliente: this.UserData.cod_usuario,
      distrito_origen: this.getSearched.cod_distrito,
      ndistrito_origen: this.getSearched.nombre,
      gam: this.getSearched.gam,
      envia: this.envia.value,
      telefono1: this.telefono1.value,
      direccion_origen: this.direccion_origen.value
    });
  }

  checkDatos() {
    return this.formulario.valid && this.getSearched.cod_distrito > 0;
  }

  async abrirBuscador() {
    const modal = await this.modalCtrl.create({
      component: BuscadorComponent,
      componentProps: {
        nombreModal: "Buscar Distrito",
        datos: this.distritos
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if(role == "selected") {
      this.getSearched = data;
    }
    
  }
}
