import { Injectable } from '@angular/core';

@Injectable()
export class LoggedUserService {

  token: string;

  constructor() { }

  getToken() {
    return this.token;
  }

  login(response) {
    this.token = response.token;
  }
}
