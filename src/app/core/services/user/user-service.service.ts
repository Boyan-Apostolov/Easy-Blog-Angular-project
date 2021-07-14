import { Injectable } from '@angular/core';
import { Blog } from '../../models/blog/blog';
import { Achievment } from '../../models/user/achievment';
import { User } from '../../models/user/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable()
export class UserService {
  public achievmentImgUrl: string =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png';

  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  //WORKING REGISTRATION
  // this.fireAuth.auth
  //   .createUserWithEmailAndPassword('bobi@abv.bg', '123123')
  //   .then((userData) => {
  //     let user = userData.user;
  //     console.log(user);
  //   })
  //   .catch((err) => alert(err.message));
  //WORKING LOGIN
  // this.fireAuth.auth
  //   .signInWithEmailAndPassword('bobi@abv.bg', '1231235')
  //   .then((userData) => {
  //     let user = userData.user;
  //     console.log(user);
  //   })
  //   .catch((err) => alert(err.message));
  //WORKING LOGOUT
  // this.fireAuth.auth
  //   .signOut()
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => alert(err.message));

  private achievment: Achievment = {
    imgUrl: this.achievmentImgUrl,
    content: '5 Blogs written',
  };

  private user: User = {
    id: 'default-user-id',
    username: 'default-user',
    email: 'default-user@email.com',
    bio: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    password: 'default-user-password',
    imgUrl:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
    achievements: [this.achievment],
    blogs: [],
  };

  get isLogged(): boolean {
    return localStorage['user_data'] != undefined;
  }

  login(email: string, password: string) {
    return this.fireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((userData) => {
        alert('Login successfully');
        this.addUserToLocalStorage(userData);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        window.location.reload();
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
        alert('registred successfully');
        this.addUserToLocalStorage(userData);
      })
      .finally(() => {
        window.location.reload();
        this.router.navigateByUrl('/');
      });
    // id: string;
    // username: string;
    // email: string;
    // password: string;
    // bio: string;
    // imgUrl: string;
    // likes?: string[];
    // comments?: string[];
    // views?: string[];
    // blogs?: string[];
  }

  logout() {
    return this.fireAuth.auth
      .signOut()
      .then((data) => {
        alert('logged out');
        console.log(data);
      })
      .catch((err) => alert(err.message))
      .finally(() => {
        localStorage.removeItem('user_data');
        window.location.reload();
        this.router.navigateByUrl('/');
      });
  }

  addUserToLocalStorage(userData: any) {
    localStorage['user_data'] = userData;
  }

  get getUserPic(): string {
    return this.currentUser.imgUrl;
  }

  getUserById(userId: string): User {
    return this.currentUser;
  }

  addAchievmentToUser(user: User, text: string) {
    user.achievements?.push({ content: text, imgUrl: this.achievmentImgUrl });
  }

  checkIfUserIsEligbleForAchievement(user: User) {
    var blogsWritten = user.blogs!.length;

    switch (blogsWritten) {
      case 1:
        this.addAchievmentIsNotYetEarned(user, 'First blog written!');
        break;
      case 5:
        this.addAchievmentIsNotYetEarned(user, '5 blog written!');
        break;
      case 10:
        this.addAchievmentIsNotYetEarned(user, '10 blog written!');
        break;
      case 20:
        this.addAchievmentIsNotYetEarned(user, '20 blog written!');
        break;
      case 50:
        this.addAchievmentIsNotYetEarned(user, '50 blog written!');
        break;
      case 100:
        this.addAchievmentIsNotYetEarned(user, '100 blog written!');
        break;
    }
  }

  addAchievmentIsNotYetEarned(user: User, content: string) {
    if (!user.achievements?.some((x) => x.content.includes(content))) {
      user.achievements?.push({
        content: content,
        imgUrl: this.achievmentImgUrl,
      });
    }
  }

  updateUser() {
    this.checkIfUserIsEligbleForAchievement(this.currentUser);

    // this.userDoc = this.afs.doc(`users/${user.id}`);
    // this.userDoc.update(user);
  }

  addBlogToUser(blog: Blog) {
    this.currentUser.blogs?.push(blog);
    this.updateUser();
  }

  get currentUser(): User {
    return this.user;
  }
}
