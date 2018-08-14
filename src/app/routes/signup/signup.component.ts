import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {LookupService} from '../../services/lookup.service';
import {ApiCallsService} from '../../services/api-calls.service';
import {LoggedUserService} from '../../services/logged-user.service';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';

@Component({
  selector: 'app-social-authorization'
})
export abstract class SocialAuthorization {
  /*
  Social authorization base component for sign up/login
   */

  protected constructor(
    protected apiSvc: ApiCallsService,
    protected socialAuthService: AuthService) {}

  authorize(socialType) {
    /*
    Handle social sign up/login.
    Prepare request for API
     */
    let socialPlatformProvider;
    switch (socialType) {
      case 'google':
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        break;
      case 'facebook':
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        break;
      default:
        console.log('MISSING PLATFORM PROVIDER');
        return;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      response => {

        let request_data;
        let url;
        switch (socialType) {
          case 'google':
            request_data = {
              token: response['token']
            };
            url = '/user/g-access';
            break;
          case 'facebook':
            request_data = {
              user: response
            };
            url = '/user/f-access';
            break;
          default:
            console.log('MISSING PLATFORM PROVIDER');
            return;
        }

        return this.apiSvc.svcPost(url, request_data).subscribe(
          this.userAuthorized.bind(this),
          this.authorizationError.bind(this)
        );
      }
    ).catch(
      err => {
        console.log('ERR', err);
        alert('Error in authorization');
      }
    );
  }

  abstract userAuthorized(response): void;
  abstract authorizationError(response): void;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends SocialAuthorization implements OnInit {

  loginRoles: {[key: string]: number};
  loginRolesKeys: string[];
  signUpForm = new FormGroup({
    'username': new FormControl('', [Validators.email, Validators.required]),
    'password': new FormControl('', Validators.required),
    'data': new FormGroup({
      'role_flags': new FormControl(`${this.lookup.roles.USER}`)
    }),
  });
  refObjectKeys = Object.keys;
  apiError: string;

  constructor(
    private lookup: LookupService,
    protected apiSvc: ApiCallsService,
    private loggedUser: LoggedUserService,
    private router: Router,
    protected socialAuthService: AuthService
  ) {
    super(apiSvc, socialAuthService);
    this.loginRoles = {
      'USER': this.lookup.roles.USER,
      'ADMIN': this.lookup.roles.ADMIN
    };
    this.loginRolesKeys = Object.keys(this.loginRoles);
  }

  ngOnInit() {
    this.signUpForm.setValue({
      'username': '',
      'password': '',
      'data': {
        'role_flags': `${this.lookup.roles.USER}`
      }
    });
  }

  signUp() {
    delete this.apiError;
    this.apiSvc.svcPost('/user/register', this.signUpForm.value).subscribe(
      this.userRegistered.bind(this),
      this.registerError.bind(this)
    );
  }

  userRegistered(response) {
    this.loggedUser.login(response);
    this.router.navigate(['/']);
  }

  registerError(err) {
    this.apiError = err.statusText || 'Error in register process';
    try {
      const _body = err.text();
      const _body_loaded = JSON.parse(_body);
      if (_body_loaded.hasOwnProperty('message')) {
        this.apiError = _body_loaded['message'];
      }
    } catch (error) {
      console.log('Error load body:', err, error);
    }
  }

  userAuthorized(response) {
    /* overloaded method of SocialAuthorization*/
    this.userRegistered(response);
  }

  authorizationError(response) {
    /* overloaded method of SocialAuthorization*/
    this.registerError(response);
  }

}
