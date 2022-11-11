import { Injectable } from '@angular/core';
import { ApiUser } from '../service/api.user';
import { User } from '../shared/dto/User.dto';
import { ApiResponse } from '../shared/dto/ApiResponse.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Injectable()
export class UserProvider {

    private UserData = new BehaviorSubject<any>(null);

    constructor(private _api: ApiUser, private router:Router,private platform: Platform){
        this.platform.ready().then( async () => {
            await this.checkLogged();
        });
    }

    async checkLogged(){
        const UserData = (await Preferences.get({key:'UserData'})).value;
        const _user = JSON.parse(UserData);
        if(_user == null) {
            
        }else {
            this.passUserData(_user);
        }
    }

    public passUserData(user) {
        this.UserData.next(user);
    }

    public get currentUserData(): Observable< User > {
        return this.UserData.asObservable();
    }

    isLoggedId() {
        return this.UserData.value;
    }

    postLogin(username: string, password: string) : Promise<any> {
        return new Promise( (resolve,reject) => {

            this._api.login(username,password).subscribe( async (data: ApiResponse<User>) => {
                if(data.code == "U001"){
                    const userData = data.data[0];
                    if(userData.cod_tipo_usuario != 4){
                        reject(false);
                        return;
                    }
                    await Preferences.set({ key: 'api_key', value: btoa(userData.api_key) });
                    await Preferences.set({ key: 'secret_key', value: btoa(userData.secret_key) });
                    await Preferences.set({ key: 'UserData', value: JSON.stringify(userData) });
                    this.passUserData(userData);
                    resolve(true);
                }else{
                    reject(false);
                }
            });
        })
    }

    async logout() {
        await Preferences.remove({key:'api_key'});
        await Preferences.remove({key:'secret_key'});
        await Preferences.remove({key:'UserData'});
        this.UserData.next(null);
        this.router.navigate(["/login"],{ replaceUrl: true });
    }
}