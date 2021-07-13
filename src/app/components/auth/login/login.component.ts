import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(email: string, password: string) {
    this.userService.login(email, password);
    this.router.navigateByUrl('/');
    window.location.reload();
  }
}
