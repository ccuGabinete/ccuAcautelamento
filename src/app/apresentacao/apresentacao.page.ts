import { FormataService } from './../services/formata/formata.service';
import { AvisosService } from './../services/avisos/avisos.service';
import { Acao } from './../models/acao/acao';
import { Router } from '@angular/router';
import { LacreService } from './../services/lacre/lacre.service';
import { AcaoService } from './../services/acao/acao.service';
import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
const go = console.log;

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.page.html',
  styleUrls: ['./apresentacao.page.scss'],
})
export class ApresentacaoPage implements OnInit {
  arraylacres = [];
  arrayOriginal = [];
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
    this.acaoservice.acaoAtual.subscribe(acao => {
      this.acao = acao;
      this.acao.acao = this.uppercasepipe.transform(this.acao.acao);
      switch (this.acao.acao) {
        case 'DOAR':
          this.acao.status = '04'
          break;
        case 'DESCARTAR':
          this.acao.status = '03'
          break;
        case 'RECEBER':
          this.acao.status = '01'
          break;
        case 'CONSULTAR':
          break;
      }

      this.lacreservice.lacresAtuais.subscribe(data => {
        this.arrayOriginal = data;
        this.arraylacres = this.lacreservice.converteParaArrayDeLacres(data, this.acao.status, this.acao.codigo);
        this.arraylacres = this.arraylacres.filter(x => x.numero === this.acao.numero);
      })

    })


  }

  onDelete(auto: string) {
    let index = this.arraylacres.findIndex(x => x.auto === auto);
    this.arraylacres.splice(index, 1);
  }

  onSubmit() {
    if (this.arraylacres.length > 1) {
      this.avisoservice.avisoLacres();
    } else {
      this.lacreservice.lacresAtuais.subscribe(data => {
        if (this.arraylacres.length > 0) {
          let response = this.formaraservice.formatarlacre(this.arraylacres[0]).replace(',', '');
          let rg = new RegExp(this.acao.numero);
          let lacre = data.filter(function (x) {
            return rg.test(x.lacre);
          });

          let array = lacre[0].lacre.split(',');
          let regex = new RegExp(this.acao.numero);

          let linhaParaModificar = array.filter(x => regex.test(x));
          lacre[0].lacre = lacre[0].lacre.replace(linhaParaModificar, response);
          if (this.acao.acao !== 'CONSULTAR') {
            this.lacreservice.atualizar(lacre[0]).subscribe(data => {
              this.lacreservice.atualizarLacres([]);
              this.avisoservice.avisoLSucesso();
              this.router.navigate(['/main']);
            })
          } else {
            this.router.navigate(['/main']);
          }
        }


      })
    }
  }
}
