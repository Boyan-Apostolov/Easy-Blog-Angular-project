import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../core/services/blog/blog.service';
import { Blog } from '../../../core/models/blog/blog';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { UserService } from 'src/app/core/services/user/user-service.service';
import { LogsService } from 'src/app/core/services/logs/logs.service';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css'],
})
export class BlogArticleComponent implements OnInit {
  isClicked = false;
  editState: boolean = false;
  commentingState: boolean = false;
  canEdit: boolean = false;
  isAdmin: boolean = false;
  isLogged: boolean = false;
  blogNotFound: boolean = false;
  error: any;

  blogToEdit!: Blog;
  commentToAdd!: string;

  blog!: Blog;
  relevantBlog!: Blog[];
  id: string | null = '';

  url: string = `https://easy-blog-angular.github.io/blogs/blog/${this.id}`;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private userService: UserService,
    private logsService: LogsService
  ) {
    this.logsService.addRecord('blog-article');
  }

  get isFrozen(): boolean {
    if (this.isLogged) {
      return this.userService.currentUser.isFrozen!;
    }
    return false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.blogService.getAllBlogs().subscribe((blogs) => {
        this.blog = blogs.filter((x) => x.id === this.id)[0];
        if (!this.blog) {
          this.blogNotFound = true;
          return;
        }
        this.blog.comments?.sort((a, b) =>
          b.createdOn.localeCompare(a.createdOn)
        );
        this.relevantBlog = blogs
          .filter(
            (blog) =>
              blog.tags?.some((tag) => this.blog.tags?.includes(tag)) &&
              blog.id != this.id
          )
          .slice(0, 2);
      });
    });
  }

  ngAfterContentChecked() {
    this.isLogged = this.userService.isLogged;
    this.isAdmin = this.userService.isAdmin;
    if (this.blog && this.isLogged) {
      this.canEdit =
        this.userService.currentUser.id == this.blog.user.id || this.isAdmin;
    }
  }

  deteleBlog(event: MouseEvent, blog: Blog) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.clearState();
      this.blogService.deleteBlog(blog);
      this.router.navigateByUrl('blogs/all');
    }
  }

  editBlog(event: MouseEvent, blog: Blog) {
    this.editState = true;
    this.blogToEdit = blog;
  }

  updateBlog(blog: Blog) {
    if (blog.imgUrl == '' || blog.title == '' || blog.content == '') {
      this.addAlert('Error', 'All fields are required!', 'danger');
    } else {
      this.blogService.updateBlog(blog);
      this.clearState();
      this.addAlert('Success', 'Blog updated succesfully!', 'success');
    }
  }

  likeBlog(blog: Blog) {
    let userId = this.userService.currentUser.id;
    if (this.blogService.likeBlog(blog, userId!)) {
      this.addAlert('Success', 'Blog liked succesfully!', 'success');
    } else {
      this.addAlert(
        'Error',
        'You cannot like the blog more than once!',
        'danger'
      );
    }
  }

  bookmarkBlog(blog: Blog) {
    let userId = this.userService.currentUser.id;
    if (this.blogService.bookmarkBlog(blog, userId!)) {
      this.addAlert('Success', 'Blog saved successfully!', 'success');
    } else {
      this.addAlert(
        'Error',
        'You save like the blog more than once!',
        'danger'
      );
    }
  }

  enableCommenting() {
    this.commentingState = true;
  }

  postComment(blog: Blog) {
    if (this.commentToAdd != '') {
      this.blogService.addComment(blog, this.commentToAdd);
      this.addAlert('Success', 'Comment added succesfully!', 'success');
      this.commentToAdd = '';
    } else {
      this.addAlert('Error', 'Comment cannot be empty!', 'danger');
    }
    this.clearState();
  }

  copyToClipboard() {
    this.isClicked = true;
    navigator.clipboard.writeText(window.location.href);
  }

  clearState() {
    this.editState = false;
    this.commentingState = false;
    this.error = {};
  }

  addAlert(heading: string, message: string, alertClass: string) {
    this.error = {
      title: heading,
      message: message,
      class: alertClass,
    };
    interval(3000).subscribe(() => {
      this.error = {};
    });
  }
}
