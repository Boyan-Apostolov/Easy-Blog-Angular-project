import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user-service.service';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedFromData = childRoute.data.isLogged;
    if (
      isLoggedFromData == this.userService.isLogged ||
      isLoggedFromData == undefined
    ) {
      return true;
    }
    const url = this.router.url;
    this.router.navigateByUrl(url);
    return false;
  }
}
