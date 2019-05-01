import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EjercicioeditarplanPage } from './ejercicioeditarplan.page';

const routes: Routes = [
  {
    path: '',
    component: EjercicioeditarplanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EjercicioeditarplanPage]
})
export class EjercicioeditarplanPageModule {}
