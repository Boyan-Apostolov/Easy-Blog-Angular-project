import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Blog } from '../../models/blog/blog';
import { BlogComment } from '../../models/blog/comment';

import { UserService } from '../user/user-service.service';

import { badWords } from '../../models/bad-words-list';

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

  constructor(public afs: AngularFirestore, private userService: UserService) {
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

  addNewBlog(
    title: string,
    imgUrl: string,
    content: string,
    tags: string[] | undefined
  ) {
    let blog: Blog = {
      title: title,
      imgUrl: imgUrl,
      content: this.filterContent(content), //Sanitize
      user: this.userService.currentUser, //Get Current User ID
      createdOn: new Date().toLocaleString('en-US'), //Current DateTime
      tags: tags,
      comments: [],
      likes: [],
      views: [],
      saves: [],
    };

    this.blogsCollection.add(blog);
  }

  addComment(blog: Blog, content: string) {
    let comment: BlogComment = {
      content: content,
      postId: blog.id!,
      createdOn: new Date().toLocaleString('en-US'),
      user: this.userService.currentUser,
    };
    blog.comments?.push(comment);
    this.updateBlog(blog);
  }

  deleteComment(blog: Blog, comment: BlogComment) {
    blog.comments?.splice(blog.comments?.indexOf(comment), 1);
    this.updateBlog(blog);
  }

  deleteBlog(blog: Blog) {
    this.blogDoc = this.afs.doc(`blogs/${blog.id}`);
    this.blogDoc.delete();
  }

  updateBlog(blog: Blog) {
    this.blogDoc = this.afs.doc(`blogs/${blog.id}`);
    this.blogDoc.update(blog);
  }

  incrementBlogViews(blog: Blog, userId: string) {
    blog.views?.push(userId!);
    this.updateBlog(blog);
  }

  getAllTags() {
    return this.tags;
  }

  getAllBlogs() {
    return this.blogs;
  }
  likeBlog(blog: Blog, userId: string): boolean {
    if (!blog.likes?.includes(userId!)) {
      blog.likes?.push(userId!);
      this.updateBlog(blog);
      return true;
    } else {
      return false;
    }
  }

  bookmarkBlog(blog: Blog, userId: string): boolean {
    if (!blog.saves?.includes(userId!)) {
      blog.saves?.push(userId!);
      this.updateBlog(blog);
      return true;
    } else {
      return false;
    }
  }
  removeFromBookmarks(blog: Blog, userId: string) {
    if (blog.saves?.includes(userId!)) {
      blog.saves?.splice(blog.saves?.indexOf(userId));
      this.updateBlog(blog);
      return true;
    } else {
      return false;
    }
  }

  filterContent(content: string): string {
    badWords.forEach(
      (x) => (content = content.replace(x, '*'.repeat(x.length)))
    );
    return content;
  }
}
