import { Injectable } from '@angular/core';
import { ApiResponseV1 } from '../shared/dto/ApiResponse.dto';
import { ApiGlobal } from '../service/api.global.service';
import { Distrito } from '../shared/dto/Localizacion.dto';


@Injectable()
export class GlobalProvider {

    constructor(private _api: ApiGlobal){
        
    }

    getAllDistritos(params?: any) : Promise<ApiResponseV1<Distrito>> {
        return this._api.allDistritos(params).toPromise();
    }
}