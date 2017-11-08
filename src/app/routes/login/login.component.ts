import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ApiCallsService} from '../../services/api-calls.service';
import {LoggedUserService} from '../../services/logged-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    'username': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required)
  });
  apiError: string;

  constructor(private apiSvc: ApiCallsService, private loggedUser: LoggedUserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log('LOGIN', this.loginForm.value);
    this.apiSvc.svcPost('/user/login', this.loginForm.value).subscribe(
      this.userLoggedIn.bind(this),
      this.userLoginError.bind(this)
    );
  }

  userLoggedIn(response) {
    this.loggedUser.login(response);
    this.router.navigate(['']);
  }

  userLoginError(err) {
    try {
    const _err = err.text();
      const _body = JSON.parse(_err);
      if (_body.hasOwnProperty('message')) {
        this.apiError = _body['message'];
      }
    } catch (err) {
      console.log('Error load login error', err);
    }
  }

}
