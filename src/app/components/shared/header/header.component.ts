import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isLogged = this.userService.isLogged;
  public userPic = this.userService.getUserPic;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
