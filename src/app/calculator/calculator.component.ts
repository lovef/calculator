import { Component, OnInit, Output, HostListener } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  public calculator: Calculator = new Calculator();

  ngOnInit() {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.calculator.onKeyPress(event);
  }
}

class Calculator {
  output: string = '0'

  onKeyPress = function(event: KeyboardEvent) {
    this.output = event.key
  }
}
