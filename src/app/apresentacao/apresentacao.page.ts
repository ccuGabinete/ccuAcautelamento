import { FormataService } from './../services/formata/formata.service';
import { AvisosService } from './../services/avisos/avisos.service';
import { Acao } from './../models/acao/acao';
import { Router } from '@angular/router';
import { LacreService } from './../services/lacre/lacre.service';
import { AcaoService } from './../services/acao/acao.service';
import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Subscription } from 'rxjs';
const go = console.log;

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.page.html',
  styleUrls: ['./apresentacao.page.scss'],
})
export class ApresentacaoPage implements OnInit {
  arraylacres = [];
  arrayOriginal = [];
  subscriptionAcao: Subscription;
  subscriptionArrayLaces: Subscription;
  disabled = false;
  constructor(
    private acaoservice: AcaoService,
    private lacreservice: LacreService,
    private router: Router,
    public acao: Acao,
    private uppercasepipe: UpperCasePipe,
    private avisoservice: AvisosService,
    private formaraservice: FormataService
  ) { }

  ngOnInit() {
    this.subscriptionAcao = this.acaoservice.acaoAtual.subscribe(acao => {
      this.acao = acao;
      this.acao.acao = this.uppercasepipe.transform(this.acao.acao);
      switch (this.acao.acao) {
        case 'DOAR':
          this.acao.status = '04';
          break;
        case 'DESCARTAR':
          this.acao.status = '03';
          break;
        case 'RECEBER':
          this.acao.status = '01';
          break;
        case 'CONSULTAR':
          break;
      }

      this.subscriptionArrayLaces = this.lacreservice.lacresAtuais.subscribe(data => {
        this.arrayOriginal = data;
        this.arraylacres = this.lacreservice.converteParaArrayDeLacres(data, this.acao.status, this.acao.codigo);
        this.arraylacres = this.arraylacres.filter(x => x.numero === this.acao.numero);
      });

    });


  }

  onDelete(auto: string) {
    // tslint:disable-next-line: prefer-const
    let index = this.arraylacres.findIndex(x => x.auto === auto);
    this.arraylacres.splice(index, 1);
  }

  onSubmit() {
    this.disabled = true;
    if (this.arraylacres.length > 1) {
      this.avisoservice.avisoLacres();
    } else {
      // tslint:disable-next-line: prefer-const
      let arrayAtualizacao = this.arrayOriginal.filter(x => {
        return x.auto === this.arraylacres[0].auto;
      });

      go(arrayAtualizacao);

      this.acao.auto = arrayAtualizacao[0].auto;

      // aqui é a linha que representa o que ainda está
      // sem alteração no DB, a celula lacre
      let linhaDoLacreAntigo = arrayAtualizacao[0].lacre;

      // aqui vou escontrar apenas o valor antigo do lacre
      // que será substituído
      let aux =  arrayAtualizacao[0].lacre.split(',');
      const rg = new RegExp(this.acao.numero);
      aux = aux.filter(x => rg.test(x));
      let lacreAntigoParaSerSubstituido = aux[0];


      // aqui vou definir o lacre que será enviado para atualizar a planilha
      let lacre = this.formaraservice.formatarlacre(this.arraylacres[0]);

      // aqui o valor que será atualizado
      let lacreNovoParaSubstituir = lacre.lacre;

      // aqui atualizo o valor do lacre
      lacre.lacre = linhaDoLacreAntigo.replace(lacreAntigoParaSerSubstituido, lacreNovoParaSubstituir);
      go(linhaDoLacreAntigo);
      go(lacre);

      if (this.acao.acao !== 'CONSULTAR') {
        this.lacreservice.atualizar(lacre).subscribe(() => {
          this.disabled = false;
          this.avisoservice.avisoLSucesso();
          this.router.navigate(['/main']);
        })
      } else {
        this.router.navigate(['/main']);
      }
    }
  }

  ionViewWillLeave() {
    this.subscriptionAcao.unsubscribe();
    this.subscriptionArrayLaces.unsubscribe();
  }
}
