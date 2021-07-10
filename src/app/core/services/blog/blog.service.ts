import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from '../../models/blog/blog';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';

@Injectable()
export class BlogService {
  blogs!: Observable<Blog[]>;
  tags: string[] = [];

  constructor(public afs: AngularFirestore) {
    this.loadAllBlogs();
    this.loadAllTags();
  }

  private loadAllBlogs(): void {
    this.blogs = this.afs
      .collection('blogs')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((a) => {
            const data = a.payload.doc.data() as Blog;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }
  private loadAllTags(): void {
    this.blogs.forEach((blogs) => {
      blogs.forEach((blog) => {
        blog.tags.forEach((tag) => {
          if (this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
          }
        });
      });
    });
  }

  getAllTags() {
    return this.tags;
  }
  getAllBlogs() {
    return this.blogs;
  }
}
