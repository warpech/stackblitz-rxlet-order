import { Component, AfterContentChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxLet } from '@rx-angular/template/let';
import { of, delay } from 'rxjs';

import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <pre>

    {{counter}} | direct<br>

    <ng-container *ngIf="true">
        {{counter}} | *ngIf<br>
        <ng-container *ngIf="true">
            {{counter}} | *nested ngIf<br>
        </ng-container>
        {{counter}} | *ngIf<br>
    </ng-container>

    <ng-container *rxLet="observable$; let observable; strategy: 'idle'">
        {{counter}} | *rxLet<br>
    </ng-container>

    <ng-container *ngIf="true">
        {{counter}} | *ngIf<br>
        <ng-container *ngIf="true">
            {{counter}} | *nested ngIf<br>
        </ng-container>
        {{counter}} | *ngIf<br>
    </ng-container>

    {{counter}} | direct<br>

    </pre>
  `,
})
export class App implements AfterContentChecked {
  name = 'Angular';

  items = ['a', 'b', 'c'];

  observable$ = of(true).pipe(delay(1000));

  private _counter = 0;

  get counter(): number {
    return ++this._counter;
  }

  set counter(value: number) {
    this._counter = value;
  }

  ngAfterContentChecked() {
    this._counter = 0;
  }
}

bootstrapApplication(App);
