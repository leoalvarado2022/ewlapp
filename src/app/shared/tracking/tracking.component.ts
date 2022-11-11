import { Component, OnInit, Input } from '@angular/core';
import { PaqueteTracking } from '../dto/PaqueteTracking.dto';
import { Paquete } from '../dto/Paquete.dto';
import { Tracking } from '../dto/Tracking.dto';
import { ApiResponse } from '../dto/ApiResponse.dto';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {

  @Input() tracking: string;
  @Input() data: ApiResponse<PaqueteTracking<Paquete,Tracking>>;
  dataPaquete: Paquete;
  dataTracking: Array<Tracking>;
  constructor(private modalCtrl: ModalController) { 

  }

  ngOnInit() {
    if(this.data.code == "P002"){
      this.dataPaquete = this.data.data["paquete"];
      this.dataTracking = [...this.data.data["tracking"]];
    }
  }

  cerrar() {
    this.modalCtrl.dismiss(null);
  }

}
