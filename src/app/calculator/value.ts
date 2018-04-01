export class Value {

  static zero: Value = new Value()

  public value = 0
  private input = '0'
  get empty() {
    return this.input.length === 0
  }

  static from(number: number): Value {
    const value = new Value()
    value.value = number
    value.input = number.toString()
    return value
  }

  static fromInput(input: string): Value {
    if (this.validate(input)) {
      const value = new Value()
      value.input = input
      value.value = Value.parse(input)
      return value
    }
  }

  static validate(input: string): boolean {
    return /^[\d.,]+$/.test(input)
  }

  static parse(input: string): number {
    return Number(input.replace(',', '.'))
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

  public toString(): string {
    return this.input
  }
}
