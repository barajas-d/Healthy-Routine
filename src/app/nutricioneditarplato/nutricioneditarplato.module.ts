import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NutricioneditarplatoPage } from './nutricioneditarplato.page';

const routes: Routes = [
  {
    path: '',
    component: NutricioneditarplatoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NutricioneditarplatoPage]
})
export class NutricioneditarplatoPageModule {}
