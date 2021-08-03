import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user/user';
import { UserService } from 'src/app/core/services/user/user-service.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users$!: Observable<User[]>;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
  }
  freezeUser(user: User) {
    if (confirm('Are you sure you want to freeze this user?')) {
      this.userService.freezeUser(user);
    }
  }
  unFreezeUser(user: User) {
    if (confirm('Are you sure you want to unFreeze this user?')) {
      this.userService.unFreezeUser(user);
    }
  }
}
