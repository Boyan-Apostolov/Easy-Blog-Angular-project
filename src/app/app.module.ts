import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { HomeComponent } from './components/home/home.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { CKEditorModule } from 'ng2-ckeditor';

import { ShareModule } from 'ngx-sharebuttons';

import { environment } from '../environments/environment';
import { AuthGuard } from './core/guards/auth.guard';

import { AuthRoutingModule } from './components/auth/auth-routing.module';
import { AdminRoutingModule } from './components/admin/admin-routing.module';

import { BlogsRoutingModule } from './components/blogs/blogs-routing.module';

import { BlogService } from './core/services/blog/blog.service';
import { UserService } from './core/services/user/user-service.service';
import { ImageUploadService } from './core/services/image-upload/image-upload.service';

import { BlogsComponent } from './components/blogs/blogs/blogs.component';
import { BlogItemComponent } from './components/blogs/blog-item/blog-item.component';
import { BlogArticleComponent } from './components/blogs/blog-article/blog-article.component';
import { BlogNewComponent } from './components/blogs/blog-new/blog-new.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { BlogsByTagComponent } from './components/blogs/blogs-by-tag/blogs-by-tag.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { LeaderboardComponent } from './components/user/leaderboard/leaderboard.component';
import { AdminBlogsComponent } from './components/admin/admin-blogs/admin-blogs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogsComponent,
    BlogItemComponent,
    BlogArticleComponent,
    BlogNewComponent,
    PrivacyComponent,
    BlogsByTagComponent,
    UserProfileComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AdminRoutingModule,
    BlogsRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CKEditorModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'easy-blog'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    ShareModule,
  ],
  providers: [
    BlogService,
    AuthGuard,
    UserService,
    ImageUploadService,
    AngularFireAuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
