import { Lacre } from './../../models/lacre/lacre';
import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
moment.defineLocale('America/Sao_Paulo', {
  parentLocale: 'pt-BR'
});

@Injectable({
  providedIn: 'root'
})
export class FormataService {

  constructor() { }

  colocaZeros(val: string) {
    const tamanho = val.length;
    if (tamanho < 8) {
      for (let i = 0; i < (8 - tamanho); i++) {
        val = '0' + val;
      }
    }

    return val;
  }

  gerarData(bd?: boolean) {
    const data = Date.now();
    const dateMoment = moment(data);
    if (bd) {
      return dateMoment.format('DD/MM/YY');
    } else {
      return dateMoment.format('DD/MM/YYYY');
    }

  }

  gerarMomentData(date: Date) {

    const dateMoment = moment(date).format('DD/MM/YYYY');
    return dateMoment;
  }

  gerarDataHora(date: Date) {
    const dateMoment = moment(date).format('DD/MM/YYYY hh:mm:ss');
    return dateMoment;
  }

  comparaData (dataquery: Date, data: Date) {
    return moment(dataquery).isSame(data);
  }

  formatarlacre (lacre: Lacre) {
    return lacre.numero + '(' + lacre.status + ';' + lacre.data + ';' + lacre.codigo + ';' + lacre.grupo + ';' + lacre.quantidade + ';' + lacre.recebedor + '),';
  }

  
}
