import { Subscription } from 'rxjs';
import { AcaoService } from './../services/acao/acao.service';
import { FormataService } from './../services/formata/formata.service';
import { AvisosService } from './../services/avisos/avisos.service';
import { LacreService } from './../services/lacre/lacre.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Lacre } from '../models/lacre/lacre';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Acao } from '../models/acao/acao';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
const go = console.log;

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  lacreresponse: Lacre[] = [];
  codigo: string;
  numero: string;
  acaopretendida: string;
  isvalidcodigo = false;
  listaacoes = [];
  disabled = true;
  subscription: Subscription;

  constructor(
    public lacre: Lacre,
    private lacreservice: LacreService,
    private lowercasepipe: LowerCasePipe,
    private avisosservice: AvisosService,
    private formataservice: FormataService,
    private acaoservice: AcaoService,
    private acao: Acao,
    private router: Router,
    private renderer: Renderer2,
    public alertController: AlertController

  ) { }

  ngOnInit() {
    this.acao = new Acao();
  }

  ionViewWillEnter() {
    this.acao = new Acao();
    this.acaoservice.acaoAtual.subscribe(acao => {
      if (acao.codigo !== '') {
        this.codigo = acao.codigo;
        this.acaopretendida = acao.acao;
      }
    });

    this.disabled = true;

    this.lacreservice.atualizarLacres([]);

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: '<strong>Deseja encerrar o apliativo?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

  onFocusCodigo() {
    this.codigo = '';
    this.disabled = true;
  }


  onChangeCodigo() {
    this.codigo = this.lowercasepipe.transform(this.codigo);
    if (parseInt(this.codigo, 16) % 5 === 0) {
      this.isvalidcodigo = true;
    } else {
      this.listaacoes = [];
      this.avisosservice.avisoCodigo();
    }
  }

  onFocusLacre() {
    this.disabled = true;
    this.numero = '';
  }

  onBlurLacre() {
    this.renderer.selectRootElement('#acoes').focus();
  }

  onChangeLacre() {
    this.numero = this.formataservice.colocaZeros(this.numero);
    this.lacreservice.getLacre(this.numero).subscribe(data => {
      if (data.body.length > 0) {
        this.lacreservice.atualizarLacres(data.body);
        this.disabled = false;
      } else {
        this.avisosservice.avisoLInexistente();
      }
    });

    if (this.isvalidcodigo) {
      this.listaacoes = [
        'doar',
        'descartar'
      ];
    } else {
      this.listaacoes = [
        'receber',
        'consultar'
      ];
    }
  }

  onBlurAcoes() {
    this.renderer.selectRootElement('#submit').focus();
  }

  testaCampos(): boolean {
    if (
      typeof this.numero === 'undefined' ||
      typeof this.acaopretendida === 'undefined'
    ) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {
    if (this.testaCampos()) {
      this.subscription = this.lacreservice.lacresAtuais.subscribe(() => {
        if (this.isvalidcodigo) {
          this.acao.acao = this.acaopretendida;
          this.acao.codigo = this.codigo;
          this.acao.numero = this.numero;
        } else {
          this.acao.acao = this.acaopretendida;
          this.acao.codigo = '';
          this.acao.numero = this.numero;
        }

        this.acaoservice.atualizarAcao(this.acao);
        this.numero = '';
        this.codigo = '';
        this.router.navigate(['/apresentacao']);
      })

    } else {
      this.avisosservice.avisoCampos();
    }
  }

  onClose() {
    this.presentAlertConfirm();
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
