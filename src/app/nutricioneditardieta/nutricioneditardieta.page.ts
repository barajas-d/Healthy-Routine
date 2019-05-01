import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { NavController, ActionSheetController, NavParams, AlertController } from '@ionic/angular';
import { Dieta } from '../modelos/dieta';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Plato } from '../modelos/plato';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-nutricioneditardieta',
  templateUrl: './nutricioneditardieta.page.html',
  styleUrls: ['./nutricioneditardieta.page.scss'],
})
export class NutricioneditardietaPage implements OnInit {
  dieta = {} as Dieta;

   key;
   itemsRef: AngularFireList<any>;
   items: Observable<any[]>;
   items2: Observable<any[]>;

   arreglo: Observable<any[]>;

   platosSeleccionados: Plato[] = [];
   itemsRefPlato: AngularFireList<any>;
   itemsPlato: Observable<any[]>;
  tam=0;
   filteredItems: Array<Plato> = [];
   platico:Plato;
   aux = [];
   auxiliar = []; 
  constructor(public alertController: AlertController,private actionSheet: ActionSheetController,private route: ActivatedRoute,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase) { 
    this.itemsRef = database.list('dieta');
    this.platosSeleccionados=[];
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    let sub = this.route.params.subscribe(params => {
     this.key = params['dietaID'];
    });


    this.arreglo = this.database.list('/dieta/'+this.key,  ref => ref.orderByChild('nombre')).valueChanges();
    this.arreglo.subscribe( valueOfItems => {
        console.log(valueOfItems);
    })

    this.arreglo.subscribe((pla) => {
      this.auxiliar= pla;
      this.cambiarValor();
    });



    this.items2 = this.database.list('/dieta/'+this.key+'/platos',  ref => ref.orderByChild('platos')).valueChanges();
    this.items2.subscribe( valueOfItems => {
        this.tam++;
        console.log(valueOfItems);
    })

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

  cambiarValor(){
    console.log(this.auxiliar);

    if(this.auxiliar.length===6){
      document.getElementById('inputnombre').setAttribute('value',this.auxiliar[2]);
      document.getElementById('inputobjetivo').setAttribute('value',this.auxiliar[3]);
      document.getElementById('inputimagen').setAttribute('value',this.auxiliar[0]);
    }else if(this.auxiliar.length===5){
      document.getElementById('inputnombre').setAttribute('value',this.auxiliar[1]);
        document.getElementById('inputobjetivo').setAttribute('value',this.auxiliar[2]);
        document.getElementById('inputimagen').setAttribute('value',this.auxiliar[0]);
    }
        

    
  }
  async elementoSeleccionado(plato:Plato,key:string){
   
    var texto="Agregar plato a la dieta";

    for(var i = 0;i<this.platosSeleccionados.length;i++) { 
      if(this.platosSeleccionados[i].nombre===plato.nombre){
        texto="Quitar plato de la dieta";
        break;
      }
    }
    console.log('hola'+texto);
      const action = await this.actionSheet.create({
        header:`${plato.nombre}`,
        buttons: [
          {
            text: texto,
            handler: () =>{
              if(texto==="Agregar plato a la dieta"){
                this.platosSeleccionados.push(plato);
              }else{
                for(var i = 0;i<this.platosSeleccionados.length;i++) { 
                  if(this.platosSeleccionados[i].nombre===plato.nombre){
                      this.platosSeleccionados.splice(i,1);
                  }
                }
              }
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

   actualizardieta(dieta:Dieta){

    this.items2.subscribe((pla) => {
      this.aux= pla;
      this.invocar(this.aux,dieta);
    });

    for(var i =0;i<this.platosSeleccionados.length;i++){
      var llf = this.database.list('dieta/'+this.key+'/platos').push(this.platosSeleccionados[i]).key;
        this.platosSeleccionados[i].key=llf;
        this.database.list('dieta/'+this.key+'/platos/').update(llf,this.platosSeleccionados[i]);
      console.log(this.platosSeleccionados[i].nombre);
  }
  
    //this.database.list('dieta/'+this.key+'/platos').push(this.platosSeleccionados);

    this.itemsRef.update(this.key,dieta);


     
  }

  invocar(platos:any,dieta:Dieta){
    var k=this.platosSeleccionados.length;
    for(var i=0; i< this.aux.length;i++){
      for(var j=0; j<this.platosSeleccionados.length;j++){
        console.log('tamano '+this.aux.length+'--le--'+k);
        console.log(i+'--'+j);
        console.log(this.aux[i].nombre+'--'+this.platosSeleccionados[j].nombre);
        if(this.aux[i].nombre===this.platosSeleccionados[j].nombre){
       
          console.log('El plato '+this.platosSeleccionados[j].nombre+' ya está en la dieta');
          this.platosSeleccionados.splice(j,1);
        }else{
            console.log('Se agregó el plato '+this.platosSeleccionados[j].nombre);
        }
      }
    }
  

  }

  volver(){
    this.navCtrl.navigateForward('nutricionadmin');
  }
}
