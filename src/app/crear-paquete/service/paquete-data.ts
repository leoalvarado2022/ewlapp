import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatosUsuario,DatosDestinatario } from 'src/app/shared/dto/Paquete.dto';
@Injectable({
    providedIn: 'root',
})
export class PaqueteData {
    private datosUsuario$ = new BehaviorSubject<DatosUsuario>({
        distrito_origen: 0,
        cod_cliente: 0,
        envia: '',
        telefono1: '',
        direccion_origen: '',
        gam: -1
    });

    private datosDestinatario$ = new BehaviorSubject<DatosDestinatario>({
        distrito_entrega: 0,
        destinatario: '',
        telefono2: '',
        direccion_entrega: '',
        gam: -1,
        peso: 1
    });

    get datosUsuario() {
        return this.datosUsuario$.asObservable();
    }

    get datosDestinatario() {
        return this.datosDestinatario$.asObservable();
    }

    setDatosUsuario(datosUsuario: DatosUsuario) {
        this.datosUsuario$.next(datosUsuario);
    }

    setDatosDestinatario(datosDestinatario: DatosDestinatario) {
        this.datosDestinatario$.next(datosDestinatario);
    }
}