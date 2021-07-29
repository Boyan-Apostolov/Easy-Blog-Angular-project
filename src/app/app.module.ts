import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { ShareModule } from 'ngx-sharebuttons';
import { environment } from '../environments/environment';
import { AuthGuard } from './core/guards/auth.guard';

import { AuthModule } from './components/auth/auth.module';
import { AdminModule } from './components/admin/admin.module';
import { BlogsModule } from './components/blogs/blogs.module';
import { SharedModule } from './components/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthRoutingModule } from './components/auth/auth-routing.module';
import { AdminRoutingModule } from './components/admin/admin-routing.module';
import { BlogsRoutingModule } from './components/blogs/blogs-routing.module';

import { BlogService } from './core/services/blog/blog.service';
import { ChatService } from './core/services/chat/chat.service';
import { UserService } from './core/services/user/user-service.service';
import { ImageUploadService } from './core/services/image-upload/image-upload.service';

import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { LeaderboardComponent } from './components/user/leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrivacyComponent,
    UserProfileComponent,
    LeaderboardComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ShareModule,
    AppRoutingModule,
    AuthRoutingModule,
    AdminRoutingModule,
    BlogsRoutingModule,
    AuthModule,
    BlogsModule,
    SharedModule,
    AdminModule,
    AngularFireModule.initializeApp(environment.firebase, 'easy-blog'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [
    BlogService,
    AuthGuard,
    UserService,
    ChatService,
    ImageUploadService,
    AngularFireAuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
