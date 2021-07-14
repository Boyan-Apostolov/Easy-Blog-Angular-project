import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user-service.service';
import { Router } from '@angular/router';
import { ImageUploadService } from 'src/app/core/services/image-upload/image-upload.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private subscriptions: Array<Subscription> = [];
  constructor(
    private imageUploadService: ImageUploadService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  formDisplay: boolean = true;
  loaderDisplay: boolean = false;

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  onRegister(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    bio: string,
    profilePic: HTMLInputElement
  ) {
    this.formDisplay = false;
    this.loaderDisplay = true;
    this.imageUploadService.uploadImage(username, profilePic, 'ProfileImages');

    this.subscriptions.push(
      interval(3000)
        .pipe()
        .subscribe(() => {
          this.userService
            .register(
              username,
              email,
              password,
              bio,
              this.imageUploadService.fileLink
            )
            .catch((err) => {
              alert(err.message);
              this.loaderDisplay = false;
              this.formDisplay = true;
              this.ngOnDestroy();
            });
        })
    );
  }
}
