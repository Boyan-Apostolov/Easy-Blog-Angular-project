import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  logs$: Observable<IpRecord[]>;
  users$: Observable<User[]>;
  blogs$: Observable<Blog[]>;
  messages$: Observable<ChatMessage[]>;

  constructor(
    private logsService: LogsService,
    private userService: UserService,
    private blogService: BlogService,
    private chatService: ChatService
  ) {
    this.logs$ = this.logsService.getAllLogs();
    this.users$ = this.userService.getAllUsers();
    this.blogs$ = this.blogService.getAllBlogs();
    this.messages$ = this.chatService.getAllMessages();
  }

  ngOnInit(): void {}
}
