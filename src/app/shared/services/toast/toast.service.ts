import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) {

  }

  /**
   * successToast
   * @param msg
   * @param time
   * @param position
   */
  public successToast = async (msg: string = 'Loading...', time: number = 2000, position: any = 'top') => {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      animated: true,
      color: 'success',
      keyboardClose: true,
      position,
      cssClass: 'customToast'
    });

    toast.present();
  }

  /**
   * errorToast
   * @param msg
   * @param time
   * @param position
   */
  public errorToast = async (msg: string = 'Loading...', time: number = 2000, position: 'top' | 'bottom' = 'top') => {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      animated: true,
      color: 'danger',
      keyboardClose: true,
      position,
      cssClass: 'customToast'
    });

    toast.present();
  }

  /**
   * warningToast
   * @param msg
   * @param time
   * @param position
   */
  public warningToast = async (msg: string = 'Loading...', time: number = 3500, position: any = 'top') => {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      animated: true,
      color: 'warning',
      keyboardClose: true,
      position,
      cssClass: 'customToast'
    });

    toast.present();
  }

  /**
   * normalToast
   * @param msg
   * @param time
   * @param position
   */
  public normalToast = async (msg: string = 'Loading...', time: number = 2000, position: any = 'top') => {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      animated: true,
      keyboardClose: true,
      position
    });

    toast.present();
  }

}
