# Angular Countdown Timer Component

A reusable, standalone Angular countdown timer component that displays time remaining until a deadline. This component is built with Angular 19+ and follows best practices for reusability and loose coupling.

## Features

- 🔄 Standalone component - easy to import and use
- 🎯 Dependency injection ready - works with any service implementing `IDeadlineService`
- ⚙️ Configurable through inputs
- 🎨 Customizable styling
- 🔋 Built with RxJS for reactive updates
- 🎭 OnPush change detection for better performance

## Installation

1. Copy the following files to your project:
   ```
   src/app/
   ├── components/
   │   └── countdown-timer/
   │       ├── countdown-timer.component.ts
   │       ├── countdown-timer.component.html
   │       └── countdown-timer.component.scss
   └── interfaces/
       └── deadline.interface.ts
   ```

2. Ensure you have the required dependencies in your `package.json`:
   ```json
   {
     "dependencies": {
       "@angular/core": "^19.0.0",
       "@angular/common": "^19.0.0",
       "rxjs": "^7.8.0"
     }
   }
   ```

## Usage

1. Implement the `IDeadlineService` interface in your service:
   ```typescript
   import { Injectable } from '@angular/core';
   import { Observable } from 'rxjs';
   import { IDeadlineService, DeadlineResponse } from './interfaces/deadline.interface';

   @Injectable()
   export class YourDeadlineService implements IDeadlineService {
     getSecondsLeft(): Observable<DeadlineResponse> {
       // Your implementation here
     }
   }
   ```

2. Import and use the component in your template:
   ```typescript
   import { Component } from '@angular/core';
   import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
   import { YourDeadlineService } from './services/your-deadline.service';

   @Component({
     selector: 'app-root',
     template: `
       <app-countdown-timer
         [deadlineService]="deadlineService"
         [updateInterval]="1000"
         label="Time remaining:">
       </app-countdown-timer>
     `,
     standalone: true,
     imports: [CountdownTimerComponent],
     providers: [YourDeadlineService]
   })
   export class App {
     constructor(public deadlineService: YourDeadlineService) {}
   }
   ```

## Component API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `deadlineService` | `IDeadlineService` | `DeadlineService` | Service that provides countdown data |
| `updateInterval` | `number` | `1000` | Update frequency in milliseconds |
| `label` | `string` | `'Seconds left to deadline:'` | Text label shown before the countdown |

### Interfaces

```typescript
interface DeadlineResponse {
  secondsLeft: number;
}

interface IDeadlineService {
  getSecondsLeft(): Observable<DeadlineResponse>;
}
```

## Styling

The component comes with basic styling that you can override using CSS:

```scss
.countdown {
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
}
```

## Best Practices

1. **Memory Management**: The component implements `OnDestroy` to clean up subscriptions
2. **Performance**: Uses `ChangeDetectionStrategy.OnPush` for better performance
3. **Dependency Injection**: Follows DI principles for better testability
4. **Type Safety**: Fully typed with TypeScript
5. **Reactive**: Built with RxJS for reactive updates

## Example Implementation

Here's a basic example of how to implement a custom deadline service:

```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DeadlineResponse, IDeadlineService } from '../interfaces/deadline.interface';

@Injectable()
export class CustomDeadlineService implements IDeadlineService {
  private deadline = new Date('2025-12-31T23:59:59');

  getSecondsLeft(): Observable<DeadlineResponse> {
    const secondsLeft = Math.max(
      0, 
      Math.floor((this.deadline.getTime() - Date.now()) / 1000)
    );
    return of({ secondsLeft });
  }
}
```

## License

MIT
