import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'principal',
        component: HomeComponent
      },
      {
        path: 'registro',
        component: SignInComponent
      },
      {
        path: 'inciarSesion',
        component: LoginComponent
      },
      {
        path: '**',
        redirectTo: 'principal'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
