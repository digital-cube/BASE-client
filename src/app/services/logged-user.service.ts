import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class LoggedUserService {

  token: string;

  id: string;
  username: string;
  firstName: string;
  lastName: string;

  constructor(private http: Http) {
    this.token = localStorage.getItem('token');
  }

  getToken() {
    if (this.token) {
      return this.token;
    }

    this.token = localStorage.getItem('token');
    return this.token;
  }

  logout() {
    this.removeToken();
  }

  removeToken() {
    delete this.token;
    localStorage.removeItem('token');
  }

  login(response) {
    if (response.token) {
      this.setToken(response.token);
    }
    if (response.id) {
      this.id = response.id;
    }
    if (response.username) {
        this.username = response.username;
    }
    if (response.first_name) {
        this.firstName = response.first_name;
    }
    if (response.last_name) {
        this.lastName = response.last_name;
    }
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  checkUser() {
    const _header = new RequestOptions( {headers: new Headers({Authorization: this.token})} );
    return this.http.get(environment.api_url + '/user/login', _header);
  }

}
