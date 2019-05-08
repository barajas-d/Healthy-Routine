import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { NavController, ActionSheetController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, snapshotChanges, AngularFireAction } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Dieta } from '../modelos/dieta';
import { map, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-verplatosdietauser',
  templateUrl: './verplatosdietauser.page.html',
  styleUrls: ['./verplatosdietauser.page.scss'],
})
export class VerplatosdietauserPage implements OnInit {
  dieta =[];
  todasDietas = [];
  planes= [];

  dietaEjemplo = {} as Dieta;
  
  nombre;
  key;
  rol;
  email;
  aux=[];

  a;

  usuarios=[];
  keys=[];
  usuario = [];
  llaveUsuario;
  llaveDieta

  listaPlatosRef$: Observable<any[]>
  dietaPrueba: Observable<any[]>;
  constructor(public alertController: AlertController,private loadingCtrl: LoadingController,public router: Router,private route: ActivatedRoute,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase) {   
    let sub = this.route.params.subscribe(params => {
      this.key= params['dietaID'];
      this.rol=params['rol'];
      this.email=params['email'];
    });
    console.log(this.key);
    console.log(this.rol);
    this.listaPlatosRef$ = this.database.list('dieta/'+this.key+'/platos').valueChanges();
    this.a=true;
    
  }


  getUsuario(){
    return new Promise((resolve) => {
      this.usuarios=[];
      this.keys=[];
      var p = firebase.database().ref().child("/usuario");
      p.on("value",(snap)=>{
        let data = snap.val();
        for(var key in data){
          this.keys.push(key);
          this.usuarios.push(data[key]);  
        }
        resolve(true);
      });

    });
  }

 async ngOnInit() {
   this.usuario=[];
   return new Promise(async (resolve) => {
    let loader = await this.loadingCtrl.create({});
    loader.present();
    this.getUsuario().then((x) => {
      if(x){
        for(var i=0;i<this.usuarios.length;i++){
          if(this.usuarios[i].email===this.email){
            this.usuario.push(this.usuarios[i]);
            this.llaveUsuario=this.keys[i];
          }
        }
        console.log('USUARIO '+this.usuario[0].email);
        loader.dismiss();
        resolve(true);
      }
    });
  });
  }
  atras(){
    this.router.navigate(['/nutricion',{ userEmail:this.email}]);
  }
  agregarDieta(){
    this.dieta=[];
    return new Promise((resolve) => {
    var p = firebase.database().ref().child("dieta");
    p.on("value",(snap)=>{
      let data = snap.val();
      for(var key in data){
        if(key==this.key){
          this.dieta.push(data[key]);   
          resolve(true);
        }
          this.todasDietas.push(data[key]);
        console.log(this.dieta);
      }
      console.log(this.dieta);
    });
  });
}
  async seleccionarDieta(){    
      let loader = await this.loadingCtrl.create({});
      loader.present();
      this.agregarDieta().then(async (y) => {
        loader.dismiss();
        if(y){
          let loaderr = await this.loadingCtrl.create({});
          loaderr.present();
          this.ngOnInit().then(async (x) => {
          loaderr.dismiss();
          if(x){
            console.log(this.usuario[0]);
            if(this.usuario[0].dietas!==undefined){
              const alert = await this.alertController.create({
              header: 'Atención',
              message: 'Ya tiene una dieta agregada.',
              buttons: ['OK']
              });
              await alert.present();
          }else{
            console.log(this.usuario[0].dietas);
            console.log(this.dieta);
            firebase.database().ref().child('dieta/'+this.dieta[0].key).update({descripcion:this.dieta[0].descripcion,duracion:this.dieta[0].duracion,nombre:this.dieta[0].nombre,imagen:this.dieta[0].imagen,objetivo:this.dieta[0].objetivo,platos:this.dieta[0].platos,visible:this.dieta[0].visible,vecesSeleccionada:this.dieta[0].vecesSeleccionada+1});
            this.dieta[0].vecesSeleccionada += 1 ; 
            let llf=this.database.list('usuario/'+this.llaveUsuario+'/dietas').push(this.dieta[0]).key;
            this.dieta[0].key=llf;
            this.database.list('usuario/'+this.llaveUsuario+'/dietas').update(llf,this.dieta[0]);
          }
        }
      });
    }
      });
    }
   

    //var x = firebase.database().ref().child('dieta/'+this.dieta[3]).update({descripcion:this.dieta[0],duracion:this.dieta[1],nombre:this.dieta[4],imagen:this.dieta[2],objetivo:this.dieta[5],platos:this.dieta[6],visible:this.dieta[8],vecesSeleccionada:this.dieta[7]+1});
    
    //var z = this.database.list('usuario/'+this.llaveUsuario+'/dietas').push(this.dieta).key;
    //var y = firebase.database().ref().child('usuario/'+this.llave+'/dietas/'+z).update({nombres:this.usuarios[7],apellidos:this.usuarios[1],email:this.usuarios[3],password:this.usuarios[8],edad:this.usuarios[2],rol:this.usuarios[10],peso:this.usuarios[9],altura:this.usuarios[0],genero:this.usuarios[5],estadofisico:this.usuarios[4],meta:this.usuarios[6],dietas:this.dieta,planes:this.planes});
    

}
