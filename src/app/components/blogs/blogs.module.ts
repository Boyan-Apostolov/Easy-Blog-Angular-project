import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogArticleComponent } from './blog-article/blog-article.component';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { BlogNewComponent } from './blog-new/blog-new.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogsByTagComponent } from './blogs-by-tag/blogs-by-tag.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { CKEditorModule } from 'ng2-ckeditor';
import { ShareButtonsConfig, ShareModule } from 'ngx-sharebuttons';

const customConfig: ShareButtonsConfig = {
  autoSetMeta: true,
  include: [
    'facebook',
    'twitter',
    'linkedin',
    'reddit',
    'whatsapp',
    'telegram',
    'print',
    'email',
  ],
};
@NgModule({
  declarations: [
    BlogArticleComponent,
    BlogItemComponent,
    BlogNewComponent,
    BlogsComponent,
    BlogsByTagComponent,
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    SharedModule, //Shared Module
    ShareModule.withConfig(customConfig), //Share buttons
    FormsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    CKEditorModule,
    BlogsRoutingModule,
  ],
  exports: [BlogItemComponent],
})
export class BlogsModule {}
