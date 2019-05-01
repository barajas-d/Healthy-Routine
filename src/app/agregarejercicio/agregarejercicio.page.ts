import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, ActionSheetController, ToastController, AlertController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { database } from 'firebase';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PlanEjercicio } from '../modelos/planejercicio';
import { map } from 'rxjs/operators';
import { Ejercicio } from '../modelos/ejercicio';
@Component({
  selector: 'app-agregarejercicio',
  templateUrl: './agregarejercicio.page.html',
  styleUrls: ['./agregarejercicio.page.scss'],
})
export class AgregarejercicioPage implements OnInit {
  ejercicio = {} as Ejercicio;

  itemsRefEjercicio: AngularFireList<any>;
  itemsEjercicio: Observable<any[]>;

  constructor(public alertController: AlertController,public router: Router,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase, private actionSheet: ActionSheetController) { 
    this.itemsRefEjercicio = database.list('ejercicio');
    // Use snapshotChanges().map() to store the key
    this.itemsEjercicio = this.itemsRefEjercicio.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ngOnInit() {
  }
  volver(){
    this.router.navigate(['/ejercicionadmin',{ }]);
  }
  async agregarEjercicio(ejercicio:Ejercicio){
    const alert = await this.alertController.create({
      header: 'Atención',
      message: 'Se creó el ejercicio correctamente',
      buttons: ['OK']
    });

    await alert.present();
    this.itemsRefEjercicio.push(ejercicio);
    document.getElementById('inputnombreejercicio').setAttribute('value',"");
    document.getElementById('inputdescripcionejercicio').setAttribute('value',"");
    document.getElementById('inputimagenejercicio').setAttribute('value',"");
  }

 
}