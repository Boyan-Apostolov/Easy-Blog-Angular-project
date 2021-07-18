import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthRoutingModule } from '../auth-routing.module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private users!: User[];
  formDisplay: boolean = true;
  loaderDisplay: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      users.forEach((user) => this.users.push(user));
    });
  }

  onLogin(email: string, password: string) {
    this.formDisplay = false;
    this.loaderDisplay = true;

    this.userService.login(email, password).catch((err) => {
      alert(err.message);

      this.formDisplay = true;
      this.loaderDisplay = false;
    });
  }

  googleAuth() {
    this.formDisplay = false;
    this.loaderDisplay = true;
    this.userService.googleAuth(this.users);
  }
}
