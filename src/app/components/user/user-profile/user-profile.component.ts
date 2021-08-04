import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/core/models/blog/blog';
import { Achievment } from 'src/app/core/models/user/achievment';
import { User } from 'src/app/core/models/user/user';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { LogsService } from 'src/app/core/services/logs/logs.service';
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
  achievements!: Achievment[];
  areVisitationsVisitble: boolean = false;

  get isUserOwnerOfProfile(): boolean {
    return this.userService.isLogged
      ? this.userService.currentUser.id == this.userId ||
          this.userService.currentUser.isAdmin!
      : false;
  }

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private userService: UserService,
    private logsService: LogsService
  ) {
    this.logsService.addRecord('user-profile');
  }

  get isFrozen(): boolean {
    return this.user.isFrozen!;
  }

  ngOnInit(): void {
    this.route.params.subscribe((routeParams) => {
      this.userId = Object.values(routeParams)[0];

      this.blogService.getAllBlogs().subscribe((blogs) => {
        this.blogs = blogs.filter((x) => x.user.id == this.userId);
        this.achievements = this.userService.checkIfUserIsEligbleForAchievement(
          this.blogs.length
        );
      });
      this.userService.getAllUsers().subscribe((users) => {
        this.user = users.filter((x) => x.id == this.userId)[0];
        this.userService.addProfileVisitation(this.user);
        this.user.visitations
          ?.sort((a, b) => b.visitedOn!.localeCompare(a.visitedOn!))
          .slice(0, 10);
      });
    });
  }
  toggleUserVisitations() {
    this.areVisitationsVisitble = !this.areVisitationsVisitble;
  }
  ngOnDestroy() {
    this.userService.updateUser(this.user);
  }
}
