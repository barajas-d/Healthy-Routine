import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NutricioneditardietaPage } from './nutricioneditardieta.page';

const routes: Routes = [
  {
    path: '',
    component: NutricioneditardietaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NutricioneditardietaPage]
})
export class NutricioneditardietaPageModule {}
