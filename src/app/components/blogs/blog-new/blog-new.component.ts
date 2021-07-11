import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { Blog } from '../../../core/models/blog/blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-new',
  templateUrl: './blog-new.component.html',
  styleUrls: ['./blog-new.component.css'],
})
export class BlogNewComponent implements OnInit {
  blog: any = {
    title: '',
    imgUrl: '',
    content: '',
    tags: [],
  };
  tags: string = '';

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (
      this.blog.title != '' &&
      this.blog.imgUrl != '' &&
      this.blog.content != ''
    ) {
      this.blog.tags = this.tags.replace(' ', '').split(',');
      this.blogService.addNewBlog(
        this.blog.title,
        this.blog.imgUrl,
        this.blog.content,
        this.blog.tags
      );
      this.router.navigateByUrl('blogs');
    }
  }
}
