import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Blog } from '../../models/blog/blog';
import { BlogService } from '../../services/blog/blog.service';

@Injectable()
export class UserServiceService {
  constructor(private blogService: BlogService) {}
}
