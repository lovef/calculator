import { Expression } from './expression'

describe('Expression', () => {

  let expression: Expression

  beforeEach(() => {
    expression = new Expression()
  })

  it('expression result is default 0', () => {
    expect(new Expression().result).toBe(0)
  })

  it('pressing 1, 2 and gives 12', () => {
    expression.push('1')
    expression.push('2')
    expect(expression.result).toBe(12)
  })

  it('pressing ,5 gives 0.5', () => {
    expression.push(',')
    expression.push('5')
    expect(expression.result).toBe(0.5)
  })

  it('entering multiple operators replaces the last operator', () => {
    expression.push('1-')
    expect(expression.toString()).toBe('1 -')
    expression.push('+')
    expect(expression.toString()).toBe('1 +')
  })

  it('1+1*2 gives the expression string "1 + 1 · 2"', () => {
    expression.push('1+1*2')
    expect(expression.toString()).toBe('1 + 1 · 2')
  })

  it('1 + 1 = 2', () => {
    expression.push('1 + 1')
    expect(expression.result).toBe(2)
  })

  it('1 + 1 - 1 = 1', () => {
    expression.push('1 + 1 - 1')
    expect(expression.result).toBe(1)
  })

  it('2 * 3 = 6', () => {
    expression.push('2 * 3')
    expect(expression.result).toBe(6)
  })

  it('2 · 3 = 6', () => {
    expression.push('2 · 3')
    expect(expression.result).toBe(6)
  })

  it('6 / 3 = 2', () => {
    expression.push('6 / 3')
    expect(expression.result).toBe(2)
  })

  it('1 + 2 * 3 = 7', () => {
    expression.push('1 + 2 * 3')
    expect(expression.result).toBe(7)
  })

  it('trailing binary operator is ignored', () => {
    expression.push('1 + 2 ·')
    expect(expression.result).toBe(3)
  })

  it('leading binary operator is ignored', () => {
    expression.push('· 1 + 2')
    expect(expression.result).toBe(3)
  })

  it('leading - negates the first value', () => {
    expression.push('- 1 + 2')
    expect(expression.result).toBe(1)
  })

  it('press backspace to erase input', () => {
    expression.push('1,2 + 3')
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
})
