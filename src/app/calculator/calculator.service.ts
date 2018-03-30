import { Injectable } from '@angular/core';
import { BinaryOperator } from '@angular/compiler';
import { Expression } from './expression';

@Injectable()
export class CalculatorService {

  expression: Expression = new Expression()
  get result(): number {
    return this.expression.result
  }

  constructor() { }

  public press(input: string) {
    this.expression.push(input)
  }
}
