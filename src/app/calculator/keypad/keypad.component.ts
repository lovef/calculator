import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'calculator-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.css']
})
export class KeypadComponent {

  constructor() { }

  public inputHandler: InputHandler

  onInput(input: string) {
    this.inputHandler.onInput(input)
  }

  onBackspace() {
    this.inputHandler.onBackspace()
  }
}

export interface InputHandler {
  onInput(input: string)

  onBackspace()
}
