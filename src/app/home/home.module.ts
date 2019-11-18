import { AcessoService } from './../services/acesso/acesso.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskIonicModule } from 'ngx-mask-ionic'

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
    ]),
    NgxMaskIonicModule
  ],
  declarations: [HomePage],
  providers: [
    AcessoService
  ]
})
export class HomePageModule { }
