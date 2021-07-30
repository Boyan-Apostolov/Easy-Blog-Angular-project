import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/core/models/blog/blog';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { UserService } from 'src/app/core/services/user/user-service.service';

@Component({
  selector: 'app-blogs-saved',
  templateUrl: './blogs-saved.component.html',
  styleUrls: ['./blogs-saved.component.css'],
})
export class BlogsSavedComponent implements OnInit {
  blogs: Blog[] = [];
  userId!: string;
  constructor(
    private blogService: BlogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.currentUser.id!;
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs.filter((x) => x.saves?.includes(this.userId));
    });
  }
  removeFromBookmarks(blog: Blog): void {
    this.blogService.removeFromBookmarks(blog, this.userId);
  }
}
