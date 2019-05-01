import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { User } from '../modelos/usuario'
import { NavController, AlertController } from '@ionic/angular';
import { AuthProvider } from '../providers/auth'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  error_messages = {
    'email':[
      { type: 'required', message: 'Email es requerido.'},
      { type: 'minLength', message: 'Email debe tener 6 o más caracteres.'},
      { type: 'maxLength', message: 'Email debe ser menor a 50 caracteres.'},
      { type: 'pattern', message: 'Por favor ingrese un email válido.'}
    ],
    'password':[
      { type: 'required', message: 'Contraseña es requerida.'},
      { type: 'minLength', message: 'Contraseña debe tener 6 o más caracteres.'},
      { type: 'maxLength', message: 'Contraseña debe ser menor a 50 caracteres.'},
      { type: 'pattern', message: 'Por favor ingrese una contraseña válida (Mayúsculas, minúsculas y números).'}
    ],
  }
  usuario = {} as User;

  constructor(public router: Router,public alertController: AlertController,public afAuth: AngularFireAuth,public navCtrl: NavController, private authProvider: AuthProvider,public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
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
      ]))
    });
  }

  ngOnInit() {
    
  }
  async login(usuario){
      try{
        const res = await this.afAuth.auth.signInWithEmailAndPassword(usuario.email,usuario.password);
        if(res){
          if(this.usuario.email.match("admin@gmail.com")){
            this.authProvider.usuarioActivo.rol= 0;
          }else{
            this.authProvider.usuarioActivo.rol=1;
          }
          this.authProvider.usuarioActivo.email=usuario.email;
          this.router.navigate(['/home',{ userEmail: this.usuario.email}]);
          //this.navCtrl.navigateForward('home');
          document.getElementById('inputema').setAttribute('value',"");
          document.getElementById('inputpasswo').setAttribute('value',"");
        }
      }
      catch(e){
        const alert = await this.alertController.create({
          header: 'Alerta',
          message: 'No fue posible validar su ingreso.',
          buttons: ['OK']
        });
    
        await alert.present();
        console.dir(e);
      }
  }
  registro(){
    document.getElementById('inputema').setAttribute('value',"");
    document.getElementById('inputpasswo').setAttribute('value',"");
    this.navCtrl.navigateForward('register');
  }
}
