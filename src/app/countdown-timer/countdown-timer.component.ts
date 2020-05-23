import { Component, OnInit, Input } from '@angular/core';
import { Timer, RegisterEvent } from './../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit {
  @Input() registredEvent: RegisterEvent;
  currentTime: Timer;
  isLoading = true;

  constructor() {}

  ngOnInit() {
    this.setTimer(this.registredEvent.date).subscribe(res => {
      this.isLoading = false;
      this.currentTime = res;
    });
  }

  private setTimer(choiceDate: Date): Observable<Timer> {
    return new Observable<Timer>((obs) => {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const timer = choiceDate.getTime();
      setInterval(() => {
        const now = new Date().getTime();
        const distance = timer - now;
        const currentTime: Timer = {
          day: Math.floor(distance / day),
          hour: Math.floor((distance % day) / hour),
          minute: Math.floor((distance % hour) / minute),
          second: Math.floor((distance % minute) / second)
        };

        if (
            currentTime.day    === 0 &&
            currentTime.hour   === 0 &&
            currentTime.minute === 0 &&
            currentTime.second === 0
          ) {
              obs.next(currentTime);
              obs.complete();
            } else {
              obs.next(currentTime);
            }
      }, second);
    });
  }
}
