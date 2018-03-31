import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CalculatorService } from './calculator/calculator.service';
import { KeypadComponent } from './calculator/keypad/keypad.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    KeypadComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : []
  ],
  providers: [CalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
