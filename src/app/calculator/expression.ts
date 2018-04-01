import { Value } from './value'
import { BinaryOperator, Plus, Minus, Times, Divide } from './binaryOperator'

type Part = BinaryOperator | Value

export class Expression {

  constructor() { }

  get result(): number {
    return this.calculate().value
  }
  parts: Part[] = []
  private get last(): Part {
    return this.parts[this.parts.length - 1]
  }

  push(input: string) {
    for (let i = 0; i < input.length; i++) {
      this.pushChar(input.charAt(i))
    }
  }

  private pushChar(char: string) {
    const operator = this.operatorFrom(char)
    if (operator && this.isOperator(this.last)) {
      this.parts.splice(-1, 1, operator)
    } else if (operator) {
      this.parts.push(operator)
    } else {
      const last = this.last
      if (this.isValue(last)) {
        last.push(char)
      } else {
        const value = Value.fromInput(char)
        if (value) {
          this.parts.push(Value.fromInput(char))
        }
      }
    }
  }

  private operatorFrom(char: string): BinaryOperator {
    switch (char) {
      case '+': return Plus.instance
      case '-': return Minus.instance
      case '*':
      case '·': return Times.instance
      case '/': return Divide.instance
    }
  }

  backspace() {
    const last = this.last
    if (this.isValue(last)) {
      last.backspace()
      if (last.empty) {
        this.parts.splice(-1, 1)
      }
    } else {
      this.parts.splice(-1, 1)
    }
  }

  private calculate(): Value {
    const parts = this.parts.map(item => item)
    const first = parts[0]
    if (this.isOperator(first)) {
      const next = parts[1]
      if (first === Minus.instance && this.isValue(next)) {
        parts.splice(0, 2, Value.from(-next.value))
      } else {
        parts.splice(0, 1)
      }
    }
    if (this.isOperator(this.last)) {
      parts.splice(-1, 1)
    }

    while (this.reduce(parts)) { }

    return (parts[0] as Value) || Value.zero
  }

  private reduce(parts: Part[]): boolean {
    const priorities = parts.map(part => this.isOperator(part) ? part.priority : Number.MIN_SAFE_INTEGER)
    const maxPriority = Math.max(...priorities)
    const i = parts.findIndex(part => this.isOperator(part) && part.priority === maxPriority)
    const operator = parts[i]
    const a = parts[i - 1]
    const b = parts[i + 1]
    if (this.isOperator(operator) && this.isValue(a) && this.isValue(b)) {
      const c = operator.calculate(a, b)
      parts.splice(i - 1, 3, c)
      return true
    }
    return false
  }

  isNumber(x: any): x is number {
    return x && typeof x === 'number'
  }

  isValue(x: any): x is Value {
    return x && 'value' in x
  }

  isOperator(x: any): x is BinaryOperator {
    return x && 'operator' in x
  }

  public toString(): string {
    return this.parts.join(' ')
  }
}
