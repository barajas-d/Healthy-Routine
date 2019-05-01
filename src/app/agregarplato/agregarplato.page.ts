import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, ActionSheetController, ToastController, AlertController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { database } from 'firebase';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Dieta } from '../modelos/dieta';
import { map } from 'rxjs/operators';
import { Plato } from '../modelos/plato';

@Component({
  selector: 'app-agregarplato',
  templateUrl: './agregarplato.page.html',
  styleUrls: ['./agregarplato.page.scss'],
})

export class AgregarplatoPage implements OnInit {
  plato = {} as Plato;

  itemsRefPlato: AngularFireList<any>;
  itemsPlato: Observable<any[]>;

  constructor(public alertController: AlertController,public router: Router,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase, private actionSheet: ActionSheetController) { 
    this.itemsRefPlato = database.list('plato');
    // Use snapshotChanges().map() to store the key
    this.itemsPlato = this.itemsRefPlato.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ngOnInit() {
  }
  volver(){
    this.router.navigate(['/nutricionadmin',{ }]);
  }
  async agregarPlato(plato:Plato){
    const alert = await this.alertController.create({
      header: 'Atención',
      message: 'Se creó el plato correctamente',
      buttons: ['OK']
    });

    await alert.present();
    this.itemsRefPlato.push(plato);
    document.getElementById('inputnombreplato').setAttribute('value',"");
    document.getElementById('inputdescripcionplato').setAttribute('value',"");
    document.getElementById('inputimagenplato').setAttribute('value',"");
  }

 
}
