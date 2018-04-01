import { Component, ViewChild, OnInit } from '@angular/core'
import { CalculatorComponent } from './calculator/calculator.component'
import { KeypadComponent } from './calculator/keypad/keypad.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Calculator'

  @ViewChild(CalculatorComponent)
  private calculatorComponent: CalculatorComponent

  @ViewChild(KeypadComponent)
  private keypadComponent: KeypadComponent

  ngOnInit(): void {
    this.keypadComponent.inputHandler = this.calculatorComponent
  }
}
