export interface DeadlineResponse {
  secondsLeft: number;
}

export interface IDeadlineService {
  getSecondsLeft(): Observable<DeadlineResponse>;
}