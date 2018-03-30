import { Expression } from "./expression";

describe('Expression', () => {

  it('expression result is default 0', () => {
    expect(new Expression().result).toBe(0)
  })

  it('1+1 gives the expression string "1 + 1"', () => {
    var expression = new Expression()
    expression.push('1')
    expression.push('+')
    expression.push('1')
    expect(expression.toString()).toBe('1 + 1')
  })

  it('1 + 1 = 2', () => {
    var expression = new Expression()
    expression.push('1')
    expression.push('+')
    expression.push('1')
    expect(expression.result).toBe(2);
  })

  it('1 + 1 - 1 = 1', () => {
    var expression = new Expression()
    expression.push('1')
    expression.push('+')
    expression.push('1')
    expression.push('-')
    expression.push('1')
    expect(expression.result).toBe(1);
  })

  it('pressing 1 and 2 gives 12', () => {
    var expression = new Expression()
    expression.push('1')
    expression.push('2')
    expect(expression.result).toBe(12);
  })

  it('pressing ,5 gives 0.5', () => {
    var expression = new Expression()
    expression.push(',')
    expression.push('5')
    expect(expression.result).toBe(0.5)
  })

  it('press backspace to erase input', () => {
    var expression = new Expression()
    expression.push('1,2')
    expression.push('+')
    expression.push('3')
    expect(expression.toString()).toBe('1,2 + 3')
    expression.backspace()
    expect(expression.toString()).toBe('1,2 +')
    expression.backspace()
    expect(expression.toString()).toBe('1,2')
    expression.backspace()
    expect(expression.toString()).toBe('1,')
    expression.backspace()
    expect(expression.toString()).toBe('1')
    expression.backspace()
    expect(expression.toString()).toBe('')
    expression.backspace()
  })
});
