import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserProvider } from '../provider/user.provider';
import * as C from 'src/app/shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  disableButton: boolean = true;

  constructor(
    private fb: FormBuilder,
		private alertCtrl: AlertController,
		private router: Router,
		private loadingCtrl: LoadingController,
    private userProvider: UserProvider
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
			email: ['', [Validators.required/*, Validators.email*/]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
  }

  get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

  async doLogin() {
    const loading = await this.openLoading();
    (await loading).present();
    this.disableButton = false;
    const email = this.email.value;
    const password = this.password.value;
    this.userProvider.postLogin(email,password).then( () => {
      this.router.navigate(["/home"],{ replaceUrl: true });
    }).catch(err => {
      this.openAlert("Error, Usuario/ Clave Incorrecta");
    });
    (await loading).dismiss();
  }

  async openLoading() {
    return await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 3000
    });
  }

  async openAlert(msg: string) {
    
    const alert = await this.alertCtrl.create({
      message: msg,
      header: C.APP_NAME,
      buttons: [C.OK_ALERT_BUTTON],
    });
    await alert.present();
  }

}
