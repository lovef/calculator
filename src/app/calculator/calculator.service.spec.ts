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
    expect(service.result).toBe('0');
  }));

  it('#result should start with 12 when pressing 1 and 2',
    inject([CalculatorService], (service: CalculatorService) => {
      service.press('1')
      service.press('2')
      expect(service.result).toBe('12');
    })
  );
});
