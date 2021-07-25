import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { Blog } from 'src/app/core/models/blog/blog';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { UserService } from 'src/app/core/services/user/user-service.service';
@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
  animations: [
    trigger('imageState', [
      state('zoomIn', style({ transform: 'scale(1.12)', offset: 1 })),
      transition('* => *', animate('1000ms ease')),
    ]),
  ],
})
export class BlogItemComponent implements OnInit {
  @Input() blog!: Blog;
  position: string = '';
  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  zoomIn() {
    this.changePosition('zoomIn');
  }
  zoomOut() {
    this.changePosition('null');
  }
  changePosition(newPosition: string) {
    this.position = newPosition;
  }

  incrementBlogViews(blog: Blog) {
    let userId = this.userService.currentUser.id;
    if (!this.blog.views?.includes(userId!)) {
      blog.views?.push(userId!);
    }
    this.blogService.updateBlog(blog);
  }
}
