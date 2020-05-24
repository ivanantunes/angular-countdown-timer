import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterEvent } from '../interfaces';
import { ModalAlertsService, DataBaseService } from '../services';

@Component({
  selector: 'app-register-events',
  templateUrl: './register-events.component.html',
  styleUrls: ['./register-events.component.scss']
})
export class RegisterEventsComponent implements OnInit {
  formEvent: FormGroup;
  currentDate = new Date();

  showForm = true;
  showTimer = false;

  registredEvent: RegisterEvent;

  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalAlertsService,
    private db: DataBaseService
  ) { }

  ngOnInit() {
    this.formEvent = this.formBuilder.group({
      eventName: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      eventDate: ['', Validators.compose([Validators.required])]
    });
  }

  public registerEvent() {
    this.showForm = false;

    this.registredEvent = {
      registeredDate: new Date(this.eventDate.value).toISOString(),
      eventName: this.eventName.value,
      eventStatus: 'A'
    };
    const regEvent = new Date(this.registredEvent.registeredDate);
    const newDate = new Date();
    if (regEvent.getMinutes() < newDate.getMinutes() + 1 &&
        regEvent.toLocaleDateString() === newDate.toLocaleDateString()) {
      this.showForm = true;
      this.modal.modalTerror('Error!', 'Minimum Time: 1 minute.');
    } else {
      this.db.addObject(this.registredEvent).subscribe((res) => {
        console.log('Registred Event Success');
        this.showTimer = true;
      }, (err) => this.modal.modalTerror('Error!', err));
    }
  }

  public resetForm() {
    this.formEvent.reset();
  }

  public registerNewEvent() {
    this.resetForm();
    this.showTimer = false;
    this.showForm = true;
  }

  get eventName() {
    return this.formEvent.get('eventName');
  }
  get eventDate() {
    return this.formEvent.get('eventDate');
  }

}
