import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'userhome', loadChildren: './userhome/userhome.module#UserhomePageModule' },
  { path: 'nutricion', loadChildren: './nutricion/nutricion.module#NutricionPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'ejercicio', loadChildren: './ejercicio/ejercicio.module#EjercicioPageModule' },
  { path: 'nutricionadmin', loadChildren: './nutricionadmin/nutricionadmin.module#NutricionadminPageModule' },
  { path: 'adminhome', loadChildren: './adminhome/adminhome.module#AdminhomePageModule' },
  { path: 'agregardieta', loadChildren: './agregardieta/agregardieta.module#AgregardietaPageModule' },
  { path: 'nutricioneditardieta', loadChildren: './nutricioneditardieta/nutricioneditardieta.module#NutricioneditardietaPageModule' },
  { path: 'micuenta', loadChildren: './micuenta/micuenta.module#MicuentaPageModule' },
  { path: 'agregarplato', loadChildren: './agregarplato/agregarplato.module#AgregarplatoPageModule' },
  { path: 'verplatosdieta', loadChildren: './verplatosdieta/verplatosdieta.module#VerplatosdietaPageModule' },
  { path: 'verplatosdietauser', loadChildren: './verplatosdietauser/verplatosdietauser.module#VerplatosdietauserPageModule' },
  { path: 'nutricioneditarplato', loadChildren: './nutricioneditarplato/nutricioneditarplato.module#NutricioneditarplatoPageModule' },
  { path: 'ejercicioadmin', loadChildren: './ejercicioadmin/ejercicioadmin.module#EjercicioadminPageModule' },
  { path: 'agregarplan', loadChildren: './agregarplan/agregarplan.module#AgregarplanPageModule' },
  { path: 'agregarejercicio', loadChildren: './agregarejercicio/agregarejercicio.module#AgregarejercicioPageModule' },
  { path: 'ejercicioeditarejercicio', loadChildren: './ejercicioeditarejercicio/ejercicioeditarejercicio.module#EjercicioeditarejercicioPageModule' },
  { path: 'ejercicioeditarplan', loadChildren: './ejercicioeditarplan/ejercicioeditarplan.module#EjercicioeditarplanPageModule' },
  { path: 'verejerciciosplan', loadChildren: './verejerciciosplan/verejerciciosplan.module#VerejerciciosplanPageModule' },
  { path: 'verejerciciosplanuser', loadChildren: './verejerciciosplanuser/verejerciciosplanuser.module#VerejerciciosplanuserPageModule' },
  { path: 'reporteadmin', loadChildren: './reporteadmin/reporteadmin.module#ReporteadminPageModule' },
  { path: 'tuto', loadChildren: './tuto/tuto.module#TutoPageModule' },
  { path: 'terminos', loadChildren: './terminos/terminos.module#TerminosPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
