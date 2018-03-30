import { Component, OnInit, Output, HostListener } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  get expression(): string {
    return this.calculator.expression.toString()
  }

  get result(): string {
    return this.calculator.result.toString()
  }

  constructor(private calculator: CalculatorService) { }

  ngOnInit() {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event)
    switch (event.keyCode) {
      case 8: this.calculator.backspace(); break
      default:
        this.calculator.input(event.key)
        break
    }
  }
}
