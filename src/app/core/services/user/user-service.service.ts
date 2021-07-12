import { Injectable } from '@angular/core';

import { BlogService } from '../../services/blog/blog.service';

@Injectable()
export class UserService {
  constructor(private blogService: BlogService) {}

  get isLogged(): boolean {
    //see if user is logged in
    return false;
  }

  get getUserPic(): string {
    //get user imageUrl
    return 'https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg';
  }
}
