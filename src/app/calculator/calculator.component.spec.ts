import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CalculatorComponent } from './calculator.component'
import { CalculatorService } from './calculator.service'

describe('CalculatorComponent', () => {
  let component: CalculatorComponent
  let fixture: ComponentFixture<CalculatorComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      providers: [CalculatorService]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
