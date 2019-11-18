import { AcaoService } from './services/acao/acao.service';
import { Acao } from './models/acao/acao';
import { AvisosService } from './services/avisos/avisos.service';
import { AcessoService } from './services/acesso/acesso.service';
import { Usuario } from './models/usuario/usuario';
import { TelaService } from './services/tela/tela.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Tela } from './models/tela/tela';

import { NgxMaskIonicModule } from 'ngx-mask-ionic'

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Lacre } from './models/lacre/lacre';
import { LowerCasePipe, UpperCasePipe } from '@angular/common';
import { LacreService } from './services/lacre/lacre.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    NgxMaskIonicModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Tela,
    TelaService,
    Usuario,
    AcessoService,
    AvisosService,
    Lacre,
    LacreService,
    LowerCasePipe,
    UpperCasePipe,
    Acao,
    AcaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
