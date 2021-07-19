import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminBlogsComponent } from './admin-blogs/admin-blogs.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';

@NgModule({
  declarations: [AdminUsersComponent, AdminBlogsComponent, AdminChatComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [AdminUsersComponent, AdminBlogsComponent, AdminChatComponent],
})
export class AdminModule {}
