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

  toSort: boolean = true;

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

  sortHandler() {
    if (this.toSort) {
      this.sort();
    } else {
      this.unsort();
    }
    this.toSort = !this.toSort;
  }

  sort() {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs.sort((a, b) => b.views?.length! - a.views?.length!);
    });
  }

  unsort() {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs.sort((a, b) => a.views?.length! - b.views?.length!);
    });
  }
}
