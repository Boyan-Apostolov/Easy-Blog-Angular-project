import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { BlogService } from 'src/app/core/services/blog/blog.service';

@Component({
  selector: 'app-blog-new',
  templateUrl: './blog-new.component.html',
  styleUrls: ['./blog-new.component.css'],
})
export class BlogNewComponent implements OnInit {
  error: any;
  fileLink: any;
  downloadURL!: Observable<string>;

  private subscriptions: Array<Subscription> = [];

  isLoading: boolean = false;

  blog: any = {
    title: '',
    imgUrl: '',
    content: '',
    tags: [],
  };
  tags: string = '';

  constructor(
    private storage: AngularFireStorage,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  onSubmit(blogImg: HTMLInputElement) {
    this.isLoading = true;
    if (
      (this.blog.title != '' && this.blog.content != '') ||
      blogImg == undefined
    ) {
      this.uploadImage(this.blog.title, blogImg, 'BlogImages');
      this.subscriptions.push(
        interval(3000)
          .pipe()
          .subscribe(() => {
            this.blog.tags = this.tags.replace(' ', '').split(',');
            this.blogService.addNewBlog(
              this.blog.title,
              (this.blog.imgUrl = this.fileLink),
              this.blog.content,
              this.blog.tags
            );
            this.error = {};
            this.isLoading = false;
            this.router.navigateByUrl('blogs/all');
          })
      );
    } else {
      this.isLoading = false;
      this.error = {
        title: 'Error!',
        message: 'All fields are required!',
        class: 'danger',
      };
      interval(3000).subscribe(() => {
        this.error = {};
      });
    }
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
