import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { HomeComponent } from './components/home/home.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CKEditorModule } from 'ng2-ckeditor';

import { environment } from '../environments/environment';
import { AuthGuard } from './core/guards/auth.guard';

import { AuthRoutingModule } from './components/auth/auth-routing.module';
import { BlogsRoutingModule } from './components/blogs/blogs-routing.module';

import { BlogService } from './core/services/blog/blog.service';
import { UserService } from './core/services/user/user-service.service';

import { BlogsComponent } from './components/blogs/blogs/blogs.component';
import { BlogItemComponent } from './components/blogs/blog-item/blog-item.component';
import { BlogArticleComponent } from './components/blogs/blog-article/blog-article.component';
import { BlogNewComponent } from './components/blogs/blog-new/blog-new.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogsComponent,
    BlogItemComponent,
    BlogArticleComponent,
    BlogNewComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    BlogsRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CKEditorModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'easy-blog'),
    AngularFirestoreModule,
    MatChipsModule,
  ],
  providers: [BlogService, AuthGuard, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
