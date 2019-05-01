import { Component, OnInit } from '@angular/core';
import { NutricionPage } from '../nutricion/nutricion.page';
import { EjercicioPage } from '../ejercicio/ejercicio.page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  nutricion = NutricionPage;
  ejercicio = EjercicioPage;
  constructor() { }

  ngOnInit() {
  }

}
