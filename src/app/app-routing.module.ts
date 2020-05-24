// Angular Native
import { NgModule } from '@angular/core';

// Router
import { Routes, RouterModule } from '@angular/router';

// Component
import { RegisterEventsComponent } from './register-events/register-events.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';
import { AllEventsComponent } from './all-events/all-events.component';
import { ListEventsComponent } from './list-events/list-events.component';


const routes: Routes = [
  {
    path: 'register-event',
    component: RegisterEventsComponent
  },
  {
    path: 'all-event',
    component: AllEventsComponent
  },
  {
    path: 'list-event',
    component: ListEventsComponent
  },
  {
    path: '**',
    redirectTo: 'register-event',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
