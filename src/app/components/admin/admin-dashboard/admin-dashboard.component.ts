import { Component, OnInit } from '@angular/core';
import { LogsService } from 'src/app/core/services/logs/logs.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private logsService: LogsService) {}

  ngOnInit(): void {}
}
