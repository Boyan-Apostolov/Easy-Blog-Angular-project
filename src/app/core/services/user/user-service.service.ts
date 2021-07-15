import { Injectable } from '@angular/core';
import { Achievment } from '../../models/user/achievment';
import { User } from '../../models/user/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class UserService {
  public achievmentImgUrl: string =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png';

  userInfo!: any;
  usersCollection!: AngularFirestoreCollection<User>;
  userDoc!: AngularFirestoreDocument<User>;
  users!: Observable<User[]>;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    public afs: AngularFirestore
  ) {
    this.usersCollection = this.afs.collection('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((a) => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  get isLogged(): boolean {
    return localStorage['user_data'] != undefined;
  }

  login(email: string, password: string) {
    return this.fireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        this.users.subscribe((users) => {
          let user = users.filter((x) => x.email === email)[0];
          this.addUserToLocalStorage(JSON.stringify(user));
        });
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        this.router.navigateByUrl('/');
      });
  }

  register(
    username: string,
    email: string,
    password: string,
    bio: string,
    imgUrl: string
  ) {
    return this.fireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((userData) => {
        let user: User = {
          firebaseId: userData.user!.uid!,
          username: username,
          email: email,
          bio: bio,
          imgUrl: imgUrl,
        };

        this.usersCollection.add(user);

        this.users.subscribe((users) => {
          user.id = users.filter((x) => x.email === email)[0].id;
          this.addUserToLocalStorage(JSON.stringify(user));
        });
      })
      .finally(() => {
        this.router.navigateByUrl('/');
      });
  }

  logout() {
    return this.fireAuth.auth
      .signOut()
      .then((data) => {})
      .catch((err) => alert(err.message))
      .finally(() => {
        localStorage.removeItem('user_data');
        this.router.navigateByUrl('/');
        window.location.reload();
      });
  }

  addUserToLocalStorage(userData: any) {
    localStorage['user_data'] = userData;
  }

  get getUserPic(): string {
    return this.currentUser.imgUrl;
  }

  checkIfUserIsEligbleForAchievement(blogsWritten: number) {
    let achievments = Array<Achievment>();
    if (blogsWritten >= 1)
      achievments.push({
        content: '1 blog written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 5)
      achievments.push({
        content: '5 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 10)
      achievments.push({
        content: '10 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 20)
      achievments.push({
        content: '20 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 50)
      achievments.push({
        content: '50 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });
    if (blogsWritten >= 100)
      achievments.push({
        content: '100 blogs written!',
        imgUrl: this.achievmentImgUrl,
      });

    return achievments;
  }

  updateUser() {
    this.userDoc = this.afs.doc(`users/${this.currentUser.id}`);
    this.userDoc.update(this.currentUser);
  }

  get currentUser(): User {
    this.userInfo = JSON.parse(localStorage['user_data']);
    return this.userInfo as User;
  }
}
