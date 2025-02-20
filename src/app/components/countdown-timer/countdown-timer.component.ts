import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { IDeadlineService } from '../../interfaces/deadline.interface';
import { DeadlineService } from '../../services/deadline.service';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() deadlineService: IDeadlineService = new DeadlineService();
  @Input() updateInterval = 1000; // milliseconds
  @Input() label = 'Seconds left to deadline:';

  private destroy$ = new Subject<void>();
  private currentSeconds = new BehaviorSubject<number>(0);
  secondsLeft$ = this.currentSeconds.asObservable();

  ngOnInit(): void {
    timer(0, this.updateInterval).pipe(
      switchMap(() => this.deadlineService.getSecondsLeft()),
      takeUntil(this.destroy$)
    ).subscribe(
      response => this.currentSeconds.next(response.secondsLeft)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.currentSeconds.complete();
  }
}