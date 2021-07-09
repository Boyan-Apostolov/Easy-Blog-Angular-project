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
  blogs: Observable<Blog[]>;
  // itemsCollection: AngularFirestoreCollection<Item>;
  constructor(public afs: AngularFirestore) {
    //this.items = this.afs.collection('items').valueChanges();
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
  getAllBlogs() {
    return this.blogs;
  }
}
