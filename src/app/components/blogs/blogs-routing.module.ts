import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { BlogNewComponent } from './blog-new/blog-new.component';
import { BlogsComponent } from './blogs/blogs.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'blogs',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'all',
            component: BlogsComponent,
            data: { isLogged: null },
          },
          {
            path: 'blog/:id',
            component: BlogArticleComponent,
            data: { isLogged: null },
          },
          {
            path: 'new',
            component: BlogNewComponent,
            data: { isLogged: true },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}
