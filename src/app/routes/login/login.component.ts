import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ApiCallsService} from '../../services/api-calls.service';
import {LoggedUserService} from '../../services/logged-user.service';
import {SocialAuthorization} from '../signup/signup.component';
import {AuthService} from 'angular-6-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SocialAuthorization implements OnInit {

  loginForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  });
  apiError: string;

  constructor(
    protected apiSvc: ApiCallsService,
    private loggedUser: LoggedUserService,
    private router: Router,
    protected socialAuthService: AuthService) {
    super(apiSvc, socialAuthService);
  }

  ngOnInit() {
  }

  login() {
    this.apiSvc.svcPost('/user/login', this.loginForm.value).subscribe(
      this.userLoggedIn.bind(this),
      this.userLoginError.bind(this)
    );
  }

  userLoggedIn(response) {
    this.loggedUser.login(response);
    this.router.navigate(['']);
  }

  userLoginError(response) {
    try {
    const _err = response.text();
      const _body = JSON.parse(_err);
      if (_body.hasOwnProperty('message')) {
        this.apiError = _body['message'];
      }
    } catch (err) {
      console.log('Error load login error', err);
      console.log('Initial error', response);
    }
  }

  userAuthorized(response) {
    /* overloaded method of SocialAuthorization*/
    this.userLoggedIn(response);
  }

  authorizationError(response) {
    /* overloaded method of SocialAuthorization*/
    this.userLoginError(response);
  }

}
