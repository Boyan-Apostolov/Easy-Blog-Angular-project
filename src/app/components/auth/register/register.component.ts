import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { interval, Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fileLink: any;
  downloadURL!: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegister(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    bio: string,
    profilePic: HTMLInputElement
  ) {
    this.uploadImage(username, profilePic, 'ProfileImages');
    interval(3000)
      .pipe()
      .subscribe(() => {
        this.userService.register(
          username,
          email,
          password,
          bio,
          this.fileLink
        );

        this.router.navigateByUrl('/');
        window.location.reload();
      });
  }

  uploadImage(fileName: string, image: HTMLInputElement, path: string) {
    const file = image.files![0];
    const filePath = `${path}/${fileName}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`${path}/${fileName}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fileLink = url;
            }
          });
        })
      )
      .subscribe();
  }
}
