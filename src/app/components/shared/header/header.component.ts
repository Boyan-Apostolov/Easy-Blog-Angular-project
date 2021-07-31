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
  isAdmin: boolean = false;
  isAdminDropdownShown: boolean = false;
  isNavHidden: boolean = true;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  get user(): User {
    return this.userService.currentUser;
  }

  constructor(private userService: UserService, private router: Router) {
    this.isAdmin = this.userService.isAdmin;
  }

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
