import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController, MenuController } from '@ionic/angular';
import { Dieta } from '../modelos/dieta';  
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { defaultIterableDiffers } from '@angular/core/src/change_detection/change_detection';
import { AgregardietaPage } from '../agregardieta/agregardieta.page';
import { Ejercicio } from '../modelos/ejercicio';


@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.page.html',
  styleUrls: ['./ejercicio.page.scss'],
})
export class EjercicioPage implements OnInit {
  emaile;
  usuario = {} as User;
  genero;
  objetivo;
  estadoFisico;

  ejercicio = {} as Ejercicio;//diet

  itemsRefUsuario: AngularFireList<any>;
  itemsUsuario: Observable<any[]>;

  usuario$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  email$: BehaviorSubject<string|null>;
  listaEjerciciosRef$: Observable<any[]>
 
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  llaves=[];

  ejercicioss: Ejercicio [] =[];

  ejerciciosSeleccionadas: Ejercicio[] = [];

  constructor(public storage: Storage,private actionSheet: ActionSheetController,public router: Router,private database: AngularFireDatabase,private route: ActivatedRoute,private menu: MenuController,public navCtrl: NavController) { 
   
    let sub = this.route.params.subscribe(params => {
      this.emaile = params['userEmail'];
     });
     this.usuario.email=this.emaile;

    this.listaEjerciciosRef$= this.database.list('planejercicio').valueChanges();
   var arrayOfKeys = []

   this.items = this.database.list('/planejercicio',  ref => ref.orderByChild('visible').equalTo(true)).valueChanges();
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

  guardarPlan(genero2:string, objetivo2:string, estadoFisico2:string){
    this.genero = genero2;
    this.objetivo = objetivo2;
    this.estadoFisico = estadoFisico2;
  }

  recomendado(generoUsuario:string, objetivoUsuario:string, estadoFisicoUsuario:string){
    if(generoUsuario == this.genero || generoUsuario == "No definido"){
      if(objetivoUsuario == this.objetivo){
        if(estadoFisicoUsuario == this.estadoFisico){
          return "Recomendado"
        }
      }
    }
    return ""
  }

  ngOnInit() {
  }

   async elementoSeleccionado(ejercicio:Ejercicio,key:string){
       this.router.navigate(['/verejerciciosplanuser',{ planID: key, rol: 0, email: this.emaile}]);
  }
   
  atras(){
    this.router.navigate(['/userhome',{ userEmail: this.usuario.email}]);  
  }
}