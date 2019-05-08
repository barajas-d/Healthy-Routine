import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TutoinicioPage } from './tutoinicio.page';

const routes: Routes = [
  {
    path: '',
    component: TutoinicioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TutoinicioPage]
})
export class TutoinicioPageModule {}
