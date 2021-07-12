import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BlogArticleComponent } from './components/blogs/blog-article/blog-article.component';
import { BlogNewComponent } from './components/blogs/blog-new/blog-new.component';
import { BlogsComponent } from './components/blogs/blogs/blogs.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  // { path: 'blogs', component: BlogsComponent },
  // { path: 'blogs/blog/:id', component: BlogArticleComponent },
  // { path: 'blogs/new', component: BlogNewComponent },
  { path: 'privacy', component: PrivacyComponent },
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
  {
    path: 'auth',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { isLogged: false },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { isLogged: false },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
