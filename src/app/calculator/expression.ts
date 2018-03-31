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
    for (var i = 0; i < input.length; i++) {
      this.pushChar(input.charAt(i))
    }
  }

  private pushChar(char: string) {
    let operator = this.operatorFrom(char)
    if (operator && this.isOperator(this.last)) {
      this.parts.splice(-1, 1, operator)
    } else if (operator) {
      this.parts.push(operator)
    } else {
      let last = this.last
      if (this.isValue(last)) {
        last.push(char)
      } else {
        let value = Value.fromInput(char)
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
      case '*': return Times.instance
      case '/': return Divide.instance
    }
  }

  backspace() {
    let last = this.last
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

    while (this.reduce(parts));

    return (parts[0] as Value) || Value.zero
  }

  private reduce(parts: Part[]): boolean {
    let priorities = parts.map(part => this.isOperator(part) ? part.priority : Number.MIN_SAFE_INTEGER)
    let maxPriority = Math.max(...priorities)
    let i = parts.findIndex(part => this.isOperator(part) && part.priority === maxPriority)
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
  get empty() {
    return this.input.length === 0
  }

  static fromInput(input: string): Value {
    if (this.validate(input)) {
      let value = new Value()
      value.input = input
      value.value = Value.parse(input)
      return value
    }
  }

  static from(number: number): Value {
    let value = new Value()
    value.value = number
    value.input = number.toString()
    return value
  }

  push(something: string) {
    if (something.length === 1 && /[\d.,]/.test(something)) {
      this.input += something
      this.value = Value.parse(this.input)
    }
  }

  backspace() {
    this.input = this.input.slice(0, -1)
    this.value = Value.parse(this.input)
  }

  static validate(input: string) {
    return /^[\d.,]+$/.test(input)
  }

  static parse(input: string): number {
    return Number(input.replace(',', '.'))
  }

  public toString(): string {
    return this.input
  }
}

interface BinaryOperator {
  priority: number
  operator: string
  calculate(a: Value, b: Value): Value
}

class Plus implements BinaryOperator {
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

class Minus implements BinaryOperator {
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

class Times implements BinaryOperator {
  static instance = new Times()

  priority = 2
  operator = '*'

  calculate(a: Value, b: Value): Value {
    return Value.from(a.value * b.value)
  }

  public toString(): string {
    return this.operator
  }
}

class Divide implements BinaryOperator {
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
