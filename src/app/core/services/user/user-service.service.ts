import { Injectable } from '@angular/core';

import { BlogService } from '../../services/blog/blog.service';

@Injectable()
export class UserService {
  constructor(private blogService: BlogService) {}

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
    return localStorage['userImg'];
  }
}
