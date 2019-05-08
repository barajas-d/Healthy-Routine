import { Component,ViewChild, OnInit } from '@angular/core';
import { database, User } from 'firebase';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tutoinicio',
  templateUrl: './tutoinicio.page.html',
  styleUrls: ['./tutoinicio.page.scss'],
})
export class TutoinicioPage implements OnInit {

  ngOnInit() {
  }
  showSkip = true;
  emaile;
  usuario = {} as User;
  @ViewChild('slides') slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
    private route: ActivatedRoute
  ) {
    
  }

  startApp() {
    this.router
      .navigateByUrl('/app/tabs/schedule')
      .then(() => this.storage.set('ion_did_tutorial', 'true'));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    this.storage.get('ion_did_tutorial').then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/schedule');
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
  continuar(){
    this.router.navigate(['/login',{}]);

  }
  login(){
    this.router.navigate(['/login',{}]);
  }
  registro(){
    this.router.navigate(['/register',{}]);

  }
}
