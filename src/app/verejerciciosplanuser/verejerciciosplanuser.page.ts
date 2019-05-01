import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { NavController, ActionSheetController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList, snapshotChanges, AngularFireAction } from 'angularfire2/database';
import { database } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { PlanEjercicio } from '../modelos/planejercicio';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-verejerciciosplanuser',
  templateUrl: './verejerciciosplanuser.page.html',
  styleUrls: ['./verejerciciosplanuser.page.scss'],
})
export class VerejerciciosplanuserPage implements OnInit {

  plan= {} as PlanEjercicio;
  nombre;
  key;
  rol;
  email;
  listaEjerciciosRef$: Observable<any[]>
  constructor(public router: Router,private route: ActivatedRoute,public storage: Storage,public navCtrl: NavController, private database: AngularFireDatabase) {   
    let sub = this.route.params.subscribe(params => {
      this.key= params['planID'];
      this.rol=params['rol'];
      this.email=params['email'];
    });
    console.log(this.key);
    console.log(this.rol);
    this.listaEjerciciosRef$ = this.database.list('planejercicio/'+this.key+'/ejercicios').valueChanges();

  }
  ngOnInit() {
  }
  atras(){
    this.router.navigate(['/ejercicio',{ userEmail:this.email}]);
  }
}
