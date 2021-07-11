import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../core/services/blog/blog.service';
import { Blog } from '../../../core/models/blog/blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css'],
})
export class BlogArticleComponent implements OnInit {
  editState: boolean = false;
  blogToEdit!: Blog;

  blog!: Blog;
  id: string | null = '';
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blog = blogs.filter((x) => x.id === this.id)[0];
    });
  }

  deteleBlog(event: MouseEvent, blog: Blog) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.clearState();
      this.blogService.deteleBlog(blog);
      this.router.navigateByUrl('blogs');
    }
  }

  editBlog(event: MouseEvent, blog: Blog) {
    this.editState = true;
    this.blogToEdit = blog;
  }

  updateBlog(blog: Blog) {
    this.blogService.updateBlog(blog);
    this.clearState();
  }
  clearState() {
    this.editState = false;
  }
}
