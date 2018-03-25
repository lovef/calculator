import { Component, OnInit } from '@angular/core';

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

}

class Calculator {
  output: string = '0'
}
