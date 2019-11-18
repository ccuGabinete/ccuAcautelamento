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

  async avisoCodigo() {
    const toast = await this.toastController.create({
      message: 'Código  inválido',
      duration: 2000
    });
    toast.present();
  }

  async avisoCampos() {
    const toast = await this.toastController.create({
      message: 'Defina uma ação',
      duration: 2000
    });
    toast.present();
  }

  async avisoLacres() {
    const toast = await this.toastController.create({
      message: 'Escolha apenas um lacre',
      duration: 2000
    });
    toast.present();
  }

  async avisoLSucesso() {
    const toast = await this.toastController.create({
      message: 'Sucesso!!!',
      duration: 2000
    });
    toast.present();
  }

  async avisoLInexistente() {
    const toast = await this.toastController.create({
      message: 'Lacre não localizado',
      duration: 2000
    });
    toast.present();
  }

  async avisoSemLacres() {
    const toast = await this.toastController.create({
      message: 'Sem lacres para processar',
      duration: 2000
    });
    toast.present();
  }


}
