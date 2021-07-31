import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminBlogsComponent } from './admin-blogs/admin-blogs.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';
import { AdminLogsComponent } from './admin-logs/admin-logs.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AdminUsersComponent,
    AdminBlogsComponent,
    AdminChatComponent,
    AdminLogsComponent,
    AdminDashboardComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, MatProgressSpinnerModule],
  exports: [AdminUsersComponent, AdminBlogsComponent, AdminChatComponent],
})
export class AdminModule {}
