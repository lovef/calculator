import { Component, OnInit, Output, HostListener } from '@angular/core'
import { CalculatorService } from './calculator.service'
import { InputHandler } from './keypad/keypad.component'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements InputHandler {

  get expression(): string {
    return this.calculator.expression.toString()
  }

  get result(): string {
    return this.calculator.result.toString()
  }

  constructor(private calculator: CalculatorService) { }

  onInput(input: string) {
    this.calculator.input(input)
  }

  onBackspace() {
    this.calculator.backspace()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 8:
        this.calculator.backspace()
        event.preventDefault()
        break
      default:
        this.calculator.input(event.key)
        break
    }
  }

  @HostListener('document:paste', ['$event'])
  public paste(event) {
    const pasted = event.clipboardData.getData('text/plain')
    this.calculator.input(pasted)
  }
}
