import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatDatasetComponent } from './threat-dataset.component';

describe('ThreatDatasetComponent', () => {
  let component: ThreatDatasetComponent;
  let fixture: ComponentFixture<ThreatDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreatDatasetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreatDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
