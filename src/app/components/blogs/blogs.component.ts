import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../core/services/blog/blog.service';
import { Blog } from '../../core/models/blog/blog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs: Blog[];

  constructor(private blogService: BlogService) {
    this.blogs = [];
  }

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      console.log(blogs);
      this.blogs = blogs;
    });
  }
}
