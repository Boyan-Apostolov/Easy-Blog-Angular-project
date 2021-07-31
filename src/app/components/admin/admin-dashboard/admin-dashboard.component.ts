import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/core/models/blog/blog';
import { ChatMessage } from 'src/app/core/models/chat/chat';
import { IpRecord } from 'src/app/core/models/ipRecord/ipRecord';
import { User } from 'src/app/core/models/user/user';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { LogsService } from 'src/app/core/services/logs/logs.service';
import { UserService } from 'src/app/core/services/user/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  logs!: IpRecord[];
  users!: User[];
  blogs!: Blog[];
  messages!: ChatMessage[];

  get allLoaded(): boolean {
    return (
      this.logs != undefined &&
      this.users != undefined &&
      this.blogs != undefined &&
      this.messages != undefined
    );
  }

  constructor(
    private logsService: LogsService,
    private userService: UserService,
    private blogService: BlogService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.logsService.getAllLogs().subscribe((logs) => {
      this.logs = logs;
    });
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
    this.blogService.getAllBlogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
    this.chatService.getAllMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
