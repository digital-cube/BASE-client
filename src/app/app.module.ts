import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
import {HttpClientModule} from '@angular/common/http';
import {appConfig} from './config/app.config';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  // LinkedinLoginProvider,
} from 'angular-6-social-login';

// Social Login Library Configuration
export function getSocialAuthServiceConfigs() {
  return new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(appConfig.facebookApiID)
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(appConfig.googleApiClientID)
      },
      // {
      //   id: LinkedinLoginProvider.PROVIDER_ID,
      //   provider: new LinkedinLoginProvider(appConfig.linkedInAppID)
      // }
    ]
  );
}

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
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouter,
    AppMaterialModule,
    SocialLoginModule
  ],
  providers: [
    LookupService,
    LoggedUserService,
    ApiCallsService,
    RouterGuardService,
    {
      provide: AuthServiceConfig,
      useFactory: getSocialAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
