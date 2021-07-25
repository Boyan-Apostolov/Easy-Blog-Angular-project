import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user-service.service';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UrlTree | boolean {
    const isLoggedFromData = childRoute.data.isLogged;
    const isAdminFromData = childRoute.data.isAdmin;
    if (
      isLoggedFromData == this.userService.isLogged ||
      isLoggedFromData == undefined
    ) {
      if (isAdminFromData) {
        if (isAdminFromData == this.userService.isAdmin) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    return this.router.parseUrl('/auth/login');
  }
}
