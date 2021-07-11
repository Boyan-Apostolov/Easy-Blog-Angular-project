import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../core/services/blog/blog.service';
import { Blog } from '../../../core/models/blog/blog';
@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css'],
})
export class BlogArticleComponent implements OnInit {
  blog!: Blog;
  id: string | null = '';
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blog = blogs.filter((x) => x.id === this.id)[0];
    });
  }
}
