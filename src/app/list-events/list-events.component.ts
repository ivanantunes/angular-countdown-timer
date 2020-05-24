import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RegisterEvent } from '../interfaces';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataBaseService, ModalAlertsService } from '../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit, AfterViewInit {

  displayedColumns = ['eventName', 'registeredDate', 'eventStatus'];
  dataSource: MatTableDataSource<RegisterEvent>;

  isLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private db: DataBaseService,
    private modal: ModalAlertsService) {
    this.genListEvents().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
    }, (err) => this.modal.modalTerror('Error!', err));
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  clear() {
    const resp = confirm('Do you want to clear all events?');
    if (resp) {
      this.db.clearTable();
      location.reload();
    }
  }

  private genListEvents(): Observable<any> {
    return new Observable<any>((obs) => {
      const events: any[] = [];
      this.db.getAll().subscribe((res: RegisterEvent[]) => {
        res.forEach(r => {
          let status = '';

          if (r.eventStatus === 'A') {
            status = 'Activated';
          } else if (r.eventStatus === 'E') {
            status = 'Finished';
          } else {
            status = 'Expired';
          }

          const obj = {
            registeredDate: `${new Date(r.registeredDate).toLocaleDateString()} - ${new Date(r.registeredDate).toLocaleTimeString()}`,
            eventName: r.eventName,
            eventStatus: status,
          };
          events.push(obj);
        });

        obs.next(events);
        obs.complete();

      }, (err) => {
        obs.error(err);
      });
    });
  }
}
