import { Component, OnInit, Input } from '@angular/core';
import { Timer, RegisterEvent } from './../interfaces';
import { Observable } from 'rxjs';
import { ModalAlertsService, DataBaseService } from '../services';

const webNotification = require('simple-web-notification');

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit {
  @Input() registredEvent: RegisterEvent;
  currentTime: Timer;
  isLoading = true;

  constructor(private db: DataBaseService, private modal: ModalAlertsService) {}

  ngOnInit() {
    this.setTimer(new Date(this.registredEvent.registeredDate)).subscribe(res => {
      this.isLoading = false;
      this.currentTime = res;
    }, (err) => {
      this.modal.modalTerror('Error!', err);
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
              const updateObj: RegisterEvent = {
                registeredDate: this.registredEvent.registeredDate,
                eventName: this.registredEvent.eventName,
                eventStatus: 'E',
              };

              this.db.updateObject(updateObj).subscribe(() => {
                console.log('Update Event Finish');

                this.notifier(updateObj).subscribe(() => console.log('Notificação Enviada com Sucesso!'),
                (err) => this.modal.modalTerror('Error!', 'Enable Notifications You Can Have Pending Events.'));

                obs.next(currentTime);

                obs.complete();

              }, (err) => {

                obs.error(err);

              });
            } else {
              obs.next(currentTime);
            }
      }, second);
    });
  }

  private notifier(event: RegisterEvent): Observable<any> {
    return new Observable<any>((obs) => {
      webNotification.showNotification('Countdown Timer', {
        body: `The ${event.eventName} Event Successfully Ended.`,
        icon: 'favicon.ico',
        autoClose: 10000
    }, function onShow(error, hide) {
        if (error) {
            obs.error(error);
        } else {
            setTimeout(function hideNotification() {
                hide();
                obs.next();
                obs.complete();
            }, 10000);
        }
    });
    });
  }
}
