import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthProvider } from '../providers/auth'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../modelos/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email;
  usuario = {} as User;
  constructor(public router: Router,private route: ActivatedRoute,public navCtrl: NavController,private authProvider: AuthProvider) { 
    let sub = this.route.params.subscribe(params => {
      this.email = params['userEmail'];
       //console.log(params['userEmail']); 
     });
     this.usuario.email=this.email;
  }

  async ngOnInit() {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(3000);
    if(this.authProvider.usuarioActivo.rol==0){
      this.router.navigate(['/adminhome',{ userEmail: this.usuario.email}]);
      //this.navCtrl.navigateForward('adminhome');
    }else{
      this.router.navigate(['/userhome',{ userEmail: this.usuario.email}]);
      //this.navCtrl.navigateForward('userhome');
    }
  }
}