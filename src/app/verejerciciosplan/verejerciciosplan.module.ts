import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerejerciciosplanPage } from './verejerciciosplan.page';

const routes: Routes = [
  {
    path: '',
    component: VerejerciciosplanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerejerciciosplanPage]
})
export class VerejerciciosplanPageModule {}
