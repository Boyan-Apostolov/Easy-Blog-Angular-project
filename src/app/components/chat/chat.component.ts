import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { interval } from 'rxjs';
import { ChatMessage } from 'src/app/core/models/chat/chat';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { UserService } from 'src/app/core/services/user/user-service.service';

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
        .filter((x) => this.filterMessages(x.createdOn))
        .sort(this.sortFunction);
    });
  }

  sortFunction(a: any, b: any) {
    var dateA = new Date(a.createdOn).getTime();
    var dateB = new Date(b.createdOn).getTime();
    return dateA > dateB ? -1 : 1;
  }

  get isFrozen(): boolean {
    return this.userService.currentUser.isFrozen!;
  }

  filterMessages(createdOn: string) {
    let dateTokens = createdOn.split(', ');
    let dateStr = dateTokens[0];
    //02/08/2021, 11:55:15 //on other browsers
    //7/29/2021, 6:28:03 PM //on chrome
    if (!dateTokens[1].includes('AM') && !dateTokens[1].includes('PM')) {
      let dateValues = dateStr.split('/');
      dateStr = `${dateValues[1]}/${dateValues[0]}/${dateValues[2]}`;
    }

    let yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);
    let date = new Date(dateStr);
    if (date.getMonth() >= yesterday.getMonth()) {
      if (date.getDate() >= yesterday.getDate()) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
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
