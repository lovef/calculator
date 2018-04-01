import { Value } from './value'

export interface BinaryOperator {
  priority: number
  operator: string
  calculate(a: Value, b: Value): Value
}

export class Plus implements BinaryOperator {
  static instance = new Plus()

  priority = 1
  operator = '+'

  calculate(a: Value, b: Value): Value {
    return Value.from(a.value + b.value)
  }

  public toString(): string {
    return this.operator
  }
}

export class Minus implements BinaryOperator {
  static instance = new Minus()

  priority = 1
  operator = '-'

  calculate(a: Value, b: Value): Value {
    return Value.from(a.value - b.value)
  }

  public toString(): string {
    return this.operator
  }
}

export class Times implements BinaryOperator {
  static instance = new Times()

  priority = 2
  operator = '·'

  calculate(a: Value, b: Value): Value {
    return Value.from(a.value * b.value)
  }

  public toString(): string {
    return this.operator
  }
}

export class Divide implements BinaryOperator {
  static instance = new Divide()

  priority = 3
  operator = '/'

  calculate(a: Value, b: Value): Value {
    return Value.from(a.value / b.value)
  }

  public toString(): string {
    return this.operator
  }
}
