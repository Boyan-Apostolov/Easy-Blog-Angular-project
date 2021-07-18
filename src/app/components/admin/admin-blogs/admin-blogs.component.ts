import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/core/models/blog/blog';
import { BlogService } from 'src/app/core/services/blog/blog.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css'],
})
export class AdminBlogsComponent implements OnInit {
  blogs!: Blog[];
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }
}
