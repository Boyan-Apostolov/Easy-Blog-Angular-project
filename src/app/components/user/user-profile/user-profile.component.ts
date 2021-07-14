import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/core/models/blog/blog';
import { User } from 'src/app/core/models/user/user';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { UserService } from 'src/app/core/services/user/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  blogs!: Blog[];
  userId!: string;
  user!: User;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser;

    this.route.params.subscribe((routeParams) => {
      this.userId = Object.values(routeParams)[0];
      this.blogService.getAllBlogs().subscribe((blogs) => {
        this.blogs = blogs.filter((x) => x.user.id == this.userId);
      });
    });
  }
}
