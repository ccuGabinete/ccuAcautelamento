import { AvisosService } from './../services/avisos/avisos.service';
import { AcessoService } from './../services/acesso/acesso.service';
import { Usuario } from './../models/usuario/usuario';
import { TelaService } from './../services/tela/tela.service';
import { Tela } from './../models/tela/tela';
import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
const go = console.log;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentScreenOrientation: string;
  card = ((this.platform.height() - 240) / 2).toFixed(2) + 'px';


  constructor(
    public usuario: Usuario,
    private screenOrientation: ScreenOrientation,
    private platform: Platform,
    private tela: Tela,
    private telaservice: TelaService,
    private acessoservice: AcessoService,
    private avisoservice: AvisosService,
    private router: Router
  ) {


    this.screenOrientation.onChange().subscribe(
      () => {
        this.currentScreenOrientation = this.screenOrientation.type;
        if (this.currentScreenOrientation === 'landscape-primary') {
          this.card = ((this.tela.width - 240) / 2).toFixed(0) + 'px';
        } else {
          this.card = ((this.tela.heigth - 240) / 2).toFixed(0) + 'px';
        }
        document.body.style.setProperty('--my-var', this.card);
      }
    );

  }

  ngOnInit() {
    this.usuario = new Usuario();
    this.tela = new Tela();
    this.tela.heigth = this.platform.height();
    this.tela.width = this.platform.width();
    document.body.style.setProperty('--my-var', this.card);
    this.telaservice.atualizarTela(this.tela);
  }

  onLogin() {
    if (this.usuario.login.length < 1 || this.usuario.senha.length < 1) {
      this.avisoservice.avisoLogin();
    } else {
      this.acessoservice.getUser(this.usuario).subscribe(usuario => {
        if(!usuario.isValid){
          this.avisoservice.avisoLogin();
        } else {
          this.router.navigate(['/main']);
        }
      }, error => {
        this.avisoservice.avisoConexao();
      });
    }
     
  }

}
