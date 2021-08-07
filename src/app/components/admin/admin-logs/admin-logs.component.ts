import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IpRecord } from 'src/app/core/models/ipRecord/ipRecord';
import { LogsService } from 'src/app/core/services/logs/logs.service';

@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css'],
})
export class AdminLogsComponent {
  logs$: Observable<IpRecord[]>;

  constructor(private logsService: LogsService) {
    this.logs$ = this.logsService
      .getAllLogs()
      .pipe(
        tap((result) =>
          result.sort(
            (a, b) => Date.parse(b.createdOn!) - Date.parse(a.createdOn!)
          )
        )
      );
  }

  deleteRecord(log: IpRecord) {
    if (confirm('Are you sure you want to delete this log?')) {
      this.logsService.deleteRecord(log);
    }
  }

  purgeLogs() {
    if (
      confirm(
        'Are you sure you want to delete all logs? \n This action cannot be undone!'
      )
    ) {
      this.logsService.purgeLogs();
    }
  }
}
