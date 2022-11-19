import { Component, Input, OnInit } from '@angular/core';
import { DatosDestinatario, DatosUsuario, Precio } from 'src/app/shared/dto/Paquete.dto';

@Component({
  selector: 'paquete-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
})
export class TotalComponent implements OnInit {
  @Input() datosUsuario: DatosUsuario;
  @Input() datosDestinatario: DatosDestinatario;
  @Input() Precio: Precio;
  constructor() { }

  ngOnInit() {
    
  }

}
