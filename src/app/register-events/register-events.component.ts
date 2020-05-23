import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterEvent } from '../interfaces';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formEvent = this.formBuilder.group({
      eventName: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      eventDate: ['', Validators.compose([Validators.required])]
    });
  }

  public registerEvent() {
    this.showForm = false;

    this.registredEvent = {
      name: this.eventName.value,
      date: this.eventDate.value
    };
    if (this.registredEvent.date.getMinutes() < new Date().getMinutes() + 1) {
      this.showForm = true;
      console.log('Minimum Time: 1 minute');
    } else {
      this.showTimer = true;
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
