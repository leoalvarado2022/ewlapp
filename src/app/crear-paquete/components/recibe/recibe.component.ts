import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaqueteData } from '../../service/paquete-data';
import { Distrito } from 'src/app/shared/dto/Localizacion.dto';
import { BuscadorComponent } from 'src/app/shared/buscador/buscador.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'paquete-recibe',
  templateUrl: './recibe.component.html',
  styleUrls: ['./recibe.component.scss'],
})
export class RecibeComponent implements OnInit {
  formulario: FormGroup;

  @Input() distritos: Array<Distrito>;
  getSearched: Distrito = {nombre: '', cod_distrito: 0};
  constructor(
    private paquete$ : PaqueteData, 
    private fb: FormBuilder,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.formulario = this.fb.group({
			destinatario: ['', [Validators.required]],
			telefono2: ['', [Validators.required]],
			direccion_entrega: ['', [Validators.required]],
			peso: [1, [Validators.required,Validators.max(10)]],
		});
  }

  get destinatario(){
    return this.formulario.get("destinatario");
  }

  get telefono2(){
    return this.formulario.get("telefono2");
  }

  get direccion_entrega(){
    return this.formulario.get("direccion_entrega");
  }

  get peso(){
    return this.formulario.get("peso");
  }

  async enviarDatos() {
    this.paquete$.setDatosDestinatario({
      destinatario: this.destinatario.value,
      distrito_entrega: this.getSearched.cod_distrito,
      gam: this.getSearched.gam,
      ndistrito_entrega: this.getSearched.nombre,
      telefono2: this.telefono2.value,
      direccion_entrega: this.direccion_entrega.value,
      peso: parseInt(this.peso.value)
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
