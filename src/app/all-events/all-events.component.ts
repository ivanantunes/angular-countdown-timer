import { Component, OnInit } from '@angular/core';
import { RegisterEvent } from '../interfaces';
import { DataBaseService, ModalAlertsService } from '../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss']
})
export class AllEventsComponent implements OnInit {

  eventsAct: RegisterEvent[];

  constructor(private db: DataBaseService, private modal: ModalAlertsService) {
    this.filterEvents().subscribe((res) => {
      this.eventsAct = res;
    }, (err) => this.modal.modalTerror('Error!', err));
  }

  ngOnInit(): void {}

  private filterEvents(): Observable<RegisterEvent[]> {
    return new Observable<RegisterEvent[]>((obs) => {
      this.db.getAll().subscribe((res: RegisterEvent[]) => {
        const events = res.filter(f => f.eventStatus === 'A');
        obs.next(events);
        obs.complete();
      }, (err) => obs.error(err));
    });
  }
}
