import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditsComponent } from './credits/credits.component';
import { HomeComponent } from './home/home.component';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { LoginComponent } from './login/login.component';
import { SecurePageComponent } from './secure-page/secure-page.component';
import { AuthGuard } from './session/session-guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'credits',
    component: CreditsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'securepage',
    component: SecurePageComponent,
    canActivate : [AuthGuard]
  },
  {
    path: '**',
    component: UnknownPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
