import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { User } from '../modelos/usuario'
import { AngularFirestore } from '@angular/fire/firestore'
import { NavController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  error_messages = {
    'email':[
      { type: 'required', message: 'Email es requerido. (Asociado a gmail)'},
      { type: 'minLength', message: 'Email debe tener 6 o más caracteres.'},
      { type: 'maxLength', message: 'Email debe ser menor a 50 caracteres.'},
      { type: 'pattern', message: 'Por favor ingrese un email válido (Asociado a gmail).'}
    ],
    'password':[
      { type: 'required', message: 'Contraseña es requerida.'},
      { type: 'minLength', message: 'Contraseña debe tener 6 o más caracteres.'},
      { type: 'maxLength', message: 'Contraseña debe ser menor a 50 caracteres.'},
      { type: 'pattern', message: 'Por favor ingrese una contraseña válida (Mayúsculas, minúsculas y números).'}
    ],
    'edad':[
      { type: 'required', message: 'La edad es requerida.'},
      { type: 'pattern', message: 'Por favor ingrese una edad válida.'}
    ],
    'peso':[
      { type: 'required', message: 'El peso es requerido.'},
      { type: 'pattern', message: 'Por favor ingrese un peso válido en kilogramos. Ejemplo (65) (81)'}
    ],
    'altura':[
      { type: 'required', message: 'La altura es requerida.'},
      { type: 'pattern', message: 'Por favor ingrese una altura válida en metros. Ejemplo (1,80) (1,64) '}
    ],
    'nombres':[
      { type: 'required', message: 'El nombre es requerido.'},
    ],
    'apellidos':[
      { type: 'required', message: 'El apellido es requerido.'},
    ]
    
  }

  itemsRefUsuario: AngularFireList<any>;
  itemsUsuario: Observable<any[]>;
  usuario = {} as User;
  constructor(public router: Router,public alertController: AlertController,private database: AngularFireDatabase,public afAuth: AngularFireAuth,public navCtrl: NavController,public formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(50),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      edad: new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(2),
        Validators.pattern('14|15|16|17|18|19|([2-9][0-9])')
      ])),
      peso: new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('([2-9][0-9])|((1|2)[0-9][0-9])')
      ])),
      altura: new FormControl('',Validators.compose([
        Validators.required,
        Validators.maxLength(4),
        Validators.pattern('(1[0-9][0-9])')
      ])),
      nombres: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      apellidos: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      cbox: [false, this.mustBeTruthy]
    });
    this.itemsRefUsuario = database.list('usuario');
    // Use snapshotChanges().map() to store the key
    this.itemsUsuario = this.itemsRefUsuario.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  mustBeTruthy(c: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!c.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }
  ngOnInit() {
  }
  async registrarse(usuario){
    try{
      if(usuario.email==='admin@gmail.com'){
        this.usuario.rol=1;
      }else{
        this.usuario.rol=0;
        this.usuario.genero = (<HTMLSelectElement>document.getElementById('genero')).value;
      }
     const res = await this.afAuth.auth.createUserWithEmailAndPassword(usuario.email,usuario.password);
     if(res){
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Su cuenta ha sido creada correctamente.',
        buttons: ['OK']
      });
  
      await alert.present();
      this.itemsRefUsuario.push(usuario);
      document.getElementById('inputemail').setAttribute('value',"");
      document.getElementById('inputpassword').setAttribute('value',"");
      document.getElementById('inputnombres').setAttribute('value',"");
      document.getElementById('inputapellidos').setAttribute('value',"");
      document.getElementById('inputedad').setAttribute('value',"");

        this.navCtrl.navigateForward('login');
     }
    }catch(e){
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'No fue posible validar su registro.'+ e,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }
  atras(){
    document.getElementById('inputemail').setAttribute('value',"");
      document.getElementById('inputpassword').setAttribute('value',"");
    this.navCtrl.navigateForward('login');
  }

  mostrarTerminosCondiciones() {
    this.router.navigate(['/terminos',{}]);

  }
}
