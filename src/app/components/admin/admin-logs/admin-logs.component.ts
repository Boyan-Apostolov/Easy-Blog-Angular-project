import { Component, OnInit } from '@angular/core';
import { IpRecord } from 'src/app/core/models/ipRecord/ipRecord';
import { LogsService } from 'src/app/core/services/logs/logs.service';

@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.css'],
})
export class AdminLogsComponent implements OnInit {
  logs: IpRecord[] = [];
  constructor(private logsService: LogsService) {}

  ngOnInit(): void {
    this.logsService.getAllLogs().subscribe((logs) => {
      this.logs = logs.sort((a, b) => b.createdOn!.localeCompare(a.createdOn!));
    });
  }
  deleteRecord(log: IpRecord) {
    if (confirm('Are you sure you want to delete this log?')) {
      this.logsService.deleteRecord(log);
    }
  }
}
