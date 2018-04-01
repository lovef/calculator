import { TestBed, async } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { CalculatorComponent } from './calculator/calculator.component'
import { MatToolbarModule, MatCardModule, MatButtonModule, MatIconModule } from '@angular/material'
import { CalculatorService } from './calculator/calculator.service'
import { KeypadComponent } from './calculator/keypad/keypad.component'
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [
        AppComponent,
        CalculatorComponent,
        KeypadComponent
      ],
      providers: [
        CalculatorService
      ]
    }).compileComponents()
  }))
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))
  it(`should have as title 'Calculator'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('Calculator')
  }))
  it('should render title in a mat-toolbar tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('Calculator')
  }))
})
