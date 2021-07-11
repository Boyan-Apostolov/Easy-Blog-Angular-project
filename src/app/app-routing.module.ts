import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BlogArticleComponent } from './components/blogs/blog-article/blog-article.component';
import { BlogNewComponent } from './components/blogs/blog-new/blog-new.component';
import { BlogsComponent } from './components/blogs/blogs/blogs.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blogs/blog/:id', component: BlogArticleComponent },
  { path: 'blogs/new', component: BlogNewComponent },
  { path: 'auth/login', pathMatch: 'full', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
