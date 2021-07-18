import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminBlogsComponent } from './admin-blogs/admin-blogs.component';

@NgModule({
  declarations: [AdminUsersComponent, AdminBlogsComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [AdminUsersComponent, AdminBlogsComponent],
})
export class AdminModule {}