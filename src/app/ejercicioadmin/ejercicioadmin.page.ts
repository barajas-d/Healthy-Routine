import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, ActionSheetController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { database } from 'firebase';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PlanEjercicio } from '../modelos/planejercicio';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ejercicioadmin',
  templateUrl: './ejercicioadmin.page.html',
  styleUrls: ['./ejercicioadmin.page.scss'],
})
export class EjercicioadminPage implements OnInit {
  planEjer = {} as PlanEjercicio;

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
   
  constructor(public router: Router,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase, private actionSheet: ActionSheetController) { 

    this.itemsRef = database.list('planejercicio');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  ngOnInit() {
  }
  atras(){
    this.navCtrl.navigateForward('adminhome');
  }
  swipeAll(event){
    if (event.direction == 2) {
      console.log('Swipe All', event);//direction 2 = right to left swipe.
    } 
  }

  agregarPlan(){
    this.router.navigate(['/agregarplan',{ }]);
  }
  agregarEjercicio(){
    this.router.navigate(['/agregarejercicio',{ }]);
  }

  eliminar(plan:PlanEjercicio){
      const itemsRef = this.database.list('planejercicio');
     
    }

    async elementoSeleccionado(plan:PlanEjercicio,key:string){
      var texto="Publicar";
      if(plan.visible===true){
        texto = "No publicar";
        console.log("VISIBLE");
      }
      const action = await this.actionSheet.create({
        header:`${plan.nombre}`,
        buttons: [
          {
            text: texto,
            handler: () => {
              if(texto==="Publicar"){
                plan.visible=true;
              }else{
                plan.visible=false;
              }
              this.itemsRef.update(key,plan);
            }
          },
          {
            text: 'Ver ejercicios del plan',
            handler: () => {
              this.router.navigate(['/verejerciciosplan',{ planID: key, rol: 1, email: 'admin@gmail.com'}]);
            }
          },
          {
            text: 'Editar',
            handler: () => {
              this.router.navigate(['/ejercicioeditarplan',{ planID: key}]);
            }

          },{
            text: 'Eliminar',
            role: 'destructive',
            handler: () =>{
              this.itemsRef.remove(key);
            }
          },
          {
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
