import { Injectable } from '@angular/core';
import { ApiPackage } from '../service/api.package';
import { PaqueteTracking } from '../shared/dto/PaqueteTracking.dto';
import { Paquete } from '../shared/dto/Paquete.dto';
import { Tracking } from '../shared/dto/Tracking.dto';
import { ApiResponse } from '../shared/dto/ApiResponse.dto';
import { TrackingPreview } from '../shared/dto/TrackingPreview.dto';

@Injectable()
export class PackageProvider {
    
    constructor(private _api: ApiPackage){
        
    }

    getTracking(tr: string) : Promise<ApiResponse<PaqueteTracking<Paquete,Tracking>>> {
        return new Promise( (resolve,reject) => {
            this._api.tracking(tr).subscribe( (data: ApiResponse<PaqueteTracking<Paquete,Tracking>>)=> {
                if(data.code == "P000"){
                    reject(data);
                }else if(data.code == "P002"){
                    resolve(data);
                }
            })
        });
    }

    getNoEntregados(api_key: string) : Promise<ApiResponse<TrackingPreview>> {
        return new Promise( (resolve,reject) => {
            this._api.noEntregados(api_key).subscribe( data => {
                if(data.code == "P000"){
                    reject(data);
                }else if(data.code == "P003"){
                    resolve(data);
                }
            })
        });
    }
}