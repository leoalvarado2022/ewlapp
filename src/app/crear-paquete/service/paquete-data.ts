import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatosUsuario,DatosDestinatario } from 'src/app/shared/dto/Paquete.dto';
@Injectable({
    providedIn: 'root',
})
export class PaqueteData {
    private datosUsuario$ = new BehaviorSubject<DatosUsuario>(null);
    private datosDestinatario$ = new BehaviorSubject<DatosDestinatario>(null);

    get datosUsuario() {
        return this.datosUsuario$.asObservable().pipe();
    }

    get datosDestinatario() {
        return this.datosDestinatario$.asObservable().pipe();
    }

    setDatosUsuario(datosUsuario: DatosUsuario) {
        this.datosUsuario$.next(datosUsuario);
    }

    setDatosDestinatario(datosDestinatario: DatosDestinatario) {
        this.datosDestinatario$.next(datosDestinatario);
    }
}