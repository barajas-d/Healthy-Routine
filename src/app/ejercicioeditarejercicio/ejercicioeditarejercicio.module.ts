import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EjercicioeditarejercicioPage } from './ejercicioeditarejercicio.page';

const routes: Routes = [
  {
    path: '',
    component: EjercicioeditarejercicioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EjercicioeditarejercicioPage]
})
export class EjercicioeditarejercicioPageModule {}
