import { Component, OnInit } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { MenuController, NavController, ActionSheetController } from '@ionic/angular';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../modelos/usuario';


@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.page.html',
  styleUrls: ['./micuenta.page.scss'],
})
export class MicuentaPage implements OnInit {
  emaile;
  usuario = {} as User;

  itemsRefUsuario: AngularFireList<any>;
  itemsUsuario: Observable<any[]>;

  usuario$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  email$: BehaviorSubject<string|null>;

  constructor(private actionSheet: ActionSheetController,public router: Router,private database: AngularFireDatabase,private route: ActivatedRoute,private menu: MenuController,public navCtrl: NavController) { 
    let sub = this.route.params.subscribe(params => {
      this.emaile = params['userEmail'];
       console.log(params['userEmail']); 
     });
     this.usuario.email=this.emaile;

    
    
    this.email$ = new BehaviorSubject(null);
    this.usuario$ = this.email$.pipe(
      switchMap(email => 
        database.list('/usuario', ref =>
         email ? ref.orderByChild('email').equalTo(email) : ref
        ).snapshotChanges()
      )
    );
    
    this.email$.next(this.usuario.email);
    
    console.log(this.email$.getValue());
    console.log(this.usuario$);

     this.itemsRefUsuario = database.list('usuario');
     this.itemsUsuario = this.itemsRefUsuario.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    }

  ngOnInit() {
  }

  atras(){
    this.router.navigate(['/userhome',{ userEmail: this.usuario.email}]);
  }

  async elementoSeleccionado(usuar:User,key:string){
    console.log(usuar.nombres);
    const action = await this.actionSheet.create({
      
      header:`${usuar.nombres}`,
      buttons: [
        {
          text: 'Editar',
          handler: () => {
            //this.router.navigate(['',{ dietaID: key}]);
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
