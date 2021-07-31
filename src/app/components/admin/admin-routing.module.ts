import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { AdminBlogsComponent } from './admin-blogs/admin-blogs.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLogsComponent } from './admin-logs/admin-logs.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        data: { isLogged: true, isAdmin: true },
      },
      {
        path: 'blogs',
        component: AdminBlogsComponent,
        data: { isLogged: true, isAdmin: true },
      },
      {
        path: 'chat',
        component: AdminChatComponent,
        data: { isLogged: true, isAdmin: true },
      },
      {
        path: 'users',
        component: AdminUsersComponent,
        data: { isLogged: true, isAdmin: true },
      },
      {
        path: 'logs',
        component: AdminLogsComponent,
        data: { isLogged: true, isAdmin: true },
      },
      { path: '**', pathMatch: 'full', redirectTo: '404-not-found' },
      {
        path: '404-not-found',
        pathMatch: 'full',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
