import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DeadlineResponse, IDeadlineService } from '../interfaces/deadline.interface';

@Injectable()
export class DeadlineService implements IDeadlineService {
  private mockDeadline = Date.now() + 3600000; // 1 hour in milliseconds

  getSecondsLeft(): Observable<DeadlineResponse> {
    const secondsLeft = Math.max(0, Math.floor((this.mockDeadline - Date.now()) / 1000));
    return of({ secondsLeft });
  }
}