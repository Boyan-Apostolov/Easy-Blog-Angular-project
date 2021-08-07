import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval } from 'rxjs';
import { ChatMessage } from 'src/app/core/models/chat/chat';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { UserService } from 'src/app/core/services/user/user-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  isLogged: boolean = false;
  messages: ChatMessage[] = [];
  messageContent: string = '';
  error: any;

  constructor(
    private userService: UserService,
    private chatService: ChatService
  ) {
    this.isLogged = this.userService.isLogged;

    this.chatService.getAllMessages().subscribe((messages) => {
      this.messages = messages
        .sort((a, b) => Date.parse(b.createdOn!) - Date.parse(a.createdOn!))
        .filter((x) => Date.parse(x.createdOn) > this.getYesterday());
    });
  }

  get isFrozen(): boolean {
    return this.userService.currentUser.isFrozen!;
  }

  getToday(d = new Date()) {
    return new Date(+d).setHours(0, 0, 0, 0);
  }
  getYesterday(d = new Date()) {
    let e = new Date(this.getToday(d));
    return e.setDate(e.getDate() - 1);
  }

  postHandler(formData: NgForm) {
    this.messageContent = formData.controls.message.value;
    if (this.messageContent && this.messageContent != '') {
      this.chatService.postMessage(this.messageContent);
    } else {
      this.addAlert('Error!', 'Message content cannot be empty!', 'danger');
    }
    this.messageContent = '';
    formData.controls.message.reset();
  }

  addAlert(heading: string, message: string, alertClass: string) {
    this.error = {
      title: heading,
      message: message,
      class: alertClass,
    };
    interval(3000).subscribe(() => {
      this.error = {};
    });
  }
}
