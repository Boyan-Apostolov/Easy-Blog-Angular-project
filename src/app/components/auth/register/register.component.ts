import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user-service.service';
import { ImageUploadService } from 'src/app/core/services/image-upload/image-upload.service';
import { NgForm } from '@angular/forms';
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

  onRegister(formData: NgForm, profilePic: HTMLInputElement) {
    this.formDisplay = false;
    this.loaderDisplay = true;

    const data = Object.values(formData);
    const username = data[0];
    const email = data[1];
    const password = data[2];
    const bio = data[4];

    if (!profilePic.value) {
      alert('Profile picture is required!');
      this.formDisplay = true;
      this.loaderDisplay = false;
      return;
    }

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
