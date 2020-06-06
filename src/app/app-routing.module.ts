import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditsComponent } from './credits/credits.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component : HomeComponent
  },
  {
  path: 'credits',
  component : CreditsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
