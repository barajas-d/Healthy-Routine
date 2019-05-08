import { Component, OnInit } from '@angular/core';
import { NavController, Events,ActionSheetController, MenuController } from '@ionic/angular';
import { Dieta } from '../modelos/dieta';  
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { defaultIterableDiffers } from '@angular/core/src/change_detection/change_detection';
import { AgregardietaPage } from '../agregardieta/agregardieta.page';

@Component({
  selector: 'app-nutricion',
  templateUrl: './nutricion.page.html',
  styleUrls: ['./nutricion.page.scss'],
})
export class NutricionPage implements OnInit {
  rate=0;
  emaile;
  usuario = {} as User;
  diet = {} as Dieta;
  itemsRefUsuario: AngularFireList<any>;
  itemsUsuario: Observable<any[]>;

  usuario$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  email$: BehaviorSubject<string|null>;
  listaDietasRef$: Observable<any[]>
 
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  llaves=[];
  dietass: Dieta [] =[];

  dietasSeleccionadas: Dieta[] = [];

  aux=[];

 

  constructor(public events: Events,public storage: Storage,private actionSheet: ActionSheetController,public router: Router,private database: AngularFireDatabase,private route: ActivatedRoute,private menu: MenuController,public navCtrl: NavController) { 
    let sub = this.route.params.subscribe(params => {
      this.emaile = params['userEmail'];
     });
     this.usuario.email=this.emaile;

    this.listaDietasRef$= this.database.list('dieta').valueChanges();
   var arrayOfKeys = []

   this.items = this.database.list('/dieta',  ref => ref.orderByChild('visible').equalTo(true)).valueChanges();
    this.items.subscribe( valueOfItems => {
        console.log(valueOfItems);
    })

/*
   this.database.database.ref('dieta')
   .orderByChild('visible')
   .equalTo(true)
   .once('value')
   .then(snapshot=>{
       snapshot.forEach(function(child_element){
       arrayOfKeys.push(child_element.key)
       console.log(child_element.key)
       
   })
   }
   );
   */
   
    
    
    this.email$ = new BehaviorSubject(null);
    this.usuario$ = this.email$.pipe(
      switchMap(email => 
        database.list('/usuario', ref =>
         email ? ref.orderByChild('email').equalTo(email) : ref
        ).snapshotChanges()
      )
    );
    
    this.email$.next(this.usuario.email);

     this.itemsRefUsuario = database.list('usuario');
     this.itemsUsuario = this.itemsRefUsuario.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  ngOnInit() {
  }

   async elementoSeleccionado(dieta:Dieta,key:string){
     this.diet=dieta
    this.router.navigate(['/verplatosdietauser',{ dietaID: key, rol: 0, email: this.emaile}]);
  }
   
  atras(){
    this.router.navigate(['/userhome',{ userEmail: this.usuario.email}]);  
  }

  

}
