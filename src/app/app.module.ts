import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './components/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { BlogsComponent } from './components/blogs/blogs/blogs.component';

import { BlogService } from './core/services/blog/blog.service';
import { BlogItemComponent } from './components/blogs/blog-item/blog-item.component';
import { BlogArticleComponent } from './components/blogs/blog-article/blog-article.component';
import { BlogNewComponent } from './components/blogs/blog-new/blog-new.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogsComponent,
    BlogItemComponent,
    BlogArticleComponent,
    BlogNewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CKEditorModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'easy-blog'),
    AngularFirestoreModule,
  ],
  providers: [BlogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
