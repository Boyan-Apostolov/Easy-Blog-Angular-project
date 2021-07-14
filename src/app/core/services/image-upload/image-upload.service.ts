import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';

@Injectable()
export class ImageUploadService {
  constructor(private storage: AngularFireStorage) {}

  fileLink: any;
  downloadURL!: Observable<string>;

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
