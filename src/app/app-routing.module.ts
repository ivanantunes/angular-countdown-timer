// Angular Native
import { NgModule } from '@angular/core';

// Router
import { Routes, RouterModule } from '@angular/router';

// Component
import { RegisterEventsComponent } from './register-events/register-events.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';


const routes: Routes = [
  {
    path: 'register-event',
    component: RegisterEventsComponent
  },
  {
    path: 'countdown-timer',
    component: CountdownTimerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
