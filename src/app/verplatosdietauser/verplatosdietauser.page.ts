import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { NavController, ActionSheetController } from '@ionic/angular';
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
  dieta = [] ;
  dietaEjemplo = {} as Dieta;
  nombre;
  key;
  rol;
  email;
  aux=[];
  listaPlatosRef$: Observable<any[]>
  dietaPrueba: Observable<any[]>;
  constructor(public router: Router,private route: ActivatedRoute,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase) {   
    let sub = this.route.params.subscribe(params => {
      this.key= params['dietaID'];
      this.rol=params['rol'];
      this.email=params['email'];
    });
    console.log(this.key);
    console.log(this.rol);
    this.listaPlatosRef$ = this.database.list('dieta/'+this.key+'/platos').valueChanges();
  }

  ngOnInit() {
  }
  atras(){
    this.router.navigate(['/nutricion',{ userEmail:this.email}]);
  }
  seleccionarDieta(){

    var p = firebase.database().ref().child("dieta/"+this.key);
    p.on("value",(snap)=>{
      let data = snap.val();
      this.dieta=[];
      for(var key in data){
        this.dieta.push(data[key]);   
      }
    });

    console.log(this.dieta);

    var x = firebase.database().ref().child('dieta/'+this.dieta[1]).update({nombre:this.dieta[2],imagen:this.dieta[0],objetivo:this.dieta[3],platos:this.dieta[4],visible:this.dieta[6],vecesSeleccionada:this.dieta[5]+1});

  }
}
