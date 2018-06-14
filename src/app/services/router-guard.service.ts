import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {LoggedUserService} from './logged-user.service';

@Injectable()
export class RouterGuardService implements CanActivate, CanActivateChild {

  constructor(private loggedUser: LoggedUserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.loggedUser.checkUser().subscribe(
        r => {
          this.loggedUser.login(r);
          resolve(true);
        },
        err => {
          this.router.navigate(['/login']);
          resolve(false);
        }
      );
    });
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
}
