import { Injectable } from '@angular/core';
import { Provincia,Canton,Distrito } from '../shared/dto/Localizacion.dto';
import { Observable } from "rxjs";
import { HttpClient  } from '@angular/common/http';
import { ApiResponseV1 } from '../shared/dto/ApiResponse.dto';
import { routes } from './routes';

@Injectable({
  providedIn: 'root'
})
export class ApiGlobal {

  constructor(private _http: HttpClient) { }

  provincia() : Observable<ApiResponseV1<Provincia>> {
    return this._http.get<ApiResponseV1<Provincia>>(routes.provincia());
  }

  canton(provincia_id: string) : Observable<ApiResponseV1<Canton>> {
    return this._http.get<ApiResponseV1<Canton>>(routes.canton(provincia_id));
  }

  distrito(canton_id: string) : Observable<ApiResponseV1<Distrito>> {
    return this._http.get<ApiResponseV1<Distrito>>(routes.distrito(canton_id));
  }

  allDistritos(params?: any) : Observable<ApiResponseV1<Distrito>> {
    return this._http.get<ApiResponseV1<Distrito>>(routes.allLocalizacion(params));
  }

}
