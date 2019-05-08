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
  plat;
  ingredientes = [];
  pasos = [];

  ingrediente;
  paso;

  ningredientes=1;
  npasos=1;

  itemsRefPlato: AngularFireList<any>;
  itemsPlato: Observable<any[]>;

  aux = [];

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

  async agregarIngrediente(){
    this.ningredientes++;
    this.ingredientes.push(this.ingrediente);
    this.plato.ingredientes = this.ingredientes;
    for(var i =0 ; i< this.plato.ingredientes.length;i++){
      console.log(this.plato.ingredientes[i]);
    }
    document.getElementById('inputingrediente').setAttribute('value',"");
  }

  async agregarPaso(){
    this.npasos++;
    this.pasos.push(this.paso);
    this.plato.pasos = this.pasos;
    for(var i =0 ; i< this.plato.pasos.length;i++){
      console.log(this.plato.pasos[i]);
    }
    document.getElementById('inputpasos').setAttribute('value',"");

    this.aux= [];
    for(var i=0;i<this.npasos;i++){
        this.aux[i]=i+1;
    }

  }

  async agregarPlato(plato:Plato){
    const alert = await this.alertController.create({
      header: 'Atención',
      message: 'Se creó el plato correctamente',
      buttons: ['OK']
    });

    await alert.present();
    this.plato.ingredientes=this.ingredientes;
    this.plato.pasos=this.pasos;
    this.plato.tipo=(<HTMLSelectElement>document.getElementById('tipo')).value;
    this.itemsRefPlato.push(plato);
   
    document.getElementById('inputnombreplato').setAttribute('value',"");
    document.getElementById('inputdescripcionplato').setAttribute('value',"");
    document.getElementById('inputimagenplato').setAttribute('value',"");
  }

  async elementoSeleccionado(ingrediente:string){
    for( var i = 0; i < this.ingredientes.length; i++){ 
      if ( this.ingredientes[i] === ingrediente || ingrediente =="" ) {
          this.ingredientes.splice(i, 1); 
      }
   }
   this.ningredientes--;
 }
 async elementoSeleccionado2(paso:string){
  for( var i = 0; i < this.pasos.length; i++){ 
    if ( this.pasos[i] === paso || paso =="" ) {
        this.pasos.splice(i, 1); 
    }
 }
  this.npasos--;
  this.aux= [];
  for(var i=0;i<this.npasos;i++){
      this.aux[i]=i+1;
  }
 }

}
