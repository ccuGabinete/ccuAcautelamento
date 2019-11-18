import { Injectable } from '@angular/core';
import { Tela } from 'src/app/models/tela/tela';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelaService {

  public tela = new Tela();
  public buscarTela = new BehaviorSubject(this.tela);
  telaAtual = this.buscarTela.asObservable();

  constructor() {}

  atualizarTela(tela: Tela){
      this.buscarTela.next(tela);
  }
}
