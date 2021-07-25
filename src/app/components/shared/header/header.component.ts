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
  public isAdmin: boolean = false;
  public isAdminDropdownShown: boolean = false;
  public user!: User;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(private userService: UserService, private router: Router) {
    this.isAdmin = this.userService.isAdmin;

    if (this.isLogged) {
      this.user = this.userService.currentUser;
    }
  }

  ngOnInit() {}

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

  toggleAdminDropdown() {
    this.isAdminDropdownShown = !this.isAdminDropdownShown;
  }
}
