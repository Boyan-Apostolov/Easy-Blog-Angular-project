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
  logs: IpRecord[] = [];
  users$: Observable<User[]>;
  blogs$: Observable<Blog[]>;
  messages$: Observable<ChatMessage[]>;

  mostViewsFromCountryName!: string;
  mostViewsFromCityName!: string;
  mostViewedPageName!: string;
  mostActiveUserIp!: string;

  private mostActiveUserIpHolder!: string;

  get areLogsLoaded(): boolean {
    return (
      this.mostViewsFromCountryName != undefined &&
      this.mostViewsFromCityName != undefined &&
      this.mostViewedPageName != undefined &&
      this.mostActiveUserIp != undefined
    );
  }

  constructor(
    private logsService: LogsService,
    private userService: UserService,
    private blogService: BlogService,
    private chatService: ChatService
  ) {
    this.users$ = this.userService.getAllUsers();
    this.blogs$ = this.blogService.getAllBlogs();
    this.messages$ = this.chatService.getAllMessages();

    this.loadLogs();
  }

  loadLogs() {
    this.logsService.getAllLogs().subscribe((logs) => {
      this.logs = logs;

      this.mostViewsFromCountryName = this.getMostWithParameter('country_name');
      this.mostViewsFromCityName = this.getMostWithParameter('city');
      this.mostViewedPageName = this.getMostWithParameter('page_location');
      this.mostActiveUserIpHolder = this.getMostWithParameter('ip');

      this.mostActiveUserIp = this.mostActiveUserIpHolder;
      this.hideIp();
    });
  }

  getMostWithParameter(parameterToGroupBy: string) {
    //Groups the logs by a given parameter, sorts them descending and returns the parameter of the first value
    //EXAMPLE: param=(country_name)
    //Group them by country_name and get the result with the most records for the country_name
    //Result: Bulgaria: {Array[x]}
    //RETURN country_name ("Bulgaria")
    return (
      Object.values(this.groupBy(parameterToGroupBy)(this.logs)).sort(
        (a: any, b: any) => b.length - a.length
      )[0] as any
    )[0][parameterToGroupBy];
  }

  groupBy(key: any) {
    return function group(array: any) {
      return array.reduce((acc: any, obj: any) => {
        const property = obj[key];
        acc[property] = acc[property] || [];
        acc[property].push(obj);
        return acc;
      }, {});
    };
  }

  ngOnInit(): void {}

  showIp() {
    this.mostActiveUserIp = this.mostActiveUserIpHolder;
  }
  hideIp() {
    this.mostActiveUserIp =
      this.mostActiveUserIpHolder.substring(0, 3) +
      '*'.repeat(this.mostActiveUserIpHolder.length - 3);
  }
}
