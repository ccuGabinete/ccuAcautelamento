import { FormataService } from './../formata/formata.service';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Lacre } from 'src/app/models/lacre/lacre';

const apiUrl = 'https://gcdapi.herokuapp.com/';
const local = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class LacreService {
  public lacres: any[]
  public buscarLacres = new BehaviorSubject(this.lacres);
  lacresAtuais = this.buscarLacres.asObservable();

  constructor(
    private http: HttpClient,
    private formataservice: FormataService
    ) { }

  atualizarLacres(lacres: any[]) {
    this.buscarLacres.next(lacres);
  }

  getLacre(numero: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(apiUrl + 'gcd/getLacre', { numero: numero }, { observe: 'response'})
      .pipe(
        catchError(this.handleError)
      );
  }

  atualizar(lacre: Lacre): Observable<HttpResponse<Lacre>> {
    return this.http.post<Lacre>(apiUrl + 'gcd/atualizaLacre', lacre, { observe: 'response' })
      .pipe(
        catchError(this.handleError));
  }

  converteParaArrayDeLacres(linhas: any, status?: string, codigo?: string) {

    const arr: Array<Lacre> = [];

    linhas.forEach((linha, ln) => {
      const arrlacre = linha.lacre.split(',');
      arrlacre.forEach((lc) => {
        const lacre = new Lacre();
        lacre.auto = linha.auto;
        lacre.data = this.formataservice.gerarData(true);
        // lacre.linha será usado para atualizar o status posteriormente
        lacre.linha = linha.linha;
        lacre.pos = linha.pos;
        lacre.processo = linha.processo;
        lacre.trm = linha.trm;
        lacre.numero = lc.substring(0, 8);

        if (status) {
          lacre.status = status
        } else {
          lacre.status = lc.substring(9, 11);
        }

        if (codigo) {
          lacre.codigo = codigo;
        } else {
          lacre.codigo = lc.substring(21, 25);
        }
        
        lacre.grupo = lc.substring(26, 28);
        lacre.quantidade = lc.substring(29, 33);
        if (lc.substring(34, 35) !== '') {
          lacre.recebedor = lc.substring(34, 35)
        } else {
          lacre.recebedor = '0';
        }
        arr.push(lacre);
      });
    });

    return arr;

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
