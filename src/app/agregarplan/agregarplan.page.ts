import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, ActionSheetController, ToastController, AlertController, Platform } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from 'angularfire2/database';
import { database } from 'firebase';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PlanEjercicio } from '../modelos/planejercicio';
import { map } from 'rxjs/operators';
import { Ejercicio } from '../modelos/ejercicio';
@Component({
  selector: 'app-agregarplan',
  templateUrl: './agregarplan.page.html',
  styleUrls: ['./agregarplan.page.scss'],
})
export class AgregarplanPage implements OnInit {

  plan = {} as PlanEjercicio;
  ejercicio = {} as Ejercicio;
  
  itemsRefPlan: AngularFireList<any>;
  itemsPlan: Observable<any[]>;
  
  itemsRefEjercicio: AngularFireList<any>;
  itemsEjercicio: Observable<any[]>;

  ejerciciosSeleccionados: Ejercicio[] = [];
  llaves = [];
  
  constructor(public alertController: AlertController,public router: Router,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase, private actionSheet: ActionSheetController) { 
    this.ejerciciosSeleccionados=[];
    this.itemsRefPlan = database.list('planejercicio');
    // Use snapshotChanges().map() to store the key
    this.itemsPlan = this.itemsRefPlan.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

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

  agregarPlato(){
    this.router.navigate(['/agregarplato',{ }]);
  }
  async nuevoPlan(plan:PlanEjercicio){
    if(this.ejerciciosSeleccionados.length===0){
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'Debe seleccionar al menos un ejercicio.',
        buttons: ['OK']
      });
      await alert.present();
    }
   else{
      plan.visible = false;
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'Se creó el plan correctamente',
        buttons: ['OK']
      });
      await alert.present();
      var valorllave =this.itemsRefPlan.push(plan).key;
      for(var i=0;i<this.ejerciciosSeleccionados.length;i++){
        var llf = this.database.list('planejercicio/'+valorllave+'/ejercicios').push(this.ejerciciosSeleccionados[i]).key;
        this.ejerciciosSeleccionados[i].key=llf;
        this.database.list('dieta/'+valorllave+'/platos/').update(llf,this.ejerciciosSeleccionados[i]);
        console.log(llf);
      }
       
    document.getElementById('inputobjetivo').setAttribute('value',"");
    document.getElementById('inputnombre').setAttribute('value',"");
    document.getElementById('inputimagen').setAttribute('value',"");
    
  }
}
  volver(){
    this.router.navigate(['/ejercicioadmin',{ }]);
  }

  async elementoSeleccionado(ejercicio:Ejercicio,key:string){
    var texto="Agregar ejercicio al plan";
    for(var i = 0;i<this.ejerciciosSeleccionados.length;i++) { 
      if(this.ejerciciosSeleccionados[i].nombre===ejercicio.nombre){
        texto="Quitar ejercicio del plan";
        break;
      }
    }
    const action = await this.actionSheet.create({
      header:`${ejercicio.nombre}`,
      buttons: [
        {
          text: texto,
          handler: () =>{
            if(texto==="Agregar ejercicio al plan"){
              this.ejerciciosSeleccionados.push(ejercicio);
              this.llaves.push(key);
            }else{
              for(var i = 0;i<this.ejerciciosSeleccionados.length;i++) { 
                if(this.ejerciciosSeleccionados[i].nombre===ejercicio.nombre){
                    this.ejerciciosSeleccionados.splice(i,1);
                    this.llaves.splice(i,1);
                }
              }
            }
          } 
         },
       {
          text: 'Eliminar',
          role: 'destructive',
          handler: () =>{
            this.itemsRefEjercicio.remove(key);
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

