import { Component, OnInit, Input } from '@angular/core';
import { Blog } from 'src/app/core/models/blog/blog';
import { BlogService } from 'src/app/core/services/blog/blog.service';
@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css'],
})
export class BlogItemComponent implements OnInit {
  @Input() blog!: Blog;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {}

  incrementBlogViews(blog: Blog) {
    if (!this.blog.views?.includes('userID')) {
      blog.views?.push('userID');
    }
    this.blogService.updateBlog(blog);
  }
}
