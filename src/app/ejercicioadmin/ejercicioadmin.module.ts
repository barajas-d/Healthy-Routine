import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EjercicioadminPage } from './ejercicioadmin.page';

const routes: Routes = [
  {
    path: '',
    component: EjercicioadminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EjercicioadminPage]
})
export class EjercicioadminPageModule {}
