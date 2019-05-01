import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerplatosdietauserPage } from './verplatosdietauser.page';

const routes: Routes = [
  {
    path: '',
    component: VerplatosdietauserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerplatosdietauserPage]
})
export class VerplatosdietauserPageModule {}
