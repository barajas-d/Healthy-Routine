import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { HttpModule } from '@angular/http'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthProvider } from './providers/auth'
import { NutricionPage } from './nutricion/nutricion.page';
import { EjercicioPage } from './ejercicio/ejercicio.page';
import { TabsPage } from './tabs/tabs.page';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {MyHammerConfig} from './myHammerConfig';
import { NgCalendarModule } from 'ionic2-calendar';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [AppComponent, RatingComponent],
  entryComponents: [],
  imports: [BrowserModule,
            NgCalendarModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(firebaseConfig),
	          AngularFireAuthModule,
            AngularFirestoreModule,
            AngularFireDatabaseModule,
            IonicStorageModule.forRoot()          ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig},
    AuthProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
