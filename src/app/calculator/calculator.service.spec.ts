import { TestBed, inject } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService]
    });
  });

  it('should be created', inject([CalculatorService], (service: CalculatorService) => {
    expect(service).toBeTruthy();
  }));

  it('#result should start with 0', inject([CalculatorService], (service: CalculatorService) => {
    expect(service.result).toBe(0);
  }));

  it('pressing 1+1 gives the expression 1 + 1',
    inject([CalculatorService], (service: CalculatorService) => {
      service.press('1')
      service.press('+')
      service.press('1')
      expect(service.expression.toString()).toBe('1 + 1')
    })
  );

  it('1 + 1 = 2',
    inject([CalculatorService], (service: CalculatorService) => {
      service.press('1')
      service.press('+')
      service.press('1')
      expect(service.result).toBe(2);
    })
  );
});
