import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import LocalDB from 'local-db';
import { RegisterEvent } from '../interfaces';

@Injectable({
  providedIn: 'root',
})

export class DataBaseService {

  events = new LocalDB('events');

  constructor() {

  }

  addObject(obj: RegisterEvent): Observable<any> {
    return of(this.events.insert(obj));
  }

  updateObject(obj: RegisterEvent): Observable<any> {
    return of(this.events.update({registeredDate: obj.registeredDate}, obj));
  }

  deleteObject(registeredDate: string): Observable<any> {
    return of(this.events.update({registeredDate: {$gt: registeredDate}}));
  }

  getAll(): Observable<any[]> {
    return of(this.events.query());
  }

  clearTable(): Observable<any> {
    return of(this.events.drop());
  }

}
