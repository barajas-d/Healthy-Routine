import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, snapshotChanges, AngularFireAction } from 'angularfire2/database';
import { database } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Dieta } from '../modelos/dieta';
import { map, switchMap } from 'rxjs/operators';
import { Plato } from '../modelos/plato';
import * as firebase from 'firebase';

@Component({
  selector: 'app-verplatosdieta',
  templateUrl: './verplatosdieta.page.html',
  styleUrls: ['./verplatosdieta.page.scss'],
})
export class VerplatosdietaPage implements OnInit {
  dieta = {} as Dieta;

  nombre;
  key;
  rol;
  email;
  listaPlatosRef$: Observable<any[]>
  items2: Observable<any[]>;
  aux = []; 
  constructor(public alertController: AlertController,private actionSheet: ActionSheetController,public router: Router,private route: ActivatedRoute,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase) {   
    let sub = this.route.params.subscribe(params => {
      this.key= params['dietaID'];
      this.rol=params['rol'];
      this.email=params['email'];
    });

    console.log(this.key);
    console.log(this.rol);
    this.listaPlatosRef$ = this.database.list('dieta/'+this.key+'/platos').valueChanges();

    this.items2 = this.database.list('/dieta/'+this.key+'/platos',  ref => ref.orderByChild('platos')).valueChanges();
    this.items2.subscribe( valueOfItems => {
          console.log(valueOfItems);
    })


  }

  ngOnInit() {
  }
  atras(){

      this.router.navigate(['/nutricionadmin',{}]);
    
  }

  async elementoSeleccionado(plato:Plato,llave:string){

    this.items2.subscribe((pla) => {
      this.aux= pla;
    });

  
    const action = await this.actionSheet.create({
      header:`${plato.nombre}`,
      buttons: [
      {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () =>{
            if(this.aux.length===1){
              console.log("SÓLO HAY 1 PLATO");
              const alert = await this.alertController.create({
                header: 'Atención',
                message: 'La dieta debe tener al menos un plato.',
                buttons: ['OK']
              });
              await alert.present();
            }else{
              this.database.list('dieta/'+this.key+'/platos').remove(llave);

            }
          }
      }/*, {
          text: 'Editar',
          handler: () => {
            this.router.navigate(['/nutricioneditarplato',{ platoID: llave}]);
          }

        }*/
        ,{
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log("El usuario ha cancelado la petición");
          }
        }
      ]
    });
    await action.present();
  }
}
