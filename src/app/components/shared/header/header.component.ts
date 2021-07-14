import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user/user-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isLogged: boolean = false;
  public userPic: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged;
    this.userPic = this.userService.getUserPic;
  }

  logout() {
    this.userService.logout();
    window.location.reload();
    this.router.navigateByUrl('/');
  }
}
