import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { LeaderboardComponent } from './components/user/leaderboard/leaderboard.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'user/:userId', component: UserProfileComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '404-not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
