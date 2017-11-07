

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes =  [
    {path: '', component: HomeComponent //, canActivateChild: [RouteGuard],
    // children: [
    //   {path: '', component: DashboardComponent},
    //   {path: 'risk', component: RiskComponent,
    //     children: [
    //       {path: ':id_tck', component: RiskTicketComponent}
    //     ]
    //   },
    // ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {redirectTo: '/', path: '**', pathMatch: 'full'}
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
