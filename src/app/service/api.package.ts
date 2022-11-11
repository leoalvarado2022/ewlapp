import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable } from "rxjs";
import { routes } from './routes';
import { PaqueteTracking } from '../shared/dto/PaqueteTracking.dto';
import { Paquete } from '../shared/dto/Paquete.dto';
import { Tracking } from '../shared/dto/Tracking.dto';
import { ApiResponse } from '../shared/dto/ApiResponse.dto';
import { Functions } from './functions';
import { TrackingPreview } from '../shared/dto/TrackingPreview.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiPackage {

  constructor(private _http: HttpClient, private funcs: Functions) { }

  tracking(tr: string) : Observable<ApiResponse<PaqueteTracking<Paquete,Tracking>>> {
    return this._http.get<ApiResponse<PaqueteTracking<Paquete,Tracking>>>(routes.tracking(tr)).pipe();
  }

  noEntregados(api_key: string) : Observable<ApiResponse<TrackingPreview>> {
    const url = this.funcs.makeUrl(routes.getPendientes(),api_key);
    return this._http.get<ApiResponse<TrackingPreview>>(url).pipe();
  }
}
