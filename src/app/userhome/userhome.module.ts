import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserhomePage } from './userhome.page';
import { NgCalendarModule } from 'ionic2-calendar';
import { NutricionPage } from '../nutricion/nutricion.page';


const routes: Routes = [
  {
    path: '',
    component: UserhomePage
  }
];

@NgModule({
  imports: [
    NgCalendarModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),

  ],
  declarations: [UserhomePage]
})
export class UserhomePageModule {}
