import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountPanelComponent } from './count-panel.component';

describe('CountPanelComponent', () => {
  let component: CountPanelComponent;
  let fixture: ComponentFixture<CountPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
