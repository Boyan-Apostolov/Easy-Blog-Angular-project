import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { UserService } from '../../../core/services/user/user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdminDropdownShown: boolean = false;
  isNavHidden: boolean = true;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  get user(): User {
    return this.userService.currentUser;
  }

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

  toggleAdminDropdown() {
    this.isAdminDropdownShown = !this.isAdminDropdownShown;
  }

  toggleNav() {
    this.isNavHidden = !this.isNavHidden;
  }
}
