import { Component, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/core/models/chat/chat';
import { ChatService } from 'src/app/core/services/chat/chat.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css'],
})
export class AdminChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getAllMessages().subscribe((messages) => {
      this.messages = messages.sort((a, b) =>
        b.createdOn.localeCompare(a.createdOn)
      );
    });
  }

  deleteMessage(message: ChatMessage) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.chatService.deleteMessage(message);
    }
  }
}
