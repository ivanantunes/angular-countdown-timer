// Native Angular
import { Component, NgZone, AfterViewInit } from '@angular/core';

import { DataBaseService, ModalAlertsService } from './services';
import { RegisterEvent } from './interfaces';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const webNotification = require('simple-web-notification');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private db: DataBaseService, private modal: ModalAlertsService) {

    this.notifierIsEnabled().subscribe(() => {
      console.log('Permission Granted.');
    }, (err) => alert('Enable Notifications You Can Have Pending Events.'));

    this.db.getAll().subscribe((res: RegisterEvent[]) => {
      if (res.length !== 0) {
        res.forEach(r => {
          if (new Date(r.registeredDate) < new Date() && r.eventStatus !== 'E') {
            const obj: RegisterEvent = {
              registeredDate: r.registeredDate,
              eventName: r.eventName,
              eventStatus: 'I'
            };
            this.db.updateObject(obj);
          }
        });
      }
    });
  }

  private notifierIsEnabled(): Observable<any> {
    return new Observable<any>((obs) => {
        webNotification.requestPermission(function onRequest(granted) {
          if (granted) {
              obs.next();
              obs.complete();
          } else {
              obs.error();
          }
      });
    });
  }
}
