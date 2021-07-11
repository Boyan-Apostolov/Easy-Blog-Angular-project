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
  blogsCollection!: AngularFirestoreCollection<Blog>;
  blogDoc!: AngularFirestoreDocument<Blog>;

  blogs!: Observable<Blog[]>;
  tags: string[] = [];

  constructor(public afs: AngularFirestore) {
    this.initiateBlogsCollection();
    this.loadAllBlogs();
    this.loadAllTags();
  }

  private initiateBlogsCollection() {
    this.blogsCollection = this.afs.collection('blogs', (ref) =>
      ref.orderBy('createdOn', 'desc')
    );
  }

  private loadAllBlogs(): void {
    this.blogs = this.blogsCollection.snapshotChanges().pipe(
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
        blog.tags?.forEach((tag) => {
          if (this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
          }
        });
      });
    });
  }

  addNewBlog(title: string, imgUrl: string, content: string) {
    let blog: Blog = {
      title: title,
      imgUrl: imgUrl,
      content: content, //Sanitize
      creatorId: 'default-user', //Get Current User ID
      createdOn: new Date().toLocaleString(), //Current DateTime
    };
    this.blogsCollection.add(blog);
  }

  deteleBlog(blog: Blog) {
    this.blogDoc = this.afs.doc(`blogs/${blog.id}`);
    this.blogDoc.delete();
  }

  getAllTags() {
    return this.tags;
  }
  getAllBlogs() {
    return this.blogs;
  }
}