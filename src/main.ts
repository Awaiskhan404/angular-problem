import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CountdownTimerComponent } from './app/components/countdown-timer/countdown-timer.component';
import { DeadlineService } from './app/services/deadline.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Deadline Countdown</h1>
    <app-countdown-timer 
      [deadlineService]="deadlineService"
      [updateInterval]="500"
      label="Time remaining:">
    </app-countdown-timer>
  `,
  standalone: true,
  imports: [CountdownTimerComponent],
  providers: [DeadlineService]
})
export class App {
  constructor(public deadlineService: DeadlineService) {}
}

bootstrapApplication(App, {
  providers: []
}).catch(err => console.error(err));