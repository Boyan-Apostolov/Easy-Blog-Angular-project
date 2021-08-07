import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from '../../app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from './alert/alert.component';
import { DateTimeFormatterPipe } from './pipes/date-time-formatter.pipe';
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    AlertComponent,
    DateTimeFormatterPipe,
  ],
  imports: [CommonModule, AppRoutingModule, MatProgressSpinnerModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    DateTimeFormatterPipe,
  ],
})
export class SharedModule {}
