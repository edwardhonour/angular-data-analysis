import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskOutputComponent } from './risk-output.component';

describe('RiskOutputComponent', () => {
  let component: RiskOutputComponent;
  let fixture: ComponentFixture<RiskOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
