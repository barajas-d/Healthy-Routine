import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerejerciciosplanuserPage } from './verejerciciosplanuser.page';

const routes: Routes = [
  {
    path: '',
    component: VerejerciciosplanuserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerejerciciosplanuserPage]
})
export class VerejerciciosplanuserPageModule {}
