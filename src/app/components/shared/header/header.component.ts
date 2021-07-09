import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isLogged = true;
  public userPic = 'https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg';
  constructor() {}

  ngOnInit(): void {}
}
