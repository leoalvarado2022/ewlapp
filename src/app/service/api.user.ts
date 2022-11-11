import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable } from "rxjs";
import { routes } from './routes';
import { Functions } from './functions';
import { User } from '../shared/dto/User.dto';
import { ApiResponse } from '../shared/dto/ApiResponse.dto';
import * as C from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiUser {
  constructor(private _http: HttpClient, private funcs: Functions) { }

  login(username,password): Observable<any> {
    this.funcs.createHeader(true,C.ADMIN_SECRET_KEY);
    const url = this.funcs.makeUrl(routes.login(),C.ADMIN_API_KEY,[{key:"loginApp",value:"true"}]);
    const data = {"usuario":username,"clave":password};
    return this._http.post<ApiResponse<User>>(url,data,this.funcs.httpOptions).pipe();
  }

}
