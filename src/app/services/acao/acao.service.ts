import { Acao } from './../../models/acao/acao';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcaoService {
  public acao = new Acao();
  public buscarAcao = new BehaviorSubject(this.acao);
  acaoAtual = this.buscarAcao.asObservable();

  constructor() { 
  }

  atualizarAcao(acao: Acao) {
    this.buscarAcao.next(acao);
  }
}
