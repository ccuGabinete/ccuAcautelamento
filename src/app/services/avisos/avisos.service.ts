import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  constructor(private toastController: ToastController) { }

  async avisoConexao() {
    const toast = await this.toastController.create({
      message: 'Verifique sua conexão',
      duration: 2000
    });
    toast.present();
  }

  async avisoLogin() {
    const toast = await this.toastController.create({
      message: 'Senha ou login incorretos',
      duration: 2000
    });
    toast.present();
  }


}
