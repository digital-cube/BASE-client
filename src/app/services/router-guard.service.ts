import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LoggedUserService} from './logged-user.service';

@Injectable()
export class RouterGuardService implements CanActivate, CanActivateChild {

  constructor(private loggedUser: LoggedUserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.loggedUser.checkUser().map( r => r.json() ).subscribe(
        r => {
          if (!this.loggedUser.token) {
            this.loggedUser.login(r);
          }
          this.router.navigate(['']);
          resolve(true);
        },
        err => {
          this.router.navigate(['/login']);
          resolve(false);
        }
      );
      resolve(true);
    });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
}
