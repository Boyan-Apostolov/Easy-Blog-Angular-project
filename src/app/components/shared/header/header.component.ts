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
  public isLogged: boolean = false;
  public user!: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged;
    this.user = this.userService.currentUser;
  }

  logout() {
    this.userService.logout();
    window.location.reload();
    this.router.navigateByUrl('/');
  }
}
