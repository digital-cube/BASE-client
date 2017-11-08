

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {RouterGuardService} from '../services/router-guard.service';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: DashboardComponent},
    ], canActivate: [RouterGuardService]
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:hash', component: ResetPasswordComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouter {}
