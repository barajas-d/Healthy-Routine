import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { NavController, ActionSheetController, AlertController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, snapshotChanges, AngularFireAction } from 'angularfire2/database';
import { database } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PlanEjercicio } from '../modelos/planejercicio';
import { map, switchMap } from 'rxjs/operators';
import { Ejercicio } from '../modelos/ejercicio';

@Component({
  selector: 'app-verejerciciosplan',
  templateUrl: './verejerciciosplan.page.html',
  styleUrls: ['./verejerciciosplan.page.scss'],
})
export class VerejerciciosplanPage implements OnInit {
  plan = {} as PlanEjercicio;
  nombre;
  key;
  rol;
  email;
  listaEjerciciosRef$: Observable<any[]>

  items2: Observable<any[]>;
  aux = []; 
  constructor(public alertController: AlertController,private actionSheet: ActionSheetController,public router: Router,private route: ActivatedRoute,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase) {   
    let sub = this.route.params.subscribe(params => {
      this.key= params['planID'];
      this.rol=params['rol'];
      this.email=params['email'];
    });
    console.log(this.key);
    console.log(this.rol);
    this.listaEjerciciosRef$ = this.database.list('planejercicio/'+this.key+'/ejercicios').valueChanges();


    this.items2 = this.database.list('/planejercicio/'+this.key+'/ejercicios',  ref => ref.orderByChild('ejercicios')).valueChanges();
    this.items2.subscribe( valueOfItems => {
          console.log(valueOfItems);
    })


  }

  ngOnInit() {
  }
  atras(){

      this.router.navigate(['/ejercicioadmin',{}]);
    
  }

  async elementoSeleccionado(ejercicio:Ejercicio,llave:string){

    this.items2.subscribe((pla) => {
      this.aux= pla;
    });

  
    const action = await this.actionSheet.create({
      header:`${ejercicio.nombre}`,
      buttons: [
      {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () =>{
            if(this.aux.length===1){
              console.log("SÓLO HAY 1 PLATO");
              const alert = await this.alertController.create({
                header: 'Atención',
                message: 'El plan debe tener al menos un ejercicio.',
                buttons: ['OK']
              });
              await alert.present();
            }else{
              this.database.list('planejercicio/'+this.key+'/ejercicios').remove(llave);

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
