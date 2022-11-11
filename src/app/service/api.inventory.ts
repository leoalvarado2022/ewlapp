import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { map,tap } from 'rxjs/operators';
import { routes } from './routes';

@Injectable({
  providedIn: 'root'
})
export class ApiInventory {
  httpOptions: any;
  constructor(private _http: HttpClient) { }

}