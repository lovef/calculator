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
    switch (input) {
      case '+': this.parts.push(Plus.instance); break
      case '-': this.parts.push(Minus.instance); break
      default:
        let last = this.last
        if (this.isValue(last)) {
          last.push(input)
        } else {
          this.parts.push(Value.fromInput(input))
        }
        break
    }
  }

  private calculate(): Value {
    var result = 0
    const parts = this.parts.map(item => item)

    while (this.reduce(parts));

    return (parts[0] as Value) || Value.zero
  }

  private reduce(parts: Part[]): boolean {
    let i = parts.findIndex(part => this.isOperator(part))
    let operator = parts[i]
    let a = parts[i - 1]
    let b = parts[i + 1]
    if (this.isOperator(operator) && this.isValue(a) && this.isValue(b)) {
      let c = operator.calculate(a, b)
      parts.splice(i - 1, 3, c)
      return true
    }
    return false
  }

  isNumber(x: any): x is number {
    return x && typeof x === "number";
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

class Value {

  static zero: Value = new Value()
  public value: number = 0
  private input: string = '0'

  static fromInput(input: string) {
    let value = new Value()
    value.input = input
    value.value = Value.parse(input)
    return value
  }

  static from(number: number) {
    let value = new Value()
    value.value = number
    value.input = number.toString()
    return value
  }

  push(something: string) {
    this.input += something
    this.value = Value.parse(this.input)
  }

  static parse(input: string): number {
    return Number(input.replace(',', '.'))
  }

  public toString(): string {
    return this.input
  }
}

interface BinaryOperator {
  operator: string
  calculate(a: Value, b: Value): Value
}

class Plus implements BinaryOperator {
  operator = '+'
  static instance = new Plus()

  calculate(a: Value, b: Value): Value {
    return Value.from(a.value + b.value)
  }

  public toString(): string {
    return this.operator
  }
}

class Minus implements BinaryOperator {
  operator = '-'
  static instance = new Minus()

  calculate(a: Value, b: Value): Value {
    return Value.from(a.value - b.value)
  }

  public toString(): string {
    return this.operator
  }
}