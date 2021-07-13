import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from '../../app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    AlertComponent,
  ],
  imports: [CommonModule, AppRoutingModule, MatProgressSpinnerModule],
  exports: [HeaderComponent, FooterComponent, AlertComponent],
})
export class SharedModule {}
