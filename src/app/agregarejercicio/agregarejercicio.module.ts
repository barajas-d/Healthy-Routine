import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarejercicioPage } from './agregarejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarejercicioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarejercicioPage]
})
export class AgregarejercicioPageModule {}
