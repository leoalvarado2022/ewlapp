import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { UserProvider } from '../../provider/user.provider';



@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(public UserProvider: UserProvider,private router: Router) {

    }

    canActivate(): boolean {
      const _user = JSON.parse(localStorage.getItem("UserData"));
      if(!_user){
        this.router.navigate(["/login"]);
      }
      
      return !!_user;
    }

}