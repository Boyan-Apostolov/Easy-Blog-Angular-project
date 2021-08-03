import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatMessage } from 'src/app/core/models/chat/chat';
import { ChatService } from 'src/app/core/services/chat/chat.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css'],
})
export class AdminChatComponent {
  messages$: Observable<ChatMessage[]>;

  constructor(private chatService: ChatService) {
    this.messages$ = this.chatService
      .getAllMessages()
      .pipe(
        tap((result) =>
          result.sort((a, b) => b.createdOn!.localeCompare(a.createdOn!))
        )
      );
  }

  deleteMessage(message: ChatMessage) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.chatService.deleteMessage(message);
    }
  }
}
