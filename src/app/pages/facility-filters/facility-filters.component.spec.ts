import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityFiltersComponent } from './facility-filters.component';

describe('FacilityFiltersComponent', () => {
  let component: FacilityFiltersComponent;
  let fixture: ComponentFixture<FacilityFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
