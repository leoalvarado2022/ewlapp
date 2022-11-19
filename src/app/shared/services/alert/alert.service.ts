import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import { APP_NAME,OK_ALERT_BUTTON } from '../../constants';

@Injectable()
export class AlertService {

  constructor(private alertController: AlertController) {

  }

  /**
   * confirmAlert
   * @param message
   */
  public confirmAlert = (message: string = 'Confirma ?'): Promise<boolean> => {
    return new Promise(resolve => {
      this.alertController.create({
        message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => resolve(false)
          },
          {
            text: 'Si',
            handler: () => resolve(true)
          }
        ],
        backdropDismiss: false,
      }).then(alert => {
        alert.present();
      });
    });
  }

    /**
   * infoMessage
   * @param message
   */
  public infoMessage = (message: string, okButton?: string) => {
    return new Promise(resolve => {
      this.alertController.create({
        header: APP_NAME,
        message,
        buttons: [
          {
            text: okButton || OK_ALERT_BUTTON,
            handler: () => resolve(true)
          }
        ]
      }).then(alert => {
        alert.present();
      });
    });
  }

}
