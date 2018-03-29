import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {

  result: string = '0';
  constructor() { }

  public press(input: string) {
    this.result = parseFloat(this.result + input).toString()
  }
}
