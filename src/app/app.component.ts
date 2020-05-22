// Native Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  formEvent: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formEvent = this.formBuilder.group({
      eventName: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      eventDate: ['', Validators.compose([Validators.required])]
    });
  }

  public registerEvent() {
    const event = {
      name: this.eventName.value,
      date: this.eventDate.value
    };
    console.log(event);
  }

  public resetForm() {
    this.formEvent.reset();
  }

  get eventName() {
    return this.formEvent.get('eventName');
  }
  get eventDate() {
    return this.formEvent.get('eventDate');
  }
}
