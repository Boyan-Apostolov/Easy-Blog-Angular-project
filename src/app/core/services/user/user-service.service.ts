import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';

// import { BlogService } from '../../services/blog/blog.service';

@Injectable()
export class UserService {
  constructor() {}

  get isLogged(): boolean {
    //see if user is logged in
    return localStorage['isLogged'] != undefined;
  }

  login(email: string, password: string) {
    console.log('logging in...');
    localStorage.setItem('isLogged', email);
  }

  register(
    username: string,
    email: string,
    password: string,
    bio: string,
    imgUrl: string
  ) {
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

    console.log('registering...');
    localStorage.setItem('userImg', imgUrl);
    localStorage.setItem('isLogged', email);
  }

  logout() {
    console.log('logging out...');
    localStorage.removeItem('isLogged');
  }

  get getUserPic(): string {
    //get user imageUrl
    return this.currentUser.imgUrl;
  }

  get currentUser(): User {
    let user: User = {
      id: 'default-user-id',
      username: 'default-user',
      email: 'default-user@email.com',
      bio: 'Im a default user!',
      password: 'default-user-password',
      imgUrl:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
    };
    return user;
  }
}
