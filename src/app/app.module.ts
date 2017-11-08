import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './routes/home/home.component';
import {AppRouter} from './routes/router.module';
import {LoginComponent} from './routes/login/login.component';
import {SignupComponent} from './routes/signup/signup.component';
import {ForgotPasswordComponent} from './routes/forgot-password/forgot-password.component';
import {AppMaterialModule} from './modules/app-material.module';
import {LookupService} from './services/lookup.service';
import {LoggedUserService} from './services/logged-user.service';
import {ApiCallsService} from './services/api-calls.service';
import {DashboardComponent} from './routes/home/dashboard/dashboard.component';
import {RouterGuardService} from './services/router-guard.service';
import {ResetPasswordComponent} from './routes/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ResetPasswordComponent
],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouter,
    AppMaterialModule
  ],
  providers: [
    LookupService,
    LoggedUserService,
    ApiCallsService,
    RouterGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
