import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('headingState', [
      state(
        'moveLeft',
        style({ transform: 'translate3d(-20px, 0, 0)', offset: 1 })
      ),
      state(
        'moveRight',
        style({ transform: 'translate3d(10px, 0, 0)', offset: 1 })
      ),
      transition('* => *', animate('1000ms ease')),
    ]),
  ],
})
export class HomeComponent {
  position: string = '';

  constructor() {}

  ngAfterViewInit() {
    interval(1000)
      .pipe()
      .subscribe(() => {
        this.moveLeft();
      });
    interval(2000)
      .pipe()
      .subscribe(() => {
        this.moveRight();
      });
  }

  resetPosition() {
    this.changePosition('null');
  }

  moveLeft() {
    this.changePosition('moveLeft');
  }

  moveRight() {
    this.changePosition('moveRight');
  }

  changePosition(newPosition: string) {
    this.position = newPosition;
  }
}
