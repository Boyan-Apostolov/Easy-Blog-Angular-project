import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../../core/services/blog/blog.service';
import { Blog } from '../../../core/models/blog/blog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  blogs: Blog[];
  tags: string[];

  constructor(private blogService: BlogService) {
    this.blogs = [];
    this.tags = [];
  }

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
    this.tags = this.blogService.getAllTags();
  }
}
