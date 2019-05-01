import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.page.html',
  styleUrls: ['./adminhome.page.scss'],
})
export class AdminhomePage implements OnInit {

  constructor(private menu: MenuController,public navCtrl: NavController) { }

  ngOnInit() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  nutricionClick(){
    this.navCtrl.navigateForward('nutricionadmin');
  }
  deporteClick(){
    this.navCtrl.navigateForward('ejercicioadmin');
  }
  reporteClick(){
    this.navCtrl.navigateForward('reporteadmin');
  }
  salir(){
    this.navCtrl.navigateForward('login');
  }
}
